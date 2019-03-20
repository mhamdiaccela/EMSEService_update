package com.accela.web;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.accela.org.json.JSONArray;
import com.accela.org.json.JSONObject;
import com.accela.org.json.XML;

import ae.dm.util.Configuration;




/**
 * Servlet implementation class Service
 */
public class Service extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final String webservicesURL = Configuration.getInstance().getTriggerScriptServiceURL();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Service() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	doPost(request, response);
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		StringBuffer jb = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null) {
				jb.append(line);
			}
		} catch (Exception e) {
		}
		
		logging("\n\nNew Request");

		String output = triggerScript(jb.toString());
		response.getOutputStream().println(output);
	}
	
	protected String triggerScript(String input) {
		logging("Received Input: " + input);
		JSONObject obj = new JSONObject(input);
		String sessionId = obj.getString("sessionId");
		logging("sessionId: " + sessionId);
		String serviceProviderCode = obj.getString("serviceProviderCode");
		logging("serviceProviderCode: " + serviceProviderCode);
		String callerId = obj.getString("callerId");
		logging("callerId: " + callerId);
		String scriptName = obj.getString("scriptName");
		logging("scriptName: " + scriptName);
		JSONArray parameters = obj.getJSONArray("parameters");
		
		// Build the XML request
		// When writing this the objective was to minimize the number of dependencies since this will be deployed on AA
		// In case you are modifying this file to add more SOAP requests then consider switching to something
		// more sophisticated
		String xmlRequest = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
				"<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">" +
				"   <soapenv:Body>" +
				"      <ns1:triggerScript xmlns:ns1=\"http://service.ws.accela.com\" soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">" +
				"         <sessionId xsi:type=\"xsd:string\">" + sessionId + "</sessionId>" +
				"         <serviceProviderCode xsi:type=\"xsd:string\">" + serviceProviderCode + "</serviceProviderCode>" +
				"         <callerId xsi:type=\"xsd:string\">" + callerId + "</callerId>" +
				"         <scriptName xsi:type=\"xsd:string\">" + scriptName + "</scriptName>" +
				"         <params xmlns:ns2=\"http://model.ws.accela.com\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" soapenc:arrayType=\"ns2:EMSEModel4WS[" + parameters.length() + "]\" xsi:type=\"soapenc:Array\">";
				
				// Add the params ids
				for (int i = 0; i < parameters.length(); i++) {
					xmlRequest += "<params href=\"#id" + i + "\" />";
				}
				xmlRequest += "</params>" +
				"      </ns1:triggerScript>";
				
				for (int i = 0; i < parameters.length(); i++) {
					JSONObject paramObj = parameters.getJSONObject(i);
					xmlRequest +=  "<multiRef xmlns:ns3=\"http://model.ws.accela.com\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" id=\"id" + i + "\" soapenc:root=\"0\" soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\" xsi:type=\"ns3:EMSEModel4WS\">" +
						"         <key xsi:type=\"soapenc:string\">" + paramObj.getString("Key") + "</key>" +
						"         <value xsi:type=\"soapenc:string\">" + paramObj.getString("Value") + "</value>" +
						"      </multiRef>";
				}
				xmlRequest += "   </soapenv:Body>" +
				"</soapenv:Envelope>";
		
		try {
			String output = sendPost(xmlRequest);
			logging("output: " + output);
			
			JSONObject jsonObj = XML.toJSONObject(output);
			JSONArray multiRefArr = jsonObj.getJSONObject("soapenv:Envelope").
					getJSONObject("soapenv:Body").getJSONArray("multiRef");
			
			JSONObject mainObj = new JSONObject();
			JSONArray wholeResults = new JSONArray();
			
			// Build the request to match the odd response structure omitted by the current .NET webservice
			// to avoid having to rewrite the front-end code
			mainObj.put("d", new JSONObject().put("output", new JSONObject().put("wholeResults", wholeResults)));
			
			// build a map of keys and values in the response
			for (int i = 0; i < multiRefArr.length(); i++) {
				JSONObject arrObj = multiRefArr.getJSONObject(i);
				String key = null;
				String value = "";
				if (arrObj.has("key") && arrObj.getJSONObject("key").has("content")) {
					key = arrObj.getJSONObject("key").getString("content");
				}
				
				if (arrObj.has("value") && arrObj.getJSONObject("value").has("content")) {
					value = arrObj.getJSONObject("value").getString("content");
				}
				
				// key is required, the value is optional
				if (key != null) {
					JSONObject result = new JSONObject();
					result.put("key", key);
					result.put("value", value);
					wholeResults.put(result);
				}
			}
			
			logging("Returning: \n" + mainObj.toString());
			return mainObj.toString();
		} catch (Exception e) {
			e.printStackTrace();
			logging("ERR#1: " + e.getMessage());
			logging("ERR#11: " + e.toString());
			return "{\"error\": \"Exception Occured: " + e.getMessage() + "\"}";
		}
	}
	
	private String sendPost(String requestBody) throws Exception {
		URL obj = new URL(webservicesURL);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		//add request header
		con.setRequestMethod("POST");
		con.setRequestProperty("SOAPAction", "");
		
		// Send post request
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(requestBody);
		wr.flush();
		wr.close();

		int responseCode = con.getResponseCode();

		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		
		return response.toString();
	}

	private void logging(String str){
		str = str + "\n";
		String FILENAME = "C:\\test\\EMSE.log";
		BufferedWriter bw = null;
		FileWriter fw = null;

		try {

			File file = new File(FILENAME);

			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}

			// true = append file
			fw = new FileWriter(file.getAbsoluteFile(), true);
			bw = new BufferedWriter(fw);
			
			str = getDateTime() + "# " + str;

			bw.write(str);

			System.out.println("Done");

		} catch (IOException e) {

			e.printStackTrace();

		} finally {

			try {

				if (bw != null)
					bw.close();

				if (fw != null)
					fw.close();

			} catch (IOException ex) {

				ex.printStackTrace();

			}
		}
	}
	
	private String getDateTime(){
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");

		Date now = new Date();
		return format.format(now);
	}
	
}

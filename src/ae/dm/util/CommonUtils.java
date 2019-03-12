package ae.dm.util;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPFactory;
import javax.xml.soap.SOAPFault;
import javax.xml.ws.soap.SOAPFaultException;

public abstract class CommonUtils {
	
	
	public enum OPERATION_STATUS {
		
		SUCCESS("DMUACC000ACT00S", "Operation Completed Successfully"),
		UNSPICIFIED("DMUACC000ACT01E", "Operation Terminated with Error. Unspecified System Failure"),
		SCHEMA("DMUACC000VLD01E", "Operation Terminated with Error. Schema Validation Failure"),
		CONNECTION("DMUACC000CON01E", "Operation Terminated with Error. Failed to connect to Back End Service"),
		FAULT("DMUACC000FLT01E", "Operation Terminated with Error. Back End Service Returned Fault"),
		TIMEOUT("DMUACC000OUT01E", "Operation Terminated with Error. Connection to Back End System Timed Out"),
		MAP("DMUACC000MAP01E", "Operation Terminated with Error. Failed to Map Message");
		
		private String code;
		
		private String message;

		private OPERATION_STATUS (String code, String message) {
			this.code = code;
			this.message = message;
		}
		
		public String getCode() {
			return code;
		}

		public void setCode(String code) {
			this.code = code;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}
	}

    /**
     * Get string representation of this object
     * 
     * @param obj Object to be parsed,
     * @return string representation of this object
     */
    public static String getString(Object obj) {
        
    	if (obj == null) {
            return null;
        }
        
        return obj.toString();
    }
    
    /**
     * Checks if the field is not null or contains only blank spaces.
     * 
     * @param value String value to be checked.
     * @return true if the field is not null or blank.
     */
    public static boolean isBlankOrNull(String value) {
       return ((value == null) || (value.trim().length() == 0) || (value.trim().equals("null")));
    }
    
    public static SOAPFaultException createFault(String code, String message) throws SOAPException {
    	
    	try {
    		
    		SOAPFault fault = SOAPFactory.newInstance().createFault();
    		
    		fault.setFaultCode(code);
    		fault.setFaultString(message);
    		
    		return new SOAPFaultException(fault);
    		
    	} catch (Exception ex) {
    		throw new SOAPException(ex);
    	}
    }
    
    public static XMLGregorianCalendar getDate(String dateString, String format) throws Exception {
    	
    	try {
    		
    		if (isBlankOrNull(dateString) || isBlankOrNull(format)) {
    			return null;
    		}
    		
    		GregorianCalendar calender = new GregorianCalendar();
        	SimpleDateFormat sdf = new SimpleDateFormat(format);
        	Date date = sdf.parse(dateString);
        	calender.setTime(date);
        	
        	return DatatypeFactory.newInstance().newXMLGregorianCalendar(calender);
        	
    	} catch (Exception ex) {
    		ex.printStackTrace();
    		throw ex;
    	}
    	
    }
    
    public static String formatDate(Date date, String format) {
    	
    	SimpleDateFormat sdf = new SimpleDateFormat(format);
    	
    	return sdf.format(date);
    }
    
    public static Integer getInteger(Object obj) {
    	
    	if (obj == null) {
    		return null;
    	}
    	
    	return Integer.valueOf(obj.toString());
    }
    
    public static String getSTackTrace(Exception ex) {
    	
    	StringWriter sw = new StringWriter();
    	ex.printStackTrace(new PrintWriter(sw));
    	return sw.toString();
    }
    
    public static Date clearTime(XMLGregorianCalendar date) {
    	if (date == null) {
			return null;
		}
    	
    	return clearTime(date.toGregorianCalendar().getTime());
    }
    
    public static Date clearTime(Date date) {
    	if (date == null) {
			return null;
		}
    	
    	Calendar calendar = Calendar.getInstance();
    	calendar.setTime(date);
    	calendar.set(Calendar.HOUR_OF_DAY, 0);
    	calendar.set(Calendar.MINUTE, 0);
    	calendar.set(Calendar.SECOND, 0);
    	calendar.set(Calendar.MILLISECOND, 0);
    	return calendar.getTime();
    }
    
    public static Date getToday(boolean clearTime) {
    	
    	Calendar calendar = Calendar.getInstance();
    	if (clearTime) {
    		return clearTime(calendar.getTime());
		}
    	
    	return calendar.getTime();
    }
    
    public static String trim(String value) {
    	
    	if (isBlankOrNull(value) || value.trim().equalsIgnoreCase("null")) {
    		return "";
    	}
    	
    	return value.trim();
    }
    
    public static boolean isNumber(String number) {
    	
    	boolean isValid = false;
    	try {
    		Long newLongValue = Long.valueOf(number);
    		isValid = true;
    	} catch (Exception ex) {
    		isValid = false;
    	}
    	
    	return isValid;
    }
}

package ae.dm.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.Serializable;
import java.util.Properties;

public class Configuration implements Serializable {

	private static Configuration config;
	private Properties prop = new Properties();
	private InputStream input = null;
	
	public static synchronized  Configuration getInstance() {
		
		if (config == null) {
			config = new Configuration();
		}
		
		return config;
	}
	
	public Configuration() {
		
		try {
			prop.load(getClass().getClassLoader().getResourceAsStream("config.properties"));
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public String getTriggerScriptServiceURL() {
		return CommonUtils.getString(prop.get("TriggerScriptServiceURL"));
	}
}

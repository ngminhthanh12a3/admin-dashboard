export default ({ DeviceTypeQuery, FileTypeQuery }) => {
  return (
    
      `FUNC(void, OTA_PUBLIC_FUNCTION) OTA_Update()
    {
      String API_SERVER_HOST = String(MQTT_HOST);
      String API_SERVER_PORT = "3001";
      
      String url = "http://" + API_SERVER_HOST + ":" + API_SERVER_PORT + "/deviceapi/update?";
      url += "&v=" + Gb_sFwVersion ;
      url += "&u=1";
      url += "&devID=" + String(Lc_ulDevID);
      url += "&devicetype=ESP32";
      url += "&filetype=Local";
      Serial.println(url);
      
      WiFiClient client;
      httpUpdate.update(client, url, Gb_sFwVersion);
    };`
    
  );
};

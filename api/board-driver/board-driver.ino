#include <Adafruit_NeoPixel.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "credentials.h"
#include <map>
#include <string>
#define LED1_PIN 1
#define LED2_PIN 2

// WiFi credentials -read from credentials.h
const char *ssid = WIFI_SSID;
const char *password = WIFI_PASS;

// MQTT Broker
const char *mqtt_broker = "test.mosquitto.org";
const char *topic = "foi/air2219";
const int mqtt_port = 1883;

//LED config
Adafruit_NeoPixel led1(1, LED1_PIN, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel led2(1, LED2_PIN, NEO_GRB + NEO_KHZ800);

//Ports and the corresponding tags
map<string, int> connectedLocks;
map<char,int>::iterator it;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Set serial baud rate to 9600 (Serial monitor logs)
  Serial.begin(9600);

  led1.begin();

  connectedLocks.insert(pair<string, int>("eFlush-WnmqqYYrWc", 1));
  connectedLocks.insert(pair<string, int>("eFlush-eBjhjZOvxG", 2));
  
  // connecting to a WiFi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      // Retry every 5 seconds
      delay(5000);
      Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  
  //Connecting to an MQTT broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(parseTagAndUnlockDoor);
  while (!client.connected()) {
      String client_id = "esp8266-client-";
      client_id += String(WiFi.macAddress());
      Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
          Serial.println("Public emqx mqtt broker connected");
      } else {
          Serial.print("fai1 with state ");
          Serial.print(client.state());
          delay(2000);
      }
  }
  // Subscribe to the specified topic
  client.subscribe(topic);
}

void parseTagAndUnlockDoor(char *topic, byte *payload, unsigned int length) {
  Serial.print("Tag arrived in topic: ");
  Serial.println(topic);

  string tag;
  for (int i = 0; i < length; i++) {
    tag.push_back((char) payload[i]);
  }
  Serial.print("Tag:");
  Serial.println(tag);

  it = connectedLocks.find(tag);
  
  if (it != connectedLocks.end()) {
    led1.setPixelColor(0, led1.Color(255, 0, 0));
    led1.show();
    delay(1000);
    led1.setPixelColor(0, led1.Color(0, 0, 0));
    led1.show();
  }
}

void loop() {
  client.loop();
}

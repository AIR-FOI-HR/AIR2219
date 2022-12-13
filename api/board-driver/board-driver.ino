#include <Adafruit_NeoPixel.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "credentials.h"
#define lock_1 12
#define lock_2 13
#define ONBOARD_LED_PIN 2

Adafruit_NeoPixel onboard_led(1, ONBOARD_LED_PIN, NEO_GRB + NEO_KHZ800);

// MQTT Broker
const char *mqtt_broker = "test.mosquitto.org";
const char *topic = "foi/air2219";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Set the serial baud rate to 9600 (Serial monitor logs)
  Serial.begin(9600);

  // Initialize hardware connected to the board
  onboard_led.begin();
  pinMode(lock_1, OUTPUT);
  pinMode(lock_2, OUTPUT);

  // Change on board led's color to red
  delay(100);
  onboard_led.setPixelColor(0, onboard_led.Color(255, 0, 0));
  onboard_led.show();

  // Connect to a WiFi network
  connectToWifi();

  //Connect to an MQTT broker
  setupMQTTConnection();
}

void connectToWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASS); //Credentials need to be defined in the credentials.h header file
  while (WiFi.status() != WL_CONNECTED) {
      // Retry every 5 seconds
      Serial.println("Connecting to the WiFi network");
      delay(5000);
  }
  Serial.println("Connected to the WiFi network");
  // Change on board led's color to yellow
  onboard_led.setPixelColor(0, onboard_led.Color(255, 255, 0));
  onboard_led.show();
}

void setupMQTTConnection() {
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(parseTagAndUnlockDoor); //Called upon receiving a message
  while (!client.connected()) {
      String client_id = "esp8266-client-";
      client_id += String(WiFi.macAddress());
      Serial.printf("The client %s connects to the public mqtt broker\n", client_id.c_str());
      if (client.connect(client_id.c_str())) {
          Serial.println("Public emqx mqtt broker connected");
      } else {
          Serial.print("Failed with state ");
          Serial.print(client.state());
          delay(2000);
      }
  }
  // Subscribe to the specified topic
  client.subscribe(topic);
  // Change on board led's color to green
  onboard_led.setPixelColor(0, onboard_led.Color(0, 255, 0));
  onboard_led.show();  
}

void parseTagAndUnlockDoor(char *topic, byte *payload, unsigned int length) {
  Serial.print("Tag arrived in topic: ");
  Serial.println(topic);

  String jsonMessage;
  for (int i = 0; i < length; i++) {
    jsonMessage += (char) payload[i];
  }
  Serial.print("Message:");
  Serial.println(jsonMessage);

  DynamicJsonDocument message(1024);
  deserializeJson(message, jsonMessage);

  String restroomTag = (String)message["tag"];
  Serial.println(restroomTag);
  if(restroomTag == CONNECTED_LOCK_1) {
      digitalWrite(lock_1, HIGH);
      delay(3000);
      digitalWrite(lock_1, LOW);
  } else if(restroomTag == CONNECTED_LOCK_2) {
    digitalWrite(lock_2, HIGH);
    delay(3000);
    digitalWrite(lock_2, LOW);
  }
}

void loop() {
  // Keeps the connection alive (sends keepalive)
  client.loop();
  }
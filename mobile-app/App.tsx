import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createNavigationContainerRef,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import MapScreen from "./src/pages/Map";
import UserProfileScreen from "./src/pages/UserProfile";
import ScannerScreen from "./src/pages/Scanner";
import IconPointer from "./src/assets/ic_NavigationLocation.svg";
import IconProfile from "./src/assets/ic_NavigationProfile.svg";
import IconScanner from "./src/assets/ic_NavigationQR.svg";
import { color } from "./src/lib/style/theme";

const Tab = createBottomTabNavigator();

export default function App() {
  const navigationRef = createNavigationContainerRef();
  const [routeName, setRouteName] = useState<String | null>();
  console.log(routeName);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setRouteName(navigationRef.getCurrentRoute()?.name)
      }}
      onStateChange={async () => {
        setRouteName(navigationRef.getCurrentRoute()?.name);
      }}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            backgroundColor: color.primaryBlue,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarItemStyle: {
            //backgroundColor: color.white,
            borderRadius: 50,
            marginHorizontal: 35,
            marginVertical: 7,
          },
        }}
      >
        <Tab.Screen
          name={"profile"}
          component={UserProfileScreen}
          options={{
            tabBarIcon: () => {
              return <IconProfile width={30} height={30} />;
            },
            tabBarItemStyle: {
              backgroundColor: routeName == "profile" ? color.white : "",
              borderRadius: 50,
              marginHorizontal: 35,
              marginVertical: 7,
            },
          }}
        />
        <Tab.Screen
          name={"map"}
          component={MapScreen}
          options={{
            tabBarIcon: () => {
              return <IconPointer width={30} height={30} />;
            },
          }}
        />
        <Tab.Screen
          name={"scanner"}
          component={ScannerScreen}
          options={{
            tabBarIcon: () => {
              return <IconScanner width={30} height={30} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

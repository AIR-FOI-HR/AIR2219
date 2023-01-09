import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import React, { useState } from "react";
import MapScreen from "./src/pages/Map";
import UserProfileScreen from "./src/pages/UserProfile";
import ScannerScreen from "./src/pages/Scanner";
import IconPointer from "./src/assets/ic_NavigationLocation.svg";
import IconProfileFocused from "./src/assets/ic_NavigationProfileFocused.svg";
import IconPointerFocused from "./src/assets/ic_NavigationLocationFocused.svg";
import IconScannerFocused from "./src/assets/ic_NavigationQRFocused.svg";
import IconProfile from "./src/assets/ic_NavigationProfile.svg";
import IconScanner from "./src/assets/ic_NavigationQR.svg";
import { color } from "./src/lib/style/theme";
import PaymentScreen from "./src/pages/Payment";
import { createStackNavigator } from "@react-navigation/stack";
import PurchaseHistory from "./src/pages/PurchaseHistory";
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="map"
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: color.primaryBlue,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name={"profile"}
        component={UserProfileScreen}
        options={{
          tabBarIcon: () => {
            // return routeName === "profile" ? (
            //   <IconProfileFocused width={54} height={54} />
            // ) : (
            return <IconProfile width={30} height={30} />;
            // );
          },
        }}
      />
      <Tab.Screen
        name={"map"}
        component={MapScreen}
        options={{
          tabBarIcon: () => {
            // return routeName === "map" ? (
            //   <IconPointerFocused width={54} height={54} />
            // ) : (
            return <IconPointer width={30} height={30} />;
            // );
          },
        }}
      />
      <Tab.Screen
        name={"scannerOptions"}
        component={ScannerScreen}
        options={{
          tabBarIcon: () => {
            // return routeName === "scannerOptions" ? (
            //   <IconScannerFocused width={54} height={54} />
            // ) : (
            return <IconScanner width={35} height={35} />;
            // );
          },
        }}
      />
      <Tab.Screen
        
        name={"purchaseHistory"}
        component={PurchaseHistory}
        options={{
          tabBarItemStyle:{display:'none'}
        }}
      />
    </Tab.Navigator>
  );
};

const ScannerStack = createStackNavigator();

export default function App() {
  // const navigationRef = createNavigationContainerRef();
  // const [routeName, setRouteName] = useState<String | null>();

  return (
    <NavigationContainer
      // ref={navigationRef}
      // onReady={() => {
      //   setRouteName(navigationRef.getCurrentRoute()?.name);
      // }}
      // onStateChange={async () => {
      //   setRouteName(navigationRef.getCurrentRoute()?.name);
      // }}
    >
      <ScannerStack.Navigator
        screenOptions={{
          headerShown: false,
/*           tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            backgroundColor: color.primaryBlue,
          }, */
        }}
      >
        <ScannerStack.Screen name="home" component={HomeTabs} />
        <ScannerStack.Screen name="payment" component={PaymentScreen} />
        <ScannerStack.Screen name="purchaseHistory" component={PurchaseHistory} />
      </ScannerStack.Navigator>
    </NavigationContainer>
  );
}

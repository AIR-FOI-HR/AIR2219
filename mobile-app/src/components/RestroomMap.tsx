import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { Restroom } from "../api/models/response/Restroom";
import { color } from "../lib/style/theme";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Props {
  initialRegion: Region;
  restrooms: Restroom[];
  //TODO: Add markers and callbacks
}

const RestroomMap: React.FC<Props> = ({ initialRegion, restrooms }) => {
  const [userLocation, setUserLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log("Error: ", errorMsg);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      //console.log(userLocation);
    })();
  }, []);

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      showsUserLocation={true}
      followsUserLocation={true}
    >
      {restrooms.map((restroom) => (
        <View key={restroom.id}>
          <Marker
            coordinate={{
              latitude: parseFloat(restroom.latitude),
              longitude: parseFloat(restroom.longitude),
            }}
            title={restroom.address}
            description={`${restroom.price} EUR`}
          >
            <Image
              source={require("../assets/img_WCLocator.png")}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        </View>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default RestroomMap;

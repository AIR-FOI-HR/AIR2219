import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { Restroom } from "../api/models/response/Restroom";
import { City } from "../api/models/response/City";

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
    ></MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default RestroomMap;

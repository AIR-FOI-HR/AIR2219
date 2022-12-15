import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

interface Region {
    latitude: number,
    longitude: number
    latitudeDelta: number
    longitudeDelta: number,
}

interface Props {
    initialRegion: Region
    //TODO: Add markers and callbacks
}

const RestroomMap: React.FC<Props> = ({initialRegion}) => {
  const [userLocation, setUserLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log('Error: ', errorMsg);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      console.log(userLocation);
      //TODO: Fetch the nearest restroom location
    })();
  }, []);

  return (
    <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
    >
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default RestroomMap;

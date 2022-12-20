import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { Restroom } from "../api/models/response/Restroom";
import MapViewDirections from "react-native-maps-directions";
import { color } from "../lib/style/theme";
import getDistance from "geolib/es/getDistance";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Props {
  region: Region | undefined;
  restrooms: Restroom[];
  //TODO: Add markers and callbacks
}

const RestroomMap: React.FC<Props> = ({ region, restrooms }) => {
  const [userLocation, setUserLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [closestRestroom, setClosestRestroom] = useState<Restroom | null>(
    restrooms[0]
  );

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
      let restroomFound: React.SetStateAction<Restroom | null> | undefined;
      let closestDistance = getDistance(
        {
          latitude: location!.coords.latitude,
          longitude: location!.coords.longitude,
        },
        {
          latitude: restrooms[0].latitude,
          longitude: restrooms[0].longitude,
        }
      );
      restrooms.forEach((restroom) => {
        let distance = getDistance(
          {
            latitude: location!.coords.latitude,
            longitude: location!.coords.longitude,
          },
          {
            latitude: restroom.latitude,
            longitude: restroom.longitude,
          }
        );
        if (distance < closestDistance) {
          restroomFound = restroom;
        }
        if (restroomFound != undefined) {
          console.log(restroomFound);
          setClosestRestroom(restroomFound);
        }
      });
    })();
  }, []);

  return (
    <MapView
      region={region}
      style={styles.map}
      showsUserLocation={true}
      followsUserLocation={true}
    >
      {restrooms.map((restroom) => (
        <View key={restroom.id}>
          <Marker
            coordinate={{
              latitude: restroom.latitude,
              longitude: restroom.longitude,
            }}
            title={restroom.address}
            description={`${restroom.price} €`}
          >
            <Image
              source={require("../assets/img_WCLocator.png")}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        </View>
      ))}
      {restrooms && userLocation && closestRestroom && (
        <MapViewDirections
          apikey="AIzaSyBtWfUxE5ubsLXBPp23TNYIzKDXiRMxalE"
          origin={{
            latitude: userLocation!.coords.latitude,
            longitude: userLocation!.coords.longitude,
          }}
          destination={{
            latitude: closestRestroom.latitude,
            longitude: closestRestroom.longitude,
          }}
          mode="WALKING"
          strokeWidth={3}
          strokeColor={color.primaryBlue}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default RestroomMap;

import React from 'react';
import { StyleSheet, View, } from "react-native";
import CitySelectBar from '../components/CitySelectBar';
import RestroomMap from '../components/RestroomMap';

const varazdinRegion = {
  latitude: 46.30774076067861,
  longitude: 16.338090229632893,
  latitudeDelta: 0.0412,
  longitudeDelta: 0.0211,
};

const zagrebRegion = {
  latitude: 45.8129526993897, 
  longitude: 15.977320885433711,
  latitudeDelta: 0.0412,
  longitudeDelta: 0.0211,
};

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <RestroomMap initialRegion={varazdinRegion}/>
      <CitySelectBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;

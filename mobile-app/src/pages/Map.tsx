import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

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
}

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={zagrebRegion}
      />
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;

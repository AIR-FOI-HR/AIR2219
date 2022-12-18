import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CitySelectBar from "../components/CitySelectBar";
import RestroomMap from "../components/RestroomMap";
import { Restroom } from "../api/models/response/Restroom";
import { getRestroomsByCityId } from "../api/restrooms";
import { City } from "../api/models/response/City";
import { getAllCities } from "../api/cities";

const latitudeDelta = 0.0412;
const longitudeDelta = 0.0211;

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapScreen: React.FC = () => {
  const [cityId, setCityId] = useState("");
  const [restroomList, setRestroomList] = useState<Restroom[]>();
  const [cityList, setCitiesList] = useState<City[]>();
  const [region, setRegion] = useState<Region>();

  useEffect(() => {
    (async () => {
      const cities: City[] = await getAllCities();
      setCitiesList(cities);
      let region : Region = {latitude: cities[0].latitude, longitude: cities[0].longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta};
      setRegion(region)
      const restrooms: Restroom[] = await getRestroomsByCityId(cities[0].id);
      setRestroomList(restrooms);
    })();
  }, []);

  useEffect(() => {
    if(cityId!="")
    {
      (async () => {
        const restrooms: Restroom[] = await getRestroomsByCityId(cityId);
        setRestroomList(restrooms);
        {}
        let city: City | undefined = cityList!.find(city => city.id == cityId);
        let region : Region = {latitude: city!.latitude, longitude: city!.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta};
        setRegion(region);
      })();
    }
  }, [cityId]);

  return (
    <View style={styles.container}>
      {restroomList && region &&
        <RestroomMap region={region} restrooms={restroomList} />
      }
      {cityList &&
        <CitySelectBar cityList={cityList} setCityId={setCityId} />
      }
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

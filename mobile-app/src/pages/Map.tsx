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

const varazdinRegion = {
  latitude: 46.30774076067861,
  longitude: 16.338090229632893,
  latitudeDelta: 0.0412,
  longitudeDelta: 0.0211,
};
const varazdinCityId = 'af2cf8c0-513c-4d1f-a061-0bd46a7b2a36';

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
  const [region, setRegion] = useState<Region>(varazdinRegion);

  useEffect(() => {
    (async () => {
      const cities: City[] = await getAllCities();
      setCitiesList(cities);
      const restrooms: Restroom[] = await getRestroomsByCityId(varazdinCityId);
      setRestroomList(restrooms);
    })();
  }, []);

  useEffect(() => {
    if(cityId && cityList) {
      (async () => {
        let city: City | undefined = cityList.find(city => city.id == cityId);
        if(!city) {
          throw new Error('Invalid city selected!');
        }
        const restrooms: Restroom[] = await getRestroomsByCityId(cityId);
        setRestroomList(restrooms);
        let region : Region = {latitude: city.latitude, longitude: city.longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta};
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

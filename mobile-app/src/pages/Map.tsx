import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CitySelectBar from "../components/CitySelectBar";
import RestroomMap from "../components/RestroomMap";
import { Restroom } from "../api/models/response/Restroom";
import { getRestroomsByCityId } from "../api/restrooms";
import { City } from "../api/models/response/City";
import { getAllCities } from "../api/cities";

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
  const [cityId, setCityId] = useState("");
  const [restroomList, setRestroomList] = useState<Restroom[]>();
  const [cityList, setCitiesList] = useState<City[]>();

  useEffect(() => {
    (async () => {
      const cities: City[] = await getAllCities();
      setCitiesList(cities);
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
      })();
    }
  }, [cityId]);

  return (
    <View style={styles.container}>
      {restroomList &&
        <RestroomMap initialRegion={varazdinRegion} restrooms={restroomList} />
      }
      {cityList &&
        <CitySelectBar cityList={cityList} setCityId={setCityId} cityId={cityId} />
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

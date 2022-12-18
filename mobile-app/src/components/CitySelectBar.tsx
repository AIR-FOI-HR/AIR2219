import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { color } from "../lib/style/theme";
import { Shadow } from "react-native-shadow-2";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading";
import IconLocation from "../assets/ic_CurrentLocation.svg";
import { City } from "../api/models/response/City";
import { getAllCities } from "../api/cities";

const CitySelectBar: React.FC = () => {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  const [selected, setSelected] = useState(true);
  const [citiesList, setCitiesList] = useState<City[]>();

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    const cities: City[] = await getAllCities();
    setCitiesList(cities);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Shadow
        style={styles.shadow}
        offset={[2, 2]}
        startColor={"#00000025"}
        endColor={"#00000001"}
        distance={5}
      >
        <IconLocation width={22.5} height={22.5} style={styles.iconLocation} />
        {citiesList && (
          <SelectDropdown
            data={citiesList!.map((city) => city.name)}
            defaultValueByIndex={0}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem);
              setSelected(true);
            }}
            buttonTextStyle={styles.buttonText}
            buttonStyle={
              selected ? styles.buttonSelected : styles.buttonNotSelected
            }
            dropdownStyle={styles.dropdown}
            onFocus={() => setSelected(false)}
            onBlur={() => setSelected(true)}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        )}
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: color.primaryOrange,
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
  },
  buttonSelected: {
    borderRadius: 20,
    backgroundColor: color.white,
    height: 43,
    width: 226,
  },
  buttonNotSelected: {
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: color.white,
    height: 43,
    width: 226,
  },
  dropdown: {
    marginTop: -31,
    borderRadius: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  shadow: {
    borderRadius: 24,
  },
  iconLocation: {
    position: "absolute",
    zIndex: 2,
    left: 17.5,
    top: 10.1,
  },
});

export default CitySelectBar;

import { ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, font } from '../lib/style/theme'
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,

}from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading"
interface Props{
  title:string;
  value:string;
  valueColor?:ColorValue;
}

const SimpleTitledText : React.FC<Props>= ({title, value, valueColor=color.black}) => {

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value,{color:valueColor}]}>{value}</Text>

    </View>
  )
}

export default SimpleTitledText

const styles = StyleSheet.create({

  container:{
    flexDirection:'column',
    justifyContent: 'space-between',
    marginBottom:10,
    marginTop:10,
  },

  title:{
    fontFamily: font.semiBold,
    fontSize: 16,
    textAlign: 'left',
    color: color.black,
    marginBottom:10,
    marginTop:10,
  },

  value:{
    fontFamily: font.regular,
    fontSize: 16,
    textAlign: 'justify',
    marginBottom:10,
    marginTop:10,
  }
})
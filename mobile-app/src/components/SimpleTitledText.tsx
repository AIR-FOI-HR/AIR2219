import { ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, font } from '../lib/style/theme'
//-----------------------------------------------FONT
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_300Light,
  OpenSans_600SemiBold,
  OpenSans_300Light_Italic,

}from "@expo-google-fonts/open-sans";
//-----------------------------------------------FONT

interface Props{
  title:string;
  value:string;
  valueColor?:ColorValue;
}

const SimpleTitledText = ({title, value, valueColor=color.black}:Props) => {

  //-----------------------------------------------FONT
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_300Light,
    OpenSans_600SemiBold,
    OpenSans_300Light_Italic,
  });
  //-----------------------------------------------FONT


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
import { ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { font } from '../lib/style/theme'
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
    value:string;
    fontSize:number;
    color:ColorValue;
}

const Title = ({value,fontSize,color}:Props) => {

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
      <Text style={[styles.text,{fontSize:fontSize, color:color}]}>{value}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    container:{
        margin:20
    },

    text:{
        fontFamily: font.semiBold,
        textAlign: "center"
    }

})
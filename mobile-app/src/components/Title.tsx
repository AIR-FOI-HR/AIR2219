import { ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { font } from '../lib/style/theme'
import {
    useFonts,
    OpenSans_600SemiBold,
  
  }from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading"

interface Props{
    value:string;
    fontSize:number;
    color:ColorValue;
}

const Title : React.FC<Props>= ({value,fontSize,color}) => {
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color,font } from '../lib/style/theme';
import {
  useFonts,
  OpenSans_600SemiBold,
}from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading"
interface Props {
    text: string;
    onPress: any;
}

const SimpleButton : React.FC<Props>= ({text, onPress}) => {
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'center',
    margin:10
  },
  button:{
    fontFamily: font.semiBold,
    borderRadius: 82,
    fontSize: 14,
    padding: 18,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: color.primaryBlue,
    alignSelf: 'flex-start',
    elevation: 3,
  },

  buttonText:{
    color: color.white,
    fontSize: 16,
    textAlign: 'center'
  },
})

export default SimpleButton

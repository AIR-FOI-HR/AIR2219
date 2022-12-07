import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color,font } from '../lib/style/theme';
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
interface Props {
    text: string;
    onPress: any;
}

const SimpleButton = ({text, onPress} : Props) => {
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
    
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        
        <Text style={styles.buttonText}>
          {text}
        </Text>
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

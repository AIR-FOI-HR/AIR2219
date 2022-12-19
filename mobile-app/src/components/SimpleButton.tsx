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
    svgImage?:any;
}

const SimpleButton : React.FC<Props>= ({text, onPress,svgImage=null}) => {
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.button,]}>
        <View style={styles.insideButton}>
          <View style={{marginRight: svgImage==null?0:30,marginLeft:svgImage==null?0:5,}}>{svgImage}</View>      
          <Text style={[styles.buttonText,{marginLeft: svgImage==null?60:0}]}>{text}</Text>
        </View>
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
    padding: 18,
    borderRadius: 82,
    backgroundColor: color.primaryBlue,
    elevation: 3,
  },

  buttonText:{
    fontFamily: font.semiBold,
    color: color.white,
    fontSize: 16,
    textAlignVertical:'center',
    textAlign:'center',
    marginRight:60,
  },

  insideButton:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    
  },

})

export default SimpleButton

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
    width?:number;
    textColor?:string;
    buttonColor?:string;
    disabled?:boolean;
}

const SimpleButton : React.FC<Props>= ({text, onPress,svgImage=null, width=undefined,textColor=color.white,buttonColor=color.primaryBlue, disabled=false}) => {
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
  });

  

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    
    <TouchableOpacity onPress={disabled?()=>{}:onPress} style={[styles.container,]}>
      <View style={[styles.button,{backgroundColor:disabled?color.borderGrey:buttonColor,width:width}]}>
        <View style={styles.insideButton}>
          <View style={{}}>{svgImage}</View>      
          <Text style={[styles.buttonText,{color:textColor}]}>{text}</Text>
          <View style={svgImage?{width:20,height:20,backgroundColor:disabled?color.borderGrey:buttonColor}:null}></View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'center',
    margin:10,
    marginLeft:60,
    marginRight:60,
    
  },
  button:{
    padding: 18,
    borderRadius: 82,
    elevation: 3,
  },

  buttonText:{
    fontFamily: font.semiBold,
    fontSize: 16,
    textAlignVertical:'center',
    textAlign:'center',
    marginLeft:30,
    marginRight:30,
  },

  insideButton:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:5,
    marginRight:5,
    alignItems:'center',
  },

})

export default SimpleButton

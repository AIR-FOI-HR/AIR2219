import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { color, font } from "../lib/style/theme";
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
    placeholder:string;
    warning:string;
    onFocus:any;
    onChange:any;
}

const TitledInput = ({title,placeholder,warning,onFocus,onChange}:Props) => {
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
  
  const [isFocused, setIsFocused]=React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput 
      style={[styles.input,{borderColor: warning ? color.failureRed:color.primaryBlue}]} 
      placeholder={placeholder} autoCorrect={false}
      onFocus={()=>{
        onFocus();
        setIsFocused(true);
        }}
        
        onBlur={()=>{
          setIsFocused(false);
        }}

        onChangeText = {onChange}
        />

    
      <Text style={[styles.warning,{opacity: warning ?  1 : 0}]}>*{warning}</Text>
    </View>
  )
}

export default TitledInput

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        marginBottom:10,
    },

    title:{
        fontSize:16,
        fontFamily:font.regular,
        color: color.black,
        margin:5,
    },

    input:{
        fontSize:14,
        fontFamily:font.regular,
        color: color.black,
        margin:5,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
        borderWidth:1,
        borderRadius:40,

    },

    warning:{
        fontSize:12,
        fontFamily:font.lightItalic,
        color:color.failureRed,
        margin:3,
    }

})
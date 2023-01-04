import {NativeSyntheticEvent, StyleSheet, Text, TextInputFocusEventData, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { color, font } from "../lib/style/theme";
import {
    useFonts, 
    OpenSans_400Regular,
    OpenSans_300Light_Italic, 
  }from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading"
import ShowPasswordIcon from '../assets/ic_SeePasswordEye.svg'
import HidePasswordIcon from '../assets/ic_HidePassword.svg'

interface Props{
    title:string;
    placeholder:string;
    onChangeText:(event: string) => void;
    onBlur:(event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    value:string;
    touched:boolean | undefined;
    errors:string | undefined;
    password?:boolean;
}

const TitledInput : React.FC<Props> = ({title,placeholder,password=false,...props}) => {
  const [hidePassword,setHidePassword] = useState<boolean>(true)
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_300Light_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.input, {borderColor: (props.errors && props.touched) ? color.failureRed:color.primaryBlue}]}>
        <TextInput 
        secureTextEntry={password && hidePassword}
        placeholder={placeholder} autoCorrect={false}
        onChangeText={props.onChangeText}
        onBlur = {props.onBlur}
        value= {props.value}
        style={password ? {width:'90%'}: {flex:1}}
        />
        {password &&
          (hidePassword?
          <HidePasswordIcon style={password && {width:'10%'}} onPress={()=>setHidePassword(!hidePassword)}/>
          :<ShowPasswordIcon style={password && {width:'10%'}} onPress={()=>setHidePassword(!hidePassword)}/>)}
      </View>
    {(props.errors && props.touched) &&
      <Text style={[styles.warning,]}>*{props.errors}</Text>
    }
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
        borderColor: color.primaryBlue,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },

    warning:{
        fontSize:12,
        fontFamily:font.lightItalic,
        color:color.failureRed,
        margin:3,
    }

})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { color, font } from '../lib/style/theme'
import {
    useFonts,
    OpenSans_600SemiBold,
  }from "@expo-google-fonts/open-sans";
import AppLoading from 'expo-app-loading';
import Checkmark from '../assets/ic_Checkmark_Blue.svg';
import { Modal } from 'react-native';
interface Props{
    state:string;
}

const Loader : React.FC<Props> = ({state}) => {
    let [fontsLoaded] = useFonts({
        OpenSans_600SemiBold,
      });

      const animation = useRef(null);
    const LottieView = require("lottie-react-native");

    useEffect(() => {
      }, []);
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    
    return (
        
        (state=='hide' ? null : 
            <Modal>
                <View style={[StyleSheet.absoluteFillObject,styles.container]}>
                    {state=='loading' && 
                        <View style={styles.container}>
                            <LottieView ref={animation} speed={1.5} autoPlay style={{width: 200,height: 200,marginBottom:20}} source={require('../assets/anim_Loading.json')}/>
                            <Text style={styles.text}>Please wait ...</Text>
                        </View>
                    }

                    {state=='success' && (
                        <View style={styles.container}>
                            <LottieView ref={animation} speed={1} autoPlay style={{width: 200,height: 200,marginBottom:20}} source={require('../assets/anim_Success.json')}/>
                            <Text style={styles.text}>Success!</Text>
                        </View>
                    )}

                    {state=='failure' && 
                        <View style={styles.container}>
                            <LottieView ref={animation} speed={0.75} autoPlay style={{width: 150,height: 150,marginBottom:20}} source={require('../assets/anim_Failure.json')}/>
                            <Text style={styles.failureText}>Failure!</Text>
                        </View>
                    }
                </View>
            </Modal>
        )
        
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:color.white,
    },
    text:{
        fontFamily: font.semiBold,
        fontSize: 24,
        color: color.primaryBlue,
    },
    failureText:{
        fontFamily: font.semiBold,
        fontSize: 24,
        color: color.primaryOrange,
    },
    icon:{
        margin:40,
    }

})
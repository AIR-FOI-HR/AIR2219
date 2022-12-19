import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, font } from '../lib/style/theme'
import {
    useFonts,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  } from "@expo-google-fonts/open-sans";
import AppLoading from 'expo-app-loading';

interface Props{
    state:boolean;
}

const PastOrder : React.FC<Props>= ({state}) => {
    let [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_600SemiBold,
      });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View style={[styles.container,{borderTopColor: state?color.primaryBlue:color.primaryOrange}]}>

            <View style={styles.topTextContainer}>
                <Text style={styles.dateText}>31/10/2022</Text>
                <Text style={styles.priceText}>3,00 HRK</Text>
            </View>
            <Text style={[styles.addressText,{color:state?color.primaryBlue:color.primaryOrange}]}>Ul. Vladimira Nazora 6, 42000, Varaždin</Text>

        </View>
    )
}

export default PastOrder

const styles = StyleSheet.create({
    container:{
        alignSelf:'stretch',
        backgroundColor:color.white,
        padding:15,
        borderRadius:10,
        borderTopWidth:3.5,
        elevation:2,
        marginLeft:20,
        marginRight:20,
        marginBottom:10,
        marginTop:10,
    },
    topTextContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:30,
    },
    dateText:{
        fontFamily:font.regular,
        fontSize:14,

    },
    priceText:{
        fontFamily:font.semiBold,
        fontSize:14,
    },
    addressText:{
        fontFamily:font.semiBold,
        fontSize:16,
    }

})
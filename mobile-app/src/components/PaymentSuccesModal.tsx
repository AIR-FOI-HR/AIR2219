import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, BackHandler } from 'react-native'
import React, { useState } from 'react'
import { color, font } from '../lib/style/theme';
import {
  useFonts,
  OpenSans_400Regular,
}from "@expo-google-fonts/open-sans";
import AppLoading from 'expo-app-loading';

const PaymnetSuccesModal : React.FC = () => {  
    let [fontsLoaded] = useFonts({
      OpenSans_400Regular,
    });

    const [hide,setHide] = useState(false);

    function handlePress(){
      setHide(true);
    }

    if (!fontsLoaded) {
      return <AppLoading />;
    }
    return (
      <Modal animationType='fade' transparent visible={!hide} style={styles.modalContainer}>
        <TouchableOpacity onPress={handlePress} style={styles.touchContainer}>
          <View style={styles.textBox}>
            <Text style={styles.text}>Plaćanje uspješno izvršeno. </Text>
          </View>
        </TouchableOpacity>
        </Modal>
    )
}

export default PaymnetSuccesModal



const styles = StyleSheet.create({
  modalContainer:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchContainer:
  {
    backgroundColor:color.transparentGray,
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  textBox:
  {
    backgroundColor:color.white,
    elevation:1,
    padding:20,
    borderRadius:15,
    alignContent:'center',
    justifyContent:'center'
  },
  text:
  {
    textAlign:'center',
    fontFamily: font.regular,
    fontSize:16,
    color:color.primaryBlue
  }
  });
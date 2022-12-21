import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PastOrder from '../components/PastOrder'

import FilterIcon from '../assets/ic_Filter.svg';
import PurchaseHistoryModal from '../components/PurchaseHistoryModal';

const mock=[
    {date:'31/10/2022',price:'0,40',address:'Ul. Vladimira Nazora 6, 42000 Varaždin',status:true},
    {date:'20/10/2022',price:'0,40',address:'Ul. Perice Bjelčića, 42000 Varaždin',status:true},
    {date:'05/09/2022',price:'0,40',address:'Ul. Vladimira Nazora 6, 42000 Varaždin',status:false},
    {date:'06/08/2022',price:'0,40',address:'Ul. Ankice Opolski, 42000 Varaždin',status:true},
    {date:'01/08/2022',price:'0,40',address:'Ul. Vladimira Nazora 6, 42000 Varaždin',status:false},
    {date:'13/07/2022',price:'0,35',address:'Trg kralja Tomislava 5, 48000 Koprivnica',status:false},
    {date:'02/07/2022',price:'0,40',address:'Ul. Perice Bjelčića, 42000 Varaždin',status:true},
    {date:'05/05/2022',price:'0,50',address:'Ul. Erazma Barčića 48, 40000 Zagreb',status:true},
    {date:'23/04/2022',price:'0,40',address:'Ul. Perice Bjelčića, 42000 Varaždin',status:false},
    {date:'10/04/2022',price:'0,40',address:'Ul. Perice Bjelčića, 42000 Varaždin',status:true},
]

const PurchaseHistory : React.FC = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>-- TO ADD -- Title</Text>
                <TouchableOpacity onPress={()=>{}}>
                    <FilterIcon/>
                </TouchableOpacity>
            </View>

            <View>
                <FlatList 
                data={mock}
                renderItem={({item})=> (
                    <PastOrder order={item}/>
                )}
                >

                </FlatList>
            </View>
            <Button title='text' onPress={()=>navigation.navigate('profile')}/>
        </View>
    )
}

export default PurchaseHistory

const styles = StyleSheet.create({
    container:{
        height:'100%',
        flexDirection:'column',
        padding:30,
    },

    titleContainer:{
        flexDirection:'row',
        justifyContent:'center',
    },
    titleText:{
        textAlign:'center',
    }


})
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PastOrder from '../components/PastOrder'

import FilterIcon from '../assets/ic_Filter.svg';
import Title from '../components/Title';
import { color } from '../lib/style/theme';

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

interface Props{
    navigation:any;
}

const PurchaseHistory : React.FC<Props> = ({navigation}) => {
    return (
        <View style={styles.container}>


            <View style={styles.flatListContainer}>
                <FlatList 
                data={mock}
                renderItem={({item})=> (
                    
                    <PastOrder order={item}/>
                )}
                ListHeaderComponent={()=>(
                    <View style={styles.titleContainer}>
                    <Title color={color.primaryBlue} fontSize={24} value='Purchase history'/>
                    <TouchableOpacity onPress={()=>{}}>
                        <FilterIcon/>
                    </TouchableOpacity>
                </View>)
                }
                >
                </FlatList>
            </View>
        </View>
    )
}

export default PurchaseHistory

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        paddingTop:30,
    },

    titleContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:25,
        marginTop:10,
    },
    flatListContainer:{
        flex:1,
    }


})
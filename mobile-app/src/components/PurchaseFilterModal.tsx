import {Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color, font } from '../lib/style/theme'
import Title from './Title'
import DatePicker from './DatePicker'
import SimpleButton from './SimpleButton'
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper'
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular
}from "@expo-google-fonts/open-sans";
import { Formik } from 'formik';
import { getAllCities } from '../api/cities'
import { City } from '../api/models/response/City'

interface Props{
    show:boolean;
    onClose:any;
}

//-- TO DO-- 
//fetch cities from the database
const PurchaseFilterModal : React.FC<Props> = ({show=false,onClose}) => {
    const [citiesData,setCitiesData] = useState<{key:string,value:string}>();
    const [checked, setChecked] = useState('');  

    let attributes = [                                        
        {key:'city',value:'City'},
        {key:'createdAt',value:'Date'},
        {key:'price',value:'Price'},
    ];


    let [fontsLoaded] = useFonts({
        OpenSans_300Light,
        OpenSans_400Regular
    });

    function closeModal(values:any){
        onClose(values);
    }

    function submit(values:any){
        closeModal(values);
    }

    useEffect(() => {
        (async () => {
            const cities:City[] = await getAllCities();
            setCitiesData(cities.map((city)=>({key:city['id'],value:city['name']})));
            })();
      }, []);
    

  return (
    <> 
        <Formik
        initialValues={{city:'',startDate:'',endDate:'',attribute:'',sortDirection:'',}}
        validateOnMount={true}
        onSubmit={values => submit(values)}>
        {({handleSubmit, values, setFieldValue }) => (
        show && (
            <> 
                <Modal transparent>
                    <View style={styles.background}>
                        <View style={styles.modalScreen}>
                            <View style={styles.filterSection}>
                                <Title value='Filter' color={color.primaryBlue} fontSize={20}/>
                                <SelectList 
                                    setSelected={(val:any) => {
                                        let valueKey = citiesData.find(element=>element.value==val)==undefined?val:citiesData.find(element=>element.value==val).key;
                                        setFieldValue('city',valueKey);
                                    }} 
                                    data={citiesData} 
                                    defaultOption={{key:values.city,value:(citiesData.find(element=>element.key==values.city)==undefined?values.city:citiesData.find(element=>element.key==values.city).value)}}
                                    save="value"
                                    search={false}
                                    boxStyles={styles.dropDownBox}
                                    inputStyles={styles.dropDownInput}
                                    dropdownStyles={styles.dropDownDropDown}
                                    dropdownTextStyles={styles.dropDownText}
                                    placeholder={'Select city'}
                                    
                                />
                                <View style={{marginTop:15}}>
                                    <DatePicker title='Start: ' value={values.startDate} setFieldValue={setFieldValue} valueName={'startDate'}/>
                                    <DatePicker title='End: ' value={values.endDate} setFieldValue={setFieldValue} valueName={'endDate'}/>
                                </View>
                            </View>
                            <View style={styles.sortSection}>
                                <Title value='Sort' color={color.primaryBlue} fontSize={20}/>
                                <SelectList 
                                    setSelected={(val:any) => {
                                        let valueKey = attributes.find(element=>element.value==val)==undefined?val:attributes.find(element=>element.value==val).key;
                                        setFieldValue('attribute',valueKey);}} 
                                    data={
                                        attributes
                                    }
                                    //-- TO DO --
                                    //Check to see if all of these attributes are "checkable"
                                    defaultOption={{key:values.attribute,value:(attributes.find(element=>element.key==values.attribute)==undefined?values.attribute:attributes.find(element=>element.key==values.attribute).value)}}
                                    save="value"
                                    search={false}
                                    boxStyles={styles.dropDownBox}
                                    inputStyles={styles.dropDownInput}
                                    dropdownStyles={styles.dropDownDropDown}
                                    dropdownTextStyles={styles.dropDownText}
                                    placeholder={'Select attribute'}
                                />
                                <View style={styles.radioGroup}>
                                    <View style={styles.radioButton}>
                                        <Text style={styles.radioText}>Ascending</Text>
                                        <RadioButton 
                                            value='ASC' 
                                            status={ checked === 'ASC' ? 'checked' : 'unchecked' } 
                                            onPress={()=>{setChecked('ASC');setFieldValue('sortDirection','ASC')}} 
                                            color={color.primaryBlue}
                                            uncheckedColor={color.primaryBlue}
                                        />
                                    </View >
                                    <View style={styles.radioButton}>
                                        <Text style={styles.radioText}>Descending</Text>
                                        <RadioButton 
                                            value='DESC' 
                                            status={ checked === 'DESC' ? 'checked' : 'unchecked' } 
                                            onPress={()=>{setChecked('DESC');setFieldValue('sortDirection','DESC')}} 
                                            color={color.primaryBlue}
                                            uncheckedColor={color.primaryBlue}
                                        />
                                    </View>
                                </View>
                            </View>
                            <SimpleButton text='Search' onPress={handleSubmit} width={210}/>      
                        </View>
                    </View>
                </Modal>
            </>))}
        </Formik>
    </>
  )
}

export default PurchaseFilterModal

const styles = StyleSheet.create({
    background:{
        backgroundColor: color.transparentGray,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    modalScreen:{
        backgroundColor:color.white,
        padding:20,
        paddingBottom:10,
        borderRadius:10,
        elevation:2,
        justifyContent:'space-evenly',
        width:'80%',
        borderWidth:3,
        borderColor:color.primaryBlue,
    },
    filterSection:{
        marginBottom:20,
    },
    sortSection:{
        marginBottom:40,
    },
    dropDownBox:{
        borderWidth:2,
        borderColor:color.primaryBlue,
        borderRadius:0,
        elevation:1,
    },
    dropDownInput:{
        color:color.primaryBlue,
        textAlign:'center',
        fontSize:14,
        fontFamily:font.regular,
    },
    dropDownDropDown:{
        borderWidth:1,
        borderRadius:10,
        borderColor:color.primaryBlue,
        maxHeight:100,
        backgroundColor:'rgba(0,0,0,0.05)',
    },
    dropDownText:{
        color:color.primaryBlue,
    },
    radioGroup:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:6,
        marginTop:10,
    },
    radioButton:
    {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    radioText:{
        fontFamily:font.light,
        fontSize:14,
    }

})
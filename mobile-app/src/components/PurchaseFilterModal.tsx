import {Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
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

interface Props{
    show:boolean;
    onClose:any;
}

const cities = [
    {key:'1', value:'Varaždin'},
    {key:'2', value:'Split'},
    {key:'3', value:'Zagreb'},
    {key:'4', value:'Koprivnica'},
    {key:'5', value:'Zbelava'},
]
//-- TO DO-- 
//fetch cities from the database
const PurchaseFilterModal : React.FC<Props> = ({show=false,onClose}) => {
    const [checked, setChecked] = useState('');  
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
                                    setSelected={(val:any) => {setFieldValue('city',val)}} 
                                    data={cities} 
                                    defaultOption={{key:values.city,value:values.city}}
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
                                    setSelected={(val:any) => {setFieldValue('attribute',val)}} 
                                    data={
                                        [
                                            {key:1,value:'City'},
                                            {key:2,value:'Date'},
                                            {key:3,value:'Price'},
                                        ]                
                                    }
                                    //-- TO DO --
                                    //Check to see if all of these attributes are "checkable"
                                    defaultOption={{key:values.attribute,value:values.attribute}}
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
                                            value='asc' 
                                            status={ checked === 'asc' ? 'checked' : 'unchecked' } 
                                            onPress={()=>{setChecked('asc');setFieldValue('sortDirection','asc')}} 
                                            color={color.primaryBlue}
                                            uncheckedColor={color.primaryBlue}
                                        />
                                    </View >
                                    <View style={styles.radioButton}>
                                        <Text style={styles.radioText}>Descending</Text>
                                        <RadioButton 
                                            value='desc' 
                                            status={ checked === 'desc' ? 'checked' : 'unchecked' } 
                                            onPress={()=>{setChecked('desc');setFieldValue('sortDirection','desc')}} 
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
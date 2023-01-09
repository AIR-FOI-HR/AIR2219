import {StyleSheet, Text, View, TextInput} from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import CalendarIcon from '../assets/ic_Calendar.svg';
import { color, font } from '../lib/style/theme';
import {
    useFonts,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
  
  }from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading"

interface Props{
  title:string;
  setFieldValue:(field: string, value: any, shouldValidate?: boolean | undefined) => void;
  valueName:string;
  value:string;
}

const DatePicker : React.FC<Props> = ({title,...props}) => {
    const [show,setShow] = useState<boolean>(false);
    const [text,setText] = useState<string>('__/__/____');
    const [date,setDate] = useState<Date>(new Date());

    const onChange= (event:DateTimePickerEvent,selectedDate?:Date)=>{
      setShow(false);
      const currentDate=selectedDate || date;
      setDate(currentDate);
      let tempDate:Date = new Date(currentDate);  
      let fDate:string = tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
      setText(fDate);
      props.setFieldValue(props.valueName,fDate);
    }

    let [fontsLoaded] = useFonts({
        OpenSans_300Light_Italic,
        OpenSans_400Regular,
        OpenSans_400Regular_Italic,
      });
    
    
    if (!fontsLoaded) {
      return <AppLoading />;
    }
    
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={()=>setShow(true)} style={styles.borderedDate}>
              <TextInput placeholder={text} editable={false} style={styles.text} value={props.value}/>
              <CalendarIcon width={20} height={20}/>
          </TouchableOpacity>
          {show && <DateTimePicker value={date} display='default' onChange={onChange}/>}
      </View>
    )
}

export default DatePicker

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    
  },
  title:{
    fontSize:16,
    fontFamily:font.regular,
    marginRight:5,
    width:'17%',
    textAlign:'center',
    marginBottom:10,
  },
  borderedDate:{
      flexDirection:'row',
      justifyContent:'space-between',
      borderWidth:2,
      borderRadius:10,
      marginBottom:10,
      borderColor:color.primaryBlue,
      flex:1,
      alignItems:'center',
      paddingRight:5,
      height:40,
  },
  text:{
      textAlign:'center',
      flex:1,
      fontFamily:font.regular,
      fontSize:14,
  }
})
import { StyleSheet, Text, View, Button, InputAccessoryView } from "react-native";
import React from "react";
import SimpleTitledText from "../components/SimpleTitledText";
import { color } from "../lib/style/theme";
import Title from "../components/Title";
import TitledInput from "../components/TitledInput";
import SimpleButton from "../components/SimpleButton";
import { registerRootComponent } from "expo";

interface Props{
  navigation:any;
}

const Payment = ({navigation}:Props) => {

  const [inputs,setInputs] = React.useState({
    cardNumber: '',
    date:'',
    controlNumber: '',
  })
  
  const [warnings,setWarnings] = React.useState({})


  const handleWarning = (warningMessage:string,input:string)=>{
    setWarnings((prevState)=>({...prevState,[input]:warningMessage}))
  }

  const validate = () =>{

    handleWarning(null,'cardNumber');
    handleWarning(null,'date');
    handleWarning(null,'controlNumber');
    let valid = true;
    if(!inputs.cardNumber){
      handleWarning('Niste unijeli broj kartice!','cardNumber');
      valid = false;
    }
    else if(!inputs.cardNumber.match(/^[0-9]{16}$/g)){
      handleWarning('Unijeli ste pogrešan format broja kartice!','cardNumber');
      valid = false;
    }

    if(!inputs.date){
      handleWarning('Niste unijeli datum!','date');
      valid = false;
    }    
    else if(!inputs.date.match(/^[0-9]{2}\/[0-9]{2}$/g)){
      handleWarning('Unijeli ste pogrešan format datuma!','date');
      valid = false;
    }

    if(!inputs.controlNumber){
      handleWarning('Niste unijeli kontrolni broj!','controlNumber');
      valid = false;
    }    
    else if(!inputs.controlNumber.match(/^[0-9]{3}$/g)){
      handleWarning('Unijeli ste pogrešan format kontrolnog broja!','controlNumber');
      valid = false;
    }

    if(valid){
      register();
      
    }
  };

  const register = ()=>{
    navigation.navigate("scannerOptions")
  }
  const handleOnChange = (text:string,input:string)=>{
    setInputs(prevState => ({...prevState, [input]: text}));
  }
  return (
    <View style={styles.container}>
      <View>
        <Title value="Plaćanje" fontSize={24} color={color.primaryBlue}/>
      </View>

      <View>
        <SimpleTitledText title="Brava" value="Ul. Vladimira Nazora 17, 42000 Varaždin" valueColor={color.primaryBlue}/>
        <SimpleTitledText title="Cijena" value="3,00 HRK" valueColor={color.primaryOrange}/>
      </View>

      <View>
        <View>
          <TitledInput title="Broj kartice" placeholder="xxxx xxxx xxxx xxxx" warning={warnings.cardNumber} onFocus={()=>handleWarning(null,'cardNumber')} onChange={(text:string) => handleOnChange(text,'cardNumber')}/>
        </View>

        <View style={{flexDirection:'row'}}>
          <View style={{flex:1,marginRight:20}}>
          <TitledInput title="Datum isteka" placeholder="MM/YY" warning={warnings.date} onFocus={()=>handleWarning(null,'date')}  onChange={(text:string) => handleOnChange(text,'date')}/>
          </View>
          <View style={{flex:1,marginLeft:20}}>
            <TitledInput title="Kontrolni broj" placeholder="xxx" warning={warnings.controlNumber} onFocus={()=>handleWarning(null,'controlNumber')}  onChange={(text:string) => handleOnChange(text,'controlNumber')}/>
          </View>
        </View>

      </View>

      <View>
        <SimpleButton text="Potvrdi" onPress={validate}/>
        <SimpleButton text="Otkaži" onPress={() => navigation.navigate("scannerOptions")}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    flexDirection:'column',
    justifyContent:'space-between',
    padding:30,
  },
});

export default Payment;

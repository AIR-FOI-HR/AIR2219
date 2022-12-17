import { StyleSheet, View} from "react-native";
import React from "react";
import SimpleTitledText from "../components/SimpleTitledText";
import { color } from "../lib/style/theme";
import Title from "../components/Title";
import TitledInput from "../components/TitledInput";
import SimpleButton from "../components/SimpleButton";
import * as yup from 'yup';
import {Formik} from 'formik';
import {ScrollView} from 'react-native';
import PaymnetSuccesModal from "../components/PaymentSuccesModal";

interface Props{
  navigation:any;
  data:any;
  showModal:boolean;
}

const paymentValidationSchema = yup.object().shape({
  cardNumber: 
    yup.string()
    .matches(/^[0-9]*$/,'Broj kartice se mora sastojati samo od brojeva!')
    .min(16,({min})=>'Premalo znamenka! Broj kartice mora imati točno 16 znamenka')
    .max(16,({max})=>'Previše znamenka! Broj kartice mora imati točno 16 znamenka')
    .required('Niste unijeli broj kartice')
    ,

  expirationDate:
    yup.string()
    .matches(/^[0-9]{2}\/[0-9]{2}$/g,'Pogrešan format datuma isteka!')
    .required('Niste unijeli datum isteka'),

  CVV:
    yup.string()
    .matches(/^[0-9]*$/,'Kontrolni broj se smije sastojati samo od brojeva')
    .min(3,'Kontrolni broj čine tri znamenke!')
    .max(3,'Kontrolni broj čine tri znamenke!')
    .required('Niste unijeli kontrolni broj'),
  
})

const Payment : React.FC<Props> = ({navigation,data={address:'Ul. Vladimira Nazora 17',cityCode:'42000',cityName:'Varaždin',price:'3,00'},showModal=true}) => {
  function ime(values:string) {
    alert(values);
    navigation.navigate("scannerOptions");
  }

  return (
    
    <Formik
      initialValues={{cardNumber: '', expirationDate:'',CVV:''}}
      validateOnMount={true}
      onSubmit={values => ime(JSON.stringify(values))}
      validationSchema={paymentValidationSchema}> 
      {({ handleChange, handleBlur, handleSubmit, values, touched,errors, isValid }) => (

        <ScrollView style={styles.container}  contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <View>
            <Title value="Plaćanje" fontSize={24} color={color.primaryBlue}/>
          </View>

          <View>
            <SimpleTitledText title="Brava" value={`${data?.address}, ${data?.cityCode} ${data?.cityName}`}valueColor={color.primaryBlue}/> 
            <SimpleTitledText title="Cijena" value={`${data?.price}, EUR`} valueColor={color.primaryOrange}/>
          </View>
          {showModal && (<PaymnetSuccesModal/>)}
          <View>
            <View>
              <TitledInput title="Broj kartice" placeholder="xxxx xxxx xxxx xxxx" 
              onChangeText={handleChange('cardNumber')} onBlur={handleBlur('cardNumber')} value={values.cardNumber} errors={errors.cardNumber} touched={touched.cardNumber}/>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={{flex:1,marginRight:20}}>
                <TitledInput title="Datum isteka" placeholder="MM/YY"
                onChangeText={handleChange('expirationDate')} onBlur={handleBlur('expirationDate')} 
                value={values.expirationDate} errors={errors.expirationDate} touched={touched.expirationDate} />
              </View>
              <View style={{flex:1,marginLeft:20}}>
                <TitledInput title="Kontrolni broj" placeholder="xxx" 
                onChangeText={handleChange('CVV')} onBlur={handleBlur('CVV')} 
                value={values.CVV} errors={errors.CVV} touched={touched.CVV}/>
              </View>
            </View>

          </View>

          <View>
            <SimpleButton text="Potvrdi" onPress={handleSubmit}/>
            <SimpleButton text="Otkaži" onPress={() => navigation.navigate("scannerOptions")}/>
          </View>
        </ScrollView>

      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    flexDirection:'column',
    padding:30,
  },
});

export default Payment;

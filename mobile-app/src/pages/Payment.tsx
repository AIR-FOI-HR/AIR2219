import { ActivityIndicator, StyleSheet, View} from "react-native";
import React, { useState } from "react";
import SimpleTitledText from "../components/SimpleTitledText";
import { color } from "../lib/style/theme";
import Title from "../components/Title";
import TitledInput from "../components/TitledInput";
import SimpleButton from "../components/SimpleButton";
import * as yup from 'yup';
import {Formik} from 'formik';
import {ScrollView} from 'react-native';
import PaymnetSuccesModal from "../components/PaymentSuccessModal";
import SwipeButton from 'rn-swipe-button';
import {
  useFonts,
  OpenSans_600SemiBold,
}from "@expo-google-fonts/open-sans";
import { font } from "../lib/style/theme";
import AppLoading from "expo-app-loading";
import SliderArrow from "../assets/ic_SliderArrow.svg";
import Loader from "../components/Loader";
import { Restroom } from "../api/models/response/Restroom";

interface Props{
  navigation:any;
  restroomData:Restroom;
}

const paymentValidationSchema = yup.object().shape({
  cardNumber: 
    yup.string()
    .matches(/^[0-9]*$/,'The card number should consist only of numbers!')
    .min(16,({min})=>'Not enough digits! The card number consists of 16 digits!')
    .max(16,({max})=>'Too many digits! The card number consists of 16 digits!')
    .required('This field is required!')
    ,

  expirationDate:
    yup.string()
    .matches(/^[0-9]{2}\/[0-9]{2}$/g,'Expiration date format is MM/DD!')
    .required('This field is required!'),

  CVV:
    yup.string()
    .matches(/^[0-9]*$/,'The CVV should consist only of numbers!')
    .min(3,'The CVV is 3 digits long!')
    .max(3,'The CVV is 3 digits long!')
    .required('This field is required!'),
  
})

const Payment : React.FC<Props> = ({navigation,restroomData={address:'Ul. Vladimira Nazora 17',cityCode:'42000',cityName:'Varaždin',price:'3,00'}}) => {
  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
  });

  const [loaderState, setLoaderState] = useState<string>('hide');


  async function submit(values:string) {
    
    setLoaderState('loading')

    setTimeout(()=>{

      setLoaderState('success');

      setTimeout(()=>{
        setLoaderState('failure');

        setTimeout(()=>{setLoaderState('hide')},2000)

      },2000);


    },
    2000);

    

    
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Formik
        initialValues={{cardNumber: '', expirationDate:'',CVV:''}}
        validateOnMount={true}
        onSubmit={values => submit(JSON.stringify(values))}
        validationSchema={paymentValidationSchema}> 
        {({ handleChange, handleBlur, handleSubmit, values, touched,errors, isValid }) => (

          <ScrollView style={styles.container}  contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
            <View>
              <Title value="Plaćanje" fontSize={24} color={color.primaryBlue}/>
            </View>
            <View>
              <SimpleTitledText title="Door" value={`${restroomData?.address}, ${restroomData?.cityCode} ${restroomData?.cityName}`}valueColor={color.primaryBlue}/> 
              <SimpleTitledText title="Price" value={`${restroomData?.price}, EUR`} valueColor={color.primaryOrange}/>
            </View>
            <View>
              <View>
                <TitledInput title="Card number" placeholder="xxxx xxxx xxxx xxxx" 
                onChangeText={handleChange('cardNumber')} onBlur={handleBlur('cardNumber')} value={values.cardNumber} errors={errors.cardNumber} touched={touched.cardNumber}/>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1,marginRight:20}}>
                  <TitledInput title="Expiration date" placeholder="MM/YY"
                  onChangeText={handleChange('expirationDate')} onBlur={handleBlur('expirationDate')} 
                  value={values.expirationDate} errors={errors.expirationDate} touched={touched.expirationDate} />
                </View>
                <View style={{flex:1,marginLeft:20}}>
                  <TitledInput title="CVV" placeholder="xxx" 
                  onChangeText={handleChange('CVV')} onBlur={handleBlur('CVV')} 
                  value={values.CVV} errors={errors.CVV} touched={touched.CVV}/>
                </View>
              </View>
            </View>

            <View style={{marginTop:35}}>
              <SwipeButton 
              disabled={isValid?false:true}
              title='Slide to confirm'
              swipeSuccessThreshold={75} 
              containerStyles={styles.slideContainer}
              thumbIconStyles={styles.slideIcon} 
              thumbIconComponent={SliderArrow}
              railStyles={styles.slideRail} 
              titleStyles={styles.slideTitle}
              onSwipeSuccess={handleSubmit}
              railBackgroundColor={color.primaryBlue}
              railFillBorderColor={'rgba(0,0,0,0)'}
              thumbIconBackgroundColor={color.white}
              thumbIconBorderColor= {'rgba(0,0,0,0)'}
              railBorderColor={'rgba(0,0,0,0)'}
              shouldResetAfterSuccess={true}
              resetAfterSuccessAnimDuration={200}
              />
              <SimpleButton text="Otkaži" onPress={() => navigation.navigate("scannerOptions")}/>
            </View>
          </ScrollView>
          
          
        )}
      </Formik>

      <Loader state={loaderState}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    flexDirection:'column',
    padding:30,
  },
  slideContainer:
  {
    elevation:3, 
    padding: 3,
    marginBottom: 10,
  },
  slideIcon:{
    borderBottomColor:'rgba(230,230,230,1)',
    borderColor:'rgba(230,230,230,1)',
    borderEndColor:'rgba(230,230,230,1)',
    borderTopColor:'rgba(230,230,230,1)',
    borderLeftColor:'rgba(230,230,230,1)',
    borderRightColor:'rgba(230,230,230,1)',
    borderStartColor:'rgba(230,230,230,1)',
  },
  slideRail:
  {
    backgroundColor:'rgba(0,109,170,0.9)',
  },
  slideTitle:
  {
    fontSize:16,
    fontFamily: font.semiBold,
    color:color.white,
  }
});

export default Payment;
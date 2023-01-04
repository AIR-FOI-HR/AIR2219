
import { ScrollView, StyleSheet,View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import Title from '../components/Title'
import { color } from '../lib/style/theme'
import TitledInput from '../components/TitledInput'
import SimpleButton from '../components/SimpleButton'
import CheckmarkIcon from '../assets/ic_Checkmark.svg'
import * as yup from 'yup';

const paymentValidationSchema = yup.object().shape({
    name: 
        yup.string()
        .min(2,({min})=>'Not enough letters! Your name should consist of at least 2 letters!')
        .max(50,({max})=>'Too many letters! Your name should consist of at most 50 letters!')
        .required('This field is required!'),

    surname:
      yup.string()
      .min(2,({min})=>'Not enough letters! Your surname should consist of at least 2 letters!')
      .max(50,({max})=>'Too many letters! Your surname should consist of at most 50 letters!')
      .required('This field is required!'),

    email:
      yup.string()
      .email()
      .required('This field is required!'),

    phoneNumber:
        yup.string()
        .required('This field is required!'),
  
  })

interface Props{
    navigation:any;
}

const EditProfile : React.FC<Props>= ({navigation}) => {

    function submit(values:any){
      alert(JSON.stringify(values));
    }
        
    return (
        <>
            <Formik
                initialValues={{name:'',surname:'',email:'',phoneNumber:''}}
                validateOnMount={true}
                onSubmit={values => submit(values)}
                validationSchema={paymentValidationSchema}> 
                {({ handleChange, handleBlur, handleSubmit, values, touched,errors, isValid }) => (

                <View style={styles.scrollViewContainer}> 
                    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
                        <Title color={color.primaryBlue} fontSize={24} value={'Edit profile'} />

                        <TitledInput 
                            title="Name" 
                            placeholder="Enter name" 
                            onChangeText={handleChange('name')} 
                            onBlur={handleBlur('name')} 
                            value={values.name} 
                            errors={errors.name} 
                            touched={touched.name}/>
                        
                        <TitledInput 
                            title="Surname" 
                            placeholder="Enter surname" 
                            onChangeText={handleChange('surname')} 
                            onBlur={handleBlur('surname')} 
                            value={values.surname} 
                            errors={errors.surname} 
                            touched={touched.surname}/>

                        <TitledInput 
                            title="E-mail" 
                            placeholder="email@address,com" 
                            onChangeText={handleChange('email')} 
                            onBlur={handleBlur('email')} 
                            value={values.email} 
                            errors={errors.email} 
                            touched={touched.email}/>
 
                        <TitledInput 
                            title="Phone number" 
                            placeholder="xxxxxxxxxx" 
                            onChangeText={handleChange('phoneNumber')} 
                            onBlur={handleBlur('phoneNumber')} 
                            value={values.phoneNumber} 
                            errors={errors.phoneNumber} 
                            touched={touched.phoneNumber}/>


                        <SimpleButton onPress={handleSubmit} text={'Save'} svgImage={<CheckmarkIcon width={20} height={20}/>}/>
                    </ScrollView>   
                </View>     
                )}
            </Formik>
        </>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    scrollViewContainer:{
        flex:1,
    },
    container:{
        padding:30,
    }

})

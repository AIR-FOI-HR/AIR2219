
import { ScrollView, StyleSheet,View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import Title from '../components/Title'
import { color } from '../lib/style/theme'
import TitledInput from '../components/TitledInput'
import SimpleButton from '../components/SimpleButton'
import CheckmarkIcon from '../assets/ic_Checkmark.svg'
import * as yup from 'yup';
import Loader from '../components/Loader'
import { User } from '../api/models/response/User'
import { getUserById, updateUserInfo } from '../api/users'

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
        .min(10,({min})=>'Your phone number must consist of 10 digits!')
        .max(10,({max})=>'Your phone number must consist of 10 digits!')
        .matches(/^[0-9]+$/g,'The phone number must consist of only numbers!')
        .required('This field is required!'),
  
  })

interface Props{
    navigation:any;
}

const EditProfile : React.FC<Props>= ({navigation}) => {
    const [formData,setFormData] = useState({name:'',surname:'',email:'',phoneNumber:''})

    useEffect(()=>{
        //-- TO DO--
        //Get ID of logged in user to send it to the API
        //MOCK DATA
        let id='60c8837a-87d1-4f7e-b4ed-7d260a8ceed7'
        const fetchUserInfo = async () =>{
            const user: User = await getUserById(id);
            setFormData({name:user.firstName,surname:user.lastName,email:user.email,phoneNumber:user.phone})
        };
        //

        fetchUserInfo().catch(console.error)
    },[]);

    const [loaderState,setLoaderState] = useState<string>('hide');

    async function submit(values:{name:string,surname:string, email:string,phoneNumber:string}) {
        setLoaderState('loading');
        
        //-- TO DO --
        // Update user information with API
        // AND
        // get user id from authentification
        let user:User = {id:'60c8837a-87d1-4f7e-b4ed-7d260a8ceed7',firstName:values.name,lastName:values.surname, email:values.email,phone:values.phoneNumber};
        const data = await updateUserInfo(user);
    
        if(data["error"]!=undefined){
            
          setLoaderState('failure');
          setTimeout(()=>{
            setLoaderState('hide')
          },2000);
        }
        else{
          setLoaderState('success');
          setTimeout(()=>{
            setLoaderState('hide');
            navigation.navigate("editProfile");
          },2000);
        }
      }
        
    return (
        <>
            <Formik
                initialValues={formData}
                enableReinitialize
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

            <Loader state={loaderState}/>
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

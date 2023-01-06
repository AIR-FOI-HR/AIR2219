import React from 'react'
import SimpleButton from '../components/SimpleButton';
import Title from '../components/Title';
import TitledInput from '../components/TitledInput';
import logInIcon from '../assets/ic_LogIn.svg';
import * as yup from 'yup';
import { Formik } from 'formik';
interface Props{

}

const loginValidationSchema = yup.object().shape({
  email: 
    yup.string()
    .email()
    .required('This field is required!'),

  password:
    yup.string()
    .min(8,'The password must contain at least 8 charachters!')
    .matches(/(?=.*?[A-Za-zšđčćžŠĐČĆŽ])/,"The password must contain at least one letter!")
    .matches(/(?=.*?[0-9])/,"The password must contain at least one number!")
    .matches(/(?=.*?[#?!@$%^&*-])/,"The password must contain at least one special charachter (#?!@$%^&*-)!")
    .required('This field is required!'),
  
})


const Login: React.FC<Props> = () => {

  async function submit(values:{email:string,password:string}) {
    alert(JSON.stringify(values));
  }


  return (
    <>
      <Formik
        initialValues={{email:'',password:''}}
        validateOnMount={true}
        onSubmit={values => submit(values)}
        validationSchema={loginValidationSchema}> 
        {({ handleChange, handleBlur, handleSubmit, values, touched,errors, isValid }) => (
          <div className='bg-primaryBlue w-screen h-screen flex justify-center items-center'>
              <div className='w-1/5'>
                  <div className='bg-white flex flex-col items-center rounded-xl shadow-2xl p-5 mb-3 w-full'>
                      <div className="mb-4">
                        <Title value='Log In' color='text-primaryOrange' fontSize='text-2xl'/>
                      </div>
                      <div className="w-full">
                        <TitledInput placeholder='E-mail' 
                        onChange={handleChange('email')} onBlur={handleBlur('email')} value={values.email} errors={errors.email} touched={touched.email}
                        />
                        <TitledInput placeholder='Password' password
                        onChange={handleChange('password')} onBlur={handleBlur('password')} value={values.password} errors={errors.password} touched={touched.password}
                        />
                      </div>
                      <div className='mt-5'>
                        <SimpleButton onClick={handleSubmit} text="Log in" svgImage={logInIcon} disabled={!isValid}/>
                      </div>
                  </div>
                  <div className='flex flex-row justify-between text-white'>
                      <a href='../forgotPassword' className='font-openSans hover:underline'>Forgot password?</a>
                      <a href='../register' className='font-openSans hover:underline'>Sign up</a>
                  </div>
              </div>
          </div>
        )}
        </Formik>
      </>
  );
};

export default Login;

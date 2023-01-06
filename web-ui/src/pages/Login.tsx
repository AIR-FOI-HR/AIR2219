import React from 'react'
import SimpleButton from '../components/SimpleButton';
import Title from '../components/Title';
import TitledInput from '../components/TitledInput';
import logInIcon from '../assets/ic_LogIn.svg';
const Login: React.FC = () => {
  return (
    <div className='bg-primaryBlue w-screen h-screen flex justify-center items-center'>
        <div className=''>
            <div className='bg-white flex flex-col rounded-xl shadow-lg p-5 mb-3'>
                <div className="mb-4">
                  <Title value='Log In' color='text-primaryOrange' fontSize='text-2xl'/>
                </div>
                <div>
                  <TitledInput errors='' onChange={()=>{}} onBlur={()=>{}} placeholder='E-mail' touched value='' />
                  <TitledInput errors='' onChange={()=>{}} onBlur={()=>{}} placeholder='Password' touched value='' password/>
                </div>
                <div className='mt-5'>
                  <SimpleButton onClick={()=>{alert(123)}} text="Log in" svgImage={logInIcon}/>
                </div>
            </div>
            <div className='flex flex-row justify-between text-white'>
                <a href='../forgotPassword' className='font-openSans hover:underline'>Forgot password?</a>
                <a href='../register' className='font-openSans hover:underline'>Sign up</a>
            </div>
        </div>
    </div>
  );
};

export default Login;

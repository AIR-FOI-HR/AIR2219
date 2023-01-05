import React from 'react'
import Title from '../components/Title';
import TitledInput from '../components/TitledInput';

const Login: React.FC = () => {
  return (
    <div className='bg-primaryBlue w-screen h-screen flex justify-center items-center'>
        <div className=''>
            <div className='bg-white flex flex-col justify-between items-center rounded-md shadow-lg p-5'>
                <Title value='Log In' color='text-primaryOrange' fontSize='text-2xl'/>
                <TitledInput errors='' onChange={()=>{}} onBlur={()=>{}} placeholder='E-mail' touched value='' />
                <TitledInput errors='' onChange={()=>{}} onBlur={()=>{}} placeholder='Password' touched value='' />
            </div>
            <div className='flex flex-row justify-between text-white'>
                <a href='../forgotPassword'>Forgot password?</a>
                <a href='../register'>Sign up</a>
            </div>
        </div>
    </div>
  );
};

export default Login;

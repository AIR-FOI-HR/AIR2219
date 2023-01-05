import React from 'react'
import Title from '../components/Title';
import TitledInput from '../components/TitledInput';

const Login: React.FC = () => {
  return (
    <div className='bg-green-700 w-screen h-screen flex justify-center items-center'>
        <div className='w-1/5'>
            <div className='bg-white flex flex-col justify-between items-center rounded-md shadow-lg'>
                <Title value='Log In' color='text-purple-500' fontSize='text-2xl'/>
                <TitledInput errors='' onChangeText={()=>{}} placeholder='Lol' title='Tekst' touched value='' />
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

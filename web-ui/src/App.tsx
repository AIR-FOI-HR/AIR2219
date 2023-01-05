import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ButtonTest from './pages/ButtonTest';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/button" element={<ButtonTest />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  );
};

export default App;

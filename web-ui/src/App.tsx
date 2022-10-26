import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ButtonTest from './pages/ButtonTest';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/button" element={<ButtonTest />}/>
      </Routes>
    </>
  );
};

export default App;

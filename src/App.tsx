import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import './App.css';
import RouterElements from './routes/routes';

function App() {
  return (
    <>
      <RouterElements />
      <ToastContainer />
    </>
  );
}

export default App;

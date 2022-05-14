import './index.css'
import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';

import { Provider } from 'react-redux';
import store from "./Services/Data/store";

import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

import { AnimatePresence } from 'framer-motion'
import LayoutWithContext from './Layout';


let persistor = persistStore(store);

function App() {
  const location = useLocation();
  console.log(location);
  return (

    <div style={{ height: '100vh', margin: 0 }
    } >
      <Provider store={store} >
        <PersistGate persistor={persistor} >
          <AnimatePresence exitBeforeEnter >
            <Routes location={location} key={location.key} >
              <Route path='/' element={<Navigate to='/login' replace={true} />} />
              <Route path='/login' element={<Login />} />

              <Route path='/signup' element={<Signup />} />

              <Route path='/home' element={<LayoutWithContext />} />
            </Routes>
          </AnimatePresence>

        </PersistGate>


      </Provider>


    </div >


  );


}

export default App;

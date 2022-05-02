import './index.css'
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Setting from './Pages/Setting';
import About from './Pages/About';
import Layout from './Layout';
import SettingLayout from './Layout/settingLayout';
import Security from './Pages/Setting/security';
import Preference from './Pages/Setting/preference';
import Other from './Pages/Setting/other';
import { Provider } from 'react-redux';
import store from "./Services/Data/store";
import HomeWithContext from './Pages/Home';

import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';


let persistor = persistStore(store);

function App() {

    return (

        <div style={{ height: '100vh', margin: 0 }
        } >
            <Provider store={store} >
                <PersistGate persistor={persistor} >
                    <Routes >
                        <Route path='/' element={<Navigate to='/login' replace={true} />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />}>

                        </Route>

                        <Route path='/home' element={<Layout />} >
                            <Route index element={<HomeWithContext />} />
                            <Route path='setting' element={<SettingLayout />} >
                                <Route index element={<Setting />} />
                                <Route path='security' element={<Security />} />
                                <Route path='preference' element={<Preference />} />
                                <Route path='other' element={<Other />} />
                            </Route>
                            <Route path='about' element={<About />} />
                        </Route>
                    </Routes>
                </PersistGate>


            </Provider>


        </div >


    );


}

export default App;

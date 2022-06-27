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
import Test from './Pages/test';
import { Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material';


let persistor = persistStore(store);

function App() {

    const location = useLocation();
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('lg'));
    if (mobile) {
        return (
            <Box
                display='flex' justifyContent='center' alignItems='center'
                flexDirection='column' textAlign='center'
                height='100vh'
                paddingX={2}>
                <Typography variant='h6'>
                    Unfortunatily, You must use a laptop to use this app correctly.
                    Alternatively, you can download the mobile app version in the link below.

                </Typography>
                <Link> Ah! Oops I don't build it yet.Sorry! </Link>
            </Box>
        )
    }

    return (
        <div style={{ height: '100vh', margin: 0 }} >
            <Provider store={store} >
                <PersistGate persistor={persistor} >
                    <AnimatePresence exitBeforeEnter >
                        <Routes location={location} key={location.key} >
                            <Route path='/' element={<Navigate to='/login' replace={true} />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/home' element={<LayoutWithContext />} />
                            <Route path='/test' element={<Test />} />
                        </Routes>
                    </AnimatePresence>

                </PersistGate>
            </Provider>
        </div >
    );


}

export default App;

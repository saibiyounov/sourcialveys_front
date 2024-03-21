import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import React, {useEffect, useMemo, useState,useContext} from 'react';
import GlobalStyles from './styles/Global';
import { Navigate, Route, useLocation, Routes, useNavigate } from 'react-router-dom';
// import { connect } from 'react-redux';
// import * as actions from './store/actions/index';
import theme from './styles/theme';
import OwnerRoot from './containers/AccesRoots/OwnerRoot/OwnerRoot';
import SupplierRoot from './containers/AccesRoots/SupplierRoot/SupplierRoot';
import ClientRoot from './containers/AccesRoots/ClientRoot/ClientRoot';
import { AuthContext } from 'react-oauth2-code-pkce';
function App() {
    const authService = useContext(AuthContext);
    useEffect(() => {
        if (authService?.token) {
            console.log(authService.token)
           // checkAuth(authService.token)
            //setToken({ token: authService.token, tokenContents: authService.tokenData });   
        }
    }, [authService?.token]);


    const isAuthenticatedd = true;
    const userType = "owner";
    const userLevel = "admin"
    let routes;
    if (isAuthenticatedd) {
        switch (userType) {
            case "supplier":
                routes = (
                    <SupplierRoot />
                )
                break;
            case "client":
                routes = (
                    <ClientRoot />
                )
                break;
            case "owner":
                routes = (
                    <OwnerRoot userLevel={userLevel} userType={userType} />
                )
                break;

            default:
                routes = (
                    <OwnerRoot userLevel={userLevel} userType={userType} />
                )
                break;
        }
    } else {
        routes = (
            <>
                <Routes>

                    {/* <Route path="/" element={<Auth />} /> */}
                </Routes>
            </>
        )
    }



    if (!authService.token && !authService.loginInProgress) {
       // authService.login()
        return ( <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div className="app">
                {routes}
        </div>
    </ThemeProvider>)
    }
  

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div className="app">
          {routes}
        </div>
    </ThemeProvider>
  );
}

export default App;

import axios from 'axios';
import * as actionTypes from './actionTypes';
import {Base64} from 'js-base64';
import Axios from '../../axios-proas';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (login,token, userUid, userType, userLevel,entityFirst,status) => {
    console.log("yesghhhhhhhhhhhhrrrrrrrrrrrrrrrrrrrrrrrbbbbbbbbbhh")
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        login: login,
        userUid: userUid,
        userType: userType, 
        userLevel: userLevel,
        entityFirst:entityFirst,
        status:status
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('login')
    localStorage.removeItem('type')
    localStorage.removeItem('level')
    
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime)  
    }
}

export const auth = (email, password) => { 
    return dispatch => {
        dispatch(authStart());
        let authAuthorization = Base64.encode(email + ":" + password)
        let config = {
            headers: {
                'Authorization': 'Basic ' + authAuthorization
            }
        }
        axios.post(process.env.REACT_APP_BASE_URL+'login', config)
            .then(response => {
                const expirationDate = new Date(response.data.expireIn * 1000 );
                Axios.defaults.headers.authorization = 'Bearer ' + response.data.token;
                let token = response.data.token;
                let login = response.data.email;
                let userUid = response.data.uid;
                let userType = response.data.type;
                let userLevel = response.data.level;
                let entityFirst=response.data.entityFirst;
                let status=response.data.status;
                localStorage.setItem('token', token)
                // localStorage.setItem('expirationDate', response.data.expireIn)
                localStorage.setItem('userId', userUid)
                localStorage.setItem('login', login)
                localStorage.setItem('type', userType)
                localStorage.setItem('level', userLevel)
                dispatch(authSuccess(login, token, userUid, userType, userLevel,entityFirst,status))
            })
            .catch(err => {
                dispatch(authFail(err.response?.data.message))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const checkAuth= (tokenAuth) => {
    return dispatch => {
       
        if(!tokenAuth) {
        
            dispatch(logout())
        } else {
            dispatch(authStart());
            const instance = Axios;
            instance.defaults.headers.authorization = 'Bearer ' + tokenAuth;
            //console.log("brear");
            //console.log(instance.defaults.headers.authorization );
            instance.get('objects/user')
                .then(response =>{
                  
                    let token = tokenAuth;
                    let login = response.data.data.records.login;
                    let userUid = response.data.data.records.uuid;
                    let userType = "owner";
                    let userLevel = "admin";
                    dispatch(authSuccess(login, token, userUid, userType, userLevel,null,null))
                   
                })
                .catch(err => {
                    dispatch(logout());
                    
                })
        }
    }
    
} 
export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('login');
        if(!token) {
            dispatch(logout())
        } else {
            dispatch(authStart());
            const instance = Axios;
            instance.defaults.headers.authorization = 'Bearer ' + token;
            //console.log("brear");
            //console.log(instance.defaults.headers.authorization );
            instance.get('/user/'+login+'/checkAuth')
                .then(response =>{
                    console.log(response)
                    let token = response.data.token;
                    let login = response.data.email;
                    let userUid = response.data.uid;
                    let userType = response.data.type;
                    let userLevel = response.data.level;
                
                    //dispatch(authSuccess(login, token, userUid, userType, userLevel))
                })
                .catch(err => {
                    dispatch(logout());
                    
                })
        }
    }
    
}
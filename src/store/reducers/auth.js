import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userUid: null,
    login: null,
    error: null,
    loading: false,
    userType: null,
    userLevel: null,
    entityFirst:null,
    authRedirectPath: null,
    status:null
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true, authRedirectPath: null});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        login: action.login,
        token: action.token,
        userUid: action.userUid,
        error: null,
        loading: false,
        userType: action.userType,
        userLevel: action.userLevel,
        entityFirst:action.entityFirst,
        status:action.status,
        authRedirectPath: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        token: null,
        userUid: null,
        login: null,
        loading: false,
        userType: null,
        userLevel: null,
        entityFirst:null,
        status:null,
        authRedirectPath: "/"
    })
}

const authLogout = (state, action) => {
    //return updateObject(state, {token: null, userId: null})
    return updateObject(state, {
        token: null, 
        userUid: null, 
        login: null,
        loading: false, 
        userType: null,
        userLevel: null,
        entityFirst:null,
        status:null,
        authRedirectPath: "/"
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default:
            return state
    }
}

export default reducer;
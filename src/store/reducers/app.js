import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    theme: 'light'
}


const appSetTheme = (state, action) => updateObject(state, {
    theme: action.theme
})


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.APP_SET_THEME: return appSetTheme(state, action)
        default:
            return state
    }
}
export default reducer
import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
    pageSize: 10,
    amountBTTotal:0
}

const reportingStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const reportingSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count ? action.count : 0,
    error: null,
    amountBTTotal:action.amountBTTotal,
    loading: false,
})

const reportingFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    
})

const reportingSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REPORTING_START: return reportingStart(state, action)
        case actionTypes.REPORTING_SUCCESS: return reportingSuccess(state, action)
        case actionTypes.REPORTING_FAIL: return reportingFail(state, action)
        case actionTypes.REPORTING_SET_PAGESIZE: return reportingSetPageSize(state, action)
       
        default:
            return state
    }
}
export default reducer
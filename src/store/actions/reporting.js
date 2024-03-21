import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const reportingStart = () => ({
    type: actionTypes.REPORTING_START
})



export const reportingSetPageSize = (pageSize) => ({
    type: actionTypes.REPORTING_SET_PAGESIZE,
    pageSize: pageSize
})



export const reportingSuccess = (data, count, total) => ({
    type: actionTypes.REPORTING_SUCCESS,
    data: data,
    count: count,
    amountBTTotal: total,
});

export const reportingFail = (error) => ({
    type: actionTypes.SUPPLIERS_FAIL,
    error: error
})

export const reportingGetPage = (filters,pageSize) => {
    let newFilters = {
        ...filters,
        pageSize
    }
    return dispatch => {
        dispatch(reportingStart());
        Axios.get('/ereporting', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(reportingSuccess(response.data.result, response.data.count, response.data?.amountBTTotal))
        }).catch(err => {
            dispatch(reportingFail(err.response?.data?.error))
        })
    }
}





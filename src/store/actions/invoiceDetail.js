import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';
import { getNotyfObject } from '../../shared/utility';

const notyf = getNotyfObject();

export const setEntityFilter = (entityFilter) => ({
    type: actionTypes.INVOICEDETAIL_SET_ENTITY_FILTER,
    entityFilter
})

export const resetAdmToInitialState = () => ({
    type: actionTypes.INVOICEDETAIL_RESET_TO_INITIAL_STATE
})

export const invoiceDataStart = () => ({
    type: actionTypes.INVOICEDETAIL_DATA_START
})

export const invoiceDataSuccess = (data) => ({
    type: actionTypes.INVOICEDETAIL_DATA_SUCCESS,
    data: data,
});

export const invoiceDataFail = (error) => ({
    type: actionTypes.INVOICEDETAIL_DATA_FAIL,
    error: error
})

export const invoicePdfStart = () => ({
    type: actionTypes.INVOICEDETAIL_PDF_START
})

export const invoicePdfSuccess = (pdfFile) => ({
    type: actionTypes.INVOICEDETAIL_PDF_SUCCESS,
    pdfFile: pdfFile
});

export const invoicePdfFail = (error) => ({
    type: actionTypes.INVOICEDETAIL_PDF_FAIL,
    error: error
})

export const setTabSideActive = (tabSideActive) => ({
    type : actionTypes.INVOICEDETAIL_SET_TAB_SIDEACTIVE,
    tabSideActive
})

export const getInvoiceData = (invoiceUid) => {
    return dispatch => {
        dispatch(invoiceDataStart());
        Axios.get(`/invoice/${invoiceUid}/invoiceData`)
        .then(response => {
            dispatch(invoiceDataSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(invoiceDataFail(err.response?.data?.error))
        })
    }
}

export const getInvoiceDataByToken = (token) => {
    return dispatch => {
        dispatch(invoiceDataStart());
        Axios.get(`/invoice/${token}/invoiceDataByToken`)
        .then(response => {
            dispatch(invoiceDataSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(invoiceDataFail(err.response?.data?.error))
        })
    }
}

export const getInvoicePdf = (invoiceUid,type) => {
    let params={
        type:type
    }
    return dispatch => {
        dispatch(invoicePdfStart());
        Axios.get(`/invoice/${invoiceUid}/invoicePdf`,{params:params})
        .then(response => {
            dispatch(invoicePdfSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(invoicePdfFail(err.response?.data?.error))
        })
    }
}

export const getInvoicePdfByToken = (token) => {
    return dispatch => {
        dispatch(invoicePdfStart());
        Axios.get(`/invoice/${token}/invoicePdfByToken`)
        .then(response => {
            dispatch(invoicePdfSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(invoicePdfFail(err.response?.data?.error))
        })
    }
}
import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';
import { getNotyfObject } from '../../shared/utility';

const notyf = getNotyfObject();

export const setSupplierRequestEntityFilter = (entityFilter) => ({
    type: actionTypes.SUPPLIERREQUESTDETAIL_SET_ENTITY_FILTER,
    entityFilter
})

export const resetSupplierRequestToInitialState = () => ({
    type: actionTypes.SUPPLIERREQUESTDETAIL_RESET_TO_INITIAL_STATE
})

export const supplierRequestDataStart = () => ({
    type: actionTypes.SUPPLIERREQUESTDETAIL_DATA_START
})

export const supplierRequestDataSuccess = (data) => ({
    type: actionTypes.SUPPLIERREQUESTDETAIL_DATA_SUCCESS,
    data: data,
});

export const supplierRequestDataFail = (error) => ({
    type: actionTypes.SUPPLIERREQUESTDETAIL_DATA_FAIL,
    error: error
})

export const supplierRequestPdfStart = () => ({
    type: actionTypes.SUPPLIERREQUESTDETAIL_PDF_START
})

export const supplierRequestPdfSuccess = (pdfFile) => ({
    type: actionTypes.SUPPLIERREQUESTDETAIL_PDF_SUCCESS,
    pdfFile: pdfFile
});

export const supplierRequestPdfFail = (error) => ({
    type: actionTypes.SUPPLIERREQUESTDETAIL_PDF_FAIL,
    error: error
})

export const setSupplierRequestTabSideActive = (tabSideActive) => ({
    type : actionTypes.SUPPLIERREQUESTDETAIL_SET_TAB_SIDEACTIVE,
    tabSideActive
})

export const getSupplierRequestData = (supplierRequestUid) => {
    return dispatch => {
        dispatch(supplierRequestDataStart());
        Axios.get(`/invoice/${supplierRequestUid}/invoiceData`)
        .then(response => {
            dispatch(supplierRequestDataSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(supplierRequestDataFail(err.response?.data?.error))
        })
    }
}

export const getSupplierRequestDataByToken = (token) => {
    return dispatch => {
        dispatch(supplierRequestDataStart());
        Axios.get(`/invoice/${token}/invoiceDataByToken`)
        .then(response => {
            dispatch(supplierRequestDataSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(supplierRequestDataFail(err.response?.data?.error))
        })
    }
}

export const getSupplierRequestPdf = (supplierRequestUid,type) => {
    let params={
        type:type
    }
    return dispatch => {
        dispatch(supplierRequestPdfStart());
        Axios.get(`/invoice/${supplierRequestUid}/invoicePdf`,{params:params})
        .then(response => {
            dispatch(supplierRequestPdfSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(supplierRequestPdfFail(err.response?.data?.error))
        })
    }
}

export const getSupplierRequestPdfByToken = (token) => {
    return dispatch => {
        dispatch(supplierRequestPdfStart());
        Axios.get(`/invoice/${token}/invoicePdfByToken`)
        .then(response => {
            dispatch(supplierRequestPdfSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(supplierRequestPdfFail(err.response?.data?.error))
        })
    }
}
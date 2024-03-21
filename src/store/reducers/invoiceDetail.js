import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loadingData : false,
    loadingEvents: false,
    loadingMsgs: false,
    loadingPdf: false,
    invoiceData: null,
    timeLineData: null,
    messagesData: null,
    pdfFile: null,
    errorData: null,
    errorEvents: null,
    errorMsgs: null,
    errorPdf: null,
    tabSideActive : "comments",
    entityFilter : null
}

const resetAdmToInitialState = (state, action) => updateObject(state, {
    loadingData : false,
    loadingEvents: false,
    loadingMsgs: false,
    loadingPdf: false,
    invoiceData: null,
    timeLineData: null,
    messagesData: null,
    pdfFile: null,
    errorData: null,
    errorEvents: null,
    errorMsgs: null,
    errorPdf: null,
    tabSideActive : "comments",
    entityFilter: null
    
})

const setEntityFilter = (state, action) => updateObject(state, {
    entityFilter: action.entityFilter
})

const invoiceDataStart = (state, action) => updateObject(state, {
    errorData: null,
    loadingData : true
})

const invoiceDataSuccess = (state, action) => updateObject(state, {
    invoiceData: action.data,
    errorData: null,
    loadingData: false
})

const invoiceDataFail = (state, action) => updateObject(state, {
    invoiceData: null,
    errorData: action.error,
    loadingData: false
})



const invoicePdfStart = (state, action) => updateObject(state, {
    errorPdf: null,
    loadingPdf : true
})

const invoicePdfSuccess = (state, action) => updateObject(state, {
    pdfFile: action.pdfFile,
    errorPdf: null,
    loadingPdf: false
})

const invoicePdfFail = (state, action) => updateObject(state, {
    pdfFile: null,
    errorPdf: action.error,
    loadingPdf: false
})

const setTabSideActive = (state , action) => updateObject(state, {
    tabSideActive : action.tabSideActive
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INVOICEDETAIL_SET_TAB_SIDEACTIVE: return setTabSideActive(state, action)
        case actionTypes.INVOICEDETAIL_DATA_START: return invoiceDataStart(state, action)
        case actionTypes.INVOICEDETAIL_DATA_SUCCESS: return invoiceDataSuccess(state, action)
        case actionTypes.INVOICEDETAIL_DATA_FAIL: return invoiceDataFail(state, action)
        case actionTypes.INVOICEDETAIL_PDF_START: return invoicePdfStart(state, action)
        case actionTypes.INVOICEDETAIL_PDF_SUCCESS: return invoicePdfSuccess(state, action)
        case actionTypes.INVOICEDETAIL_PDF_FAIL: return invoicePdfFail(state, action)
        case actionTypes.INVOICEDETAIL_RESET_TO_INITIAL_STATE: return resetAdmToInitialState(state, action)
        case actionTypes.INVOICEDETAIL_SET_ENTITY_FILTER: return setEntityFilter(state, action)
        default:
            return state
    }
}
export default reducer
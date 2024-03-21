import { updateObject } from '../../shared/utility';
// import { setSupplierRequestTabSideActive } from '../actions';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loadingData : false,
    loadingEvents: false,
    loadingMsgs: false,
    loadingPdf: false,
    supplierRequestData: null,
    timeLineData: null,
    messagesData: null,
    pdfFile: null,
    errorData: null,
    errorEvents: null,
    errorMsgs: null,
    errorPdf: null,
    tabSideActive : "fields",
    entityFilter : null
}

const resetSupplierRequestToInitialState = (state, action) => updateObject(state, {
    loadingData : false,
    loadingEvents: false,
    loadingMsgs: false,
    loadingPdf: false,
    supplierRequestData: null,
    timeLineData: null,
    messagesData: null,
    pdfFile: null,
    errorData: null,
    errorEvents: null,
    errorMsgs: null,
    errorPdf: null,
    tabSideActive : "fields",
    entityFilter: null
})

const setSupplierRequestEntityFilter = (state, action) => updateObject(state, {
    entityFilter: action.entityFilter
})

const supplierRequestDataStart = (state, action) => updateObject(state, {
    errorData: null,
    loadingData : true
})

const supplierRequestDataSuccess = (state, action) => updateObject(state, {
    supplierRequestData: action.data,
    errorData: null,
    loadingData: false
})

const supplierRequestDataFail = (state, action) => updateObject(state, {
    supplierRequestData: null,
    errorData: action.error,
    loadingData: false
})

const supplierRequestPdfStart = (state, action) => updateObject(state, {
    errorPdf: null,
    loadingPdf : true
})

const supplierRequestPdfSuccess = (state, action) => updateObject(state, {
    pdfFile: action.pdfFile,
    errorPdf: null,
    loadingPdf: false
})

const supplierRequestPdfFail = (state, action) => updateObject(state, {
    pdfFile: null,
    errorPdf: action.error,
    loadingPdf: false
})

const setSupplierRequestTabSideActive = (state , action) => updateObject(state, {
    tabSideActive : action.tabSideActive
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SUPPLIERREQUESTDETAIL_SET_TAB_SIDEACTIVE: return setSupplierRequestTabSideActive(state, action)
        case actionTypes.SUPPLIERREQUESTDETAIL_DATA_START: return supplierRequestDataStart(state, action)
        case actionTypes.SUPPLIERREQUESTDETAIL_DATA_SUCCESS: return supplierRequestDataSuccess(state, action)
        case actionTypes.SUPPLIERREQUESTDETAIL_DATA_FAIL: return supplierRequestDataFail(state, action)
        case actionTypes.SUPPLIERREQUESTDETAIL_PDF_START: return supplierRequestPdfStart(state, action)
        case actionTypes.SUPPLIERREQUESTDETAIL_PDF_SUCCESS: return supplierRequestPdfSuccess(state, action)
        case actionTypes.SUPPLIERREQUESTDETAIL_PDF_FAIL: return supplierRequestPdfFail(state, action)
        case actionTypes.SUPPLIERREQUESTDETAIL_RESET_TO_INITIAL_STATE: return resetSupplierRequestToInitialState(state, action)
        case actionTypes.SUPPLIERREQUESTDETAIL_SET_ENTITY_FILTER: return setSupplierRequestEntityFilter(state, action)
        default:
            return state
    }
}
export default reducer
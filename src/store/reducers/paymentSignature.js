import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
    currentPage: 1,
    pageSize: 100,
    filtering: false,
    showFilters: false,
    filtersQuery: [],
    sortQuery: 'creationDate',
    reverse: {
        creationDate: false
    },
    selectedPaymentSignature : [],
    selectedAllRows : false
}

const emptySelectedPaymentSignature = (state, action) => updateObject(state, {
    selectedPaymentSignature : [],
    selectedAllRows : false
})


const setSelectedAllPaymentSignatureRows = (state, action) => {
    let PaymentSignatureData = [...state.data];
    let selectedpaymentTemp = [...state.selectedPaymentSignature]; 
    if(PaymentSignatureData.length > 0){
        PaymentSignatureData.map(payment => {
            let paymentIndex = selectedpaymentTemp.findIndex(uid => uid === payment.userUid)
            if(action.selectAll){
                if(paymentIndex < 0)
                selectedpaymentTemp.push(payment.userUid)
            }else {
                if(paymentIndex >= 0)
                selectedpaymentTemp.splice(paymentIndex, 1)
            }
        })
    }
    return updateObject(state, {
        selectedAllRows : action.selectAll,
        selectedPaymentSignature: selectedpaymentTemp
    }); 
}

const selectPaymentsSignature = (state, action) => {
    let selectedPaymentSignatureTemp = [...state.selectedPaymentSignature, action.uid];
    return updateObject(state, {
        selectedPaymentSignature: selectedPaymentSignatureTemp
    });
}

const unselectPaymentsSignature = (state, action) => {
    let selectedPaymentSignatureTemp = [...state.selectedPaymentSignature];
    let paymentIndex = selectedPaymentSignatureTemp.findIndex(uid => uid === action.uid);
    selectedPaymentSignatureTemp.splice(paymentIndex, 1)
    return updateObject(state, {
        selectedPaymentSignature: selectedPaymentSignatureTemp
    });
}

const paymentSignatureStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const paymentSignatureSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count,
    error: null,
    loading: false
})

const paymentSignatureFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const paymentSignatureSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const paymentSignatureSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const paymentSignatureSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const paymentSignatureSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const paymentSignatureUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const paymentSignatureSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters
        },
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PAYMENT_SIGNATURE_START: return paymentSignatureStart(state, action)
        case actionTypes.PAYMENT_SIGNATURE_SUCCESS: return paymentSignatureSuccess(state, action)
        case actionTypes.PAYMENT_SIGNATURE_FAIL: return paymentSignatureFail(state, action)
        case actionTypes.PAYMENT_SIGNATURE_SET_PAGE: return paymentSignatureSetPage(state, action)
        case actionTypes.PAYMENT_SIGNATURE_SET_PAGESIZE: return paymentSignatureSetPageSize(state, action)
        case actionTypes.PAYMENT_SIGNATURE_SET_FILTERSQUERY: return paymentSignatureSetFiltersQuery(state, action)
        case actionTypes.PAYMENT_SIGNATURE_SET_SORTQUERY: return paymentSignatureSetSortQuery(state, action)
        case actionTypes.PAYMENT_SIGNATURE_SET_REVERSESORT: return paymentSignatureSetReverseSort(state, action)
        case actionTypes.PAYMENT_SIGNATURE_UPDATE_SHOWFILTERS: return paymentSignatureUpdateShowFilters(state, action)
        case actionTypes.PAYMENT_SIGNATURE_SELECT_USER: return selectPaymentsSignature(state, action)
        case actionTypes.PAYMENT_SIGNATURE_UNSELECT_USER: return unselectPaymentsSignature(state, action)
        case actionTypes.PAYMENT_SIGNATURE_SET_SELECTEDALLROWS: return setSelectedAllPaymentSignatureRows(state, action)
        case actionTypes.PAYMENT_SIGNATURE_EMPTY: return emptySelectedPaymentSignature(state, action)
        default:
            return state
    }
}
export default reducer
import * as actionTypes from './actionTypes';
// import Axios from '../../axios-gse';
import Axios from '../../axios-proas';

export const paymentSignatureStart = () => ({
    type: actionTypes.PAYMENT_SIGNATURE_START
})

export const paymentSignatureSetPage = (page) => ({
    type: actionTypes.PAYMENT_SIGNATURE_SET_PAGE,
    currentPage: page
})

export const paymentSignatureSetPageSize = (pageSize) => ({
    type: actionTypes.PAYMENT_SIGNATURE_SET_PAGESIZE,
    pageSize: pageSize
})

export const paymentSignatureSuccess = (data, count) => ({
    type: actionTypes.PAYMENT_SIGNATURE_SUCCESS,
    data: data,
    count: count
});

export const paymentSignatureFail = (error) => ({
    type: actionTypes.PAYMENT_SIGNATURE_FAIL,
    error: error
})

// export const clientsGetPage = (page) => {
//     return dispatch => {
//         dispatch(clientsStart());
//         Axios.get('/client?page='+page)
//             .then(response => {
//                 dispatch(clientsSuccess(response.data.result, response.data.count))
//             }).catch(err => {
//                 dispatch(clientsFail(err.response.data.error))
//             })
//     }
// }

export const paymentSignatureGetPage = (page, filters, sort, reverse, pageSize) => {
    let newFilters = {
        page: page,
        pageSize: pageSize,
        entityRequest: true
    }
    if(filters){ 
        for (const key in filters) {
            if(filters[key])
                newFilters = {
                    ...newFilters,
                    [key]: filters[key]
                }
        }
    }
    if(sort){
        newFilters = {
            ...newFilters,
            orderBy: sort
        }
    }
    if(reverse){
        newFilters = {
            ...newFilters,
            reverse: reverse[sort]
        }
    }

    // console.log(newFilters)

    return dispatch => {
        dispatch(paymentSignatureStart());
        Axios.get('/paymentsignature', {
            params: newFilters
        })
        .then(response => {
            dispatch(paymentSignatureSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(paymentSignatureFail(err.response?.data?.error))
        })
    }
}

export const paymentSignatureSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.PAYMENT_SIGNATURE_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: paymentSignatureUpdateFiltering(filtersQuery) 
});

export const paymentSignatureUpdateFiltering = (filtersQuery) => {
    let filter = false;
    if(filtersQuery){
        for(const key in filtersQuery){
            if(filtersQuery[key]){
                filter = true
            }
        }
    }
    return filter
}

export const paymentSignatureUpdateShowFilters = (show) => ({
    type: actionTypes.PAYMENT_SIGNATURE_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const paymentSignatureSetSortQuery = (sortQuery) => ({
    type: actionTypes.PAYMENT_SIGNATURE_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const paymentSignatureSetReverseSort = (reverse) => ({
    type: actionTypes.PAYMENT_SIGNATURE_SET_REVERSESORT,
    reverse: reverse
})

export const setSelectedAllPaymentSignatureRows = (selectAll) => ({
    type: actionTypes.PAYMENT_SIGNATURE_SET_SELECTEDALLROWS,
    selectAll
})

export const selectPaymentSignature = (uid) => ({
    type: actionTypes.PAYMENT_SIGNATURE_SELECT_USER,
    uid
})

export const unselectPaymentSignature = (uid) => ({
    type: actionTypes.PAYMENT_SIGNATURE_UNSELECT_USER,
    uid
})

export const emptySelectedPaymentSignature = () => ({
    type: actionTypes.PAYMENT_SIGNATURE_EMPTY
})
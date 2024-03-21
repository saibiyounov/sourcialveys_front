import * as actionTypes from './actionTypes';
// import Axios from '../../axios-gse';
import Axios from '../../axios-proas';

export const supplierRequestStart = () => ({
    type: actionTypes.SUPPLIER_REQUEST_START
})

export const supplierRequestSetPage = (page) => ({
    type: actionTypes.SUPPLIER_REQUEST_SET_PAGE,
    currentPage: page
})

export const supplierRequestSetPageSize = (pageSize) => ({
    type: actionTypes.SUPPLIER_REQUEST_SET_PAGESIZE,
    pageSize: pageSize
})

export const supplierRequestSuccess = (data, count) => ({
    type: actionTypes.SUPPLIER_REQUEST_SUCCESS,
    data: data,
    count: count
});

export const supplierRequestFail = (error) => ({
    type: actionTypes.SUPPLIER_REQUEST_FAIL,
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

export const supplierRequestGetPage = (page, filters, sort, reverse, pageSize) => {
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
        dispatch(supplierRequestStart());
        Axios.get('/entity//suppliersAccountRequest', {
            params: newFilters
        })
        .then(response => {
            dispatch(supplierRequestSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(supplierRequestFail(err.response?.data?.error))
        })
    }
}

export const supplierRequestSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.SUPPLIER_REQUEST_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: supplierRequestUpdateFiltering(filtersQuery) 
});

export const supplierRequestUpdateFiltering = (filtersQuery) => {
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

export const supplierRequestUpdateShowFilters = (show) => ({
    type: actionTypes.SUPPLIER_REQUEST_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const supplierRequestSetSortQuery = (sortQuery) => ({
    type: actionTypes.SUPPLIER_REQUEST_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const supplierRequestSetReverseSort = (reverse) => ({
    type: actionTypes.SUPPLIER_REQUEST_SET_REVERSESORT,
    reverse: reverse
})

export const setSelectedAllSuppliersRequestRows = (selectAll) => ({
    type: actionTypes.SUPPLIER_REQUEST_SET_SELECTEDALLROWS,
    selectAll
})

export const selectSupplierRequest = (uid) => ({
    type: actionTypes.SUPPLIER_REQUEST_SELECT_USER,
    uid
})

export const unselectSupplierRequest = (uid) => ({
    type: actionTypes.SUPPLIER_REQUEST_UNSELECT_USER,
    uid
})

export const emptySelectedSupplierRequest = () => ({
    type: actionTypes.SUPPLIER_REQUEST_EMPTY_SELECTEDSUPPLIERS
})
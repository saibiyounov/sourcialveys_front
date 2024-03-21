import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const suppliersStart = () => ({
    type: actionTypes.SUPPLIERS_START
})

export const suppliersSetPage = (page) => ({
    type: actionTypes.SUPPLIERS_SET_PAGE,
    currentPage: page
})

export const suppliersSetPageSize = (pageSize) => ({
    type: actionTypes.SUPPLIERS_SET_PAGESIZE,
    pageSize: pageSize
})

export const suppliersSetSearchInput = (inputValue) => ({
    type: actionTypes.SUPPLIERS_SEARCH_INPUT,
    searchInput: inputValue
})



export const suppliersSuccess = (data, count) => ({
    type: actionTypes.SUPPLIERS_SUCCESS,
    data: data,
    count: count
});

export const suppliersFail = (error) => ({
    type: actionTypes.SUPPLIERS_FAIL,
    error: error
})

export const suppliersGetPage = (page, filters, sort, reverse, searchField, pageSize = 100) => {
    let newFilters = {
        page: page,
        pageSize
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
    if(searchField){
        newFilters = {
            ...newFilters,
            searchInput: searchField
        }
    }
    if(reverse){
        newFilters = {
            ...newFilters,
            reverse: reverse[sort]
        }
    }
    return dispatch => {
        dispatch(suppliersStart());
        Axios.get('/objects/suppliers', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(suppliersSuccess(response.data.data.records, response.data.data.query.count))
        }).catch(err => {
            dispatch(suppliersFail(err.response?.data?.error))
        })
    }
}

export const customersGetPage = (page, filters, sort, reverse, searchField) => {
    let newFilters = {
        page: page
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
    if(searchField){
        newFilters = {
            ...newFilters,
            searchInput: searchField
        }
    }
    if(reverse){
        newFilters = {
            ...newFilters,
            reverse: reverse[sort]
        }
    }
    return dispatch => {
        dispatch(suppliersStart());
        Axios.get('/objects/clients', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(suppliersSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(suppliersFail(err.response?.data?.error))
        })
    }
}

export const suppliersSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.SUPPLIERS_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: suppliersUpdateFiltering(filtersQuery) 
});

export const suppliersUpdateFiltering = (filtersQuery) => {
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

export const suppliersUpdateShowFilters = (show) => ({
    type: actionTypes.SUPPLIERS_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const suppliersSetSortQuery = (sortQuery) => ({
    type: actionTypes.SUPPLIERS_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const suppliersSetReverseSort = (reverse) => ({
    type: actionTypes.SUPPLIERS_SET_REVERSESORT,
    reverse: reverse
})
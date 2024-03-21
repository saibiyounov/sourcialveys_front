import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const echangePDPStart = () => ({
    type: actionTypes.ECHANGEPDP_START
})

export const echangePDPSetPage = (page) => ({
    type: actionTypes.ECHANGEPDP_SET_PAGE,
    currentPage: page
})

export const echangePDPSetPageSize = (pageSize) => ({
    type: actionTypes.ECHANGEPDP_SET_PAGESIZE,
    pageSize: pageSize
})

export const echangePDPSuccess = (data, count) => ({
    type: actionTypes.ECHANGEPDP_SUCCESS,
    data: data,
    count: count
});

export const echangePDPFail = (error) => ({
    type: actionTypes.ECHANGEPDP_FAIL,
    error: error
})

export const echangePDPGetPage = (page, filters, sort, reverse, pageSize) => {
    let newFilters = {
        page: page,
        pageSize: pageSize
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
    //console.log(sort)
    return dispatch => {
        dispatch(echangePDPStart());
        Axios.get('/echangepdp', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(echangePDPSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(echangePDPFail(err.response?.data?.error))
        })
    }
}


export const echangePDPSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.ECHANGEPDP_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: echangePDPUpdateFiltering(filtersQuery) 
});

export const echangePDPUpdateFiltering = (filtersQuery) => {
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

export const echangePDPUpdateShowFilters = (show) => ({
    type: actionTypes.ECHANGEPDP_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const echangePDPSetSortQuery = (sortQuery) => ({
    type: actionTypes.ECHANGEPDP_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const echangePDPSetReverseSort = (reverse) => ({
    type: actionTypes.ECHANGEPDP_SET_REVERSESORT,
    reverse: reverse
})

export const echangePDPdetail=(entite)=>({
    type: actionTypes.ECHANGEPDP_SET_ENTITY_SUCCESS,
    entity: entite,
});


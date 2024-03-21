import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const accountantsStart = () => ({
    type: actionTypes.ACCOUNTANTS_START
})

export const accountantsSetPage = (page) => ({
    type: actionTypes.ACCOUNTANTS_SET_PAGE,
    currentPage: page
})

export const accountantsSuccess = (data, count) => ({
    type: actionTypes.ACCOUNTANTS_SUCCESS,
    data: data,
    count: count
});

export const accountantsFail = (error) => ({
    type: actionTypes.ACCOUNTANTS_FAIL,
    error: error
})

export const accountantsGetPage = (page, filters, sort, reverse) => {
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
    if(reverse){
        newFilters = {
            ...newFilters,
            reverse: reverse[sort]
        }
    }
    return dispatch => {
        dispatch(accountantsStart());
        Axios.get('/user//allAccountants', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(accountantsSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(accountantsFail(err.response?.data?.error))
        })
    }
}

export const accountantsSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.ACCOUNTANTS_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: accountantsUpdateFiltering(filtersQuery) 
});

export const accountantsUpdateFiltering = (filtersQuery) => {
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

export const accountantsUpdateShowFilters = (show) => ({
    type: actionTypes.ACCOUNTANTS_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const accountantsSetSortQuery = (sortQuery) => ({
    type: actionTypes.ACCOUNTANTS_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const accountantsSetReverseSort = (reverse) => ({
    type: actionTypes.ACCOUNTANTS_SET_REVERSESORT,
    reverse: reverse
})
import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const documentationStart = () => ({
    type: actionTypes.DOCUMENTATION_START
})

export const documentationSetPage = (page) => ({
    type: actionTypes.DOCUMENTATION_SET_PAGE,
    currentPage: page
})

export const documentationSetPageSize = (pageSize) => ({
    type: actionTypes.DOCUMENTATION_SET_PAGESIZE,
    pageSize: pageSize
})

export const documentationSuccess = (data, count) => ({
    type: actionTypes.DOCUMENTATION_SUCCESS,
    data: data,
    count: count
});

export const documentationFail = (error) => ({
    type: actionTypes.DOCUMENTATION_FAIL,
    error: error
})

export const documentationGetPage = (page, filters, sort, reverse, pageSize = 100) => {
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
        dispatch(documentationStart());
        Axios.get('/documentation', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(documentationSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(documentationFail(err.response?.data?.error))
        })
    }
}


export const documentationSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.DOCUMENTATION_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: documentationUpdateFiltering(filtersQuery) 
});

export const documentationUpdateFiltering = (filtersQuery) => {
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

export const documentationUpdateShowFilters = (show) => ({
    type: actionTypes.DOCUMENTATION_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const documentationSetSortQuery = (sortQuery) => ({
    type: actionTypes.DOCUMENTATION_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const documentationSetReverseSort = (reverse) => ({
    type: actionTypes.DOCUMENTATION_SET_REVERSESORT,
    reverse: reverse
})
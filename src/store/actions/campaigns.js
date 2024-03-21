import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const campaignsStart = () => ({
    type: actionTypes.CAMPAIGNS_START
})

export const campaignsSetPage = (page) => ({
    type: actionTypes.CAMPAIGNS_SET_PAGE,
    currentPage: page
})

export const campaignsSetPageSize = (pageSize) => ({
    type: actionTypes.CAMPAIGNS_SET_PAGESIZE,
    pageSize: pageSize
})

export const campaignsSuccess = (data, count) => ({
    type: actionTypes.CAMPAIGNS_SUCCESS,
    data: data,
    count: count
});

export const campaignsFail = (error) => ({
    type: actionTypes.CAMPAIGNS_FAIL,
    error: error
})

export const campaignsGetPage = (page, filters, sort, reverse, pageSize = 100) => {
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
        dispatch(campaignsStart());
        Axios.get('/campaign', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(campaignsSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(campaignsFail(err.response?.data?.error))
        })
    }
}


export const campaignsSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.CAMPAIGNS_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: campaignsUpdateFiltering(filtersQuery) 
});

export const campaignsUpdateFiltering = (filtersQuery) => {
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

export const campaignsUpdateShowFilters = (show) => ({
    type: actionTypes.CAMPAIGNS_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const campaignsSetSortQuery = (sortQuery) => ({
    type: actionTypes.CAMPAIGNS_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const campaignsSetReverseSort = (reverse) => ({
    type: actionTypes.CAMPAIGNS_SET_REVERSESORT,
    reverse: reverse
})
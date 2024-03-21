import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const entitiesStart = () => ({
    type: actionTypes.ENTITIESPPF_START
})

export const entitiesPPFSetPage = (page) => ({
    type: actionTypes.ENTITIESPPF_SET_PAGE,
    currentPage: page
})

export const entitiesPPFSetPageSize = (pageSize) => ({
    type: actionTypes.ENTITIESPPF_SET_PAGESIZE,
    pageSize: pageSize
})

export const entitiesSuccess = (data, count) => ({
    type: actionTypes.ENTITIESPPF_SUCCESS,
    data: data,
    count: count
});

export const entitiesFail = (error) => ({
    type: actionTypes.ENTITIESPPF_FAIL,
    error: error
})

export const entitiesPPFGetPage = (page, filters, sort, reverse, pageSize) => {
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
        dispatch(entitiesStart());
        Axios.get('/entitypdp', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(entitiesSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(entitiesFail(err.response?.data?.error))
        })
    }
}


export const entitiesPPFSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.ENTITIESPPF_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: entitiesUpdateFiltering(filtersQuery) 
});

export const entitiesUpdateFiltering = (filtersQuery) => {
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

export const entitiesPPFUpdateShowFilters = (show) => ({
    type: actionTypes.ENTITIESPPF_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const entitiesPPFSetSortQuery = (sortQuery) => ({
    type: actionTypes.ENTITIESPPF_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const entitiesPPFSetReverseSort = (reverse) => ({
    type: actionTypes.ENTITIESPPF_SET_REVERSESORT,
    reverse: reverse
})

export const setEntityPPFdetail=(entite)=>({
    type: actionTypes.ENTITIESPPF_SET_ENTITY_SUCCESS,
    entity: entite,
    

});


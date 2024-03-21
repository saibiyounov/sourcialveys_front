import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const entitiesStart = () => ({
    type: actionTypes.ENTITIES_START
})

export const entitiesSetPage = (page) => ({
    type: actionTypes.ENTITIES_SET_PAGE,
    currentPage: page
})

export const entitiesSetPageSize = (pageSize) => ({
    type: actionTypes.ENTITIES_SET_PAGESIZE,
    pageSize: pageSize
})

export const entitiesSuccess = (data, count) => ({
    type: actionTypes.ENTITIES_SUCCESS,
    data: data,
    count: count
});

export const entitiesFail = (error) => ({
    type: actionTypes.ENTITIES_FAIL,
    error: error
})

export const entitiesGetPage = (page, filters, sort, reverse, pageSize) => {
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
        Axios.get('/entity?type=owner', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(entitiesSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(entitiesFail(err.response?.data?.error))
        })
    }
}


export const entitiesSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.ENTITIES_SET_FILTERSQUERY,
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

export const entitiesUpdateShowFilters = (show) => ({
    type: actionTypes.ENTITIES_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const entitiesSetSortQuery = (sortQuery) => ({
    type: actionTypes.ENTITIES_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const entitiesSetReverseSort = (reverse) => ({
    type: actionTypes.ENTITIES_SET_REVERSESORT,
    reverse: reverse
})
import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';

export const logsStart = () => ({
    type: actionTypes.LOGS_START
})

export const logsSetPage = (page) => ({
    type: actionTypes.LOGS_SET_PAGE,
    currentPage: page
});

export const logsSuccess = (data, typesList, stepsList, count) => ({
    type: actionTypes.LOGS_SUCCESS,
    data: data,
    typesList: typesList,
    stepsList: stepsList,
    count: count
});

export const logsFail = (error) => ({
    type: actionTypes.LOGS_FAIL,
    error: error
});

export const logsGetPage = (page, filters, sort, reverse) => {
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
        dispatch(logsStart());
        Axios.get('/logs?page='+page, {
            params: {...newFilters}
        }).then(response => {
            //if (response.status === 200 && response.data) {
                let typeList = response.data.typeList.map(row => row.type)
                let stepList = response.data.stepList.map(row => row.step)
                dispatch(logsSuccess(response.data.result, typeList, stepList, response.status === 204 ? 0 : response.data.count))
            //}
        }).catch(err => {
            dispatch(logsFail(err.response?.data))
        }) 
    }
}

export const logsSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.LOGS_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: logsUpdateFiltering(filtersQuery) 
});

export const logsUpdateFiltering = (filtersQuery) => {
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

export const logsUpdateShowFilters = (show) => ({
    type: actionTypes.LOGS_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const logsSetSortQuery = (sortQuery) => ({
    type: actionTypes.LOGS_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const logsSetReverseSort = (reverse) => ({
    type: actionTypes.LOGS_SET_REVERSESORT,
    reverse: reverse
})
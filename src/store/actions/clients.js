import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';



export const clientsStart = () => ({
    type: actionTypes.CLIENTS_START
})

export const clientsSetPageSize = (pageSize) => ({
    type: actionTypes.CLIENTS_SET_PAGESIZE,
    pageSize: pageSize
})

export const clientsSetPage = (page) => ({
    type: actionTypes.CLIENTS_SET_PAGE,
    currentPage: page
})

export const clientsSuccess = (data, count) => ({
    type: actionTypes.CLIENTS_SUCCESS,
    data: data,
    count: count
});

export const clientsFail = (error) => ({
    type: actionTypes.CLIENTS_FAIL,
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
 

export const setEntitydetail=(entite)=>({
    type: actionTypes.ENTITYDETAIL_SET_ENTITY_SUCCESS,
    entity: entite,
    

});

export const getEntitydetail=()=>({
    type: actionTypes.ENTITYDETAIL_GET_ENTITY_SUCCESS
});

export const clientsGetPage = (page, filters, sort, reverse, pageSize = 100) => {
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
        dispatch(clientsStart());
        Axios.get('/objects/clients', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(clientsSuccess(response.data.data.records, response.data.data.query.count))
        }).catch(err => {
            dispatch(clientsFail(err.response?.data?.error))
        })
    }
}


export const clientsSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.CLIENTS_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: clientsUpdateFiltering(filtersQuery) 
});

export const clientsUpdateFiltering = (filtersQuery) => {
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

export const clientsUpdateShowFilters = (show) => ({
    type: actionTypes.CLIENTS_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const clientsSetSortQuery = (sortQuery) => ({
    type: actionTypes.CLIENTS_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const clientsSetReverseSort = (reverse) => ({
    type: actionTypes.CLIENTS_SET_REVERSESORT,
    reverse: reverse
})
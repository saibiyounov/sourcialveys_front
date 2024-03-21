import * as actionTypes from './actionTypes';
// import Axios from '../../axios-gse';
import Axios from '../../axios-proas';

export const usersStart = () => ({
    type: actionTypes.USERS_START
})

export const usersSetPage = (page) => ({
    type: actionTypes.USERS_SET_PAGE,
    currentPage: page
})

export const usersSetPageSize = (pageSize) => ({
    type: actionTypes.USERS_SET_PAGESIZE,
    pageSize: pageSize
})

export const usersSuccess = (data, count) => ({
    type: actionTypes.USERS_SUCCESS,
    data: data,
    count: count
});

export const usersFail = (error) => ({
    type: actionTypes.USERS_FAIL,
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

export const usersGetPage = (page, filters, sort, reverse, pageSize) => {
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
        dispatch(usersStart());
        Axios.get('objects/'+filters['entityType']+'/'+filters['entityUid']+'/'+filters['entityType']+'Contact', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(usersSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(usersFail(err.response?.data?.error))
        })
    }
}

export const usersSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.USERS_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: usersUpdateFiltering(filtersQuery) 
});

export const usersUpdateFiltering = (filtersQuery) => {
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

export const usersUpdateShowFilters = (show) => ({
    type: actionTypes.USERS_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const usersSetSortQuery = (sortQuery) => ({
    type: actionTypes.USERS_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const usersSetReverseSort = (reverse) => ({
    type: actionTypes.USERS_SET_REVERSESORT,
    reverse: reverse
})

export const setSelectedAllRows = (selectAll) => ({
    type: actionTypes.USERS_SET_SELECTEDALLROWS,
    selectAll
})

export const selectUser = (uid) => ({
    type: actionTypes.USERS_SELECT_USER,
    uid
})

export const unselectUser = (uid) => ({
    type: actionTypes.USERS_UNSELECT_USER,
    uid
})

export const emptySelectedUsers = () => ({
    type: actionTypes.USERS_EMPTY_SELECTEDUSERS
})
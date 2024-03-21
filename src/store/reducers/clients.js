import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
    currentPage: 1,
    pageSize: 100,
    filtering: false,
    showFilters: false,
    filtersQuery: null,
    entity:null,
    sortQuery: 'name',
    reverse: {
        name: false
    }
}

const clientsStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const clientsSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count ? action.count : 0,
    error: null,
    loading: false
})

const clientsFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const clientsSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const clientsSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const clientsSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const clientsSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const clientsUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const clientsSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const setEntitydetail = (state, action) => updateObject(state, {
    entity: action.entity
})

const getEntitydetail = (state, action) => updateObject(state, {
    entity: action.entity
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CLIENTS_START: return clientsStart(state, action)
        case actionTypes.CLIENTS_SUCCESS: return clientsSuccess(state, action)
        case actionTypes.CLIENTS_FAIL: return clientsFail(state, action)
        case actionTypes.CLIENTS_SET_PAGE: return clientsSetPage(state, action)
        case actionTypes.CLIENTS_SET_PAGESIZE: return clientsSetPageSize(state, action)
        case actionTypes.CLIENTS_SET_FILTERSQUERY: return clientsSetFiltersQuery(state, action)
        case actionTypes.CLIENTS_SET_SORTQUERY: return clientsSetSortQuery(state, action)
        case actionTypes.CLIENTS_SET_REVERSESORT: return clientsSetReverseSort(state, action)
        case actionTypes.CLIENTS_UPDATE_SHOWFILTERS: return clientsUpdateShowFilters(state, action)
        case actionTypes.ENTITYDETAIL_SET_ENTITY_SUCCESS: return setEntitydetail(state, action)
        case actionTypes.ENTITYDETAIL_GET_ENTITY_SUCCESS: return getEntitydetail(state, action)
        default:
            return state
    }
}
export default reducer
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
    sortQuery: 'name',
    reverse: {
        name: false
    }
}

const entitiesStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const entitiesSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count ? action.count : 0,
    error: null,
    loading: false
})

const entitiesFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const entitiesSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const entitiesSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const entitiesSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const entitiesSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const entitiesUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const entitiesSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ENTITIES_START: return entitiesStart(state, action)
        case actionTypes.ENTITIES_SUCCESS: return entitiesSuccess(state, action)
        case actionTypes.ENTITIES_FAIL: return entitiesFail(state, action)
        case actionTypes.ENTITIES_SET_PAGE: return entitiesSetPage(state, action)
        case actionTypes.ENTITIES_SET_PAGESIZE: return entitiesSetPageSize(state, action)
        case actionTypes.ENTITIES_SET_FILTERSQUERY: return entitiesSetFiltersQuery(state, action)
        case actionTypes.ENTITIES_SET_SORTQUERY: return entitiesSetSortQuery(state, action)
        case actionTypes.ENTITIES_SET_REVERSESORT: return entitiesSetReverseSort(state, action)
        case actionTypes.ENTITIES_UPDATE_SHOWFILTERS: return entitiesUpdateShowFilters(state, action)
        default:
            return state
    }
}
export default reducer
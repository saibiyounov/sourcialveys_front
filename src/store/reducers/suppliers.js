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
    reverse: { name: false },
    searchInput: ''
}

const suppliersStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const suppliersSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count ? action.count : 0,
    error: null,
    loading: false
})

const suppliersFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const suppliersSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const suppliersSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const suppliersSetSearchInput = (state, action) => updateObject(state, {
    searchInput: action.searchInput
})

const suppliersSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const suppliersSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const suppliersUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const suppliersSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SUPPLIERS_START: return suppliersStart(state, action)
        case actionTypes.SUPPLIERS_SUCCESS: return suppliersSuccess(state, action)
        case actionTypes.SUPPLIERS_FAIL: return suppliersFail(state, action)
        case actionTypes.SUPPLIERS_SET_PAGE: return suppliersSetPage(state, action)
        case actionTypes.SUPPLIERS_SET_PAGESIZE: return suppliersSetPageSize(state, action)
        case actionTypes.SUPPLIERS_SEARCH_INPUT: return suppliersSetSearchInput(state, action)
        case actionTypes.SUPPLIERS_SET_FILTERSQUERY: return suppliersSetFiltersQuery(state, action)
        case actionTypes.SUPPLIERS_SET_SORTQUERY: return suppliersSetSortQuery(state, action)
        case actionTypes.SUPPLIERS_SET_REVERSESORT: return suppliersSetReverseSort(state, action)
        case actionTypes.SUPPLIERS_UPDATE_SHOWFILTERS: return suppliersUpdateShowFilters(state, action)
        default:
            return state
    }
}
export default reducer
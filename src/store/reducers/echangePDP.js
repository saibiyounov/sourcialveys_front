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
    entity:null,
    reverse: {
        name: false
    }
}

const echangePDPStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const echangePDPSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count ? action.count : 0,
    error: null,
    loading: false
})

const echangePDPFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const echangePDPSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const echangePDPSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const echangePDPSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const echangePDPSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const echangePDPUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const echangePDPSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)
const setEchangePDPdetail = (state, action) => updateObject(state, {
    entity: action.entity
})
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ECHANGEPDP_START: return echangePDPStart(state, action)
        case actionTypes.ECHANGEPDP_SUCCESS: return echangePDPSuccess(state, action)
        case actionTypes.ECHANGEPDP_FAIL: return echangePDPFail(state, action)
        case actionTypes.ECHANGEPDP_SET_PAGE: return echangePDPSetPage(state, action)
        case actionTypes.ECHANGEPDP_SET_PAGESIZE: return echangePDPSetPageSize(state, action)
        case actionTypes.ECHANGEPDP_SET_FILTERSQUERY: return echangePDPSetFiltersQuery(state, action)
        case actionTypes.ECHANGEPDP_SET_SORTQUERY: return echangePDPSetSortQuery(state, action)
        case actionTypes.ECHANGEPDP_SET_REVERSESORT: return echangePDPSetReverseSort(state, action)
        case actionTypes.ECHANGEPDP_UPDATE_SHOWFILTERS: return echangePDPUpdateShowFilters(state, action)
        case actionTypes.ECHANGEPDP_SET_ENTITY_SUCCESS: return setEchangePDPdetail(state, action)
        default:
            return state
    }
}
export default reducer
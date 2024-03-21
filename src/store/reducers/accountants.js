import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
    currentPage: 1,
    filtering: false,
    showFilters: false,
    filtersQuery: null,
    sortQuery: 'login',
    reverse: {
        name: false
    }
}

const accountantsStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const accountantsSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count ? action.count : 0,
    error: null,
    loading: false
})

const accountantsFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const accountantsSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const accountantsSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const accountantsSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const accountantsUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const accountantsSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ACCOUNTANTS_START: return accountantsStart(state, action)
        case actionTypes.ACCOUNTANTS_SUCCESS: return accountantsSuccess(state, action)
        case actionTypes.ACCOUNTANTS_FAIL: return accountantsFail(state, action)
        case actionTypes.ACCOUNTANTS_SET_PAGE: return accountantsSetPage(state, action)
        case actionTypes.ACCOUNTANTS_SET_FILTERSQUERY: return accountantsSetFiltersQuery(state, action)
        case actionTypes.ACCOUNTANTS_SET_SORTQUERY: return accountantsSetSortQuery(state, action)
        case actionTypes.ACCOUNTANTS_SET_REVERSESORT: return accountantsSetReverseSort(state, action)
        case actionTypes.ACCOUNTANTS_UPDATE_SHOWFILTERS: return accountantsUpdateShowFilters(state, action)
        default:
            return state
    }
}
export default reducer
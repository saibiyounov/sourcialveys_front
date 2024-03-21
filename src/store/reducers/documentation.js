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
    sortQuery: 'docName',
    reverse: {
        name: false
    }
}

const documentationStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const documentationSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count ? action.count : 0,
    error: null,
    loading: false
})

const documentationFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const documentationSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage

})
const documentationSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const documentationSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const documentationSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const documentationUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const documentationSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.DOCUMENTATION_START: return documentationStart(state, action)
        case actionTypes.DOCUMENTATION_SUCCESS: return documentationSuccess(state, action)
        case actionTypes.DOCUMENTATION_FAIL: return documentationFail(state, action)
        case actionTypes.DOCUMENTATION_SET_PAGE: return documentationSetPage(state, action)
        case actionTypes.DOCUMENTATION_SET_PAGESIZE: return documentationSetPageSize(state, action)
        case actionTypes.DOCUMENTATION_SET_FILTERSQUERY: return documentationSetFiltersQuery(state, action)
        case actionTypes.DOCUMENTATION_SET_SORTQUERY: return documentationSetSortQuery(state, action)
        case actionTypes.DOCUMENTATION_SET_REVERSESORT: return documentationSetReverseSort(state, action)
        case actionTypes.DOCUMENTATION_UPDATE_SHOWFILTERS: return documentationUpdateShowFilters(state, action)
        default:
            return state
    }
}
export default reducer
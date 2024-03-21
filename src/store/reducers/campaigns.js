import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
    currentPage: 1,
    pageSize : 100,
    filtering: false,
    showFilters: false,
    filtersQuery: null,
    sortQuery: 'creationDate',
    reverse: {
        creationDate: false
    }
}

const campaignsStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const campaignsSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count ? action.count : 0,
    error: null,
    loading: false
})

const campaignsFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const campaignsSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const campaignsSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const campaignsSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const campaignsSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const campaignsUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const campaignsSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CAMPAIGNS_START: return campaignsStart(state, action)
        case actionTypes.CAMPAIGNS_SUCCESS: return campaignsSuccess(state, action)
        case actionTypes.CAMPAIGNS_FAIL: return campaignsFail(state, action)
        case actionTypes.CAMPAIGNS_SET_PAGE: return campaignsSetPage(state, action)
        case actionTypes.CAMPAIGNS_SET_PAGESIZE: return campaignsSetPageSize(state, action)
        case actionTypes.CAMPAIGNS_SET_FILTERSQUERY: return campaignsSetFiltersQuery(state, action)
        case actionTypes.CAMPAIGNS_SET_SORTQUERY: return campaignsSetSortQuery(state, action)
        case actionTypes.CAMPAIGNS_SET_REVERSESORT: return campaignsSetReverseSort(state, action)
        case actionTypes.CAMPAIGNS_UPDATE_SHOWFILTERS: return campaignsUpdateShowFilters(state, action)
        default:
            return state
    }
}
export default reducer
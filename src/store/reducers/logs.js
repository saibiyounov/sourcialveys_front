import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    typesList: null,
    stepsList: null,
    loading: false,
    error: null,
    count: 0,
    currentPage: 1,
    filtering: false,
    showFilters: false,
    filtersQuery: null,
    sortQuery: 'creationDate',
    reverse: {
        creationDate: true
    }
}

const logsStart = (state, action) => updateObject(state, {
    error: null,
    loading: null
})

const logsSuccess = (state, action) => updateObject(state, {
    data: action.data,
    typesList: action.typesList,
    stepsList: action.stepsList,
    count: action.count,
    error: null,
    loading: false
})

const logsFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1,
    filtering: false
});

const logsSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const logsSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const logsSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const logsUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const logsSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGS_START: return logsStart(state, action)
        case actionTypes.LOGS_SUCCESS: return logsSuccess(state, action)
        case actionTypes.LOGS_FAIL: return logsFail(state, action)
        case actionTypes.LOGS_SET_PAGE: return logsSetPage(state, action)
        case actionTypes.LOGS_SET_FILTERSQUERY: return logsSetFiltersQuery(state, action)
        case actionTypes.LOGS_SET_SORTQUERY: return logsSetSortQuery(state, action)
        case actionTypes.LOGS_SET_REVERSESORT: return logsSetReverseSort(state, action)
        case actionTypes.LOGS_UPDATE_SHOWFILTERS: return logsUpdateShowFilters(state, action)
        default:
            return state
    }
}
export default reducer
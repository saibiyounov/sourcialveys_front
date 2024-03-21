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
    filtersQuery: {
    },
    sortQuery: 'creationDate',
    reverse: {
        creationDate: false
    },
    selectedExtractions : [],
    selectedAllRows : false
}

const emptySelectedExtractions = (state, action) => updateObject(state, {
    selectedExtractions : [],
    selectedAllRows : false
})

const setSelectedAllExtractionRows = (state, action) => {
    let extractionData = [...state.data];
    let selectedExtractionsTemp = [...state.selectedExtractions]; 
    if(extractionData.length > 0){
        extractionData.map(extraction => {
            let extractionIndex = selectedExtractionsTemp.findIndex(uid => uid === extraction.extractionUid)
            if(action.selectAll){
                if(extractionIndex < 0)
                    selectedExtractionsTemp.push(extraction.extractionUid)
            }else {
                if(extractionIndex >= 0)
                    selectedExtractionsTemp.splice(extractionIndex, 1)
            }
        })
    }
    return updateObject(state, {
        selectedAllRows : action.selectAll,
        selectedExtractions: selectedExtractionsTemp
    }); 
}

const selectExtraction = (state, action) => {
    let selectedExtractionsTemp = [...state.selectedExtractions, action.uid];
    return updateObject(state, {
        selectedExtractions: selectedExtractionsTemp
    });
}

const unselectExtraction = (state, action) => {
    let selectedExtractionsTemp = [...state.selectedExtractions];
    let userIndex = selectedExtractionsTemp.findIndex(uid => uid === action.uid);
    selectedExtractionsTemp.splice(userIndex, 1)
    return updateObject(state, {
        selectedExtractions: selectedExtractionsTemp
    });
}

const extractionStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const extractionSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count,
    error: null,
    loading: false
})

const extractionFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const extractionSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const extractionSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const extractionSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const extractionSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const extractionUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const extractionSetFilterQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.EXTRACTION_START: return extractionStart(state, action)
        case actionTypes.EXTRACTION_SUCCESS: return extractionSuccess(state, action)
        case actionTypes.EXTRACTION_FAIL: return extractionFail(state, action)
        case actionTypes.EXTRACTION_SET_PAGE: return extractionSetPage(state, action)
        case actionTypes.EXTRACTION_SET_PAGESIZE: return extractionSetPageSize(state, action)
        case actionTypes.EXTRACTION_SET_FILTERSQUERY: return extractionSetFilterQuery(state, action)
        case actionTypes.EXTRACTION_SET_SORTQUERY: return extractionSetSortQuery(state, action)
        case actionTypes.EXTRACTION_SET_REVERSESORT: return extractionSetReverseSort(state, action)
        case actionTypes.EXTRACTION_UPDATE_SHOWFILTERS: return extractionUpdateShowFilters(state, action)
        case actionTypes.EXTRACTION_SELECT_EXTRACTION: return selectExtraction(state, action)
        case actionTypes.EXTRACTION_UNSELECT_EXTRACTION: return unselectExtraction(state, action)
        case actionTypes.EXTRACTION_SET_SELECTEDALLROWS: return setSelectedAllExtractionRows(state, action)
        case actionTypes.EXTRACTION_EMPTY_SELECTEDEXTRACTIONS: return emptySelectedExtractions(state, action)
        default:
            return state
    }
}
export default reducer
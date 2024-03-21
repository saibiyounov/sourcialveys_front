import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    commandeData:[],
    amountBTTotal: null,
    amountATTotal: null,
    loading: false,
    loadingData: false,
    error: null,
    errorData: null,
    count: 0,
    currentPage: 1,
    pageSize: 100,
    filtering: false,
    showFilters: false,
    filtersQuery: null,
    sortQuery: 'clientName',
    reverse: {
        clientName: false
    },
    file: null,
    selectedRows: null,
    selectedAllRows: false,
    amountBTValues: null,
    amountATValues: null,
    importErrorsCount: 0,
    quickFilter: null
}




const commandeDataStart = (state, action) => updateObject(state, {
    errorData: null,
    loadingData : true
})

const commandeDataSuccess = (state, action) => updateObject(state, {
    commandeData: action.data,
    errorData: null,
    loadingData: false
})

const commandeDataFail = (state, action) => updateObject(state, {
    commandeData: null,
    errorData: action.error,
    loadingData: false
})


const commandeSetSortQuery = (state, action) => {
    return updateObject(state,{sortQuery: action.sortQuery})
}

const commandeSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
    //return updateObject(state, {reverse: action.reverse})
}

const commandeSetQuickFilter = (state, action) => updateObject(state, {
    quickFilter : action.quickFilter
})

const commandeUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const commandeSetFiltersQuery = (state, action) =>{
    return updateObject(
    state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)
} 

const commandeStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const commandeSuccess = (state, action) => {
    const selectedRows = state.selectedRows && action.data ? {...state.selectedRows} : null; 
    if (selectedRows)
        for(const [key, value] of Object.entries(selectedRows)) {
            const existing = action.data.find(i => i.uid === key);
            if (!existing)
                selectedRows[key] = undefined;
        }
    
    return updateObject(state, {
        data: action.data,
        amountBTTotal: action.amountBTTotal,
        amountATTotal: action.amountATTotal,
        amountBTValues: action.amountBTValues,
        amountATValues: action.amountATValues,
        count: action.count,
        error: null,
        loading: false,
        selectedRows: selectedRows
    })
}

const commandeFail = (state, action) => {
    return updateObject(state, {
        data: [],
        error: action.error,
        loading: false,
        count: 0,
        currentPage: 1,
        filtering: false
    })
}

const commandeSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const commandeSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const commandeGetDocumentFile = (state, action) => updateObject(state, {
    file: action.file
})

const commandeSelectRow = (state, action) => {
    let newSelectedRows = {...state.selectedRows, [action.rowId]: action.selected}
    return updateObject(state, {
        selectedRows: newSelectedRows
    })
}

const commandeSelectAllRows = (state, action) => {
    let data = state.data;
    let newSelectedRows = {}
    data?.map(row => {
        newSelectedRows = {...newSelectedRows, [row.uid]: action.selectedAll}
    })
    return updateObject(state, {
        selectedAllRows: action.selectedAll,
        selectedRows: newSelectedRows
    })
}

const commandeSetImportErrorsCount = (state, action) => updateObject(state, {
    importErrorsCount: action.importErrorsCount
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.COMMANDE_START: return commandeStart(state, action)
        case actionTypes.COMMANDE_SUCCESS: return commandeSuccess(state, action)
        case actionTypes.COMMANDE_FAIL: return commandeFail(state, action)
        case actionTypes.COMMANDE_SET_PAGE: return commandeSetPage(state, action)
        case actionTypes.COMMANDE_SET_PAGESIZE: return commandeSetPageSize(state, action)
        case actionTypes.COMMANDE_SET_FILTERSQUERY: return commandeSetFiltersQuery(state, action)
        case actionTypes.COMMANDE_SET_SORTQUERY: return commandeSetSortQuery(state, action)
        case actionTypes.COMMANDE_SET_REVERSESORT: return commandeSetReverseSort(state, action)
        case actionTypes.COMMANDE_UPDATE_SHOWFILTERS: return commandeUpdateShowFilters(state, action)
        case actionTypes.COMMANDE_GET_DOCUMENT_FILE: return commandeGetDocumentFile(state, action)
        case actionTypes.COMMANDE_SELECT_ROW: return commandeSelectRow(state, action)
        case actionTypes.COMMANDE_SELECT_ALL_ROWS: return commandeSelectAllRows(state, action)
        case actionTypes.COMMANDE_SET_IMPORT_ERRORS_COUNT: return commandeSetImportErrorsCount(state, action)
        case actionTypes.COMMANDE_SET_QUICKFILTER: return commandeSetQuickFilter(state, action)

        case actionTypes.COMMANDEDETAIL_DATA_START: return commandeDataStart(state, action)
        case actionTypes.COMMANDEDETAIL_DATA_SUCCESS: return commandeDataSuccess(state, action)
        case actionTypes.COMMANDEDETAIL_DATA_FAIL: return commandeDataFail(state, action)
        default:
            return state    
    }
}
export default reducer
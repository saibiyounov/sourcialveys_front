import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    amountBTTotal: null,
    amountATTotal: null,
    loading: false,
    error: null,
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

const invoiceSetSortQuery = (state, action) => {
    return updateObject(state,{sortQuery: action.sortQuery})
}

const invoiceSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
    //return updateObject(state, {reverse: action.reverse})
}

const invoiceSetQuickFilter = (state, action) => updateObject(state, {
    quickFilter : action.quickFilter
})

const invoiceUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const invoiceSetFiltersQuery = (state, action) =>{
    return updateObject(
    state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)
} 

const invoiceStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const invoiceSuccess = (state, action) => {
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

const invoiceFail = (state, action) => {
    return updateObject(state, {
        data: [],
        error: action.error,
        loading: false,
        count: 0,
        currentPage: 1,
        filtering: false
    })
}

const invoiceSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const invoiceSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const invoiceGetDocumentFile = (state, action) => updateObject(state, {
    file: action.file
})

const invoiceSelectRow = (state, action) => {
    let newSelectedRows = {...state.selectedRows, [action.rowId]: action.selected}
    return updateObject(state, {
        selectedRows: newSelectedRows
    })
}

const invoiceSelectAllRows = (state, action) => {
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

const invoiceSetImportErrorsCount = (state, action) => updateObject(state, {
    importErrorsCount: action.importErrorsCount
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INVOICE_START: return invoiceStart(state, action)
        case actionTypes.INVOICE_SUCCESS: return invoiceSuccess(state, action)
        case actionTypes.INVOICE_FAIL: return invoiceFail(state, action)
        case actionTypes.INVOICE_SET_PAGE: return invoiceSetPage(state, action)
        case actionTypes.INVOICE_SET_PAGESIZE: return invoiceSetPageSize(state, action)
        case actionTypes.INVOICE_SET_FILTERSQUERY: return invoiceSetFiltersQuery(state, action)
        case actionTypes.INVOICE_SET_SORTQUERY: return invoiceSetSortQuery(state, action)
        case actionTypes.INVOICE_SET_REVERSESORT: return invoiceSetReverseSort(state, action)
        case actionTypes.INVOICE_UPDATE_SHOWFILTERS: return invoiceUpdateShowFilters(state, action)
        case actionTypes.INVOICE_GET_DOCUMENT_FILE: return invoiceGetDocumentFile(state, action)
        case actionTypes.INVOICE_SELECT_ROW: return invoiceSelectRow(state, action)
        case actionTypes.INVOICE_SELECT_ALL_ROWS: return invoiceSelectAllRows(state, action)
        case actionTypes.INVOICE_SET_IMPORT_ERRORS_COUNT: return invoiceSetImportErrorsCount(state, action)
        case actionTypes.INVOICE_SET_QUICKFILTER: return invoiceSetQuickFilter(state, action)
        default:
            return state
    }
}
export default reducer
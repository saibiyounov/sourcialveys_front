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
    filtersQuery: [],
    sortQuery: 'creationDate',
    reverse: {
        creationDate: false
    },
    selectedSuppliers : [],
    selectedAllRows : false
}

const emptySelectedSupplierRequest = (state, action) => updateObject(state, {
    selectedSuppliers : [],
    selectedAllRows : false
})

const setSelectedAllSupplierRequestRows = (state, action) => {
    let suppliersData = [...state.data];
    let selectedSppliersTemp = [...state.selectedSuppliers]; 
    if(suppliersData.length > 0){
        suppliersData.map(supplier => {
            let supplierIndex = selectedSppliersTemp.findIndex(uid => uid === supplier.userUid)
            if(action.selectAll){
                if(supplierIndex < 0)
                selectedSppliersTemp.push(supplier.userUid)
            }else {
                if(supplierIndex >= 0)
                selectedSppliersTemp.splice(supplierIndex, 1)
            }
        })
    }
    return updateObject(state, {
        selectedAllRows : action.selectAll,
        selectedSuppliers: selectedSppliersTemp
    }); 
}

const selectSupplierRequest = (state, action) => {
    let selectedSuppliersTemp = [...state.selectedSuppliers, action.uid];
    return updateObject(state, {
        selectedSuppliers: selectedSuppliersTemp
    });
}

const unselectSupplierRequest = (state, action) => {
    let selectedSuppliersTemp = [...state.selectedSuppliers];
    let supplierIndex = selectedSuppliersTemp.findIndex(uid => uid === action.uid);
    selectedSuppliersTemp.splice(supplierIndex, 1)
    return updateObject(state, {
        selectedSuppliers: selectedSuppliersTemp
    });
}

const supplierRequestStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const supplierRequestSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count,
    error: null,
    loading: false
})

const supplierRequestFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const supplierRequestSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const supplierRequestSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const supplierRequestSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const supplierRequestSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const supplierRequestUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const supplierRequestSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters
        },
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SUPPLIER_REQUEST_START: return supplierRequestStart(state, action)
        case actionTypes.SUPPLIER_REQUEST_SUCCESS: return supplierRequestSuccess(state, action)
        case actionTypes.SUPPLIER_REQUEST_FAIL: return supplierRequestFail(state, action)
        case actionTypes.SUPPLIER_REQUEST_SET_PAGE: return supplierRequestSetPage(state, action)
        case actionTypes.SUPPLIER_REQUEST_SET_PAGESIZE: return supplierRequestSetPageSize(state, action)
        case actionTypes.SUPPLIER_REQUEST_SET_FILTERSQUERY: return supplierRequestSetFiltersQuery(state, action)
        case actionTypes.SUPPLIER_REQUEST_SET_SORTQUERY: return supplierRequestSetSortQuery(state, action)
        case actionTypes.SUPPLIER_REQUEST_SET_REVERSESORT: return supplierRequestSetReverseSort(state, action)
        case actionTypes.SUPPLIER_REQUEST_UPDATE_SHOWFILTERS: return supplierRequestUpdateShowFilters(state, action)
        case actionTypes.SUPPLIER_REQUEST_SELECT_USER: return selectSupplierRequest(state, action)
        case actionTypes.SUPPLIER_REQUEST_UNSELECT_USER: return unselectSupplierRequest(state, action)
        case actionTypes.SUPPLIER_REQUEST_SET_SELECTEDALLROWS: return setSelectedAllSupplierRequestRows(state, action)
        case actionTypes.SUPPLIER_REQUEST_EMPTY_SELECTEDSUPPLIERS: return emptySelectedSupplierRequest(state, action)
        default:
            return state
    }
}
export default reducer
import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useTranslation } from 'react-i18next';
import { getNotyfObject } from '../../shared/utility';
const notyf = getNotyfObject();


export const commandeStart = () => {
    return {
        type: actionTypes.COMMANDE_START
    }
}

export const commandeSetPage = (page) => ({
    type: actionTypes.COMMANDE_SET_PAGE,
    currentPage: page
})

export const commandeSetPageSize = (pageSize) => ({
    type: actionTypes.COMMANDE_SET_PAGESIZE,
    pageSize: pageSize
})

export const commandeSuccess = (data, count, amountBTTotal, amountATTotal, amountBTValues, amountATValues) => {
    return {
        type: actionTypes.COMMANDE_SUCCESS,
        data: data,
        amountBTTotal: amountBTTotal,
        amountATTotal: amountATTotal,
        amountBTValues: amountBTValues,
        amountATValues: amountATValues,
        count: count
    }
}

export const commandeFail = (error) => {
    return {
        type: actionTypes.COMMANDE_FAIL,
        error: error
    }
}

export const commandeGetAll = () => {
    return dispatch => {
        dispatch(commandeStart());
        Axios.get('/invoice/')
            .then(response => {
                dispatch(commandeSuccess(response.data[0], response.data[1]))
            })
            .catch(err => {
                dispatch(commandeFail(err.response.data.message))
            })
    }
}

export const commandeGetPage = (page, filters, sort, reverse, pageSize = 100) => {
    let newFilters = {
        pageSize: pageSize
    }
    if(filters){
        for (const key in filters) {
            if(filters[key])
                newFilters = {
                    ...newFilters,
                    [key]: filters[key]
                }
        }
    }
    if(sort){
        newFilters = {
            ...newFilters,
            orderBy: sort
        }
    }
    if(reverse){
        newFilters = {
            ...newFilters,
            reverse: reverse[sort]
        }
    }
    return dispatch => {
        dispatch(commandeStart());
        //Axios.get('/invoice/'+id_user+'/search?page='+page +'&role='+role, {
        Axios.get('/commande?page='+page, {
            params: {...newFilters}
        }).then(response => {
                dispatch(commandeSuccess(response?.data?.result, response.status === 204 ? 0 : response?.data?.count, response?.data?.amountBTTotal, response?.data?.amountATTotal, response?.data?.amountBTValues, response?.data?.amountATValues))
            }).catch(err => {
                dispatch(commandeFail(err.response.data.message))
            })
    }
}



export const commandeSetFiltersQuery = (filtersQuery) => {
    return {
        type: actionTypes.COMMANDE_SET_FILTERSQUERY,
        filters: filtersQuery,
        filtering: commandeUpdateFiltering(filtersQuery)
    }
}


export const commandeUpdateFiltering = (filtersQuery) => {
    let filter = false;
    if(filtersQuery){
        for(const key in filtersQuery){
            if(filtersQuery[key]){
                filter = true
            }
        }
    }
    return filter
}

export const commandeSetQuickFilter = (quickFilterField) => {
    return {
        type : actionTypes.COMMANDE_SET_QUICKFILTER,
        quickFilter : quickFilterField
    }
}

export const commandeUpdateShowFilters = (show) => {
    return {
        type: actionTypes.COMMANDE_UPDATE_SHOWFILTERS,
        showFilters: show
    }
}

export const commandeSetSortQuery = (sortQuery) => {
    return {
        type: actionTypes.COMMANDE_SET_SORTQUERY,
        sortQuery: sortQuery
    }
}

export const commandeSetReverseSort = (reverse) => {
    return {
        type: actionTypes.COMMANDE_SET_REVERSESORT,
        reverse: reverse
    }
}

export const commandeGetDocSuccess = (fileB64) => {
    return {
        type: actionTypes.COMMANDE_GET_DOCUMENT_FILE,
        file: fileB64
    }
} 




export const commandeSelectRow = (rowId, selected) => {
    return {
        type: actionTypes.COMMANDE_SELECT_ROW,
        rowId: rowId,
        selected: selected
    }
}

export const commandeSelectAllRows = (selectedAll) => {
    return {
        type: actionTypes.COMMANDE_SELECT_ALL_ROWS,
        selectedAll: selectedAll
    }
}

export const commandeGetCompressedDocument = (selectedIds) => {
    return dispatch => {
        Axios.get('/invoice//compressedDocument?selection='+selectedIds, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            if(response.status === 200){
                let blob = new Blob([response.data], { type: 'application/zip' })
                const downloadUrl = URL.createObjectURL(blob)
                let a = document.createElement("a"); 
                a.href = downloadUrl;
                a.download = "compressed.zip";
                document.body.appendChild(a);
                a.click();
            }else {
                notyf.error("Archive vide ou non valide");
            }
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
        })
    }
}

export const commandeSetImportErrorsCount = count => {
    return {
        type: actionTypes.COMMANDE_SET_IMPORT_ERRORS_COUNT,
        importErrorsCount: count
    }
}


// export const invoiceGetImportErrorsCount = () => {
//     return dispatch => {
//         Axios.get('/importErrorField//count').then(response => {
//             dispatch(invoiceSetImportErrorsCount(Number(response.data.count)));
//         }).catch(err => {
//             dispatch(invoiceSetImportErrorsCount(null));
//         })
//     }
// }


export const commandeDataStart = () => ({
    type: actionTypes.COMMANDEDETAIL_DATA_START
})

export const commandeDataSuccess = (data) => ({
    type: actionTypes.COMMANDEDETAIL_DATA_SUCCESS,
    data: data,
});

export const commandeDataFail = (error) => ({
    type: actionTypes.COMMANDEDETAIL_DATA_FAIL,
    error: error
})

export const getCommandeData = (uid) => {
    return dispatch => {
        dispatch(commandeDataStart());
        Axios.get(`/commande/${uid}/commandeDataByUid`)
        .then(response => {
            dispatch(commandeDataSuccess(response.data))
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
            dispatch(commandeDataFail(err.response?.data?.error))
        })
    }
}
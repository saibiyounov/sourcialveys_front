import * as actionTypes from './actionTypes';
import Axios from '../../axios-proas';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useTranslation } from 'react-i18next';
import { getNotyfObject } from '../../shared/utility';
const notyf = getNotyfObject();

export const commandesDeadlineExceededStart = () => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_START
    }
}

export const commandesDeadlineExceededSetPage = (page) => ({
    type: actionTypes.COMMANDEDEADLINEEXCEEDED_SET_PAGE,
    currentPage: page
})





export const commandesDeadlineExceededSetPageSize = (pageSize) => ({
    type: actionTypes.COMMANDEDEADLINEEXCEEDED_SET_PAGESIZE,
    pageSize: pageSize
})

export const commandesDeadlineExceededSuccess = (data, count, amountBTTotal, amountATTotal, amountBTValues, amountATValues) => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_SUCCESS,
        data: data,
        amountBTTotal: amountBTTotal,
        amountATTotal: amountATTotal,
        amountBTValues: amountBTValues,
        amountATValues: amountATValues,
        count: count
    }
}

export const commandesDeadlineExceededFail = (error) => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_FAIL,
        error: error
    }
}



export const commandesDeadlineExceededGetPage = (page, filters, sort, reverse, pageSize = 100) => {
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
        dispatch(commandesDeadlineExceededStart());
        //Axios.get('/invoice/'+id_user+'/search?page='+page +'&role='+role, {
        Axios.get('/invoice?page='+page, {
            params: {...newFilters}
        }).then(response => {
                dispatch(commandesDeadlineExceededSuccess(response?.data?.result, response.status === 204 ? 0 : response?.data?.count, response?.data?.amountBTTotal, response?.data?.amountATTotal, response?.data?.amountBTValues, response?.data?.amountATValues))
            }).catch(err => {
                dispatch(commandesDeadlineExceededFail(err.response.data.message))
            })
    }
}


export const commandesDeadlineExceededSetFiltersQuery = (filtersQuery) => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_SET_FILTERSQUERY,
        filters: filtersQuery,
        filtering: invoiceUpdateFiltering(filtersQuery)
    }
}


export const invoiceUpdateFiltering = (filtersQuery) => {
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

export const commandesDeadlineExceededSetQuickFilter = (quickFilterField) => {
    return {
        type : actionTypes.COMMANDEDEADLINEEXCEEDED_SET_QUICKFILTER,
        quickFilter : quickFilterField
    }
}

export const commandesDeadlineExceededUpdateShowFilters = (show) => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_UPDATE_SHOWFILTERS,
        showFilters: show
    }
}

export const commandesDeadlineExceededSetSortQuery = (sortQuery) => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_SET_SORTQUERY,
        sortQuery: sortQuery
    }
}

export const commandesDeadlineExceededSetReverseSort = (reverse) => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_SET_REVERSESORT,
        reverse: reverse
    }
}

export const commandesDeadlineExceededSelectRow = (rowId, selected) => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_SELECT_ROW,
        rowId: rowId,
        selected: selected
    }
}

export const commandesDeadlineExceededSelectAllRows = (selectedAll) => {
    return {
        type: actionTypes.COMMANDEDEADLINEEXCEEDED_SELECT_ALL_ROWS,
        selectedAll: selectedAll
    }
}

export const commandesDeadlineExceededGetCompressedDocument = (selectedIds) => {
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






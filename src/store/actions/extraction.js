import * as actionTypes from './actionTypes';
// import Axios from '../../axios-gse';
import Axios from '../../axios-proas';

export const extractionStart = () => ({
    type: actionTypes.EXTRACTION_START
})

export const extractionSetPage = (page) => ({
    type: actionTypes.EXTRACTION_SET_PAGE,
    currentPage: page
})

export const extractionSetPageSize = (pageSize) => ({
    type: actionTypes.EXTRACTION_SET_PAGESIZE,
    pageSize: pageSize
})

export const extractionSuccess = (data, count) => ({
    type: actionTypes.EXTRACTION_SUCCESS,
    data: data,
    count: count
});

export const extractionFail = (error) => ({
    type: actionTypes.EXTRACTION_FAIL,
    error: error
})

// export const clientsGetPage = (page) => {
//     return dispatch => {
//         dispatch(clientsStart());
//         Axios.get('/client?page='+page)
//             .then(response => {
//                 dispatch(clientsSuccess(response.data.result, response.data.count))
//             }).catch(err => {
//                 dispatch(clientsFail(err.response.data.error))
//             })
//     }
// }

export const extractionGetPage = (page, filters, sort, reverse, pageSize) => {
    let newFilters = {
        page: page,
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
    //console.log(sort)
    return dispatch => {
        dispatch(extractionStart());
        Axios.get('/extraction', {
            params: {...newFilters}
        })
        .then(response => {
            dispatch(extractionSuccess(response.data.result, response.data.count))
        }).catch(err => {
            dispatch(extractionFail(err.response?.data?.error))
        })
    }
}

export const extractionSetFilterQuery = (filtersQuery) => ({
    type: actionTypes.EXTRACTION_SET_FILTERSQUERY,
    filters: filtersQuery,
    filtering: extractionUpdateFiltering(filtersQuery) 
});

export const extractionUpdateFiltering = (filtersQuery) => {
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

export const extractionUpdateShowFilters = (show) => ({
    type: actionTypes.EXTRACTION_UPDATE_SHOWFILTERS,
    showFilters: show
});

export const extractionSetSortQuery = (sortQuery) => ({
    type: actionTypes.EXTRACTION_SET_SORTQUERY,
    sortQuery: sortQuery
})

export const extractionSetReverseSort = (reverse) => ({
    type: actionTypes.EXTRACTION_SET_REVERSESORT,
    reverse: reverse
})

export const setSelectedAllExtractionRows = (selectAll) => ({
    type: actionTypes.EXTRACTION_SET_SELECTEDALLROWS,
    selectAll
})

export const selectExtraction = (uid) => ({
    type: actionTypes.EXTRACTION_SELECT_EXTRACTION,
    uid
})

export const unselectExtraction = (uid) => ({
    type: actionTypes.EXTRACTION_UNSELECT_EXTRACTION,
    uid
})

export const emptySelectedextractions = () => ({
    type: actionTypes.EXTRACTION_EMPTY_SELECTEDEXTRACTIONS
})
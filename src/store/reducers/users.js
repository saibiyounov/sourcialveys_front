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
    sortQuery: 'first_name',
    reverse: {
        first_name: false
    },
    selectedUsers : [],
    selectedAllRows : false
}

const emptySelectedUsers = (state, action) => updateObject(state, {
    selectedUsers : [],
    selectedAllRows : false
})

const setSelectedAllRows = (state, action) => {
    let usersData = [...state.data];
    let selectedUsersTemp = [...state.selectedUsers]; 
    if(usersData.length > 0){
        usersData.map(user => {
            let userIndex = selectedUsersTemp.findIndex(uid => uid === user.userUid)
            if(action.selectAll){
                if(userIndex < 0)
                    selectedUsersTemp.push(user.userUid)
            }else {
                if(userIndex >= 0)
                    selectedUsersTemp.splice(userIndex, 1)
            }
        })
    }
    return updateObject(state, {
        selectedAllRows : action.selectAll,
        selectedUsers: selectedUsersTemp
    }); 
}

const selectUser = (state, action) => {
    let selectedUsersTemp = [...state.selectedUsers, action.uid];
    return updateObject(state, {
        selectedUsers: selectedUsersTemp
    });
}

const unselectUser = (state, action) => {
    let selectedUsersTemp = [...state.selectedUsers];
    let userIndex = selectedUsersTemp.findIndex(uid => uid === action.uid);
    selectedUsersTemp.splice(userIndex, 1)
    return updateObject(state, {
        selectedUsers: selectedUsersTemp
    });
}

const usersStart = (state, action) => updateObject(state, {
    error: null,
    loading: true
})

const usersSuccess = (state, action) => updateObject(state, {
    data: action.data,
    count: action.count,
    error: null,
    loading: false
})

const usersFail = (state, action) => updateObject(state, {
    data: [],
    error: action.error,
    loading: false,
    count: 0,
    currentPage: 1
})

const usersSetPage = (state, action) => updateObject(state, {
    currentPage: action.currentPage
})

const usersSetPageSize = (state, action) => updateObject(state, {
    pageSize: action.pageSize
})

const usersSetSortQuery = (state, action) => updateObject(state,{
    sortQuery: action.sortQuery
})

const usersSetReverseSort = (state, action) => {
    return {
        ...state,
        reverse: {...action.reverse}
    }
}

const usersUpdateShowFilters = (state, action) => {
    return updateObject(state, {showFilters: action.showFilters})
}

const usersSetFiltersQuery = (state, action) => updateObject(state, {
        filtersQuery: {
            ...action.filters},
        filtering: action.filtering
    }
)

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USERS_START: return usersStart(state, action)
        case actionTypes.USERS_SUCCESS: return usersSuccess(state, action)
        case actionTypes.USERS_FAIL: return usersFail(state, action)
        case actionTypes.USERS_SET_PAGE: return usersSetPage(state, action)
        case actionTypes.USERS_SET_PAGESIZE: return usersSetPageSize(state, action)
        case actionTypes.USERS_SET_FILTERSQUERY: return usersSetFiltersQuery(state, action)
        case actionTypes.USERS_SET_SORTQUERY: return usersSetSortQuery(state, action)
        case actionTypes.USERS_SET_REVERSESORT: return usersSetReverseSort(state, action)
        case actionTypes.USERS_UPDATE_SHOWFILTERS: return usersUpdateShowFilters(state, action)
        case actionTypes.USERS_SELECT_USER: return selectUser(state, action)
        case actionTypes.USERS_UNSELECT_USER: return unselectUser(state, action)
        case actionTypes.USERS_SET_SELECTEDALLROWS: return setSelectedAllRows(state, action)
        case actionTypes.USERS_EMPTY_SELECTEDUSERS: return emptySelectedUsers(state, action)
        default:
            return state
    }
}
export default reducer
import React, { useCallback, useEffect, useState } from 'react';
import Axios from '../../../axios-proas';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import * as actions from '../../../store/actions/index';

import TableBody from '../../../components/InvoiceTable/TableBody/TableBody';
import TableActions from '../../../components/InvoiceTable/TableActions/TableActions';
import TableHead from '../../../components/InvoiceTable/TableHead/TableHead';
import TableFilters from '../../../components/InvoiceTable/TableFilters/TableFilters';
import TablePagination from '../../../components/UI/TablePagination/TablePagination';
import TitleHelmet from '../../../components/UI/TitleHelmet/TitleHelmet';
import AttachmentModal from '../../../components/InvoiceTable/TableBody/AttachmentModal/AttachmentModal';
import { useTranslation } from 'react-i18next';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SearchIcon from '@mui/icons-material/Search';
import DateRange from '../../../components/InvoiceTable/TableFilters/DateRange/DateRange';
import { getNotyfObject } from '../../../shared/utility';
import TextsmsIcon from '@mui/icons-material/Textsms';

import { NoContent, SearchInput, SearchInputContainer, SpinnerContainer, Table, TableAction, TBody, ToInvoicesLink } from '../../../styles/Table.styled';

import SelectPeriod from '../../../components/UI/SelectPeriod/SelectPeriod';
import {LIContainer, LIHeader, LITitle, LIActions, LITableContainer} from './LastInvoicesClient.styled'

function LastInvoicesClient(props) {
    let {
        keyPath,
        entityFilter, 
        userLevel, 
        userType, 
        token, 
        loading, 
        invoicesData, 
        count, 
        currentPage, 
        pageSize,
        setInvoicePage, 
        setInvoicePageSize, 
        getInvoicesPage, 
        setInvoiceFilters, 
        filtersQuery, 
        quickFilter, 
        setInvoiceQuickFilter,  
        filtering, 
        sortQuery, 
        reverse, 
        setSortQuery, 
        setReverse, 
        updateShowFilters, 
        showFilters, 
        selectedRows, 
        setSelectedRows, 
        getCompressedDoc, 
        selectedAllRows, 
        setSelectedAllRows, 
        amountBTTotal, 
        amountATTotal, 
        amountBTValues, 
        amountATValues,
        invoiceCheckBox,
        NoshowTitel
    } = props;
    const [attachmentModalShow, setAttachmentModalShow] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showQuickDateInterval, setShowQuickDateInterval] = useState(false)
    const [newMessages, setNewMessages] = useState(0);

    const [messagesToggleOn, setMessagesToggleOn] = useState(false);
    const[density,setDensity]=useState("2.25rem")
    const[columns,setColumns]=useState([])
    let notyf = getNotyfObject();

    const {t} = useTranslation();

    const initialFiltersQuerry = {
        visualisation: false,
        entityFilter
    }

    useEffect(() => {
        const columnsCopy = [];
        columnsCopy.push({title: t("logs:type"), field: 'type', width: "100px" , show:true, alignSelf:"left"});
        columnsCopy.push({title: t("invoiceList:number"), field: 'number', width: "100px", show:true, alignSelf:"center"});
    if (entityFilter === "supplier")
        columnsCopy.push({title: "Pièce jointe", field: 'attachmentFile', width: "100px", show:true, alignSelf:"left"});
    else if (entityFilter === "client")
        columnsCopy.push({title: t("invoiceList:readStatus"), field: 'firstAccessDate', width: "40px", show:true, alignSelf:"left"});
        columnsCopy.push({title: t("invoiceList:creationDate"), field: 'issuingDate', width:"140px", show:true, alignSelf:"center"});
        columnsCopy.push({title: t("invoiceList:dueDate"), field: 'dueDate', width: "140px", show:true, alignSelf:"center"});
    if(userType === "client")
         columnsCopy.push({title: t("invoiceList:issuingSupplier"), field: 'supplierName', width: "200px", show:true, alignSelf:"left"});
    else if(userType === "supplier")
        columnsCopy.push({title: t("clientList:entity", "Entité"), field: 'clientName', width: "200px", show:true, alignSelf:"left"});
    else {
        columnsCopy.push({title: t("invoiceList:supplier"), field: 'supplierName', width: "140px", show:true, alignSelf:"left"});
        columnsCopy.push({title: "Entité", field: 'clientName', width: "140px", show:true, alignSelf:"left"});
    }
        columnsCopy.push({title: t("invoiceList:status"), field: 'status', width: "100px", show:true, alignSelf:"center"});
  
        columnsCopy.push({title: "Canal", field: 'channel', width: "100px", show:true, alignSelf:"left"});
        columnsCopy.push({title: t("invoiceList:exclusiveAmount"), field: 'exclusiveTaxAmount', width: "100px", show:true, alignSelf:"right"});        
        columnsCopy.push({title: t("invoiceList:inclusiveAmount"), field: 'inclusiveTaxAmount', width: "100px", show:true, alignSelf:"right"});
        columnsCopy.push({title: t("invoiceList:currency"), field: 'currency', width: "70px", show:true, alignSelf:"center"});
       
        setColumns(columnsCopy);
    }, [entityFilter])

    

    const dateFilterOptions = [
        {label: '-- Période --', value: ''},
        {label: 'Cette année', value: 'thisYear'},
        {label: 'Le mois dernier', value: 'lastMonth'},
        {label: 'Ce mois-ci', value: 'thisMonth'}
    ];
    const convertDate = (date) => {
        let dateArray = date.split(':');
        return [formatDate(+dateArray[0]) , formatDate(+dateArray[1])]
    }

    const getNewMessages = () => {
        Axios.get('/invoice//checkNewMessages', {
            params: {
              entityFilter: entityFilter
            }
          }).then(response => {
            setNewMessages(response.data.length);
        }).catch(err => {
        })
    }
    useEffect(() => {
        setInvoicePageSize(20)
        
    }, [])
    useEffect(() => {
        let newFilters = {
            ...initialFiltersQuerry
        }
        updateShowFilters(false)
        setInvoiceFilters(newFilters)
        getInvoicesPage(currentPage, newFilters, "clientName", {clientName: false}, pageSize);
        getNewMessages();
    }, [getInvoicesPage, entityFilter, pageSize])

    const isEmptyFilters = () => {
        if(filtersQuery === null )
            return true;
        let filtersList = columns.map(column => column.field)
        filtersList.push("documentType");
        let empty = true;
        filtersList.forEach(filter => {
            if(filtersQuery[filter])
                empty = false;
        })
        return Object.keys(filtersQuery).length === 0 || empty;
    }

    useEffect(() => {
        const isEmpty = isEmptyFilters();
        if(!showFilters && !isEmpty) {
            handleReset()
        }
    }, [showFilters]);

    const getQuickDateInterval = () => {
        if(filtersQuery?.quickCreationDate){
            return `Du : ${convertDate(filtersQuery.quickCreationDate)[0]} À : ${convertDate(filtersQuery.quickCreationDate)[1]} `
        }else 
            return '';
    }


    const handleShowFilters = () => {
        updateShowFilters(!showFilters)
    }

    const formatDate = useCallback((date) => {
        if (date !== null && date.valueOf() > 0){
            let newDate = new Date(date);
            let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()
            let month = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)
        return day + '/' + month + '/' + newDate.getFullYear()
        }else return null;
    }, [])

    const handleChangePage = useCallback((newPage) => {
        //e.preventDefault();
        setInvoicePage(newPage);
        getInvoicesPage(newPage, filtersQuery, sortQuery, reverse, pageSize);
    }, [filtersQuery, reverse, sortQuery, pageSize]);

    const handleSort = useCallback((sort,newReverse) => {
        getInvoicesPage(currentPage, filtersQuery, sort, newReverse, pageSize)
    }, [currentPage,filtersQuery, sortQuery, reverse, pageSize])

    const handleApplyFiltering = useCallback((filters) => {
        getInvoicesPage(1,filters, sortQuery, reverse, pageSize);
    }, [currentPage, filtersQuery, reverse, sortQuery, pageSize]);

    const handleUpdateViewed = useCallback ((e, id) => {
        if(userType && userType === "client"){
            Axios.put("/invoice/"+id+"/firstAccessDate",{
                firstAccessDate: new Date().getTime()
            }).then(response => getInvoicesPage(currentPage, filtersQuery, sortQuery, reverse, pageSize))
                .catch(err => console.error(err))
        }
    }, [pageSize])

    const messagesToggleClickHandler = () => {
        let newValue = !messagesToggleOn;
        setMessagesToggleOn(newValue);
        let filtersTemp = {
            ...initialFiltersQuerry,
            unreadMessages : (newValue ? 'on' : 'off')
        }
        setInvoiceFilters(filtersTemp)
        handleApplyFiltering(filtersTemp)
    }

    const editStatus = ( invoiceUid, status, reason = null) => {
        Axios.put('/invoice//updateStatus', 
              { 
                  "InvoiceId": invoiceUid,
                  "status" : status,
                  reason
        }).then(response => {
            getInvoicesPage(currentPage, filtersQuery, sortQuery, reverse, pageSize)
            notyf.success("Statut modifié")
        }).catch(err => {
            notyf.error("Une erreur s'est produite")
        })
    }

    const handleReset = useCallback(() =>{
        let newFilters = {
            ...initialFiltersQuerry
        }
        setInvoiceQuickFilter(null)
        setSortQuery("clientName")
        setReverse({clientName: false})
        setInvoiceFilters(newFilters);
        setInvoicePage(1);
        getInvoicesPage(1, newFilters, "clientName", {clientName: false}, pageSize);
    }, [])

    const attachmentHandler = (e, invoice) => {
        e.preventDefault();
        setSelectedInvoice(invoice);
        setAttachmentModalShow(true);
    }

    const filtersChangeHandler = (newFilters) => {
        const filtersTemp = {
            ...newFilters,
            quickCreationDate : null,
            quickSearch : null
        }
        setInvoiceQuickFilter(null)
        setInvoiceFilters(filtersTemp)
        handleApplyFiltering(filtersTemp)
    }

    const getQuickFilterLabel = () => {
        return dateFilterOptions?.find(val => val.value === quickFilter)?.label
            || dateFilterOptions[0].label
    }

    const quickFilterChangeHandler = (value) => {
        switch (value) {
            case 'thisYear':
                thisYearClickHandler()
                break;
            case 'thisMonth':
                thisMonthClickHandler()
                break;
            case 'lastMonth':
                lastMonthClickHandler()
                break;
            default:
                resetQuickFilter()
                break;
        }
    }

    const resetQuickFilter = () => {
        setInvoiceQuickFilter(null)
        setInvoiceFilters(initialFiltersQuerry)
        handleApplyFiltering(initialFiltersQuerry)
    }

    const thisMonthClickHandler = () => {
        const currentDate = new Date();
        const monthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
        const monthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1 , 1).getTime() - 1;
        let filtersTemp = {
            ...initialFiltersQuerry,
            quickCreationDate : monthFirstDay + ":" + monthLastDay
        }
        setInvoiceQuickFilter('thisMonth')
        setInvoiceFilters(filtersTemp)
        handleApplyFiltering(filtersTemp)
    }

    const lastMonthClickHandler = () => {
        const currentDate = new Date();
        const monthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1).getTime();
        const monthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() , 1).getTime() - 1;
        let filtersTemp = {
            ...initialFiltersQuerry,
            quickCreationDate : monthFirstDay + ":" + monthLastDay
        }
        setInvoiceQuickFilter('lastMonth')
        setInvoiceFilters(filtersTemp)
        handleApplyFiltering(filtersTemp)
    }

    const thisYearClickHandler = () => {
        const currentDate = new Date();
        const monthFirstDay = new Date(currentDate.getFullYear(), 0, 1).getTime();
        const monthLastDay = new Date(currentDate.getFullYear() + 1, 0 , 1).getTime() - 1;
        let filtersTemp = {
            ...initialFiltersQuerry,
            quickCreationDate : monthFirstDay + ":" + monthLastDay
        }
        setInvoiceQuickFilter('thisYear')
        setInvoiceFilters(filtersTemp)
        handleApplyFiltering(filtersTemp)
    }

    const quickDateIntervalChangeHandler = (date) => {
        let filtersTemp = {
            ...initialFiltersQuerry,
            quickCreationDate : date.startDate.getTime() + ':' + date.endDate.getTime()
        }
        setInvoiceQuickFilter('quickDateInterval')
        setInvoiceFilters(filtersTemp)
        handleApplyFiltering(filtersTemp);
    }

    const quickSearchChange = (quickSearchValue) => {
        let filtersTemp = {
            ...initialFiltersQuerry,
            quickSearch : quickSearchValue
        }
        setInvoiceQuickFilter('quickSearch')
        setInvoiceFilters(filtersTemp)
        handleApplyFiltering(filtersTemp);
    }


    let tBody = null;
    let tSpinner = loading ? (
        <SpinnerContainer>
            <Spinner animation="border" variant="primary" />
        </SpinnerContainer>
        ) : (
            <NoContent>
                <span>{t("invoiceList:noInvoices")}</span>
            </NoContent>
        );

    if(!loading && invoicesData?.length > 0 && columns?.length > 0){
        tSpinner = null;
        tBody = (
            <TableBody 
                invoiceCheckBox={invoiceCheckBox}
                columns={columns} 
                data={invoicesData} 
                formatDate={formatDate} 
                setViewed={handleUpdateViewed}
                selectedRows={selectedRows} 
                setSelectedRows={setSelectedRows}
                userLevel={userLevel}
                userType={userType}
                attachmentHandler={attachmentHandler}
                editStatus={editStatus}               
                disableStatus={entityFilter === "client"}
                entityFilter={entityFilter}
            />
            )
    }

    
    return (
        <LIContainer>
               
        <LIHeader>
        {!NoshowTitel&&
            <LITitle>Dernières factures {entityFilter === 'supplier' ? 'fournisseurs' : 'clients'}</LITitle>
        }
            {/* <LIActions>
                    <TableActions 
                        filterState={showFilters} 
                        showFilters={handleShowFilters} 
                        filtering={filtering}
                        sortQuery={sortQuery} 
                        reverse={reverse} 
                        filters={filtersQuery} 
                        resetData={handleReset} 
                        formatDate={formatDate} 
                        getCompressedDoc={getCompressedDoc} 
                        selectedRows={selectedRows} 
                        selectedAllRows={selectedAllRows} 
                        setSelectedAllRows={setSelectedAllRows} 
                        userLevel={userLevel}
                        userType={userType}  
                        entityFilter={entityFilter}      
                        /> 
                
                </LIActions> */}

            
            </LIHeader>

              <LITableContainer>
                <Table>
                    <TableHead 
                            invoiceCheckBox={invoiceCheckBox}
                            columns={columns} 
                            sortQuery={sortQuery} 
                            reverse={reverse} 
                            setSortQuery={setSortQuery} 
                            setReverse={setReverse} 
                            getData={handleSort}
                            selectedRows={selectedRows}
                            selectedAllRows={selectedAllRows}
                            setSelectedAllRows={setSelectedAllRows}
                            entityFilter={entityFilter}
                        />
                        <TBody  height={"2.25rem"}>
                            {/* {showFilters && <TableFilters 
                                invoiceCheckBox={invoiceCheckBox}
                                columns={columns}
                                show={showFilters} 
                                formatDate={formatDate} 
                                filters={filtersQuery} 
                                filtersChange={filtersChangeHandler} 
                                applyFilters={handleApplyFiltering}
                                amountBTTotal={amountBTTotal}
                                amountATTotal={amountATTotal}
                                amountBTValues={amountBTValues}
                                amountATValues={amountATValues}
                                userLevel={userLevel}
                                userType={userType}
                                entityFilter={entityFilter}
                                />} */}
                            {tBody}
                        </TBody>
                    </Table>
                    {tSpinner}
                    {/* <TablePagination setDensity={setDensity} columns={columns} setColumns={setColumns}
                        currentPage={currentPage} 
                        pageChange={handleChangePage} 
                        totalElement={count} 
                        perPage={pageSize}
                        perPageChange={setInvoicePageSize}
                    /> */}
				    <AttachmentModal show={attachmentModalShow} modalClosed={() => setAttachmentModalShow(false)} invoice={selectedInvoice}></AttachmentModal>            
                    </LITableContainer>
            <ToInvoicesLink  style={{textAlign: "start"}}
                to={{
                    pathname: keyPath?keyPath:"/clientInvoices"
                }}
                >
                {"> Toutes les factures"}
            </ToInvoicesLink>
        </LIContainer>
    )
}
const mapStateToProps = (state) => ({
    isAuth : state.auth.token !== null,
    token: state.auth.token,
    loading: state.invoiceHomeClients.loading,
    invoicesData : state.invoiceHomeClients.data,
    count: state.invoiceHomeClients.count,
    currentPage: state.invoiceHomeClients.currentPage,
    pageSize: state.invoiceHomeClients.pageSize,
    filtersQuery: state.invoiceHomeClients.filtersQuery,
    quickFilter: state.invoiceHomeClients.quickFilter,
    filtering: state.invoiceHomeClients.filtering,
    sortQuery: state.invoiceHomeClients.sortQuery,
    reverse: state.invoiceHomeClients.reverse,
    showFilters: state.invoiceHomeClients.showFilters,
    selectedRows: state.invoiceHomeClients.selectedRows,
    selectedAllRows: state.invoiceHomeClients.selectedAllRows,
    userLevel : state.auth.userLevel,
    userType : state.auth.userType,
    amountBTTotal: state.invoiceHomeClients.amountBTTotal,
    amountATTotal: state.invoiceHomeClients.amountATTotal,
    amountBTValues: state.invoiceHomeClients.amountBTValues,
    amountATValues: state.invoiceHomeClients.amountATValues
})
const mapDispatchToProps = dispatch => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    getInvoicesPage: (page, filters, sort, reverse, pageSize) => dispatch(actions.invoiceGetPageClient(page, filters, sort, reverse, pageSize)),
    setInvoicePage: (page) => dispatch(actions.invoiceSetPageClient(page)),
    setInvoicePageSize: (pageSize) => dispatch(actions.invoiceSetPageSizeClient(pageSize)),
    setInvoiceFilters: (filters) => dispatch(actions.invoiceSetFiltersQueryClient(filters)),
    setInvoiceQuickFilter: (quickFilterField) => dispatch(actions.invoiceSetQuickFilterClient(quickFilterField)),
    setSortQuery: (sortQ) => dispatch(actions.invoiceSetSortQueryClient(sortQ)),
    setReverse: (reverseS) => dispatch(actions.invoiceSetReverseSortClient(reverseS)),
    updateShowFilters: (show) => dispatch(actions.invoiceUpdateShowFiltersClient(show)),
    getDocumentFile: (uid) => dispatch(actions.invoiceGetDocumentFileClient(uid)),
    setSelectedRows: (rowId, selceted) => dispatch(actions.invoiceSelectRowClient(rowId, selceted)),
    setSelectedAllRows: (selectedAll) => dispatch(actions.invoiceSelectAllRowsClient(selectedAll)),
    getCompressedDoc : (selection) => dispatch(actions.invoiceGetCompressedDocumentClient(selection))
})
export default connect(mapStateToProps, mapDispatchToProps) (LastInvoicesClient)


  
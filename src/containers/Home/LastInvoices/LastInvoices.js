import React, { useCallback, useEffect, useState } from 'react';
import Axios from '../../../axios-proas';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
// import { Spinner } from 'react-bootstrap';
import * as actions from '../../../store/actions/index';
import TableBody from '../../../components/Home/InvoiceTable/TableBody/TableBody';
import TableActions from '../../../components/Home/InvoiceTable/TableActions/TableActions';
import TableHead from '../../../components/Home/InvoiceTable/TableHead/TableHead';
import TableFilters from '../../../components/Home/InvoiceTable/TableFilters/TableFilters';
import TablePagination from '../../../components/UI/TablePagination/TablePagination';
import AttachmentModal from '../../../components/Home/InvoiceTable/TableBody/AttachmentModal/AttachmentModal';
import { useTranslation } from 'react-i18next';
import { getNotyfObject } from '../../../shared/utility';
import {LIContainer, LIHeader, LITitle, LIActions, LITableContainer} from './LastInvoices.styled'
import {Table, TBody, ToInvoicesLink} from '../../../styles/Table.styled'
import _ from 'lodash';

function LastInvoices(props) {
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
        status,
        NoshowTitel
    } = props;
    const [attachmentModalShow, setAttachmentModalShow] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    let notyf = getNotyfObject();

    const {t} = useTranslation();

    const initialFiltersQuerry = {
        visualisation: false,
        supplierLastInvoice: true,
        entityFilter
    }
    const[density,setDensity]=useState("2.25rem")
    const[columns,setColumns]=useState([])
    useEffect(() => {
        const columnsCopy = [];
            columnsCopy.push({title: t("logs:type"), field: 'type', width: "110px" , show:true, alignSelf:"left"});
            columnsCopy.push({title: t("invoiceList:number"), field: 'number', width: "110px", show:true, alignSelf:"center"});
        if (entityFilter === "supplier")
            columnsCopy.push({title: "Pièce jointe", field: 'attachmentFile', width: "110px", show:true, alignSelf:"left"});
        else if (entityFilter === "client")
            columnsCopy.push({title: t("invoiceList:readStatus"), field: 'firstAccessDate', width: "50px", show:true, alignSelf:"center"});
            columnsCopy.push({title: t("invoiceList:creationDate"), field: 'issuingDate', width:"150px", show:true, alignSelf:"center"});
            columnsCopy.push({title: t("invoiceList:dueDate"), field: 'dueDate', width: "140px", show:true, alignSelf:"center"});
        if(userType === "client")
             columnsCopy.push({title: t("invoiceList:issuingSupplier"), field: 'supplierName', width: "210px", show:true, alignSelf:"left"});
        else if(userType === "supplier")
            columnsCopy.push({title: t("clientList:entity", "Entité"), field: 'clientName', width: "170px", show:true, alignSelf:"left"});
        else {
            columnsCopy.push({title: t("invoiceList:supplier"), field: 'supplierName', width: "150px", show:true, alignSelf:"left"});
            columnsCopy.push({title: "Entité", field: 'clientName', width: "140px", show:true, alignSelf:"left"});
        }
        {!("TO_BE_VALIDATED,TO_BE_CONTROLLED".includes(status))&&
            columnsCopy.push({title: t("invoiceList:status"), field: 'status', width: "110px", show:true, alignSelf:"center"});}
        
            columnsCopy.push({title: "Canal", field: 'channel', width: "100px", show:true, alignSelf:"center"});
            columnsCopy.push({title: t("invoiceList:exclusiveAmount"), field: 'exclusiveTaxAmount', width: "110px", show:true, alignSelf:"right"});        
            columnsCopy.push({title: t("invoiceList:inclusiveAmount"), field: 'inclusiveTaxAmount', width: "110px", show:true, alignSelf:"right"});
            columnsCopy.push({title: t("invoiceList:currency"), field: 'currency', width: "75px", show:true, alignSelf:"right"});
            {userType === "owner"&& status=="TO_BE_CONTROLLED" &&columnsCopy.push({title: t("invoiceList:command"), field: 'command', width: "145px", show:true, alignSelf:"right"});}
        setColumns(columnsCopy);
    }, [entityFilter,status])
    const getNewMessages = () => {
        Axios.get('/invoice//checkNewMessages', {
            params: {
              entityFilter: entityFilter
            }
          }).then(response => {
            // setNewMessages(response.data.length);
        }).catch(err => {
        })
    }
//     useEffect(() => {
//     setInvoicePageSize(20)
//     return () => {
//         setInvoicePageSize(100)
//     }
// }, [])
    useEffect(() => {
        let newFilters = {
            ...initialFiltersQuerry
        }
        updateShowFilters(false)
        setInvoiceFilters(newFilters)
        getInvoicesPage(currentPage, newFilters, "clientName", {clientName: false}, 20);
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
    }, [filtersQuery, reverse, sortQuery]);

    const handleSort = useCallback((sort,newReverse) => {
        getInvoicesPage(currentPage, filtersQuery, sort, newReverse, pageSize)
    }, [currentPage,filtersQuery, sortQuery, reverse])

    const handleApplyFiltering = useCallback((filters) => {
        getInvoicesPage(1,filters, sortQuery, reverse, pageSize);
    }, [currentPage, filtersQuery, reverse, sortQuery]);

    const handleUpdateViewed = useCallback ((e, id) => {
        if(userType && userType === "client"){
            Axios.put("/invoice/"+id+"/firstAccessDate",{
                firstAccessDate: new Date().getTime()
            }).then(response => getInvoicesPage(currentPage, filtersQuery, sortQuery, reverse, pageSize))
                .catch(err => console.error(err))
        }
    }, [])


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


    let tBody = null;
    let tSpinner = loading ? (
        <div className="invoiceTable__spinner">
            <Spinner />
        </div>
        ) : <h2 style={{textAlign: 'center', fontSize:"1rem",color:"#809FB8",padding:"0px 0px 0px 48px"}}>{t("invoiceList:noInvoices")}</h2>
            

    if(!loading && invoicesData?.length > 0){
        tSpinner = null;
        tBody = (
            <TableBody 
            invoiceCheckBox={invoiceCheckBox}
                lastInvoice={true}
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
        <>
        <LIContainer>
           
            <LIHeader>
            {!NoshowTitel&&
                <LITitle>Dernières factures {entityFilter === 'supplier' ? 'fournisseurs' : 'clients'} </LITitle>
            }
                {/* <LIActions>
                    <TableActions
                        lastInvoice={true}
                        columns={columns}  
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
                        lastInvoice={true}
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
                    <TBody height={"2.25rem"}>
                        {/* {showFilters && <TableFilters
                            lastInvoice={true}
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
                {/* <TablePagination setDensity={setDensity} columns={columns} setColumns={setColumns}
                    currentPage={currentPage} 
                    pageChange={handleChangePage} 
                    totalElement={count} 
                    perPage={pageSize}
                    perPageChange={setInvoicePageSize}
                /> */}
                {tSpinner}
				<AttachmentModal show={attachmentModalShow} modalClosed={() => setAttachmentModalShow(false)} invoice={selectedInvoice}></AttachmentModal>  
            </LITableContainer>


            <ToInvoicesLink style={{textAlign: "start"}}
                to={{
                    pathname:keyPath?keyPath: "/fournisseurInvoices"
                }}
                >
                {"> Toutes les factures"}

            </ToInvoicesLink>
        </LIContainer>
        </>
    )
}
const mapStateToProps = (state) => ({
    isAuth : state.auth.token !== null,
    token: state.auth.token,
    loading: state.invoice.loading,
    invoicesData : state.invoice.data,
    count: state.invoice.count,
    currentPage: state.invoice.currentPage,
    pageSize: state.invoice.pageSize,
    filtersQuery: state.invoice.filtersQuery,
    quickFilter: state.invoice.quickFilter,
    filtering: state.invoice.filtering,
    sortQuery: state.invoice.sortQuery,
    reverse: state.invoice.reverse,
    showFilters: state.invoice.showFilters,
    selectedRows: state.invoice.selectedRows,
    selectedAllRows: state.invoice.selectedAllRows,
    userLevel : state.auth.userLevel,
    userType : state.auth.userType,
    amountBTTotal: state.invoice.amountBTTotal,
    amountATTotal: state.invoice.amountATTotal,
    amountBTValues: state.invoice.amountBTValues,
    amountATValues: state.invoice.amountATValues
})
const mapDispatchToProps = dispatch => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    getInvoicesPage: (page, filters, sort, reverse, pageSize) => dispatch(actions.invoiceGetPage(page, filters, sort, reverse, pageSize)),
    setInvoicePage: (page) => dispatch(actions.invoiceSetPage(page)),
    setInvoicePageSize: (pageSize) => dispatch(actions.invoiceSetPageSize(pageSize)),
    setInvoiceFilters: (filters) => dispatch(actions.invoiceSetFiltersQuery(filters)),
    setInvoiceQuickFilter: (quickFilterField) => dispatch(actions.invoiceSetQuickFilter(quickFilterField)),
    setSortQuery: (sortQ) => dispatch(actions.invoiceSetSortQuery(sortQ)),
    setReverse: (reverseS) => dispatch(actions.invoiceSetReverseSort(reverseS)),
    updateShowFilters: (show) => dispatch(actions.invoiceUpdateShowFilters(show)),
    getDocumentFile: (uid) => dispatch(actions.invoiceGetDocumentFile(uid)),
    setSelectedRows: (rowId, selceted) => dispatch(actions.invoiceSelectRow(rowId, selceted)),
    setSelectedAllRows: (selectedAll) => dispatch(actions.invoiceSelectAllRows(selectedAll)),
    getCompressedDoc : (selection) => dispatch(actions.invoiceGetCompressedDocument(selection))
})
export default connect(mapStateToProps, mapDispatchToProps) (LastInvoices)

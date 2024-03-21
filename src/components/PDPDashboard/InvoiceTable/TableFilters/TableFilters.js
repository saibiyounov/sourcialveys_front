import React, { useCallback, useRef, useState } from 'react'
import Axios from '../../../../axios-proas'
import { useTranslation } from 'react-i18next';
import { TD, FilterContainer, SelectFilter, Option, InputFilter } from '../../../../styles/Table.styled'
import DateFilter from '../../../UI/DateFilter/DateFilter';
import AmountFilter from '../../../UI/AmountFilter/AmountFilter';
import {showColumn} from '../../../../shared/utility'

function TableFilters(props) {
    const { filters, filtersChange, applyFilters,userType, userLevel, amountBTTotal, amountATTotal, amountBTValues, userRole, entityFilter,columns, lastInvoice} = props;
    const {t} = useTranslation();
    
    
    const formatDate = useCallback((date) => {
        if (date !== null && date.valueOf() > 0){
            let newDate = new Date(date);
            let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()
            let month = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)
        return day + '/' + month + '/' + newDate.getFullYear()
        }else return null;    
    }, [])

    const getAmountBT = (field) => {
        if(filters?.exclusiveTaxAmount){
            let amount = filters?.exclusiveTaxAmount.split(":");
            if (field === "start")
                return amount[0]
            else return amount[1]
        }else{
            return '';
        }   
    }
    const [show, setShow] = useState(null)
    const [rangeShow, setRangeShow] = useState(false);
    const [rangeBTShow, setRangeBTShow] = useState(false);
    const [dateField, setDateField] = useState('')
    
    const [amountBT, setAmountBT] = useState(null)
    const [amountAT, setAmountAT] = useState(null)

    const rangeBTModalHandler = () =>{
        setRangeBTShow(true);
        getAmountBTValues();
    }
    const getAmountBTValues = () => {
        Axios.get("invoice//amountBTValues",{
            params: {visualisation : filters.visualisation}
        }).then(response => {
            setAmountBT({
                start: +response.data.minAmountBT,
                end: +response.data.maxAmountBT
            })
        })
    }

    const rangeATModalHandler = () =>{
        setRangeShow(true);
        getAmountATValues();
    }
    const getAmountATValues = () => {
         Axios.get("invoice//amountATValues",{
           params: {visualisation : filters.visualisation}
       }).then(response => {
             setAmountAT({
               start: +response.data.minAmountAT,
                end: +response.data.maxAmountAT
          })
       })
    }
    
    const closeModalHandler = () => {
        setShow(false);
    }
    const dateShowHandler = (field) => {
        setShow({
            [field]: true
        })
        setDateField(field);
    }
    const convertDate = (date) => {
        let dateArray = date.split(':');
        return [formatDate(+dateArray[0]) , formatDate(+dateArray[1])]
    }

    let [dateInputValue,setDateInputValue] = useState({
        creationDate: filters?.creationDate ? convertDate(filters.creationDate) : '',
        dueDate: filters?.dueDate ? convertDate(filters.dueDate) : ''
    });

    const getCreationdate = () => {
        return filters?.creationDate ? convertDate(filters.creationDate) : [];
    }

    const getDueDate = () => {
        return filters?.dueDate ? convertDate(filters.dueDate) : [];
    }
    const dateChangeHandler = (date) => {
        setDateInputValue({
            ...dateInputValue,
            [dateField]: formatDate(date.startDate) + '-' + formatDate(date.endDate)
        })
        let key = date.field;
        let newFilters = {
            ...filters,
            [key]: date.startDate.getTime() + ':' + date.endDate.getTime()
        }
        filtersChange(newFilters)
        //applyFilters(newFilters);
    }

    const dateResetHandler = (field) => {
        setDateInputValue({
            ...dateInputValue,
            [field]: ''
        })
        let newFilters = {
            ...filters,
            [field]: null
        }
        filtersChange(newFilters)
        //applyFilters(newFilters);
    }

    const closeAmountModal = () => {
        setRangeShow(false);
    }

    const closeAmountBTModal = () => {
        setRangeBTShow(false);
    }


    const getAmountAT = (field) => {
        if(filters?.inclusiveTaxAmount){
            let amount = filters?.inclusiveTaxAmount.split(":");
            if (field === "start")
                return amount[0]
            else return amount[1]
        }else{
            return '';
        }   
    }
    
    const amountAtChanged = (startval, endval) => {
        setAmountAT({
            start: startval,
            end: endval
        })
        let newFilters = {
            ...filters,
            inclusiveTaxAmount: startval + ':' + endval
        };
        filtersChange(newFilters);
        //applyFilters(newFilters);
    }

    const amountATReset = () => {
        let newFilters = {
            ...filters,
            inclusiveTaxAmount: null
        };
        filtersChange(newFilters);
        //applyFilters(newFilters);
    }

    const amountBtChanged = (startval, endval) => {
        setAmountBT({
            start: startval,
            end: endval
        })
        let newFilters = {
            ...filters,
            exclusiveTaxAmount: startval + ':' + endval
        };
        filtersChange(newFilters);
        //applyFilters(newFilters);
    }

    const amountBTReset = () => {
        let newFilters = {
            ...filters,
            exclusiveTaxAmount: null
        };
        filtersChange(newFilters);
        //applyFilters(newFilters);
    }  

    const inputChangeHandler = (e) => {
        let key = e.target.name;
        let newFilters = {
            ...filters,
            [key]: e.target.value
        }
        filtersChange(newFilters);
        //applyFilters(newFilters);
    }

    return (
        <>
            {
            <tr>
                {
                    lastInvoice === undefined &&
                        <TD></TD>
                }
                <TD style={{display: !showColumn(columns ,"type")&& 'none'}}>
                    <FilterContainer>
                    <SelectFilter 
                        onChange={(e) => inputChangeHandler(e)} 
                        value={filters?.documentType || ''} 
                        name="documentType" 
                        id="exampleFormControlSelect2"
                    >
                        <Option value=""></Option>
                        <Option value="INV">{t("invoiceList:invoice")}</Option>
                        <Option value="CRN">{t("invoiceList:creditNote")}</Option>
                    </SelectFilter>
                    </FilterContainer>
                </TD>
                {entityFilter === "client" &&
                 <TD style={{display: !showColumn(columns ,"firstAccessDate") && 'none'}}>
                    <FilterContainer>
                        <SelectFilter 
                            onChange={(e) => inputChangeHandler(e)} 
                            value={filters?.firstAccessDate || ''} 
                            name="firstAccessDate" 
                            >
                            <Option value=""></Option>
                            <Option value="0">Non </Option>
                            <Option value="1">Oui</Option>
                        </SelectFilter>
                        {/* <VisibilityIcon style={{color: ""}} />  */}
                    </FilterContainer>  
                </TD>}
                <TD style={{display: !showColumn(columns ,"number") && 'none'}}>
                    <FilterContainer>
                        <InputFilter 
                            placeholder={t("invoiceList:invoiceNumber", "Numéro")}
                            onChange={(e) => inputChangeHandler(e)} 
                            value={filters?.number || ''} 
                            name="number" 
                            type="text" 
                            autoComplete="off" />
                    </FilterContainer>
                </TD>       

                {entityFilter === "supplier" &&
                 <TD style={{display: !showColumn(columns ,"attachmentFile") && 'none'}}></TD>}
                <TD style={{display: !showColumn(columns ,"creationDate") && 'none'}} >
                    <FilterContainer>
                        <DateFilter
                            modalTitle={t("invoiceList:creationDate", "Date de Création")}
                            from={getCreationdate()[0] || ''}
                            to={getCreationdate()[1] || ''}
                            name="creationDate"
                            activeReset={filters?.creationDate ? true : false}
                            resetInterval={dateResetHandler}
                            show={show?.creationDate}
                            showModal={dateShowHandler}
                            closeModal={closeModalHandler}
                            dateChange={(date) =>dateChangeHandler(date)}
                        />
                    </FilterContainer>
                </TD>
                <TD style={{display: !showColumn(columns ,"dueDate")&& 'none'}}>
                    <FilterContainer>
                        <DateFilter
                            modalTitle={t("invoiceList:dueDate", "Date d'échéance")}
                            from={getDueDate()[0] || ''}
                            to={getDueDate()[1] || ''}
                            name="dueDate"
                            activeReset={filters?.dueDate ? true : false}
                            resetInterval={dateResetHandler}
                            show={show?.dueDate}
                            showModal={dateShowHandler}
                            closeModal={closeModalHandler}
                            dateChange={(date) =>dateChangeHandler(date)}
                        />
                    </FilterContainer>
                </TD>
                {
                    userType==='client' || userType==='owner' ? (
                        <TD style={{display: !showColumn(columns ,"supplierName") && 'none'}}>
                            <FilterContainer>
                                <InputFilter 
                                    placeholder={t("invoiceList:supplier", "Fournisseur")}
                                    onChange={(e) => inputChangeHandler(e)} 
                                    value={filters?.supplierName || ''} 
                                    name="supplierName" 
                                    type="text" 
                                    autoComplete="off" />
                            </FilterContainer>
                        </TD>
                    )
                    :null
                }
                { //clientName status channel 
                    userType==='supplier' || userType==='owner' ? (
                        <TD style={{display: !showColumn(columns ,"clientName") && 'none'}}>
                            <FilterContainer>
                                <InputFilter 
                                    placeholder={t("invoiceList:entity", "Entité")}
                                    onChange={(e) => inputChangeHandler(e)} 
                                    value={filters?.clientName || ''} 
                                    name="clientName" 
                                    type="text" 
                                    autoComplete="off" />
                            </FilterContainer>
                        </TD>
                    )
                    :null
                }
                <TD style={{display: !showColumn(columns ,"status") && 'none'}}>
                    <FilterContainer>
                    <SelectFilter 
                        onChange={(e) => inputChangeHandler(e)} 
                        value={filters?.status || ''} 
                        name="status" 
                        >
                        <Option value=""></Option>
                        <Option value="NEW">En cours</Option>
                        <Option value="TO_BE_PAID">À payer</Option>
                        <Option value="LITIGATION">Litige</Option>
                        <Option value="PAID">Payée</Option>
                        
                    </SelectFilter>
                    </FilterContainer>
                </TD>
                {entityFilter === "supplier" && 
                <TD style={{display: !showColumn(columns ,"channel")&& 'none'}}>
                    <FilterContainer>
                    <SelectFilter 
                        onChange={(e) => inputChangeHandler(e)} 
                        value={filters?.channel || ''} 
                        name="channel" 
                    >
                        <Option value=""></Option>
                        <Option value="EDI">EDI</Option>
                        <Option value="PAPER">Papier</Option>
                        <Option value="EMAIL">Mail</Option>
                        <Option value="PORTAL">Portail</Option>
                    </SelectFilter>
                    </FilterContainer>
                </TD>}
                <TD style={{display: !showColumn(columns ,"exclusiveTaxAmount") && 'none'}}>  
                    <FilterContainer>
                        <AmountFilter
                            modalTitle={t('tableHead:exclusiveTaxAmount',"Montant HT" ) } 
                            from={getAmountBT("start") || ''}
                            to={getAmountBT("end") || ''}
                            total={amountBTTotal}
                            name="exclusiveTaxAmount"
                            activeReset={filters?.exclusiveTaxAmount ? true : false} 
                            resetInterval={amountBTReset}
                            defaultVal={amountBT}
                            defaultValStart={+getAmountBT("start") || amountBT?.start} 
                            defaultValEnd={+getAmountBT("end") || amountBT?.end}  
                            defaultUpdateVal={amountBTValues} 
                            value={getAmountBT}
                            show={rangeBTShow}  
                            showModal={rangeBTModalHandler} 
                            closeModal={closeAmountBTModal} 
                            amountChanged={amountBtChanged}
                        />
                    </FilterContainer>  
                </TD>
                <TD style={{display: !showColumn(columns ,"inclusiveTaxAmount") && 'none'}}>
                    <FilterContainer>
                        <AmountFilter
                            modalTitle={t('tableHead:inclusiveTaxAmount',"Montant TTC" ) } 
                            from={getAmountAT("start") || ''}
                            to={getAmountAT("end") || ''}
                            total={amountATTotal}
                            name="inclusiveTaxAmount"
                            activeReset={filters?.inclusiveTaxAmount ? true : false} 
                            resetInterval={amountATReset}
                            defaultVal={amountAT} 
                            defaultValStart={+getAmountAT("start") || amountAT?.start} 
                            defaultValEnd={+getAmountAT("end") || amountAT?.end}   
                            defaultUpdateVal={amountBTValues} 
                            value={getAmountAT}
                            show={rangeShow}  
                            showModal={rangeATModalHandler} 
                            closeModal={closeAmountModal} 
                            amountChanged={amountAtChanged}
                        />
                    </FilterContainer>
                </TD>
                <TD style={{display: !showColumn(columns ,"currency") && 'none'}}>
                    <FilterContainer>
                    <SelectFilter 
                        onChange={(e) => inputChangeHandler(e)} 
                        value={filters?.currency || ''} 
                        name="currency" 
                        >
                        <Option value=""></Option>
                        <Option value="EUR">EUR</Option>
                        <Option value="$US">$US</Option>
                    </SelectFilter>
                    </FilterContainer>
                </TD>
                <TD></TD>
            </tr>}
        </>
    )
}

export default TableFilters

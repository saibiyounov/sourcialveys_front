import React, { useCallback, useRef, useState } from 'react'
import Axios from '../../../../axios-proas';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ArchiveIcon from '@mui/icons-material/Archive';
import ReplayIcon from '@mui/icons-material/Replay';
import { CSVLink } from "react-csv";
import { useTranslation } from 'react-i18next';
import { getNotyfObject, getStatusWithKey } from '../../../../shared/utility';
import { TableAction, TAContainer } from '../../../../styles/Table.styled';


function TableActions(props) {
    const {showFilters, filterState, resetData, getCompressedDoc, selectedRows, formatDate, filters, sortQuery, reverse, userType, entityFilter} = props;
    const {t} = useTranslation();
    const [csvData, setCsvData] = useState();
    const csvBtn = useRef();
    let notyf = getNotyfObject();

    const csvHeaders = [
        {label: t("invoiceList:dueDate"), key: "dueDate"},
        {label: t("invoiceList:creationDate"), key: "creationDate"},
        {label: t("invoiceList:number"), key: "number"},
        {label: t("invoiceList:supplier"), key: "supplierName"},
        {label: t("invoiceList:clientName", "Client"), key: "clientName"},
        entityFilter === "supplier" ? {label: "Canal", key: "channel"} : undefined,
        {label: t("invoiceList:status"), key: "status"},
        {label: t("invoiceList:exclusiveAmount"), key: "exclusiveTaxAmount"},
        {label: t("invoiceList:inclusiveAmount"), key: "inclusiveTaxAmount"},
        {label: t("invoiceList:currency"), key: "currency"}
    ];

    const exportSelectionZip = (selectedRows) => {
        let selectedIds = [];
        for (const key in selectedRows) {
            
            if (selectedRows[key])
                selectedIds.push(key) 
        }
        getCompressedDoc(selectedIds)
    }
    const exportCsv = useCallback((selectedRows, filters) => {
        const selectedIds = [];
        for (const key in selectedRows)
            if (selectedRows[key])
                selectedIds.push(key)
        
        const newFilters = {};
        if(filters)
            for (const key in filters)
                if(filters[key])
                    newFilters[key] = filters[key];
        
        if(sortQuery)
            newFilters.orderBy = sortQuery;
        
        if(reverse)
            newFilters.reverse = reverse[sortQuery];
        
        Axios.get('/invoice//csvCompressedDocument' + (selectedIds.length > 0 ? '?selection='+selectedIds : ""), {params: newFilters})
        .then((response) => {
            // console.log(response.data.content);
            const csvDataTemp = response.data.content.map(row => {
                    return {
                        ...row,
                        issuingDate: formatDate(+row.issuingDate),
                        creationDate: formatDate(+row.creationDate),
                        status : getStatusWithKey(row?.status),
                        dueDate: formatDate(+row.dueDate),
                        readStatus: row.firstAccessDate !== null ? t("global:yes") : t("global:no")
                    } 
                })
                setCsvData(csvDataTemp);
                csvBtn.current.link.click();
        }).catch(err => notyf.error("Une erreur s'est produite"))
    },[selectedRows, filters])

    const showExportZip = (selectedRows) => {
        for (const key in selectedRows) {
            if (selectedRows[key])
                return true
        }
        return false
    }

    return (
        <TAContainer>
            <TableAction active={filterState} onClick={() => showFilters()} >
                <span>{t("global:filters")}</span>
                <FilterListIcon   />
            </TableAction>

            {
                showExportZip(selectedRows) ? (
                    <TableAction onClick={() => exportCsv(selectedRows, filters)} >
                        <span>{t("global:exportCsv", "Exporter Csv")}</span>
                        <ImportExportIcon className="ICDBlue"/>
                    </TableAction>
                ) : null
            }
            {
                showExportZip(selectedRows) ? (
                    <TableAction onClick={() => exportSelectionZip(selectedRows)} >
                        <span>{t("invoiceList:zipExport")}</span>
                        <ArchiveIcon />
                    </TableAction>
                ) : null
            }
            {csvData ? (<CSVLink
                ref={csvBtn}
                data={csvData}
                filename={"documentsCsv.csv"}
                headers={csvHeaders}
                separator={";"}>
            </CSVLink>) : null}
        </TAContainer>
    )
}

export default TableActions

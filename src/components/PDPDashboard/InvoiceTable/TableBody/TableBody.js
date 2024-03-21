import React, { Fragment, useState } from 'react'
import DraftsIcon from '@mui/icons-material/Drafts';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import { useTranslation } from 'react-i18next';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import pdfIcon from '../../../../assets/images/pdf.png';
import xmlIcon from '../../../../assets/images/xml.png';
import Axios from '../../../../axios-proas'
import { Link} from 'react-router-dom';
import { CTooltip } from '../../../UI/CTooltip/CTooltip'
import StatusReasonModal from './StatusReasonModal/StatusReasonModal';
import { getNotyfObject, getStatusWithKey, getChannelWithKey,showColumn, getAlignPosition, getStatusBgColor, owner_invoiceStatus } from '../../../../shared/utility';
import TextsmsIcon from '@mui/icons-material/Textsms';
import {TD, InvoiceLink, SelectStatus, StatusOption} from '../../../../styles/Table.styled'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
function TableBody(props) {
    const {data, formatDate, setViewed, selectedRows, setSelectedRows, userType, userLevel, getDocumentFile,editStatus, disableStatus, entityFilter,columns, lastInvoice,getinvoiceGetDocumentXml,getinvoiceGetDocumentEdi,getinvoiceGetDocumentChorus} = props;

    const {t} = useTranslation();
    let notyf = getNotyfObject();
    const [showStatusReasonModal, setShowStatusReasonModal] = useState(false)
    const [invoiceToEdit, setInvoiceToEdit] = useState(null);

    const formatNumber = (number) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number).replaceAll('.',' ')
    }

    const getSelectedRowValue = (id) => {
        if (selectedRows) {
            return selectedRows[id] || false
        } else return false
    }

    const selectRowHandler = (e) => {
        let id = e.target.name;
        let val = e.target.checked;
        setSelectedRows(id, val)
    }

    const getTimeDate = (date) => {
        let newDate = new Date(date);
        let hour = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours()
        let minutes = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes()
        return hour + ":" + minutes
    }

    const clickedHandler = (e, row) => {
        e.preventDefault()
   
            if (row.uid != null) {  
              Axios.get("invoice/" + row.uid + "/DownloadextractionByUid",{  
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
              })
                .then((response) => {
                    if(response.status === 200){
                        let blob = new Blob([response.data], { type: 'application/zip' })
                        const downloadUrl = URL.createObjectURL(blob)
                        let a = document.createElement("a");
                        a.href = downloadUrl;
                        a.download = "invoice(s).zip";
                        document.body.appendChild(a);
                        a.click();
                        
                    }else {
                        console.log("Archive vide ou non valide");
                        notyf.error("Une erreur s'est produite")
                    
                    }
                })
                .catch((response) => {
                    console.log("Une erreur s'est produite");
                    notyf.error("Une erreur s'est produite")
                 
                });
            }
        
        // if(row.docFile){
        //    getDocumentFile(row.uid)
        // }
        // if(row.xmlFile){
        //     getinvoiceGetDocumentXml(row.uid)
        // }
        // if(row.ediFile){
        //     getinvoiceGetDocumentEdi(row.uid)
        // }
        // if(row.chorusFile){
        //     getinvoiceGetDocumentChorus(row.uid)
        // }

    
    }

    const clickAttachmentHandler = (e, uid) => {
        e.preventDefault()
        Axios.get('/invoice/'+uid+'/attachmentFile', {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            if(response.status === 200){
                const blob = new Blob([response.data], { type: response.request.getResponseHeader("Content-Type") })
                let filename = "";
                const disposition = response.request.getResponseHeader('Content-Disposition')
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches !== null && matches[1])
                    filename = matches[1].replace(/['"]/g, '');
                }
                const downloadUrl = URL.createObjectURL(blob)
                const a = document.createElement("a"); 
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
            } else
                notyf.error("Pièce jointe non trouvée");
        }).catch(err => {
            notyf.error('Une erreur s\'est produite !')
        })
    }

    const inputChangeStatus=(status, invoiceUid)=>{
        if(status && !disableStatus){
            if(status === "LITIGATION"){
                setInvoiceToEdit(invoiceUid)
                setShowStatusReasonModal(true);
            } else 
                editStatus(invoiceUid, status)
         }
    }
   
    const markAsRead = ( invoiceUid, firstAccessDate = null) => {
        if(!firstAccessDate){
            Axios.put('/invoice/'+invoiceUid+'/setInvoiceAsViewed', 
                  {
            }).then(response => {
                notyf.success("Facture marquée comme lue")
            }).catch(err => {
                notyf.error("Une erreur s'est produite")
            })
        }
    }

    return (
        <>           
            {
                data.map(row => (
                    <tr key={row.id}>
                        {/* {
                            lastInvoice === undefined &&
                                <TD style={{textAlign:'center'}} >
                                    <input type="checkbox" name={row.uid} onChange={(e) => selectRowHandler(e)} checked={getSelectedRowValue(row.uid)}  className="form-check-input" style={{margin: 0}} id="exampleCheck1" />
                                </TD>
                        } */}
                        <TD style={{display: !showColumn(columns ,"type") && 'none', textAlign: getAlignPosition(columns, "type")}} >
                            {t("invoiceList:" + (row.documentType === "INV" ? "invoice" : (row.documentType === "CRN" ? "creditNote" : "")))}
                        </TD>
                        <TD style={{display: !showColumn(columns,"number") && 'none', textAlign: getAlignPosition(columns, "number")}}>
                            <InvoiceLink 
                                to={{
                                    pathname: "/invoiceDetail/"+row.uid,
                                    state: {
                                        entityFilter
                                    }
                                }}
                                status={getStatusBgColor(row?.status)}
                            >
                                <span>{row.number}</span>
                            </InvoiceLink> 
                        </TD>
                        {entityFilter === "client" ?
                         <TD style={{display: !showColumn(columns ,"firstAccessDate") && 'none', textAlign: getAlignPosition(columns, "firstAccessDate")}}>
                            {+row.firstAccessDate > 0 ? 
                                <CTooltip title={formatDate(+row.firstAccessDate)+" "+ getTimeDate(+row.firstAccessDate)} className="tableActions__icon" style={{color: '#022f67', fontSize: "20px"}}>
                                    <DraftsIcon className="tableActions__icon" style={{color: "#B8B8B8", fontSize: "20px"}}/>
                                </CTooltip> : 
                                <MarkunreadIcon className="tableActions__icon" style={{color: "#ffa618", fontSize: "20px"}} />} 
                        </TD> :
                        (entityFilter === "supplier" &&
                         <TD style={{display: !showColumn(columns,"attachmentFile") && 'none', textAlign: getAlignPosition(columns, "attachmentFile")}}>
                             {row.attachmentFile && <a download={row.attachmentFile} href="#" onClick={(e) => clickAttachmentHandler(e, row.uid)} style={{color: "#ea5e0b"}}>{row.attachmentFile}</a>}
                        </TD>)}
                        <TD style={{display: !showColumn(columns ,"creationDate")&& 'none', textAlign: getAlignPosition(columns, "creationDate")}}>{formatDate(+row.creationDate)}</TD>
                        <TD style={{display: !showColumn(columns ,"dueDate") && 'none', textAlign: getAlignPosition(columns, "dueDate")}}>{formatDate(+row.dueDate)}</TD>
                        {userType==='client' ? (
                            <TD style={{display: !showColumn(columns ,"supplierName") && 'none, textAlign: getAlignPosition(columns, "supplierName")'}} title={row.supplierName}>{row.supplierName}</TD>
                            ):null}
                        {userType==='supplier' ? (
                            <TD style={{display: !showColumn(columns ,"clientName") && 'none', textAlign: getAlignPosition(columns, "clientName")}}title={row.clientName}>{row.clientName}</TD>
                            ):null}
                        {userType==='owner' ? (
                            <Fragment>
                                <TD style={{display: !showColumn(columns ,"supplierName") && 'none', textAlign: getAlignPosition(columns, "supplierName")}}title={row.supplierName}>{row.supplierName}</TD>
                                <TD style={{display: !showColumn(columns ,"clientName") && 'none', textAlign: getAlignPosition(columns, "clientName")}} title={row.clientName}>{row.clientName}</TD>
                            </Fragment>
                            ):null}
                        <TD style={{display: !showColumn(columns ,"status") && 'none', textAlign: getAlignPosition(columns, "status")}} >
                            {userType === "supplier" ? getStatusWithKey(row?.status) :
                                // <SelectStatus 
                                //     value={row?.status} 
                                //     status={row?.status}
                                //     onChange={(e) => inputChangeStatus(e.target.value,row?.uid)}  
                                //     name="status"
                                //     disabled={disableStatus}
                                // >
                                //     <StatusOption value={row?.status} >{getStatusWithKey(row?.status)}</StatusOption>
                                //     {row?.status!=="NEW"&&       <StatusOption   value="NEW">En cours</StatusOption>}
                                //     {row?.status!=="TO_BE_PAID"&&<StatusOption   value="TO_BE_PAID">À payer</StatusOption>}
                                //     {row?.status!=="LITIGATION"&&<StatusOption   value="LITIGATION">Litige</StatusOption>}
                                //     {row?.status!=="PAID"&&      <StatusOption  value="PAID">Payée</StatusOption>}  
                                <SelectStatus 
                                    value={ "IMPORTED, FILED, INTEGRATED, NEW, ERROR".includes(row?.status) ? "RECEIVED" : row?.status } 
                                    status={ getStatusBgColor(row?.status)}
                                    onChange={(e) => inputChangeStatus(e.target.value,row?.uid)}  
                                    name="status"
                                    // disabled={disableStatus}
                                >
                                    
                                    {/* <StatusOption value={row?.status}> {getStatusWithKey(row?.status, userType)} </StatusOption> */}
                                    {
                                       owner_invoiceStatus.map(state => {
                                            if(!"IMPORTED, FILED, INTEGRATED, NEW, ERROR".includes(state.name))
                                                return <StatusOption value={state.name}>{state.label}</StatusOption>
                                       })
                                    }                     
                                </SelectStatus>
                            }
                        </TD>
                        {entityFilter === "supplier" && <>
                            <TD style={{display: !showColumn(columns ,"channel")&& 'none', textAlign: getAlignPosition(columns, "channel")}} >{getChannelWithKey(row?.channel)}</TD>
                        </>}
                        
                        <TD style={{display: !showColumn(columns ,"exclusiveTaxAmount")&& 'none', textAlign: getAlignPosition(columns, "exclusiveTaxAmount")}}>{formatNumber(row.exclusiveTaxAmount)}</TD>
                        <TD style={{display: !showColumn(columns ,"inclusiveTaxAmount") && 'none', textAlign: getAlignPosition(columns, "inclusiveTaxAmount")}}>{formatNumber(row.inclusiveTaxAmount)}</TD>
                        <TD style={{display: !showColumn(columns ,"currency") && 'none', textAlign: getAlignPosition(columns, "currency")}}>{row.currency}</TD>
                        <TD>
                        <TD style={{display:"flex",alignSelf:"center",justifyContent:"center"}}>
                            <div style={{display:"flex",alignSelf:"center",justifyContent:"center"}} title="Télécharger">
                               {
                                    (row.docFile || row.xmlFile|| row.ediFile||row.chorusFile)  &&  
                                       <InsertDriveFileIcon onClick={(e) => clickedHandler(e, row)} style={{fontSize: "1.2rem", cursor: "pointer", color: "#2174B9"}} /> 
                                    }
                                 
                            </div>
                        </TD>
                            
                        </TD>
                    </tr>
                ))
                
            }
            {
                showStatusReasonModal && 
                    <StatusReasonModal
                        show={showStatusReasonModal}
                        handleClose={() => setShowStatusReasonModal(false)}
                        invoiceToEdit={invoiceToEdit}
                        editStatus={editStatus}
                    />
            }
        </>
    )
}
const mapStateToProps = (state) => ({
})
const mapDispatchToProps = dispatch => ({
 
    getDocumentFile: (uid) => dispatch(actions.invoiceGetDocumentFile(uid)),
    getinvoiceGetDocumentXml: (uid) => dispatch(actions.invoiceGetDocumentXml(uid)),
    getinvoiceGetDocumentEdi: (uid) => dispatch(actions.invoiceGetDocumentEdi(uid)),
    getinvoiceGetDocumentChorus:(uid)=>dispatch(actions.invoiceGetDocumentChorus(uid)),
})
export default connect(mapStateToProps, mapDispatchToProps) (TableBody)

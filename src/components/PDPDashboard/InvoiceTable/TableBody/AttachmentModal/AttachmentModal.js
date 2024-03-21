import React, { useState, useRef } from 'react'
import './AttachmentModal.css';
import Modal from '../../../../UI/Modal/Modal';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Axios from "../../../../../axios-proas";
import Download from '../Download/Download';
import {Notyf} from "notyf";
import { useTranslation } from 'react-i18next';

function AttachmentModal(props) {
    const {show, modalClosed, invoice} = props;
    const [newFile , setNewFile] = useState(null)
    const uploader = useRef(null);
    const notyf = new Notyf();
    const {t} = useTranslation();

    const handleFileChange = e => {
        if (e.target.files && e.target.files[0])
            setNewFile(e.target.files[0].name);
    }

    const confirmClickHandler = () => {
        const formData = new FormData();
        formData.append('file', uploader.current.files[0]);
        Axios.post("/invoice/"+invoice.uid+"/attachment", formData, {headers: { 'Content-Type': 'multipart/form-data' }}).then(response => {
            if (response.data.fileName) {
                invoice.attachmentFile = response.data.fileName;
                setNewFile(null);
                uploader.current.value = "";
                notyf.success(t("invoiceList:uploadSuccess"));
                modalClosed();
            }
        }).catch(err => {
            notyf.error(t("invoiceList:uploadFailed"));
            modalClosed();
        })
    }

    return (
        <div>
            <Modal show={show} modalClosed={modalClosed}>
                <div className="attachmentEditModal__title">
                   <h2>{t("invoiceList:fileEdit")}</h2> 
                </div>
                <div className="attachmentEditModal__body">
                    <div className="filterContainer">
                        {invoice && invoice.attachmentFile && <span>{t("invoiceList:currentFile")}<Download fileName={invoice.attachmentFile} uid={invoice.uid}></Download></span>}
                    </div> 
                    <div className="filterContainer">
                        <input type="file" className="form-control" onChange={(e) => handleFileChange(e)} name="file" ref={uploader} />
                        <AttachFileIcon style={{color: ""}}/>
                    </div> 
                </div>
                <div className="attachmentEditModal__footer">
                    <button className="cm__confirmBtn btn btn-primary" onClick={() => confirmClickHandler()} disabled={!newFile}>OK</button>
                    <button className="btn btn-light" onClick={modalClosed} >{t("global:cancel")}</button>
                </div>
            </Modal>   
        </div>
    )
}

export default AttachmentModal;

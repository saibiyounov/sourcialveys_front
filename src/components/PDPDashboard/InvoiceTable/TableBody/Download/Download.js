import React from 'react';
import Axios from "../../../../../axios-proas";
import { Notyf } from "notyf";
import { useTranslation } from 'react-i18next';

function Download(props) {
    const {fileName, uid} = props;
    const notyf = new Notyf();
    const {t} = useTranslation();

    const clickedHandler = (e) => {
        e.preventDefault()
        Axios.get("/invoice/"+uid+"/attachment").then(response => {
            const linkSource = 'data:application/octet-stream;base64,'+response.data.content;
            const link = document.createElement("a");
            link.href = linkSource;
            link.download = fileName;
            link.click();
        }).catch(err => notyf.error(t("invoiceList:cantDownload")))
    }

    return <a href="#" onClick={(e) => clickedHandler(e)}>{fileName}</a>;
}

export default Download

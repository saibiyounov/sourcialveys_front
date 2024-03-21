import React from 'react'
import * as actions from '../../../../../store/actions/index';
import { connect } from 'react-redux';

function RenderPdf(props) {
    const {number, uid, type,  docName, linkName, clicked, getDocumentFile} = props;

    const clickedHandler = (e,number,uid, type) => {
        e.preventDefault()
        if (clicked)
            clicked(e,number)
        getDocumentFile(uid, type)
    }

    return (
        <>
            <a download={docName} href="#" onClick={(e) => clickedHandler(e,number,uid, type)} style={{color: "#ea5e0b"}}>{linkName}</a>  
        </>
    )
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = dispatch => ({
    getDocumentFile: (uid) => dispatch(actions.invoiceGetDocumentFile(uid))
})
export default connect(mapStateToProps, mapDispatchToProps) (RenderPdf)

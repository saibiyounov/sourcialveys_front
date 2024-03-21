import React, { useCallback, useEffect, useState } from 'react'
import './StatusModal.css';
import Modal from '../../../../UI/Modal/Modal';
import ListIcon from '@mui/icons-material/List';

function StatusModal(props) {
    const {show, modalClosed, id, statusVal, editStatus} = props;
    const [statusValue, setStatusVal] = useState(statusVal)

    useEffect(() =>{
        setStatusVal(statusVal)
    }, [statusVal])
    const inputChangeHandler = (e) => {
        let value = e.target.value;
        setStatusVal(value)
        
    }

    const confirmClickHandler = () => {
        editStatus(id, statusValue);
    }
    
    return (
        <div>
            <Modal show={show} modalClosed={modalClosed}>
                <div className="statusEditModal__title">
                   <h2>Modification du Statut </h2> 
                </div>
                <div className="statusEditModal__body">
                    <div className="filterContainer">
                        <select className="form-control filter__select" onChange={(e) => inputChangeHandler(e)} value={statusValue || ''} name="status" id="exampleFormControlSelect2">
                            <option value=""></option>
                            <option value="NEW">À traiter</option>
                            <option value="TO_BE_PAID">À payer</option>
                            <option value="PAID">Payée</option> 
                            <option value="LITIGATION">Litige</option> 
                        </select>
                        <ListIcon style={{color: ""}}/>
                    </div> 
                </div>
                <div className="statusEditModal__footer">
                    <button className="cm__confirmBtn btn btn-primary" onClick={() => confirmClickHandler()}>OK</button>
                    <button className="btn btn-secondary" onClick={modalClosed} >Annuler</button>
                </div>
            </Modal>   
        </div>
    )
}

export default StatusModal;

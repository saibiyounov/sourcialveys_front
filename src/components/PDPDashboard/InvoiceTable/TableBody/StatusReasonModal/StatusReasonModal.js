import React, { useEffect, useState } from 'react'
import './StatusReasonModal.css'
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getNotyfObject } from '../../../../../shared/utility';
import { PrimaryBtnOutlineAction, SecondaryBtnOutlineAction, CancelBtnOutlineAction } from '../../../../../styles/Common';

function StatusReasonModal({handleClose, show,editStatus, invoiceToEdit}) {
    const {t} = useTranslation();
    const [agencies, setAgencies] = useState(null)
    const [statusReason, setStatusReason] = useState(null)
    const [error, setError] = useState(null)
    let notyf = getNotyfObject();

    useEffect(() => {
    }, [])

    const updateClickHandler = () => {
        if(statusReason){
            editStatus(invoiceToEdit, "LITIGATION", statusReason);
            handleClose()
        } else {
            setError("Veuillez choisir un motif")
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} contentClassName="modal_w_mc" >
                <Modal.Header closeButton>
                <Modal.Title className="ICDBlue">
                    {t('mandat:statusReasonModal_title', "Modification du statut de la facture")} 
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="ADMCreationModal__body">
                {/* <div className="alert alert-warning" role="alert">
                    <p>
                        {t('masterData:editCreatorWarning1', "ATTENTION : cet utilisateur est responsable des mandats qui ne sont pas encore signés.")}<br/>
                        {t('masterData:editCreatorWarning2', "Vous devez définir un nouveau responsable pour chaque mandataire.")}
                    </p>
                </div> */}
                    <div className="editCreatorModal__body__container">
                        <div className="editCreatorModal__header__container">
                            <h5 className="editCreatorModal__title__container">{t('default:reason', "Motif")}</h5>
                            {/* <button className="btn btn-danger btn-sm">Résilier tout</button> */}
                        </div>
                        <div className="editCreatorModal_possibleCreators_container">
                            {
                                error && (
                                    <div className="alert alert-danger" role="alert">
                                        <p>
                                            {error}
                                        </p>
                                    </div>)
                            }
                            <div className="editCreatorModal_possibleCreators_item"> 
                                <div className="possibleCreators_list_container">
                                    <select 
                                        className="form-control " 
                                        value={statusReason || ""} 
                                        onChange={(e) => setStatusReason(e.target.value)}
                                    >
                                        <option value="">
                                            Sélectionnez un motif
                                        </option>
                                        <option value="Numéro de commande incomplet">
                                            Numéro de commande incomplet
                                        </option>
                                        <option value="Ecart quantité">
                                            Ecart quantité
                                        </option>
                                        <option value="Article non référencé">
                                            Article non référencé
                                        </option>
                                        <option value="Montant erroné">
                                            Montant erroné
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <PrimaryBtnOutlineAction 
                    variant="primary" 
                    onClick={() => updateClickHandler()}
                    disabled={!statusReason}
                >
                    {t('masterData:update', "Modifier")}
                </PrimaryBtnOutlineAction>
                <CancelBtnOutlineAction variant="secondary" onClick={handleClose}>
                    {t('default:cancel', "Annuler")}
                </CancelBtnOutlineAction>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StatusReasonModal
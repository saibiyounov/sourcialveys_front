import React, { useCallback, useEffect, useState } from 'react'
import './CustomEventModal.css'
import SearchIcon from '@mui/icons-material/Search';
// import Axios from '../../../axios-proas'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
// import * as actions from '../../../store/actions/index';
import { useTranslation } from 'react-i18next';
import { PrimaryBtnOutlineAction, SecondaryBtnOutlineAction, CancelBtnOutlineAction } from '../../../../styles/Common';

function CustomEventModal({ handleClose, show }) {
    const [entities, setEntities] = useState([]);
    const [selectedEntities, setSelectedEntities] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null)
    const [allClients, setAllClients] = useState(false);
    const [allSuppliers, setAllSuppliers] = useState(false);
    const { t } = useTranslation();

    const [v1, setV1] = useState(true);
    const [v2, setV2] = useState(true);
    const [v3, setV3] = useState(true);

    // const getEntitiesList = useCallback(() => {
    //     let filter = {
    //         searchQuery: searchQuery,
    //         type: entitiesType
    //     }
    //     Axios.get('/client//modalEntities', {
    //         params: filter
    //     })
    //         .then(res => {
    //             setEntities(res.data?.result)
    //         })
    // }, [searchQuery, entitiesType])

    // useEffect(() => {
    //     getEntitiesList()
    // }, [searchQuery, entitiesType])


    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName="modal_w_mc" contentClassName="modal_w_mc" >
                <Modal.Header closeButton>
                    <Modal.Title className="repertoireTitle ICDBlue" style={{margin: "auto",}}>Personnalisation des évènements</Modal.Title>
                </Modal.Header>
                <Modal.Body className="repertoireModal__body" style={{padding: "17px 35px",width: "auto"}} >
                    <p style={{color: "#2174B9", marginBottom:"9px",fontSize: "1rem"}}>Evènements visibles</p>
                    
                        <div className="specLabel">
                            <div >
                                <input
                                    type="checkbox"
                                    onChange={(e) => setV1(!v1)}
                                    checked={v1}
                                    className="form-check-input checkBoxInput"
                                // value={}
                                />
                                <label >Intégration en erreur</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV2(!v2)}
                                    checked={v2}
                                // value={}
                                />
                                <label >Modification de référentiel complémentaire</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV3(!v3)}
                                    checked={v3}
                                // value={}
                                />
                                <label >Modification de l'annuaire PPF</label>
                            </div>
                        </div>


                </Modal.Body>
                <Modal.Footer>
                    <PrimaryBtnOutlineAction variant="primary" onClick={() => handleClose()}>
                        {t('default:associate', "Confirmer")}
                    </PrimaryBtnOutlineAction>
                    <CancelBtnOutlineAction variant="secondary" onClick={handleClose}>
                        {t('default:cancel', "Annuler")}
                    </CancelBtnOutlineAction>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default CustomEventModal

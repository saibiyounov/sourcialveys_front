import React, { useCallback, useEffect, useState } from 'react'
import './StatisticsModal.css'
import SearchIcon from '@mui/icons-material/Search';
import Axios from '../../../axios-proas'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { useTranslation } from 'react-i18next';
import { PrimaryBtnOutlineAction, SecondaryBtnOutlineAction, CancelBtnOutlineAction } from '../../../styles/Common';

function StatisticsModal({ handleClose, show }) {
    const [entities, setEntities] = useState([]);
    const [selectedEntities, setSelectedEntities] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null)
    const [allClients, setAllClients] = useState(false);
    const [allSuppliers, setAllSuppliers] = useState(false);
    const [v1, setV1] = useState(false);
    const [v2, setV2] = useState(false);
    const [v3, setV3] = useState(true);
    const [v4, setV4] = useState(true);
    const [v5, setV5] = useState(false);
    const [v6, setV6] = useState(false);
    const [v7, setV7] = useState(false);
    const [v8, setV8] = useState(true);
    const [v9, setV9] = useState(false);
    const [v10, setV10] = useState(false);
    const [v11, setV11] = useState(false);
    const [v12, setV12] = useState(false);
    const [v13, setV13] = useState(false);
    const [v14, setV14] = useState(false);
    const [v15, setV15] = useState(false);
    const [v16, setV16] = useState(false);
    const [v17, setV17] = useState(true);
    const [v18, setV18] = useState(false);
    const [v19, setV19] = useState(false);
    const [v20, setV20] = useState(false);
    const { t } = useTranslation();

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
                    <Modal.Title className="repertoireTitle ICDBlue" style={{margin: "auto",}}>Personnalisation des statistiques</Modal.Title>
                </Modal.Header>
                <Modal.Body className="repertoireModal__body" style={{padding: "17px 35px"}} >
                    <p style={{color: "#2174B9", marginBottom:"9px",fontSize: "1rem"}}>Mes KPI sélectionnés [4/4]</p>
                    
                    <div className="container_statistics">
                        <div className="specLabel" style={{width: "50%"}}>
                            <p style={{color: "#809FB8",fontSize: "1rem"}}>KPI comptabilité fournisseurs</p>
                            <div >
                                <input
                                    type="checkbox"
                                    onChange={(e) => setV1(!v1)}
                                    checked={v1}
                                    className="form-check-input checkBoxInput"
                                // value={}
                                />
                                <label >Factures hors délai</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV2(!v2)}
                                    checked={v2}
                                // value={}
                                />
                                <label >Factures rejetées</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV3(!v3)}
                                    checked={v3}
                                // value={}
                                />
                                <label >Factures à payer</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV4(!v4)}
                                    checked={v4}
                                // value={}
                                />
                                <label >Factures en litige</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV4(!v4)}
                                    checked={v4}
                                // value={}
                                />
                                <label >Factures en validation</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV5(!v5)}
                                    checked={v5}
                                // value={}
                                />
                                <label >Somme à payer</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV6(!v6)}
                                    checked={v6}
                                // value={}
                                />
                                <label >Somme en litige</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV7(!v7)}
                                    checked={v7}
                                // value={}
                                />
                                <label >Somme hors délai</label>
                            </div>
                        </div>

                        <div className="specLabel" style={{width: "50%"}}>
                            <p style={{color: "#809FB8",fontSize: "1rem"}}>KPI comptabilité clients</p>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV8(!v8)}
                                    checked={v8}
                                // value={}
                                />
                                <label >Factures à régler</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV9(!v9)}
                                    checked={v9}
                                // value={}
                                />
                                <label >Factures émises</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV10(!v10)}
                                    checked={v10}
                                // value={}
                                />
                                <label >Factures en litige</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV11(!v11)}
                                    checked={v11}
                                // value={}
                                />
                                <label >Factures hors délai</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV12(!v12)}
                                    checked={v12}
                                // value={}
                                />
                                <label >Somme des créances</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV13(!v13)}
                                    checked={v13}
                                // value={}
                                />
                                <label >Somme en litige</label>
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    className="form-check-input checkBoxInput"
                                    onChange={(e) => setV14(!v14)}
                                    checked={v14}
                                // value={}
                                />
                                <label >Somme hors délai</label>
                            </div>
                            {/* <div className="d-flex justify-content-between align-items-center">
                                <p className="productsModal_totalItems">{selectedEntities?.length} entreprise(s) séléctionnée(s)</p>
                                <div >
                                    <input className="form-check-input" type="checkbox" value="" id="selectAllRegies" onChange={(e) => selectAllEntities(e)} />
                                    <label className="form-check-label" for="selectAllRegies" >
                                        Selectionner tout
                                    </label>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="specLabel">
                        <p style={{color: "#2174B9",fontSize: "1rem"}}>Ma statistique par défaut</p>
                        <div >
                            <input
                                type="checkbox"
                                className="form-check-input checkBoxInput"
                                onChange={(e) => setV15(!v15)}
                                checked={v15}
                            // value={}
                            />
                            <label >Analyse des canaux de réception</label>
                        </div>
                        <div >
                            <input
                                type="checkbox"
                                className="form-check-input checkBoxInput"
                                onChange={(e) => setV16(!v16)}
                                checked={v16}
                            // value={}
                            />
                            <label >Analyse des délais de réception factures</label>
                        </div>
                        <div >
                            <input
                                type="checkbox"
                                className="form-check-input checkBoxInput"
                                onChange={(e) => setV17(!v17)}
                                checked={v17}
                            // value={}
                            />
                            <label >Analyse des provisions à date</label>
                        </div>
                        <div >
                            <input
                                type="checkbox"
                                className="form-check-input checkBoxInput"
                                onChange={(e) => setV18(!v18)}
                                checked={v18}
                            // value={}
                            />
                            <label >Analyse des risques aux paiements</label>
                        </div>
                        <div >
                            <input
                                type="checkbox"
                                className="form-check-input checkBoxInput"
                                onChange={(e) => setV19(!v19)}
                                checked={v19}
                            // value={}
                            />
                            <label >Analyse du taux d'extraction</label>
                        </div>
                        <div >
                            <input
                                type="checkbox"
                                className="form-check-input checkBoxInput"
                                onChange={(e) => setV20(!v20)}
                                checked={v20}
                            // value={}
                            />
                            <label >Analyse des typologies</label>
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


export default StatisticsModal

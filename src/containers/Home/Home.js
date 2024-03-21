

import React, { useEffect, useState } from 'react';
import Axios from '../../axios-proas'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { HomeContainer, HomeHeader, HeaderInfos, HeaderLocation, HeaderTitle, HeaderActions, HeaderAction,RowDivContainer, FirstDiv ,SecendDiv, SearchInputContainer, SearchInput, ActionWrapper, ActionLabel, HomeBody, HomeCards, HomeStats, ISNavContainer, HomeInvoices, NavTabsLi, NavTabsLink, NavTabsUl } from './Home.styled'
import Select from '../../components/UI/Select/Select';
import Card from '../../components/PDPDashboard/Card/Card';
import LineChart from '../../components/PDPDashboard/LineChart/LineChart';
import Events from './Events/Events';
import Tasks from './Events/Tasks';
// import LastInvoicesClient from './LastInvoicesClient/LastInvoicesClient';
// import LastInvoices from './LastInvoices/LastInvoices';
import { useTheme } from 'styled-components';
import { getNotyfObject } from '../../shared/utility'; 
import { formatDateEur } from '../../shared/utility'
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Home.css'
import StatisticsModal from './StatisticsModal/StatisticsModal'
import SortableList, { SortableItem } from "react-easy-sort";
import {arrayMoveImmutable} from 'array-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faDolly, faPersonRays, faUserGear } from '@fortawesome/free-solid-svg-icons'

function Home() {
    const theme = useTheme();
    const notyf = getNotyfObject()
    const [value, setValue] = useState('lastSevenDays');
    const [activeSuppliers, setActiveSuppliers] = useState(0);
    const [activeClients, setActiveClients] = useState(0);
    const [inProgressSuppliers, setInProgressSuppliers] = useState(0);
    const [notPaidInvoices, setNotPaidInvoices] = useState(0);
    const [litigationInvoices, setLitigationInvoices] = useState(0);
    const [showLastSupplpier, setShowLastSupplpier] = useState(false);   
    const [showLastClient, setShowLastClient] = useState(false);
    const [showStatisticsModal, setShowStatisticsModal] = useState(false);

    const defaultTime = new Date();
    defaultTime.setFullYear(defaultTime.getFullYear() - 1);
    const [startDate, setStartDate] = useState(formatDateEur(defaultTime.getTime()));
    const [endDate, setEndDate] = useState(formatDateEur(new Date().getTime()));
    const [eventData, setEventData] = useState();
const [invoicesInValidation,setInvoicesInValidation] = useState(0);
const [invoicesInToBePaid,setInvoicesInToBePaid] = useState(0);
const [arrayCards,setArrayCards]=useState(["Facture_a_payer", "Facture_en_litige", "Facture_en_validation","Factures_à_régler"])
    const options = [
        { label: 'Ces 7 derniers jours', value: 'lastSevenDays' },
        { label: 'Ce mois-ci', value: 'thisMonth' },
        { label: 'Mois précédent', value: 'lastMonth' },
    ];
const[tabSideActive,setTabSideActive] = useState("fournisseur");
    const eventsList = [
        { color: theme.colors.success, value: 'Fournisseur 1', date: '5 minuites' },
        { color: theme.colors.warning, value: 'Fournisseur 2', date: '5 minuites' },
        { color: theme.colors.success, value: 'Fournisseur 3', date: '5 minuites' },
        { color: theme.colors.warning, value: 'Fournisseur 4', date: '5 minuites' },
        { color: theme.colors.success, value: 'Campagne 1', date: '5 minuites' },
        { color: theme.colors.danger, value: 'Transdev', date: '5 minuites' },
        { color: theme.colors.success, value: 'Transdev', date: '5 minuites' },
    ]

    const interval = (date) => {

        return formatDateEur(date)
    }

    const selectChange = (value) => {
        const Landing = new Date();
        const dateNow = Landing.getTime();

        setValue(value);
        switch (value) {
            case "lastMonth":
                Landing.setFullYear(Landing.getFullYear() - 1);
                setStartDate(interval(Landing.getTime()))
                setEndDate(interval(dateNow))
                break;
            case "thisMonth":
                Landing.setDate(Landing.getDate() - 30);
                setStartDate(interval(Landing.getTime()))
                setEndDate(interval(dateNow))
                break;
            case "lastSevenDays":
                Landing.setDate(Landing.getDate() - 7);
                setStartDate(interval(Landing.getTime()))
                setEndDate(interval(dateNow))
                break;
            default:
                break;
        }

    }

    const getSuppliersCount = (status) => {
        Axios.get("/entity//suppliersCount", {
            params: {
                status: status,
                period: value,
                endDate: endDate,
                startDate: startDate
            }
        }).then(res => {
            if (res?.data?.suppliersCount) {
                switch (status) {
                    case 'active':
                        setActiveSuppliers(res.data.suppliersCount)
                        break;
                    case 'inProgress':
                        setInProgressSuppliers(res.data.suppliersCount)
                        break;
                    default:
                        break;
                }
            }
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        })
    }



    const getNotPaidInvoices = () => {
        Axios.get("/invoice//notPaidInvoices", {
            params: {
                period: value,
                endDate: endDate,
                startDate: startDate
            }
        }).then(res => {
            if (res?.data?.count) {
                setNotPaidInvoices(res.data.count)
            }
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        })
    }

    const getLitigationInvoices = () => {
        Axios.get("/invoice//litigationInvoices", {
            params: {
                period: value,
                endDate: endDate,
                startDate: startDate
            }
        }).then(res => {
            if (res?.data?.count) {
                setLitigationInvoices(res.data.count)
            }
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        })
    }
    const getEventEntity = () => {
        Axios.get("/entityevent/").then(res => {

            setEventData(res.data.events)

        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        })
    }

   
 
    const invoicesValidation = () => {
        Axios.get("/invoice//invoicesValidation", {
            params: {
                period: value,
                endDate: endDate,
                startDate: startDate
            }
        }).then(res => {
            if (res?.data?.count) {
                setInvoicesInValidation(res.data.count)
            }
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        })
    }
    const invoiceInToBePaid = () => {
        Axios.get("/invoice//invoicesInToBePaid", {
            params: {
                period: value,
                endDate: endDate,
                startDate: startDate
            }
        }).then(res => {
            if (res?.data?.count) {
                setInvoicesInToBePaid(res.data.count)
            }
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        })
    }

    useEffect(() => {
        
        invoicesValidation();
        getNotPaidInvoices()
        getLitigationInvoices()
        invoiceInToBePaid()
    }, [value]);

    const onChangeHandler = () => {

    }
   
    const onSortEnd = (oldIndex, newIndex) => {
        setArrayCards((array) => arrayMoveImmutable(array, oldIndex, newIndex));
        
      };

      const getCardByItem = (item) => {
        switch (item) {
                case "Facture_a_payer":
                    return (  <Card
                                icon={<FontAwesomeIcon icon={faDolly} style={{ color: "#809FB8" }}/>}
                                title="Exemple 1"
                                value= {notPaidInvoices}
                            />)
                case "Facture_en_litige":
                    return  (<Card
                                icon={<FontAwesomeIcon icon={faDolly} style={{ color: "#809FB8" }}/>}
                                title="Exemple 2"
                                value={litigationInvoices}
                            />)
                case "Facture_en_validation":
                    return  (<Card
                                icon={<FontAwesomeIcon icon={faDolly} style={{ color: "#809FB8" }}/>}
                                title="Exemple 3"
                                value={invoicesInValidation}
                            />)
                case "Factures_à_régler":
                    return (<Card
                                icon={<FontAwesomeIcon icon={faPersonRays} style={{ color: "#809FB8" }}/>}
                                title="Exemple 4"
                                value={invoicesInToBePaid}
                            />)
                default:
      }}
    return (
        <>
            <HomeContainer>
                <HomeHeader>
                    <HeaderInfos>
                        <HeaderLocation>Accueil</HeaderLocation>
                        <HeaderTitle>Portail </HeaderTitle>
                    </HeaderInfos>
                    <HeaderActions>
                        <HeaderAction>
                            <Select
                                width="210px"
                                options={options}
                                value={options.find(option => option.value === value)?.label}
                                onChange={selectChange}
                            />
                        </HeaderAction>
                        {/* <HeaderAction>
                        <BtnAction
                            onClick={lunchOcr}
                            color={theme.colors.success}
                        >
                            Lancer l'OCR
                        </BtnAction>
                    </HeaderAction> */}
                    </HeaderActions>
                </HomeHeader>
                <HomeBody>
                    <RowDivContainer>  
                        <FirstDiv>
                            {/* <HomeStats> */}
                            <Tasks title={"Mes tâches"} events={eventData} others={false} />
                            <Events title={"Evènements"} events={eventData} others={true}/>
                            {/* </HomeStats> */}
                        </FirstDiv>
                        {/*<SecendDiv >*/}
                        {/*    <div style={{ display: 'flex', width: '100%' }}>*/}
                        {/*        <p style={{ textAlign: 'center', color: '#2174B9', width: "inherit", fontSize: "1rem" }}>Mes statistiques</p>*/}
                        {/*            */}{/* <PersonAddIcon className="iconStyle" onClick={(e) => setShowStatisticsModal(!showStatisticsModal)}/> */}
                        {/*            <FontAwesomeIcon icon={faUserGear} className="iconStyle" onClick={(e) => setShowStatisticsModal(!showStatisticsModal)}/>*/}
                        {/*    </div>*/}
                        {/*    <HomeCards> */}
                        {/*        <SortableList*/}
                        {/*            onSortEnd={onSortEnd}*/}
                        {/*            className="list"*/}
                        {/*            draggedItemClassName="dragged"*/}
                        {/*            >*/}
                        {/*                    */}{/* arrayCards=["Facture_a_payer", "Facture_en_litige", "Facture_en_validation","Factures_à_régler"] */}
                        {/*                    {arrayCards.map((item) => (*/}
                        {/*                            <SortableItem key={item} style={{display:"flex",width:"100%"}}>*/}
                        {/*                                <div style={{display:"flex"}}>*/}
                        {/*                                    {getCardByItem(item)}*/}
                        {/*                                </div>*/}
                        {/*                            </SortableItem>)*/}
                                               
                                              
                        {/*                    // */}
                        {/*                    )}*/}
                        {/*            </SortableList>*/}
                               
                        {/*    </HomeCards>*/}
                        {/*    <div style={{ display: 'flex' }}>*/}
                        {/*        <select*/}
                        {/*            className="selectForm selectStyle"*/}
                        {/*            name="family"*/}
                        {/*            onChange={e => onChangeHandler(e)}*/}
                        {/*        // value={}*/}
                        {/*        >*/}
                        {/*            */}{/* <option value="" key={0}>--- Selectionner un type ---</option> */}
                        {/*            <option value="" key={1}>Analyse des provisions à date</option>*/}
                        {/*            <option value="" key={2}>Analyse des canaux de réception</option>*/}
                        {/*            <option value="" key={3}>Analyse des délais de réception facture</option>*/}
                        {/*            <option value="" key={4}>Analyse des risques aux paiements</option>*/}
                        {/*            <option value="" key={5}>Analyse du taux d'extraction</option>*/}
                        {/*            <option value="" key={6}>Analyse des typologies</option>*/}
                        {/*        </select>  */}
                        {/*        <OpenInFullIcon className="iconStyle" />*/}
                        {/*    </div>*/}

                        {/*    <div style={{ padding: "23px 5px" }}>*/}
                        {/*        <div className="typeLine"  >*/}
                        {/*            <p className="space">20/11/2022</p>*/}
                        {/*            <p style={{ color: "#ffffff", width: "113px" }} className="label_add">2 545 €</p>*/}
                        {/*            <p style={{ color: "rgb(200, 176, 230)" }} className="space specElement" >Novembre : 20 810 €</p>*/}
                        {/*        </div>*/}
                        {/*        <div className="typeLine">*/}
                        {/*            <p className="space">30/11/2022</p>*/}
                        {/*            <p style={{ color: "#ffffff", width: "700px" }} className="label_add">18 265 €</p>*/}
                        {/*            <p className="space"></p>*/}
                        {/*        </div>*/}
                        {/*        <div className="typeLine">*/}
                        {/*            <p className="space">08/12/2022</p>*/}
                        {/*            <p style={{ backgroundColor: theme.colors.gray, color: "#505050", width: "230px" }} className="label_add ">5 435 €</p>*/}
                        {/*            <p className="space specElement">Décembre : 20 810 €</p>*/}
                        {/*        </div>*/}
                        {/*        <div className="typeLine">*/}
                        {/*            <p className="space">15/12/2022</p>*/}
                        {/*            <p style={{ backgroundColor: theme.colors.gray, color: "#505050", width:"330px" }} className="label_add">7 800 €</p>*/}
                        {/*            <p className="space"></p>*/}
                        {/*        </div>*/}
                        {/*        <div className="typeLine">*/}
                        {/*            <p className="space">31/12/2022</p>*/}
                        {/*            <p style={{ backgroundColor: theme.colors.gray, color: "#505050", width:"900px" }} className="label_add">22 376 €</p>*/}
                        {/*            <p className="space"></p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*</SecendDiv>*/}
                    </RowDivContainer>

                    {/*<HomeInvoices active={showLastSupplpier}>*/}
                    {/*    <div style={{color:"#2174B9",textAlign: "center"}}>*/}
                    {/*        <span onClick={e => setShowLastSupplpier(!showLastSupplpier)} style={{cursor:"pointer"}}>*/}
                    {/*            Dernières factures <ExpandMoreIcon />*/}
                    {/*        </span>*/}
                    {/*        {*/}
                    {/*            showLastSupplpier &&*/}
                    {/*            <>*/}
                    {/*                <ISNavContainer>*/}
                    {/*                    <NavTabsUl>*/}
                    {/*                        */}{/* {invoiceIntegratedDetail && */}
                    {/*                        <NavTabsLi>*/}
                    {/*                            <NavTabsLink*/}
                    {/*                                active={tabSideActive=="fournisseur"}*/}
                    {/*                                 onClick={() => setTabSideActive("fournisseur")}*/}
                    {/*                                to="#"*/}
                    {/*                            >*/}
                    {/*                                */}{/* <FontAwesomeIcon icon={faPersonRays} /> */}
                    {/*                                <FontAwesomeIcon icon={faDolly} className="specMargin"/>*/}
                    {/*                                */}{/* <FontAwesomeIcon icon={faUserGear} /> */}
                    {/*                                Fournisseur*/}
                    {/*                            </NavTabsLink>*/}
                    {/*                        </NavTabsLi>*/}
                
                    {/*                        <NavTabsLi>*/}
                    {/*                            <NavTabsLink*/}
                    {/*                                active={tabSideActive=="client"}*/}
                    {/*                                 onClick={() => setTabSideActive("client")}*/}
                    {/*                                to="#"*/}
                    {/*                            >*/}
                    {/*                                <FontAwesomeIcon icon={faPersonRays} className="specMargin"/>*/}
                    {/*                                Client*/}
                    {/*                            </NavTabsLink>*/}
                    {/*                        </NavTabsLi>*/}
                    {/*                    </NavTabsUl>*/}
                    {/*                </ISNavContainer>*/}
                    {/*                */}{/* {tabSideActive=="fournisseur"?*/}{/*
                    */}{/*                 <LastInvoices invoiceCheckBox ={true} entityFilter={"supplier"} NoshowTitel={true}/>:*/}{/*
                    */}{/*                <LastInvoicesClient  invoiceCheckBox ={true} entityFilter={"client"} NoshowTitel={true}/>*/}{/*
                    */}{/*                } */}
                    {/*            </>*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</HomeInvoices>*/}
                   

                </HomeBody>
                {
                    showStatisticsModal &&
                        <StatisticsModal 
                            show={showStatisticsModal}
                            handleClose={() => setShowStatisticsModal(false)}
                            // addRecipientsHandler={addRecipientsHandler}
                        />
                }

            </HomeContainer>
        </>
    );
}

export default Home;
        
                                            // switch (card) {
                                            //     case "Facture_a_payer":
                                            //         return ( <SortableItem key={card}> <Card
                                            //                     icon={<FontAwesomeIcon icon={faDolly} style={{ color: "#809FB8" }}/>}
                                            //                     title="Factures à payer"
                                            //                     value=
                                            //                     // {<SupplierLink 
                                            //                     //     to="/referentielFournisseur"
                                            //                     //     state={{
                                            //                     //         filtersProps : {
                                            //                     //             status: 'ACTIVE',
                                            //                     //             type: 'supplier'
                                            //                     //         }
                                            //                     //     }}
                                            //                     // >
                                            //                     // </SupplierLink>}
                                            //                     {notPaidInvoices}
                                            //         /></SortableItem>)
                                            //     case "Facture_en_litige":
                                            //         return  (<SortableItem key={card}><Card
                                            //                     icon={<FontAwesomeIcon icon={faDolly} style={{ color: "#809FB8" }}/>}
                                            //                     title="Facture en validation"
                                            //                     value={invoicesInValidation}
                                            //                 /></SortableItem>)
                                            //     case "Facture_en_validation":
                                            //         return  (<SortableItem key={card}><Card
                                            //                     icon={<FontAwesomeIcon icon={faDolly} style={{ color: "#809FB8" }}/>}
                                            //                     title="Facture en validation"
                                            //                     value={invoicesInValidation}
                                            //                 /> </SortableItem>)
                                            //     case "Factures_à_régler":
                                            //         return ( <SortableItem key={card}><Card
                                            //                     icon={<FontAwesomeIcon icon={faPersonRays} style={{ color: "#809FB8" }}/>}
                                            //                     title="Factures à régler"
                                            //                     value={invoicesInToBePaid}
                                            //                 /></SortableItem>)
                                            //     default:
                                           
                              
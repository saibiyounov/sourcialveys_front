import React, { useEffect, useState } from 'react';
import Axios from '../../../axios-proas';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { EventsContainer, EventsHeader, EventsTitle, EventsList, EventsItem, EventColor, EventValue, EventTitle, EventDate, EventAction, ISNavContainer, EventVal, EventValT2, EventMessage, EventFilterItem, IconsContainer, ISNavContent, NavTabsUl, NavTabsLi, NavTabsLink } from './Events.styled';
import { formatDate, getTimeDate, getStatusLabel } from '../../../shared/utility'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Spinner from 'react-bootstrap/Spinner'

import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EventsFilter from './EventsFilter/EntityFilter';
import { connect } from 'react-redux';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import EastIcon from '@mui/icons-material/East';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import { faUserGear, faDatabase, faDolly, faPersonRays, faBell, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextsmsIcon from '@mui/icons-material/Textsms';
import { CTooltip } from '../../../components/UI/CTooltip/CTooltip';
function Tasks({ userType }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState(["invoice", "entity", "parapheurs"])
    const [filteredEvents, setFilteredEvents] = useState()
    const [tsksList, setTsksList] = useState([]);
    const [tabSideActive, setTabSideActive] = useState("supplier")
    const [suppliersNumber, setSupplierNumber] = useState(0)
    const [customersNumber, setCustomersNumber] = useState(0)

    const [filteredTasks, setFilteredTasks] = useState()
    const getTsksInvoice = () => {
        setLoading(true)
        Axios.get("/user//tasks").then(res => {
            const eventsData = res.data?.events ? res.data.events : [];
            setTsksList(eventsData);
            let parapheur = tabSideActive == "supplier" ? "parapheurs" : null;
            setFilteredTasks(eventsData.filter(event => event.entityType == tabSideActive || parapheur == "parapheurs"));
            setSupplierNumber(eventsData.filter(event => event.entityType == 'supplier').length)
            setCustomersNumber(eventsData.filter(event => event.entityType == 'client').length)
        }).catch(res => {
          
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {

        getTsksInvoice();
    }, [tabSideActive])


    const getInvoiceEventColor = (event) => {
        switch (event?.snapshot) {
            case "IMPORTED":
                return theme.colors.warning;
            case "INTEGRATED":
                return theme.colors.success;
            case "LITIGATION":
            case "ERROR":
                return theme.colors.danger;
            default:
                return "#505050";
        }
    }
    const getEntityEventIcon = (event) => {
        return <IconsContainer border={"#ffff"} className="homeEventsIcons">

        </IconsContainer>
    }



    const getParapheurIcon = (event) => {
        switch (event?.message) {

            case "0":
                return <IconsContainer border={"#fff"} className="homeEventsIcons">
                    <FontAwesomeIcon icon={ArrowRightAltIcon} style={{ marginRight: "7px", fontSize: "2rem", color: "#EE5A5A" }} />
                </IconsContainer>

            case "1":
                return <IconsContainer border={"#fff"} className="homeEventsIcons">
                    <FontAwesomeIcon icon={ArrowRightAltIcon} style={{ marginRight: "7px", fontSize: "2rem", color: "#EE5A5A" }} />
                </IconsContainer>
            case "2":
                return <IconsContainer border={"#fff"} className="homeEventsIcons">
                    <FontAwesomeIcon icon={ArrowRightAltIcon} style={{ marginRight: "7px", fontSize: "2rem", color: "#EE5A5A" }} />
                </IconsContainer>
            default:

                return <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{ color: "#C8B0E6" }} /></IconsContainer>;
            // return <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{color:"#C8B0E6"}}/></IconsContainer>
        }
    }
    
    const getInvoiceEventIcon = (event) => {
        switch (event?.snapshot) {
            case "TO_BE_CONTROLLED":
                return <IconsContainer  border={"#fff"}  >
                    <FontAwesomeIcon
                        icon={faHourglassHalf}
                        style={{ color: theme.colors.purple}}
                    />
                </IconsContainer>

            case "TO_BE_VALIDATED":
                return <IconsContainer border={"#fff"}>
                    <FontAwesomeIcon icon={faHourglassHalf}
                        style={{ color: "#C8B0E6" }} />
                </IconsContainer>
            case "INTEGRATED":
            case "IMPORTED":
                return <IconsContainer ><ArrowRightAltIcon style={{ color: "#C8B0E6" }} /></IconsContainer>
            case "INTEGRATED":
                return <IconsContainer ><ArrowRightAltIcon style={{ color: "#C8B0E6" }} /></IconsContainer>
            case "REFUSED":
            case "REJECTED":
            case "ERROR":
                return <IconsContainer border={"#fff"} >
                    <FontAwesomeIcon icon={faCircleXmark} style={{  color: "#EE5A5A" }} />
                </IconsContainer>

            case "LITIGATION":
                return <IconsContainer border={"#fff"} >
                <FontAwesomeIcon icon={faCircleXmark} style={{ color:"#EE5A5A"}}/>
               </IconsContainer>

            default:

                return event?.type == 'USER_CHAT_EVENT'
                    ? <IconsContainer border={"#B8B8B8"}><MessageIcon style={{ color: "#B8B8B8", border: "#B8B8B8" }} /></IconsContainer> : <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{ color: "#C8B0E6" }} /></IconsContainer>;
            // return <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{color:"#C8B0E6"}}/></IconsContainer>
        }
    }

    const getEntityEventColor = (event) => {
        switch (event?.type) {
            case "STEP":
                switch (event?.message) {
                    case "INPROGRESS":
                        return theme.colors.warning;
                    case "ACTIVE":
                        return theme.colors.success;
                    default:
                        return theme.colors.warning;
                }
            case "DOCS":
                return theme.colors.warning;
            case "ERROR_FIELD":
                return theme.colors.danger;
            case "NEW_SUPPLIER_ACCOUNT":
                return "#505050";
            default:
                return theme.colors.warning;
        }
    }

    const getInvoiceEventRealTitle = (eventTmp) => {
        if (userType === 'client')
            return eventTmp?.data?.clientName ? eventTmp.data.clientName : eventTmp?.user?.entityName;
        return eventTmp?.data?.supplierName ? eventTmp.data.supplierName : eventTmp?.user?.entityName;
    }

    const getInvoiceEntityName = (event) => {
        return event?.data?.entityName
    }


    const getInvoiceEventMessage = (event) => {
        switch (event?.snapshot) {
            case "NEW":
                return event?.message ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                break;
            case "TO_BE_VALIDATED":
                return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                break;
            case "INTEGRATED":
                return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                break;
            case "ERROR":
                return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                break;
            case "TO_BE_CONTROLLED":
                return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                break;
            case "LITIGATION":
                return `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)`;
                break;

            case "REFUSED":
            case "REJECTED":
                return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                break;
            default:
                // return ( event?.snapshot)  ? event?.snapshot : "MessageVide";
                return event?.type == 'USER_CHAT_EVENT'
                    ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : "MessageVide";
        }
    }


    const getInvoiceEventTitle = (event) => {
        switch (event?.snapshot) {
            case "NEW":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' déposée';
                break;
            case "TO_BE_CONTROLLED":
                return 'Facture n°' + event?.data?.number + ' à contrôler';
                break;
            case "TO_BE_VALIDATED":
                return 'Facture n°' + event?.data?.number + ' à valider';
                break;
            case "INTEGRATED":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' intégrée';
                break;
            case "ERROR":
                return 'Facture en erreur ';
                break;
            case "PAID":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' payée';
                break;
            case "LITIGATION":
                return 'Facture n°' + event?.data?.number + ' en litige';
                break;
            case "REFUSED":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' refusée';
                break;
            case "REJECTED":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' rejetée';
                break;
            default:
                return event?.type == 'USER_CHAT_EVENT'
                    ? "Nouveau commentaire sur facture en litige" : "MessageVide";
        }
    }


    const getEntityEventMessage = (event) => {
        switch (event?.message) {
            case "email":
                return `Champs email erroné`;
            case "INPROGRESS":
                return `Demande de validation`;
            case "ACTIVE":
                return `Fournisseur activé`;
            case "DOCUMENT":
                return `Nouveau document`; //${event.snapshot}`;
            // case "0":
            // return  `Nouveau document`; ;
            default:
                // return event?.type="NEW_SUPPLIER_ACCOUNT"? `Référencement : ${event?.data?.entity_id} (` + getInvoiceEventRealTitle(event) + `)`:"MessageVide";
                // return event?.message != "" ? event?.message : "MessageVide";
                return event?.type == 'NEW_SUPPLIER_ACCOUNT'
                    ? `Référencement : REF${event?.entity_id} (` + event.name + `)` : "MessageVide";
        }
    }

    const updateFilterHandler = (newFitler) => {

        let filterTemp = null;
        let ft = [...filter];
        switch (newFitler) {
            case "invoice":
                if (filter?.includes("invoice") || filter == null) {
                    ft.filter(function (item, index) {
                        if (item === "invoice")
                            ft.splice(index, 1);
                    });

                }
                //  ft.push("parapheurs","entity");

                else ft.push("invoice");
                break;
            case "parapheurs":
                if (filter?.includes("parapheurs") || filter == null) {
                    ft.filter(function (item, index) {
                        if (item === "parapheurs")
                            ft.splice(index, 1);
                    });

                }
                else ft.push("parapheurs");

                break;
            case "entity":
                if (filter?.includes("entity") || filter == null) {
                    ft.filter(function (item, index) {
                        if (item === "entity")
                            ft.splice(index, 1);
                    });

                }
                else ft.push("entity");

                break;
            default:
                filterTemp = null;
                break;
        }
        console.log(ft)
        if (ft.length === 0) ft = ["invoice", "entity", "parapheurs"];
        let filteredEventsTemp = ft ? eventsList.filter(event => ft.includes(event?.eventType)) : null;
        setFilter(ft)
        setFilteredEvents(filteredEventsTemp)
    }


    const getGlobalTitle = (eventTmp) => {
        if (eventTmp?.eventType === "entity") {
            return "A contrôler"
        }
        if (eventTmp?.eventType === "invoice") {
            return getStatusLabel(eventTmp?.snapshot)
        }
        if (eventTmp?.eventType === "parapheurs") {
            return eventTmp.message == 0 ? "En attente " : eventTmp.message == 1 ? "A valider" : eventTmp.message == 2 ? "A contrôler" : null;
        }
    }

    const navigateToEntity = (uid, type) => {
        if (type === "DOCS") {
            localStorage.setItem("show", "document");
        }
        navigate("/supplierRequestDetail/" + uid)
    }


    const actionTo = (eventTmp) => {
        if (eventTmp?.eventType === "entity") {
            navigateToEntity(eventTmp.entityUid, eventTmp.type)
        }
        if (eventTmp?.eventType === "invoice") {
            if (eventTmp?.snapshot === "TO_BE_CONTROLLED") {
                eventTmp?.data && navigate("/invoiceCommand/" + eventTmp?.data?.invoiceUid) 
            } else
                if (eventTmp?.snapshot === "TO_BE_VALIDATED") {
                    eventTmp?.data && navigate("/invoiceIntegratedDetail/" + eventTmp?.data?.invoiceUid) 
                } else {
                    eventTmp.hasOwnProperty("data") && eventTmp?.data && navigate("/invoiceDetail/" + eventTmp?.data?.invoiceUid) 
                }

        }

        if (eventTmp?.eventType === "parapheurs") {
            eventTmp?.uidParapheur && navigate("/paymentSignatureDetail/" + eventTmp?.uidParapheur) 
        }
    }

    const titleParapheur = (eventTmp) => {
        return eventTmp.message == 0 ? "Parapheur en attente " : eventTmp.message == 1 ? "Parapheur en attente de validation" : eventTmp.message == 2 ? "Parapheur à contrôler" : null;

    }
    let eventsJsx = null;

    if (loading)
        eventsJsx = (<Spinner />)
    else if (filteredTasks && filteredTasks?.length > 0) {
        eventsJsx = filteredTasks?.map((eventTmp, index) => {
            var eventJsx = null;
            let isLast = index === 0
            let color = theme.colors.warning;
            let title = "";
            let message = "";
            let date = "";
            let action = null;
            let title2 = "";
            let icon = "";
            switch (eventTmp?.eventType) {
                case "invoice":
                    color = getInvoiceEventColor(eventTmp);
                    // title = eventTmp?.data?.supplierName ? eventTmp?.data?.supplierName : eventTmp?.user?.entityName;
                    //title = eventTmp?.message ? eventTmp?.message : 
                    title = getInvoiceEventTitle(eventTmp);
                    message = getInvoiceEventMessage(eventTmp);
                    date = "Date d'échéance : " + formatDate(+eventTmp?.data?.dueDate) + " " + getTimeDate(+eventTmp?.creationDate);
                    title2 = getGlobalTitle(eventTmp);
                    icon = getInvoiceEventIcon(eventTmp);
                    // action = (eventTmp.hasOwnProperty("data") && eventTmp?.data ) ? (
                    //     <EventAction   onClick={() => navigate("/invoiceDetail/"+eventTmp?.data?.invoiceUid)}>
                    //         <span>voir</span>
                    //         <ArrowForwardIosIcon />
                    //     </EventAction>
                    // ) : null;


                    break;
                case "entity":
                    color = getEntityEventColor(eventTmp);
                    title = getEntityEventMessage(eventTmp);
                    //  eventTmp.type=="NEW_SUPPLIER_ACCOUNT"?"Demande de référencement": eventTmp?.name;
                    message = eventTmp.name;
                    date = "Date de création : " + formatDate(+eventTmp?.creationDate) + " " + getTimeDate(+eventTmp?.creationDate);
                    title2 = getGlobalTitle(eventTmp);
                    icon = getEntityEventIcon(eventTmp);
                    action = (
                        <EventAction onClick={() => navigateToEntity(eventTmp.entityUid, eventTmp.type)}>
                            <span>voir</span>
                            <ArrowForwardIosIcon />
                        </EventAction>
                    );
                    break;
                case "parapheurs":
                    color = "#505050"
                    title = titleParapheur(eventTmp);
                    message = `Parapheur ${eventTmp.paymentNumber}`;
                    date = formatDate(+eventTmp?.creationDate) + " " + getTimeDate(+eventTmp?.creationDate);
                    title2 = getGlobalTitle(eventTmp);
                    icon = getParapheurIcon(eventTmp);

                default:
                    break;
            }
            return (
                <EventsItem key={index} onClick={() => actionTo(eventTmp)}>
                    <>
                        {icon}
                        <EventValue>
                            <EventMessage >
                                {message}
                                <>{
                                    eventTmp?.unreadMessages && parseInt(eventTmp?.unreadMessages) != 0 &&
                                    <div className="unreadMessage_icon">
                                        <CTooltip title={"Nouveaux commentaires"} className="tableActions__icon" style={{ color: '#022f67', fontSize: "20px" }}>
                                            <FontAwesomeIcon icon={faBell} style={{ marginLeft: "7px", color: "#2174B9" }} />
                                        </CTooltip>
                                    </div>
                                }
                                </>
                            </EventMessage>
                            <EventVal>
                                {title}
                            </EventVal>
                            <EventDate>
                                {date}
                            </EventDate>

                        </EventValue>
                    </>
                    <div><EventValT2 color={color}>{title2}</EventValT2></div>
                </EventsItem>
            )
        })
    }
    return (
        <>
            <EventsContainer>
                <EventsHeader>
                    <EventsTitle>
                        Mes tâches
                    </EventsTitle>
                    <ISNavContainer>
                        <NavTabsUl>
                            {/* {invoiceIntegratedDetail && */}
                            <NavTabsLi>
                                <NavTabsLink
                                    active={tabSideActive == "supplier"}
                                    onClick={() => setTabSideActive("supplier")}
                                    to="#"
                                >
                                    <FontAwesomeIcon icon={faDolly} style={{ marginRight: "7px" }} />
                                    Fournisseurs [{suppliersNumber}]
                                </NavTabsLink>
                            </NavTabsLi>

                            <NavTabsLi>
                                <NavTabsLink
                                    active={tabSideActive == "client"}
                                    onClick={() => setTabSideActive("client")}
                                    to="#"
                                >
                                    <FontAwesomeIcon icon={faPersonRays} style={{ marginRight: "7px" }} />
                                    Clients [{customersNumber}]
                                </NavTabsLink>
                            </NavTabsLi>
                        </NavTabsUl>
                    </ISNavContainer>
                    {/* <EventsFilter
                        filter={filter}
                        updateFilter={updateFilterHandler}
                    /> */}
                </EventsHeader>
                <EventsList>
                    {
                        eventsJsx
                    }
                </EventsList>
            </EventsContainer>
        </>
    );
}

const mapStateToProps = (state) => ({
    userType: state.auth.userType,
    login: state.auth.login
})
const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)

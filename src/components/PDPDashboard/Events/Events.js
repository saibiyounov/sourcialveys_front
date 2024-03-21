import React, { useEffect, useState } from 'react';
import Axios from '../../../axios-proas';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NavTabsLi, NavTabsLink, NavTabsUl, EventsContainer, EventsHeader, EventsTitle, EventsList, EventsItem, EventColor, EventValue, EventTitle, EventDate, EventAction, EventVal, EventMessage, EventFilterItem, IconsContainer, ISContainer, ISNavContainer, ISNavContent } from './Events.styled';
import { formatDate, getTimeDate } from '../../../shared/utility'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Spinner from 'react-bootstrap/Spinner'
import DropDown from '../../UI/DropDown/DropDown';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EventsFilter from './EventsFilter/EntityFilter';
import { connect } from 'react-redux';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EastIcon from '@mui/icons-material/East';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MessageIcon from '@mui/icons-material/Message';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CustomEventModal from "./CustomEventModal/CustomEventModal"
import StorageIcon from '@mui/icons-material/Storage';
import { faUserGear, faDatabase, faDolly, faPersonRays, faBell, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// const eventsList = [
//     {color: theme.colors.success , value: 'Fournisseur 1', date: '5 minuites'},
//     {color: theme.colors.warning, value: 'Fournisseur 2', date: '5 minuites'},
//     {color: theme.colors.success, value: 'Fournisseur 3', date: '5 minuites'},
//     {color: theme.colors.warning, value: 'Fournisseur 4', date: '5 minuites'},
//     {color: theme.colors.success, value: 'Campagne 1', date: '5 minuites'},
//     {color: theme.colors.danger, value: 'Transdev', date: '5 minuites'},
//     {color: theme.colors.success, value: 'Transdev', date: '5 minuites'},
// ]
function Events({ userType, title, others }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [eventsList, setEventsList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState(null)
    const [filteredEvents, setFilteredEvents] = useState()
    const [showCustomEventModal, setShowCustomEventModal] = useState(false)




    const getTsksInvoice = () => {
        setLoading(true)
        Axios.get("/user//tasks").then(res => {
            const eventsData = res.data?.events ? res.data.events : [];
            setEventsList(eventsData);
            setFilteredEvents(eventsData);
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        }).finally(() => {
            setLoading(false)
        })
    }


    const getPDPEvents = () => {
        setLoading(true)
        Axios.get("/user//userEventsPdp").then(res => {
            const eventsData = res.data?.events ? res.data.events : [];
            setEventsList(eventsData);
            setFilteredEvents(eventsData);
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        }).finally(() => {
            setLoading(false)
        })
    }



    const getuserTypeEvents = () => {
        setLoading(true)
        Axios.get("/user//userTypeEvents").then(res => {
            const eventsData = res.data?.events ? res.data.events : [];
            setEventsList(eventsData);
            setFilteredEvents(eventsData);
        }).catch(res => {
            notyf.error("Une erreur s'est produite!");
        }).finally(() => {
            setLoading(false)
        })
    }



    useEffect(() => {
        // if(userType === 'client' || userType === 'supplier')
        //     getuserTypeEvents()
        // else
        // getTsksInvoice();
        getPDPEvents()
    }, [])


///////////////////////

    const tempOtherEvents = [
        {
            comment: null,
            creationDate: "1666299165000",
            data: { status: "LITIGATION", supplierName: "OVH.com", invoiceUid: "cbdec41d-da68-42e9-a70e-6aad6fe1618e", number: "INV055342" },
            date: null,
            eventType: "otherEvent",
            id: "1591",
            invoiceId: "737",
            invoiceUid: "cbdec41d-da68-42e9-a70e-6aad6fe1618e",
            message: "Annuaire PPF",
            readByReceiver: "0",
            snapshot: "UPDATED",
            type: "STEP_STATUS",
            uid: "bc7d21bc-b177-48a9-b694-a1db411f9923",
            updateDate: null,
            user: {
                entityName: "INGRAM MICRO SAS",
                entityUid: "85e5b0d1-fa40-418d-a594-cf4d937a8526",
                first_name: "Admin",
                last_name: "ICD",
                login: "laurent.destruel@icdsc.fr",
                userUid: "7f72bf68-aa53-488f-9d32-2db1e2429d27"
            },
            userId: "78",
        },
        {
            comment: null,
            creationDate: "1666299165000",
            data: { status: "TO_BE_PAID", supplierName: "OVH.com", invoiceUid: "cbdec41d-da68-42e9-a70e-6aad6fe1618e", number: "INV055342" },
            date: null,
            eventType: "otherEvent",
            id: "1591",
            invoiceId: "737",
            invoiceUid: "cbdec41d-da68-42e9-a70e-6aad6fe1618e",
            message: "Facture : FC2493857-0024",
            readByReceiver: "0",
            snapshot: "ERROR",
            type: "STEP_STATUS",
            uid: "bc7d21bc-b177-48a9-b694-a1db411f9923",
            updateDate: null,
            user: {
                entityName: "PHYTO CHIMICAL SA",
                entityUid: "85e5b0d1-fa40-418d-a594-cf4d937a8526",
                first_name: "Admin",
                last_name: "ICD",
                login: "laurent.destruel@icdsc.fr",
                userUid: "7f72bf68-aa53-488f-9d32-2db1e2429d27"
            },
            userId: "78",
        },
        {
            comment: null,
            creationDate: "1666299165000",
            data: { status: "LITIGATION", supplierName: "OVH.com", invoiceUid: "cbdec41d-da68-42e9-a70e-6aad6fe1618e", number: "INV055342" },
            date: null,
            eventType: "otherEvent",
            id: "1591",
            invoiceId: "737",
            invoiceUid: "cbdec41d-da68-42e9-a70e-6aad6fe1618e",
            message: "Domiciliation bancaire",
            readByReceiver: "0",
            snapshot: "UPDATED",
            type: "STEP_STATUS",
            uid: "bc7d21bc-b177-48a9-b694-a1db411f9923",
            updateDate: null,
            user: {
                entityName: "INGRAM MICRO SAS",
                entityUid: "85e5b0d1-fa40-418d-a594-cf4d937a8526",
                first_name: "Admin",
                last_name: "ICD",
                login: "laurent.destruel@icdsc.fr",
                userUid: "7f72bf68-aa53-488f-9d32-2db1e2429d27"
            },
            userId: "78",
        },

    ]

    const getActionFromSnap = (action) => {
        if (action == "INTEGRATED") return "Integré"
        if (action == "LITIGATION") return "Litige"
        if (action == "PAID") return "A payer"
        if (action == "ERROR") return "Erreur"
        if (action == "UPDATED") return "Mis à jour"
        if (action == "TO_BE_VALIDATED") return "A valider"
        if (action == "TO_BE_CONTROLLED") return "A contrôler"
        if (action == "TO_BE_PAID") return "A payer"
    }



    const getInvoiceEventColor = (event) => {
        switch (event?.snapshot) {
            case "IMPORTED":
                return theme.colors.warning;
            case "INTEGRATED":
                return theme.colors.success;
            case "LITIGATION":
            case "ERROR":
                return theme.colors.danger;
            case "TO_BE_CONTROLLED":
            case "TO_BE_VALIDATED":
                return theme.colors.purple;
                
            default:
                return theme.colors.success;
        }
    }

    const getInvoiceEventIcon = (event) => {
        switch (event?.snapshot) {
            case "IMPORTED":
                return <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{ color: "#C8B0E6",fontSize:"23px",marginRight:"13px"}} /></IconsContainer>
            case "INTEGRATED":
                return <ArrowRightAltIcon style={{ color: "#ffffff", width: "40px", fontSize: "23px"}} />
            case "REFUSED":
            case "REJECTED":
            case "ERROR":
                return <WarningAmberIcon className="homeEventsIcons" style={{ color: "#EE5A5A", fontSize: "23px", marginRight:"13px" }} />
            case "UPDATED":
                return <FontAwesomeIcon icon={faDatabase} style={{ color: "#2174B9", fontSize: "23px", marginRight:"13px" }}/> 
            case "TO_BE_PAID":
            case "TO_BE_CONTROLLED":
            case "TO_BE_VALIDATED":
                return <FontAwesomeIcon icon={faHourglassHalf} className="homeEventsIcons" style={{ color: theme.colors.purple, fontSize: "23px",marginRight:"16px",marginLeft: "3px" }} />
            case "LITIGATION":
                return <HighlightOffIcon className="homeEventsIcons" style={{ color: "#EE5A5A", fontSize: "23px", marginRight:"13px" }} />
            // case "ERROR":
            //     return <HighlightOffIcon style={{color:"#EE5A5A"}} />
            // case "":
            //     return <HighlightOffIcon style={{color:"#EE5A5A"}} />
            // case "ERROR":
            //     return <HighlightOffIcon style={{color:"#EE5A5A"}} />
            default:

                return event?.type == 'USER_CHAT_EVENT'
                    ? <IconsContainer border={"#B8B8B8"} className="homeEventsIcons"><MessageIcon style={{ color: "#B8B8B8", border: "#B8B8B8" }} /></IconsContainer> : <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{ color: "#C8B0E6" }} /></IconsContainer>;
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
            case "IMPORTED":
                return event?.message ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
            case "INTEGRATED":
                return event?.message ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
            case "ERROR":
                return event?.message ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
            case "PAID":
                return event?.message ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
            case "LITIGATION":
                return event?.message ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
            case "REFUSED":
            case "REJECTED":
                return event?.message ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
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
            case "IMPORTED":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' importée';
            case "INTEGRATED":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' intégrée';
            case "ERROR":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' erronée';
            case "PAID":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' payée';
            case "LITIGATION":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' en litige';
            case "REFUSED":
                return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' refusée';
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
        switch (newFitler) {
            case "invoice":
                if (filter === "entity") {
                    filterTemp = null;
                } else if (filter === "invoice" || filter === null) {
                    filterTemp = "entity";
                }
                break;
            case "entity":
                if (filter === "invoice") {
                    filterTemp = null;
                } else if (filter === "entity" || filter === null) {
                    filterTemp = "invoice";
                }
                break;
            default:
                filterTemp = null;
                break;
        }
        let filteredEventsTemp = filterTemp ? eventsList.filter(event => event?.eventType === filterTemp) : eventsList;
        setFilter(filterTemp)
        setFilteredEvents(filteredEventsTemp)
    }

    const navigateToEntity = (uid, type) => {
        if (type === "DOCS") {
            localStorage.setItem("show", "document");
        }
        navigate("/entity/" + uid)
    }
    const actionTo = (eventTmp) => {
        // if (eventTmp?.eventType === "entity") {
        //     navigateToEntity(eventTmp.entityUid, eventTmp.type)
        // }
        if (eventTmp?.eventType === "invoice" ) { // || eventTmp?.eventType === "otherEvent"
            eventTmp.hasOwnProperty("data") && eventTmp ? navigate("/invoiceDetail/" + eventTmp?.invoiceUid) : null
        }

        // if (eventTmp?.eventType === "parapheurs") {
        //     eventTmp?.uidParapheur ? navigate("/paymentSignatureDetail/" + eventTmp?.uidParapheur) : null
        // }
    }
    let eventsJsx = null;

    if (loading)
        eventsJsx = (<Spinner />)
    // else if (filteredEvents && filteredEvents?.length > 0) {
    //     eventsJsx = filteredEvents?.map((eventTmp, index) => {
    else if (eventsList && eventsList?.length > 0) {
        eventsJsx = (others ? tempOtherEvents : eventsList)?.map((eventTmp, index) => {
            var eventJsx = null;
            let isLast = index === 0
            let color = theme.colors.warning;
            let title = "";
            let message = "";
            let date = "";
            let action = null;

            switch (eventTmp?.eventType) {
                case "invoice":
                    color = getInvoiceEventColor(eventTmp);
                    title = eventTmp?.user?.entityName //getInvoiceEventTitle(eventTmp);
                    message = (eventTmp?.user?.entityName == "MICRO CABLE" ? "Référencement : REF45418 " : ("Facture : " + eventTmp?.data?.number))  //getInvoiceEventMessage(eventTmp);
                    date = formatDate(+eventTmp?.creationDate) + " " + getTimeDate(+eventTmp?.creationDate);
                    action = getActionFromSnap(eventTmp?.snapshot);
                    break;
                case "otherEvent":
                    color = getInvoiceEventColor(eventTmp);
                    title = eventTmp?.user?.entityName //getInvoiceEventTitle(eventTmp);
                    message = eventTmp?.message //(eventTmp.user.entityName == "MICRO CABLE" ? "Référencement : REF45418 " : ("Facture : " + eventTmp.data.number))  //getInvoiceEventMessage(eventTmp);
                    date = formatDate(+eventTmp?.creationDate) + " " + getTimeDate(+eventTmp?.creationDate);
                    action = getActionFromSnap(eventTmp?.snapshot);
                    break;

                default:
                    break;
            }
            return (
                <EventsItem key={index} onClick={() => actionTo(eventTmp)}>
                    {getInvoiceEventIcon(eventTmp)}
                    {/* <EventColor color={color} /> */}
                    <EventValue>
                        <EventMessage >
                            {title} { eventTmp?.comment && <FontAwesomeIcon icon={faBell} className="ICDBlue"/> }
                        </EventMessage>
                        <EventVal>
                            {message}
                        </EventVal>
                        <EventDate>
                            Date d'écheance : {date}
                        </EventDate>
                    </EventValue>
                    <p style={{ marginRight: "13px", fontSize: "0.9rem", color: "Litige, Erreur".includes(action) ? theme.colors.danger : theme.colors.lightBlack }}>
                        {action}
                    </p>
                </EventsItem>
            )
        })
    }
    return (
        <>
            <EventsContainer>
                <EventsHeader>
                    <EventsTitle>
                        {title}
                    </EventsTitle>
                    {others && <FontAwesomeIcon icon={faUserGear} className="iconStyle" onClick={(e) => setShowCustomEventModal(!showCustomEventModal)}/>}
                </EventsHeader>
                
                {
                    !others &&
                    <ISNavContainer>
                        <NavTabsUl>
                            {/* {invoiceIntegratedDetail && */}
                            <NavTabsLi>
                                <NavTabsLink
                                    active={true}
                                    // onClick={() => setTabSideActive("information")}
                                    to="#"
                                >
                                    <FontAwesomeIcon icon={faDolly} style={{marginRight:"7px"}}/>
                                    Fournisseurs [{eventsList?.length}]
                                </NavTabsLink>
                            </NavTabsLi>

                            <NavTabsLi>
                                <NavTabsLink
                                    active={false}
                                    // onClick={() => setTabSideActive("comments")}
                                    to="#"
                                >
                                    <FontAwesomeIcon icon={faPersonRays} style={{marginRight:"7px"}}/>
                                    Clients [1]
                                </NavTabsLink>
                            </NavTabsLi>
                        </NavTabsUl>
                    </ISNavContainer>

                }
                <EventsList>
                    {
                        eventsJsx
                    }
                </EventsList>

                {
                    showCustomEventModal &&
                    <CustomEventModal
                        show={showCustomEventModal}
                        handleClose={() => setShowCustomEventModal(false)}
                    // addRecipientsHandler={addRecipientsHandler}
                    />
                }

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
export default connect(mapStateToProps, mapDispatchToProps)(Events)

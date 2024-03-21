

import React, {useEffect, useState} from 'react';
import Axios from '../../../axios-proas';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { EventsContainer, EventsHeader2, EventsTitle2, EventsList, EventsItem, EventColor, EventValue, EventTitle, EventDate, EventAction, ISNavContainer,EventVal,EventValT2, EventMessage, EventFilterItem, IconsContainer,ISNavContent ,  NavTabsUl ,  NavTabsLi,  NavTabsLink } from './Events.styled';
import {formatDate, getTimeDate,getStatusLabel} from '../../../shared/utility'
import { useNavigate, useLocation , useParams} from 'react-router-dom';
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
import { faUserGear, faDatabase, faDolly, faPersonRays, faBell, faHourglassHalf,faFile } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CustomEventModal from "./CustomEventModal/CustomEventModal"

    function Events({userType}) {
        const theme = useTheme();
        const navigate = useNavigate();
       
        const [loading , setLoading] = useState(false)
        const [filter, setFilter] = useState(["invoice","entity","parapheurs"])
 
        const [eventsList, setEventsList] = useState([]);
        const [showCustomEventModal, setShowCustomEventModal] = useState(false)

       const [filteredEvents, setFilteredEvents] = useState()
     const getTsksInvoice = () => {
        setLoading(true)
        Axios.get("/user//events").then(res => {
            const eventsData = res.data?.events ? res.data.events : [];
            setEventsList(eventsData);
          
        
        }).catch(res => {
           
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
      
        getTsksInvoice();
    }, [])
     
    
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
    const getEntityEventIcon=(event)=>{
        return <IconsContainer border={"#ffff"} className="homeEventsIcons">
      
        </IconsContainer>
    }
        const getInvoiceEventIcon = (event) => {
            switch (event?.snapshot) {
                case "TO_BE_CONTROLLED":
                   return <IconsContainer border={"#fffff"}  className="homeEventsIcons"></IconsContainer>
                 case "TO_BE_VALIDATED":
                    return <IconsContainer border={"#fffff"}  className="homeEventsIcons"> <FontAwesomeIcon icon={faHourglassHalf} style={{marginRight:"7px",fontSize:"2rem",color:"#C8B0E6"}}/></IconsContainer>
                case "INTEGRATED":
                case "IMPORTED":
                    return <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{color:"#C8B0E6"}}/></IconsContainer>
                case "INTEGRATED":
                    return <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{color:"#C8B0E6"}}/></IconsContainer>
                case "REFUSED":
                case "REJECTED":
                case "ERROR":
                    return  <IconsContainer border={"#EE5A5A"} className="homeEventsIcons">
                    <FontAwesomeIcon   icon={faCircleXmark} style={{fontSize:"2rem",  color:"#EE5A5A"}}/>
                   </IconsContainer>
                    
                case "LITIGATION":
                    return <IconsContainer border={"#fff"} className="homeEventsIcons">
                         <FontAwesomeIcon icon={faCircleXmark} style={{fontSize:"2rem", color:"#EE5A5A"}}/>
                        </IconsContainer>
                case "TO_BE_PAID":
                case "PAID":
                    return <IconsContainer border={"#fff"} className="homeEventsIcons">
                    <FontAwesomeIcon icon={faFile} style={{fontSize:"2rem", color:"#2174B9 "}}/>
                   </IconsContainer>             
                // case "ERROR":
                //     return <HighlightOffIcon style={{color:"#EE5A5A"}} />
                // case "":
                //     return <HighlightOffIcon style={{color:"#EE5A5A"}} />
                // case "ERROR":
                //     return <HighlightOffIcon style={{color:"#EE5A5A"}} />
                default:
    
                    return event?.type=='USER_CHAT_EVENT'
                    ? <IconsContainer border={"#B8B8B8"} className="homeEventsIcons"><MessageIcon style={{color:"#B8B8B8",border:"#B8B8B8"}}/></IconsContainer> 
                    : <IconsContainer className="homeEventsIcons"><ArrowRightAltIcon style={{color:"#C8B0E6"}}/></IconsContainer>;
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
                case"NEW_SUPPLIER_ACCOUNT":
                return "#505050";
                default:
                    return theme.colors.warning;
            }
        }
    
        const getInvoiceEventRealTitle = (eventTmp) => {
            if(userType === 'client')
                return eventTmp?.data?.clientName ? eventTmp.data.clientName : eventTmp?.user?.entityName;
            return eventTmp?.data?.supplierName ? eventTmp.data.supplierName : eventTmp?.user?.entityName;
        }
    
        const getInvoiceEntityName = (event) => {
            return event?.data?.entityName
        }
    
    
        const getInvoiceEventMessage = (event) => {
            switch (event?.snapshot) {
                case "NEW":
                    return event?.message ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)`  : 'Facture : ' + event?.data?.number;
                    break;
                case "TO_BE_VALIDATED":
                    return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)`  : 'Facture : ' + event?.data?.number;
                    break;
                case "INTEGRATED":
                    return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                    break;
                case "ERROR":
                    return true? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                    break;
                case "TO_BE_CONTROLLED":
                    return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                    break;
                case "LITIGATION":
                    return true? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                case "REFUSED":
                case "REJECTED":
                    return true ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : 'Facture : ' + event?.data?.number;
                    break;
                default:
                    // return ( event?.snapshot)  ? event?.snapshot : "MessageVide";
                    return event?.type=='USER_CHAT_EVENT'
                    ? `Facture : ${event?.data?.number} (` + getInvoiceEventRealTitle(event) + `)` : "MessageVide";
            }
        }
        
    
        const getInvoiceEventTitle = (event) => {
            switch (event?.snapshot) {
                case "NEW":
                    return event?.message ? event?.message : 'Facture n°' + event?.data?.number + ' déposée';
                    break;
                case "TO_BE_CONTROLLED":
                    return  'Facture n°' + event?.data?.number + ' à contrôler';
                    break;
                case "TO_BE_VALIDATED":
                    return  'Facture n°' + event?.data?.number + ' à valider';
                    break;
                case "INTEGRATED":
                    return  'Facture n°' + event?.data?.number + ' intégrée';
                    break;
                case "ERROR":
                    return  'Facture en erreur ';
                    break;
                case "TO_BE_PAID":    
                   return  'Facture n°' + event?.data?.number + ' à payer';
                case "PAID":
                    return  'Facture n°' + event?.data?.number + ' payée';
                    break;
                case "LITIGATION":
                    return  'Facture n°' + event?.data?.number + ' en litige';
                    break;
                case "REFUSED":
                    return  'Facture n°' + event?.data?.number + ' refusée';
                    break;
                default:
                    return event?.type=='USER_CHAT_EVENT'
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
                    return  `Fournisseur activé`;
                case "DOCUMENT":
                    return  `Nouveau document`; //${event.snapshot}`;
                    // case "0":
                    // return  `Nouveau document`; ;
                default:
                    // return event?.type="NEW_SUPPLIER_ACCOUNT"? `Référencement : ${event?.data?.entity_id} (` + getInvoiceEventRealTitle(event) + `)`:"MessageVide";
                    // return event?.message != "" ? event?.message : "MessageVide";
                    return event?.type =='NEW_SUPPLIER_ACCOUNT'
                    ? `Référencement : REF${event?.entity_id} (` +event.name+ `)` : "MessageVide";
            }
        }
    
      

        const getGlobalTitle=(eventTmp)=>{
            if(eventTmp?.eventType === "entity"){
                return "A contrôler"
            }
            if(eventTmp?.eventType === "invoice"){
                return getStatusLabel(eventTmp?.snapshot)
            }
           
        }
        const navigateToEntity=(uid,type)=>{
            if( type === "DOCS"){
                localStorage.setItem("show", "document");
            }
            navigate("/supplierRequestDetail/"+uid)
        }
        const actionTo=(eventTmp)=>{
            if(eventTmp?.eventType === "entity"){
                navigateToEntity(eventTmp.entityUid,eventTmp.type)
            }
            if(eventTmp?.eventType === "invoice"){
                if(eventTmp?.snapshot === "TO_BE_CONTROLLED"){
                    eventTmp?.data&&navigate("/invoiceCommand/"+eventTmp?.data?.invoiceUid);
                }else
                    if(eventTmp?.snapshot === "TO_BE_VALIDATED"){
                        eventTmp?.data&&navigate("/invoiceIntegratedDetail/"+eventTmp?.data?.invoiceUid)
                    }else
                            {
                                eventTmp.hasOwnProperty("data") && eventTmp?.data&&navigate("/invoiceDetail/"+eventTmp?.data?.invoiceUid)
                            }
                
            }
            
            if(eventTmp?.eventType === "parapheurs"){
                eventTmp?.uidParapheur&&navigate("/paymentSignatureDetail/"+eventTmp?.uidParapheur)
            }
        }
        let eventsJsx = null;
    
        if(loading) 
            eventsJsx = (<Spinner />)
        else if (eventsList && eventsList?.length > 0){
            eventsJsx = eventsList?.map((eventTmp, index) => {
                    var eventJsx = null;
                    let isLast = index === 0
                    let color = theme.colors.warning;
                    let title = "";
                    let message = "";
                    let date = "";
                    let action = null;
                    let title2="";
                    let icon="";
                    switch (eventTmp?.eventType) {
                        case "invoice":
                            color = getInvoiceEventColor(eventTmp);
                            // title = eventTmp?.data?.supplierName ? eventTmp?.data?.supplierName : eventTmp?.user?.entityName;
                            //title = eventTmp?.message ? eventTmp?.message : 
                            title = getInvoiceEventTitle(eventTmp);
                            message =(eventTmp?.data?.supplierName?eventTmp?.data?.supplierName:"Entité inconnue");
                            date = "Date d'échéance : "+formatDate(+eventTmp?.data?.dueDate) + " " + getTimeDate(+eventTmp?.creationDate);
                            title2=getGlobalTitle(eventTmp);
                            icon=getInvoiceEventIcon(eventTmp);
                            // action = (eventTmp.hasOwnProperty("data") && eventTmp?.data ) ? (
                            //     <EventAction   onClick={() => navigate("/invoiceDetail/"+eventTmp?.data?.invoiceUid)}>
                            //         <span>voir</span>
                            //         <ArrowForwardIosIcon />
                            //     </EventAction>
                            // ) : null;
    
                            
                            break;
                        case "entity":
                            color = getEntityEventColor(eventTmp);
                            title =getEntityEventMessage(eventTmp);
                            //  eventTmp.type=="NEW_SUPPLIER_ACCOUNT"?"Demande de référencement": eventTmp?.name;
                            message = eventTmp.name;
                            date = "Date de création : "+formatDate(+eventTmp?.creationDate) + " " + getTimeDate(+eventTmp?.creationDate);
                            title2=getGlobalTitle(eventTmp);
                            icon=getEntityEventIcon(eventTmp);
                            action = (
                                <EventAction   onClick={() => navigateToEntity(eventTmp.entityUid,eventTmp.type)}>
                                    <span>voir</span>
                                    <ArrowForwardIosIcon />
                                </EventAction>
                            );
                            break;
                            case "parapheurs":
                                color = getEntityEventColor(eventTmp);
                                title = "Parapheur en attente de validation";
                                message =  `Parapheur ${eventTmp.paymentNumber}` ;
                                date = formatDate(+eventTmp?.creationDate) + " " + getTimeDate(+eventTmp?.creationDate);
    
    
            
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
                   <EventsHeader2>
                        <EventsTitle2>
                            {"Evènements"}
                        </EventsTitle2>
                        { <FontAwesomeIcon icon={faUserGear} className="iconStyle" onClick={(e) => setShowCustomEventModal(!showCustomEventModal)}/>}
                    </EventsHeader2>
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
        userType : state.auth.userType,
        login : state.auth.login
      })
    const mapDispatchToProps = dispatch => ({
    })
    export default connect(mapStateToProps, mapDispatchToProps) (Events)
    
    
import React, { useMemo } from 'react'
import Header from '../../../components/Header/Header'
import { AppBody, AppContainer, AppContent } from '../../../styles/App.styled';
import { Navigate, Route, useLocation, Routes, useNavigate } from 'react-router-dom';
import Menu from '../../Menu/Menu'
import Home from '../../Home/Home';
import HomeIcon from '@mui/icons-material/Home';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import BadgeIcon from '@mui/icons-material/Badge';
import ArticleIcon from '@mui/icons-material/Article';
import SaveIcon from '@mui/icons-material/Save';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useTranslation } from 'react-i18next';


function ClientRoot({ userLevel, userType }) {
    const { t } = useTranslation();
   

    


    const menuItems = useMemo(() => (
       
            [
                { isLink: true,key: 'Accueil', label: 'Accueil', pathname: '/', icon: <HomeIcon /> },
                {
                    isLink: false, label: 'Fournisseur', key: 'supplier', icon: <MoveToInboxIcon />, subMenu: [
                        { path: '/referentielFournisseur',hidden: false, label: t('navbar:referentielFournisseur', 'Référentiel') },
                        { path: '/fournisseurInvoices',hidden: false, label: t('navbar:invoiceTracking', 'Suivi des factures') },
                        "'validator".includes(userLevel) &&{ path: '/fournisseurInvoicesIntegrated',hidden: false, label: t('navbar:invoiceTrackHYGYHing', 'Validation des factures') },
                        { path: '/fournisseurInvoicesConciliation',hidden: false, label: t('navbar:invoiceTrackHYGYHing', 'Contrôle des factures') },
                        
                        { path: '/kpiSupplier',hidden: false, label: t('navbar:kpi', 'KPI') },
                        { path: '/suppliersAccountRequest',hidden: false, label: t('navbar:k', 'Demande de référencement') },
                        { path: '/embarquementSupplier',hidden: false, label: t('navbar:embarquement', 'Embarquement') },
                        { path: '/fournisseurCommandes',hidden: false, label: t('navbar:suiviCommandes', 'Suivi des commandes') }
                    ]
                },
                {
                    isLink: false, label: 'Client', key: 'client', icon: <BadgeIcon />, subMenu: [
                        { path: '/referentielClient',hidden: false, label: t('navbar:referentielClient', 'Référentiel') },
                        { path: '/clientInvoices',hidden: false, label: t('navbar:invoiceTracking', 'Suivi des factures') },
                        {path: '/clientCommandesDeadlineExceeded',hidden: false, label: t('Recouvrement')},
                        { path: '/kpiClient',hidden: false, label: t('navbar:kpi', 'KPI') },
                        { path: '/embarquementClient',hidden: false, label: t('navbar:embarquement', 'Embarquement') }
                    ]
                },
             
                "superAccountant, accountant".includes(userLevel) &&{ isLink: true, key: 'Parapheur',label: 'Parapheur', pathname: '/paymentSignature', icon: <ArticleIcon /> },
                {
                    isLink: false, label: 'PDP',pathname:'/pdpdashboard', key: 'pdp',isDiff:true, icon: <AdminPanelSettingsIcon />, subMenu: [
                        { path: '/pdpdashboard', hidden:false,hidden: true, label: t('navbar:emails', 'Dashboard') },
                        { path: '/annuairePlateFormePublic',hidden: false, label: t('navbar:annuairePPF', 'Annuaire PPF') },
                        { path: '/annuairesppflogs',hidden: false, label: t('navbar:elogs', 'Logs') },
                      
                        { path: '/annuaireechangespdpppf',hidden: false, label: t('navbar:Echangesppf', 'Échanges PDP PPF') }
                    ]
                },
                { isLink: true,key: 'Documentation', label: 'Documentation', pathname: '/documentation', icon: <ArticleIcon /> },
                {
                    isLink: false, label: 'Communication', key: 'communication', icon: <ChatBubbleIcon />, subMenu: [
                        { path: '/suiviCampagnes',hidden: false, label: t('navbar:suiviCampagnes', 'Suivi des campagnes') }
                    ]
                },
                { isLink: true,key: 'Extraction', label: 'Extraction', pathname: '/extraction', icon: <SaveIcon /> },
                {
                    isLink: false, label: 'Administration', key: 'administration', icon: <AdminPanelSettingsIcon />, subMenu: [
                        { path: '/entitiesManager',hidden: false, label: t('navbar:entitiesManager', 'Gestion des entités') },
                        { path: '/emailsContentSettings',hidden: false, label: t('navbar:emails', 'Emails') },
                        { path: '/emailsSettings',hidden: false, label: t('navbar:emailsSettings', 'Configuration envoi mail') }
                    ]
                },
                // { isLink: true, key: 'reporting',label: 'E-Reporting', pathname: '/reporting', icon: <AssessmentIcon /> }

            ]
           
    ), [t])



const submenu=()=>{
    let kk=menuItems;
    let k=  kk.filter(item => item !== false)
    let j= k.map(item => {
        if(item.subMenu !== undefined){
        return {...item, subMenu: item.subMenu.filter(item => item !== false)}
        }else{
        return item
        }
    })
    return j


}

console.log(submenu())
console.log(menuItems)









    // const isOverflow=()=>{
        
    //     if(location.pathname.split('/')[1]=="invoiceCommand") {      
    //        return false;
    //     }
    //        else{
    //         return true;
    //        }      
    // }             
    return (
        <>
            <AppContainer>
                <Header />
                <AppBody>
                    <Menu items={submenu()} userType={userType} />
                    <AppContent >
                        <Routes>
                           
                           
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </AppContent>
                </AppBody>
            </AppContainer>
        </>
    )

}


export default ClientRoot


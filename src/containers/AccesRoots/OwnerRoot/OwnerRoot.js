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
// import WalletIcon from '@mui/icons-material/Wallet';

function OwnerRoot({ userLevel, userType }) {
    const { t } = useTranslation();
   

    


    const menuItems = useMemo(() => (

        [
            { isLink: true, key: 'Accueil', label: 'Accueil', pathname: '/', icon: <HomeIcon /> },
            {
                isLink: false, label: 'Bailleurs', key: 'Bailleurs', icon: <MoveToInboxIcon />, subMenu: [
                    { path: '/referentielFournisseur', hidden: false, label: t('navbar:referentieBailleur', 'Référentiel') },
                    { path: '/fournisseurInvoices', hidden: false, label: t('navbar:suiviBailleur', 'Suivi bailleur') },
                    //"'validator".includes(userLevel) &&{ path: '/fournisseurInvoicesIntegrated',hidden: false, label: t('navbar:invoiceTrackHYGYHing', 'Validation des factures') },
                    //{ path: '/fournisseurInvoicesConciliation',hidden: false, label: t('navbar:invoiceTrackHYGYHing', 'Contrôle des factures') },

                    { path: '/kpiSupplier', hidden: false, label: t('navbar:kpi', 'KPI') },

                ]
            },
            {
                isLink: false, label: 'Back office', key: 'backOffice', icon: <AdminPanelSettingsIcon />, subMenu: [

                    { path: '/reception', hidden: false, label: t('navbar:emails', 'Réception') },
                    { path: '/controleEnquete', hidden: false, label: t('navbar:emailsSettings', 'Controle enquete') },
                    { path: '/suiviEnquete', hidden: false, label: t('navbar:emailsSettings', 'Suivi enquete') },
                    { path: '/saisie', hidden: false, label: t('navbar:emailsSettings', 'Tools') },
                    { path: '/Creation des utilisateurs', hidden: false, label: t('navbar:emailsSettings', 'Création des utilisateurs') }
                ]
            },

            //"superAccountant, accountant".includes(userLevel) &&{ isLink: true, key: 'Parapheur',label: 'Parapheur', pathname: '/paymentSignature', icon: <ArticleIcon /> },

            //{ isLink: true,key: 'Documentation', label: 'Documentation', pathname: '/documentation', icon: <ArticleIcon /> },

            { isLink: true, key: 'Declaration', label: 'Déclaration', pathname: '/declaration', icon: <SaveIcon /> },
            {
                isLink: false, label: 'Exploitation informatique', key: 'exploitation', icon: <AdminPanelSettingsIcon />, subMenu: [

                    { path: '/importFichier', hidden: false, label: t('navbar:emails', 'Import fichier') },
                    { path: '/exportComposition', hidden: false, label: t('navbar:emailsSettings', 'Export composition') },
                    { path: '/exportRestitution', hidden: false, label: t('navbar:emailsSettings', 'Export Restitution') },
                    { path: '/tools', hidden: false, label: t('navbar:emailsSettings', 'Tools') },
                    { path: '/Creation des utilisateurs', hidden: false, label: t('navbar:emailsSettings', 'Création des utilisateurs') }
                ]
            },
            {
                isLink: false, label: 'Administration', key: 'administration', icon: <AdminPanelSettingsIcon />, subMenu: [

                    { path: '/gestionAccesExterns', hidden: false, label: t('navbar:emails', 'Gestion des accés externes') },
                    { path: '/modeMaintenance', hidden: false, label: t('navbar:emailsSettings', 'Mode maintenance') }
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

export default OwnerRoot

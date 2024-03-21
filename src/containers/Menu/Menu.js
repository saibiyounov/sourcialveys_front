import React, { useState, useEffect, useMemo } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import SmallNavBar from '../../components/SmallNavBar/SmallNavBar';
import { useNavigate, useLocation } from 'react-router-dom';
function Menu({ items, userType }) {
  const [activeNav, setActiveNav] = useState(localStorage.getItem('activeNavBar') || 'navBar');
  const [activeNavLink, setActiveNavLink] = useState(localStorage.getItem('activeNavLink') || '');
  let location = useLocation();

  const pathtems = useMemo(() => (
    [
      { path: '/' },
      { path: '/referentielFournisseur' },
      { path: '/fournisseurInvoices' },
      { path: '/fournisseurInvoicesIntegrated' },
      { path: '/fournisseurInvoicesConciliation' },
      { path: '/kpiSupplier' },
      { path: '/suppliersAccountRequest' },
      { path: '/embarquementSupplier' },
      { path: '/fournisseurCommandes' },
      { path: '/referentielClient' },
      { path: '/clientInvoices' },
      { path: '/clientCommandesDeadlineExceeded' },
      { path: '/kpiClient' },
      { path: '/embarquementClient' },
      { path: '/pdpdashboard' },
      { path: '/pdpdashboard' },
      { path: '/annuairePlateFormePublic' },
      { path: '/annuairesppflogs' },
      { path: '/annuaireechangespdpppf' },
      { path: '/documentation' },
      { path: '/suiviCampagnes' },
      { path: '/extraction' },
      { path: '/entitiesManager' },
      { path: '/emailsContentSettings' },
      { path: '/emailsSettings' },
      { path: '/reporting' },
      { path: '/paymentSignature' }
    ]
  ), [])


  useEffect(() => {

    let exist = pathtems.some(item => item.path == location.pathname)

    if (exist) {
      localStorage.setItem('activeNavLink', location.pathname);
      setActiveNavLink(location.pathname)
    }

  }, [location.pathname])

  const toggleNav = () => {
    switch (activeNav) {
      case 'navBar':
        localStorage.setItem('activeNavBar', 'smallNavBar');
        setActiveNav('smallNavBar');
        break;
      case 'smallNavBar':
        localStorage.setItem('activeNavBar', 'navBar');
        setActiveNav('navBar');
        break;
      default:
        break;
    }
  }

  return (
    <>
      {
              activeNav === 'navBar' ?
                  <NavBar userType={userType} activeNavLink={activeNavLink} setActiveNavLink={setActiveNavLink} toggleNav={toggleNav} items={items} /> :
                  <SmallNavBar activeNavLink={activeNavLink} setActiveNavLink={setActiveNavLink} toggleNav={toggleNav} items={items} />
      }
    </>
  )
}

export default Menu
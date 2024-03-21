import React, { useEffect, useMemo, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
import { NavBarContainer, NavHeader, NavLogo, ReduceIcon, NavMenu, NavItem, NavLink, NavFooter, NavIcon, NavBtn } from './SmallNavBar.styled.js';
import SubNav from './SubNav/SubNav';
import { useNavigate, useLocation } from 'react-router-dom';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import BadgeIcon from '@mui/icons-material/Badge';
import ArticleIcon from '@mui/icons-material/Article';
import SaveIcon from '@mui/icons-material/Save';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { CTooltip } from '../UI/CTooltip/CTooltip'

function SmallNavBar({toggleNav, items}) {
    const {t} = useTranslation();
    const [activeNav, setActiveNav] = useState(localStorage.getItem('activeNav') ? localStorage.getItem('activeNav') : '');
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const navigate = useNavigate();
    let location = useLocation()

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key].find(p => value.includes(p.path)));
    }
    // function getKeyByPath(array, pathValue) {
    //     for (let index = 0; index < array.length; index++) {
    //         const item = array[index];
    //         if(item.subMenu.find(e => pathValue.includes(e.path)))  
    //             return item.key;
    //     }
    //     return null
    // }
    //reset active nav when changing route
    // useEffect(() => {
    //     setActiveSubMenu(null);
    //     let btnItems = items.filter(item => !item?.isLink)
    //     getKeyByPath(btnItems, location.pathname) ? setActiveNav(getKeyByPath(btnItems, location.pathname)) : setActiveNav('');
    // }, [location.pathname, items])

    const navBtnClickHandler = (navTo) => {
        setActiveSubMenu(navTo)
        // const isActive = activeNav === navTo;
        // if(!isActive){
        //     localStorage.setItem('activeNav', navTo);
        //     setActiveNav(navTo);
        //     navigate(menuItems[navTo][0].path);
        // }
    }





    function getKeyByPath(array, pathValue) {
      
        for (let index = 0; index < array.length; index++) {
            const item = array[index];
                    if (!item.isLink && item?.subMenu?.find(e => pathValue.includes(e.path)))
                    return item.key;
                    if(item?.isLink && pathValue===item.pathname)
                    return item.key;
                                   
        }
        return activeNav
                     
      
    }
    //reset active nav when changing route
    useEffect(() => {


        setActiveSubMenu(null);
        
        console.log(getKeyByPath(items, location.pathname))
        getKeyByPath(items, location.pathname) ? setActiveNav(getKeyByPath(items, location.pathname)) : setActiveNav('');
    }, [location.pathname, items])

    // const navBtnClickHandler = (navTo) => {
    //     const isActive = activeNav === navTo;
    //     if (!isActive) {
    //         let item = items.find(item => item?.key === navTo);
    //         let subMenuItems = items.find(item => item?.key === navTo).subMenu;
    //         localStorage.setItem('activeNav', navTo);
    //         setActiveNav(navTo);
    //         if (item?.isLink){
    //             navigate(item.pathname);
    //             localStorage.setItem('activeNavLink', item.pathname);
    //             setActiveNavLink(item.pathname)
    //         }   
    //             else{
    //                 navigate(subMenuItems[0].path);
    //                 localStorage.setItem('activeNavLink', subMenuItems[0].path);
    //                 setActiveNavLink(subMenuItems[0].path)
    //             }
       
    //     }
    // }


  return (
      <>
        <NavBarContainer>
            <NavHeader>
                <ReduceIcon onClick={toggleNav}>
                    <MenuIcon />
                </ReduceIcon>
            </NavHeader>
            <NavMenu>
                {
                    (items && items.length > 0) && items.map((item, index) => {
                        if(item?.isLink)
                            return (
                                <NavItem key={index}>
                                    <CTooltip title={item.label} placement="right">
                                    <NavBtn isActive={activeNav === item.key} onClick={() => {navBtnClickHandler(item.key,item.pathname);navigate(item.pathname)}}>
                                                    <NavIcon>
                                                        {item.icon}
                                                    </NavIcon>
                                                
                                            </NavBtn>
                                    </CTooltip>
                                </NavItem>
                            )
                        else
                            if (item?.isDiff && item?.subMenu) {
                                return (
                                    <NavItem key={index}>
                                        <CTooltip title={item.label} placement="right">
                                            <NavBtn isActive={activeNav === item.key} onClick={() => {navBtnClickHandler(item.key,item.pathname);navigate(item.pathname)}}>
                                                    <NavIcon>
                                                        {item.icon}
                                                    </NavIcon>
                                                
                                            </NavBtn>
                                        </CTooltip>
                                    
                                        {
                                              activeSubMenu === item.key && <SubNav menuItems={item.subMenu.slice(1,item.subMenu.length)} close={() => setActiveSubMenu(null)} />
                                        }
                                    </NavItem>
                                )
                            } else
                            return (
                                <NavItem key={index}>
                                    <CTooltip title={item.label} placement="right">
                                        <NavBtn isActive={activeNav === item.key} onClick={() => navBtnClickHandler(item.key)}>
                                            <NavIcon>{item.icon}</NavIcon>
                                        </NavBtn>
                                    </CTooltip>
                                    {
                                        activeSubMenu === item.key && <SubNav menuItems={item.subMenu} close={() => setActiveSubMenu(null)} />
                                    }
                                </NavItem>
                            )
                    })
                }
            </NavMenu>
        </NavBarContainer>
      </>
  );
}

export default SmallNavBar;

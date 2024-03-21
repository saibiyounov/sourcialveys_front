import React, { useEffect, useMemo, useState } from 'react';
// import logoAdmin from '../../assets/images/ICD-international-logo.png';
import logoAdmin from '../../assets/images/LogoRotiflex.png';
import logoSupplier from '../../assets/images/ingramLogo.png';
import logoCustomer from '../../assets/images/biosaladLogo.png';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';
import { NavBarContainer, NavHeader, NavLogo, ReduceIcon, NavMenu, NavItem, NavLink, NavFooter, NavIcon, NavBtn } from './NavBar.styled.js';
import SubNav from './SubNav/SubNav';
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar({ toggleNav, items, setActiveNavLink, activeNavLink, userType }) {
    const { t } = useTranslation();
    const [activeNav, setActiveNav] = useState(localStorage.getItem('activeNav') ? localStorage.getItem('activeNav') : '');
    const navigate = useNavigate();
    let location = useLocation()

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key].find(p => value.includes(p.path)));
    }

    function getKeyByPath(array, pathValue) {

        for (let index = 0; index < array.length; index++) {
            const item = array[index];
            if (!item.isLink && item?.subMenu?.find(e => pathValue.includes(e.path)))
                return item.key;
            if (item?.isLink && pathValue === item.pathname)
                return item.key;

        }
        return activeNav


    }
    //reset active nav when changing route
    useEffect(() => {


        let btnItems = items.filter(item => !item?.isLink)

        console.log(getKeyByPath(items, location.pathname))
        getKeyByPath(items, location.pathname) ? setActiveNav(getKeyByPath(items, location.pathname)) : setActiveNav('');
    }, [location.pathname, items])

    const navBtnClickHandler = (navTo) => {
        let item = items.find(item => item?.key === navTo);
        let subMenuItems = items.find(item => item?.key === navTo).subMenu;
        localStorage.setItem('activeNav', navTo);
        setActiveNav(navTo);
        if (item?.isLink) {
            navigate(item.pathname);
            localStorage.setItem('activeNavLink', item.pathname);
            setActiveNavLink(item.pathname)
        }
        else {
            navigate(subMenuItems[0].path);
            localStorage.setItem('activeNavLink', subMenuItems[0].path);
            setActiveNavLink(subMenuItems[0].path)
        }

    }

    const getUserTypeIcon = () => {
        switch (localStorage.getItem('type')) {
            case 'supplier':
                return <img src={logoSupplier} alt="logoSupplier" />
                break;
            case 'client':
                return <img src={logoCustomer} alt="logoCustomer" />
                break;
            case 'owner':
                return <img src={logoAdmin} alt="logoAdmin" />
                break;
            default:
                return   <img src={logoAdmin} alt="logoAdmin" />
                break;
        }
    }

    return (
        <>
            <NavBarContainer>
                <NavHeader>
                    <NavLogo to={{ pathname: "/" }}>

                        {
                            //getUserTypeIcon()
                        }
                    </NavLogo>
                    <ReduceIcon onClick={toggleNav}>
                        <CloseFullscreenIcon className="IBlue" />
                    </ReduceIcon>
                </NavHeader>
                <NavMenu>
                    {
                        (items && items.length > 0) && items.map((item, index) => {
                            if (item?.isLink) {
                                return (
                                    <NavItem key={index}>
                                        <NavBtn isActive={activeNav === item.key} onClick={() => navBtnClickHandler(item.key)}>
                                            <NavIcon>{item.icon}</NavIcon>
                                            <span>{item.label}</span>
                                        </NavBtn>

                                    </NavItem>
                                )
                            }
                           else
                                    return (
                                        <NavItem key={index}>
                                            <NavBtn isActive={activeNav === item.key} onClick={() => navBtnClickHandler(item.key)}>
                                                <NavIcon>{item.icon}</NavIcon>
                                                <span>{item.label}</span>
                                            </NavBtn>
                                            {
                                                activeNav === item.key && <SubNav activeNavLink={activeNavLink} menuItems={item.subMenu} />
                                            }
                                        </NavItem>
                                    )

                        })
                    }
                </NavMenu>
                <NavFooter>
                    <p style={{ color: "#2174B9" }}>
                        {t("default:copyright", `© ${new Date().getFullYear()} simple `)}
                    </p>
                </NavFooter>
            </NavBarContainer>
        </>
    );
}

export default NavBar;

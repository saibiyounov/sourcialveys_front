import React from 'react';
import { SubNavContainer, SubNavItem, SubNavLink} from './SubNav.styled.js';
function SubNav({menuItems,activeNavLink}) {
    const navBtnClickLink = (navTo) => {
     
        localStorage.setItem('activeNavLink', navTo);
       
    }
  return (
      <>
        <SubNavContainer>
            <SubNavItem>
                {
                    // menuItems.filter(item => item.hidden == false).map((item, index) => (
                    menuItems.map((item, index) => (
                        <SubNavLink
                            key={index}
                            to={item.path}
                            activeLink={activeNavLink===item.path}
                           
                        >
                            {item.label}
                        </SubNavLink>
                ))}
            </SubNavItem>
        </SubNavContainer>
      </>
  );
}

export default SubNav;

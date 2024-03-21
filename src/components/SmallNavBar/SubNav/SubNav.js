import React, { useEffect, useRef } from 'react';
import { SubNavContainer, SubNavItem, SubNavLink} from './SubNav.styled.js';
function SubNav({menuItems, close}) {
    const snRef = useRef();

    const clickOutSideHandler = e => {
        if(snRef.current.contains(e.target)) {
            // inside the div
            return
        }
        // outside click
        close()
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutSideHandler);

        return () => {
            document.removeEventListener("mousedown", clickOutSideHandler);
        }
    }, [])

  return (
      <>
        <SubNavContainer ref={snRef}>
            <SubNavItem>
                {
                    menuItems.map((item, index) => (
                        <SubNavLink
                            key={index}
                            to={item.path}
                            activeClassName="active"
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

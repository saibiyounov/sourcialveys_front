import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SubNavContainer = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
`

export const SubNavItem = styled.li`
    /* margin-bottom: 1rem; */
`

export const SubNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 0 0.5rem 4.25rem;
    color: ${({theme}) => theme.colors.secondary};
${({activeLink,theme}) => activeLink && `
      color: ${theme.colors.primary};
    `
}

    &:hover {
        color: ${({theme}) => theme.colors.primary};
    }

    &.${({activeClassName}) => activeClassName} {
        color: ${({theme}) => theme.colors.primary};
    }

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        padding: 0.5rem 0 0.5rem 4.25rem;
    }
`
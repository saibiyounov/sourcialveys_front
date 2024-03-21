import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SubNavContainer = styled.ul`
    position: absolute;
    top: 0;
    left: calc(100% + 1.1rem);
    z-index: 200;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    width: fit-content;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 15px;

    &:before {
        content: '';
        position: absolute;
        top: 10px;
        left: -0.8rem;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 15px 10px 0;
        border-color: transparent #ffffff transparent transparent;
    }
`

export const SubNavItem = styled.li`
    /* margin-bottom: 1rem; */
`

export const SubNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem 0.5rem 1rem;
    white-space: nowrap;
    color: ${({theme}) => theme.colors.secondary};

    &:hover {
        color: ${({theme}) => theme.colors.primary};
    }

    &.${({activeClassName}) => activeClassName} {
        color: ${({theme}) => theme.colors.primary};
    }

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        /* padding: 0.5rem 0 0.5rem 4.25rem; */
    }
`
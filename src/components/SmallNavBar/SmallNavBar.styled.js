import styled from 'styled-components';
import { NavLink as LinkN, Link } from 'react-router-dom';

export const NavBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* width: 320px; */
    /* min-width: 320px; */
    width: fit-content;
    height: calc(100vh - 45px);
    padding: 2rem 1rem;
    position: sticky;
    top: 0;
    z-index: 200;

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        /* width: 240px;
        min-width: 240px; */
    }
`
export const NavHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;
`
export const ReduceIcon = styled.div`
    display: flex;
    width: 61px;
    justify-content: center;
    padding: 0.5rem;
    cursor: pointer;

    & svg {
        width: 2rem;
        height: 2rem;
        fill: ${({theme}) => theme.colors.secondary};
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    flex: 1;
    padding: 0;
    margin: 0;
    width: 100%;
    font-size: 0.9rem;

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        font-size: 0.8rem;
    }
`

export const NavItem = styled.li`
    margin: 0;
    width: fit-content;
    margin-bottom: 0.5rem;
    position: relative;
`

export const NavLink = styled(LinkN)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 61px;
    height: 59px;
    /* background-color: #2174B9; */
    border-radius: 50%;
    color: ${({theme}) => theme.colors.secondary};
    text-decoration: none;

    & span {
        font-weight: 500;
        margin-left: 1rem;
    }

    &:hover {
        background-color: #ffffff;
        color: ${({theme}) => theme.colors.primary};
        box-shadow: 0px 3px 6px #00000029;
        transition: all 0.5s ease-in-out;
    }

    &.${({activeClassName}) => activeClassName} {
        background-color: #ffffff;
        color: ${({theme}) => theme.colors.primary};
        box-shadow: 0px 3px 6px #00000029;
    }

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        /* height: 40px; */
    }
`

export const NavBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 61px;
    height: 59px;
    background-color: ${({isActive, theme}) => isActive ? "#ffffff" : theme.colors.body};
    border-radius: 50%;
    color: ${({isActive, theme}) => isActive ? theme.colors.primary : theme.colors.secondary };
    text-decoration: none;
    cursor: pointer;
    box-shadow: ${({isActive, theme}) => isActive ? "0px 3px 6px #00000029" : "none"};

    & span {
        font-weight: 500;
        margin-left: 1rem;
    }

    &:hover {
        background-color: #ffffff;
        color: ${({theme}) => theme.colors.primary};
        box-shadow: 0px 3px 6px #00000029;
        transition: all 0.5s ease-in-out;
    }

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        /* height: 40px; */
    }
`

export const NavIcon = styled.div`
    margin-bottom: 6px;

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        /* & svg {
            width: 20px;
        } */
    }
`
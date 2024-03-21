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
export const NavLogo = styled(Link)`
    display: flex;
    width: 182px;
    height: 100px;

    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        height: 40px;
    }
`
export const ReduceIcon = styled.div`
    display: flex;
    background-color: #ffffff;
    color: #505050 !important;
    border-radius: 50%;
    padding: 0.5rem;
    cursor: pointer;
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
    width: 100%;
    margin-bottom: 0.5rem;
`

export const NavLink = styled(LinkN)`
    display: flex;
    align-items: center;
    width: 100%;
    height: 59px;
    /* background-color: #2174B9; */
    border-radius: 40px 0px;
    color: ${({theme}) => theme.colors.secondary};
    text-decoration: none;
    padding: 0 30px;

    & span {
        font-weight: 500;
        margin-left: 1rem;
    }

    &:hover {
        background-color: ${({theme}) => theme.colors.primary};
        color: #ffffff;
        transition: all 0.5s ease-in-out;
    }

    &.${({activeClassName}) => activeClassName} {
        background-color: ${({theme}) => theme.colors.primary};
        color: #ffffff;
    }

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        height: 40px;

        & span {
            margin-left: 1rem;
        }
    }
`

export const NavBtn = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 59px;
    background-color: ${({isActive, theme}) => isActive ? theme.colors.primary : theme.colors.body};
    border-radius: 40px 0px;
    color: ${({isActive, theme}) => isActive ? '#FFFFFF' : theme.colors.secondary};
    text-decoration: none;
    padding: 0 30px;
    cursor: pointer;

    & span {
        font-weight: 500;
        margin-left: 1rem;
    }

    &:hover {
        background-color: ${({theme}) => theme.colors.primary};
        color: #ffffff;
        transition: all 0.5s ease-in-out;
    }

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        height: 40px;

        & span {
            margin-left: 1rem;
        }
    }
`

export const NavIcon = styled.div`
    margin-bottom: 6px;

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        & svg {
            width: 20px;
        }
    }
`

export const NavFooter = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 500;
    color: ${({theme}) => theme.size.primary} !important;
    font-size: 0.9rem;
    & p {
        color: ${({theme}) => theme.size.primary} !important;
    }
    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        font-size: 0.8rem;
    }

`
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 45px;
    font-size: 0.8rem;
    padding: 0.25rem 0;
`;

export const HeaderLinks = styled.div`
    height: 100%;
    width: 500px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-right: 4rem;
`;

export const Hlink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: ${({theme}) => theme.colors.primary };
    padding: 0.5rem;
    
    & span {
        margin-left: 0.25rem;
    }
    & span:hover {
        color: ${({theme}) => theme.colors.secondary };
    }
    :hover{
        color: ${({theme}) => theme.colors.secondary };
    }
`;

export const HLang = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
`;

export const HTheme = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    color: ${({theme, isActive}) => isActive ? theme.colors.primary : theme.colors.secondary};
    cursor: pointer;

    & span {
        color: ${({lcolor}) => lcolor || '#063E53'} ;
        margin-left: 0.25rem;
    }
`;


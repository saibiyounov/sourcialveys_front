import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const EventsContainer = styled.div`
    border: 1px solid rgba(217, 225, 231, 0.8);
    border-radius: 16px;
    padding: 1rem 1rem;
    margin-bottom: 0.5rem;
    width: 100%;
    height: 420px;
    display: flex;
    flex-direction: column;    

    @media (min-width: ${({theme}) => theme.size.tablet}) and (max-width: ${({theme}) => theme.size.laptop}) {
        width: 100%;
        height: 400px;
    }
`

export const EventsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 0 0.5rem 0;
    flex-direction:column ;
`

export const EventsTitle = styled.h4`
    width:100% ;
    display:flex ;
    justify-content:center ;
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
    color: #2174B9;
`

export const EventsList = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
    padding: 0px 7px 0px 0px;
    margin: 0;
    height: 100%;
    overflow-y: auto;
`

export const EventsItem = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0.7rem 0;
    cursor: pointer;
    justify-content:space-between ;
`

export const EventColor = styled.div`
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin-right: 0.5rem;
`

export const EventValue = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    /* max-width: calc(100% - 84px); */
`

export const IconsContainer = styled.span`
    border:2px solid ${({border,theme}) =>border?border: '#C8B0E6'};
    padding: 0.2rem;
    max-width: 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
 
`

export const EventsTitle2 = styled.h4`
    font-size: 1.2rem;
    font-weight: 500;
    margin: auto;
    color: #2174B9;
`
export const EventsHeader2 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 0 0.5rem 0;
`

export const EventVal = styled.h6`
    font-size: 0.8rem;
    margin: 0;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-style: normal;
    color: ${({theme}) => theme.colors.lightBlack};
`

export const EventValT2 = styled.h6`
   
 font-size:0.9rem ;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-style: normal;
    color: ${({color,theme}) => color?color:theme.colors.secondary};
`

export const EventMessage = styled.h4`
    font-size: 0.9rem;
    /* font-weight: bold; */
    font-style: normal;
    cursor: pointer;
    margin: 0;
    color: ${({theme}) => theme.colors.primary};
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
`

export const EventDate = styled.h6`
    font-size: 0.8rem;
    //font-weight: 500;
    margin: 0;
    font-style: normal;
    color: ${({theme}) => theme.colors.secondary};
`

export const EventAction = styled.div`
    display: flex;
    align-items: center;
    color: #707070;
    cursor: pointer;

    & span {
        font-size: 0.9rem;
    }

    &:hover {
        color: ${({theme}) => theme.colors.secondary};
    }
`

export const EventFilterItem = styled.div`
    display: flex;
    align-items: center;
    margin: 0.25rem;
    cursor: pointer;
    width: 100%;

    & span {
        font-size: 0.9rem;
    }

`
export const ISNavContainer = styled.div`
    width: 100%;
    margin-bottom: 0.6rem;
    margin-top: 19px;
`

export const ISNavContent = styled.div`
    width: 100%;
    height: 90%;
    flex: 1;
`

export const NavTabsUl = styled.ul`            
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const NavTabsLi = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3rem;
    /* background-color: white; */
    `

export const NavTabsLink = styled(Link)`
    font-weight: 500;
    color: ${({theme,color}) => color?color: theme.colors.secondary};
    border-bottom: ${({active, theme}) => active ? `5px solid #809FB8` : '5px solid white'};
    text-decoration: none;
    padding-bottom: 0.3rem;
    font-size: 1rem;
    &:hover {
        color: ${({theme}) => theme.colors.primary};
        border-bottom: 5px solid ${({theme}) => theme.colors.primary};
    }
`
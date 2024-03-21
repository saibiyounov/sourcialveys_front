import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const HomeHeader = styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: 3px solid #F5FBFF;
`

export const HeaderInfos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: baseline;
`

export const HeaderLocation = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: rgb(33, 116, 185)
    
`

export const HeaderTitle = styled.h4`
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
    color: #809FB8;
`

export const HeaderActions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 1;
`

export const HeaderAction = styled.div`
    /* width: 100%; */
    height: 50px;
    margin-left: 1rem;
`;




export const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0.5rem 1rem;
    border: 2px solid #D9E1E7;
    border-radius: 16px;
    color: #D9E1E7;

`

export const SearchInput = styled.input`
    border: none;
    outline: none;
    color: ${({theme}) => theme.colors.lightBlack};
    font-size: 0.8rem;
    &:focus{
        outline: none;
        color: ${({theme}) => theme.colors.primary} !important;
    }

    &::placeholder {
        color: ${({theme}) => theme.colors.primary} !important;
        font-style: italic;
    }
    &:focus-within {
        // border: 2px solid #2174B9;
        color: ${({theme}) => theme.colors.lightBlack};
    }
`

export const ActionWrapper = styled.div`
    display: flex;
    justify-content: space-between ;
    align-items: center;
    height: 100%;
    padding: 0.5rem 1rem;
    border: 2px solid #D9E1E7;
    border-radius: 16px;
    color: #D9E1E7;
    cursor: pointer;
    flex-wrap: wrap;
`

export const ActionLabel = styled.h4`
    font-size: 0.9rem;
    color: #505050 !important;
    margin: 0 0.5rem 0 0;
`
export const HomeBody = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 1rem;
`

export const HomeCards = styled.div`
    width: 100%;
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (min-width: ${({theme}) => theme.size.tablet}) and (max-width: ${({theme}) => theme.size.laptop}) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        /* width: 240px;
        min-width: 240px; */
    }
`

export const HomeStats = styled.div`
    width: 100%;
    height: fit-content;
    /* height: 400px; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2rem 0;
`

export const HomeInvoices = styled.div`
    width: 100%;
    border: 1px solid #D9E1E7CC;
    border-radius: 16px;
    padding: 2rem 1rem;
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
    font-size: 15px;
    &:hover {
        color: ${({theme}) => theme.colors.primary};
        border-bottom: 5px solid ${({theme}) => theme.colors.primary};
    }
`

  

export const RowDivContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  
 
`

export const FirstDiv = styled.div`
    width: 40%;
    display:flex ;
    flex-direction: column;
 
`

export const SecendDiv = styled.div`
    width: 59%;
    display:flex ;
    flex-direction: column;
    border:1px solid #D9E1E7CC;
    border-radius: 16px;
    padding: 1rem;
    height: 848px;

`
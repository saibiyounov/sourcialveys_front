import styled from 'styled-components';

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 22%;
    min-width: fit-content;
    height: 100%;
    border: 1px solid #D9E1E7CC;
    border-radius: 16px;
    padding: 1rem 2rem;
    margin-bottom: 0.5rem;

    @media (max-width: ${({theme}) => theme.size.laptopL}) {
        padding: 1rem 1rem;
    }
    @media (min-width: ${({theme}) => theme.size.tablet}) and (max-width: ${({theme}) => theme.size.laptop}) {
        width: 100%;
    }
`

export const CardHeader = styled.div`
    // display: flex;
    width: 100%;
`;

export const CardInfos = styled.div`
    display: flex; 
    justify-content: center;
    margin-bottom: 0.5rem;
`

export const CardIcon = styled.div`
    margin: -5px 7px 2px 0px;
`

export const CardPercentage = styled.div`
    display: flex;
    color: ${({isIncreasing, theme}) => isIncreasing ? theme.colors.success : theme.colors.danger};
`

export const DPercentage= styled.div`
      display: flex;
      width: 100%;
      justify-content: end;
   
`
export const CardPercentageIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    border-radius: 50%;
    transform: rotate(45deg);
    background-color: ${({isIncreasing, theme}) => isIncreasing ? theme.colors.greenLight : theme.colors.redLight};
`

export const CardPercentageValue = styled.h4`
    font-size: 0.8rem;
    font-weight: bold;
    margin: 0 0 0 0.5rem;
    color: #505050 !important;
    & span {
        margin-left: 00.25rem;
    }
`

export const CardTitle = styled.h3`
    margin-bottom: 39px;
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.secondary};
    text-align: center;
`

export const CardBody = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

export const CardValue = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: ${({theme}) => theme.colors.lightBlack} !important;
    margin: 0;
`
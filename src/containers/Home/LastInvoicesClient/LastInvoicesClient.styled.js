import styled from 'styled-components';

export const LIContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const LIHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
`

export const LITitle = styled.h4`
    font-size: 1.2rem;
    /* font-weight: bold; */
    margin: 0;
    padding: 0;
    color: #2174B9;
`

export const LIActions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 1;
`;

export const LITableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
`;
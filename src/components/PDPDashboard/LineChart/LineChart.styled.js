import styled from 'styled-components';

export const LineChartContainer = styled.div`
    width: 65%;
    height: 400px;

    & canvas {
        width: 100% !important;
    }

    @media (min-width: ${({theme}) => theme.size.tablet}) and (max-width: ${({theme}) => theme.size.laptop}) {
        width: 100%;
    }
`
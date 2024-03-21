import styled from 'styled-components';

export const EFContainer = styled.div`
    position: relative;
    /* margin: 0 5px; */
    z-index: 100;
`;

export const EFIcon = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.secondary};
`;

export const EFContent = styled.div`
    display: flex;
    width: max-content;
    flex-direction: column;
    /* align-items: center; */
    position: absolute;
    background-color: ${({ theme }) => theme.colors.content};
    /* border: 2px solid #706E6B; */
    border: 2px solid #D9E1E7;
    color: ${({ theme }) => theme.colors.lightBlack};;
    /* top: 60px;
    right: -20px; */
    /* padding: 10px 0.5rem; */
    border-radius: 5px;
    font-size: 0.8rem;
    padding: 0.25rem;
    top: 100%;
    right: 0;

    &:before {
        content: "";
        position: absolute;
        top: -12px;
        right: 0;
        transform: translateX(-50%);
        border: 5px solid;
        /* border-color: transparent transparent #706E6B transparent; */
        border-color: transparent transparent #e8e8e8 transparent;
    }
`;

export const EFItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0;
    cursor: pointer;

    & span {
        margin-right: 0.25rem;
    }

    & svg {
        color: ${({ active, theme }) => active ? theme.colors.primary :  theme.colors.secondary};
    }
`



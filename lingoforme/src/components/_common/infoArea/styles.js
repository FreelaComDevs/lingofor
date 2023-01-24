import styled from 'styled-components';

export const Info = styled.div`               
    padding: 4px
    background-color: #fff;
    border-radius: 4px;
    border-bottom: 3px solid #004FFF;
`;

export const Rating = styled.div`
    display: flex;
    flex-direction: column;

    .rating{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 8px;
        font-size: 14px;
    }

    .rating-number{
        font-size: 18px;
        font-weight: 700;
        color: #004FFF;
    }

    .flag{
        align-self: center;
        margin: 0 !important;
    }

    .star{
        color: #FDC35E;                
    }
`
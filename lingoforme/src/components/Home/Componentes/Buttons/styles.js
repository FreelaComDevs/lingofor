import styled from 'styled-components';

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    hr{
        position: absolute;
        width: 85%;
        z-index: -1;
    }

    button{
        background-color: #004FFF;
        width: auto;
        height: 38px;
        border-radius: 26px;
        border: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        margin: 48px 25px 20px 0;
        font-size: 14px;
        font-family: 'Work Sans', sans-serif;
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 10px;

        img{
            width: 18px;
            height: 16px;
            margin: 0 10px 0 0;
        }

        .fa{
            margin-right: 7px;
            /* font-size: 18px;
            font-weight: bold; */
        }
    }

    /** Media Queries **/
    @media (max-width: 1024px) {
        margin-top: 5px;
        hr{
            display: none;
        }
        button{
            width: auto;
            margin: 27px 25px 0 0;
        }
    }
`;

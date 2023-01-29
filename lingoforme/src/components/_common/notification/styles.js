import styled from 'styled-components';

export const Notification = styled.div`
    a {
        display: block;
        height: 100%;
    }

    .relative{
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
    }

    .bell-icon{        
        height: 40px;
        width: auto;
        cursor: pointer;
        align-self: center;
    }

    .notification{
        background-color: #ff4949;
        border-radius: 100%;
        height: 20px;
        width:20px;
        position: absolute;
        right: 8px;
        top: 20px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
    }
`;
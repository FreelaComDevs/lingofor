import styled from 'styled-components';

export const Notification = styled.div`
    a {
        display: block;
        height: 100%;
    }

    .relative{
        position: relative;
        display: flex;
        height: 100%;
    }

    .bell-icon{
        color: #fff;
        font-size: 36px;
        cursor: pointer;
        align-self: center;
    }

    .notification{
        background-color: #ff4949;
        border-radius: 100%;
        height: 16px;
        width: 16px;
        position: absolute;
        right: 0;
        top: 20px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
    }
`;
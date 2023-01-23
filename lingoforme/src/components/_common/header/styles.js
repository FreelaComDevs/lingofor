import styled from 'styled-components';
import bg from '../../../images/bg-header.svg';

export const Head = styled.div`
    width: 100%;    

    h1{
        padding: 32px 0 80px 85px;
        color: #004FFF;
        font-size: 36px;
        font-weight: bold;
        display: flex;
        align-items: center;

    }

    img{
        margin: 0 10px 0 0;
        height: 40px;
        border-radius:100%;
    }

    .personalData{
        font-size:14px;
    }

    .personalData > h3 {
        font-weight: 700;
    }

    .header-holder {
        background-image: url(${bg});
        background-position: 100% -4px;
        background-repeat: no-repeat;
        height: 120px;
        width: 100%;
        float: right;
        margin-bottom: 72px;
        display:flex;
        flex-direction:column;
    } 

    @media (min-width: 320px) and (max-width: 1024px) {

    header{
        .header-holder {
            background-position: 120% -5px;
            height: 85px;
            width: 100%;
            margin-bottom: 0;            
            }

            h1 {
                padding: 0;
                display: none;
            }

            nav {
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                display: flex;
                align-items: center;
                flex-direction: row;
                padding-top: 17px;          

                .logo{
                    margin: auto;
                    padding-bottom: 10px;
                }

                hr{
                    display: none;
                }  
            }
        } 
    } 
`;


import styled from 'styled-components'

export const Form = styled.div`
    width: 100%;
    height: 100%;

    /* icons */
    .icons {
        padding-top: 40px;
        padding-bottom: 35px;
        margin: 0 auto;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #C5C3C9;
        font-weight: bold;

        &.active{
            color: var(--color-blue);
        }
        span{
            display: flex;
            width: 500px;
        }
        hr{
            border-top: 1px solid #C5C3C9;
            width: 40%;
            margin: 0;
            padding: 0;
            justify-content: end;
            display: flex;
            margin-top: 50px;

        }

        .icons-inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            svg{
                margin-bottom: 12px;
                
            }
        }

        .icons-inner-active {
            color: var(--color-blue);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            /* svg{
                height: 25px;
                width: 18px;
                margin-bottom: 10px;
            } */
        }
    }

    select{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 93%;
        height: 32px;
        border-radius: 26px;
        background-color: white;
        border: 1px solid #B2B2B7;
        padding-left: 10px;
        margin: 2px 0 15px;
        color: #403F4C;
        font-family: 'Quicksand', sans-serif;
        font-size: 14px;
    }


    .singIn{
        /* border-right: 1px solid #E4E8EE; */
        width: 100%;
        margin-left: 0;
        border-right: 1px solid #E4E8EE;
        
        form{
            margin-top: 24px;

            label{
                font-size: 14px;
                color: #403F4C;
                font-weight: 500;
            }

            span{
                font-size: 10px;
                color: #97979E;
                margin-bottom: 3px;
                margin-left: 6px;
            }

            input{
                width: 90%;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #B2B2B7;
                color: #403F4C;
                padding-left: 10px;
                margin: 2px 0 15px;
                padding-top: 0;
                font-family: 'Quicksand', sans-serif;
                font-size: 14px;
            }

            select{
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                width: 93%;
                height: 32px;
                border-radius: 26px;
                background-color: white;
                border: 1px solid #B2B2B7;
                padding-left: 10px;
                margin: 2px 0 15px;
                color: #403F4C;
                font-family: 'Quicksand', sans-serif;
                font-size: 14px;
            }

            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                margin-top: 10px;
                color: #403F4C;
            }

      
        }

        .telefone{
            display: flex;
        }

        .lineInputs{
                margin-right: 23px;

                button{
                    margin: 24px 0 0 -6px;
                    width: 175px;
                    padding: 0 12px;
                    margin-bottom: 48px;
                }

                .gender{
                    width: 243px;
                }

                .MuiInput-input-14 {
                    width: 215px;
                    border: none;
                    height: 19px;
                    margin: 0;
                }

                .MuiFormControl-root-30 {
                    border: 1px solid;
                    border-radius: 26px;
                    border: 1px solid #B2B2B7;
                }

                input, select{
                    width: 257px;
                }
                
                select.userPhoneTypeId{                    
                    width: 300px;                    
                }
                    
            }

        .footerSingIn {
            position: relative;
            font-weight: 200;
            width: 100%;
            display: flex;
            flex-direction: row;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 20px;

            hr {
                width: inherit;
                margin: 0;
                height: 1px;
            }

            div {
                width: 100%;
                position: absolute;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-pack: center;
                justify-content: center;
                -ms-flex-align: center;
                align-items: center;
            }

            .or-login-css {
                display: -ms-flexbox;
                display: flex;
                width: auto;
                padding-left: 10px;
                padding-right: 10px;
                padding-bottom: 5px;
                background-color: white;
                font-size: 12px;
            }

            .password{
                display: flex;
                height: 100%;
                width: 86%;
                align-items: center;
                justify-content: space-between;

                .forgot{
                    a{
                        color: #403F4C;
                        font-size: 12px;
                        text-decoration: underline;
                    }
                }
            }


        }

        .form-footer {
            height: 30px;
            width: 95%;            
        }

        .form-footer_social-login{
            display: flex;
            justify-content: center;
            margin: 20px;

            img{
                width: 32px;
                height: 32px;
                margin: 0 30px 0 0;
            }
        }

        .switch__container{
            justify-content: left;
            text-align: left;
        }

        .switch--shadow + label {
            width: 100%;
            margin-bottom: 45px;
        }
        
    }

    /* Verificar */
    .singIn{
        .account{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 35px;

            p{
                font-size: 14px;
                margin-left: -30px;
            }

            a{
                color: #004FFF;
                font-weight: bold;
            }
        }
    } 

    
    /** Text Prices **/
    .boxChangePlans{
        width: 100%;

        .textPrices{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            /* margin: 50px 0 10px 0; */
            margin: 0;
            background-color: #F3F3F7;


            h2{
                color: #403F4C;
                font-size: 22px;
            }

            h3{
                color: #7E7C85;
                font-size: 12px;
                font-weight: normal;
                font-family: 'Work Sans', sans-serif;
            }
        }

        .buttonBack{
            display: flex;
            width: 95%;
            justify-content: flex-end;
            align-items: center;
            margin: 26px 0 20px 0;

            button{
                background-color: transparent;
                border: 1px solid #787780;
                border-radius: 26px;
                width: 71px;
                height: 32px;
                cursor: pointer;
            }

            img{
                margin: 0 0 0 25px;
            }

        }

        
    }


    /** Change Plan **/
    .boxChange{
        background-color: #fff;
        width: 100%;
        height: 130px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 0;
        justify-content: space-between;
        border-top: 10px solid #F3F3F7;
        padding-left: 15px;
        padding-right: 15px;

        .changePlan{
            display: flex;
            align-items: center;
            flex-direction: column;
            /* padding: 15px; */

            /* img{
                margin-top: 18px;
            } */

            h2{
                color: #39ADFE;
                font-size: 17px;
                text-align: center;
                margin-top: 10px;
            }

            h3{
                color: #004FFF;
                font-size: 12px;
                font-weight: bold;
            }

            h4{
                color: #7E7C85;
                font-size: 16px;
                font-weight: normal;
                text-decoration: line-through;
                margin: 0;
                
            }

            h5{
                color: #004FFF;
                font-size: 24px;
                font-weight: bold;
                margin: 0;
                font-family: 'Work Sans', sans-serif;
            }

            h6{
                color: #6D6A75;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
            }

            p{
                color: #403F4C;
                font-size: 14px;
            }

            button{
                background-color: #004FFF;
                color: #fff;
                width: 80px;
                height: 40px;
                border-radius: 20px;
                border: none;
                font-size: 16px;
                font-weight: bold;
                font-family: 'Work Sans', sans-serif;
            }

        }
        
        .off{
            width: 58px;
            height: 18px;
            background-color: #004FFF;
            border-radius: 4px;
            color: #fff;
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            padding-top: 2px;
        }

    }

    /** Review **/
    .boxBig{
        background-color: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        border-radius: 4px;
        margin-bottom: 50px;
        /* padding-top: 10px; */
        margin: 0 auto;

        /* h2{
            margin: 36px 0 0 0;
        } */
        
        hr{
            height: 1px;
            width: 100%;
            margin: 38px 0 45px 0;
        }

        /* &:first-child{
            .box{
                border-left: 1px solid #E4E8EE;
            }
        } */

        .box{
            width: 55%;
            height: 100%;
            padding-left: 25px;
            padding-right: 25px;
            margin: 36px 0 36px 0;         
            border-right: none;
            &:last-child{
                width: 70%;
                padding-left: 50px;
            }
            .infos{
                h3{
                    margin-top: 24px;
                }
            }
        }

       

        .buttonBack{
            display: flex;
            width: 95%;
            justify-content: flex-end;
            align-items: center;
            margin: 26px 0 20px 0;

            button{
                background-color: transparent;
                border: 1px solid #787780;
                border-radius: 26px;
                width: 71px;
                height: 32px;
                cursor: pointer;
            }

            img{
                margin: 0 0 0 25px;
            }

        }


        /** change **/
        .change{
            display: flex;
            align-items: center;

            h2{
                font-size: 22px;
                color: #403F4C;
                font-weight: bold;
            }

            i{
                font-size: 12px;
                color: #97979E;
                margin: 3px 0 0 8px;

                img{
                    margin: 0 0 0 2px;
                }
            }
        }


        .infos{

            h3{
                font-size: 14px;
                color: #8C8C94;
                font-weight: normal;
            }

            h4{
                font-size: 20px;
                color: #403F4C;
                margin: 0;
                font-weight: 100;
            }

            p{
                font-size: 14px;
                color: #6D6A75;
                font-weight: normal;
                margin: 4px 8px 0 0;
            }
        }

        .reviewPlan{
            display: flex;
            flex-direction: column;
            max-width: 100%;
        }

        .textPlanTop{
            display: flex;
            flex-direction: row;
            width: 100%;
            margin: 13px 0 32px 0;

            img{
                margin: 20px 10px 0 0;
            }

            h4{
                color: #39ADFE;
                padding-top: 0;
                margin: 28px 0 0;

            }

        }

        .textPlan{
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
        }

        .infoPlan{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            width: 100%;  
            margin: 0 10px 12px 0;

            h5{
                margin: 5px 0 2px 0;
                color: #97979E;
                text-transform: uppercase;
                font-size: 12px;
                font-weight: 500;
            }

            span{
                font-size: 14px;
                color: #403F4C;
                font-family: 'Quicksand', sans-serif;
                background: transparent !important;
                cursor: default !important;
            }

            select {
                width: 150px;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #403F4C;
                margin-bottom: 15px;
                color: #403F4C;
                margin-right: 0;
                opacity: 0.4;
                padding: 0 28px 0 10px;
            }

            .language{
                display: flex;
                margin: 0 10px 0 0;

                h5{
                    margin: 0 0 0 6px;
                    text-align: left;
                    color: #403F4C;
                    font-size: 14px;
                }

                .input-lingo{
                    height: 32px;
                    width: 150px;
                }

                .MuiMenuItem-root-152 {
                    box-sizing: border-box !important;
                }

                .MuiListItem-button-162{
                    img{
                        margin-right: 12px;
                    }

                    font-size: 14px;
                    color: #403F4C;
                    font-weight: normal;
                    margin-left: -15px;

                    &:hover{
                        background-color: transparent !important;
                        cursor: auto;
                    }
                }
            }

            .textBottom{
                display: flex;
                width: 100%;
            }
            
            
        }

        .textBottom{
            display: flex;
            justify-content: flex-start;

            select {
                width: auto;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #403F4C;
                padding-left: 10px;
                margin-bottom: 15px;
                color: #403F4C;
                margin-right: 10px;
                opacity: 0.4;
            }
        }

        .textPay{
            display: flex;
            justify-content: flex-end;
            width: 98%;
            text-align: right;
            margin: 20px 0 30px 0;

            .total{
                
                h5{
                    font-size: 15px;
                    color: #403F4C;
                    font-weight: bold;
                    opacity: 0.4;
                    margin: 65px 0 0 0;
                }
            }

            .price{
                h5{
                    font-size: 28px;
                    color: #004FFF;
                    font-weight: bold;
                    margin: 0;
                }

                span{
                    font-size: 14px;
                    color: #6D6A75;
                }
            }

            .dollar{
                span{
                    font-size: 12px;
                    color: #6D6A75;
                }
            }

        }
    }

    /** Confirmation **/
    .confirmation{
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 40px;

        h2{
            color: #00D36A;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
        }

        img{
            margin: 25px auto;
            display: flex;
        }

        p{
            display: flex;
            font-size: 16px;
            color: #403F4C;
            text-align: center;
            margin-bottom: 50px;
        }

    }

    /** Media Queries **/
    @media (max-width: 1024px) {

        /** icons **/
        .icons {
            width: 100%;
            
            .icons-inner, .icons-inner-active{
                font-size: 12px;
            }
        }

        /** Form **/
        .singIn{
            border-right: none;
            margin-top: 25px;

            .switch--shadow + label {
                width: auto;
                margin-bottom: 45px;
            }

            form{
                input {
                    width: 97%;
                }
                select {
                    width: 100%;
                }
            }
        }


        /** Text Prices **/
        .textPrices {
            display: flex;
            justify-content: left;
            align-items: flex-start;
            flex-direction: column;
            margin: 15px 0 20px 22px;
            
        }

        .textPay{
            .total{
                h5 {
                    margin: 0 0 0 0 !important;
                }
            }
        }

        /** box Change **/
        .boxChange {
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .changePlan {
            padding: 10px !important;

            p {
                text-align: center;
                font-size: 11px !important;
            }
        }

        /** box Review **/
        .boxBig {
            background-color: #fff;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            padding: 0 0 0 0;
        }

        .boxBig{
            .box {
                width: 90%;
                height: 100%;
                padding: 0 0 0 0;
                margin: 20px auto;
            }

            hr {
                height: 1px;
                width: 100%;
                margin: 38px 0 0 0;
            }
            .textPlan{
                flex-wrap: wrap;
            }

            .infoPlan{
                width: auto;
            }

            /* .textBottom{
                margin-right: 44px;
                select{
                    margin-right: 23px;
                }
            } */

            .textPay{
                float: right;
                margin-right: 53px;
            }
        }

        

        .infos{
            p {
                font-size: 10px;
                color: #6D6A75;
                font-weight: normal;
            }
        }

        .buttonBack {
            justify-content: center;
            align-items: center;
            margin: 26px 0 20px 0;
            flex-direction: column-reverse;

            img {
                margin: 0 0 20px 0;
            }
        }


        /** Confirmation **/
        .confirmation{
            p {
                display: flex;
                font-size: 13px;
                color: #403F4C;
                text-align: center;
            }
        }

        .box{
            &:last-child{
                width: 100% !important;
                padding-left: 25px !important;
            }
        }

        .reviewPlan{
            margin-right: 45px;
        }

    }

    @media (min-width: 1200px) and (max-width: 1466px) {
        .icons {
            width: 100%;
            margin: 0 auto;
            max-width: 65%;
        }
       /** Form **/
       .telefone{
            display: flex;
            flex-direction: column;
        }
       .singIn{
            .switch--shadow + label {
                width: 100%;
                margin-bottom: 45px;
            }

            .telefone{
                display: flex;
                flex-direction: row;     
                width: 100%;

                .lineInputs {
                    display: flex;
                    flex-direction: column; 
                    width: 100%;
                    
                    input{
                        width: 95%;
                    }
    
                    select {
                        width: 98%;
                        margin-right:0px;
                    }
                }
            }
            
        } 
    }

    @media (max-width: 1200px) {
       .singIn{

        .telefone{
            display: flex;
            flex-direction: column;   
            width: 100%;
            
            .lineInputs {
                display: flex;
                flex-direction: column;   
                width: 100%;

                input{
                    width: 97%;
                }

                select {
                    width: 100%;
                    margin-right:0px;
                }
            }
        }
    }

    /* classe retirar depois */
    .fix-big{
        width: 90% !important;
        margin: 0 auto;
        padding-top: 10px;
    }

`;


export const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 25px;

    .footer-btns{
        display: flex;
        justify-content: flex-end;
        width: 100%;

        .buttonBack{
            display: flex;
            justify-content: unset;
            width: 100%;
            justify-content: flex-end;
            margin-top: 33px;

            button{
                background-color: transparent;
                color: #787780;
                border: 1px solid #787780;
                border-radius: 26px;
                width: 71px;
                height: 32px;
                cursor: pointer;                
            }

        }
        

        .button{
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            width: 200px;
            height: 38px;
            border-radius: 26px;
            background-color: #004FFF;
            border:  none;
            cursor: pointer;
            margin-top: 50px;
        }

        a{
            color: #FF5666;
            font-size: 12px;
            font-weight: 500;
            margin-right: 10px;
            text-decoration: none;
        }

        .save{
                button{
                    color: #787780;
                    font-size: 14px;
                    font-weight: bold;
                    width: 71px;
                    height: 32px;
                    border-radius: 26px;
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    border: 1px solid #787780;
                    margin: 10px 10px 0 0;
            }
        }
    }

    /** Media Queries **/
    @media (max-width: 1024px) {
      .footer-btns {
            justify-content: center;
            align-items: center;
            flex-direction: column-reverse;

            .buttonBack{
                margin: 0 auto;
                justify-content: center;
            }
        }

        .button-mb-payPal{
            margin-right: 0;
            margin-left: 0;
        }

    }

`;
import styled from 'styled-components';
import arrow from '../../images/ico_select_arrow_white.png';

export const Box = styled.div`
    width: 102%;

    h2 {
        font-size: 18px;
        color: #403F4C;
        margin: 15px 0 26px 20px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 500;
    }

    .boxCS{
        display: flex;
        width: 100%;
        align-items: end;
 
        /** Formulário**/
        form{
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin-left: 20px;
            width: 377px;

            label{
                color: #403F4C;
                font-size: 14px;
                font-weight: bold;
            }

            span{
                color: #87868F;
                font-size: 10px;
                margin-left: 5px;
            }

            span.invalid {
                font-size: 10px;
                margin-left: 5px;
                color: red;
            }

            input, select, textarea{
                height: 32px;
                border-radius: 26px;
                border: 1px solid #B2B2B7;
                padding-left: 10px;
                margin-bottom: 15px;
                display: block;
                min-width: 100%;
            }  

            .Select{
                width: 161px;
            }

            textarea{
                height: 140px;
                resize: none;
                padding: 15px;

            }          
        }

        .imgOpenTicket{
            img{
                margin-left: 180px;
            }
        }
        
    }

    .buttons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-top: 25px;
        padding: 0 15px 0 0;
        cursor: pointer;
        width: 100%;

            button{
                background-color: #004FFF;
                border: none;
                color: #fff;
                font-weight: bold;
                font-size: 14px;
                border-radius: 26px;
                width: 81px;
                height: 38px;
                margin-top: 5px;
                cursor: pointer;
                font-family: 'Quicksand', sans-serif;                

                &:first-child{                  
                    background-color: transparent;
                    border: 1px solid #787780;
                    color: #403F4C;
                    font-weight: bold;
                    font-size: 11px;
                    border-radius: 26px;
                    width: auto;
                    height: 28px;
                    margin-top: 8px;
                    margin-right: 10px;
                    cursor: pointer;
                    padding: 6px 18px 5px 18px;

                .fa{
                    margin-right: 3px;
                }
            }
        }
    }

`;

export const Congratulations = styled.div`
    margin-top: 50px;

    h3{
       font-size: 22px;
       color: #00D36A;
       font-weight: bold; 
       font-family: 'Quicksand', sans-serif;
       text-align: center;
    }

    img{
        margin: 25px auto;
        display: flex;
    }

    p{
        font-size: 16px;
        color: #403F4C;
        font-weight: 500;
        font-family: 'Quicksand',sans-serif;
        text-align: center;
        margin: 0 auto;
        line-height: 22px;
        margin-bottom: 5px;
    }

    span{
        font-size: 16px;
        color: #403F4C;
        font-weight: 500;
        font-family: 'Quicksand',sans-serif;
        text-align: center;
        width: auto;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        word-break: break-all;
        line-height: 22px;
    }

    .buttons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-top: 40px;
        padding: 0 15px 0 15px;
        cursor: pointer;
        width: 100%;

        button{
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-weight: bold;
            font-size: 14px;
            border-radius: 26px;
            width: auto;
            height: 38px;
            margin-top: 5px;
            cursor: pointer;
            font-family: 'Quicksand', sans-serif; 
            margin: 0 auto;
            padding: 0 25px 0 25px;
        }
    }

`;

export const TicketStyle = styled.div`
    width: 100%;
    
    .topTicket{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        margin: 10px auto;
        /* width: 100%;
        max-width: 87%;

        &:last-child{
            max-width: 100%;
        } */
        
        .numberTicket{
            display: flex;
            align-items: center;

            h3, span{
                font-size: 20px;
                color: #403F4C;
                font-weight: bold;
                font-family: 'Quicksand', sans-serif;
                margin-right: 8px;
            }

            span{
                font-size: 12px;
                font-weight: 100;
            }
        }

        .numberTicketCancel{
            display: flex;
            align-items: center;
            margin-top: 25px;

            h3, span{
                font-size: 20px;
                color: #FF5666;
                font-weight: bold;
                font-family: 'Quicksand', sans-serif;
                margin-right: 8px;
            }

            span{
                font-size: 12px;
                font-weight: 100;
            }
        }

        select{
            /* background-color: #00D36A !important; */
            color: #fff;
            font-size: 18px;
            font-family: 'Quicksand', sans-serif;
            font-weight: 500;
            border-radius: 26px;
            border: none;
            width: auto;
            height: 31px;
            padding: 0 30px 0 25px;
            background-image: url(${arrow});
            background-position: 92.5% 50%;
        

        &[data-item="OPEN"], &[data-item="ACTIVE"] {
            color: #fff;
            font-weight: 800;
            background-color: #004FFF;
        }

        &[data-item="IN_PROGRESS"] {
            color: #fff;
            font-weight: 800;
            background-color: #00D36A;
        }

        &[data-item="INACTIVE"], &[data-item="CANCELLED"] {
            color: #fff;
            font-weight: 800;
            background-color: #FF5666;
        }

    }

        
        
    }

    form{
        display: flex;
        justify-content: center;
        flex-direction: column;

        label{
            color: #403F4C;
            font-size: 14px;
            font-weight: bold;
            margin: 0 6px 0 12px;
        }

        input, select{
            width: auto;
            height: 28px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            padding-left: 10px;
            margin-bottom: 15px;
        } 

        input{
            border: none;
        } 

        select{
            width: 150px;
            margin: 0 30px 0 0;
        }

        .Select{
            width: 150px;
            margin: 0 30px 0 0;
        }

        .bigBox {
            width: 100% !important;
        }

        .infoTicket{
            display: flex;
            align-items: center;
            margin-bottom: 13px;

            .tag{
                background-color: #5A6C96;
                width: auto;
                height: 20px;
                padding: 0 12px 0 12px;
                color: #fff;
                border-radius: 26px;
                border: none;
                text-align: center;
                margin-left: 24px;
                font-size: 12px;
                align-items: center;
                display: flex;
            }

            p{
                font-size: 14px;
                color: #403F4C;
                font-family: 'Work Sans', sans-serif;
                line-height: 18px;
            }

            .lineInput {
                display: flex;
                flex-direction: row;

            }

            
            img{
                margin-right: 6px;
            }

        }    
    }

    .buttons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin: 40px 0 25px 0;
        padding: 0 15px 0 15px;
        cursor: pointer;
        width: 100%;

        button{
            background-color: transparent;
            border: 1px solid #787780;
            color: #403F4C;
            font-weight: bold;
            font-size: 11px;
            border-radius: 26px;
            width: 95px;
            height: 28px;
            margin-top: 8px;
            margin-right: 10px;
            cursor: pointer;
        }

        button.cancel{
            background-color: transparent;
            border: 1px solid #FF5666;
            color: #FF5666;
            font-weight: 500;
            font-size: 14px;
            border-radius: 26px;
            width: auto;
            height: 24px;
            margin-top: 5px;
            cursor: pointer;
            font-family: 'Quicksand', sans-serif; 
            padding: 0 12px 0 12px;

        }
    }

    .notes{
        margin-top: 40px;

        h2{
            color: #403F4C;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 30px;
        }

        .extras{
            display: flex;
            justify-content: center;
            align-items: center;

            button{
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-size: 11px;
                color: #787881;
                font-weight: 500;
                font-family: 'Quicksand', sans-serif;
                display: flex;
                align-items: center;

                img{
                    margin-left: 8px;
                }
            }
        }

        .infos{
            display: flex;

            .avatar{
                img{
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                }
            }

            .boxWhite{
                padding: 15px 30px 15px 10px;
                margin: 0 0 33px 30px;
                width: 100%;

                .infoPerfil{
                    flex-wrap: wrap;
                    margin: 0 0 15px 0;

                    .itemInfo:last-child{
                        margin-top: 10px;
                    }
                }

                .boxItem{
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 15px 0 15px;
                    margin-bottom: 20px;
                }

                .infos{
                    display: flex;
                    width: 100%;
                }

                .textBox{
                    display: flex;
                    flex-direction: column;
                    margin: 5px 0 0 12px;
                    color: #403F4C;
                    width: 100%;
                }

                .infoPerfil{ 
                    display: flex;
                    width: 100%;
                    align-items: center;
                    margin-bottom: 15px;

                    .itemInfo{
                        margin-right: 10px;

                        &:first-child{
                            color:#004FFF;
                            font-size: 14px;
                            font-weight: bold;
                        }

                        &:last-child{
                            color: #403F4C;
                            font-size: 11px;
                            font-weight: 500;
                            display: flex;

                            img{
                                width: 18px;
                                height: 12px;
                                margin-right: 8px;
                            }
                        }

                        span{
                            background-color: #5A6C96;
                            color: #fff;
                            border-radius: 26px;
                            font-size: 12px;
                            padding: 5px 12px 5px 12px;
                        }
                    }

                    .perfilLingo{
                        background-color: #5A6C96;
                        color: #fff;
                        font-size: 12px;
                        font-weight: 500;
                        border-radius: 26px;
                    }
                }

                .message{
                    p{
                        color: #222222;
                        font-size: 14px;
                        line-height: 20px;
                        font-family: 'Work Sans', sans-serif;
                    }
                }

                .date{
                    margin: 0;
                    color: #403F4C;
                    font-size: 14px;

                    strong{
                        margin: 0 3px 0 0;
                    }
                }
            }

        }

        .owner{
            flex-direction: row-reverse;

            .avatar{
                img{
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    margin-left: 30px;
                }
            }
        }

        .boxType{
            display: flex;
            justify-content: center; 

            .avatar{
                img{
                    width: 66px;
                    height: 66px;
                    border-radius: 50%;
                }
            }
        }

        .ticketCancelled{
            h4{
                background-color: #FF5666;
                border-radius: 26px;
                text-align: center;
                color: #fff;
                font-size: 16px;
                font-weight: 500;
                font-family: 'Quicksand', sans-serif;
                width: 266px;
                height: 31px;
                margin: 0 auto;
                align-items: center;
                display: flex;
                justify-content: center;
            }


            span{
                margin: 2px auto;
                text-align: center;
                display: flex;
                justify-content: center;
                font-size: 13px;
                font-weight: 500;
                font-family: 'Quicksand', sans-serif;
                color: #8C8B93;
            }
        }



        .send{
            form{
                display: flex;
                flex-direction: row;
                align-items: end;

                textarea{
                    width: 542px;
                    height: 105px;
                    border-radius: 16px;
                    background-color: #fff;
                    font-size: 12px;
                    color: #111111;
                    padding: 18px 16px 0 16px;
                    margin: 0 15px 50px 15px;
                    resize: none;                    
                    border: 1px solid #E4E8EE;
                    font-family: 'Work Sans', sans-serif;
                }
            }

            button.enter{
                background: transparent;
                border: none;

                img{
                    width: 50px;
                    height: 50px;
                    cursor: pointer;
                }
            }
        }
    }

    .ticketClosed{
        
        h4{
            background-color: #403F4C;
            opacity: 0.6;
            margin: 0 auto;
            border-radius: 26px;
            text-align: center;
            color: #fff;
            width: 250px;
            height: 31px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        span{
            color: #8C8B93;
            font-size: 13px;
            font-weight: 500;
            text-align: center;
            font-family: 'Quicksand',sans-serif;
            display: flex;
            justify-content: center;
            margin-top: 5px;
        }
        
    }

    
`;

export const Table = styled.div`
    margin-top: 21px;
    .bigBox {
        margin-top: 0;
    }

    .topTable{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0 20px;

        h3{
            color: #004FFF;
            font-size: 20px;
            font-weight: 500;
        }
        button{               
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-weight: bold;
            font-size: 14px;
            border-radius: 26px;
            width: 180px;
            height: 38px;
            margin-top: 5px;
            cursor: pointer;

            .fa{
                margin-right: 3px;
            }
        }
    }

    .boxTable{
        display: flex;
        width: 100%;
        padding: 0 12px 0 10px;
        background-color: #fff;
        justify-content: space-between;
        border: 1px solid;
        flex-direction: row;

        .boxItem{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            
            h3{
                font-size: 12px;
                color: #403F4C;
                font-weight: bold;
            }

            .itemTop{
                h3{
                    margin: 11px 139px 0 0;
                }
            }
            
        }
        hr{
            margin-top: 0;
        }
    }

    
    table{
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0 15px 0;
        table-layout: fixed;

        tr{
            text-align: left;  
            height: 35px;          

            th{
                color: #403F4C;
                font-size: 12px;
                font-weight: bold;
            } 
            
            :nth-child(2){
                border-top: 1px solid #B2B2B7;
            }
        }

        td {
            border: 1px solid #B2B2B7;
            border-left: 0;
            border-right: 0;
            height: 33px;
            font-size: 14px;
            color: #403F4C;
            font-weight: 500;
            font-family: 'Work Sans', sans-serif;
            word-wrap: break-word;

            /* :nth-child(3){
                width: 40%;
            } */

            /* :nth-child(4){
                text-align: right;
            }

            :nth-child(5){
                width: 100px;
            } */

            span{
                color: #0ED572;
                font-weight: bold;
            }
            .inativo{
                color: #FF5666;
                font-weight: bold;
            }
           
            button{
                background-color: transparent;
                border: 1px solid #B2B2B7;
                border-radius: 26px;
                color: #87868F;
                font-size: 11px;
                width: 58px;
                height: 22px;
                float: right;
                cursor: pointer;
                padding-left: 8px;  

                .fa{
                    margin-right: 3px;
                }
            }
        }
        .active{
            color: #0ED572;
            font-weight: bold;
        }
    }

`;


export const FilterUser = styled.div`
    h2{
        font-size: 20px;
        font-weight: 400;
        color: #87868F;
        font-family: 'Quicksand', sans-serif;

        .fa{
            margin: 0 5px 0 0;
        }
    }

    .formulario{
        flex-direction: row;
        margin: 10px 0 0 0;

        .rowInputs{
            display: flex;
        }

        .lineInput{
            display: flex;
            flex-direction: column;
            margin: 0 16px 0 0;
            width: 100%;
        }

        input {
            width: auto;

        }

        select{
            width: auto;
        }
        
        label {
            color: #403F4C;
            font-size: 14px;
            font-weight: bold;
        }
        
        input{
            width: auto;
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            color: #B2B2B7;
            padding-left: 10px;
            margin-bottom: 15px;
        }

        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #87868F;
        }

        select {
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            padding-left: 10px;
            margin-bottom: 15px;
            color: #B2B2B7;
            
            :nth-child(6){
                width: 182px;
            }
        }
    }

    .button{
        display: flex;
        justify-content: flex-end;
        width: 100%;
         
        button{
            width: auto;
            height: 38px;
            border-radius: 26px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 20px 0;
            padding: 0 16px 0 16px;

            .fa{
                margin-right: 3px;
            }
        }
    }

    .buttons{
        display: flex;
        justify-content: flex-end;
        
        .Users-wrapper-2 {
            position: relative;
            width: 81px;
            height: 28px;
        }
        button{
            width: 84px;
            height: 22px;
            border-radius: 26px;
            background: #fff;
            border: 1px solid #B2B2B7;
            color: #B2B2B7;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 14px 0 0 0;
            margin-right: 10px;
            font-family: 'Quicksand', sans-serif;

            &:last-child{
                width: 58px;
                height: 28px;
                border-radius: 26px;
                background: #004FFF;
                border: 1px solid #004FFF;
                color: #fff;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
                margin: 10px 18px 0 0;
            }

             
            &:disabled,
                button[disabled]{
                width: 58px;
            }

        }

        button.save {
            width: 81px;
            height: 22px;
            border-radius: 26px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 10px 18px 0 0;
        }
    }

`;
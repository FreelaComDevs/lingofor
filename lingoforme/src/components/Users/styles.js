import styled from 'styled-components'
import arrow from '../../images/ico_select_arrow_white.png';

export const User = styled.div`
    .userName{
        h2{
            font-size: 24px;
            font-weight: 500;
            color: #87868F;
            margin:25px 0 0 199px;
            font-family: 'Quicksand', sans-serif;
        }
    }

    .avatarRound {
        border-radius: 50%;
        object-fit: cover;
    }
    

    .viewUser{
        display: flex;
        width: 100%;
        flex-direction: row;
    }

    .MuiInput-underline-15:before {
        border-bottom: none;
    }

    .MuiInput-underline-15:hover:not(.MuiInput-disabled-14):not(.MuiInput-focused-13):not(.MuiInput-error-16):before {
        border-bottom: none;
    }

    /** changePhoto**/
    .changePhoto{
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 40px 60px 0 25px;

        h2{
            color: #403F4C;
            font-size: 14px;
            margin: 0 0 10px 0;
        }

        .photo{
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        .fileUpload {
            position: relative;
            overflow: hidden;
            margin: 10px;
            border-radius: 26px;
            border: 1px solid #787780;
            width: 93px;
            height: 20px;
            text-align: center;
            font-size: 11px;
            font-weight: 500;
            opacity: 0.7;
            display: flex;
            align-items: center;
            justify-content: center;

            span{
                align-items: center;
                display: flex;
            }

            input.upload {
                position: absolute;
                top: 0;
                right: 0;
                margin: 0;
                padding: 0;
                font-size: 20px;
                cursor: pointer;
                opacity: 0;
                filter: alpha(opacity=0);
            }
        }
        
        span{
            img{
                padding: 0 5px 0 0;
            }
        }
    }

    /** Form **/
    .formulario{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin: 40px 100px 0 0;
        width: 100%;

        /* .react-inputs-validation__textbox__container___3KXOM{
            width: 45%;
            margin-right: 5px;
        } */

        .addEmail{
            display: flex;

            input{
                width: 460px;
            }
        }

        .label{
            margin: 0 0 -3px 0;
        }
        

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

        .notification{
            display: flex;

            .switch__container{
                margin: 5px 0 0 23px;

                span{
                    margin-left: 47px;
                    font-size: 12px;
                    color: #707070;
                }
            }

            span.delete{
                margin: 11px 0 0 0;
                width: 55px;
                font-weight: bold;
            }
        }


        select{
            width: 220px;
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            padding-left: 10px;
            margin-bottom: 15px;
            color: #403F4C;
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
            background-image: url(${arrow});

            .greenActive{
                background: #00D36A;
                color: #fff;
            }

            .redInactive{
                background: red;
                color: #fff;
            }
        }

        
        .profile{
            display: flex;
            justify-content: flex-start;
            margin-bottom: 25px;
            /* width: 100%; */
            /* max-width: 59%; */

            /* select{
                width: 220px;
                &:last-child{
                    display: none;
                }
            } */

            /* .role{
                width: 100%;
                max-width: 34%;
            } */
            
            .active{
                background-color: #00D36A;
                color: #fff !important;
                font-size: 18px;
                font-weight: 500;
                width: 126px;
                border: none;
                margin-left: 240px;
                font-family: 'Quicksand', sans-serif;
            } 
            
            .inactive{
                background-color: red;
                color: #fff !important;
                font-size: 18px;
                font-weight: 500;
                width: 126px;
                border: none;
                margin-left: 240px;
            }
        }


        input{
            width: 460px;
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            color: #403F4C;
            padding-left: 10px;
            margin-bottom: 15px;
            font-size: 14px;
            font-family: 'Quicksand', sans-serif;
        }

        .genderBox{
            margin-bottom: 25px;
        }


        .addInput{
            width: 110px;
            height: 32px;
            border-radius: 26px;
            margin-left: 20px;
            background: transparent;
            border: 1px solid #B2B2B7;
            color: #403F4C;
            font-family: 'Work Sans', sans-serif;
            font-size: 14px;
            cursor: pointer;
        }

        .inputs{
            display: flex;

            .lineInputs{
                margin-right: 23px;

                button{
                    margin: 21px 0 0 0
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

                input{
                    width: 220px;
                }
                
                select.userPhoneTypeId{                    
                    width: 300px;                    
                }
                    
            }

            p{
                font-size: 11px;
                color: #87868F;
                margin-top: 22px;
            }
        }

        button.delete{
            width: 83px;
            height: 22px;
            border-radius: 26px;
            background: transparent;           
            border: 1px solid #FF5666;
            color: #FF5666;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 6px 0 35px 20px;
        }

        button.deleteLast{
            width: 83px;
            height: 22px;
            border-radius: 26px;
            background: transparent;           
            border: 1px solid #FF5666;
            color: #FF5666;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 25px 0 20px 0;
            font-family: 'Quicksand', sans-serif;
        }

        .removephone{
            margin: 0 0 0 -25px; 
        }

        
    }

    .button{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        margin-top: 15px;

        button.save{
            width: 81px;
            height: 38px;
            border-radius: 26px;
            background: #004FFF;           
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            margin: 24px 0 30px 0;
            font-family: 'Work Sans', sans-serif;
        }

        button.back{
            width: 72px;
            height: 28px;
            border-radius: 26px;
            background: transparent;
            border: 1px solid #787780;
            color: #787780;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 30px 15px 30px 0px;
            font-family: 'Quicksand', sans-serif;

            .fa{
                margin-right: 3px;
            }
        }
    }

    input.jsx-4179805763  {
        width: 226px !important;
        height: 32px;
        border-radius: 26px;
        border: 1px solid #B2B2B7;
        padding-left: 10px;
        margin-bottom: 0;
        margin-top: 0;  
    }

    button.jsx-4179805763  {
        margin: 0 0 1px 0 !important;
    }

    input[type='number'] {
        -moz-appearance:textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    /** Media Queries **/
    @media (max-width: 1024px) {}
`

export const FilterUser = styled(User)`
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
    }

    .button{
        display: flex;
        justify-content: flex-end;
        width: 100%;
         
        button{
            width: 149px;
            height: 38px;
            border-radius: 26px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 20px 0;
        }
    }

    .buttons{
        display: flex;
        justify-content: flex-end;
        font-family: 'Quicksand', sans-serif;
        
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
            font-family: 'Work Sans', sans-serif;
        }
    }
`

export const TableUser = styled.div`
    margin-top: 21px;

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
            border-bottom: 1px solid #B2B2B7;
            height: 33px;
            font-size: 14px;
            color: #403F4C;
            font-family: 'Work Sans', sans-serif;

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
            }
        }
    }

`

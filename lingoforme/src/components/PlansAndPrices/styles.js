import styled from 'styled-components';

export const Prices = styled.div`

    h2{
        font-size: 24px;
        font-weight: 500;
        color: #87868F;
        margin: 25px 0 0 100px;
    }

    h4{
        margin-bottom: 10px;
        color: #403F4C;
        margin-top: 25px;
    }

    .planInfo{
        margin: 0 0 0 100px;
        h3{
            font-size: 20px;
            font-weight: 500;
            color: #004FFF;
            margin: 32px 0 15px 0;
        }

        /** Form **/
        .formulario{
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin: 15px 0 0 0;
            width: 100%;

            label{
                color: #403F4C;
                font-size: 14px;
                font-weight: 500;

                /* &:before{
                    display: none;
                } */
            }

            span{
                color: #87868F;
                font-size: 10px;
                margin-left: 5px;
            }

            input{
                width: 625px;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #B2B2B7;
                padding-left: 10px;
                margin-bottom: 15px;
            }
            
            .switch__container{
                margin: 5px auto;
                span{
                    margin-left: 50px;
                } 
                span.bestSeller{
                    margin-left: 46%;
                } 
            }   

            .switch--shadow:checked + label:before {
                background-color: #8ce196;
            }  

            .numberClass{
                margin: 10px 0 0 20px;
                input{
                    width: 200px;
                }
            }  

            

            
            
        }

        .deleteType{
            border: 1px solid #FF5666 !important;
            border-radius: 26px;
            color: #FF5666;
            font-size: 12px;
            font-weight: 500;
            background-color: transparent;
            width: auto !important;
            height: 22px;
            cursor: pointer;
            margin: 0 0 10px 0;

            &:last-child{
                width: 103px;
                margin-top: 20px;
            }

            span{
                color: #FF5666;
                margin-top: 2px !important;
            }
        }

        .deletePlans{
            width: 103px !important;
            height: 22px !important;
            border-radius: 26px;
            background: transparent;
            border: 1px solid #FF5666 !important;
            color: #FF5666 !important;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 25px 0 20px 0;
            font-family: 'Quicksand', sans-serif;
        }
        
        .lingos{
            h4{
                color: #004FFF;
                font-size: 20px;
                font-weight: 500;
                margin: 30px 0 15px 0;
            }

            .lingoSelects{
                display: flex;
            }

            .linha{
                width: 2px;
                background-color: #707070;
                height: auto;
                opacity: 0.2;
                margin-left: 12px;
            }

            .lineContent{
                display: flex;
            }

            .linhaPrice{
                width: 2px;
                background-color: #707070;
                height: auto;
                opacity: 0.2;
                margin: 0 16px 0 0;
            }

            .selects{
                display: flex;
                flex-direction: column;
                margin-left: 13px;

                .input-lingo {
                    width: 210px;
                    height: 32px;
                    margin: 0;
                }

                .delet{
                    display: flex;
                    flex-direction: column;

                    .inputDelete{
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .delete{
                        color: red;
                        margin: 10px 0 0 10px;
                        font-size: 12px;
                        font-weight: 500;
                        border: none;
                        text-align: left;
                    }

                    .input-lingo{
                        margin-bottom: 10px;
                    }
                    
                }

                button{
                    width: 107px;
                    height: 32px;
                    background-color: transparent;
                    border: 1px solid #787780;
                    border-radius: 26px;
                    font-weight: 500;
                    color: #787780;
                    cursor: pointer;
                    font-family: 'Work Sans', sans-serif;
                    font-size: 14px;

                    .fa{
                       font-size: 15px;
                       margin-left: 5px;                       
                    }
                }

                .priceSelect{
                    display: flex;
                    flex-direction: column;
                }

                select, input{
                    width: 200px;
                }
            }

             .price{
            
                .lingoSelects{
                    span{
                        text-align: center;
                        font-size: 12px;
                        margin-top: 5px;
                    }

                    .countryCurrency{
                        display: flex;
                        flex-direction: column;
                    }

                    span.currency{
                        text-align: left;
                        margin-left: 20px;
                        margin-top: 0;
                    }
                    label{
                        font-weight: 500;
                        font-size: 14px;
                        color: #403F4C;
                        font-family: 'Quicksand', sans-serif;
                    }

                    button{
                        margin: 10px 0 35px 18px;
                        width: 126px;
                    }

                    .delete {
                        margin-top: 0;
                        margin-bottom: 30px;
                        text-align: left;
                    }
                    
                }
                
            }
            
        }

        .delete {
            margin: 12px 0 0 0;
        }

    }

    .buttons{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            margin: 25px;
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
                width: 81px;
                height: 38px;
                margin-top: 5px;
                cursor: pointer;
                font-family: 'Quicksand', sans-serif;

                &:first-child{
                    background-color: transparent;
                    border:1px solid #787780;
                    color: #787780;
                    font-weight: bold;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 71px;
                    height: 28px;
                    margin-top: 8px;
                    margin-right: 10px;
                    cursor: pointer;
                    font-family: 'Quicksand',sans-serif;
                    align-items: center;
                    display: flex;
                    justify-content: center;

                    .fa{
                        margin-right: 8px;
                        font-size: 20px;
                    }
                }
                
            }
    }
        
    /** Media Queries **/
    @media (max-width: 1024px) {}


`;

export const FilterUser = styled.div`

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
            margin: 0 90px 20px 0;
            font-family: 'Work Sans', sans-serif;

            .fa{
                margin-right: 3px;
            }
        }
    }

    h2 {
        font-size: 20px;
        font-weight: 400;
        color: #87868F;
        font-family: 'Quicksand',sans-serif;
        
        .fa {
          margin: 0 5px 0 0;
          }
      }

    .formulario{
        display: flex;
        flex-direction: row;
        margin: 10px 0 0 0;

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
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            padding-left: 10px;
            margin-bottom: 15px;
            color: #87868F;
        }

        
        .profile{
            select{
                 &:last-child{
                    margin-left: 154px;
                }
            }  
            .active{
                background-color: #00D36A;
                color: #fff;
                font-size: 18px;
                font-weight: 500;
                width: 126px;
                border: none;
            }         
        }


        input{
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            color: #403F4C;
            padding-left: 10px;
            margin-bottom: 15px;
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
            width: auto;
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
            font-family: 'Quicksand',sans-serif;
            padding: 0 12px 0 12px;

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
            font-family: 'Quicksand', sans-serif;
        }
    }

    
`;

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

                /* &:first-child{
                    width: 55%;
                } */
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
            font-weight: 500;
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
                border: 1px solid #787780;
                border-radius: 26px;
                color: #787780;
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
    }

`;


import styled from 'styled-components';

export const Language = styled.div`

    h2{
        font-size: 24px;
        font-weight: 500;
        color: #87868F;
        margin: 25px 0 0 100px;
    }

    .input-lingo {
        width: 277px;
        height: 32px;
    }

    .planInfo{
        margin: 0 0 0 100px;
        h3{
            font-size: 20px;
            font-weight: 500;
            color: #004FFF;
            margin: 15px 0 15px 0;
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
                font-weight: bold;
            }

            span{
                color: #87868F;
                font-size: 10px;
                margin-left: 5px;
            }

            input{
                width: 460px;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #B2B2B7;
                padding-left: 10px;
                margin-bottom: 15px;

                &:nth-child(3){
                    width: 627px;
                }
            }
            
            .switch__container{
                margin: 5px 0 25px 0;

                span{
                    margin-left: 50px;
                } 
            }   

            .switch--shadow:checked + label:before {
                background-color: #4DBD74;
            }  

            .numberClass{
                margin: 10px 0 0 20px;
                input{
                    width: 200px;
                }
            } 
            
            .country{
                display: flex;

                .countryTop{
                    flex-direction: column;
                    display: flex;
                    margin: 0 50px 0 0;
                }
            } 
            
        }
        .deleteType{
            border: 1px solid #FF5666;
            border-radius: 26px;
            color: #FF5666;
            font-size: 12px;
            font-weight: 500;
            background-color: transparent;
            width: 85px;
            height: 22px;
            cursor: pointer;
            margin: 0 0 10px 0;

            &:last-child{
                width: 115px;
                margin: 10px 0 25px 0;
                min-height: 22px;
                text-transform: none;
                line-height: 0;
                font-family: 'Quicksand', sans-serif;
            }

            span{
                color: #FF5666;
                margin: 0;
            }
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
                font-family: 'Work Sans', sans-serif;

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

export const Table = styled.div`

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

                &:nth-child(3){
                    width: 60%;
                }
            }

            :nth-child(2){
                border-top: 1px solid #B2B2B7;
            }
        }

        td {
            border-bottom: 1px solid #B2B2B7;
            /* padding: 12px 0 12px; */
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

    .buttons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin: 0 0 25px;
        padding: 0 15px 0 15px;
        cursor: pointer;
        width: 100%;
        cursor: pointer;

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
            font-family: 'Work Sans', sans-serif;

            &:last-child{
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
                font-family: 'Work Sans', sans-serif;

                .fa{
                    margin-right: 3px;
                }
            }
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
            margin: 40px 0 20px 0;
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
            width: 81px;
            height: 28px;
            border-radius: 26px;
            background: #fff;
            border: 1px solid #B2B2B7;
            color: #B2B2B7;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 10px 0 0 0;
            margin-right: 10px;

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
`
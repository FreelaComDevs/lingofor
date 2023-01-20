import styled from 'styled-components';

export const Prices = styled.div`

    h2{
        font-size: 24px;
        font-weight: 500;
        color: #87868F;
        margin: 25px 0 0 100px;
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
                font-weight: bold;
            }

            span{
                color: #87868F;
                font-size: 10px;
                margin-left: 5px;
            }

            input{
                width: 545px;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #B2B2B7;
                padding-left: 10px;
                margin-bottom: 15px;
                color: #403F4C;
                font-size: 14px;
                font-family: 'Quicksand',sans-serif;
            }
            
            .switch__container{
                margin: 5px auto;
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

        
            .linhaSelects{
                display: flex;

                select{
                    width: 200px;
                    height: 32px;
                    border-radius: 26px;
                    border: 1px solid #B2B2B7;
                    padding-left: 10px;
                    margin: 0 15px 15px 0;
                }
            }

            button{
                background-color: transparent;
                border: 1px solid #787780;
                color: #403F4C;
                font-weight: bold;
                font-size: 11px;
                border-radius: 26px;
                width: 128px;
                height: 32px;
                margin: 30px 10px 60px 0;
                cursor: pointer;
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
            font-size: 11px;
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
                width: 71px;
                height: 28px;
                margin-top: 8px;
                margin-right: 10px;
                cursor: pointer;

                .fa{
                    margin-right: 3px;
                }
            }
        }
    }
        
    /** Media Queries **/
    @media (max-width: 1024px) {}


`;

export const Table = styled.div`
    .bigBox {
        margin-top: 0;

        &:last-child{
            margin-bottom: 50px;
        }
    }

    .topTable{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 20px;
        align-items: flex-end;

        h3{
            color: #004FFF;
            font-size: 20px;
            font-weight: 500;
            font-family: 'Quicksand', sans-serif;
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
            margin-top: 0;
            cursor: pointer;

            &:last-child{
                margin-top: 40px;
                
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

        tr{
            text-align: left;  
            height: 35px;        

            th{
                color: #403F4C;
                font-size: 12px;
                font-weight: bold;
            }
        }

        td {
            border: 1px solid #B2B2B7;
            border-left: 0;
            border-right: 0;
            height: 33px;
            font-size: 14px;
            color: #403F4C;
            font-weight: 100;
            font-family: 'Work Sans', sans-serif;

            :nth-child(2){
                width: 65%;
            }

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
        .active{
            color: #0ED572;
            font-weight: bold;
        }
    }

`;
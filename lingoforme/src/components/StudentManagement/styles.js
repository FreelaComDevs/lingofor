import styled from 'styled-components'


export const StudentManagementCss = styled.div`
.tabs{
    width: 100%;

    /** Tabs **/
    .tab-list {
        border-bottom: 1px solid #ccc;
        padding-left: 0;

        .tab-content{
            margin: 0 auto;
            width: 100%;
            text-align: center;
            
            .tab-list-item {
                display: inline-block;
                list-style: none;
                margin-bottom: -1px;
                padding: 0;
                margin-right: 24px;
                cursor: pointer;
                font-size: 16px;
                font-family: 'Quicksand', sans-serif;
                color: #706F79;
                font-weight: 500;
            }
        
            .tab-list-active {
                color: #004FFF;
                font-weight: bold;
                border-bottom: 4px solid #004FFF;
                font-size: 16px;
                font-family: 'Quicksand', sans-serif
            }
        }
    }

    /** Box **/
    .box{
        width: auto;
        height: 100%;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        padding: 10px 0 20px 15px;
        box-shadow: 2px 2px 12px 1px #ccc;
        border-radius: 4px;

        
    }

    .centered {
        flex-direction: column;
        align-items: center;
    }

    //  .bigBox {
    //     width: 100%;
    //     height: 100%;
    //     background-color: #fff;
    //     border-radius: 5px;
    //     padding: 15px;
    //     box-shadow: 1px 1px 4px 1px #DADADA;
    //     display: flex;
    //     align-items: flex-start;
    //     flex-direction: row;
    //     margin-top: 25px;
    // } 





    .userName{
        h2{
            font-size: 24px;
            font-weight: 500;
            color: #87868F;
            margin:25px 0 0 100px;
            font-family: 'Quicksand', sans-serif;
        }
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

    /** Personal**/
    .changePhoto{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        /* width: 100%; */
        margin: 40px 85px 0 25px;

        h2{
            color: #403F4C;
            font-size: 14px;
            margin-bottom: 10px;
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
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;

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

            span{
                display: flex; 
                align-items: center;
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
        justify-content: center;
        flex-direction: column;
        margin: 40px 100px 0 0;

        label{
            color: #403F4C;
            font-size: 14px;
            font-weight: bold;
        }

        .addEmail{
            display: flex;

            input{
                width: 460px;
            }
        }

        .label{
            margin: 0 0 -15px 0;
        }

        span{
            color: #87868F;
            font-size: 10px;
            margin-left: 5px;
        }

        span.invalid {
            font-size: 10px;
            margin-left: 5px;
            /* color: red; */
        }
        select{
            width: 220px;
            height: 35px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            padding-left: 10px;
            margin-bottom: 15px;
            color: #403F4C;
            font-family: 'Quicksand',sans-serif;
            font-size: 14px;
            margin-top: 2px;
        }


		.profile{
            display: flex;
            justify-content: flex-start;
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
            background-color: transparent;
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
            margin-top: 2px;
        }
		
		::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #87868F;
        }

		.addInput{
            width: 128px;
            height: 32px;
            border-radius: 26px;
            margin: 0 24px;
            background: transparent;           
            border: 1px solid #B2B2B7;
            color: #87868F;
            cursor: pointer;
            font-family: 'Work Sans', sans-serif;
        }

        input:invalid{
            width: 460px;
            height: 32px;
            border-radius: 26px;
            /* border: 1px solid red; */
            padding-left: 10px;
            margin-bottom: 15px;
        }

        .inputs{
            display: flex;

            

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


        .telephone{
            input{
                width: 220px;
            }

            button.addInput{
                margin: 20px 0 0 0;
                font-family: 'Work Sans', sans-serif;
            }
        }

        button.addInput{
            width: 132px;
            height: 32px;
            border-radius: 26px;
            margin-left: 20px;
            background: transparent;
            border: 1px solid #403F4C;
            color: #403F4C;
            font-family: 'Work Sans', sans-serif;
            font-size: 14px;
            cursor: pointer;
            margin-bottom: 22px;
            font-weight: 500;
        }

         button.password{
            width: 158px;
            height: 32px;
            border-radius: 26px;
            margin-left: 0;
            background: transparent;
            border: 1px solid #B2B2B7;
            color: #403F4C;
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
            cursor: pointer;
            font-weight: 100;
            margin: 2px 0 44px 0;
        }

        .notification{
            display: flex;

            .switch__container{
                margin: 5px 0 0 23px;

                span{
                    margin-left: 47px;
                    font-size: 12px;
                    color: #707070;
                    font-family: 'Quicksand', sans-serif;
                }
            }

            span.delete{
                margin: 11px 0 0 0;
                width: 55px;
                font-weight: bold;
            }
        }

        .switchBox{
            display: flex;
        }

        // select{
        //     width: 220px;
        //     height: 32px;
        //     border-radius: 26px;
        //     border: 1px solid #403F4C;
        //     padding-left: 10px;
        //     margin-bottom: 15px;
        // }

        .selects{
            display: flex;
            flex-direction: row;

        }

        .lineSelect{
            margin: 0 25px 0 0;

            p{
                font-size: 11px;
                margin-top: 22px;
                color: #403F4C;
            }
        }

        span.delete {
            color: red;
            font-size: 10px;
            font-weight: bold;
            margin-top: 30px;
            float: left;
        }


        button{
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-weight: bold;
            font-size: 11px;
            border-radius: 26px;
            width: 81px;
            height: 38px;
            margin: 15px 0 42px 0;
            cursor: pointer;
        }

        button.jsx-4179805763    {
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
            background: #B2B2B7;
            border-radius: 0;
        }
        button.focus.jsx-4179805763  {
            background: #B2B2B7;
        }

        button.delete{
            width: 83px;
            height: 22px;
            border-radius: 26px;
            background: transparent;           
            border: none;
            color: #FF5666;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 25px 0 20px 10px;
            
        }

    }

    /** Button Save **/
    .buttonSave{
        display: flex;
        justify-content: flex-end;
        margin-right: 30px;

        button{
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
            font-family: 'Work Sans',sans-serif;
        }
    }

    input.jsx-4179805763  {
        width: 226px !important;
        height: 32px;
        border-radius: 26px;
        border: 1px solid #B2B2B7;
        padding-left: 10px;
        margin-bottom: 0;
        // margin-top: 21px;       
    }
    
    /** Plans **/
    .planBox{

        .box {
            flex-direction: column;
            padding: 0;

            &:last-child{
                margin-bottom: 85px;
            }

            .buttons{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
                margin: 25px 35px 25px 0;
                padding: 0 15px 0 15px;
                cursor: pointer;
        
                button {
                    background-color: transparent;
                    border: 1px solid #787780;
                    color: #403F4C;
                    font-weight: bold;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 71px;
                    height: 38px;
                    margin-top: 8px;
                    cursor: pointer;
    
                    &:last-child{
                        background-color: #004FFF;
                        border: none;
                        color: #fff;
                        font-weight: bold;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 81px;
                        height: 38px;
                        margin-top: 5px;
                        margin-left: 15px;
                        cursor: pointer;
                    }
                }
            }
        }

        .PlansBox {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;

            &:last-child{
                margin-bottom: 25px;
            }

            .chosenPlan {
                flex-direction: row;
                display: flex;
                margin: 0;
                width: 100%;
                height: 80px;
                padding: 10px 0 0 15px;
                margin-left: 13px;
                flex-wrap: wrap;

               h2 {
                    padding: 0 30px 0 0;
                    font-size: 15px;
                    color: #403F4C;
                    font-weight: bold;
                    margin: 0;
                }

                h3 {
                    padding: 0;
                    margin: 0;
                    font-size: 18px;
                    color: #403F4C;
                    font-weight: bold;
                }

                p {
                    color: #403F4C;
                    font-size: 15px;
                    padding: 0;
                    margin: 0 0 5px 0;
                }

                button {
                    background-color: #004FFF;
                    border: none;
                    color: #fff;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 86px;
                    height: 28px;
                    margin-top: 5px;
                    cursor: pointer;

                    &:last-child {
                        background-color: #fff;
                        border: 1px solid #B2B2B7;
                        color: #B2B2B7;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 93px;
                        height: 28px;
                        margin: 5px 0 26px 10px;
                        cursor: pointer;
                    }
                }

            }

            .last{                    
                margin-bottom: 20px;
            }

            .plans {
                display: flex;
                margin: 20px 85px 0 20px;

                .changePlan {
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    padding-left: 10px;

                    h2 {
                        color: #403F4C;
                        font-size: 18px;
                        font-weight: bold;
                        margin-top: 6px;
                    }

                    button {
                        background-color: #004FFF;
                        border: none;
                        color: #fff;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 86px;
                        height: 22px;
                        margin-top: 5px;
                        cursor: pointer;
                        font-family: 'Quicksand', sans-serif;

                        &:last-child {
                            background-color: #fff;
                            border: 1px solid #B2B2B7;
                            color: #B2B2B7;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 93px;
                            height: 22px;
                            margin-top: 5px;
                            cursor: pointer;
                        }

                        .fa{
                            margin-left: 10px;
                        }
                    }
                }

                /** Controle Plano **/
                .controlPlan{
                    display: flex;
                    flex-direction: row;
                    align-items: start;
                    width: 100%;

                    .infos{
                        flex-direction: column;
                        margin: 8px 25px 0 0;
                    }

                    h2{
                        font-size: 13px;
                        color: #9E9EA4;
                        font-weight: bold;
                        margin: 0;
                        padding: 0;
                        font-family: 'Quicksand', sans-serif;
                    }

                    h3{
                        font-size: 14px;
                        color: #403F4C;
                        margin: 3px 0 0 0;
                        padding: 0;
                        font-family: 'Quicksand',sans-serif;
                        font-weight: 100;
                    }

                    span{
                        color: #004FFF;
                        font-size: 22px;
                        font-weight: bold;

                        &:last-child{
                            color: #004FFF;
                            font-size: 14px;
                            font-weight: 50
                        }
                    } 
                }

                /** Números **/
                .numbers{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: -3px;
                }

                /** Stock **/
                .stock{
                    hr {
                        height: 4px;
                        background-color: #004FFF;
                        width: 100%;
                        border: none;
                        margin: 9px 0 10px 0;
                        opacity: 1;
                    }

                    span{
                        color: #004FFF;
                        font-size: 12px;
                    }
                }

                
                /** Pagamento **/
                .payment{
                    flex-direction: column;
                    margin-top: 7px;
                    width: 150px;

                    h2{
                        font-size: 14px;
                        color: #9E9EA4;
                        font-weight: bold;
                        margin: 0;
                        padding: 0;
                        font-family: 'Quicksand',sans-serif;
                        text-transform: uppercase;
                    }

                    h3{
                        font-size: 16px;
                        color: #403F4C ;
                        margin: 0;
                        padding: 0;
                        font-family: 'Quicksand',sans-serif;
                        font-weight: 100;
                        display: flex;
                        align-items: center;

                        img{
                            margin-right: 8px;
                            width: 30px !important;
                            height: 20px !important;
                        }
                    }

                    button{
                        background-color: transparent;
                        border: 1px solid #FF5666;
                        color: #FF5666;
                        font-size: 11px;
                        border-radius: 26px;
                        width: auto;
                        height: 22px;
                        margin-top: 8px;
                        padding: 0 12px 0 12px;
                        cursor: pointer;
                    }

                    select {
                        width: 100%;
                        height: 38px;
                        border-radius: 26px;
                        border: 1px solid #403F4C;
                        padding-left: 10px;
                        margin-bottom: 15px;
                        color: #403F4C;
                        margin-right: 10px;
                        opacity: 0.4;
                    }
                }
                


                /** Valores **/
                .value {
                    margin-top: 8px;

                    h2{
                        font-size: 15px;
                        color: #87868F;
                        font-weight: bold;
                        margin: 0;
                        padding: 0;
                    }

                    h3{
                        font-size: 18px;
                        color: #403F4C;
                        font-weight: normal;
                        margin-top: 4px;
                        margin: 0;
                        padding: 0;
                    }

                    button{
                        background-color: #fff;
                        border: 1px solid #787780;
                        color: #403F4C;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 94px;
                        height: 22px;
                        margin-top: 8px;
                        cursor: pointer;
                    }

                }

                &:nth-child(2) {
                    flex-direction: column;
                }

                &:last-child button{
                   
                    background-color: #fff;
                    border: 1px solid #B2B2B7;
                    color: #787881;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 104px;
                    height: 22px;
                    margin-top: 5px;
                    cursor: pointer;
                    font-family: 'Quicksand', sans-serif;

                    .fa{
                        margin-left: 7px;
                    }
                }

                .buttons{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 25px;
                    padding: 0 15px 0 15px;
                    cursor: pointer;

                    button{
                        background-color: transparent;
                        border: 1px solid #787780;
                        color: #403F4C;
                        font-weight: bold;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 71px;
                        height: 38px;
                        margin-top: 8px;
                        cursor: pointer;

                        &:last-child{
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
                        }
                    }

                    .cancel{
                        button{
                            background-color: transparent;
                            border: 1px solid #FF5666;
                            color: #FF5666;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 104px;
                            height: 22px;
                            margin-top: 5px;
                            cursor: pointer;
                        }
                    }
                }

            }

            .planCancel{
                background-color: #FF5666;
                color: #fff;
                padding: 4px 10px 0 10px;
                height: 23px;
                margin-top: 32px;
                font-size: 15px;
                font-weight: bold;
                font-family: 'Quicksand', sans-serif;
            }
        }
    }

    /** box Big **/
    .boxBig {
        width: 100%;
        padding: 10px 20px 0 0;
        margin: 0 auto;

        
        button {
            background-color: #fff;
            border: 1px solid #403F4C;
            color: #403F4C;
            font-size: 13px;
            border-radius: 26px;
            width: auto;
            height: 28px;
            margin-top: 0;
            cursor: pointer;
            padding: 0 12px 0 12px;
            float: right;
            display: block;
            font-family: 'Work Sans',sans-serif;
        }

        button.active {
            background-color: #004FFF;
            color: #fff;
            border: #004FFF;
            height: 32px;
            font-weight: 900;
            font-family: 'Work Sans', sans-serif;
            padding: 0 25px 0 25px;
        }
        
        .buttons{
            display: flex;
            justify-content: flex-end;
            font-family: 'Quicksand', sans-serif;
            align-items: center;
        }
        
        .itemBox {
            display: flex;
            justify-content: space-between;
            width: 100%;
            flex-wrap: nowrap;
            flex-direction: row;
            margin: 0 0 27px 0;
            align-items: normal;

            &:first-child {
                border-bottom: 1px solid #D9D8DB;
            }

            .buttonLast{
                margin: 28px 0 0 0;
                width: 135px;

              
            }

            h5{
                padding: 0;
                margin: 0 0 10px 0;
                font-weight: 100;
                color: #403F4C;
                font-size: 14px;    
                
                /* &:last-child{
                    margin: 15px 0 7px 0 !important;
                } */
            }

            span{
                color: #004FFF;            
                font-weight: 500;

                strong{
                    font-weight: bold;
                }
            }


            input{
                width: 90%;
                height: 29px;
                border-radius: 26px;
                border: 1px solid #B2B2B7;
                color: #403F4C;
                padding-left: 10px;
                margin-bottom: 15px;
                background-color: transparent;
                font-family: 'Quicksand',sans-serif;
                font-size: 14px;
            }

            select{
                width: auto;
                height: 34px;
                border-radius: 26px;
                border: 1px solid #403F4C;
                padding: 0 25px 0 25px;
                margin-bottom: 15px;
                color: #403F4C;
                opacity: 0.4;
            }

            .levelTop {
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                width: 100%;
                max-width: 260px;

                .levelTopLinguage {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;

                    .boxLanguage {
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                        flex-direction: column;

                        h5{
                            padding: 0;
                            margin: 0;
                            color: #9F9FA5;                            
                            font-size: 15px;
                            font-weight: bold;
                        }

                        .language {
                            display: flex;
                            margin: 0 0 13px 0;
                            align-items: center;

                            img {
                                margin: 0 8px 0 0;
                                width: 30px !important;
                                height: 20px !important;
                            }

                            h5{
                                font-size: 16px;
                                color: #403F4C;
                                margin: 0;
                                padding: 0;
                                font-family: 'Quicksand',sans-serif;
                                font-weight: 100;
                            }
                        }

                        
                    }

                    .boxLevel {
                        display: flex;
                        align-items: end;
                        align-content: flex-end;
                        flex-direction: column;
                        width: 100%;
                        text-align: left;
                        margin-left: 36px;
                        

                        h5{
                            font-size: 15px;
                            color: #403F4C;
                            margin: 0 0 8px 0;
                            padding: 0;
                            font-family: 'Quicksand',sans-serif;                            
                            font-weight: 100;

                            &:first-child{
                                font-weight: bold;                                
                                color: #9F9FA5;
                            }
                        }
                    }

                }

                .columLevel {
                    justify-content: flex-end;
                    display: flex;
                    width: 100%;

                    h5 {
                        text-align: right;
                        padding: 0;
                        margin: 0;
                        color: #87868F;
                    }
        
                }
            }

            

            .grades {
                display: flex;
                flex-direction: row;
                width: 139px;

                h6 {
                    margin: 28px 10px 0 0;
                    color: #9F9FA5;
                    font-size: 15px;
                    font-family: 'Quicksand', sans-serif;
                    font-weight: bold;
                    width: 70px;
                }

                h5{
                    padding: 0;
                    margin: 0 0 10px 0;
                    color: #403F4C;
                    font-size: 14px;
                    font-family: 'Quicksand', sans-serif;
                    font-weight: normal;

                    span {
                        color: #004FFF;
                        font-weight: 500;
                    }
                }
            }
        }
    }

    /** Notifications **/
    .infoNotification {
        width: 100%;

        h2 {
            color: #403F4C;
            font-size: 18px;
            margin: 40px 0 0 52px;
            font-weight: 100;
            font-family: 'Quicksand', sans-serif;
        }
        
        ul {
            margin: 40px 0 0 57px;
            display: flex;
            width: 88%;
            flex-direction: column;

           li {
                display: flex;
                align-items: center;
                padding: 0;
                margin: 0;
                height: 50px;

                span {
                    width: 70px;
                    //margin: -23px 25px 0 0;
                    color: #403F4C;
                    //font-weight: bold;
                    font-size: 16px;
                    font-family: 'Quicksand', sans-serif;
                }

            }            
        }
    }

    /** Manage Available Hours **/
    .topManage {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        margin: 15px 25px 0 0;
        align-items: center;

        h2 {
            font-size: 18px;
            color: #403F4C;
            font-weight: normal;
        }

        button {
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            border-radius: 26px;
            width: auto;
            height: 38px;
            margin-top: 5px;
            padding: 12px;
            cursor: pointer;
            font-family: 'Work Sans', sans-serif;
        }
    }

    .manage {
        display: flex;
        width: 100%;
        justify-content: start;
        flex-direction: column;

        .day {
            display: flex;
            align-items: center;
            flex-direction: row;
            margin: 10px 0 10px 0;
        }

        h2 {
            font-size: 14px;
            color: #004FFF;
            font-weight: 500;
            font-family: 'Work Sans', sans-serif;
        }

        p{
            color: #C5C5C5
        }

        button {
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-size: 11px;
            font-weight: bold;
            border-radius: 26px;
            width: 44px;
            height: 22px;
            margin: 5px 0 0 16px;
            cursor: pointer;
        }

        ul {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            list-style: none;
            padding: 0;

            .configDay {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
                margin: 0 30px 0 0;
            }

            li {
                font-size: 14px;
                color: #403F4C;
                padding: 0 5px 0 0;

               span {
                    color: red;
                    font-size: 12px;
                }
                
                button {
                    background-color: white;
                    width: 55px;
                    cursor: pointer;
                    color: red;
                    font-size: 12px;
                    margin: 0;
                    font-family: 'Quicksand', sans-serif;
                    font-weight: 500;
                }

            }
        }

    }

    /** Edit **/
    .selectDays{
        margin: 35px 0 0 28px;
        
        h2 {
            color: #403F4C;
            font-size: 28px;
            margin: 0;
            font-family: 'Quicksand',sans-serif;
            font-weight: 100;
        }

        h3 {
            color: #403F4C;
            font-size: 12px;
            margin: 0;
        }

        h4 {
            color: #403F4C;
            font-size: 14px;
            margin: 25px 0 0 0;
        }

        ul {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            justify-content: start;
            list-style: none;
            padding: 0;

            li {
                margin: 0 10px 0 0;
                padding: 5px 0 0 0;

                span{
                    font-size: 12px;
                    color: #403F4C;
                    margin-top: 5px;
                    font-family: 'Quicksand', sans-serif;
                }

                button {
                    background-color: #fff;
                    border: 1px solid #B2B2B7;
                    color: #B2B2B7;
                    font-size: 14px;
                    border-radius: 26px;
                    width: 76px;
                    height: 28px;
                    margin-top: 0;
                    cursor: pointer;                   
                }

                button.active {
                    background-color: #004FFF;
                    color: #fff;
                    border: #004FFF;
                }
            }
        }

        .time{
            ul {
                list-style: none;
                margin-left: 24px;

                li {
                    display: flex;
                    flex-direction: column;
                }
            }

            select {
                background-color: #004FFF;
                color: #fff;
                border-radius: 26px;
                border: 0;
                width: 114px;
                height: 28px;
                padding-left: 10px;
                font-family: 'Work Sans', sans-serif;
                font-size: 14px;
                margin-top: 5px;
            }
        }

        .addSlot{
            button {
                background-color: #fff;
                border: 1px solid #B2B2B7;
                color: #B2B2B7;
                font-size: 14px;
                border-radius: 26px;
                width: 162px;
                height: 28px;
                margin: 20px 0 36px 24px;
                cursor: pointer;
                font-family: 'Work Sans', sans-serif;
                font-weight: 500;
            }
        }

        .buttons {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            margin: 25px;
            padding: 0 15px 0 15px;
            cursor: pointer;
            font-family: 'Quicksand', sans-serif;

            button {
                background-color: transparent;
                border: 1px solid #787780;
                color: #403F4C;
                font-weight: bold;
                font-size: 11px;
                border-radius: 26px;
                width: 71px;
                height: 28px;
                margin-top: 8px;
                cursor: pointer;

                .fa{
                    margin-right: 5px;
                }

                &:last-child {
                    background-color: #004FFF;
                    border: none;
                    color: #fff;
                    font-weight: bold;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 81px;
                    height: 38px;
                    margin-left: 15px;
                    margin-top: 5px;
                    cursor: pointer;
                }
            }
        }
    }   
                
    .pagamento{
        display: flex;
    }

    .inputManage{
        border-color: #B2B2B7 !important;
    }
               
}


@media (max-width: 1024px) {
            .tabs{
                .tab-list{
                    .tabsContent {
                        margin: 0 auto;
                        width: 100%;
                        max-width: 100%;
                        display: flex;

                        .tab-list-item {
                            font-size: 12px;
                            text-align: center;
                            padding: 0 0.75rem;
                        }
                    }
                }
            
            .box {
                height: 100%;
                flex-direction: column;
                padding: 0;
                margin: 20px auto;
            }
            

            .changePhoto {
                padding-top: 20px;
            }

            .formulario {
                display: flex;
                justify-content: center;
                flex-direction: column;
                width: 90%;
                margin: 20px auto;

                input {
                    width: 100%;
                }

                .telephone{
                    input {
                        width: 90%;
                        margin: 0 10px 0 0;
                    }

                    button.addInput {
                        text-indent: -9000px;
                        width: 25px;
                        height: 25px;
                        margin-top: 25px;
                        font-family: 'Work Sans', sans-serif;
                    }
                }

   

                input.inputMobile{
                    width: 55%;
                }

                select.inputMobile{
                    width: 55%;
                }

                .notification {
                    flex-direction: column;

                     .switch__container {
                        margin: 0 0 15px 4px;
                    }

                    span.delete {
                        margin: 6px 0 0 20px;
                        border-radius: 50px;
                        border: 1px solid red;
                        width: 25px;
                        height: 25px;
                        text-indent: -9000px;
                    }
                }

                .switchBox{
                    display: flex;
                }

                &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                    padding-left: 10px;
                }

                select {
                    width: 66%;
                }

                .selects {
                    flex-direction: column;
                    width: 100%;
                }

                .telephone {
                    flex-direction: row;
                    width: 100%;
                    margin-bottom: 15px;

                    select{
                        width: 95%;
                        margin: 0 20px 0 0;
                    }

                    span.delete {
                        margin: 20px 0 0 0;
                        border-radius: 50px;
                        border: 1px solid red;
                        width: 25px;
                        height: 25px;
                        text-indent: -9000px;
                    }
                    
                }

                 .lineSelect {
                    margin: 0 5px 0 0;
                    width: 100%;

                     p {
                        font-size: 11px;
                        margin: -9px 0 12px 0;
                    }

                    button.addInput {
                        text-indent: -9000px;
                        width: 25px;
                        height: 25px;
                        margin-top: 25px;
                        font-family: 'Work Sans', sans-serif;
                    }

                }

                .buttonSave {
                    display: flex;
                    justify-content: center;
                    margin: 0;
                }

            }

            .buttonSave {
                justify-content: center;
            }

            .plans {
                width: 88%;
                margin-left: 0;
                margin-bottom: 58px;
                margin: 15px auto;
            }

            .PlansBox{
                flex-direction: column !important; 

                .changePlan {
                    flex-direction: row !important;
                    width: 100%;
                    flex-wrap: wrap;

                    h2{
                        margin-bottom: 5px;
                    }

                    button{
                        margin-left: 40px;

                        &:last-child{
                            margin-left: 0;
                        }
                    }
                }
                .plans:nth-child(2) {
                    margin-top: 0;
                }

                .stock{
                    hr {
                        margin: 2px 0 5px 0 !important;
                    }
                }

            }

            .controlPlan{
                .infos {
                    margin: 8px 106px 0 0 !important;
                }
            }

            .numbers {
                margin-top: 8px;
            }

            /** Level **/
            .itemBox {
                display: flex !important;
                justify-content: space-between !important;
                width: 100% !important;
                flex-wrap: wrap !important;
                flex-direction: row !important;
            }

            .levelTop {
                flex-direction: row !important;
                width: 100% !important;
                max-width: 100% !important;
                margin-bottom: 25px !important;
            }

            .columLevel {
                justify-content: end;
            }

            .grades {
                margin: -17px 0 0 0px !important;
                align-items: baseline;
                flex-direction: column;

                h6 {
                    margin: 13px 10px 6px 0;
                }

            }

            .columLevel {
                justify-content: end !important;

                h5 {
                    text-align: left !important;
                }
            }
    

            .infoNotification{
                h2 {
                    margin: 14px 0 0 18px;
                }

                ul {
                    margin: 10px 0 0 17px;
                }
            }

            .manage{
                padding: 15px;

                h2{
                    margin: 0;
                }

                ul{
                    flex-direction: column;

                    .configDay {
                        flex-direction: row;
                        width: 93%;
                        margin: 0 0 10px 0;
                    }
                }

                
            }

            .topManage {
                flex-direction: column;
                padding: 15px;

                button{
                    margin-bottom: 25px;
                }
            }


    }
}

@media (min-width: 1027px) and  (max-width: 1600px){
    .plans {
        margin: 20px 17px 0  12px !important;
    }
}


`;

export const FilterCss = styled(StudentManagementCss)`
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
        align-items: center;
        
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
                width: auto;
                height: 32px;
                border-radius: 26px;
                background: #004FFF;
                border: 1px solid #004FFF;
                color: #fff;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                margin: 18px 18px 0 0;
                padding: 0 12px 0 12px;
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

export const TableCss = styled.div`
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
            margin: 0 0 -15px 0;
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
            margin: 25px 0 20px 20px;
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

    .inativo{
        color: #FF5666;
        font-weight: bold;
    }
    

    .formulario{
        flex-direction: row;
        margin: 10px 0 0 0;

        .lineInput{
            display: flex;
            flex-direction: column;
            margin: 0 16px 0 0;
            width: 100%;
            min-width: 10%;
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

    .boxButton{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .buttonShow{
        display: flex;
        justify-content: flex-end;
        width: 100%;

        button{
            width: 84px;
            height: 22px;
            border-radius: 26px;
            background: #fff;
            border: 1px solid #B2B2B7;
            color: #787780;
            cursor: pointer;
            font-size: 11px;
            font-weight: 500;
            margin: 18px 0 0 0;
            margin-right: 0;
            font-family: 'Quicksand',sans-serif;
        }
    }

    .buttons{
        display: flex;
        justify-content: flex-end;
        font-family: 'Quicksand', sans-serif;
        align-items: center;
        width: 100%;
        
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
            color: #787780;
            cursor: pointer;
            font-size: 11px;
            font-weight: 500;
            margin: 18px 0 0 0;
            margin-right: 10px;
            font-family: 'Quicksand',sans-serif;

            &:last-child{
                width: auto;
                height: 32px;
                border-radius: 26px;
                background: #004FFF;
                border: 1px solid #004FFF;
                color: #fff;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                margin: 18px 18px 0 0;
                padding: 0 12px 0 12px;
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

    .buttonsSelect{
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        font-family: 'Quicksand', sans-serif;
        align-items: flex-start;

        button {
            width: 84px;
            height: 32px;
            border-radius: 26px;
            background: #fff;
            border: 1px solid #B2B2B7;
            color: #B2B2B7;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin-right: 10px;
            font-family: 'Quicksand', sans-serif;           
        }
    
        button.active {
            width: 84px;
            height: 32px;
            border-radius: 26px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
        }  
       
    }    


    .teacherListBox{
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 5px;
        padding: 15px;
        box-shadow: 1px 1px 4px 1px #DADADA;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        margin-top: 25px;

        h3 {
            margin-right: 20px;
            white-space: nowrap;
            font-size: 18px;
            font-family: 'Quicksand', sans-serif;
            font-weight: bold;
        }

        .switch__container{
            margin: 0px;
        }
    }

 
.bigBoxTeacher {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    margin-top: 1px;
    box-shadow: 0px 1px 0px 1px #DADADA;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .boxInfo{
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
    }

    .boxColumn {
        align-items: flex-start;
        padding: 0px 15px 0px 15px;
        display: flex;
        flex-direction: column;
    }

    .endColumn{
        display: flex;
        align-items: center;
        margin-right: 15px;
        width: 100px;
        justify-content: space-between;

        label{
            width: auto;
            min-width: 0;
        }
    }

    label {
        color: #004FFF;
        font-weight: bold;
        font-size: 16px;
        font-family: 'Quicksand',sans-serif;
        width: 100%;
        min-width: 40px;
    }
    
    label:last-child {
        cursor: grab;
        cursor: -webkit-grab;
    }

    p{
        font-size: 14px;
        font-weight: bold;
        color: #403F4C;
    }

    span.grades{
        font-size: 24px;
        font-weight: 100;
        color: #403F4C;
        margin: 0 12px 0 8px;
    }

    button.delete{
        width: auto;
        height: 32px;
        border-radius: 26px;
        background: transparent;
        border: none;
        color: #FF5666;
        cursor: pointer;
        font-size: 11px;
        font-weight: bold;
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
        margin: 0 0 15px 0;

        thead{
            border-bottom: 1px solid #B2B2B7;
        }

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
            font-weight: 100;
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
                width: auto;
                height: 22px;
                float: right;
                cursor: pointer;
                padding: 0 15px 0 15px;
                display: flex;
                align-items: center;
                margin: 0 0 0 10px;

                .fa{
                    margin-left: 7px;
                }
            }

            img{
                width: 18px !important;
                height: 12px !important;
                margin-top: 4px;
            }
        }
    }

`

export const Tab = styled.div`

.tabs{
    width: 100%;

    /** Tabs **/
    .tab-list {
        border-bottom: 1px solid #ccc;
        padding-left: 0;

        .tab-content{
            margin: 0 auto;
            width: 100%;
            text-align: center;
            
            .tab-list-item {
                display: inline-block;
                list-style: none;
                margin-bottom: -1px;
                padding: 0;
                margin-right: 24px;
                cursor: pointer;
                font-size: 16px;
                font-family: 'Quicksand', sans-serif;
                color: #706F79;
                font-weight: 500;
            }
        
            .tab-list-active {
                color: #004FFF;
                font-weight: bold;
                border-bottom: 4px solid #004FFF;
                font-size: 16px;
                font-family: 'Quicksand', sans-serif
            }
        }
    }

}

@media (max-width: 1024px) {
    .tabs{
        .tab-list{
            .tabsContent {
                margin: 0 auto;
                width: 100%;
                max-width: 100%;
                display: flex;

                .tab-list-item {
                    font-size: 12px;
                    text-align: center;
                    padding: 0 0.75rem;
                }
            }
        }
    }

`




export const Billing = styled.div`

    .box {
        width: 88%;
        height: 55px;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        padding: 15px 10px 20px 10px;
        margin: 20px auto;
        justify-content: space-between;
        align-items: center;

        .topBox {
            display: flex;
            align-items: center;

            h2 {
                margin-left: 15px;
                font-size: 20px;
                font-weight: bold;
            }
        }

        .titleBox{
            h2 {
                color: #004FFF;
                font-size: 16px;
                font-weight: bold;
                margin: 5px 15px 5px 60px;
            }
        }

        .boxInfo {
            display: flex;
            width: 100%;
            justify-content: space-between;
            padding: 0 10px 0 10px;
            flex-wrap: wrap;

            .infoBilling {
                flex-direction: column;

                h2 {
                    font-size: 13px;
                    color: #403F4C;
                    font-weight: bold;
                    margin: 0;
                    padding: 0
                }

                h3 {
                    font-size: 13px;
                    color: #403F4C;
                    font-weight: normal;
                    margin: 0;
                    padding: 0
                }
                
                span {
                    color: #00D36A;
                    font-weight: bold;
                }
                
            }

            .word-wrap-break {
                word-break: break-all;
                width: 25%;
            }
        }
    }

    .buttons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin: 25px 35px 25px 0;
        padding: 0 15px 0 15px;
        cursor: pointer;

        button {
            background-color: transparent;
            border: 1px solid #787780;
            color: #403F4C;
            font-weight: bold;
            font-size: 11px;
            border-radius: 26px;
            width: 71px;
            height: 28px;
            margin-top: 8px;
            cursor: pointer;

            .fa{
                margin-right: 10px;
            }
        }
    }
    
}

/** Media Queries **/
@media (max-width: 1024px) {
    
    .box {
        width: 90%;
        height: 100%;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        padding: 20px 0 15px 10px;
        margin: 20px auto;
        justify-content: space-between;
        align-items: center;
    }

    .infoBilling {
        flex-direction: column;
        margin: 0 15px 15px 0;
    }

    .rowBilling {
        flex-direction: column;
        display: flex;
        width: 100%;;
    }


}

`;


export const Form = styled.div`
    width: 100%;

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


    .singIn{
        margin-top: 25px;
        border-right: 1px solid #E4E8EE;
        width: 94%;
        margin-left: 6%;

        form{

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
                height: 29px;
                border-radius: 26px;
                border: 1px solid #403F4C;
                padding-left: 10px;
                margin-bottom: 15px;
                padding-top: 4px;
                opacity: 0.4;
            }

            select{
                width: 90%;
                height: 34px;
                border-radius: 26px;    
                border: 1px solid #403F4C;
                padding-left: 10px;
                margin-bottom: 15px;
                color: #403F4C;
                opacity: 0.4;
            }

            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                margin-top: 10px;
                color: #403F4C;
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
            justify-content: center;
            text-align: center;
        }

        .switch--shadow + label {
            width: 32%;
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
            margin: 40px 0 10px 0;


            h2{
                color: #403F4C;
                font-size: 22px;
            }

            h3{
                color: #403F4C;
                font-size: 12px;
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
        margin-bottom: 10px;
        justify-content: space-between;

        .changePlan{
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 23px;

            h2{
                color: #39ADFE;
                font-size: 17px;
                text-align: center;
            }

            h3{
                color: #004FFF;
                font-size: 12px;
                font-weight: bold;
            }

            h4{
                color: #403F4C;
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
        }

    }


    /** Review **/
    .boxBig{
        background-color: transparent;
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: row;
        border-radius: 4px;
        margin-bottom: 50px;
        padding-top: 10px;
        margin: 0 auto;      
       

        hr{
            height: 1px;
            width: 100%;
            margin: 45px 0 45px 0;
        }

        .box{
            width: 100%;
            height: 100%;
            padding: 20px 0 0 30px;
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
            margin-top: 25px;

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
                color: #403F4C;
                font-weight: normal;
            }

            h4{
                font-size: 20px;
                color: #403F4C;
                margin: 5px 0 10px 0;
            }

            p{
                font-size: 14px;
                color: #6D6A75;
                font-weight: normal;
                margin: 9px 8px 0 0;
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
            margin-bottom: 25px;

            img{
                margin: 20px 10px 0 0;
            }

            h4{
                color: #39ADFE;
                padding-top: 0;
                margin: 18px 0 0;

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
            margin: 0 0 10px 0;

            h5{
                margin: 5px 0 10px 0;
                color: #97979E;
            }

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
                }
            }

            .textBottom{
                display: flex;
                width: 100%;
            }
            
            
        }

        .textBottom{
            display: flex;
            justify-content: flex-end;

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
            width: 92%;
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

    
    .review{
        .box{
            &:first-child {
                display:none;
            }   

            &:nth-child(2) {
                display: table;
	            width: 100%;
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


            .switch--shadow + label {
                width: 32%;
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
            width: 97%;
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
                margin: 0 auto
            }

            hr {
                height: 1px;
                width: 100%;
                margin: 38px 0 0 0;
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

    }

    /* classe retirar depois */
    .fix-big{
        width: 90% !important;
        margin: 0 auto;
        padding-top: 10px;
    }

`;


export const Buttons = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-end;
    margin: 25px;

    .footer-btns{
        display: flex;
        justify-content: space-between;

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
                    margin-top: 4px;
            }
        }
    }

`;


export const DivSubscription = styled.div`
    
    .boxRow{
        width: auto;
        height: 100%;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: center;
        flex-direction: row;
        padding: 10px 0 20px 15px;
        box-shadow: 2px 2px 12px 1px #ccc;
        border-radius: 4px;

       
        
    }

    label {
        font-size: 15px;
        color: #403F4C;
        font-weight: bold;
        margin: 0;
        padding: 0;
        font-family: 'Quicksand',sans-serif;
        text-transform: uppercase;
        text-align: left;    }

    span {
        font-size: 15px;
        color: #87868F;
        margin: 0;
        padding: 0;
        font-family: 'Quicksand',sans-serif;
        font-weight: 100;
        text-align: left;
        text-transform: capitalize;
    }

    .boxColumn {
        display: flex;
        flex-direction: column;
    }

    
    /* Flex Item */
    .item {
        margin: 5px 65px 0 0;
        text-align: center;
        font-size: 1.5em;
    }


    .active{
        color: #0ED572;
        font-weight: bold;
        font-size: 15px;
        text-align: left;
    }

    .deactive{
        color: #FF5666;
        font-weight: bold;
    }

    button {
        width: 84px;
        height: 32px;
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
    }

`;




export const DivTickets = styled.div`
    
    .boxRow{
        width: auto;
        height: 100%;
        background-color: #fff;
        margin-top: 5px;
        display: flex;
        align-items: center;
        flex-direction: row;
        padding: 10px 10px 10px 10px;
        box-shadow: 2px 2px 12px 1px #ccc;
        border-radius: 4px;
    }

    label {
        font-size: 12px;
        color: #B2B1B6;
        font-weight: bold;
        margin: 0;
        padding: 0;
        font-family: 'Quicksand',sans-serif;
    }

    span {
        font-size: 14px;
        color: #403F4C;        
        font-weight: 100;
        margin: 0;
        padding: 0;
        font-family: 'Work Sans', sans-serif;   
    }

    .boxColumn {
        display: flex;
        flex-direction: column;
    }

    
    /* Flex Item */
    .item {
        margin: 5px;
        text-align: left;
        font-size: 1.5em;
        flex-grow: 1;
    }


    .active{
        color: #0ED572;
        font-weight: bold;
    }

    .pending{
        color: #FF5666;
        font-weight: bold;
    }

    .deactive{
        color: #FF5666;
        font-weight: bold;
    }

    button {
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

`;




export const Next = styled.div`
    h2{
        font-size: 32px;
        font-weight: 500;
        color: #403F4C;
        margin: 0 0 0 81px;
    }

    .active {
        background-color: #004FFF;
        color: #fff;
        border: #004FFF;
    }


    .nextClass{
       margin: 0 0 0 0;
       width: 100%;
       display: flex;

       h2{
            margin: 0;
            font-weight: 300;
            color: #004FFF;

            strong{
                font-weight: 500;
            }
        }


       .borderCancelled{
            border-left: 4px solid #FF5666;
            width: 1px;
            border-radius: 73px 0 0 72px;
            height: auto;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            margin: 15px -4px 0 0px;
            position: relative;
            z-index: 9999;
            background-color: #FF5666;
        }

       .boxClass{
           background-color: #FFF;
           padding: 15px;
           margin-top: 15px;
           border-radius: 4px;
           width: 100%;
           box-shadow: 2px 2px 12px 1px #ccc;
       }

       h3{
           color: #403F4C;
           font-size: 15px;
           font-weight: bold;
           margin: 0 0 6px 0;
       }

       .infos{
           display: flex;
           justify-content: space-between;
           align-items: baseline;
           flex-wrap: wrap;

           .classContent{
                display: flex;
                /* margin-bottom: 10px; */
                align-items: baseline;
                /* height: 35px;  */

                .classAndTeacher{
                    display: flex;
                    margin: 1px 0 0 0;

                    h4{
                        margin: 0 15px 0 0;
                    }
                }    
           }

           .itemInfo{
               display: flex;
               align-items: center;
           }

           .status{
                display: flex;              
                align-items: center;

                .run{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

               h4{
                   &:first-child{
                   color: #00D36A;
                   }

                   &.cancel{
                       color: red;
                       font-size: 12px;
                   }

                   .fa{
                        margin-left: 5px;
                   }

               }

           }           
           
           button{
                color: #787780;
                font-size: 12px;
                font-weight: 500;
                border: 1px solid #787780;
                width: 84px;
                height: 22px;
                border-radius: 26px;
                background-color: transparent;
                cursor: pointer;
               }

           h4{
                font-size: 14px;
                color: #5A6C96;
                font-weight: 500;
                margin: 0 25px 0 0;
                display: flex;
                align-items: center;
           }

           h5.scheduleWithoutTeacher{
                font-size: 14px;
                color: #004fff;
                font-weight: 500;
                margin: 0 25px 0 0;
                display: flex;
                align-items: center;
           }

           h4.cancel{
                font-size: 14px;
                color: red;
                font-weight: 500;
                margin: 0 25px 0 0;
                display: flex;
                align-items: center;
           }

         
       }

       img{
           width: 18px !important;
           height: 12px !important;
           margin: 0 8px 0 0;
       }
   }

   /** Media Queries **/
   @media (max-width: 1024px) {
       
        .nextClass{
            .borderCancelled {
                height: auto;
            }

            .boxClass{
                .infos{
                    h4 {
                        margin: 0 0 15px 3px;
                    }
                    
                    .classContent {
                        width: 100%; 
                        justify-content: inherit; 
                        margin: 10px 0 10px 0;
                        flex-wrap: wrap;
                    }

                    .status {
                        width: 100%;
                        justify-content: inherit;
                    }
                }
            }

           h3 {
                font-size: 14px;
            }
        }
    }
`


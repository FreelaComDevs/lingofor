import styled from 'styled-components';

import arrow from '../../images/ico_select_arrow_white.png';

export const Schedule = styled.div`
    button:disabled,
        button[disabled]{
            border: 1px solid #999999 !important;
            background-color: #cccccc !important;
            color: #666666 !important;
    }
    width: 100%;
                    
    .boxWhite{
        margin-top: 15px;
        width: 350px;

        .selectDays{
            color: #403F4C;
            margin: 0;

            h2{
                color: #004FFF;
                font-weight: bold;
                font-size: 28px;
                margin: 0;
            }

            h4{
                color: #3d3d3d;
                font-size: 12px;
                margin: 24px 0 6px 0;
            }

            span{
                color: #403F4C;
                font-size: 12px;
                margin: 0 0 5px 0;
            }
            span:last-child{
                margin: 20px 0 0 0;
                color: #004FFF;
                font-weight: bold;
                font-size: 15px;
                font-family: 'Work Sans', sans-serif;
            }

            ul{
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                justify-content: start;
                list-style: none;
                width: 100%;

                .input-lingo {
                    width: 100%;
                    max-width: 22%;
                    height: 28px;
                    margin-top: 5px;
                    margin-bottom: 0;
                }


                li{
                    margin: 0 10px 0 0;
                    padding: 5px 0 0 0;
                    
                    .plan{
                        display: flex;
                        flex-direction: row;
                        width: 150px;
                        height: 100%;
                        margin-top: 25px;

                        select{
                            background-color: #004FFF;
                            margin-top: 7px;
                            color: #fff;
                            font-size: 14px;
                            border-radius: 26px;
                            border: 0;
                            width: auto;
                            height: 28px;
                            padding: 0 30px 0 18px;
                            background-image: url(${arrow});
                        }
                    }

                    span{
                        color: #403F4C;
                        font-size: 12px;
                        font-weight: 500;
                        margin: -7px 0 12px 0;
                        display: flex
                    }

                    label{
                        background-color: #fff;
                        border-radius: 26px;
                        border: 1px solid #B2B2B7;
                        padding: 4px 20px 4px 20px;
                        font-size: 14px;
                        font-weight: 500;
                        color: #B2B2B7;
                        cursor: pointer;

                        input{
                            display: none;
                        }
                    }

                }

                button {
                    background-color: #fff;
                    border: 1px solid #B2B2B7;
                    color: #B2B2B7;
                    font-size: 14px;
                    border-radius: 26px;
                    width: 89px;
                    height: 28px;
                    margin-top: 0;
                    cursor: pointer;
                }

                .customCalendar button{
                    background: none;
                    line-height: 1.7rem;
                    text-align: center;
                    cursor: pointer;
                    position: absolute;
                    top: 10px;
                    width: 0;
                    padding: 0;
                    border: 0.45rem solid transparent;
                    z-index: 1;
                    height: 10px;
                    width: 10px;
                    text-indent: -999em;
                    overflow: hidden;
                    border-radius:0px;
                }

                .customCalendar button.react-datepicker__navigation--next {
                    right: 10px;
                    border-left-color: #ccc;
                }

                .customCalendar button.react-datepicker__navigation--next:hover {
                    border-left-color: #b3b3b3;
                }

                .customCalendar button.react-datepicker__navigation--previous {
                    right: 10px;
                    border-right-color: #ccc;
                }

                .customCalendar button.react-datepicker__navigation--previous:hover {
                    border-right-color: #b3b3b3;
                }
                
                .active {
                    background-color: #004FFF;
                    color: #fff;
                    border: #004FFF;
                }

                .normal {
                    background-color: #fff;
                    color: #fff;
                    border: #004FFF;
                }
            }
            
        }

        .focus{
            display: flex;
            justify-content: space-between;
        }

            
        .time, .focus{
            margin-bottom: 15px;
            
            .lineInputs{
                margin-bottom: 20px;
            }

            ul{
                li{
                    display: flex;
                    flex-direction: column;

                    span{
                        color: #403F4C;
                        font-size: 12px;
                        font-weight: bold;
                        margin-bottom: 6px;
                    }   
                    
                    select{
                        background-color: #004FFF;
                        color: #fff;
                        font-size: 14px;
                        border-radius: 26px;
                        border: 0;
                        width: auto;
                        height: 28px;
                        padding: 0 25px 0 10px;
                        background-image: url(${arrow});

                            &:placeholder-shown {
                                background-color: red;
                            }
                    }

            
            
                    input{
                        border: 1px solid #B2B2B7;
                        color: #B2B2B7;
                        border-radius: 26px;
                        width: auto;
                        height: 28px;
                        text-align: left;
                        padding: 0 0 0 20px;
                    }

                    /* button{
                        width: 55px;
                    } */

                }
            }

            

        }    

        .repeatClass{
            // margin: 16px 0 32px 24px;

            display: none;

            h4{
                color: #3d3d3d;
                font-size: 12px;
                // margin: 24px 0 6px 0;
            }

            ul{
                li{
                    display: flex;
                    flex-direction: column;

                    span {
                        color: #403F4C;
                        font-size: 12px;
                        margin: -28px 0 10px 0;
                    }

                    
                }
            }

            select{
                background-color: #004FFF;
                color: #fff;
                font-size: 14px;
                border-radius: 26px;
                border: 0;
                width: auto;
                height: 28px;
                padding: 0 25px 0 18px;
                background-image: url(${arrow});
            }

            input{
                border: 1px solid #B2B2B7;
                color: #B2B2B7;
                border-radius: 26px;
                width: auto;
                height: 28px;
                text-align: left;
                padding-left: 10px;
            }
        }
    }

    /** Media Queries **/
    @media (max-width: 1024px) {
        
        .boxWhite{
            .selectDays{
                ul {
                    li{
                        span {
                            margin: 21px 0 6px 0;
                        }
                        span:last-child {
                            margin: 0 0 0 22px;
                        }
                    }
                }
            }

            .time, .focus {
                margin-bottom: 0px;
            }

            .focus{
                ul{
                    li{
                        width: 100%;

                        select {
                            width: 100%;
                        }
                    }
                }
            }
            .repeatClass {
                margin: 16px 0 32px 0;

                h3 {
                    margin-bottom: 12px;
                }
            }
        }
    }

    

    /** @mixins - Colocar no global **/
    /* @mixin Button {
        font-weight: bold;
        font-size: 14px;
        border-radius: 26px;
        cursor: pointer;
        color: #FFF;

        @media (max-width: 420px) {
            @content;
        }
    }
    @mixin Button() {
        font-weight: bold;
        font-size: 14px;
        border-radius: 26px;
        cursor: pointer;
        color: #FFF;
    } */

    /** Buttons -  Colocar no global **/
    .buttons{

        justify-content: flex-end;
        display: flex;

        button{
            @include Button();
            background-color: #403F4C;
            border: 1px solid #787780;
            width: 128px;
            height: 38px;
            margin-top: 8px;
        }

        .button-blue{
            background-color: #004FFF;
            border: 1px solid #004FFF;
            width: 165px;
            height: 34px;
            margin-top: 24px;
            margin-bottom: 24px;
            border-radius: 26px;
            color: #fff;
            font-size: 16px;
            cursor: pointer
        }


        .cancel button{
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

`; 

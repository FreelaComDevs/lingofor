import styled from 'styled-components';
import arrow from '../../images/ico_select_arrow_white.png';

export const DemoClass = styled.div`
    .topClass{
        display: flex;
        justify-content: space-between;
        margin: 52px 0 21px 0;

        h2{
            font-size: 20px;
            color: #403F4C;
        }
        button{
            color: #004FFF;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid #004FFF;
            width: 79px;
            height: 22px;
            border-radius: 26px;
            background-color: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;

            img{
                width: 16px;
                height: 16px;
                margin: 0 5px 0 15px;
            }
        }

        select{
            background-color: #00D36A;
            width: auto;
            height: auto;
            border-radius: 16px;
            border: 0;
            color: #fff;
            padding-left: 10px;
            font-size: 18px;
        }
    }

    .date{
        display: flex;
        margin: 20px 0 0 0;
        justify-content: space-between;
        flex-direction: row;
        width: 100%;

        .timeZone{
            display: flex;
            
            h2{
                color: #403F4C;
                font-size: 16px;
                font-weight: bold;
            }

            span{
                color: #403F4C;
                font-size: 12px;
                margin-left: 21px;
            }
        }

        span{
            color: #004FFF;
            font-size: 16px;
            font-weight: bold;
        }
        

    }
    
    .listSelect{
        display: flex;
        margin: 10px 0 30px 0;
        width: 100%;

        .itemList{
            margin: 0 20px 0 0;

            .selectItem{
                display: flex;
                flex-direction: column;
            }

            label{
                color: #403F4C;
                font-size: 14px;
                font-weight: 500;
            }
        }
    }

    .classRun{
        margin: 25px 0 25px 0;
        display: flex;
        flex-direction: column;

        .student{
            display: flex;
            width: 100%;
            flex-direction: column;

            h2{
                color: #403F4C;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
                margin-bottom: 10px;
                padding-left: 10px;

                &:first-child{
                    padding-left: 0;
                }
            }
            .avatar{

                img{
                    width: 72px;
                    height: 72px;
                }

            }

            button{
                color: #5A6C96;
                font-size: 12px;
                font-weight: 500;
                border: 1px solid #5A6C96;
                width: 79px;
                height: 22px;
                border-radius: 26px;
                background-color: transparent;
                cursor: pointer;
                display: flex;
                align-items: center;
                padding: 0 0 0 10px;
                margin-top: 5px;

                img{
                    width: 16px;
                    height: 16px;
                    margin-left: 10px;
                }
            }

            .infos{
               display: flex;
               flex-direction: row; 
               width: 100%;
               margin-bottom: 50px;

               h3{
                   color: #004FFF;
                   font-size: 20px;
                   font-weight: bold;
               }

               .data{
                    margin: 26px 0 0 28px;

                    ul{
                        list-style: none;
                        margin-top: 5px;

                        li{
                            font-size: 14px;
                            color: #403F4C;
                            margin-bottom: 5px;
                        }
                    }

                    .local{
                        h2{
                            color: #403F4C;
                            font-size: 12px;
                            text-align: left;
                            margin: 17px 0 0 0;
                            padding-left: 0;
                            font-weight: normal;
                        }
                        h3{
                            color: #403F4C;
                            font-size: 16px;
                            font-weight: bold;
                        }
                    }

                    select{
                        width: 196px;
                        height: 32px;
                        background-color: #004FFF;
                        border-radius: 26px;
                        color: #fff;
                        padding-left: 15px;
                        margin-top: -8px;
                    }

                    &:first-child{
                        margin: 26px 0 0 0;
                    }
               }

               
            }

            .boxBottom{
                display: flex;
                margin-top: 25px;
            }
        }

        .save{
            justify-content: flex-end;
            display: flex;
            margin-top: 20px;

            button{
                color: #fff;
                font-size: 14px;
                font-weight: bold;
                width: 81px;
                height: 38px;
                border-radius: 26px;
                background-color: #004FFF;
                border:  none;
                cursor: pointer;
            }
        }
    }

    .classInfo{
        margin: 25px 0 25px 0;
        
        .infoItem{
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;

            .item{
                margin-top: 10px;
                background-color: #fff;
                border-radius: 4px;
                width: 45%;
                height: 100%;
                padding: 15px;

                span{
                    display: flex;
                    align-items: center;
                    margin-top: 15px;
                    color: #5A6C96;
                    font-weight: 500;
                    font-size: 14px;

                    img{
                        width: 14px;
                        height: 16px;
                        margin-right: 10px;
                    }
                }
            }
        }

        h2{
            color: #403F4C;
            font-size: 16px;
            font-weight: bold;
        }

        span{
            color: #403F4C;
            font-size: 14px;
        }

        h3{
            color: #403F4C;
            font-size: 16px;
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

        .boxWhite{
            margin-bottom: 22px;
            padding: 0;
            margin-top: 0;
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
            .avatar{
                img{
                    width: 32px;
                    height: 32px;
                }
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
                        padding: 15px;
                        padding: 8px 15px 8px 15px;
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

        .boxType{
            display: flex;
            justify-content: center; 

            .avatar{
                img{
                    width: 66px;
                    height: 66px;
                }
            }
            .typeMessage{
                width: 542px;
                height: 105px;
                border-radius: 16px;
                background-color: #fff;
                font-size: 12px;
                color: #111111;
                padding: 22px;
                margin: 0 15px 50px 15px;
            }
            .enter{
                img{
                    width: 50px;
                    height: 50px;
                }
            }
        }
    }

    .buttons{
        display: flex;
        justify-content: space-between;

        button{
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            width: 168px;
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

        button.save{
            width: 81px;
            margin-bottom: 50px;
        }
        
        
        
    }

    /** Media Queries **/
    @media (max-width: 1024px) {
        
        section {
            max-width: 87%;
            margin: 20px auto;
            background-color: #fff;
            padding: 1px 15px 0 15px;
        }
        
        .topClass{
            margin: 20px 0 21px 0;
        }

        .date {
            flex-direction: column;

            span.demo{
                justify-content: flex-end;
                display: flex;
            }

            .timeZone{
                flex-direction: column;

                span {
                    margin-left: 0;
                }
            }

            .classInfo{
                .infoItem{
                    .item {
                        width: 100%;
                        margin: 10px 0 0 0;
                    }
                }
            }

            .cancel{
                .boxWhite {
                    margin-top: 0;
                    margin: 0;

                    .date {
                        margin: 10px 0 0 46px;
                    }
                }
                .boxItem{
                    flex-direction: column;
                    font-size: 14px;

                    .name{
                        margin-bottom: 5px;
                    }
                }
            
            }
    }

    .classRun{
        .student {
            flex-direction: column;

            .boxBottom {
                flex-direction: column;
            }                    
        }
    }

    .infoItem{
        flex-direction: column;
        align-items: baseline;

        .item{
            width: 100% !important;
        }
    }

    .boxType{
        .avatar{
            display: none;
        }
    }


`;

export const ClassD = styled.div`
    width: 100%;
    
    .topClass{
        display: flex;
        justify-content: space-between;
        margin: 40px 0 21px 0;

        h2{
            font-size: 20px;
            color: #403F4C;
        }
        button{
            color: #004FFF;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid #004FFF;
            width: 79px;
            height: 22px;
            border-radius: 26px;
            background-color: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;

            img{
                width: 16px;
                height: 16px;
                margin: 0 5px 0 15px;
            }
        }
    }

    .date{
        display: flex;
        margin:20px 0 0 0;

        h2{
            color: #403F4C;
            font-size: 16px;
            font-weight: bold;
        }

        span{
            color: #403F4C;
            font-size: 12px;
            margin-left: 21px;
        }
    }
    
    .listSelect{
        display: block;
        /* margin: 20px 0 50px 0; */
        width: auto;
        height: 100%;
        background-color: #fff;
        padding: 20px 0 12px 20px;
        margin-bottom: 0;
        /* justify-content: space-between; */

        .listSelectRow {
          display: flex;
        }

        .itemList{
           margin-right: 13px;
           
            .selectItem{
                display: flex;
                flex-direction: column;

                .input-lingo{
                    padding-left: 15px;
                    padding-right: 19px;
                    color: #403F4C;
                }
            }

            label{
                color: #403F4C;
                font-size: 14px;
                font-weight: 500;
                font-family: 'Quicksand', sans-serif;
                margin-bottom: 5px;
            }

            .lastItemList{
                display: flex;
                align-items: center;

                span{
                    font-size: 12px;
                    margin-left: 11px;
                    color: #403F4C;
                    font-family: 'Quicksand', sans-serif;
                }
            }

        }
    }

    .classRun{
        margin: 25px 0 25px 0;
        display: flex;
        align-items: center;

        .student{
            display: flex;
            width: 100%;

            h2{
                color: #403F4C;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
                margin-bottom: 10px;
                padding-left: 10px;
            }
            .avatar{

                img{
                    width: 72px;
                    height: 72px;
                }

            }

            button{
                color: #5A6C96;
                font-size: 12px;
                font-weight: 500;
                border: 1px solid #5A6C96;
                width: 79px;
                height: 22px;
                border-radius: 26px;
                background-color: transparent;
                cursor: pointer;
                display: flex;
                align-items: center;
                /* padding: 0 0 0 10px; */
                margin-top: 5px;

                img{
                    width: 16px;
                    height: 16px;
                    margin-left: 10px;
                }
            }

            .infos{
               display: flex;
               flex-direction: row; 
               width: 100%;

               h3{
                   color: #004FFF;
                   font-size: 20px;
                   font-weight: bold;
                   /* margin-bottom: 12px; */
                   margin-right: 10px;
               }

               .data{
                    margin: 26px 0 0 28px;

                    ul{
                        list-style: none;
                        min-height: 110px;

                        li{
                            font-size: 14px;
                            color: #403F4C;
                            margin-bottom: 5px;
                            display: flex;
                            align-items: center;

                            span{
                                margin-left: 2px;
                            }

                            strong{
                                font-weight: bold;
                                font-size: 16px;
                                font-family: 'Quicksand', sans-serif;
                                margin-right: 5px;
                            }

                          
                            .grades {
                                font-size: 28px;
                                color: #403F4C;
                                font-family: 'Quicksand', sans-serif;
                                font-weight: normal;
                            }
                            

                            
                        }
                    }

                    .local{
                        h2{
                            color: #403F4C;
                            font-size: 12px;
                            text-align: left;
                            margin: 17px 0 0 0;
                            padding-left: 0;
                            font-weight: normal;
                        }
                        h3{

                            color: #403F4C;
                            font-size: 16px;
                            font-weight: bold;
                            display: flex;
                        }
                    }

                    select{
                        width: 100%;
                        max-width: 200px;
                        height: 32px;
                        background-color: #004FFF;
                        border: none;
                        border-radius: 26px;
                        color: #fff;
                        padding-left: 15px;
                        padding-right: 30px;
                        margin-top: -4px;
                        margin-bottom: 12px;
                        background-image: url(${arrow});
                        background-position: 176px 13px;
                    }

                    .infosStudent{
                        display: flex;
                        align-items: center;
                        margin-bottom: 6px;      
                    }

                    .buttonSave{
                        background-color: #004FFF;
                        border: none;
                        color: #fff;
                        font-weight: bold;
                        font-size: 11px;
                        border-radius: 26px;
                        width: auto;
                        height: auto;
                        padding: 4px 12px 4px 12px;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        margin-right: 10px;
                    }

                    span.buttonSave{
                        border: 1px solid #5A6C96;
                        background-color: transparent;
                        color: #5A6C96;
                    }

                    .buttonSave.pointer{
                        cursor: pointer;
                    }
               }
            }
        }
    }

    .classInfo{
        margin: 25px 0 25px 0;
        
        .infoItem{
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: start;

            .item{
                margin: 10px 45px 0 0;
            }
        }

        h2{
            color: #403F4C;
            font-size: 16px;
            font-weight: bold;
        }

        span{
            color: #403F4C;
            font-size: 14px;
        }

        h3{
            color: #403F4C;
            font-size: 14px;
        }

    }
    
    .cancel{
        margin-top: 40px;

        h2{
            color: #FF5666;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 30px;
        }

        .boxWhite{
            margin-bottom: 22px;
            padding: 0;

            .boxItem{
                display: flex;
                justify-content: space-between;
                padding: 15px 15px 20px 15px;
                margin-bottom: 20px;
            }

            .infos{
                display: flex;
                justify-content: space-between;
            }
            .avatar{
                img{
                    width: 32px;
                    height: 32px;
                }
            }
            
            .text{
                display: flex;
                flex-direction: column;
                margin: 5px 0 0 12px;
                color: #403F4C;
            }

            .name{                
                span{
                    color: #004FFF;
                    font-weight: bold;
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

    .buttons{
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;

        .cancelSchedule {
            border: none;
            color: #ff5666;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            background-color: transparent;
            width: auto;
        }

        button{
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
            font-family: 'Quicksand',sans-serif;

            .fa{
                margin-right: 7px;
            }
        }

        a{
            color: #FF5666;
            font-size: 12px;
            font-weight: 500;
            margin-right: 10px;
            text-decoration: none;
        }

        button.save{
            width: 81px;
            margin: 0 0 30px 0;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            height: 38px;
            border-radius: 26px;
            background-color: #004FFF;
            border:  none;
            cursor: pointer;

        }

        h2, .infosAulas, .scheduleDetailsInfo, .scheduleConfirmed, .viewSchedule{
            display: none;
        }

        h4{
            display: none;
        }
        .listScheduleCard{
            background: transparent;
            box-shadow: none;
            margin: 0;
            padding: 0;

            .scheduleDetails{
                display: flex;
                margin-top: 0;

                .scheduleActions{
                    a {
                        display: none;
                    }
                }

                .scheduleActions > * {
                    margin: 0;
                    margin-left: 0;
                    background-color: transparent;
                }

            }

            
        }

        
    }

    /** Media Queries **/
    @media (min-width: 1200px) and (max-width: 1600px) {
        .topClass{
            margin-top: 0;
        }
    }

    /** Media Queries **/
    @media (max-width: 1024px) {
        
        section {
            max-width: 87%;
            margin: 20px auto;
            background-color: #fff;
            padding: 1px 15px 0 15px;
        }

        .classRun{
            .student {
                flex-direction: column;
            }
        }

        .listSelect{
            flex-wrap: wrap;
        }


        .classInfo{
            .infoItem{
                .item {
                    width: 100%;
                    margin: 10px 0 0 0 ;
                }
            }
        }

        .cancel{
            .boxWhite {
               margin: 0;

                .date {
                    margin: 10px 0 0 46px;
                }
            }
            .boxItem{
                flex-direction: column;
                font-size: 14px;

                .name{
                    margin-bottom: 5px;
                }
            }
           
        }
    }
`;

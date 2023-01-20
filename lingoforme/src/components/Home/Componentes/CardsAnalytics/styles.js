import styled from 'styled-components';

export const Cards = styled.div`
    h2{
        font-size: 24px;
        color: #004FFF;
        font-weight: 100;

        img{
            width: 36px;
            height: 20px;
        }
    }

    .filter.buttons {
        button {
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
            font-family: 'Quicksand',sans-serif;

        }
        
        button.primary {
            width: 58px;
            height: 28px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            margin: 10px 18px 0 0;
        }

    }

    select.filter {
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            padding: 0 40px 0 15px;
            margin-bottom: 15px;
            color: #403F4C;
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
    }

    .box{
        width: 100%;
        display: flex;
        flex-direction: row;

        .boxAnalytics{
            background-color: #fff;
            width: 480px;
            padding: 15px;
            margin: 0 20px 17px 21px;  
            box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.05);

            &:nth-child(2){
                width: 325px;

                .items{
                    margin: 0 0 25px 0;

                    .listBest{
                        h4 {
                            font-weight: 100;
                        }
                    }
                   
                }
            }
            
            &:last-child{
                width: 480px;
                margin-right: 0;
                
                .items{
                    margin: 0 0 25px 0;

                     /* table{
                        tr{
                            td {
                                text-align: left;
                            }
                        }
                     }                    */
                }
                
            }

            .items{
                display: flex;
                justify-content: space-between;
            
                
                .filter{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                
                    button{
                        color: #787780;
                        font-size: 11px;
                        font-weight: 500;
                        border: 1px solid #787780;
                        width: 70px;
                        height: 22px;
                        border-radius: 26px;
                        background-color: transparent;
                        cursor: pointer;
                        display: flex;
                        font-family: 'Quicksand', sans-serif;

                        img{
                            width: 12px;
                            height: 14px;
                            margin: 0 5px 0 7px;
                        }

                        .fa{
                            margin: 2px 5px 0 14px;
                        }
                    }

                    span{
                        color: #403F4C;
                        font-size: 12px;
                        font-family: 'Work Sans',sans-serif;
                        font-weight: 500;
                        margin: 10px 0 0 0
                    }

                    
                }
                    
                .rating{
                    .grades{
                        color: #403F4C;
                        font-size: 36px;
                        font-weight: 100;
                        margin-right: 8px;
                    }
                }

                .listBest{
                    display: flex;
                    flex-direction: column;

                    h4{
                        color: #403F4C;
                        font-size: 12px;
                        font-weight: 500;
                        margin: 5px 0 0 0;
                        font-family: 'Work Sans',sans-serif;

                        &:first-child{
                            font-weight: bold;
                        }
                    }

                    .grades{
                        color: #403F4C;
                        font-size: 20px;
                        font-weight: 100;
                        margin-right: 13px;
                    }
                    
                }

                table{
                    width: 100%;
                    /* text-align: left; */
                    border-collapse: collapse;

                    tr{
                        height: 35px;
                    
                        td{
                            border-bottom: 1px solid #D8D8DA;;
                            margin-bottom: 10px;
                            text-align: right;
                            font-weight: bold;
                            font-size: 16px;

                            &:first-child{
                                font-weight: normal;
                                text-align: left;
                                font-family: 'Work Sans',sans-serif;
                            }

                            &:last-child{
                                font-weight: bold;
                                font-size: 14px;
                                font-family: 'Work Sans',sans-serif;
                            }


                            img{
                                height: 12px;
                            }

                            strong{
                                font-size: 14px;
                                font-family: 'Work Sans',sans-serif;
                            }
                        }
                        .total{
                            font-weight: 100 !important;
                            font-size: 10px !important;
                        }
                    }
                }

                
            }

            h3{
                color: #004FFF;
                font-size: 18px;
                font-weight: bold;
                margin: 0;
                font-family: 'Work Sans', sans-serif;
            }

            p{
                color: #403F4C;
                font-size: 12px;
                font-family: 'Work Sans', sans-serif;
                font-weight: 500;
                margin: 9px 0 0 0;
            }

            .space-around {
              justify-content: space-around;
            }

            .criterias {
              text-align: center;
            }

            .text-center {
              text-align: center;
            }

            ul{
                list-style: none;
                width: 100%;

                li{
                    margin: 10px 0 0 0;
                    
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

                button.auto {
                    width: auto;
                    padding-left: 20px;
                    padding-right: 20px;
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
    }

    .boxCards{
        display: flex;
        justify-content: center;
        width: 100%;
        flex-direction: row;

        .cards{
            background-color: #fff;
            width: 380px;
            height: auto;
            margin: 2px 2px 0 21px;
            padding-bottom: 10px;
            display: flex;
            justify-content: space-between;
            box-shadow: 2px 2px 12px 1px #ccc;

            &:nth-child(2){
                width: 353px;
                margin: 4px 22px 0 37px;
                height: auto;
            }

            .items{
                display: flex;
                flex-direction: column;
                padding: 10px 14px 0 15px;

                &:nth-child(2){
                    text-align: center;
                    margin-top: 0;
                }

                 &:nth-child(3){
                    text-align: center;
                    margin-top: 0;
                }

                &:last-child{
                    text-align: center;
                    margin-top: 0px;
                }

                h4{
                    color: #004FFF;
                    font-size: 18px;
                    font-weight: bold;
                    font-family: 'Work Sans', sans-serif;
                    margin: 0;
                    padding: 0;
                }

                small{
                    font-size: 10px;
                    font-family: 'Work Sans',sans-serif;                   
                }

                span{
                    font-size: 28px;
                    color: #403F4C;
                }

               
            }
        }
   
    }

   

    /** Media Queries **/
    @media (min-width: 1025px) and (max-width: 1366px) {

        .boxAnalytics {

            margin: 0 20px 17px 0 !important;
        }

        .boxCards{
            .cards {
                margin: 5px 19px 0 0;
                &:nth-child(2) {
                    width: 267px;
                    margin: 6px 20px 0 2px;
                }
            }
        }
    }
       
    @media (max-width: 1024px) {
        .box{
            flex-direction: column;

           .boxAnalytics {
                width: auto;
                margin: 0 0 17px 0;

                &:nth-child(2) {
                    width: auto;
                    margin: 0 0 17px 0;
                }

               &:last-child {
                    width: auto;
                    margin: 0 0 17px 0;
                }
            }
        }

        .boxCards{
            flex-wrap: wrap;
            .cards {    
                width: 48%;
                margin: 0 10px 0 0;

                &:nth-child(2) {
                    width: 48%;
                    align-items: right;
                    margin: 0 0 0 12px;
                }

                &:nth-child(3){
                    
                    width: 100%;
                    margin: 15px 0;
                    
                }
            }
        }

    }

    @media (max-width: 610px) {
        .boxCards{
            .cards {
                width: 100%;
                margin: 0 0 18px 0;

               &:nth-child(2) {
                    width: 100%;
                    margin: 0 0 0 0;
                }
            }
        }
    }
       
`;

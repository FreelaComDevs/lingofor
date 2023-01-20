import styled from 'styled-components';

export const Contracts = styled.div`
    .box{
        display: flex;
        width: 100%;
        

        .boxOverView{
            display: flex;
            flex-direction: column;
            width: 84%;
        }
        
        .boxs{
            display: flex;
            flex-direction: column;
            margin: 10px 0 0 43px;

            .boxSmall{
                background-color: #fff;
                display: flex;
                flex-direction: column;
                width: 180px;
                height: 140px;
                margin-bottom: 10px;
                box-shadow: 2px 2px 12px 1px #ccc;

                h3{
                    font-size: 14px;
                    color: #004FFF;
                    font-family: 'Work Sans',sans-serif;
                    text-align: left;
                    margin: 16px 0 0 12px;
                    font-weight: bold;
                }

                span{
                    font-size:48px;
                    color: #403F4C;
                    margin: 30px 0 0 12px;
                }
            }
        }
    }

    .bigBox {
        margin-top: 10px;
        border-radius: 0;
        height: 29px;
        padding-top: 9px;

        &:first-child{
            height: 12px;
            padding-top: 12px;
        }
    }

     h2{
        text-align: center;

        img{
            width: 18px;
            height: 23px;
            margin-right: 10px;
        }
    }


    .boxItem{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;

        .item{
            display: flex;
            justify-content: space-between;
            width: 100%;
            flex-wrap: wrap;
            
            .itensBox{

                h3{
                    font-size: 13px;
                    font-weight: bold;
                    color: #403F4C;
                    margin: 0;

                    &:last-child{
                        color: #004FFF;
                        font-family: 'Work Sans', sans-serif;
                        font-size: 14px;
                    }
                }

                span{
                    font-size: 14px;
                    color: #403F4C;
                    font-family: 'Work Sans',sans-serif;

                    img{
                        margin: 2px 10px 0 0;
                    }
                }
                 
                .red{
                    color: #403F4C;
                }

            }

            button{
                background: transparent;
                color: #87868F;
                border-radius: 26px;
                border: 1px solid #787780;
                width: 58px;
                height: 22px;
                font-size: 11px;
                cursor: pointer;
                margin-top: 8px;
            }
        }
    }
   

    /** Media Queries **/
    @media (max-width: 1024px) {

        .box{
            flex-direction: column-reverse;

            .boxOverView {
                width: 95%;
            }

           .boxs {
                flex-direction: row;
                margin: 10px 0 0 0;

                .boxSmall {
                    width: 49%;
                    height: 140px;
                    margin: 0 12px 10px 0;

                    &:last-child{
                        margin: 0;
                    }
                }
            }
        }

        .bigBox {
            height: 100%;

            .itensBox{
                width: 48%;
                margin-bottom: 10px;
            }
        }
        
        /* .item{
            .itensBox{
                width: 40%;
            }
            .percentage{
                display: flex;
                align-items: center;
                flex-direction: row;

                h3{
                    font-size: 17px !important;
                }

                span{
                    font-size: 12px !important;
                    margin-left: 8px;
                }
            }

            .fullPercentage{
                display: flex;
                align-items: center;
                flex-direction: row;

                h3{
                    font-size: 17px !important;
                }

                span{
                    font-size: 12px !important;
                    margin-left: 8px;
                }
            }
            
        } */
    }
`;
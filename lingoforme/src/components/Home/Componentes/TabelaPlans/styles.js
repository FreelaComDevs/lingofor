import styled from 'styled-components';

export const Table = styled.div`
    width: 100%;

    /** Retirar depois **/
    .bigBox {
        margin-top: 10px;
        padding-bottom: 0;
        width: auto;
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
            align-items: center;
            
            .itensBox{
                margin: -10px 18px 15px 0;

                h3{
                font-size: 13px;
                    font-weight: bold;
                    color: #87868F;
                    margin: 0;
                }
                span{
                    font-size: 14px;
                    color: #87868F;

                    li{
                        padding: 0;
                        width: 120px;
                    }

                    img{
                        margin: 2px 10px 0 0;
                    }
                }
            }

            /* &:first-child{
                .itensBox{
                    width: 100px;
                }
            } */
           
            .percentage{

                h3{
                    color: #004FFF;
                    font-size: 22px;
                    font-weight: bold;
                    text-align: center;
                }

                span{
                    color: #004FFF;
                    font-size: 14px;
                }
                
            }

            .fullPercentage{
                h3{
                    color: #FF5666;
                    font-size: 22px;
                    font-weight: bold;
                    text-align: center;
                }

                span{
                    color: #FF5666;
                    font-size: 14px;
                } 
            }

            button.buy{
                color: #87868F;
                background: #004FFF;
                color: #fff;
                border-radius: 26px;
                border:none;
                width: 115px;
                height: 22px;
                cursor: pointer;
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
            }
        }
    }
   

    /** Media Queries **/
    @media (max-width: 1024px) {
        .item{
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
            
        }
    }

    .extraClassLabel {
        font-size: 12px;
        color: #004FFF;
    }
`;
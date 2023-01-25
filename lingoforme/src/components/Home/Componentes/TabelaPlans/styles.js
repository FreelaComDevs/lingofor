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
        flex-wrap: wrap;
        align-items: center;

        .item{
            display: flex;
            justify-content: space-between;
            width: 100%;
            flex-wrap: wrap;
            align-items: center;

            
            .itensBox{
                h3{
                    font-size: 23px;
                    font-weight: normal;
                    color: #555D67;
                    margin: 0;
                }

                b {
                    margin-left: 5px
                }

                span{
                    font-size: 18px;
                    font-weight: bold;
                    color: #555D67;

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

            .dflex {
                display: flex;
            }

            .mt {
                margin-top: 25px;
            }

            .automaticallyRenews {
                color: #5778FB;
                font-weight: normal;
                font-size: 12px;
            }

            .containerExtra {
                text-alignt: right;
            }
            
            .extraClasses {
                color: #004EFD;
                font-weight: normal;
                font-size: 20px;
                margin-left -25px;
            }

            .extraNumber {
                color: #004EFD;
                font-size: 20px;
                font-weight: bold;   
                margin-left: 10px;
            }
           
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
                width: 105px;
                padding: 10px;
                font-size: 11px;
                cursor: pointer;
            }
        }
    }
   

    /** Media Queries **/
    @media (max-width: 1024px) {
        .item{
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
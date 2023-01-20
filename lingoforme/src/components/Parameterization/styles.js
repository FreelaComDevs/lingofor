import styled from 'styled-components';

export const Prices = styled.div`

    margin-top: 72px;

    .parameters{
        display: flex;
        width: 100%;
        margin: 0 auto;
        flex-direction: column;
        margin-left: 80px;

        .items{
            display: flex;
            flex-direction: row;
            justify-content:start;
            align-items: center;
            width: 100%;
            margin-top: 20px;

            .inputs{
                display: flex;
                flex-direction: column;
                margin: 0 20px;

                label{
                    color: #403F4C;
                    font-size: 14px;
                    font-weight: 500;
                }
                input{
                    width: 130px;
                    height: 32px;
                    border: 1px solid #B2B2B7;
                    border-radius: 26px;
                    padding-left: 10px;
                    background: transparent;
                }

                &:nth-child(2){
                    margin: 0 12px 0 12px;
                    input{
                        width: 960px;
                    }
                }
            }

            span{
                color: #FF5666;
                font-size: 12px;
                margin-top: 7px;
                cursor: pointer;
                font-weight: bold;

                .fa{
                    font-size: 15px;
                    margin-top: 10px;
                }
            }

            &:last-child{
                margin-bottom: 45px;
            }
        }

        button{
            background-color: transparent;
            border: 1px solid #787780;
            color: #403F4C;
            font-weight: bold;
            font-size: 11px;
            border-radius: 26px;
            width: 95px;
            height: 32px;
            margin-top: 32px;
            margin-right: 10px;
            cursor: pointer;
        }

    }

    .buttons{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            margin-top: 25px;
            padding: 0 15px 0 15px;
            cursor: pointer;
            width: 100%;
            margin-bottom: 50px;

            button{
                background-color: transparent;
                border: 1px solid #787780;
                color: #787780;
                font-weight: 100;
                font-size: 14px;
                border-radius: 26px;
                width: 71px;
                height: 28px;
                margin-top: 8px;
                margin-right: 10px;
                cursor: pointer;

                .fa{
                    font-size: 17px;
                }

                &:last-child{
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
                }
            }
    }
   
    /** Media Queries **/
    @media (min-width: 1200px) and (max-width: 1600px) {
        .parameters{
            margin-left: 40px;
            .items{
                .inputs{
                    &:nth-child(2){
                        margin: 0 12px 0 12px;
                        input{
                            width: 487px;
                        }
                    }
                }

            }
        }
    }


`;

import styled from 'styled-components';

export const Filter = styled.div`
    background-color: #fff;
    padding: 15px;

    img{
        width: 15px;
        height: 18px;
    }

    .filterTop{
        display: flex;
        justify-content: space-between;
        

        button{
            height: 28px;
            border-radius: 26px;
            border: 0;
            color: #403F4C;
            font-size: 14px;
            color: #fff;
            font-family: Work Sans;
            background-color: #004FFF;
            padding: 5px 10px 10px 10px;
            opacity: 1;
            cursor: pointer;
            display: none;
        }
    }

    .filter{
        display: flex;
        margin-top: 8px;
        flex-wrap: wrap;      
        
        h2{
            color: #403F4C;
            font-size: 20px;
        }
        
        .firstItems{
            margin-right: 30px;
            display: flex;

             .items{
                margin: 0 10px 0 0;
                display: flex;
                flex-direction: column;
            }
        }

        .items{
            margin: 0 20px 15px 0;
        }

        label{
            color: #403F4C;
            font-size: 12px;
            font-weight: bold;
            margin-top: 4px;
            width: 100%;
            text-align: center;
        }

        button{
            height: 28px;
            border-radius: 26px;
            border: 1px solid #403F4C;
            color: #403F4C;
            font-size: 14px;
            font-family: Work Sans;
            background-color: transparent;
            padding: 5px 10px 10px 10px;
            opacity: 0.4;
            cursor: pointer;

            &.active{
                background-color: #004FFF;
                color: #fff;
                border: none;
                opacity: 1;
            }
        }

         select{
            min-width: 170px;
            width: 100%;
            height: 28px;
            padding-left: 16px;            
            border-radius: 26px;
            border: 1px solid #403F4C;;
            background-color: transparent;
            color: #403F4C;
            font-size: 14px;
            font-family: Work Sans;
            opacity: 0.4;
        }

        .boxExtras{
            display: flex;
        }

        .filtersBottom{
            width: 100%;
            display: flex;

            .items{
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin: 0;

                .extras{
                    margin: 20px auto;
                    font-size: 11px;
                    color: #403F4C;

                    a{
                        text-decoration: none;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }

                button{
                    margin-right: 10px;
                }
            }
            
        }
    }

    /** Media Queries **/
    @media (max-width: 1024px) {
        .filterTop{
            display: flex;

            button{
                display: block;
                z-index: 99;
            }

        }

        .filter{
            .items {
                margin: 0 13px 15px 0;
            }

            .firstItems{
                margin: 0 0 15px 0;

                /* .items{
                    width: 100%;
                } */
            }
            .boxExtras{
                flex-direction: row;
            }

            hr{
                background-color: #5a6c96;
            }
        }

        hr{
            display: none;
        }

        .boxExtras{
            flex-direction: column;
            flex-wrap: wrap;
        }
        
        .filtersBottom{
            margin-top: 15px;

            .items{
                .extras{
                    display: none;
                }

                .buttons{
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
            }
        }

        
    }
`;
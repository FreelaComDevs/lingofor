import styled from 'styled-components';

export const Scroll = styled.div`
    max-height: 380px;
    overflow-y: scroll;
    
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
           font-size: 20px;
           font-weight: bold;
           margin: 0;
           font-family: 'Quicksand', sans-serif;
       }

       .infos{
           display: flex;
           justify-content: space-between;
           align-items: end;
           flex-wrap: wrap;
           margin-top: 5px;

           .classContent{
                display: flex;
                /* margin-bottom: 10px; */
                align-items: end;
                /* height: 35px;  */
                margin-bottom: 12px;                

                .classAndTeacher{
                    display: flex;
                    margin: 1px 0 0 0;

                    h4{
                        margin: 0 15px 0 0;
                    }
                }    
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
                   &.green{
                   color: #00D36A;
                   }

                   &.blue{
                   color: #004FFF;
                   }

                   &.cancel{
                       color: red;
                       font-size: 14px;
                   }

                   .fa{
                        margin-left: 5px;
                   }

               }

           }           
           
            button, button.drive{
                color: #787780;
                font-size: 12px;
                font-weight: 500;
                border: 1px solid #787780;
                width: 58px;
                height: 22px;
                border-radius: 26px;
                background-color: transparent;
                cursor: pointer;
            }

            button.drive{
                color: #5A6C96;
                font-size: 11px;
                border: 1px solid #5A6C96;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 10px 0 10px;
                width: auto;

                img{
                    margin-left: 8px;
                }
            }
               

           h4{
                font-size: 14px;
                color: #5A6C96;
                font-weight: 500;
                margin: 0 25px 0 0;
                display: flex;
                align-items: center;
                font-family: 'Quicksand', sans-serif;

                img{
                    width: 18px !important;
                    height: 12px !important;
                    margin: 0 8px 0 0;
                }
           }

         
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
`;


export const Request = styled(Next)`
    
    .nextClass{
        flex-direction: column;

        .boxClass{
            margin: 12px 0 10px 0;
            padding: 0;
            display: flex;
              
            .borderLeft{
                width: 4px;
                border-radius: 26px 0 0 26px;
                background-image: linear-gradient(to bottom, var(--color-green-gradient), var(--color-blue));
            }

            .boxInfos{
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: 15px;
            }

            h2{
                color: #004FFF;
                font-size: 32px;
                margin-left: 0;
                font-weight: 100;
            }

            h3{
                color: #004FFF;
                font-size: 20px;
            }

            .infos{

                .status {
                    width: 50%;
                    justify-content: inherit;
                    align-items: center;

                    button.confirm {
                        color: #fff;
                        font-size: 14px;
                        font-weight: 500;
                        border: 1px solid #787780;
                        width: 154px;
                        height: 28px;
                        border-radius: 26px;
                        border: none;
                        background-color: #004FFF;
                        cursor: pointer;
                        align-items: center;
                        display: flex;
                        justify-content: center;
                        font-family: 'Work Sans', sans-serif;

                        .fa{
                            margin-left:37px;
                            font-size: 14px;
                            font-weight: 100;
                        }
                    }

                    button{
                        width: 126px;

                        .fa{
                            margin-left: 5px;
                        }
                    }

                }
            }

    }
        
   }

   /** Media Queries **/
   @media (max-width: 1024px) {
        .nextClass{
            .boxClass{
                .infos{
                    .status {
                        width: 100%;
                    }
                }
            }
        }
    }
`;

export const Without = styled(Next)`

    .nextClass{

        .boxClass{
            padding: 10px 15px 10px 20px;           
            flex-direction: column;
            width: 461px;

            h2 {
                font-size: 24px;
            }

        }

        .infos{
            .classContent{
                flex-direction: column;
                align-items: baseline;
                width: 100%;

                .items{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: baseline;

                    .infos{
                        display: flex;
                        align-items: end;
                    }
                }
            }

            h4{
                margin:0 0 6px 0;
            }

            button {
                color: #004FFF;
                font-size: 12px;
                font-weight: 500;
                border: 1px solid #004FFF;
                width: 80px;
                height: 22px;
                border-radius: 26px;
                background-color: transparent;
                cursor: pointer;
                margin: 0 6px 0 0;

                &:last-child{
                    color: #787780;
                    font-size: 12px;
                    font-weight: 500;
                    border: 1px solid #787780;
                    width: 58px;
                    height: 22px;
                    border-radius: 26px;
                    background-color: transparent;
                    cursor: pointer;
                }

                .fa{
                    margin-left: 5px;
                }
            }
        }
        
   }

   /** Media Queries **/
   @media (max-width: 1024px) {
        .nextClass{
            .boxClass {
                width: 100%;
            }

           
            .infos{
                .classContent{
                    .items{
                        flex-wrap: wrap;
                        
                        .infosPlans{
                            display: flex;
                            margin: 0 0 0 5px;
                            
                            h4 {
                                margin: 0 15px 15px 3px;
                            }
                    
                        }
                    }

                }
                
            }
        }
    }
`;

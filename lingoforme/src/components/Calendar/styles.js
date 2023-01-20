import styled from 'styled-components';

export const BigCalendar = styled.div`

    table {
      

       .fc-widget-header{
            border-style: solid;
            border-width: 1px;
            padding: 0;
            vertical-align: top;
            padding: 5px;
            border: 0;
        }

        .fc-body{
            border-top: 10px solid #F3F3F7;
            background: #fff;
        }

    }
    
    .fc-basic-view .fc-day-number{
            padding: 10px;
            font-size: 12px;
        }

    .fc-view-container *, .fc-view-container :after, .fc-view-container :before {
        // color: #5A6C96;
        font-size: 10px;
        font-family: 'Work Sans',sans-serif;
        text-transform: uppercase;
        font-weight: 500 !important;
        border-radius: 0;
    }
    .fc-state-default {
        background-color: transparent;
        color: #787780;
        font-size: 11px;
    }

    .fc-day-grid-event .fc-content {
        white-space: inherit;
        overflow: hidden;
    }

    .fc-event{
        background-color: #F8F8F8;
        border-left: 5px solid #004FFF;
        border-right: 0;
        border-top: 0;
        border-bottom: 0;
        margin-bottom: 2px;
        padding: 5px;
    }

    .fc-more{
        text-align: right;
        float: right;
        color: #004FFF;
        font-weight: bold;
        text-transform: initial;
    }

    .fc-unthemed td.fc-today {
        background: #E0E9FF !important;
    }

    
    .fc {

        // margin-top: 60px;

        td{
            background: #fff;
            border-radius: 10px 10px 0 0;
        }

        .fc-toolbar>*>:first-child {
            margin-left: 0;
            border-radius: 26px;
            float: none;            
            margin-left: 10px;
        }


        .fc-list-table {
            table-layout: fixed;
        }

        .fc-button-group>* {
            float: left;
            margin: 0 0 0 -1px;
            background: transparent;
            width: 45px;
            border-left: 0;
            color: #004FFF;
            text-transform: capitalize;
            font-size: 11px;
            font-family: 'Quicksand', sans-serif;
            font-weight: 500;
            border: none;

            button{
                border: 1px solid #787780;
            }
        }

        .fc-button-group:last-child{
            border: 1px solid #004FFF;
        }

       .fc-button-group>:first-child {
            margin-left: 0;
            border-right: 0;
        }

        .fc-state-active{
            box-shadow: none;
        }

        .fc-toolbar>*>* {
            border-radius: 26px;

            .fc-state-active, .fc-toolbar .ui-state-active {
                z-index: 4;
                background: #004FFF !important;
                color: #fff;
                font-weight: 100;
                border-radius:0;
                text-transform: capitalize;
                
                &:first-child{
                    border-radius: 8px 0 0 8px;
                }
                &:last-child{
                    border-radius: 0 8px 8px 0;
                }
            }
        }
        .fc-icon-left-single-arrow:after, .fc-icon-right-single-arrow {
            color: #787780;
        }

        
        .fc-today-button {
            width: 56px;
            height: 22px;
            background: transparent;
            border: 1px solid #787780;
            text-transform: capitalize;
            font-family: 'Quicksand', sans-serif;
            color: #787780;
            font-size: 11px;
            font-weight: 500;
            opacity: 1;
        }

        .fc-prev-button{
            margin-left: 0;
            border-right: 0;
            border-radius: 25px 0 0 25px;
            border: 1px solid #787780;
            width: 30px;
        }
        .fc-next-button{
            border: 1px solid #787780;
            border-radius: 0 25px 25px 0;
            border-left: 0;
            width: 30px;
        }
    }

    .fc-icon{
        height: none !important;
        top: -1px !important;
    }


    .fc-center{
        .fc-toolbar>*>* {
            border: 1px solid #787780;
            border-radius: 26px;
        }

        h2{
            color: #403F4C;
            font-size: 20px;
            font-family: 'Work Sans', sans-serif;
            font-weight: 500;
        }
    }

    .fc-nonbusiness{
        background-image: repeating-linear-gradient(-45deg, #E9E9E9, #E9E9E9 2px, #ffffff 2px, #ffffff 5px);
    }

    .fc-view-container{
        //margin-bottom: 50px;
        margin : 0;
        
       
    }
    
    .fc-event-container{
        margin : 0 !important;
    }


    .fc-time-grid{
        tr{
            height: 38px;
            min-height:38px;
        }
    }

    .nextClass{
        margin: 100px 0 50px 0;
        

        h2{
            font-size: 32px;
            font-weight: 500;
            color: #403F4C;
        }

        .boxClass{
            background-color: #FFF;
            padding: 15px;
            margin-top: 15px;
            border-radius: 4px;
        }
       

        h3{
            color: #403F4C;
            font-size: 20px;
            font-weight: bold;
        }

        .infos{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .classContent{
                display: flex;

            }

            .status{
                display: flex;
                margin: 10px 0 10px 0;

                h4{
                    &:first-child{
                    color: #00D36A;
                    }

                    &.green{
                        color: #00D36A;
                    }

                    &.blue{
                        color: #004FFF;
                    }

                    &.cancel{
                        color: red;
                    }

                }

                button{
                    color: #787780;
                    font-size: 12px;
                    font-weight: 500;
                    border: 1px solid #787780;
                    width: 58px;
                    height: 22px;
                    border-radius: 26px;
                    background-color: transparent;
                    cursor: pointer;
                    font-family: 'Quicksand', sans-serif;
                }
            }

            h4{
                font-size: 14px;
                color: #5A6C96;
                font-weight: 500;
                margin-right: 25px;

            }
        }

        img{
            width: 18px;
            height: 12px;
        }
    }

    

     /** Media Queries **/
     @media (max-width: 1024px) {
        .boxClass{
            .infos{
                flex-direction: row;
                align-items: baseline;
                justify-content: space-between;
                width: 100%;
                flex-wrap: wrap;
            }
        }
     }

     
`;


export const ListWeek = styled.div`
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
       margin: 0 30px 0 0;
       width: 100%;
       

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
           box-shadow: 2px 2px 12px 1px #ccc;
       }

       h3{
           color: #403F4C;
           font-size: 15px;
           font-weight: bold;
           margin: 0 0 6px 0;
       }

       .rating-card
       {
           display: flex;
           align-content: center;
           align-items: center;
           flex-direction: column;

           .title{
                font-size: 12px;
                color: #000000 !important;  
                font-weight: bold !important;
           }
           .average {
                color: #000000 !important;         
                font-size: 18px;
                font-weight: bold !important;
           }
           .stars {
                span {               
                        margin: 0 1px 0 0;
                        font-size: 22px;
                }
            }
            .startList{
                margin:0;
            }
           
       }

       .infos{
           display: flex;
           justify-content: space-between;
           align-items: end;
           flex-wrap: wrap;
           align-content: space-between;

           .classContent{
                align-content: space-between;
                display: flex;
                /* margin-bottom: 10px; */
                align-items: end;
                /* height: 35px;  */
                margin-bottom: 12px;
                
                .classAndTeacher{
                    display: flex;
                    margin: 1px 0 0 0;

                    h4{
                        margin: 0 10px 0 0;
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

                .success {
                    color: #00D36A;
                }

                .pending {
                    color: blue;
                }

                .cancel {
                    color: red;
                }

                .confirmed {
                    color: #00D36A;
                }

                button.active {
                    width: 84px;
                    height: 22px;
                    border-radius: 26px;
                    background: #004FFF;
                    border: 1px solid #004FFF;
                    color: #fff;
                    cursor: pointer;
                    font-size: 11px;
                    font-weight: bold;
                }

               h4{
                   .fa{
                        margin-left: 5px;
                   }
               }

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
                padding-left: 8px;

                .fa{
                    margin-left: 5px;
                }
            }

           h4{
                font-size: 14px;
                color: #5A6C96;
                font-weight: 500;
                margin: 0 25px 0 0;
                display: flex;
                align-items: end;

                img{
                    margin: 0 8px 0 0
                }
           }

         
       }

       /* img{
           width: 18px;
           height: 12px;
           margin: 0 8px 0 0;
       } */

       
   }

   /** Media Queries **/
   @media (max-width: 1024px) {
       width: 100%;
       max-width:100%;


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

export const ButtonPlus = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;

    button{
        background-color: #004FFF;
        border: 1px solid #004FFF;
        width: 128px;
        height: 38px;
        margin-top: 24px;
        border-radius: 26px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;

        .fa{
            margin-right: 5px;
        }
    }
`;


export const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    hr{
        position: absolute;
        width: 85%;
        z-index: -1;
    }

    .btnClean{
      color: #787780;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid #787780;
      width: 100px;
      height: 32px;
      border-radius: 26px;
      background-color: transparent;
      cursor: pointer;
      font-family: 'Quicksand', sans-serif;
      align-items: center;
      display: flex;
      justify-content: center;
      margin: 2px;
    }

    .btnConfirm{
      background-color: #004FFF;
      width: 100px;
      height: 32px;
      border-radius: 26px;
      border: none;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      font-size: 12px;
      font-family: 'Work Sans', sans-serif;
      align-items: center;
      display: flex;
      justify-content: center;
      margin: 2px;

  }

  

    button{
        background-color: #004FFF;
        width: auto;
        height: 38px;
        border-radius: 26px;
        border: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        margin: 48px 25px 20px 0;
        font-size: 14px;
        font-family: 'Work Sans', sans-serif;
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 10px;

        img{
            width: 18px;
            height: 16px;
            margin: 0 10px 0 0;
        }

        .fa{
            margin-right: 7px;
            /* font-size: 18px;
            font-weight: bold; */
        }
    }

    /** Media Queries **/
    @media (max-width: 1024px) {
        margin-top: 5px;
        hr{
            display: none;
        }
        button{
            width: auto;
            margin: 27px 25px 0 0;
        }
    }
`;


export const SelectButtons = styled.div`
    .active {
        background-color: #004FFF !important;
        color: #fff !important;
        border: #004FFF !important;
    }

    button, button:last-child {
        background-color: #fff;
        border: 1px solid #787780;
        color: #403F4C;
        font-size: 11px;
        border-radius: 26px;
        width: 226px;
        height: 32px;
        margin-top: 0;
        font-weight: bolder;
        cursor: pointer; 
    }
`;

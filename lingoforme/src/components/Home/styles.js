import styled from 'styled-components';

export const Profile = styled.div`
    .boxInfo{
        width: 100%;
        max-width: 87%;
        margin: 0 auto;

        .nameScreen{
            display: flex;
            width: 100%;

            .iconScreen{
                img{
                    width:25px;
                    height:22px;
                    margin-top: 15px;
                    margin-right: 5px;
                }
            }

            h1{
                color: #004FFF;
                font-weight: 100;
                font-size: 36px;
            }

            h2{
                color: #004FFF;
                font-weight: bold;
                margin: 0 0 4px;
            }

            .rating{
                display: flex;
                align-items: center;

                p{
                    color: #403F4C;
                    font-size: 16px;
                    font-weight: bold;
                    margin-right: 8px;
                }

                span.grades{
                    color: #403F4C;
                    font-size: 28px;
                    font-weight: 100;
                    margin-right: 8px;
                }
            }

            .tag{
                background-color: #5A6C96;
                border-radius: 25px;
                color: #fff;
                font-size: 12px;
                font-weight: 500;
                text-align: center;
                align-items: center;
                margin-bottom: 15px;
                display: inline-block;
                padding: 0px 12px 0px 12px;
                line-height: 20px;
            }

            .coordinatedLanguages{
                display: flex;
                align-items: center;

                h3{
                    font-size: 14px;
                    font-weight: bold;
                    color: #403F4C;
                    margin: 0;
                    margin-right: 9px;
                }

                span{
                    font-size: 14px;
                    font-weight: 500;
                    color: #403F4C;
                    margin-right: 12px;
                }
            }
           
        }

        
        
    }

    .placeholder{
        width: auto;
        
        text-align: center;
        h4{
            font-family: 'Quicksand', sans-serif;
            font-weight: 100;
            font-size: 18px;
            color: #403F4C;
        }

        .trial_title{
            text-align: center;
            font-family: 'Quicksand', sans-serif;
            font-weight: 500;
            color: red;
        }

        .trial_description{
            margin-top:20px;
            width: auto;
            display: block;
            font-family: 'Quicksand', sans-serif;
            font-weight: 500;
            color: #403F4C;
        }
    }

    .title{
        h2{
            font-size: 24px;
            font-weight: 100;
            color: #004FFF; 
            margin: 0 0 15px;
            text-align: center
        }
    }

    h2{
        font-size: 32px;
        font-weight: 500;
        color: #403F4C;
        margin: 0 0 0 103px;
    }

    h3{
        font-size: 20px;
        font-weight: 500;
        color: #403F4C;
        margin: 25px 0 0 103px;
    }

    .content{
        display: flex;
        max-width: 87%;
        margin: 50px auto;
    }

    .contentScheduling {
        width: 50%;
        height: 700px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 5px 25px #52575D1A;
        border-radius: 9px 9px 0px 0px;
        opacity: 1; 
    }

    .contentCycles {
        width: 50%;
        height: 620px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 5px 25px #52575D1A;
        border-radius: 9px 9px 0px 0px;
        margin-right: 30px;
        opacity: 1; 
    }

    .contentNextClass{
        width: 100%;
    }

    .buttons{
        display: flex;
        justify-content: center;
        margin: 16px 0 16px 0;

        button{
            color: #fff;
            font-size: 11px;
            font-weight: 500;
            width: 76px;
            height: 22px;
            border-radius: 26px;
            border: none;
            background-color: #004FFF;
            cursor: pointer;
            font-family: 'Work Sans', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;

            .fa{
                margin-left: 5px;
            }
        }
    }

    .boxWithoutTeacher{
        display: flex;
        margin-top: 60px;
        justify-content: center;

        h2{
            font-size: 23px;
            margin: 0 0 0 20px;
            font-weight: 100;
        }

        .withoutTeacher{
            margin: 0 18px 0 0;
            
            .buttons{
                button{                
                    color: #fff;
                    font-size: 12px;
                    font-weight: 500;
                    width: 76px;
                    height: 22px;
                    border-radius: 26px;
                    border: none;
                    background-color: #004FFF;
                    cursor: pointer;
                    font-family: 'Work Sans', sans-serif;
                }
            }

            /** Na integração talvez, precise retirar, para aparecer o butão run **/
            &:last-child{
                button.run{
                    display: none;
                }

            }

        }
    }

    .teacher{
        .scheduleClass{
            display: none;
        }
    }
    

    .nextHome{
        .containerNextClass {
            justify-content: space-between;
            display: flex;
        }

        .listScheduleCard{                    
            width: 94%;
            margin-left: 100px;  
        }

        .buttonShed {
            width: 100px;
            margin-right: 52px;

            button {
                background-color: #004FFF;
                width: 165px;
                height: 34px;
                border-radius: 17px;
                opacity: 1;
                border: none;
                font-size: 16px;
                color: #FFF;
            }
        }

        .titleNextClass {
            color: #004FFF;
            margin: 0;
            font-weight: bold;
            font-size:25px;
        } 
        .dateNexyClass {
            color: #004FFF;
            font-weight: bold;
            font-size:17px;
        }
        .separator {
            background-color: #004FFF;
            margin-top: 10px;
            height: 3px;
            width: 100%
        }

    }


    @media (max-width: 767px) {
        .contentCycles{
            display: none;
        }
        .contentScheduling{
            display: none;
        }
        .contentNextClass{
            margin-left: 0;
            margin-right: 0;
        }
    }

    @media (min-width: 1025px) and (max-width: 1366px) {
        .nextHome{
            .listScheduleCard{                    
                width: 100%;
                max-width: 83%;
                margin-left: 89px;                  
            }
        }
    }

    /** Media Queries **/
    @media (max-width: 1366px) {
        h2 {
            margin: 30px 0 5px 86px;
        }

        h3{
            margin: 56px 0 0 92px;
        }
    }

    @media (max-width: 1024px) {
        h2 {
            margin: 30px 0 30px 30px;
        }

        h3 {
            margin: 56px 0 0 30px;
        }

        .boxInfo {
            max-width: 100%;
            margin-bottom: 50px;
            margin-top: 0;

           .nameScreen{
                .iconScreen {
                    margin: 0 30px 0 33px;
                }
           }
        }
        
        .boxWithoutTeacher {
            width: 100%;
            flex-direction: column;

            .withoutTeacher {
                margin: 0 15px 0 0;
                width: 100%;
            }
        }
    }
`;

export const Legend = styled.div`
    display: flex;
    margin: 0 auto;
    padding: 100px 0px;

    .scheduledLegend{
        display: flex;

        .container{
            width: 26px;
            height: 26px;
            background: #91E2CF;
            border-radius: 5px;
            margin-right: 10px;
        }
        h5{
            color: #707070;
            opacity: 1;
            margin-top: 3px;
            font-size: 14px;
            margin-right: 10px;
        }

    }
    .InprogressLegend{
        display: flex;

        .container{
            width: 26px;
            height: 26px;
            background: #A19CEC;
            border-radius: 5px;
            margin-right: 10px;
        }
        h5{
            color: #707070;
            opacity: 1;
            margin-top: 3px;
            font-size: 14px;
            margin-right: 10px;
        }
    }
    .noShowLegend{
        display: flex;

        .container{
            width: 26px;
            height: 26px;
            background: #F2B0B0;
            border-radius: 5px;
            margin-right: 10px;
        }
        h5{
            color: #707070;
            opacity: 1;
            margin-top: 3px;
            font-size: 14px;
            margin-right: 10px;
        }
    }
    .cancelLegend{
        display: flex;

        .container{
            width: 26px;
            height: 26px;
            background: #98BEAA;
            border-radius: 5px;
            margin-right: 10px;
        }
        h5{
            color: #707070;
            opacity: 1;
            margin-top: 3px;
            font-size: 14px;
            margin-right: 10px;
        }
    }
    .performedLegend{
        display: flex;

        .container{
            width: 26px;
            height: 26px;
            background: #ABABAB;
            border-radius: 5px;
            margin-right: 10px;
        }
        h5{
            color: #707070;
            opacity: 1;
            margin-top: 3px;
            font-size: 14px;
            margin-right: 10px;
        }
    }

    @media (max-width: 767px) {
        margin-top: 50px;
        flex-wrap: wrap;

        .container{
            margin-bottom: 20px
        }

    }
`;
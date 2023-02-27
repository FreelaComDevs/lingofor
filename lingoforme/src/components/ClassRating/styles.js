import styled from 'styled-components'


export const RatingModal = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;

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

    .boxClass{
        background-color: #FFF;
        padding: 15px;
        margin-top: 15px;
        border-radius: 4px;
        width: 100%;
        font-size: 14px;
        display: flex;
        align-content: center;
        align-items: center;
        
    }

    .boxRow{
        display: flex;
        flex-direction: row;   
        align-content: center;
        align-items: center;  
        padding-bottom: 20px;
    }
    

    .buttons{
        display: flex;
        justify-content: flex-end;
        font-family: 'Quicksand', sans-serif;
        margin-bottom: 25px;
        justify-content: center;
        
        button{
            width: auto;
            height: 22px;
            border-radius: 26px;
            background: #fff;
            border: 1px solid #B2B2B7;
            color: #B2B2B7;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 10px 0 0 0;
            margin-right: 10px;
            font-family: 'Quicksand', sans-serif;

            &:last-child{
                width: auto;
                height: 22px;
                border-radius: 26px;
                background: #004FFF;
                border: 1px solid #004FFF;
                color: #fff;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
                margin: 10px 18px 0 0;
            }             
        }

        button.save {
            width: 134px;
             height: 22px;
            border-radius: 26px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 10px 18px 0 0;
            font-family: 'Work Sans', sans-serif;
        }

       
    }

    button{
        width: 134px;
        height: 22px;
        border-radius: 26px;
        background: #fff;
        border: 1px solid #B2B2B7;
        color: #B2B2B7;
        cursor: pointer;
        font-size: 11px;
        font-weight: bold;
        margin: 10px 0 0 0;
        margin-right: 10px;
        font-family: 'Quicksand', sans-serif;

        .active{
            width: 104px;
            height: 22px;
            border-radius: 26px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 10px 18px 0 0;
        }             
    }


    h3{
        color: #403F4C;
        font-size: 15px;
        font-weight: bold;
        margin: 0 0 6px 0;
    }

    .teacher-rating
    {
        display: flex;
        align-content: center;
        align-items: center;
        padding: 0;

        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
    }


    textarea{
        width: auto;
        height: 50px;
        border-radius: 18px;
        border: 1px solid #B2B2B7;
        color: #403F4C;
        padding-left: 10px;
        margin-bottom: 15px;
        font-size: 14px;
        font-family: 'Quicksand',sans-serif;
    }

    .infos{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;

        .classContent{
             display: flex;
             /* margin-bottom: 10px; */
             align-items: baseline;
             /* height: 35px;  */

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
                &:first-child{
                color: #00D36A;
                }

                &.cancel{
                    color: red;
                    font-size: 12px;
                }

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
            width: 80px;
            height: 22px;
            float: right;
            cursor: pointer;
            padding-left: 8px;
        }

        h4{
             font-size: 14px;
             color: #5A6C96;
             font-weight: 500;
             margin: 6px 25px 0 0;
             display: flex;
             align-items: center;
        }


   /** Media Queries **/
   @media (max-width: 1024px) {       
        
   

    .boxClass{
        display: flex;
        align-content: center;
        align-items: center;
        flex-direction: column;

        .teacher-rating
        {
            display: flex;
            align-content: center;
            align-items: center;
            flex-direction: column;
            padding-rigth: 50px;
        }


        .buttons{
            display: flex;
            justify-content: flex-end;
            font-family: 'Quicksand', sans-serif;
                margin-bottom: 24px;
            
            
            button{
                width: 104px;
                height: 22px;
                border-radius: 26px;
                background: #fff;
                border: 1px solid #B2B2B7;
                color: #B2B2B7;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
                margin: 10px 0 0 0;
                margin-right: 10px;
                font-family: 'Quicksand', sans-serif;
    
                &:last-child{
                    width: 104px;
                    height: 22px;
                    border-radius: 26px;
                    background: #004FFF;
                    border: 1px solid #004FFF;
                    color: #fff;
                    cursor: pointer;
                    font-size: 11px;
                    font-weight: bold;
                    margin: 10px 18px 0 0;
                }
    
                 
                &:disabled,
                    button[disabled]{
                    width: 58px;
                }
    
            }
               
        }

        .boxRow{
            display: flex;
            flex-direction: row;   
            align-content: center;
            align-items: center;  
            padding-bottom: 20px;
        }

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
`;



export const User = styled.div`
    .userName{
        h2{
            font-size: 24px;
            font-weight: 500;
            color: #87868F;
            margin:25px 0 0 199px;
            font-family: 'Quicksand', sans-serif;
        }
    }

    .avatarRound {
        border-radius: 50%;
        object-fit: cover;
    }
    

    .viewUser{
        display: flex;
        width: 100%;
        flex-direction: row;
    }

    .MuiInput-underline-15:before {
        border-bottom: none;
    }

    .MuiInput-underline-15:hover:not(.MuiInput-disabled-14):not(.MuiInput-focused-13):not(.MuiInput-error-16):before {
        border-bottom: none;
    }

    /** changePhoto**/
    .changePhoto{
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 40px 60px 0 25px;

        h2{
            color: #403F4C;
            font-size: 14px;
            margin: 0 0 10px 0;
        }

        .photo{
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        .fileUpload {
            position: relative;
            overflow: hidden;
            margin: 10px;
            border-radius: 26px;
            border: 1px solid #787780;
            width: 93px;
            height: 20px;
            text-align: center;
            font-size: 11px;
            font-weight: 500;
            opacity: 0.7;
            display: flex;
            align-items: center;
            justify-content: center;

            span{
                align-items: center;
                display: flex;
            }

            input.upload {
                position: absolute;
                top: 0;
                right: 0;
                margin: 0;
                padding: 0;
                font-size: 20px;
                cursor: pointer;
                opacity: 0;
                filter: alpha(opacity=0);
            }
        }
        
        span{
            img{
                padding: 0 5px 0 0;
            }
        }
    }

    /** Form **/
    .formulario{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin: 40px 100px 0 0;
        width: 100%;

        /* .react-inputs-validation__textbox__container___3KXOM{
            width: 45%;
            margin-right: 5px;
        } */

        .addEmail{
            display: flex;

            input{
                width: 460px;
            }
        }

        .label{
            margin: 0 0 -15px 0;
        }
        

        label{
            color: #403F4C;
            font-size: 14px;
            font-weight: bold;
        }

        span{
            color: #87868F;
            font-size: 10px;
            margin-left: 5px;
        }


        select{
            width: 220px;
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            padding-left: 10px;
            margin-bottom: 15px;
            color: #403F4C;
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
        }

        
        .profile{
            display: flex;
            justify-content: flex-start;
            margin-bottom: 25px;
            /* width: 100%; */
            /* max-width: 59%; */

            /* select{
                width: 220px;
                &:last-child{
                    display: none;
                }
            } */

            /* .role{
                width: 100%;
                max-width: 34%;
            } */
            
            .active{
                background-color: #00D36A;
                color: #fff !important;
                font-size: 18px;
                font-weight: 500;
                width: 126px;
                border: none;
                margin-left: 240px;
                font-family: 'Quicksand', sans-serif;
            } 
            
            .inactive{
                background-color: red;
                color: #fff !important;
                font-size: 18px;
                font-weight: 500;
                width: 126px;
                border: none;
                margin-left: 240px;
            }
        }


        input{
            width: 460px;
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            color: #403F4C;
            padding-left: 10px;
            margin-bottom: 15px;
            font-size: 14px;
            font-family: 'Quicksand', sans-serif;
        }

        .genderBox{
            margin-bottom: 25px;
        }


        .addInput{
            width: 110px;
            height: 32px;
            border-radius: 26px;
            margin-left: 20px;
            background: transparent;
            border: 1px solid #B2B2B7;
            color: #403F4C;
            font-family: 'Work Sans', sans-serif;
            font-size: 14px;
            cursor: pointer;
        }

        .inputs{
            display: flex;

            .lineInputs{
                margin-right: 23px;

                button{
                    margin: 21px 0 0 0
                }
                
                .gender{
                    width: 243px;
                }

                
                .MuiInput-input-14 {
                    width: 215px;
                    border: none;
                    height: 19px;
                    margin: 0;
                }

                .MuiFormControl-root-30 {
                    border: 1px solid;
                    border-radius: 26px;
                    border: 1px solid #B2B2B7;
                }

                input{
                    width: 220px;
                }
                
                select.userPhoneTypeId{                    
                    width: 300px;                    
                }
                    
            }

            p{
                font-size: 11px;
                color: #87868F;
                margin-top: 22px;
            }
        }

        button.delete{
            width: 83px;
            height: 22px;
            border-radius: 26px;
            background: transparent;           
            border: 1px solid #FF5666;
            color: #FF5666;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 25px 0 20px 20px;
        }

        button.deleteLast{
            width: 83px;
            height: 22px;
            border-radius: 26px;
            background: transparent;           
            border: 1px solid #FF5666;
            color: #FF5666;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 25px 0 20px 0;
            font-family: 'Quicksand', sans-serif;
        }

        .removephone{
            margin: 0 0 0 -25px; 
        }

        
    }

    .button{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        margin-top: 15px;

        button.save{
            width: 81px;
            height: 38px;
            border-radius: 26px;
            background: #004FFF;           
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            margin: 24px 0 30px 0;
            font-family: 'Work Sans', sans-serif;
        }

        button.back{
            width: 72px;
            height: 28px;
            border-radius: 26px;
            background: transparent;
            border: 1px solid #787780;
            color: #787780;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 30px 15px 30px 0px;

            .fa{
                margin-right: 3px;
            }
        }
    }

    input.jsx-4179805763  {
        width: 226px !important;
        height: 32px;
        border-radius: 26px;
        border: 1px solid #B2B2B7;
        padding-left: 10px;
        margin-bottom: 0;
        margin-top: 0;  
    }

    button.jsx-4179805763  {
        margin: 0 0 1px 0 !important;
    }

    input[type='number'] {
        -moz-appearance:textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    /** Media Queries **/
    @media (max-width: 1024px) {}
`

export const FilterUser = styled(User)`
    h2{
        font-size: 20px;
        font-weight: 400;
        color: #87868F;
        font-family: 'Quicksand', sans-serif;
        .fa{
            margin: 0 5px 0 0;
        }
    }

    .inativo{
        color: #FF5666;
        font-weight: bold;
    }
    

    .formulario{
        flex-direction: row;
        margin: 10px 0 0 0;

        .lineInput{
            display: flex;
            flex-direction: column;
            margin: 0 16px 0 0;
            width: 100%;
        }

        input {
            width: auto;

        }

        select{
            width: auto;
        }
    }

    .button{
        display: flex;
        justify-content: flex-end;
        width: 100%;
         
        button{
            width: 149px;
            height: 38px;
            border-radius: 26px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 20px 0;
        }
    }

    .buttons{
        display: flex;
        justify-content: flex-end;
        font-family: 'Quicksand', sans-serif;
        
        .Users-wrapper-2 {
            position: relative;
            width: 81px;
            height: 28px;
        }
        button{
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
            font-family: 'Quicksand', sans-serif;

            &:last-child{
                width: 84px;
                height: 22px;
                border-radius: 26px;
                background: #004FFF;
                border: 1px solid #004FFF;
                color: #fff;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
                margin: 10px 18px 0 0;
            }

             
            &:disabled,
                button[disabled]{
                width: 58px;
            }

        }

        button.save {
            width: 81px;
            height: 22px;
            border-radius: 26px;
            background: #004FFF;
            border: 1px solid #004FFF;
            color: #fff;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            margin: 10px 18px 0 0;
            font-family: 'Work Sans', sans-serif;
        }

       
    }

    .buttonsSelect{
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        font-family: 'Quicksand', sans-serif;
        align-items: flex-start;

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
            margin-right: 10px;
            font-family: 'Quicksand', sans-serif;           
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
       
    }    


    .teacherListBox{
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 5px;
        padding: 15px;
        box-shadow: 1px 1px 4px 1px #DADADA;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        margin-top: 25px;

        h3 {
            margin-right: 20px;
            white-space: nowrap;
        }

        .switch__container{
            margin: 0px;
        }
    }

 
.bigBoxTeacher {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    margin-top: 1px;
    box-shadow: 0px 1px 0px 1px #DADADA;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .boxColumn {
        align-items: flex-start;
        padding: 0px 15px 0px 15px;
        display: flex;
        flex-direction: column;
    }

    .endColumn{
        width: 50%;
        align-items: center;
        flex-direction: row;
        justify-content: flex-end;
    }

    label {
        color: #004FFF;
        font-weight: bold;
        font-size: 16px;
        font-family: 'Quicksand',sans-serif;
    }
    
    label:last-child {
        cursor: grab;
        cursor: -webkit-grab;
    }

    button.delete{
        width: 83px;
        height: 32px;
        border-radius: 26px;
        background: transparent;
        border: none;
        color: #FF5666;
        cursor: pointer;
        font-size: 11px;
        font-weight: bold;
    }
}


`

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
           width: 100%;
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
           align-items: center;
           flex-wrap: wrap;
           align-content: space-between;

           .classContent{
            align-content: space-between;
                display: flex;
                /* margin-bottom: 10px; */
                align-items: center;
                /* height: 35px;  */
                width: 100%;
                justify-content: space-between;

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
            width: 80px;
            height: 22px;
            float: right;
            cursor: pointer;
            padding-left: 8px;
               }

           h4{
                font-size: 14px;
                color: #5A6C96;
                font-weight: 500;
                margin: 6px 25px 0 0;
                display: flex;
                align-items: center;
           }

         
       }

       img{
           width: 18px;
           height: 12px;
           margin: 0 8px 0 0;
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
`
export const DialogRatingStudent = styled.div`

    .dialogImagePicture {
        width: 178px;
        height: 178px;
        border-radius: 100%;
        object-fit: cover;
        margin: 0 auto;
    }

    .dialogRatingTarget {
        font-size: 21px;
        letter-spacing: 0px;
        color: #3D3D3D;
        opacity: 1;
        margin-top: 15px;
    }

    .dialogRatingTitle {
        font-weight: 600;
        font-size: 21px;
        letter-spacing: 0px;
        color: #3D3D3D;
        opacity: 1;
    }

    .dialogClassForRating {
        letter-spacing: 0px;
        color: #707070;
        opacity: 1;
        font-weight: 0;
        font-size: 20px;
    }

    .dialogRating {
        font-family: 'Quicksand', sans-serif;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0px;
        color: #3D3D3D;
        opacity: 1;
    }
`

export const RatingStudent = styled.div`

    .dialogContainer{
        display: flex;
        margin: auto 0;
    }

    .ImageRating {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .dialogRating {
        padding: 0 30px;
    }

    .titleOpcao {
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0px;
        color: #3D3D3D;
        opacity: 1;
        margin-bottom: 20px;
    }

    .titleOpcaoLike {
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0px;
        color: #3D3D3D;
        opacity: 1;
    }

    .dialogContainerLike {

    }
`;


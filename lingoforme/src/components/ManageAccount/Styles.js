import styled from 'styled-components';

export const Manage2 = styled.div`
.tabs{
    width: 100%;

    .tab-content{
        margin-bottom: 36px
    }
    
    /** Tabs **/
    .tab-list {
        border-bottom: 1px solid #ccc;
        padding-left: 0;

        .tabsContent{
            margin: 0 auto;
            width: 100%;
            max-width: 84%;
            
            .tab-list-item {
                display: inline-block;
                list-style: none;
                margin-bottom: -1px;
                padding: 0 1.75rem;
                cursor: pointer;
                font-size: 14px;
            }
        
            .tab-list-active {
                color: #004FFF;
                font-weight: bold;
                border-bottom: 4px solid #004FFF;
            }
        }
    }

    /** Box **/
    .box{
        width: 100%;
        height: 100%;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        padding: 10px 0 20px 15px;
        
    }

    /** Personal**/
    .changePhoto{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        margin: 40px 40px 0 0;

        h2{
            color: #403F4C;
            font-size: 14px;
            margin-bottom: 2px;
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
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;

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
        justify-content: center;
        flex-direction: column;
        margin: 40px 100px 0 0;

        label{
            color: #403F4C;
            font-size: 14px;
            font-weight: bold;
        }

        span{
            color: #403F4C;
            font-size: 10px;
        }

        input{
            width: 460px;
            height: 28px;
            border-radius: 26px;
            border: 1px solid #403F4C;
            padding-left: 10px;
            margin-bottom: 15px;
        }

        .telephone{
            input{
                width: 220px;
            }

            button.addInput{
                margin: 20px 0 0 0;
                font-family: 'Work Sans', sans-serif;
            }
        }

        button.addInput{
            width: 108px;
            margin: 0 0 0 14px;
            background: transparent;
            height: 32px;
            border: 1px solid #403F4C;
            color: #403F4C;
            font-family: 'Work Sans', sans-serif;
        }

         button.password{
            width: 158px;
            margin: 0;
            background-color: transparent;
            border: 1px solid #403F4C;
            color: #403F4C;
        }

        .notification{
            display: flex;

            .switch__container{
                margin: 5px 0 0 23px;

                span{
                    margin-left: 47px;
                    font-size: 12px;
                    color: #707070;
                }
            }

            span.delete{
                margin: 11px 0 0 0;
                width: 55px;
                font-weight: bold;
            }
        }

        .switchBox{
            display: flex;
        }

        select{
            width: 220px;
            height: 32px;
            border-radius: 26px;
            border: 1px solid #403F4C;
            padding-left: 10px;
            margin-bottom: 15px;
        }

       

        .selects{
            display: flex;
            flex-direction: row;

        }

        .lineSelect{
            margin: 0 25px 0 0;

            p{
                font-size: 11px;
                margin-top: 22px;
                color: #403F4C;
            }
        }

        span.delete {
            color: red;
            font-size: 10px;
            font-weight: bold;
            margin-top: 30px;
            float: left;
        }

        button{
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-weight: bold;
            font-size: 11px;
            border-radius: 26px;
            width: 81px;
            height: 38px;
            margin: 15px 0 42px 0;
            cursor: pointer;
        }

    }

    /** Button Save **/
    .buttonSave{
        display: flex;
        justify-content: flex-end;
        margin-right: 30px;

        button{
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-weight: bold;
            font-size: 11px;
            border-radius: 26px;
            width: 81px;
            height: 38px;
            margin: 15px 0 42px 0;
            cursor: pointer;
        }
    }

    /** Plans **/
    .planBox{

        .box {
            flex-direction: column;
            padding: 0;
        }

        .PlansBox {
            display: flex;
            flex-direction: row;
            width: 100%;

            .chosenPlan {
                flex-direction: row;
                display: flex;
                margin: 0;
                width: 100%;
                height: 80px;
                padding: 10px 0 0 15px;
                margin-left: 13px;
                flex-wrap: wrap;

               h2 {
                    padding: 0 30px 0 0;
                    font-size: 15px;
                    color: #403F4C;
                    font-weight: bold;
                    margin: 0;
                }

                h3 {
                    padding: 0;
                    margin: 0;
                    font-size: 18px;
                    color: #403F4C;
                    font-weight: bold;
                }

                p {
                    color: #403F4C;
                    font-size: 15px;
                    padding: 0;
                    margin: 0 0 5px 0;
                }

                button {
                    background-color: #004FFF;
                    border: none;
                    color: #fff;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 86px;
                    height: 28px;
                    margin-top: 5px;
                    cursor: pointer;

                    &:last-child {
                        background-color: #fff;
                        border: 1px solid #787780;
                        color: #403F4C;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 93px;
                        height: 28px;
                        margin: 5px 0 26px 10px;
                        cursor: pointer;
                    }
                }

               
            }

            .plans {
                display: flex;
                margin: 20px 10px 10px 28px;

                &.buttons-plans {
                    display: flex;
                }

                .changePlan {
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    padding-left: 10px;

                    h2 {
                        color: #403F4C;
                        font-size: 22px;
                        font-weight: bold;
                        margin-top: 6px;
                    }

                    button {
                        background-color: #004FFF;
                        border: none;
                        color: #fff;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 86px;
                        height: 22px;
                        margin-top: 5px;
                        cursor: pointer;

                        &:last-child {
                            background-color: #fff;
                            border: 1px solid #787780;
                            color: #403F4C;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 93px;
                            height: 22px;
                            margin-top: 5px;
                            cursor: pointer;
                        }
                    }
                }

                /** Controle Plano **/
                .controlPlan{
                    display: flex;
                    flex-direction: row;
                    align-items: start;
                    width: 100%;

                    .infos{
                        flex-direction: column;
                        margin: 8px 25px 0 0;
                    }

                    h2{
                        font-size: 13px;
                        color: #403F4C;
                        font-weight: bold;
                        margin: 0;
                        padding: 0;
                    }

                    h3{
                        font-size: 13px;
                        color: #403F4C;
                        margin: 0;
                        padding: 0;
                    }

                    span{
                        color: #004FFF;
                        font-size: 22px;
                        font-weight: bold;

                        &:last-child{
                            color: #004FFF;
                            font-size: 14px;
                        }
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
                    
                }

                /** Números **/
                .numbers{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: -3px;
                }

                /** Stock **/
                .stock{
                    hr {
                        height: 4px;
                        background-color: #004FFF;
                        width: 100%;
                        border: none;
                        margin: 10px 0 10px 0;
                    }

                    span{
                        color: #004FFF;
                        font-size: 12px;
                    }
                }

                /** Pagamento **/
                .payment{
                    flex-direction: column;

                    h2{
                        font-size: 15px;
                        color: #403F4C;
                        font-weight: bold;
                        margin: 0;
                        padding: 0;
                    }

                    h3{
                        font-size: 18px;
                        color: #403F4C;
                        font-weight: normal;
                        margin-top: 4px;
                        margin: 0;
                        padding: 0;
                    }

                    button{
                        background-color: #fff;
                        border: 1px solid #787780;
                        color: #403F4C;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 64px;
                        height: 22px;
                        margin-top: 8px;
                    }
                }

                /** Valores **/
                .value {
                    h2{
                        font-size: 15px;
                        color: #403F4C;
                        font-weight: bold;
                        margin: 0;
                        padding: 0;
                    }

                    h3{
                        font-size: 18px;
                        color: #403F4C;
                        font-weight: normal;
                        margin-top: 4px;
                        margin: 0;
                        padding: 0;                       
                    }

                    button{
                        background-color: #fff;
                        border: 1px solid #787780;
                        color: #403F4C;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 94px;
                        height: 22px;
                        margin-top: 8px;
                        cursor: pointer;
                    }

                }

                &:nth-child(2) {
                    flex-direction: column;
                }

                &:last-child button{
                    background-color: #004FFF;
                    border: none;
                    color: #fff;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 115px;
                    height: 22px;
                    margin-top: 5px;
                    cursor: pointer;
                }

                .buttons{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 25px;
                    padding: 0 15px 0 15px;
                    cursor: pointer;

                    button{
                        background-color: transparent;
                        border: 1px solid #787780;
                        color: #403F4C;
                        font-weight: bold;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 71px;
                        height: 32px;
                        margin-top: 9px;
                        cursor: pointer;

                        &:last-child{
                            background-color: #004FFF;
                            border: none;
                            color: #fff;
                            font-weight: bold;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 81px;
                            height: 38px;
                            margin-top: 5px;
                            cursor: pointer;
                        }
                    }

                    .cancel{
                        button{
                            background-color: transparent;
                            border: 1px solid #FF5666;
                            color: #FF5666;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 104px;
                            height: 22px;
                            margin-top: 5px;
                            cursor: pointer;
                        }
                    }
                }

            }
            
        }
    }

    /** box Big **/
    .boxBig {
        width: 95%;
        padding: 10px;
        margin: 0 auto;

        
        .itemBox {
            display: flex;
            justify-content: space-between;
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            margin: 16px 0 27px 0;

            &:first-child {
                border-bottom: 1px solid #707070;
            }

            h5{
                padding: 0;
                margin: 0;
            }

            span{
                color: #004FFF;
            }

            .levelTop {
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                width: 100%;
                max-width: 160px;

                .levelTopLinguage {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;

                    .boxLanguage {
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                        flex-direction: column;

                        h5{
                            padding: 0;
                            margin: 0;
                        }

                        .language {
                            display: flex;
                            margin: 7px 0 13px 0;

                            img {
                                margin: 0 8px 0 0;
                            }

                            h5{
                                padding: 0;
                                margin: 0;
                            }
                        }
                    }
                }

                .columLevel {
                    justify-content: flex-end;
                    display: flex;
                    width: 100%;

                    h5 {
                        text-align: right;
                        padding: 0;
                        margin: 0;
                    }
                }
                
            }

            .grades {
                display: flex;
                flex-direction: row;
                margin: 0 0 0 -52px;

                h6 {
                    margin: 19px 10px 0 0;
                }

                h5{
                    padding: 0;
                    margin: 0;
                    span {
                        color: #004FFF;
                    }
                }
            }             
        }        
    }

    /** Notifications **/
    .infoNotification {
        width: 100%;

        h2 {
            color: #403F4C;
            font-size: 18px;
            margin: 40px 0 0 52px;
        }
        
        .ul {
            // margin: 40px 0 0 0;
            // display: flex;
            // width: 88%;
            // flex-direction: column;

           .li {
                // display: flex;
                // align-items: center;
                // padding: 0;
                // margin: 0;
                // height: 50px;

                // span {
                //     width: 70px;
                //     margin: -23px 15px 0 0;
                // }
            }

        }
    }

    /** Manage Available Hours **/
    .topManage {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        margin: 15px 25px 0 0;
        align-items: center;

        h2 {
            font-size: 18px;
            color: #403F4C;
            font-weight: normal;
        }

        button {
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            border-radius: 26px;
            width: 155px;
            height: 38px;
            margin-top: 5px;
            cursor: pointer;
        }
    }

    .manage {
        display: flex;
        width: 100%;
        justify-content: start;
        flex-direction: column;

        .day {
            display: flex;
            align-items: center;
            flex-direction: row;
            margin: 10px 0 10px 0;
        }

        h2 {
            font-size: 18px;
            color: #004FFF;
            font-weight: bold;
        }

        button {
            background-color: #004FFF;
            border: none;
            color: #fff;
            font-size: 11px;
            font-weight: bold;
            border-radius: 26px;
            width: 44px;
            height: 22px;
            margin: 5px 0 0 16px;
            cursor: pointer;
        }

        ul {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            list-style: none;
            padding: 0;

            .configDay {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
                margin: 0 30px 0 0;
            }

            li {
                font-size: 14px;
                color: #403F4C;
                padding: 0 5px 0 0;

               span {
                    color: red;
                    font-size: 12px;
                }
            }
        }

    }

    /** Edit **/
    .selectDays{
        h2 {
            color: #403F4C;
            font-size: 20px;
            margin: 0;
        }

        h3 {
            color: #403F4C;
            font-size: 12px;
            margin: 0;
        }

        h4 {
            color: #403F4C;
            font-size: 14px;
            margin: 15px 0 0 0;
        }

        ul {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            justify-content: start;
            list-style: none;
            padding: 0;

            li {
                margin: 0 10px 0 0;
                padding: 5px 0 0 0;

                button {
                    background-color: #fff;
                    border: 1px solid #787780;
                    color: #403F4C;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 76px;
                    height: 24px;
                    margin-top: 0;
                    cursor: pointer;

                    button.active {
                        background-color: #004FFF;
                        color: #fff;
                        border: #004FFF;
                    }
                }
            }
        }

        .time{
            ul {
                list-style: none;
                margin-left: 30px;

                li {
                    display: flex;
                    flex-direction: column;
                }
            }

            select {
                background-color: #004FFF;
                color: #fff;
                border-radius: 26px;
                border: 0;
                width: 114px;
                height: 24px;
                padding-left: 10px;
            }
        }

        .addSlot{
            button {
                background-color: #fff;
                border: 1px solid #787780;
                color: #403F4C;
                font-size: 11px;
                border-radius: 26px;
                width: 145px;
                height: 24px;
                margin: 15px 0 0 30px;
                cursor: pointer;
            }
        }

        .buttons {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: 25px;
            padding: 0 15px 0 15px;
            cursor: pointer;
            font-family: 'Quicksand', sans-serif;

            button {
                background-color: transparent;
                border: 1px solid #787780;
                color: #403F4C;
                font-weight: bold;
                font-size: 11px;
                border-radius: 26px;
                width: 71px;
                height: 32px;
                margin-top: 9px;
                cursor: pointer;

                &:last-child {
                    background-color: #004FFF;
                    border: none;
                    color: #fff;
                    font-weight: bold;
                    font-size: 11px;
                    border-radius: 26px;
                    width: 81px;
                    height: 38px;
                    margin-top: 5px;
                    cursor: pointer;
                }
            }
        }
    }
}


@media (max-width: 1024px) {
            .tabs{
                .tab-list{
                    .tabsContent {
                        margin: 0 auto;
                        width: 100%;
                        max-width: 100%;
                        display: flex;

                        .tab-list-item {
                            font-size: 12px;
                            text-align: center;
                            padding: 0 0.75rem;
                        }
                    }
                }
            
            .box {
                height: 100%;
                flex-direction: column;
                padding: 0;
                margin: 20px auto;
            }
            

            .changePhoto {
                padding-top: 20px;
                justify-content: center;
                width: 100%;
                margin: 0;
            }

            .formulario {
                display: flex;
                justify-content: center;
                flex-direction: column;
                width: 90%;
                margin: 20px auto;

                input {
                    width: 100%;
                }

                .telephone{
                    input {
                        width: 90%;
                        margin: 0 10px 0 0;
                    }

                    button.addInput {
                        text-indent: -9000px;
                        width: 25px;
                        height: 25px;
                        margin-top: 25px;
                        font-family: 'Work Sans', sans-serif;
                    }
                }

   

                input.inputMobile{
                    width: 55%;
                }

                select.inputMobile{
                    width: 55%;
                }

                .notification {
                    flex-direction: column;

                     .switch__container {
                        margin: 0 0 15px 4px;
                    }

                    span.delete {
                        margin: 6px 0 0 20px;
                        border-radius: 50px;
                        border: 1px solid red;
                        width: 25px;
                        height: 25px;
                        text-indent: -9000px;
                    }
                }

                .switchBox{
                    display: flex;
                }

                &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                    padding-left: 10px;
                }

                select {
                    width: auto;
                }

                .selects {
                    flex-direction: column;
                    width: 100%;
                }

                .telephone {
                    flex-direction: row;
                    width: 100%;
                    margin-bottom: 15px;

                    select{
                        width: 95%;
                        margin: 0 20px 0 0;
                    }

                    span.delete {
                        margin: 20px 0 0 0;
                        border-radius: 50px;
                        border: 1px solid red;
                        width: 25px;
                        height: 25px;
                        text-indent: -9000px;
                    }
                    
                }

                 .lineSelect {
                    margin: 0 5px 0 0;
                    width: 100%;

                     p {
                        font-size: 11px;
                        margin: -9px 0 12px 0;
                    }

                    button.addInput {
                        text-indent: -9000px;
                        width: 25px;
                        height: 25px;
                        margin-top: 25px;
                        font-family: 'Work Sans', sans-serif;
                    }

                }

                .buttonSave {
                    display: flex;
                    justify-content: center;
                    margin: 0;
                }

            }

            .buttonSave {
                justify-content: center;
            }

            .plans {
                width: 88%;
                margin-left: 0;
                margin-bottom: 58px;
                margin: 15px auto;
            }

            .PlansBox{
                flex-direction: column !important; 

                .changePlan {
                    flex-direction: row !important;
                    width: 100%;
                    flex-wrap: wrap;

                    h2{
                        margin-bottom: 5px;
                    }

                    button{
                        margin-left: 40px;

                        &:last-child{
                            margin-left: 0;
                        }
                    }
                }
                .plans:nth-child(2) {
                    margin-top: 0;
                }

                .stock{
                    hr {
                        margin: 2px 0 5px 0 !important;
                    }
                }

            }

            .controlPlan{
                .infos {
                    margin: 8px 106px 0 0 !important;
                }
            }

            .numbers {
                margin-top: 8px;
            }

            /** Level **/
            .itemBox {
                display: flex !important;
                justify-content: space-between !important;
                width: 100% !important;
                flex-wrap: wrap !important;
                flex-direction: row !important;
            }

            .levelTop {
                flex-direction: row !important;
                width: 100% !important;
                max-width: 100% !important;
                margin-bottom: 25px !important;
            }

            .columLevel {
                justify-content: end;
            }

            .grades {
                margin: -17px 0 0 0px !important;
                align-items: baseline;
                flex-direction: column;

                h6 {
                    margin: 13px 10px 6px 0;
                }

            }

            .columLevel {
                justify-content: end !important;

                h5 {
                    text-align: left !important;
                }
            }
    

            // .infoNotification{
            //     h2 {
            //         margin: 14px 0 0 18px;
            //     }

            //     ul {
            //         margin: 10px 0 0 17px;
            //     }
            // }

            .manage{
                padding: 15px;

                h2{
                    margin: 0;
                }

                ul{
                    flex-direction: column;

                    .configDay {
                        flex-direction: row;
                        width: 93%;
                        margin: 0 0 10px 0;
                    }
                }

                
            }

            .topManage {
                flex-direction: column;
                padding: 15px;

                button{
                    margin-bottom: 25px;
                }
            }

            .selectDays{
                padding: 15px 15px 0 15px;

                ul{
                    margin: 0;
                }

                .time{
                    ul {
                        margin-left: 0;
                        justify-content: space-between;
                        list-style: none;
                        margin-left: 0;
                    }
                }

                .addSlot{
                    button {
                        background-color: #fff;
                        border: 1px solid #787780;
                        color: #403F4C;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 145px;
                        height: 24px;
                        margin: 15px 0 20px 0;
                        cursor: pointer;
                    }
                }
            }


    }
}

`;


export const Billing2 = styled.div`

    .box {
        width: 88%;
        height: 55px;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        padding: 15px 10px 20px 10px;
        margin: 20px auto;
        justify-content: space-between;
        align-items: center;

        .topBox {
            display: flex;
            align-items: center;

            h2 {
                margin-left: 15px;
                font-size: 20px;
                font-weight: bold;
            }
        }

        .titleBox{
            h2 {
                color: #004FFF;
                font-size: 16px;
                font-weight: bold;
                margin: 5px 15px 5px 60px;
            }
        }

        .boxInfo {
            display: flex;
            width: 100%;
            justify-content: space-between;
            padding: 0 10px 0 10px;
            flex-wrap: wrap;

            .infoBilling {
                flex-direction: column;

                h2 {
                    font-size: 13px;
                    color: #403F4C;
                    font-weight: bold;
                    margin: 0;
                    padding: 0
                }

                h3 {
                    font-size: 13px;
                    color: #403F4C;
                    font-weight: normal;
                    margin: 0;
                    padding: 0
                }
                
                span {
                    color: #00D36A;
                    font-weight: bold;
                }
                
            }

            .word-wrap-break {
                word-break: break-all;
                width: 25%;
            }
        }
    }

    .buttons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin: 25px 35px 25px 0;
        padding: 0 15px 0 15px;
        cursor: pointer;

        button {
            background-color: transparent;
            border: 1px solid #787780;
            color: #403F4C;
            font-weight: bold;
            font-size: 11px;
            border-radius: 26px;
            width: 71px;
            height: 32px;
            margin-top: 9px;
            cursor: pointer;
        }
    }
}

/** Media Queries **/
@media (max-width: 1024px) {
    
    .box {
        width: 90%;
        height: 100%;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        padding: 20px 0 15px 10px;
        margin: 20px auto;
        justify-content: space-between;
        align-items: center;
    }

    .infoBilling {
        flex-direction: column;
        margin: 0 15px 15px 0;
    }

    .rowBilling {
        flex-direction: column;
        display: flex;
        width: 100%;;
    }


}



`;

export const Manage = styled.div`
    h3{
        font-size: 22px;
        color: #004FFF;
        font-weight: bold;
        font-family: 'Quicksand', sans-serif;
        margin: 20px 0;
        width: 100%;
        max-width: 66%;
        text-align: center;
    }

    .tabs{
        width: 102%;

        .tab-content{
            margin-bottom: 36px;

            .buttons-plans {
                display: flex;
                flex-direction: column;
                align-items: flex-end !important;

                .button-buy-more {
                    background-color: #004FFF !important;
                    color: #fff !important;
                    font-size: 11px;
                    font-family: "Quiscksand", sans-serif;
                    font-weight: 500;
                    width: auto !important;
                    height: auto !important;
                    padding: 6px 10px;
                    white-space: nowrap;
                    margin-top: 7px !important;
                    border: none !important;
                }
            }

            .buttons{
                display: flex;
                justify-content: center;
                margin-top: 10px;

                button{
                    background-color: #004FFF;
                    border: none;
                    color: #fff;
                    font-size: 14px;
                    border-radius: 26px;
                    width: auto;
                    height: 38px;
                    margin-top: 50px;
                    cursor: pointer;
                    font-family: 'Work Sans', sans-serif;
                    font-weight: 900;
                    padding: 0 12px 0 12px;

                }
            }
        }
        
        /** Tabs **/
        .tab-list {
            border-bottom: 1px solid #ccc;
            padding-left: 0;

            .tabsContent{
                margin: 0 auto;
                width: 100%;
                text-align: center;
                
                .tab-list-item {
                    display: inline-block;
                    list-style: none;
                    margin-bottom: -1px;
                    padding: 0;
                    margin-right: 24px;
                    cursor: pointer;
                    font-size: 16px;
                    font-family: 'Quicksand', sans-serif;
                    color: #706F79;
                    font-weight: 500;
                }
            
                .tab-list-active {
                    color: #004FFF;
                    font-weight: bold;
                    border-bottom: 4px solid #004FFF;
                    font-size: 16px;
                    font-family: 'Quicksand', sans-serif
                }
            }
        }

        /** Box **/
        .box{
            width: auto;
            height: 100%;
            background-color: #fff;
            margin-top: 25px;
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            padding: 10px 0 20px 15px;
            box-shadow: 2px 2px 12px 1px #ccc;
            border-radius: 4px;
        }

        /* .bigBox {
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
        } */

        .userName{
            h2{
                font-size: 24px;
                font-weight: 500;
                color: #87868F;
                margin:25px 0 0 100px;
                font-family: 'Quicksand', sans-serif;
            }
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

        /** Personal**/
        .changePhoto{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            /* width: 100%; */
            margin: 40px 85px 0 25px;

            h2{
                color: #403F4C;
                font-size: 14px;
                margin-bottom: 10px;
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
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;

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

                span{
                    display: flex; 
                    align-items: center;
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
            justify-content: center;
            flex-direction: column;
            margin: 40px 100px 0 0;

            label{
                color: #403F4C;
                font-size: 14px;
                font-weight: bold;
            }

            .addEmail{
                display: flex;

                input{
                    width: 460px;
                }
            }

            .label{
                margin: 0 0 -15px 0;
            }

            span{
                color: #87868F;
                font-size: 10px;
                margin-left: 5px;
            }

            span.invalid {
                font-size: 10px;
                margin-left: 5px;
                color: red;
            }
            select{
                width: 220px;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #B2B2B7;
                padding-left: 10px;
                margin-bottom: 15px;
                color: #403F4C;
                font-family: 'Quicksand',sans-serif;
                font-size: 14px;
                margin-top: 2px;
            }

            .selectClass{
                pointer-events: none;
                touch-action: none;
                    
                select, input{
                    border: none;
                    background-image: none;
                    padding: 0;
                }

                span{
                    display: none;
                }
            }
           


            .profile{
                display: flex;
                justify-content: flex-start;
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
                background-color: transparent;
                font-family: 'Quicksand', sans-serif;
                font-size: 14px;
                margin-top: 2px;
            }
            
            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #87868F;
            }

            .addInput{
                width: 128px;
                height: 32px;
                border-radius: 26px;
                margin: 0 24px;
                background: transparent;           
                border: 1px solid #B2B2B7;
                color: #87868F;
                cursor: pointer;
                font-family: 'Work Sans', sans-serif;
            }

            input:invalid{
                width: 460px;
                height: 32px;
                border-radius: 26px;
                /* border: 1px solid red; */
                padding-left: 10px;
                margin-bottom: 15px;
            }

            .inputs{
                display: flex;

                

            .lineInputs{
                margin-right: 23px;

                button{
                    margin: 24px 0 0 -6px;
                    width: 175px;
                    padding: 0 12px;
                    margin-bottom: 48px;
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


            .telephone{
                input{
                    width: 220px;
                }

                button.addInput{
                    margin: 20px 0 0 0;
                    font-family: 'Work Sans', sans-serif;
                }
            }

            button.addInput{
                width: 132px;
                height: 32px;
                border-radius: 26px;
                margin-left: 20px;
                background: transparent;
                border: 1px solid #403F4C;
                color: #403F4C;
                font-family: 'Work Sans', sans-serif;
                font-size: 14px;
                cursor: pointer;
                margin-bottom: 22px;
                font-weight: 500;
            }

            button.password{
                width: 158px;
                height: 32px;
                border-radius: 26px;
                margin-left: 0;
                background: transparent;
                border: 1px solid #B2B2B7;
                color: #403F4C;
                font-family: 'Quicksand', sans-serif;
                font-size: 14px;
                cursor: pointer;
                font-weight: 100;
                margin: 2px 0 44px 0;
            }

            .notification{
                display: flex;

                .switch__container{
                    margin: 5px 0 0 23px;

                    span{
                        margin-left: 47px;
                        font-size: 12px;
                        color: #707070;
                        font-family: 'Quicksand', sans-serif;
                    }
                }

                span.delete{
                    margin: 11px 0 0 0;
                    width: 55px;
                    font-weight: bold;
                }
            }

            .switchBox{
                display: flex;
            }

            // select{
            //     width: 220px;
            //     height: 32px;
            //     border-radius: 26px;
            //     border: 1px solid #403F4C;
            //     padding-left: 10px;
            //     margin-bottom: 15px;
            // }

            .selects{
                display: flex;
                flex-direction: row;

            }

            .lineSelect{
                margin: 0 25px 0 0;

                p{
                    font-size: 11px;
                    margin-top: 22px;
                    color: #403F4C;
                }
            }

            span.delete {
                color: red;
                font-size: 10px;
                font-weight: bold;
                margin-top: 30px;
                float: left;
            }


            button{
                background-color: #004FFF;
                border: none;
                color: #fff;
                font-weight: bold;
                font-size: 11px;
                border-radius: 26px;
                width: 81px;
                height: 38px;
                margin: 15px 0 42px 0;
                cursor: pointer;
            }

            button.jsx-4179805763 {
                width: 226px;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #B2B2B7;
                padding-left: 10px;
                margin: 0 0 1px 0 !important;
                background: #B2B2B7;
                border-radius: 0;
            }
            button.focus.jsx-4179805763  {
                background: #B2B2B7;
            }

            button.delete{
                width: 83px;
                height: 22px;
                border-radius: 26px;
                background: transparent;           
                border: none;
                color: #FF5666;
                cursor: pointer;
                font-size: 11px;
                font-weight: bold;
                margin: 25px 0 20px 7px;
                
            }

        }

        /** Button Save **/
        .buttonSave{
            display: flex;
            justify-content: flex-end;
            margin-right: 30px;

            button{
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
                font-family: 'Work Sans',sans-serif;
            }
        }

        input.jsx-4179805763  {
            width: 226px;
            height: 32px;
            border-radius: 26px;
            border: 1px solid #B2B2B7;
            padding-left: 10px;
            margin-bottom: 0;
            // margin-top: 21px;       
        }
        
        /** Plans **/
        .planBox{

            .box {
                flex-direction: column;
                padding: 0;

                .buttons{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-end;
                    margin: 25px 35px 25px 0;
                    padding: 0 15px 0 15px;
                    cursor: pointer;
            
                    button {
                        background-color: transparent;
                        border: 1px solid #787780;
                        color: #403F4C;
                        font-weight: bold;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 71px;
                        height: 32px;
                        margin-top: 9px;
                        cursor: pointer;
        
                        &:last-child{
                            background-color: #004FFF;
                            border: none;
                            color: #fff;
                            font-weight: bold;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 81px;
                            height: 38px;
                            margin-top: 5px;
                            margin-left: 15px;
                            cursor: pointer;
                        }
                    }
                }
            }

            .PlansBox {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;

                &:last-child{
                    margin-bottom: 25px;
                }

                .chosenPlan {
                    flex-direction: row;
                    display: flex;
                    margin: 0;
                    width: 100%;
                    height: 80px;
                    padding: 10px 0 0 15px;
                    margin-left: 13px;
                    flex-wrap: wrap;

                h2 {
                        padding: 0 30px 0 0;
                        font-size: 15px;
                        color: #403F4C;
                        font-weight: bold;
                        margin: 0;
                    }

                    h3 {
                        padding: 0;
                        margin: 0;
                        font-size: 18px;
                        color: #403F4C;
                        font-weight: bold;
                    }

                    p {
                        color: #403F4C;
                        font-size: 15px;
                        padding: 0;
                        margin: 0 0 5px 0;
                    }

                    button {
                        background-color: #004FFF;
                        border: none;
                        color: #fff;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 86px;
                        height: 28px;
                        margin-top: 5px;
                        cursor: pointer;

                        &:last-child {
                            background-color: #fff;
                            border: 1px solid #B2B2B7;
                            color: #B2B2B7;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 93px;
                            height: 28px;
                            margin: 5px 0 26px 10px;
                            cursor: pointer;
                        }
                    }

                }

                .last{                    
                    margin-bottom: 20px;
                }

                .plans {
                    display: flex;
                    margin: 20px 100px 0 20px;

                    .changePlan {
                        display: flex;
                        flex-direction: column;
                        align-items: start;
                        padding-left: 10px;

                        h2 {
                            color: #403F4C;
                            font-size: 18px;
                            font-weight: bold;
                            margin-top: 6px;
                        }

                        button {
                            background-color: #004FFF;
                            border: none;
                            color: #fff;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 86px;
                            height: 22px;
                            margin-top: 5px;
                            margin-right: 5px;
                            cursor: pointer;
                            font-family: 'Quicksand', sans-serif;

                            &:last-child {
                                background-color: #fff;
                                border: 1px solid #B2B2B7;
                                color: #B2B2B7;
                                font-size: 11px;
                                border-radius: 26px;
                                width: 93px;
                                height: 22px;
                                margin-top: 5px;
                                cursor: pointer;
                            }

                            .fa{
                                margin-left: 10px;
                            }
                        }
                    }

                    /** Controle Plano **/
                    .controlPlan{
                        display: flex;
                        flex-direction: row;
                        align-items: start;
                        width: 100%;

                        .infos{
                            flex-direction: column;
                            margin: 8px 25px 0 0;
                        }

                        h2{
                            font-size: 13px;
                            color: #9E9EA4;
                            font-weight: bold;
                            margin: 0;
                            padding: 0;
                            font-family: 'Quicksand', sans-serif;
                        }

                        h3{
                            font-size: 14px;
                            color: #403F4C;
                            margin: 3px 0 0 0;
                            padding: 0;
                            font-family: 'Quicksand',sans-serif;
                            font-weight: 100;
                            text-align: left;
                            max-width: 100%;
                        }

                        span{
                            color: #004FFF;
                            font-size: 22px;
                            font-weight: bold;

                            &:last-child{
                                color: #004FFF;
                                font-size: 14px;
                                font-weight: 50
                            }
                        } 
                    }

                    /** Números **/
                    .numbers{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: -3px;
                    }

                    /** Stock **/
                    .stock{
                        hr {
                            height: 4px;
                            background-color: #004FFF;
                            width: 100%;
                            border: none;
                            margin: 9px 0 10px 0;
                            opacity: 1;
                        }

                        span{
                            color: #004FFF;
                            font-size: 12px;
                        }
                    }

                    
                    /** Pagamento **/
                    .payment{
                        flex-direction: column;
                        margin-top: 7px;
                        width: auto;

                        h2{
                            font-size: 15px;
                            color: #87868F;
                            font-weight: bold;
                            margin: 0;
                            padding: 0;
                            font-family: 'Quicksand',sans-serif;
                        }

                        h3{
                            font-size: 18px;
                            color: #87868F;
                            margin: 0;
                            padding: 0;
                            font-family: 'Quicksand',sans-serif;
                            font-weight: 100;
                            display: flex;
                            align-items: center;

                            img{
                                margin-right: 8px;
                            }
                        }

                        button{
                            background-color: transparent;
                            border: 1px solid #FF5666;
                            color: #FF5666;
                            font-size: 11px;
                            border-radius: 26px;
                            width: auto;
                            height: 22px;
                            margin-top: 8px;
                            padding: 0 12px 0 12px;
                            cursor: pointer;
                        }

                        select {
                            width: 100%;
                            height: 32px;
                            border-radius: 26px;
                            border: 1px solid #403F4C;
                            padding-left: 10px;
                            margin-bottom: 15px;
                            color: #403F4C;
                            margin-right: 10px;
                            opacity: 0.4;
                        }
                    }


                    /** Valores **/
                    .value {
                        margin-top: 8px;

                        h2{
                            font-size: 15px;
                            color: #87868F;
                            font-weight: bold;
                            margin: 0;
                            padding: 0;
                        }

                        h3{
                            font-size: 18px;
                            color: #403F4C;
                            font-weight: normal;
                            margin-top: 4px;
                            margin: 0;
                            padding: 0;
                            max-width: 100%;
                            text-align: left;
                        }

                        button{
                            background-color: #fff;
                            border: 1px solid #787780;
                            color: #403F4C;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 94px;
                            height: 22px;
                            margin-top: 8px;
                            cursor: pointer;
                        }

                    }

                    &:nth-child(2) {
                        flex-direction: column;
                    }

                    &:last-child button{
                    
                        background-color: #fff;
                        border: 1px solid #B2B2B7;
                        color: #787881;
                        font-size: 11px;
                        border-radius: 26px;
                        width: auto;
                        height: 22px;
                        margin-top: 5px;
                        cursor: pointer;
                        font-family: 'Quicksand', sans-serif;
                        padding: 0 7px 0 7px;

                        .fa{
                            margin-left: 7px;
                        }
                    }

                    .buttons{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 25px;
                        padding: 0 15px 0 15px;
                        cursor: pointer;

                        button{
                            background-color: transparent;
                            border: 1px solid #787780;
                            color: #403F4C;
                            font-weight: bold;
                            font-size: 11px;
                            border-radius: 26px;
                            width: 71px;
                            height: 38px;
                            margin-top: 8px;
                            cursor: pointer;

                            &:last-child{
                                background-color: #004FFF;
                                border: none;
                                color: #fff;
                                font-weight: bold;
                                font-size: 11px;
                                border-radius: 26px;
                                width: 81px;
                                height: 38px;
                                margin-top: 5px;
                                cursor: pointer;
                            }
                        }

                        .cancel{
                            button{
                                background-color: transparent;
                                border: 1px solid #FF5666;
                                color: #FF5666;
                                font-size: 11px;
                                border-radius: 26px;
                                width: 104px;
                                height: 22px;
                                margin-top: 5px;
                                cursor: pointer;
                            }
                        }
                    }

                }

                .planCancel{
                    background-color: #FF5666;
                    color: #fff;
                    padding: 4px 10px 0 10px;
                    height: 23px;
                    margin-top: 32px;
                    font-size: 15px;
                    font-weight: bold;
                    font-family: 'Quicksand', sans-serif;
                }
            }
        }

        /** box Big **/
        .boxBig {
            width: 100%;
            padding: 10px 20px 0 0;
            margin: 0 auto;

            
            .itemBox {
                display: flex;
                justify-content: space-between;
                width: 100%;
                flex-wrap: wrap;
                flex-direction: row;
                margin: 16px 0 27px 0;

                &:first-child {
                    border-bottom: 1px solid #87868F;
                }

                
                h5{
                    padding: 0;
                    margin: 0;
                    font-weight: bold;
                    color: #87868F;
                }

                span{
                    color: #004FFF;
                }

                .levelTop {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                    width: 100%;
                    max-width: 160px;

                    .levelTopLinguage {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;

                        .boxLanguage {
                            display: flex;
                            width: 100%;
                            justify-content: space-between;
                            flex-direction: column;

                            h5{
                                padding: 0;
                                margin: 0;
                                color: #87868F;
                            }

                            .language {
                                display: flex;
                                margin: 7px 0 13px 0;
                                align-items: center;

                                img {
                                    margin: 0 8px 0 0;
                                }

                                h5{
                                    font-size: 18px;
                                    color: #87868F;
                                    margin: 0;
                                    padding: 0;
                                    font-family: 'Quicksand',sans-serif;
                                    font-weight: 100;
                                }
                            }
                        }
                    }

                    .columLevel {
                        justify-content: flex-end;
                        display: flex;
                        width: 100%;

                        h5 {
                            text-align: right;
                            padding: 0;
                            margin: 0;
                            color: #87868F;
                        }
                    }
                    
                }

                .grades {
                    display: flex;
                    flex-direction: row;
                    margin: 0 0 0 -52px;

                    h6 {
                        margin: 19px 10px 0 0;
                        color: #87868F;
                        font-size: 15px;
                        font-family: 'Quicksand', sans-serif;
                        font-weight: bold;
                    }

                    h5{
                        padding: 0;
                        margin: 0;
                        color: #87868F;
                        font-size: 14px;
                        font-family: 'Quicksand', sans-serif;
                        font-weight: normal;
                        font-weight: bold;

                        span {
                            color: #004FFF;
                            font-weight: bold;
                        }
                    }
                }
            }
        }

        /** Notifications **/
        .infoNotification {
            width: 100%;

            h2 {
                color: #403F4C;
                font-size: 18px;
                margin: 40px 0 0 52px;
                font-weight: 100;
                font-family: 'Quicksand', sans-serif;
            }
            
            ul {
                margin: 40px 0 0 57px;
                display: flex;
                width: 88%;
                flex-direction: column;

            li {
                    display: flex;
                    align-items: center;
                    padding: 0;
                    margin: 0;
                    height: 50px;

                    span {
                        width: 175px;
                        /* //margin: -23px 25px 0 0; */
                        color: #403F4C;
                        /* //font-weight: bold; */
                        font-size: 16px;
                        font-family: 'Quicksand', sans-serif;
                    }

                }            
            }
        }

        /** Manage Available Hours **/
        .topManage {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            margin: 15px 25px 0 0;
            align-items: center;

            h2 {
                font-size: 18px;
                color: #403F4C;
                font-weight: normal;
            }

            button {
                background-color: #004FFF;
                border: none;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
                border-radius: 26px;
                width: auto;
                height: 38px;
                margin-top: 5px;
                padding: 12px;
                cursor: pointer;
                font-family: 'Work Sans', sans-serif;
            }
        }

        .manage {
            display: flex;
            width: 100%;
            justify-content: start;
            flex-direction: column;

            .day {
                display: flex;
                align-items: center;
                flex-direction: row;
                margin: 10px 0 10px 0;
            }

            h2 {
                font-size: 14px;
                color: #004FFF;
                font-weight: 500;
                font-family: 'Work Sans', sans-serif;
            }

            p{
                color: #C5C5C5
            }

            button {
                background-color: #004FFF;
                border: none;
                color: #fff;
                font-size: 11px;
                font-weight: bold;
                border-radius: 26px;
                width: 44px;
                height: 22px;
                margin: 5px 0 0 16px;
                cursor: pointer;
            }

            ul {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                list-style: none;
                padding: 0;

                .configDay {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: row;
                    margin: 0 30px 0 0;
                }

                li {
                    font-size: 14px;
                    color: #403F4C;
                    padding: 0 5px 0 0;

                span {
                        color: red;
                        font-size: 12px;
                    }
                    
                    button {
                        background-color: white;
                        width: 55px;
                        cursor: pointer;
                        color: red;
                        font-size: 12px;
                        margin: 0;
                        font-family: 'Quicksand', sans-serif;
                        font-weight: 500;
                    }

                }
            }

        }

        /** Edit **/
        .selectDays{
            margin: 35px 0 0 28px;
            
            h2 {
                color: #403F4C;
                font-size: 28px;
                margin: 0;
                font-family: 'Quicksand',sans-serif;
                font-weight: 100;
            }

            h3 {
                color: #403F4C;
                font-size: 12px;
                margin: 0;
                max-width: 72%;
            }

            h4 {
                color: #403F4C;
                font-size: 14px;
                margin: 25px 0 0 0;
            }

            ul {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                justify-content: start;
                list-style: none;
                padding: 0;

                li {
                    margin: 0 10px 0 0;
                    padding: 5px 0 0 0;

                    span{
                        font-size: 12px;
                        color: #403F4C;
                        margin-top: 5px;
                        font-family: 'Quicksand', sans-serif;
                    }

                    button {
                        background-color: #fff;
                        border: 1px solid #B2B2B7;
                        color: #B2B2B7;
                        font-size: 14px;
                        border-radius: 26px;
                        width: 76px;
                        height: 28px;
                        margin-top: 0;
                        cursor: pointer;                   
                    }

                    button.active {
                        background-color: #004FFF;
                        color: #fff;
                        border: #004FFF;
                    }
                }
            }

            .time{
                ul {
                    list-style: none;
                    margin-left: 24px;

                    li {
                        display: flex;
                        flex-direction: column;
                    }
                }

                select {
                    background-color: #004FFF;
                    color: #fff;
                    border-radius: 26px;
                    border: 0;
                    width: 114px;
                    height: 28px;
                    padding-left: 10px;
                    font-family: 'Work Sans', sans-serif;
                    font-size: 14px;
                    margin-top: 5px;
                }
            }

            .addSlot{
                button {
                    background-color: #fff;
                    border: 1px solid #B2B2B7;
                    color: #B2B2B7;
                    font-size: 14px;
                    border-radius: 26px;
                    width: 100%;
                    height: 28px;
                    margin: 20px 0 36px 24px;
                    cursor: pointer;
                    font-family: 'Work Sans',sans-serif;
                    font-weight: 500;
                    padding: 0 10px 0 10px;
                }
            }

            .buttons {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
                margin: 25px;
                padding: 0 15px 0 15px;
                cursor: pointer;
                font-family: 'Quicksand', sans-serif;

                button {
                    background-color: transparent;
                    border: 1px solid #787780;
                    color: #403F4C;
                    font-weight: bold;
                    font-size: 11px;
                    border-radius: 26px;
                    width: auto;
                    height: 28px;
                    margin-top: 9px;
                    cursor: pointer;

                    .fa{
                        margin-right: 5px;
                    }

                    &:last-child {
                        background-color: #004FFF;
                        border: none;
                        color: #fff;
                        font-weight: bold;
                        font-size: 11px;
                        border-radius: 26px;
                        width: 81px;
                        height: 38px;
                        margin-left: 15px;
                        margin-top: 5px;
                        cursor: pointer;
                    }
                }
            }
        }   
                    
        .pagamento{
            display: flex;
        }

        .inputManage{
            border-color: #B2B2B7 !important;
        }
                
    }

    @media (max-width: 1024px) {
                .tabs{
                    margin-top: 30px;
                    .tab-list{
                        border-bottom: 1px solid #ccc;
                        padding-left: 0;
                        margin: 40px 0 0 0;

                        .tabsContent {
                            margin: 0 auto;
                            width: 100%;
                            max-width: 100%;
                            display: flex;

                            .tab-list-item {
                                font-size: 14px;
                                text-align: center;
                                padding: 0;
                            }
                        }
                    }
                
                .box {
                    height: 100%;
                    flex-direction: column;
                    padding: 0;
                    margin: 40px auto;
                    padding: 15px;
                }
                

                .changePhoto {
                    padding-top: 20px;
                    justify-content: center;
                    width: 100%;
                    margin: 0;
                }

                .formulario {
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    width: 90%;
                    margin: 20px auto;

                    input {

                        &:nth-child(1){
                            width: 100% !important;
                        }

                        width: auto;

                        &:nth-child(2){
                            width: 100% !important;
                            float: left;
                            max-width: 97%;
                        }
                    }

                    .lineInputs{
                        margin-right: 0 !important;
                        height: 100%;
                        max-height: 70px;
                    }

                    .inputs{
                        display: flex;
                        flex-direction: column;
                        width: 100%; 
                    }

                    button.delete {
                        margin: 25px 0 0 0;

                    }

                    .telephone{
                        input {
                            width: 90%;
                            margin: 0 10px 0 0;
                        }

                        button.addInput {
                            text-indent: -9000px;
                            width: 25px;
                            height: 25px;
                            margin-top: 25px;
                            font-family: 'Work Sans', sans-serif;
                        }
                    }

    

                    input.inputMobile{
                        width: 66% !important;
                    }

                    select.inputMobile{
                        width: 55%;
                    }

                    .telefone{
                        input.inputMobile{
                            width: 85% !important;
                        }

                        select.inputMobile{
                            width: 85% !important;
                            margin-right: 60px;
                        }
                    }

                    .notification {
                        flex-direction: row;
                        align-items: center;

                        .switch__container {
                            margin: 0 0 15px 4px;
                        }

                        span.delete {
                            margin: 6px 0 0 20px;
                            border-radius: 50px;
                            border: 1px solid red;
                            width: 25px;
                            height: 25px;
                            text-indent: -9000px;
                        }
                    }

                    .switchBox{
                        display: flex;
                    }

                    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                        padding-left: 10px;
                    }

                    select {
                        width: 100%;
                    }

                    .selects {
                        flex-direction: column;
                        width: 100%;
                    }

                    .telephone {
                        flex-direction: row;
                        width: 100%;
                        margin-bottom: 15px;

                        select{
                            width: 95%;
                            margin: 0 20px 0 0;
                        }

                        span.delete {
                            margin: 20px 0 0 0;
                            border-radius: 50px;
                            border: 1px solid red;
                            width: 25px;
                            height: 25px;
                            text-indent: -9000px;
                        }
                        
                    }

                    .lineSelect {
                        margin: 0 5px 0 0;
                        width: 100%;

                        p {
                            font-size: 11px;
                            margin: -9px 0 12px 0;
                        }

                        button.addInput {
                            text-indent: -9000px;
                            width: 25px;
                            height: 25px;
                            margin-top: 25px;
                            font-family: 'Work Sans', sans-serif;
                        }

                    }

                    .buttonSave {
                        display: flex;
                        justify-content: center;
                        margin: 0;
                    }

                    button.addInput {
                        margin: 0 0 0 18px;
                        width: auto !important;
                        padding: 5px 5px 5px 5px;
                    }

                }

                .buttonSave {
                    justify-content: center;
                }

                .plans {
                    /* width: 96%;
                    margin-left: 0;
                    margin-bottom: 58px;
                    margin: 15px auto; */
                }

                .PlansBox{
                    flex-wrap: wrap;
                    
                    .plans{
                        margin: 15px !important;
                    }
                    .changePlan {
                        flex-direction: row !important;
                        width: 100%;
                        flex-wrap: wrap;
                        justify-content: space-between;

                        h2{
                            margin-bottom: 5px;
                        }

                        button{
                            margin: 0 13px 0 22px;

                            &:last-child{
                                margin-left: 0;
                            }
                        }
                    }
                    .plans:nth-child(2) {
                        margin-top: 0;
                    }

                    .stock{
                        hr {
                            margin: 2px 0 5px 0 !important;
                        }
                    }

                }

                .controlPlan{
                    .infos {
                        margin: 8px 106px 0 0 !important;
                    }
                }

                .numbers {
                    margin-top: 8px;
                }

                /** Level **/
                .itemBox {
                    display: flex !important;
                    justify-content: space-between !important;
                    width:97% !important;
                    flex-wrap: wrap !important;
                    flex-direction: row !important;
                    padding-right: 15px;
                }
                
                .levelTop {
                    flex-direction: row !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    margin-bottom: 25px !important;

                    .levelTopLinguage{
                        padding-left: 15px;
                    }
                }

                .columLevel {
                    justify-content: end;
                }

                .grades {
                    margin: -17px 0 0 0px !important;
                    align-items: baseline;
                    flex-direction: column;
                    padding-left: 15px;

                    h6 {
                        margin: 13px 10px 6px 0;
                    }

                
                }

                .columLevel {
                    justify-content: end !important;

                    h5 {
                        text-align: left !important;
                    }
                }
        

                .infoNotification{
                    h2 {
                        margin: 14px 0 0 18px;
                    }

                    ul {
                        margin: 10px 0 0 17px;
                    }
                }

                .manage{
                    padding: 15px;

                    h2{
                        margin: 0;
                    }

                    ul{
                        flex-direction: column;

                        .configDay {
                            flex-direction: row;
                            width: 93%;
                            margin: 0 0 10px 0;
                        }
                    }

                    
                }

                .topManage {
                    flex-direction: column;
                    padding: 15px;

                    button{
                        margin-bottom: 25px;
                    }
                }


        }
        div.jsx-4179805763 {
            width: 100%;
        }
    }

    @media (min-width: 1027px) and  (max-width: 1600px){
        .plans {
            margin: 20px 17px 0  12px !important;
        }
    }


`;



export const Billing = styled.div`

    .box {
        width: 88%;
        height: 55px;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        padding: 15px 10px 20px 10px;
        margin: 20px auto;
        justify-content: space-between;
        align-items: center;

        .topBox {
            display: flex;
            align-items: center;

            h2 {
                margin-left: 15px;
                font-size: 20px;
                font-weight: bold;
            }
        }

        .titleBox{
            h2 {
                color: #004FFF;
                font-size: 16px;
                font-weight: bold;
                margin: 5px 15px 5px 60px;
            }
        }

        .boxInfo {
            display: flex;
            width: 100%;
            justify-content: space-between;
            padding: 0 20px 0 10px;
            flex-wrap: wrap;

            .infoBilling {
                flex-direction: column;

                h2 {
                    font-size: 13px;
                    color: #403F4C;
                    font-weight: bold;
                    margin: 0;
                    padding: 0
                }

                h3 {
                    font-size: 13px;
                    color: #403F4C;
                    font-weight: normal;
                    margin: 0;
                    padding: 0;
                    text-align: left;
                    max-width:initial;
                }
                
                span {
                    color: #00D36A;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    min-width: 55px;
                }           
                
            }
            
            .word-wrap-break {
                word-break: break-all;
                width: 25%;
            }
        }

    }

    .buttons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin: 25px 35px 25px 0;
        padding: 0 15px 0 15px;
        cursor: pointer;

        button {
            background-color: transparent;
            border: 1px solid #787780;
            color: #403F4C;
            font-weight: bold;
            font-size: 11px;
            border-radius: 26px;
            width: 71px;
            height: 28px;
            margin-top: 8px;
            margin-right: 10px;
            cursor: pointer;
        }

            .fa{
                margin-right: 7px;
            }
        }
    }
}

/** Media Queries **/
@media (max-width: 1024px) {
    
    .box {
        width: 90%;
        height: 100%;
        background-color: #fff;
        margin-top: 25px;
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        padding: 20px 0 15px 10px;
        margin: 20px auto;
        justify-content: space-between;
        align-items: center;
    }

    .infoBilling {
        flex-direction: column;
        margin: 0 15px 15px 0;
    }

    .rowBilling {
        flex-direction: column;
        display: flex;
        width: 100%;;
    }


}

`;


export const Form = styled.div`
    width: 100%;

    /* icons */
    .icons {
        padding-top: 40px;
        padding-bottom: 35px;
        margin: 0 auto;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #C5C3C9;
        font-weight: bold;

        &.active{
            color: var(--color-blue);
        }
        span{
            display: flex;
            width: 500px;
        }
        hr{
            border-top: 1px solid #C5C3C9;
            width: 40%;
            margin: 0;
            padding: 0;
            justify-content: end;
            display: flex;
            margin-top: 50px;

        }

        .icons-inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            svg{
                margin-bottom: 12px;
                
            }
        }

        .icons-inner-active {
            color: var(--color-blue);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            /* svg{
                height: 25px;
                width: 18px;
                margin-bottom: 10px;
            } */
        }
    }


    .singIn{
        margin-top: 25px;
        border-right: 1px solid #E4E8EE;
        width: 94%;
        margin-left: 6%;

        form{

            label{
                font-size: 14px;
                color: #403F4C;
                font-weight: 500;
            }

            span{
                font-size: 10px;
                color: #97979E;
                margin-bottom: 3px;
                margin-left: 6px;
            }

            input{
                width: 90%;
                height: 29px;
                border-radius: 26px;
                border: 1px solid #403F4C;
                padding-left: 10px;
                margin-bottom: 15px;
                padding-top: 4px;
                opacity: 0.4;
            }

            select{
                width: 90%;
                height: 34px;
                border-radius: 26px;    
                border: 1px solid #403F4C;
                padding-left: 10px;
                margin-bottom: 15px;
                color: #403F4C;
                opacity: 0.4;
            }

            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                margin-top: 10px;
                color: #403F4C;
            }

      
        }

        .footerSingIn {
            position: relative;
            font-weight: 200;
            width: 100%;
            display: flex;
            flex-direction: row;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 20px;

            hr {
                width: inherit;
                margin: 0;
                height: 1px;
            }

            div {
                width: 100%;
                position: absolute;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-pack: center;
                justify-content: center;
                -ms-flex-align: center;
                align-items: center;
            }

            .or-login-css {
                display: -ms-flexbox;
                display: flex;
                width: auto;
                padding-left: 10px;
                padding-right: 10px;
                padding-bottom: 5px;
                background-color: white;
                font-size: 12px;
            }

            .password{
                display: flex;
                height: 100%;
                width: 86%;
                align-items: center;
                justify-content: space-between;

                .forgot{
                    a{
                        color: #403F4C;
                        font-size: 12px;
                        text-decoration: underline;
                    }
                }
            }


        }

        .form-footer {
            height: 30px;
            width: 95%;            
        }

        .form-footer_social-login{
            display: flex;
            justify-content: center;
            margin: 20px;

            img{
                width: 32px;
                height: 32px;
                margin: 0 30px 0 0;
            }
        }

        .switch__container{
            justify-content: center;
            text-align: center;
        }

        .switch--shadow + label {
            width: 32%;
        }
        
    }

    /* Verificar */
    .singIn{
        .account{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 35px;

            p{
                font-size: 14px;
            }

            a{
                color: #004FFF;
                font-weight: bold;
            }
        }
    } 

    
    /** Text Prices **/
    .boxChangePlans{
        width: 100%;

        .textPrices{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 40px 0 10px 0;


            h2{
                color: #403F4C;
                font-size: 22px;
            }

            h3{
                color: #403F4C;
                font-size: 12px;
                margin: 0 0 12px 0;
            }

            .languageBoxes {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;

                .languageBox{
                    min-width: 121px;
                    max-width: 121px;
                    display: flex;
                    margin: 0 20px 0 20px;
                    padding: 8px 5px 8px 5px;
                    border: solid 1px #706F79;
                    border-radius: 6px;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
            }
        }

        .buttonBack{
            display: flex;
            width: 95%;
            justify-content: flex-end;
            align-items: center;
            margin: 26px 0 20px 0;

            button{
                background-color: transparent;
                border: 1px solid #787780;
                border-radius: 26px;
                width: 71px;
                height: 32px;
                cursor: pointer;
            }

            img{
                margin: 0 0 0 25px;
            }

        }       

    }


    /** Change Plan **/
    .boxChange{
        background-color: #fff;
        width: 100%;
        height: 130px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        justify-content: space-between;

        .changePlan{
            display: flex;
            align-items: center;
            flex-direction: column;
            /* padding: 23px; */
            margin:0 23px 0 13px;

            h2{
                color: #39ADFE;
                font-size: 18px;
                text-align: center;
                font-family: 'Work Sans',sans-serif;
                font-weight: bold;
                margin-top: 10px;
                width: 100%;
                max-width: 133px;
            }

            h3{
                color: #004FFF;
                font-size: 12px;
                font-weight: bold;
                margin: 4px 0 0 0;
                max-width: 100%;
                font-family: 'Work Sans', sans-serif;
            }

            h4{
                color: #403F4C;
                font-size: 16px;
                font-weight: normal;
                text-decoration: line-through;
                margin: 0;
                opacity: 0.5;
                font-family: 'Work Sans', sans-serif;
            }

            h5{
                color: #004FFF;
                font-size: 24px;
                font-weight: bold;
                margin: 0;
            }

            h6{
                color: #6D6A75;
                font-size: 14px;
                font-weight: normal;
                margin: 0;
                font-family: 'Work Sans', sans-serif;
            }

            p{
                color: #6D6A75;
                font-size: 14px;
                font-family: 'Work Sans', sans-serif;
                opacity: 85
            }

            button{
                background-color: #004FFF;
                color: #fff;
                width: 80px;
                height: 40px;
                border-radius: 20px;
                border: none;
                font-weight: bold;
                font-family: 'Work Sans', sans-serif;
                cursor: pointer;
            }
        }

        .off{
            width: auto;
            height: 18px;
            background-color: #004FFF;
            border-radius: 4px;
            color: #fff;
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            font-family: 'Work Sans', sans-serif;
            display: flex;
            align-items: center;
            padding: 0 6px 0 6px;
        }

    }


    /** Review **/
    .boxBig{
        background-color: transparent;
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: row;
        border-radius: 4px;
        margin-bottom: 50px;
        padding-top: 10px;
        margin: 0 auto;      
       

        hr{
            height: 1px;
            width: 100%;
            margin: 45px 0 45px 0;
        }

        .box{
            width: 100%;
            height: 100%;
            padding: 20px 20px 0 30px;
        }

        .buttonBack{
            display: flex;
            width: 95%;
            justify-content: flex-end;
            align-items: center;
            margin: 26px 0 20px 0;

            button{
                background-color: transparent;
                border: 1px solid #787780;
                border-radius: 26px;
                width: 71px;
                height: 32px;
                cursor: pointer;
            }

            img{
                margin: 0 0 0 25px;
            }

        }


        /** change **/
        .change{
            display: flex;
            align-items: center;
            margin-top: 25px;

            h2{
                font-size: 22px;
                color: #403F4C;
                font-weight: bold;
            }

            i{
                font-size: 12px;
                color: #97979E;
                margin: 3px 0 0 8px;

                img{
                    margin: 0 0 0 2px;
                }
            }
        }


        .infos{

            h3{
                font-size: 14px;
                color: #403F4C;
                font-weight: normal;
            }

            h4{
                font-size: 20px;
                color: #403F4C;
                margin: 5px 0 10px 0;
            }

            p{
                font-size: 14px;
                color: #6D6A75;
                font-weight: normal;
                margin: 9px 8px 0 0;
            }
        }

        .reviewPlan{
            display: flex;
            flex-direction: column;
            max-width: 100%;
        }

        .textPlanTop{
            display: flex;
            flex-direction: row;
            width: 100%;
            margin-bottom: 25px;

            img{
                margin: 20px 10px 0 0;
            }

            h4{
                color: #39ADFE;
                padding-top: 0;
                margin: 18px 0 0;

            }

        }

        .textPlan{
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
        }

        .infoPlan{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            width: 100%;  
            margin: 0 0 10px 0;

            h5{
                margin: 5px 0 10px 0;
                color: #97979E;
            }

            select {
                width: 150px;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #403F4C;
                padding-left: 10px;
                margin-bottom: 15px;
                color: #403F4C;
                margin-right: 10px;
                opacity: 0.4;
            }

            .language{
                display: flex;
                margin: 0 10px 0 0;

                h5{
                    margin: 0 0 0 6px;
                    text-align: left;
                    color: #403F4C;
                    font-size: 14px;
                }

                .input-lingo{
                    height: 32px;
                }
            }

            .textBottom{
                display: flex;
                width: 100%;
            }
            
            
        }

        .textBottom{
            display: flex;
            justify-content: flex-end;

            select {
                width: auto;
                height: 32px;
                border-radius: 26px;
                border: 1px solid #403F4C;
                padding-left: 10px;
                margin-bottom: 15px;
                color: #403F4C;
                margin-right: 10px;
                opacity: 0.4;
            }
        }

        .textPay{
            display: flex;
            justify-content: flex-end;
            width: 98%;
            text-align: right;
            margin: 20px 0 30px 0;

            .total{
                
                h5{
                    font-size: 15px;
                    color: #403F4C;
                    font-weight: bold;
                    opacity: 0.4;
                    margin: 65px 0 0 0;
                }
            }

            .price{
                h5{
                    font-size: 28px;
                    color: #004FFF;
                    font-weight: bold;
                    margin: 0;
                }

                span{
                    font-size: 14px;
                    color: #6D6A75;
                }
            }

            .dollar{
                span{
                    font-size: 12px;
                    color: #6D6A75;
                }
            }

        }
    }

    
    .review{
        .box{
            &:first-child {
                display:none;
            }   

            &:nth-child(2) {
                display: table;
	            width: 100%;
            }

        }
    }

    /** Confirmation **/
    .confirmation{
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 40px;

        h2{
            color: #00D36A;
            font-size: 22px;
            font-weight: bold;
            text-align: center;
        }

        img{
            margin: 25px auto;
            display: flex;
        }

        p{
            display: flex;
            font-size: 16px;
            color: #403F4C;
            text-align: center;
            margin-bottom: 50px;
        }

    }

    

    /** Media Queries **/
    @media (max-width: 1024px) {

        /** icons **/
        .icons {
            width: 100%;
            
            .icons-inner, .icons-inner-active{
                font-size: 12px;
            }
        }

        /** Form **/
        .singIn{
            border-right: none;


            .switch--shadow + label {
                width: 32%;
            }

            form{
                input {
                    width: 97%;
                }
                select {
                    width: 100%;
                }
            }
        }


        /** Text Prices **/
        .textPrices {
            display: flex;
            justify-content: left;
            align-items: flex-start;
            flex-direction: column;
            margin: 15px 0 20px 22px;
        }

        .textPay{
            .total{
                h5 {
                    margin: 0 0 0 0 !important;
                }
            }
        }

        /** box Change **/
        .boxChange {
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .changePlan {
            padding: 10px !important;

            p {
                text-align: center;
                font-size: 11px !important;
            }
        }

        /** box Review **/
        .boxBig {
            background-color: #fff;
            width: 97%;
            height: 100%;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            padding: 0 0 0 0;
        }

        .boxBig{
            .box {
                width: 90%;
                height: 100%;
                padding: 0 0 0 0;
                margin: 0 auto
            }

            hr {
                height: 1px;
                width: 100%;
                margin: 38px 0 0 0;
            }
        }

        .infos{
            p {
                font-size: 10px;
                color: #6D6A75;
                font-weight: normal;
            }
        }

        .buttonBack {
            justify-content: center;
            align-items: center;
            margin: 26px 0 20px 0;
            flex-direction: column-reverse;

            img {
                margin: 0 0 20px 0;
            }
        }


        /** Confirmation **/
        .confirmation{
            p {
                display: flex;
                font-size: 13px;
                color: #403F4C;
                text-align: center;
            }
        }

    }

    /* classe retirar depois */
    .fix-big{
        width: 90% !important;
        margin: 0 auto;
        padding-top: 10px;
    }

`;


export const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 0;

    .footer-btns{
        display: flex;
        justify-content: space-between;
        width: 100%;

        .button{
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            width: 200px;
            height: 38px;
            border-radius: 26px;
            background-color: #004FFF;
            border:  none;
            cursor: pointer;
            margin-top: 50px;
        }

        a{
            color: #FF5666;
            font-size: 12px;
            font-weight: 500;
            margin-right: 10px;
            text-decoration: none;
        }

        .save{
                button{
                    color: #787780;
                    font-size: 14px;
                    font-weight: bold;
                    width: 71px;
                    height: 32px;
                    border-radius: 26px;
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    border: 1px solid #787780;
                    margin-top: 4px;
            }
        }
    }

    .buttonBack{
        display: flex;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        margin: 33px 0 20px 0;

        button{
            background-color: transparent;
            color: #787780;
            border: 1px solid #787780;
            border-radius: 26px;
            width: 71px;
            height: 32px;
            cursor: pointer;
        }

        img{
            margin: 0 0 0 25px;
        }

    }

`;

import styled from 'styled-components';

export const b2b = styled.div`
    
`;


export const Tab = styled.div`
    /* width: 100%;
    max-width: 92%;
    border: 1px solid red; */

    /* .bigBox{
        width: auto;
    }    */

    h3{
        color: #004FFF;
        font-size: 24px;
        font-weight: 500;
        font-family: 'Quicksand', sans-serif;
        margin: 33px 0 0 100px;
    }

    .delete {
        color: red;
        margin: 10px 0 46px 10px;
        font-size: 12px;
        font-weight: bold;
        border: none;
        text-align: left;
        background-color: transparent;
        cursor: pointer;
    }

    .contratcs{

        .tab-list{
            background-color: #fff;
            margin-top: 10px;
            height: 48px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

        .tab-content {
            margin-bottom: 0 !important;
            margin-top: 25px;
        }

        .tabsContent {
            text-align: left !important;
            padding-left: 100px !important;
        }

        h5{
            margin: 40px 0 0 100px;
            color: #707070;
            font-size: 24px;
            font-weight: 500;
            font-family: 'Quicksand', sans-serif;
        }

        
        p{
            margin: 40px 0 0 100px;
            color: #403F4C;
            font-size: 14px;
            font-weight: 500;
            font-family: 'Quicksand', sans-serif;
        }

        form{
            margin: 20px 0 15px 100px;

            .fileUpload {
                position: relative;
                overflow: hidden;
                border-radius: 26px;
                border: 1px solid #787780;
                width: 86px;
                height: 32px;
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
                    margin: 0;
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
        }

        span{
            margin: 15px 0 0 100px;
            font-size: 14px;
            font-family: 'Quicksand', sans-serif;
        }

        .results{
            display: flex;
            align-items: center;
            margin-top: 56px;
            width: 100%;
            padding: 13px 13px 0 13px;

            h5{
                margin: 0 25px 0 100px;
                color: #00D36A;
                font-size: 20px;
                font-weight: bold;
                font-family: 'Quicksand', sans-serif;            
            }

            button {
                background-color: transparent;
                border: 1px solid #B2B2B7;
                border-radius: 26px;
                color: #87868F;
                font-size: 11px;
                width: 58px;
                height: 22px;
                float: right;
                cursor: pointer;
            }
            
        }

        h6{
            margin: 24px 0 0 100px;
            color: #FF5666;
            font-size: 20px;
            font-weight: bold;
            font-family: 'Quicksand', sans-serif;            
        }

        .boxError{
            height: auto;
            border: 2px solid #D8D8DA;
            border-right: none;
            border-top: none;
            border-bottom: none;
            margin: 18px 0 51px 100px;
            padding: 0 0 0 26px;

            ul{
                font-weight: bold;
                margin-bottom: 16px;

                li {
                    line-height: 22px;
                    font-size: 14px;
                    color: #403F4C;

                    ul{
                        list-style: none;
                        margin: 10px 0 0 10px;
                        border: none;

                        li{
                            font-weight: normal;
                        }
                    }

                    
                }
            }
        }

        

        
        
    } 

    .buttons{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            margin: 25px;
            padding: 0 15px 0 15px;
            cursor: pointer;
            width: 95%;

            button{
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
                font-family: 'Quicksand', sans-serif;

                &:first-child{
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
                    font-size: 15px;
                    margin-right: 3px;
                }
                
            }
    }

    /** Tabs **/
    .tabs{
        width: 100%;

        .tab-content{
            margin-bottom: 36px;
 
    }   
    
    
    
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

            .disabled {
                color: silver;
                pointer-events: none;
            }
                                
        }

        
    } 

    
}


`;

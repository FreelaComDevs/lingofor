import styled from 'styled-components';

export const Container = styled.div`
width: 100%;

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

        .containerPlan {
            width: 292px;
        }

        
        .itensBox{
            h3{
                font-size: 22px;
                font-weight: normal;
                color: #555D67;
                margin: 0;
            }

            b {
                margin-left: 5px
            }

            span{
                font-size: 22px;
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

        .dflex {
            display: flex;
        }

        .mt {
            margin-top: 25px;
        }

        .automaticallyRenews {
            color: #5778FB;
            font-weight: normal;
            font-size: 15px;
        }

        .containerExtra {
            text-alignt: right;
        }

        @media (max-width: 767px) {
            .containerExtra {
                margin-left: 30px;
            }

        }
        
        .extraClasses {
            color: #004EFD;
            font-weight: normal;
            font-size: 22px;
            margin-left -25px;
        }

        .extraNumber {
            color: #004EFD;
            font-size: 20px;
            font-weight: bold;   
            margin-left: 10px;
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
}`;
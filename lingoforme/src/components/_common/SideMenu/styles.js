import styled from 'styled-components';

export const Nav = styled.div`
    /* width: 220px;
    height: 100%; */
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 17px;

   .logo{
        display: flex;
        width: 100%;
        margin-left: 42px;
    }

   ul{
        list-style: none;
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;
        /* height: 100%; */
        padding: 0;

        
        li.myAccount{
            margin-bottom: 45px;
        }

        li.logoutMenu{
            margin: 48px 0;
        }

        li{
            width: 100%;
            height: 38px;
            display: flex;
            align-items: center;
            padding-top: 0;

            button{
                background-color: transparent;
                border: none;
                height: 38px;
                border-top: 0;
                border-right: 0;
                border-bottom: 0;
                cursor: pointer;
                display: flex;
                align-items: center;
            }

            a{
                color: #403F4C;
                font-size: 14px;
                text-decoration: none;
                cursor: pointer;
            }   
            
            
            img:first-child{
                padding: 0 13px 0 16px;
            }

            img{
                padding: 0 13px 0 12px;
                width: 16px;
                height: 16px;
            }

            /* &:first-child{
                margin: 5px 0 0 0;
            } */

            &:last-child{
                /* margin: 74px 0 0 0; */
            }

            span{
                font-weight: 500;
                margin: 0 4px 0 5px;
            }

            svg {
                width: 19px;
                height: 19px;
                margin-left: 14px;
                margin-right: 15px;
            }

            .side-menu-item:focus {
                border-left-width: 4px;
                border-left-color: var(--color-grey);
                border-left-style: solid;
                border-bottom: 0;
                border-top: 0;
                border-right: 0;
            }

            .side-menu-item:focus svg{
                margin-left: 10px;
            }
            
            .side-menu-selected {
                /* background-color: var(--color-blue); */
                height: 100%;
                width: 4px;
                border-bottom: 0;
                border-top: 0;
                border-right: 0;
            }
            
        }

        .active{
            border-left: 4px solid #004FFF;
        }

        .active > a{
            color:#004FFF;
            font-weight: 500; 
        }

        li.dropMenu{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;

            a{
                width: 100%;
            }

            ul{
                margin-left: 95px;

                li{
                    svg{
                       display: none;
                    }
                }
            }
        }

        /* .firstAccessMenu{
            ul{
                li{                   
                    span{
                        color: red;
                    }               
                }
            }
        } */
    }    

    .language{
        display: flex;
        width: 100%;
        margin-top: 28px;
        align-items: center;
        justify-content: center;
        background: transparent;

        h2{
            color: #707070;
            font-size: 14px;
            font-weight: normal;
            font-family: Work Sans;
            margin-right: 5px;
        }

        select{
            margin: 0 0 0 12px;
        }

        .MuiInput-underline-280:before{
            border-bottom: none !important;
        }
    }

    .share{
        width: 100%;
        margin: 40px 0 50px 40px;

        h2{
            color: #707070;
            font-size: 14px;
        }

        img{
            margin: 10px 10px 0 0;
        }
    }

    .share__social-icons {
        display: flex;
        height: 24px;
        margin: 0.75rem 0 1.5rem 0;
    }

    .share__social-icons img {
      width: 24px;
      padding: 0 0.25rem;
      
    }

    .MuiInput-input-14 {
        padding: 0 0 0;
    }

    .MuiSelect-select-2 img {
        margin: -5px 25px 0 10px;
    }

    .unReadNotification {
        position: relative;

        ::before {
          content: "";
          display: block;
          position: absolute;
          top: -2px;
          left: -2px;
          background-color: #FF5666;
          height: 8px;
          width: 8px;
          border-radius: 50%;
        }
    }

    @media (max-width: 1366px) {
        .share {
            margin: 22px 0 50px 30px;
        }
    }

    @media (max-width: 1024px) {
        /* width: 100vw;
        height: 100vh; */

        .logoMobile{
            a{
                img{
                    display: none;
                }
            }  
        }

        /* hr{

            &:first-child{
                display: none;
            }
            
        } */
    }
`
export const IconList = styled.li`
flex-direction: column;
gap: 5px;
list-style: none;

.icons{
    display: flex;
    justify-content: space-around;
    margin: 0 10px;    
    padding-top: 12px;
    width:200px;   
}
.icons-app{
    padding-top: 12px;
    gap: 4px;
    display: flex;
    justify-content: space-around;
}
.title{
    font-size: 14px;
    color : var(--color-black);
    font-weight: 500;    
    width:100%;    
    text-align: center;
};
.box-link-app{
    background-color: #f1f1f1;
    border: 1px solid #707070;
    width: 80%;
    padding: 8px;
    border-radius: 8px;
    margin: auto
}
.text{
    font-size: 14px;
    color : var(--color-black);
    text-align: center;
};
.icons-app > a > img{
    height: 30px;
    width: 90px;
    border-radius: 8px;   
};
.mt-52{
    margin-top: 52px;
}

@media (max-width: 1024px) {
align-items: start !important;

.title{
    margin-left: 12px;
}
}

`

import styled from 'styled-components';

export const CardScheduleAluno = styled.div`

.listScheduleCardH {
    background-color: #fff;
    padding: 15px;
    margin-top: 15px;
    border-radius: 4px;
    width: 97%;
  
    @media (min-width: 1025px) and (max-width: 1366px) {
      @media (min-width: 768px) {
        width: 100%;
        max-width: 96%;
        margin-left: 0;
      }
    }
  
  .infosAulas{
  display: flex;
  align-items: center;
  }

    .buttonSave{
        background-color: #004FFF;
        border: none;
        color: #fff;
        font-weight: bold;
        font-size: 11px;
        border-radius: 26px;
        width: auto;
        height: 22px;   
        padding: 4px 12px 4px 12px;   
        text-align: center;
        align-items: center;
        justify-content: center;
      }
  
      span.buttonSave{
        border: 1px solid #5A6C96;
        background-color: transparent;
        color: #5A6C96;
      }
  
      .buttonSave.pointer{
        cursor: pointer;
        display: flex;
      }
  
    .scheduleDateTime {
      margin: 0;
      margin-right: 10px;
      font-size: 15px;
      font-weight: normal;
      text-align: left;
      letter-spacing: 0px;
      color: #707070;
      opacity: 1;
    }
  
    .scheduleDetails {
      display: flex;
      margin-top: 10px;
  
      .scheduleDetailsInfo {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-right: 20px;
  
        @media screen {
          @media (min-width: 768px) {
            flex-direction: row;
          }
        }
      }
  
      h4 {
        font-size: 14px;
        color: #5a6c96;
        font-weight: 500;
        font-family: "Quicksand", sans-serif;
      }
  
      .scheduleLanguage {
        margin-right: 20px;
        min-width: 100px;
        margin-bottom: 5px;
  
        .scheduleLanguageName {
          position: relative;
          top: -4px;
        }
  
        img {
          width: 18px !important;
          height: 18px !important;
          margin-right: 5px;
          position: relative;
          top: 4px;
        }
      }
  
      .scheduleLanguageDetails {
        margin-right: 10px;
        margin-bottom: 5px;
        flex: 3;
  
        .typeClass {
          display: flex;
          width: 203px;
        }
  
        .typeText {
          color: #004EFD;
          font-weight: bold;
        }
  
        .scheduleLanguageContent {
          margin-bottom: 4px;
          color: #707070;
        }
  
        .scheduleLanguageFocus {
        }
      }
  
      .scheduleLanguagePeoples {
        margin-right: 20px;
        flex: 4;
  
        .scheduleLanguagePeople {
          margin-bottom: 4px;
        }
      }
  
      .scheduleActions {
        display: flex;
        flex-direction: column;
        align-items: center;
  
        > * {
          margin: 0;
          margin-bottom: 10px;
          min-height: 20px;
        }
  
        @media screen {
          @media (min-width: 1240px) {
            flex-direction: row;
            align-items: start;
            // width: 265px;
  
            > * {
              margin: 0;
              margin-left: 20px;
            }
  
            a {
              width: 58px;
            }
  
            .scheduleWithoutTeacher {
              width: 110px;
            }
  
            .scheduleConfirmed {
              width: 110px;
              text-align: center;
              margin: 0;
            }
  
            .scheduleCanceled {
              width: 100px;
            }
  
            .cancelSchedule {
              width: 100px;
            }
          }
        }
  
        .scheduleConfirmed {
          color: #00d36a;
  
          i {
            margin-left: 5px;
          }
        }
  
        .scheduleWithoutTeacher {
          color: #004fff;
        }
  
        .scheduleCanceled {
          color: #ff5666;
          width: auto;
        }
  
        .cancelSchedule {
          border: none;
          color: #ff5666;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background-color: #fff;
        }
  
        .viewSchedule {
          color: #004fff;
          font-size: 12px;
          border-radius: 26px;
          max-width: 238px;
          border: 1px solid #004fff;
          padding: 3px 10px 3px 10px;
          background-color: #fff;
          cursor: pointer;
        }
      }
    }
  }
`;


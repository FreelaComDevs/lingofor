import React, { Component } from "react";
import { translate } from "react-i18next";
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import cancelImg from "../../images/schedule/img_class-scheduled_cancel.png";
import moment from "moment";
import { FlagIcon } from "react-flag-kit";
import { SelectButtons } from './styles'

import Service from '../../components/_api/Services'
import timezone from 'moment-timezone'
import { ContactSupportOutlined } from "@material-ui/icons";

const serv = new Service()

class CancelDialog extends Component {
  state = {
    
    isRecurrent:false,
    message: {value: "", cancelledBy:"lingo", error: false },
    userRole: JSON.parse(localStorage.getItem('@lingo')).role
  }

  componentWillReceiveProps(nextProps){
    const { sequentialScheduleCancelClasses, recurrentScheduleId } = nextProps;
    this.validRecurrentClassCancel(sequentialScheduleCancelClasses, recurrentScheduleId);
  }

  inputChange = (e) => {
    e.preventDefault()
    const { 
      state: { message },
    } = this

    if(e.target.name === "cancelBy")
    {
      message.cancelledBy = e.target.value
    }else{
      message.value = e.target.value     
    }
    this.setState({ message })
  }

  cancelSubmitHandler = async (e, recurrentSchedule, allRecurrences) => {
    
    e.preventDefault()
    const { 
      state: { message: { value, cancelledBy }}, 
      props: { cancelSubmit, t, }
    } = this
    
    if(value || value.length < 1){
      value = t("CANCELED_CYCLE");
    }
    value 
      ? await cancelSubmit(value, cancelledBy, recurrentSchedule, allRecurrences)
        .then(this.setState({ message: {value: "", cancelledBy, error: false }}))
      : await cancelSubmit(value, cancelledBy, recurrentSchedule, allRecurrences)
      .then(this.setState({ message: {value: "", cancelledBy, error: false }}))
  }
  
  validRecurrentClassCancel = (sequentialScheduleCancelClasses, recurrentScheduleId) => {
  const lisRecurrent = sequentialScheduleCancelClasses.filter(value => {

    return value.recurrentSchedule === true
  })
  const isRecurrent = lisRecurrent.length > 0;

  this.setState({isRecurrent:isRecurrent});
  }

  userTimezoneConvert(time, timeTimezone) {
    const user = serv.getUserFromToken()
    return timezone.tz(time, timeTimezone).clone().tz(user.timezone)
  }

  SequentialClassesCard = () => {
    const { 
      props: {t, sequentialScheduleCancelClasses, recurrentSchedule, recurrentScheduleId,  classes, recurrentScheduleEndDate, allSeqClasses },
    } = this
    const dayWeeks = this.filterDaysOfWeek();
    let alertRecurrencyMsg = dayWeeks.length > 0 ? `
      ${t("REPEAT")}: ${dayWeeks.map(item=> t(item.toUpperCase())).join(", ")}. 
      ${recurrentScheduleEndDate && t("UNTIL")} ${moment(recurrentScheduleEndDate).format(t('DATE_FORMAT'))}
  ` : ''
    const {isRecurrent} = this.state

    return (
      <div>
      {sequentialScheduleCancelClasses && <div className="boxModal"><h3>{t("SEQUENTIAL_CLASS_MESSAGE")}</h3> <hr/></div>}
      {sequentialScheduleCancelClasses && sequentialScheduleCancelClasses.map( sequentialCancelClasses => {
        const initialDate =  this.userTimezoneConvert(sequentialCancelClasses.originalScheduledDateTimeUTC,'UTC') 
        const time = this.userTimezoneConvert(sequentialCancelClasses.originalScheduledDateTimeUTC,'UTC')
        const initialDay = t(initialDate.format("dddd").toUpperCase());
        const initialTime = time.format("hh:mm A")
        const finalTime = time.clone().add(30, "minutes").format("hh:mm A")


        return (
          <div key={`${sequentialCancelClasses.id}`} className="boxModal">
            <h3 key={sequentialCancelClasses.id}>
              <FlagIcon code={sequentialCancelClasses.lingoLanguage.flag}/>
              
              {`${t(sequentialCancelClasses.lingoLanguage.language.name.toUpperCase())} • ${initialDate.format(t('DATE_FORMAT'))} • ${initialDay} • ${initialTime} - ${finalTime}`}
            </h3>
          </div>
        )
      })
      }
      
      {/* {recurrentSchedule && <div><hr/><h3>{alertRecurrencyMsg}</h3></div>} */}

      {
        !isRecurrent ? 
        <div></div>
        :  

        <div><hr/><h3>{alertRecurrencyMsg}</h3></div>
        
      }
      
      {/* {recurrentSchedule ? 
          <div className="boxModal"><hr/><h3>{t("CANCEL_ALL_FIXED_CLASSES_MESSAGE")}</h3> </div> 
        : 
          sequentialScheduleCancelClasses && sequentialScheduleCancelClasses.length > 0 ? <div className="boxModal"><hr/><h3>{t("CANCEL_ALL_CLASSES_MESSAGE")}</h3> </div>: '' } */}


        {
          !isRecurrent ? 
          
          <div className="boxModal"><hr/><h3>{t("CANCEL_ALL_CLASSES_MESSAGE")}</h3></div>
          
          : 

          <div className="boxModal"><hr/><h3>{t("CANCEL_ALL_FIXED_CLASSES_MESSAGE")}</h3></div> 
        }
      </div>
    )
  }



  filterDaysOfWeek(){
    const { 
      props: { allSeqClasses },
    } = this
    return allSeqClasses ? allSeqClasses.reduce(( days, item ) => { 
      const initialDate = moment(item.scheduledDate)

      if(days && days.indexOf(initialDate.format("dddd")) === -1) { 
        return [ ...days, initialDate.format("dddd")]
      } else { return [ ...days ] }
    }, []) : [];

    
  }


  render () {
    const { 
      cancelSubmitHandler,
      inputChange,
      state: { message: {value, cancelledBy, error}, isRecurrent,userRole },
      props: { t, openCancelAlert, closeCancelAlert, recurrentSchedule, sequentialScheduleCancelClasses},
      SequentialClassesCard
    } = this

    const isManager = userRole === "companyManager" || userRole === "customerService" || userRole === "coordinator";

    return (
      <Dialog open={openCancelAlert} onClose={closeCancelAlert} className="newDialog" >
        <DialogTitle className="dialogTitle dialogTitleWarning">{t("CANCEL_CLASS")}</DialogTitle>
        <DialogContent className="dialogContent">
          <img className="dialogImage" src={cancelImg} alt={t("CANCEL_IMAGE")} />
          <form className="dialogForm boxModal">
            <p className={`dialogMessage ${error ? "invalid" : ""}`} >{t("CANCEL_MESSAGE")}</p>
            <SequentialClassesCard/>
            <br/>
            { isManager && 
              <SelectButtons>
                <button name="cancelBy" onClick={this.inputChange} value="lingo"  className={cancelledBy === 'lingo' ? 'active' : ''}>{t("CANCELLED_LINGO")}</button> 
                <button name="cancelBy" onClick={this.inputChange} value="student" className={cancelledBy === 'student' ? 'active' : ''}>{t("CANCELLED")}</button>
              </SelectButtons>
            }
            <br/>
            <textarea
              className={`dialogInput dialogTextArea ${error ? "invalid" : ""}`}
              type="text"
              placeholder={t("CANCEL_PLACEHOLDER")}
              value={value}
              onChange={(e) => inputChange(e)}
              required={false} 
            />
            <br/>
            {recurrentSchedule && <h3 className="dialogMessage pad-top boxModal">{t("CANCEL_MESSAGE_REPEAT")}</h3> }
          </form>
          <br/>
        </DialogContent>
        <DialogActions className="dialogActions">
        
        {
          !isRecurrent ? 
      

              <div>


                  {/* {
                   this.state.userRole !== "teacher" ? */}
                    <button type="button" className="exitButton modalButton teste" onClick={(e) => cancelSubmitHandler(e, true,  false)}>
                      {t("BTN_CANCEL_ONLY_CLASS")}
                    </button>
                    {/* : null
                  } */}
                   
              </div>

              :


              <div style={{display: 'flex', flexDirection: 'column'}}>
                  

                {/* {
                   this.state.userRole !== "teacher" ? */}
                    <button type="button" className="exitButton modalButton teste" onClick={(e) => cancelSubmitHandler(e, true,  false)}>
                      {t("BTN_CANCEL_ONLY_CLASS")}
                    </button>
                    {/* : null
                  } */}
                   <button type="button" className="exitButton modalButton" onClick={(e) => cancelSubmitHandler(e, true, true)}>
                    {t("BTN_CANCEL_ALL_CLASS")}
                  </button>
                  
                {/* <button type="button" className="exitButton modalButton" onClick={(e) => cancelSubmitHandler(e, false, false)}>
                  {t("BTN_CANCEL_CLASS")}
                </button> */}
               
            </div>
              
          }

          <button type="button" className="cancelButton modalButton" onClick={(e) => closeCancelAlert(e)}>
            {t("BTN_NOT_CANCEL_CLASS")}
          </button>
        </DialogActions>
        
      </Dialog>
    )
  }
}

export default translate("translations")(CancelDialog);

import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from "react-i18next";
import { FlagIcon } from "react-flag-kit";
import { updateCalendarClasses } from '../../actions/calendarActions'
import { getNextClasses, getRequestedClasses } from '../../actions/userActions';
import moment from "moment";
import scheduleAllocation from "../../images/img_class-multiple-classes-allocation.png";
import scheduleSequential from "../../images/schedule/img_class-multiple-classes.png";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Services from '../_api/Services';
import Service from '../../components/_api/Services'
import timezone from 'moment-timezone'

const serv = new Service()
const service = new Services();

class DayCalendarSchedules extends Component {
  url = "classSchedules/teacher/"
  state = this.initialState    
  
  get initialState() {
    const localData = JSON.parse(localStorage.getItem("@lingo"));
    const { timeSchedules } = this.props;
    
    return {
      loading: false,
      openAlert: false,
      teacherId: Number(localData.teacherId),
      alertRecurrencyMsg: "",
      alertTitle: "",
      alertMsg: "",
      alertImg: "",
      alertClasses: [],
      targetId: timeSchedules.length > 0 ? timeSchedules[0].id : ""
    }
  }

  userTimezoneConvert(time, timeTimezone) {
    const user = serv.getUserFromToken()
    return timezone.tz(time, timeTimezone).clone().tz(user.timezone)
  }

  acceptHandle = async (item) => {
    const { 
      allocationSchedule,
      allocationScheduleId,
      sequentialSchedule,
      sequentialScheduleClassesCount,
      scheduledStartDateTime,
      lingoLanguage: { flag, language: { name }}
    } = item
    if (allocationSchedule === "fixed") {
      const { t } = this.props
      const { requestedClasses } = this.props.user
      const classes = requestedClasses
        .filter( item => item.allocationScheduleId === allocationScheduleId )
        .map( item => {
          const time = this.userTimezoneConvert(item.originalScheduledDateTimeUTC,'UTC')
          const initialDate = time.format("DD/MM/YYYY")
          const dayWeek = this.props.t(time.format("dddd"))
          const initialTime = time.format("h:mm a")
          const finalTime = time.clone().add(30, "minutes").format("h:mm a")
          const schedule = `${initialDate} • ${dayWeek} • ${initialTime} - ${finalTime}`
          return { flag, language: name, schedule, dayWeek, time }
        })
      const dayWeeks = classes.reduce(( days, item ) => { 
        if(days && days.indexOf(item.dayWeek) === -1) { 
          return [ ...days, item.dayWeek]
        } else { return [ ...days ] }
      }, [])
      let alertRecurrencyMsg = `
          ${t("REPEAT")}: ${dayWeeks.map(item=> t(item.toUpperCase())).join(", ")}. 
          ${t("UNTIL")} ${classes[classes.length - 1].time.format("DD/MM/YYYY")}
        `
      const firstWeekClasses = classes.filter( item => item.time.isSame(classes[0].time, "week"))
      if (classes.length > 1) {
        this.setState({
          openAlert: true,
          alertImg: scheduleAllocation,
          alertTitle: "MULTYPLE_CLASSES",
          alertMsg: "MULTYPLE_CLASSES_MESSAGE",
          alertItem: item,
          alertClasses: firstWeekClasses,
          alertRecurrencyMsg 
        })
      } else { return this.acceptedHandle(item) }
    } else if (sequentialSchedule) {
      const alertClasses = () => {
        const classes = []
        const time = this.userTimezoneConvert(item.originalScheduledDateTimeUTC,'UTC')
        for (let i=0;i<sequentialScheduleClassesCount;i++) {
          const initialDate = time.clone().add(30 * i, "minutes").format("DD/MM/YYYY")
          const initialDay = this.props.t(time.clone().add(30 * i, "minutes").format("dddd"))
          const initialTime = time.clone().add(30 * i, "minutes").format("h:mm a")
          const finalTime = time.clone().add(30 * (i+1), "minutes").format("h:mm a")
          const schedule = `${initialDate} • ${initialDay} • ${initialTime} - ${finalTime}`
          classes.push({ flag, language: name, schedule })
        }
        return classes
      }
      this.setState({
        openAlert: true,
        alertImg: scheduleSequential,
        alertTitle: "MULTYPLE_CLASSES",
        alertMsg: "MULTYPLE_CLASSES_MESSAGE",
        alertItem: item,
        alertClasses: alertClasses()
      })
    } else { return this.acceptedHandle(item) }
  }

  closeAlert = () => {
    this.setState({ openalert: false })
  }
  

  acceptedHandle = async (item) => {
    this.setState({loading: true})
    const { url, state: { teacherId }, props: { getNextClasses, getRequestedClasses, updateCalendarClasses }} = this
    const { sequentialScheduleId, allocationScheduleId, allocationSchedule } = item

    if (allocationSchedule === "random") {
      const submitObj = { teacherId, sequentialScheduleId }
      service.ApiPosts(`${url}${teacherId}/acceptSequentialSchedule`, submitObj)
        .then(() => { 
          getNextClasses(); 
          getRequestedClasses(); 
          updateCalendarClasses();
          this.setState({loading: false, openAlert: false})
        })
        .catch(err => {this.setState({loading: false}); console.log("ERROR ON ACCEPT CLASS", err)})
    }
    if (allocationSchedule === "fixed") {
      const submitObj = { teacherId, allocationScheduleId }
      service.ApiPosts(`${url}${teacherId}/acceptAllocationSchedule`, submitObj)
        .then(() => { 
          getNextClasses(); 
          getRequestedClasses(); 
          updateCalendarClasses();
          this.setState({loading: false, openAlert: false})
        })
        .catch(err => {this.setState({loading: false}); console.log("ERROR ON ACCEPT CLASS", err)})
    }
  }

  render () {
    const { 
      acceptHandle,
      acceptedHandle,
      closeAlert,
      state: { 
        targetId, 
        alertClasses, 
        alertImg, 
        alertMsg, 
        alertRecurrencyMsg, 
        alertTitle, 
        openAlert,
        alertItem,
      },
      props: { t, history, timeSchedules, onScheduleClick }
    } = this

    return (
      <Fragment>
        {timeSchedules.map((item, index) => {
          
          const timeStart = this.userTimezoneConvert(item.originalScheduledDateTimeUTC,'UTC').format("hh:mm a");
          const timeEnd = moment(item.scheduledEndDateTime).format("hh:mm a");
          return (
            <div 
              key={item.id} 
              className={`calendarSchedule ${item.status === "canceled" ? "canceled" : ""} ${item.status === "done" ? "done" : ""}`}
              onClick={(e) => { !item.toSchedule && onScheduleClick(e, item.id)}}
            >
              <p className="calendarScheduleTime">{`${timeStart} - ${timeEnd}`}</p>
              <p className="calendarScheduleLanguage">
                {t(item.lingoLanguage.language.name.toUpperCase())}
              </p>
              { item.toSchedule && <div className="toScheduleBox">
                <button onClick={() => acceptHandle(item)} className=" new-button confirm" >
                  {t("BTN_CONFIRM")} <i className="fa fa-check-circle-o" aria-hidden="true" />
                </button>
                <button onClick={(e) => history.goBack()} className="new-button cancel" >
                  <i className="fa fa-angle-left" aria-hidden="true"></i> {t("BTN_BACK")}
                </button>
  
              </div> }
            </div>
          );
        })}
        <Dialog open={openAlert} onClose={closeAlert} className="alert-dialog-slide">
            <DialogTitle className="alert-dialog-slide-title">
              {t(alertTitle)}
            </DialogTitle>
            <DialogContent className="alert-dialog-slide-content">
              <img src={alertImg} alt="schedule"/>
              <p className="alert-dialog-text">{t(alertMsg)}</p>
              <hr/>
              <div>
                { alertClasses.map(({ flag, language, schedule }) => (
                  <div key={JSON.stringify(schedule)}>
                    <p><FlagIcon code={flag}/> {`${t(language.toUpperCase())} ${schedule}`}</p>
                  </div>
                ))}
              </div>
              <hr/>
              { alertRecurrencyMsg && (
                <Fragment>
                  <p className="alert-dialog-text-recurrency-message">{alertRecurrencyMsg}</p> 
                  <hr/>
                </Fragment>
              )}
            </DialogContent>
            <DialogActions className="alert-dialog-slide-actions">
              <button className="new-button close" onClick={() => this.setState({openAlert: false})}>
                {t('CANCEL')}
              </button>
              <button className="new-button" onClick={() => acceptedHandle(alertItem)} autoFocus>
                {t('ACCEPT_SEQUENCE')}
              </button>
            </DialogActions>
          </Dialog>  
      </Fragment>
    )
  }
};

const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = dispatch => ({
  getNextClasses: data => dispatch(getNextClasses(data)),
  getRequestedClasses: data => dispatch(getRequestedClasses(data)),
  updateCalendarClasses: data => dispatch(updateCalendarClasses(data)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DayCalendarSchedules)));

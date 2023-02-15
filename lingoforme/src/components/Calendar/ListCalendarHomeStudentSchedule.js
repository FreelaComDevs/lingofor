import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { translate } from "react-i18next";
import { FlagIcon } from "react-flag-kit";
import { connect } from 'react-redux';
import { getNextClasses, getRequestedClasses} from '../../actions/userActions';
import { updateCalendarClasses } from '../../actions/calendarActions';
import { getUserPlans } from '../../actions/userActions';
import moment from "moment";
import CancelDialog from './CancelDialog';
import Services from '../_api/Services';
import Loading from 'react-fullscreen-loading';
import Service from '../../components/_api/Services'
import timezone from 'moment-timezone'
const serv = new Service()
class ListCalendarHomeStudentSchedule extends Component {
  state = {
    cancelAlertOpen: false,
    alertOpen: false,
    loading: false,
    recurrentSchedule: false,
    sequentialScheduleCancelClasses: [],
    classes: [],
    recurrentScheduleEndDate: '',
    recurrentScheduleId: '',
    allSeqClasses: [],
    languageClass:''
  }

  service = new Services()

  closeCancelAlert = () => {
    this.setState({ cancelAlertOpen: false })
  }

  closeAlert = () => {
    this.setState=({ alertOpen: false })
  }

  cancelSubmit = async (message, cancelledBy, recurrentSchedule, cancelAllRecurrences) => {
    this.setState({ loading: true, cancelAlertOpen: false })
    const { schedule, getNextClasses, getRequestedClasses,  updateCalendarClasses, getUserPlans } = this.props;
    const url = 'classSchedules/cancelClassSchedule';
    const { role } = JSON.parse(localStorage.getItem("@lingo"))

    this.service.ApiPosts(url, this.getCancelObj(schedule, message, cancelledBy, role, recurrentSchedule, cancelAllRecurrences))
      .then( res => {
        getUserPlans();
        getNextClasses();
        getRequestedClasses();
        updateCalendarClasses();
        this.setState({ loading: false })})
      .catch( err => this.setState({ alertOpen: true }))
  }

  getCancelObj(schedule, message, cancelledBy, role, recurrentSchedule, cancelAllRecurrences){
    if(role === "teacher"){
      return this.getTeacherCancelObj(schedule, message, cancelAllRecurrences);
    }
    else{
      return this.getOthersCancelObj(schedule, recurrentSchedule, message, cancelledBy, cancelAllRecurrences);
    }
  }

  getTeacherCancelObj(schedule, message){
    console.log('getTeacherCancelObj');
    const isFixed = schedule.allocationSchedule === 'fixed';
    const cancelObj = { reason: message }
    if (isFixed) {
      cancelObj.allocationScheduleId = schedule.allocationScheduleId
      cancelObj.reschedule = true
    } else {
      cancelObj.sequentialScheduleId = schedule.sequentialScheduleId
    }
    return cancelObj;
  }

  getOthersCancelObj(schedule, recurrentSchedule, message, cancelledBy, cancelAllRecurrences){
    console.log('getOthersCancelObj');
    const cancelObj = { reason: message, cancelledBy }
    if (recurrentSchedule && cancelAllRecurrences) {
      cancelObj.recurrentScheduleId = schedule.recurrentScheduleId;
    } else {
      cancelObj.sequentialScheduleId = schedule.sequentialScheduleId ;
    }
    return cancelObj;
  }

  ConfirmedCardItem = () => {
    const {
      props: {t, schedule },
    } = this
    const { role } = JSON.parse(localStorage.getItem("@lingo"))
    const isStudent = role === "student"
    const isCanceled = schedule.status === "canceled"
    const isPending = schedule.status === "pending"
    const isAccepted = schedule.status === "accepted"
    const hasTeacher = !!schedule.teacher
    const isDone = schedule.status === 'done'

    if (!isStudent && !hasTeacher ) {
      return <h4 className={"scheduleWithoutTeacher"} >{t('WITHOUT_TEACHER')}</h4>
    } else if ((isStudent && !isCanceled) || ((isPending && hasTeacher) || isAccepted )) {
      return <h4 className={"scheduleConfirmed"} >{t('CARD_CLASS_CONFIRMED')}<i className="fa fa-check-circle-o"></i></h4>
    } else if(isDone){
      return <h4 className={"scheduleConfirmed"}>{t('CARD_CLASS_DONE')}<i className="fa fa-check-circle-o"></i></h4>
    }else { return <h4 className={"scheduleConfirmed"}/> }
  }

  CancelCardItem = () => {
    const {
      state: { loading },
      props: {t, schedule },
    } = this
    const { role } = JSON.parse(localStorage.getItem("@lingo"))
    const isCanceled = schedule.status === "canceled"
    const isCanceledByLingo = schedule.status === "canceledLingo"
    const iscanceledFreeLingo = schedule.status === "canceledFreeLingo"
    const isPending = schedule.status === "pending"
    const isAccepted = schedule.status === "accepted"

    const localTime = this.service.getLocalTimeFromUtc()
    const endDatetimeUTC = moment.utc(schedule.originalScheduledDateTimeUTC).add(30, "minutes")
    let canCancel = localTime.isBefore(endDatetimeUTC)
    if(role === "student" || role === "teacher"){
      canCancel = localTime.isBefore(moment.utc(schedule.originalScheduledDateTimeUTC))
    }

    if (isCanceled || isCanceledByLingo || iscanceledFreeLingo) {
      return <h4 className={"scheduleCanceled"} >{t("CLASS_CANCELED")}</h4>
    } else if ((isPending || isAccepted) && canCancel) {
      if(schedule.type === 'demo'){
        return <div className="scheduleCanceled"/>
      }
      return (
        <button className="cancelSchedule" onClick={this.setCancelModalValues}>
          {t('BTN_CANCEL')} <i className="fa fa-times-circle-o" ></i>
        </button>
      )
    } else { return <div className="scheduleCanceled"/> }
  }

  ClassToolCardItem = () => {
    
    const {
      props: {schedule },
    } = this
    const isLink = (schedule.student && schedule.student.classToolId && schedule.student.classToolId.indexOf('http') > -1)
      || (schedule.container && schedule.container.classToolId && schedule.container.classToolId.indexOf('http') > -1);

    const classTool = (schedule.student && schedule.student.classTool) ? schedule.student.classTool :
                        (schedule.container && schedule.container.classTool) ? schedule.container.classTool : null

    const classToolId   = (schedule.student && schedule.student.classToolId) ? schedule.student.classToolId :
                        (schedule.container && schedule.container.classToolId) ? schedule.container.classToolId : null
    return (
      (classTool && classToolId) ?
      isLink ?
              <div><button type="submit" className="buttonSave pointer" onClick={() => window.open(classToolId)}>{classTool}</button></div>
              :
              <div><span className="buttonSave">{classTool}</span> <span style={{color: '#5A6C96', fontSize: '11px', fontWeight: '500'}}>{classToolId}</span></div>
      : ''
    )
  }


  setCancelModalValues = () => {
    const { role } = JSON.parse(localStorage.getItem("@lingo"))
    const {
      props: {t, schedule },
    } = this

    const recurrentSchedule = role === "teacher" || "companyManager" ? true : schedule.recurrentSchedule;
    this.setState({cancelAlertOpen: true, recurrentSchedule: recurrentSchedule});
    this.getSequentialSchedules(recurrentSchedule, schedule)
  }


  getSequentialSchedules(recurrentSchedule, schedule){
    const classId = recurrentSchedule ? schedule.recurrentScheduleId : schedule.sequentialScheduleId;
    schedule && this.getSequentialClasses(classId, schedule);

  }

  getSequentialClasses = (recurrentScheduleId, schedule) => {
    const service = new Services();
    const pageNumber = 1;
    const pageSize = 9999;
    const params = {
      pageNumber,
      pageSize,
      recurrentScheduleId
    }
    service.ApiGetParams(`classSchedules`, params)
    .then(res => {
      res.result && res.result.items && this.setState({
        sequentialScheduleCancelClasses: res.result.items.filter(sequential => sequential.scheduledDate == schedule.scheduledDate),
        recurrentScheduleEndDate: res.result.items[res.result.items.length - 1].scheduledDate,
        recurrentScheduleId: res.result.items[0].recurrentScheduleId,
        allSeqClasses: res.result.items
      })
  })
    .catch(err => { console.log("ERROR ON GET SEQUENTIAL END DATE: ", err)});

  }


  userTimezoneConvert(time, timeTimezone) {
    const user = serv.getUserFromToken()
    return timezone.tz(time, timeTimezone).clone().tz(user.timezone)
  }

  render () {  
    const {
      closeCancelAlert,
      cancelSubmit,
      ConfirmedCardItem,
      CancelCardItem,
      props: {t, history, schedule },
      state: { cancelAlertOpen, loading, recurrentSchedule, recurrentScheduleId, sequentialScheduleCancelClasses, classes,recurrentScheduleEndDate, allSeqClasses }
    } = this    
    const { role } = JSON.parse(localStorage.getItem("@lingo"))
    const isStudent = role === "student"
    const isTeacher = role === "teacher"
    const isManager = role === "companyManager" || role === "customerService" || role === "coordinator"
    const hasTeacher = !!schedule.teacher

  return (
    <Fragment>
      <Loading loading={loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>
      <CancelDialog
        openCancelAlert={cancelAlertOpen}
        closeCancelAlert={closeCancelAlert}
        cancelSubmit={cancelSubmit}
        recurrentSchedule={recurrentSchedule}
        sequentialScheduleCancelClasses={sequentialScheduleCancelClasses}
        recurrentScheduleId={recurrentScheduleId}
        classes={classes}
        recurrentScheduleEndDate={recurrentScheduleEndDate}
        allSeqClasses={allSeqClasses}
      />
    <div>
      <div className="listScheduleCard" style={schedule.status === "canceled" && !
      schedule.status === "pending"  ? {border: "3px solid #ff5666"} : {border: "3px solid #91E2CF"}}>
        <div className="infosAulas">
          <h3 className="scheduleDateTime">
            {schedule.timeTotal}
          </h3>
        </div>
        <div className='scheduleDetails'>
          <div className="scheduleDetailsInfo">
            <div className="scheduleLanguage">
              <h4 className="scheduleLanguageName">
                <FlagIcon code={schedule.lingoLanguage.flag}/>
                {t(schedule.lingoLanguage.language.name.toUpperCase())}
              </h4>
              { isManager && (
              <h4 className="scheduleLanguageLevels" >
                { schedule.student && schedule.student.studentLevelGrades && (
                schedule.student.studentLevelGrades.map(scheduleLevel => (
                <Fragment key={JSON.stringify(scheduleLevel)}>
                  {`${t('CARD_PLAN_LEVEL')}: `}
                  { scheduleLevel.level.level }
                </Fragment>
                ))
                )}
                { schedule.container && (
                <Fragment>
                  {`${t('CARD_PLAN_LEVEL')}: `}
                  { schedule.container.levelByLingo
                  ? schedule.container.levelByLingo
                  : schedule.container.levelByStudent
                  }
                </Fragment>
                )}
              </h4>
              )}
            </div>

            <div className="scheduleLanguageDetails">
              { schedule.classScheduleDetails.length > 0 && (
              <div className="typeClass">
                <h4 className="scheduleLanguageContent">
                  {`${t("CARD_CLASS_CONTENT")}`}
                </h4>
                <h4 className="typeText">
                  {`: ${t(schedule.classScheduleDetails[0].focus.toUpperCase())}`}
                </h4>
              </div>

              )}
              { !isStudent && schedule.studentPlan && !schedule.studentPlan.plan.trial && schedule.studentPlan.studentPlanLanguages.length > 0 && (
              <h4 className="scheduleLanguageFocus">
                {`${t("CARD_CLASS_FOCUS")}: ${t(schedule.studentPlan.studentPlanLanguages[0].focus.toUpperCase())}`}
              </h4>
              )}
              { !isStudent && schedule.studentPlan && schedule.studentPlan.plan.trial && schedule.studentPlan.studentPlanLanguages.length > 0 && (
              <h4 className="scheduleLanguageFocus">
                {`${t("LEVEL")}: ${t(schedule.studentPlan.studentPlanLanguages[0].studentLanguageLevel)}`}
              </h4>
              )}
            </div>

            { (isTeacher && hasTeacher ) && (
            <h4 className="scheduleLanguageLevels">
              {t('CARD_PLAN_LEVEL')}:
              { schedule.student && schedule.student.studentLevelGrades && (
              schedule.student.studentLevelGrades.map(scheduleLevel => (
              <Fragment key={JSON.stringify(scheduleLevel)}>
                {scheduleLevel.level.level}
              </Fragment>
              ))
              )}
              { schedule.container
              ? schedule.container.levelByLingo
              ? schedule.container.levelByLingo
              : schedule.container.levelByStudent
              : ""
              }
            </h4>
            )}
          </div>
          <div className="scheduleActions">
            <button className="viewSchedule" onClick={() => history.push(`/class-details/${schedule.id}`)}>
              {"CLIQUE AQUI PARA ACESSAR A AULA"} 
            </button>
          </div>
        </div>
        <div className='scheduleDetails'>
          <div className="scheduleDetailsInfo">
            <div className="scheduleActions">
              <ConfirmedCardItem />
              <CancelCardItem />
            </div>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
  }
}

const mapStateToProps = ({ calendar, user }) => ({ calendar, user })
const mapDispatchToProps = dispatch => ({
  getNextClasses: data => dispatch(getNextClasses(data)),
  getRequestedClasses: data => dispatch(getRequestedClasses(data)),
  updateCalendarClasses: data => dispatch(updateCalendarClasses(data)),
  getUserPlans: data => dispatch(getUserPlans(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ListCalendarHomeStudentSchedule)))

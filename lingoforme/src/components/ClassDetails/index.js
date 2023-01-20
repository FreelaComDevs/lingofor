import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate, Trans } from 'react-i18next'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import IconAvatar from '../../images/profile/img_placeholder.svg';
import { ClassD } from './styles';
import { FlagIcon } from "react-flag-kit";
import FormControl from '@material-ui/core/FormControl';
import Services from '../_api/Services'
import Moment from 'react-moment';
import timezone from 'moment-timezone'
import moment from 'moment'
import Loading from 'react-fullscreen-loading'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DemoClassDetails from './DemoClassDetails';
import Schedule from '../../images/icons/icon_schedule_header.svg'
import Rating from 'react-rating'
import MomentLocalDate, {MomentHelpers} from '../_common/momentLocalDate/momentLocalDate'
import DatePicker from 'react-datepicker';
import InputDatepicker from '../../elements/NewInputs/InputDatepicker'
import CancelDialog from '../../components/Calendar/CancelDialog';
// import NextClass from "../_common/tableClass/nextClass";

import { connect } from 'react-redux';
import { getListSequentialClass } from '../../actions/userActions';
import Service from '../../components/_api/Services'

const serv = new Service()

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Details extends Component {

    constructor (props) {
        super(props)

        this.t = this.props.t        
        this.handleChange = this.handleChange.bind(this)
        this.serv = new Services()
        this.i18n = this.props.i18n
        this.timezone = timezone
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setDate = this.setDate.bind(this)

        this.state = { 
          genericError: '',
          roleNow : '',         
          countries: [],         
          //language: 'ENGLISH', 
          plans: [],
          languages: [], 
          userClass: {},
          languageId: 0,
          userPlan: 0,
          timezone: '',
          scheduledDate: '',
          timeSlots: [],
          startTime: '',
          teachers: [],
          teacherId: 0,
          planId: 0,
          studentId: 0,
          lingoLanguageId: 0,
          focus: '',
          languageNative: '',
          specificSubject: '',
          isTeacher: false,
          weekDays : [0,1,2,3,4,5,6],
          tagDays : ['WEEK_SUNDAY','WEEK_MONDAY','WEEK_TUESDAY','WEEK_WEDNESDAY','WEEK_THURSDAY','WEEK_FRIDAY','WEEK_SATURDAY'],
          noShow: false,
          status : '',
          canSeeNoShowSwitch: false,
          demoClassId: "",
          canSeeStudentPhone: false,
          classTool: '',
          classToolId: '',
          cancelAlertOpen: false,
          alertOpen: false,
          loading: false,
          recurrentSchedule: false,
          sequentialScheduleCancelClasses: [],
          classes: [],
          recurrentScheduleEndDate: '',
          recurrentScheduleId: '',
          allSeqClasses: [],
          teacherExceptions: [],
        }
    }

    
  closeCancelAlert = () => {
    this.setState({ cancelAlertOpen: false })
  }

  closeAlert = () => {
    this.setState=({ alertOpen: false })
  }
  cancelSubmit = async (message, cancelledBy, recurrentSchedule, cancelAllRecurrences) => {
    this.setState({ loading: true, cancelAlertOpen: false })
    const { userClass } = this.state;
    const url = 'classSchedules/cancelClassSchedule';
    const { role } = JSON.parse(localStorage.getItem("@lingo"))

     this.serv.ApiPosts(url, this.getCancelObj(userClass, message, cancelledBy, role, recurrentSchedule, cancelAllRecurrences))
      .then( res => { 
        this.props.history.goBack()
       })
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
      schedule = this.state;
    const cancelObj = { reason: message,cancelledBy }
    if (recurrentSchedule && cancelAllRecurrences) { 
      cancelObj.recurrentScheduleId = schedule.recurrentScheduleId;
    } else { 
      cancelObj.sequentialScheduleId = schedule.sequentialScheduleId ;
    }
    return cancelObj;
  }

    setCancelModalValues = () => {
        const { role } = JSON.parse(localStorage.getItem("@lingo"))
        const { 
          props: {t },
          state
        } = this
        const schedule = state
        const recurrentSchedule =  schedule.recurrentSchedule;
        this.setState({cancelAlertOpen: true, recurrentSchedule: recurrentSchedule});
        this.getSequentialSchedules(recurrentSchedule, schedule)
      }
    getSequentialSchedules(recurrentSchedule, schedule){

        const classId = schedule.recurrentScheduleId //recurrentSchedule ? schedule.recurrentScheduleId : schedule.sequentialScheduleId;
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
        sequentialScheduleCancelClasses: res.result.items.filter(sequential => sequential.scheduledDate == moment(schedule.scheduledDate).format("YYYY-MM-DD")),
        recurrentScheduleEndDate: res.result.items[res.result.items.length - 1].scheduledDate,
        recurrentScheduleId: res.result.items[0].recurrentScheduleId,
        allSeqClasses: res.result.items
    })
  })
    .catch(err => { console.log("ERROR ON GET SEQUENTIAL END DATE: ", err)});

  }
  CancelCardItem = () => {
    const { 
      state: { loading, status, scheduledEndDateTime,scheduledStartDateTime },
      props: {t },
    } = this
    if(  status && scheduledEndDateTime && scheduledStartDateTime ){
        const { role } = JSON.parse(localStorage.getItem("@lingo"))
        const isCanceled = status === "canceled"
        const isCanceledByLingo = status === "canceledLingo"
        const iscanceledFreeLingo = status === "canceledFreeLingo"
        const isPending = status === "pending"
        const isAccepted = status === "accepted"
    
        const localTime = this.serv.getLocalTimeFromUtc()
        let canCancel = moment(localTime).isBefore(scheduledEndDateTime)
        //Se for student apenas pode cancelar até o inicio da aula
        if(role === "student" || role === "teacher"){
          canCancel = moment(localTime).isBefore(scheduledStartDateTime)
        }    
    
        if (isCanceled || isCanceledByLingo || iscanceledFreeLingo) {
          return <h4 className={"scheduleCanceled"} >{t("CLASS_CANCELED")}</h4>
        } else if ((isPending || isAccepted) && canCancel) {
          
          return (
            <button className="cancelSchedule" onClick={this.setCancelModalValues}>
              {t('BTN_CANCEL')} <i className="fa fa-times-circle-o" ></i>
            </button>
          )
        } else { return <div className="scheduleCanceled"/> }
    }else{
        return (<></>)
    }   
  }

     componentDidMount() {
        let localData = JSON.parse(localStorage.getItem ('@lingo'));
        this.setState({
            loading: true,
            roleNow: localData.role,
            isTeacher: localData.role === 'teacher' ? true : false,
        })
        this.serv.get(`classSchedules?id=${this.props.match.params.id}`).then(async (res) => {
          const userClasses = res.result.items;
          const item = userClasses[0]
          const localTime = this.serv.getLocalTimeFromUtc()
          const isPastClass = moment(localTime).isAfter(moment(item.originalScheduledDateTimeUTC).utc())
          let languageNative = ''

          if(item.student && item.student.studentLanguages.length > 0){
            item.student.studentLanguages.map(language => {
              languageNative = language.isNative = true ? language.language.name : languageNative
            })
          }

          await this.props.getListSequentialClass(item.sequentialScheduleId);
          const sequentialsClass = this.props.user.listSequentialClass
          
            this.setState({
                userClass: item,
                noShow: item.status === 'noShow',
                canSeeNoShowSwitch: isPastClass && ['coordinator', 'customerService', 'companyManager'].indexOf(localData.role) >= 0,
                sequentialScheduleId: item.sequentialScheduleId,
                teacher: item.teacher,
                startTime: item.scheduledStartTime, 
                teacherId: item.teacher ? item.teacher.userId : 0,
                selectedTeacherId: item.teacherId || 0,
                studentId: item.studentId,
                planId: item.studentPlanId || 0,
                lingoLanguageId: item.lingoLanguageId,
                languageNative: languageNative ? languageNative : '',
                focus: item.classScheduleDetails[0].focus.toLowerCase(),
                specificSubject: item.classScheduleDetails[0].specificSubject || '',
                recurrentSchedule: item.recurrentSchedule,
                recurrentScheduleId: item.recurrentScheduleId,
                scheduledDate: moment(item.scheduledDate),
                scheduledStartTime: item.scheduledStartTime,
                atualScheduledDate: moment(item.scheduledDate),
                atualScheduledStartTime: item.scheduledStartTime,
                originalScheduledDateTimeUTC: item.originalScheduledDateTimeUTC,
                status: item.status,
                demoClassId: item.container ? (item.container.demoClassId ? item.container.demoClassId : "") : "",
                classScheduleDetails : item.classScheduleDetails ? item.classScheduleDetails : [],
                classTool: item.student ? item.student.classTool : '',
                classToolId: item.student ? item.student.classToolId : '',
                listSequentialClass: sequentialsClass,
                scheduledEndDateTime: item.scheduledEndDateTime,
                scheduledStartDateTime: item.scheduledStartDateTime
              })


          this.serv.get(`teachermanagement/getTeacherWithNativeLanguage/${item.lingoLanguage.languageId}`).then(res => {
            console.log('res.result.items ', res);
            this.setState({ teachers: res.result.items })
            this.loadExceptions();
          })
          .catch(err => console.log('Failed getting teachers for class scheduled.', err)) 
          
          if (item.studentId) {
              this.serv.get(`studentManagement/viewPlans?skip=0&take=1000&id=${item.studentId}`).then(res => {
                this.setState({
                  plans: res.result.items
                })

              })
              .catch(err => console.log('Failed getting plans for class scheduled.', err)) 
          }

          this.serv.get(`studentplans?id=${item.studentPlanId || 0}`).then(res => {
            let activeLangs = []
            if( res.result.items.length > 0)
                for (var itemLang in res.result.items[0].studentPlanLanguages){
                    if (res.result.items[0].studentPlanLanguages[itemLang].lingoLanguage.active)
                        activeLangs.push(res.result.items[0].studentPlanLanguages[itemLang].lingoLanguage)
                }

            this.setState({
              languages: activeLangs
            })
          })
          .catch(err => console.log('Failed getting lingo languages for class schedule.', err)) 

          this.canSeeStudentPhone();
          this.serv.get('classSchedules/classTimes').then(res => {
            this.setState({
              timeSlots: res.result.items
            })
          })
          .catch(err => console.log('Failed getting class times for class schedule.', err)) 

          this.setState({
            loading: false
          })
                
        })
        .catch(err => {
          this.setState({
            loading: false
          })
          console.log('Failed getting class schedule details.', err)
        })  
    }

    loadExceptions() {
      this.serv.get(`studentManagement/getStudentTeacherRestriction/${this.state.studentId}`)
      .then(res => {
          if(!res.success || !res.result.items)
          {
              return
          }
          this.setState({ teacherExceptions : res.result.items})
          this.removeArrayTeacherExceptions()
      })
      .catch(err => console.log('ERRO GET getStudentTeacherRestriction ', err))
  }

  removeArrayTeacherExceptions(){
    let tempTeacher = this.state.teachers;
    this.state.teacherExceptions.map((el) =>{
      tempTeacher = tempTeacher.filter(e => e.teachers[0].id !== el.teacher.id);
    })
    this.setState({teachers: tempTeacher});
  }
    handleChange(e) {
        const { name, value } = e.target;
        const newState = {[name]: value}
        if (! value && name === 'teacherId') {
            const userClass = {
              ...this.state.userClass,
              teacher: null
            };
            this.setState({
                userClass,
                selectedTeacherId: '',
                teacherId: ''
            });
          return;
        }
            
        if (value && name === 'teacherId') {
            const found = this.state.teachers.find(i => i.id == value)
            const t = found.teachers[0]
            const userClass = {...this.state.userClass}
            const teacher = { ...t, user: {
                country: found.country,
                userPhones: found.userPhones
            }}
            userClass.teacher = teacher
            newState.selectedTeacherId = t.id
            newState.userClass = userClass
        }
        if (name === 'noShow') {
            newState.noShow = !this.state.noShow;
        }
        this.setState(newState)
    }

    editDisabled = () => {
        const { scheduledDate, scheduledStartTime, status } = this.state
        const scheduledClassDate = moment(`${scheduledDate.format('YYYY-MM-DD')}T${scheduledStartTime}.000`)
        const localTime = this.serv.getLocalTimeFromUtc()
        return moment(localTime).isAfter(scheduledClassDate) || status === 'canceled'
    }

    editTeacherDisabled = () => {
        if(this.state.roleNow === 'student' || this.state.roleNow === 'teacher') return true
        const { status, userClass } = this.state
        const localTime = this.serv.getLocalTimeFromUtc()
        var scheduledClassDate = moment(userClass.originalScheduledDateTimeUTC).utc()
        scheduledClassDate = moment(scheduledClassDate).add(30, 'minutes') //teacher can edit running class
        return moment(localTime).isAfter(scheduledClassDate) || status === 'canceled'
    }

    handleSubmit(e) {
        e.preventDefault();

        //listSequentialClass[0].scheduledDate+'T'+listSequentialClass[0].scheduledStartTime+'.000'
        const {
            studentId,
            planId,
            lingoLanguageId,
            teacherId,
            selectedTeacherId,
            sequentialScheduleId,
            focus,
            scheduledDate,
            atualScheduledDate,
            atualScheduledStartTime,
            scheduledStartTime,
            userClass,
            specificSubject,
            noShow,
            listSequentialClass
        } = this.state

        let startime = ''
        let startdate = ''

        if(atualScheduledStartTime == scheduledStartTime){
            startime = listSequentialClass[0].scheduledStartTime
        }else{
            startime = scheduledStartTime
        }
        if(atualScheduledDate == scheduledDate){
            startdate = listSequentialClass[0].scheduledDate
        }else{
            startdate = scheduledDate
        }

        const req = {
            studentId,
            studentPlanId: planId,
            lingoLanguageId: parseInt(lingoLanguageId),
            teacherId: selectedTeacherId === 0 ? null : parseInt(selectedTeacherId),
            sequentialScheduleId,
            focus,
            scheduledStart: `${startdate.format('YYYY-MM-DD')}T${startime}.000`,
            numberOfClasses: userClass.sequentialScheduleClassesCount,
            specificSubject: userClass.classScheduleDetails.specificSubject,
            applyToRecurrence: false,
            status: noShow ? 'noShow' : (teacherId ? 'accepted' : 'pending')
        }

        if (this.state.roleNow === 'student') {
          req.teacherId = null;
        }
        if (this.state.specificSubject) {
          req.specificSubject = this.state.specificSubject;
        }
        this.setState({ loading: true });
        this.serv.ApiPut('classSchedules', req).then(res => {
            this.setState({ loading: false });
            window.location.href = '/Calendar' 
        })
        .catch(err => {
            let error = this.t('SOMETHING_WENT_WRONG');
            console.log('err classupdate',err)
            if(err && err.response && err.response.data)
            {
                error = err.response.data.error[0];
            }
            else if(err && err.data){
                error = err.data.error;
            }
            let message = '';
            try {
                message = error && error.length > 0 ? error[0].message : error.message;
                if ('en_US' in message) {
                    message = message.en_US;
                }
            } catch (e) {
                message = error.message ? error.message : '';
            }
            this.setState({ loading: false, genericError: message.toString() });
        })
    }

    canSeeStudentPhone = () => {
        if(this.state.isTeacher){
            this.setState({ canSeeStudentPhone: false });
        }
        else{
            this.setState({ canSeeStudentPhone: true });
        }
    }

    setDate(birth_date) {
        this.setState({scheduledDate : birth_date})
      }

    statusOptions = ["pending", "noShow", "done", "canceled", "canceledLingo", "confirmed"].map( option => { return { id: option, name: option }; } );                                     

    ClassToolCardItem = () => {        
        const isLink = this.state.classToolId && this.state.classToolId.indexOf('http') > -1;
        return (
            this.state.classTool ? 
                isLink ? 
                        <Fragment><button type="submit" className="buttonSave pointer" onClick={() => window.open(this.state.classToolId)}>{this.state.classTool}</button></Fragment>
                        :
                        <Fragment><span className="buttonSave">{this.state.classTool}</span> <span style={{color: '#5A6C96', fontSize: '11px', fontWeight: '500'}}>{this.state.classToolId}</span></Fragment>
                    : ''
                
            )
        }
        //this.userTimezoneConvert(`${item.scheduledDate} ${item.scheduledStart}`, timezone).format('DD/MM/YYYY')
    userTimezoneConvert(time, timeTimezone) {
        const user = serv.getUserFromToken()
        return timezone.tz(time, timeTimezone).clone().tz(user.timezone)
    }

    //Essa função converte o horario da aula conforme o timezone do usuário.
    userTimezoneConvert2(time, timeTimezone, destTimezone) {
        //console.log('userTimezoneConvert2', time, timeTimezone, destTimezone)
        if (destTimezone && destTimezone === 'America/Sao_Paulo') { 
            destTimezone = 'America/Bahia'
        }
        // const user = serv.getUserFromToken()
        return timezone.tz(time, timeTimezone).clone().tz(destTimezone)       
    }

    render() {
        
        const { 
            t, 
            editDisabled,
            editTeacherDisabled,
            statusOptions,
            ClassToolCardItem,
            CancelCardItem,
            closeCancelAlert,
            cancelSubmit,
            ConfirmedCardItem,
            userTimezoneConvert2,
            state: {
                isTeacher,
                userClass,
                status,
                classTool,
                languageNative,
                cancelAlertOpen, 
                loading, 
                recurrentSchedule, 
                recurrentScheduleId, 
                sequentialScheduleCancelClasses, 
                classes,
                recurrentScheduleEndDate, 
                allSeqClasses
            },
            props: {history, schedule },
         } = this
         //('state', this.state)
        if (userClass && userClass.target === "demo") {
            return <DemoClassDetails userClass={userClass}/>
        } 
        return (<div className="view">
            <SideMenu/>
                <section>
                    <Header/>
                    <div className="toptitle">
                        <img src={Schedule} alt="Schedule"/>      
                        <h1>{this.t('ITEM_SCHEDULE')}</h1>                   
                    </div>

                    { this.state.loading && <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/> }

                    {userClass && userClass.id && <div>
                        <div key={ 'classDetail_'+userClass.id} className="container">
                            <ClassD>
                                <div className="topClass">
                                    <h2>{this.t('CARD_CLASS_DETAILS')}</h2>
                                </div>

                                <Trans>
                                    <div className="listSelect">
                                      <div className="listSelectRow">
                                        <div className="itemList">
                                          <div className="selectItem">
                                            <label>{this.t('DATE')}:</label>
                                            <DatePicker id='date' name='scheduledDate' dateFormat={this.t('DATE_FORMAT')} 
                                                showMonthDropdown showYearDropdown
                                                todayButton={this.t('TODAY')} placeholderText={this.t('DATE_FORMAT')} 
                                                className='input-lingo' selected={this.state.scheduledDate} autoComplete="off"
                                                onChange={this.setDate} disabled={this.state.isTeacher || editDisabled()} 
                                                customInput={<InputDatepicker />}
                                                />
                                          </div>
                                        </div>
                                        <div className="itemList"> 
                                          <div className="lastItemList">                                           
                                            <div className="selectItem">                                               
                                              <label>{this.t('BTN_START_TIME')}:</label>
                                              <select onChange={this.handleChange} className="input-lingo" name="scheduledStartTime" disabled={this.state.isTeacher || editDisabled() } value={this.state.scheduledStartTime} >
                                                {this.state.timeSlots.map(timeS => {                  
                                                  return (<option key={timeS.start} value={timeS.start}>
                                                      {moment(timeS.start,'HH:mm:ss').format('hh:mm A')}
                                                      </option>)
                                                })}  
                                              </select>
                                            </div>
                                            <div className="itemList">                                            
                                              <span>({this.t('YOUR_TIMEZONE')})</span> 
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="listSelectRow">

                                        <div className="itemList">
                                            <div className="selectItem">
                                                <label htmlFor='language'>{this.t('LANGUAGE')} </label>
                                                <FormControl className="languageInput">
                                                    <Select name="lingoLanguageId" value={this.state.lingoLanguageId} onChange={this.handleChange} disabled={this.state.isTeacher  || editDisabled()} className='input-lingo' disableUnderline disabled={this.state.isTeacher || editDisabled() }>
                                                        {this.state.languages.map(lang => {                  
                                                            return (<MenuItem key={lang.id*4} value={lang.id}><FlagIcon code={lang.flag} /> {t(lang.description.toUpperCase())}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="itemList">
                                            <div className="selectItem">
                                                <label>{this.t('PLAN')}:</label>
                                                <select name="planId" value={this.state.planId} disabled className='input-lingo' style={{backgroundImage: 'none', color: '#B2B1B6'}}>
                                                    {this.state.plans.map(plan => {                  
                                                        return (<option key={plan.studentPlanId*3} value={plan.studentPlanId}>{plan.nameEnglish}</option>)
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="itemList">
                                            <div className="selectItem">
                                                <label>{this.t('FOCUS')}:</label>
                                                <select
                                                    onChange={this.handleChange}
                                                    className='input-lingo' name='focus'
                                                    disabled={this.state.isTeacher || editDisabled()}
                                                    value={this.state.focus}
                                                >
                                                    <option value="specific">{this.t('BTN_SPECIFIC')}</option>
                                                    <option value="regular">{this.t('BTN_REGULAR')}</option>
                                                </select>
                                            </div>
                                        </div>

                                        

                                        { this.state.focus !== 'regular' && (
                                          <div className="itemList">
                                              <div className="selectItem">
                                                  <label>{this.t('SPECIFIC_CONTENT')}:</label>
                                                  <input
                                                      type="text"
                                                      id='specificSubject'
                                                      name="specificSubject"
                                                      value={this.state.specificSubject}
                                                      onChange={this.handleChange}
                                                      className="input-lingo"
                                                      placeholder={t('Class_Subject')}
                                                  />
                                              </div>
                                          </div>
                                        )}
                                        </div>
                                    </div>
                                </Trans>
                                <div className="classRun">
                                    <div className="student">
                                        <div className="infos">                                        
                                            <div>
                                                <h2>{this.t('CARD_CLASS_STUDENT')}</h2>
                                                <div className="avatar">
                                                    {(userClass && userClass.student && userClass.student.user && userClass.student.user.picture)
                                                        ? (<img src={userClass.student.user.picture} style={{borderRadius:'50%'}} alt=""/>)
                                                        : (<img src={IconAvatar} alt=""/>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="data">
                                                <div className="infosStudent">
                                                    <h3>{ userClass && userClass.student && userClass.student.user.name} </h3>
                                                    <ClassToolCardItem/>   
                                                </div> 
                                                <ul>
                                                    <li>{this.t('CARD_PLAN_LEVEL')}: 

                                                    { userClass && userClass.studentPlan && userClass.studentPlan.plan.trial && userClass.studentPlan.studentPlanLanguages.length > 0 && (
                                                        <span> {t(userClass.studentPlan.studentPlanLanguages[0].studentLanguageLevel)}</span>
                                                    )} 

                                                    { userClass && userClass.studentPlan && !userClass.studentPlan.plan.trial && 
                                                        <span>
                                                            {userClass.student && userClass.student.studentLevelGrades.map(userLevel => {
                                                                return (<span key={userLevel.level.level}> {userLevel.level.level}</span>)
                                                            })}
                                                        </span>
                                                    }                                                        
                                                    </li>
                                                    <li>
                                                        {/* {this.t('NATIVE_LANGUAGE')}: {userClass && userClass.student && t(userClass.student.studentLanguages[0].language.name.toUpperCase())} */}
                                                        {this.t('NATIVE_LANGUAGE')}: {this.state.languageNative}
                                                    </li>
                                                    <li>{this.t('COUNTRY')}: {userClass && userClass.student && userClass.student.user.country.name}</li>
                                                    {
                                                        this.state.canSeeStudentPhone && 
                                                        userClass && userClass.student && 
                                                        userClass.student.user.userPhones.map((phone, i) => {return (
                                                            <li key={i*12}>{this.t('TELEPHONE')}:
                                                                <span key={`${phone.phone}`}>{phone.phone}</span>
                                                            </li>)})
                                                    }
                                                </ul>

                                                <div className="local">
                                                    <h2>{this.t('LOCAL_CLASS_TIME')}</h2>
                                                    <h3>
                                                        {console.log('userClass.recurrentSchedule :: ', userClass)}
                                                        <MomentLocalDate date={userClass.originalScheduledDateTimeUTC} locale={this.i18n.language}></MomentLocalDate>
                                                        &nbsp; • &nbsp;
                                                        {this.t(this.state.tagDays[userTimezoneConvert2(userClass.originalScheduledDateTimeUTC, 'UTC', userClass.student.user.timezone).day()])}  
                                                        &nbsp; • &nbsp;
                                                       {userClass.originalScheduledDateTimeUTC && moment(userTimezoneConvert2(userClass.originalScheduledDateTimeUTC, 'UTC', userClass.student.user.timezone), 'HH:mm:ss').format('hh:mm A')}
                                                        &nbsp; - &nbsp;
                                                        {userClass.originalScheduledDateTimeUTC && moment(userTimezoneConvert2(userClass.originalScheduledDateTimeUTC, 'UTC', userClass.student.user.timezone).add((userClass.sequentialSchedule === false ? 30 : (30 * userClass.sequentialScheduleClassesCount)), "minutes"), 'HH:mm:ss').format('hh:mm A')}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                        { (status === 'done' && this.state.roleNow == 'student') || (this.state.roleNow == 'companyManager' || this.state.roleNow == 'coordinator' || this.state.roleNow == 'customerService') ?
                                            <div className="infos">
                                                <div>
                                                    <h2>{this.t('CARD_CLASS_TEACHER')}</h2>
                                                    <div className="avatar">
                                                        {(userClass.teacher && userClass.teacher.picture)
                                                            ? (<img src={userClass.teacher.picture} style={{borderRadius:'50%'}} alt=""/>)
                                                            : (<img src={IconAvatar} alt=""/>)
                                                        }
                                                    </div>
                                                </div>
                                                {userClass.teacher &&
                                                    <div className="data">
                                                        {this.state.roleNow !== 'student' && this.state.roleNow !== 'teacher' ?
                                                            <select onChange={this.handleChange} name='teacherId' value={this.state.teacherId} disabled={this.state.isTeacher || editTeacherDisabled()}>
                                                                <option value="">Select</option>
                                                                {this.state.teachers.map(itemTeacher => {
                                                                    return (<option key={itemTeacher.id*213} value={itemTeacher.id}> {itemTeacher.name}</option>)}
                                                                )} 
                                                            </select> : <select name='teacherId' value={this.state.teacherId} disabled>
                                                                <option value="">Select</option>
                                                                {this.state.teachers.map(itemTeacher => { 
                                                                    return (<option key={itemTeacher.id*2} value={itemTeacher.id}> {itemTeacher.name}</option>)}
                                                                )}
                                                            </select>
                                                        }
                                                       
                                                        {
                                                             
                                                            userClass.teacher &&
                                                           
                                                            <ul>
                                                                {
                                                                   
                                                                    this.state.roleNow !== 'student' &&
                                                                    <li>                                                           
                                                                        <div className="rating startList">
                                                                            <strong>{this.t('AVARAGE_RATING')}:</strong>
                                                                            {' '}
                                                                            <span className="grades">{userClass.teacher.averageRating}</span>
                                                                            {' '}
                                                                            <Rating
                                                                            emptySymbol="fa fa-star-o fa-2x"
                                                                            fullSymbol="fa fa-star fa-2x"
                                                                            start={0}
                                                                            initialRating={userClass.teacher.averageRating}
                                                                            readonly = {true} 
                                                                            />
                                                                        </div>
                                                                    </li>
                                                                }
                                                                    {userClass.teacher.teacherLanguages.map(itemTeacherLang => {
                                                                        return (
                                                                            <span key={JSON.stringify(itemTeacherLang)}>  
                                                                                {itemTeacherLang.isNative && itemTeacherLang.language &&
                                                                                    <li>{this.t('NATIVE_LANGUAGE')}: {itemTeacherLang.language.name}</li>
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    )}
                                                                <li>{this.t('COUNTRY')}: {userClass.teacher.user.country && userClass.teacher.user.country.name}</li>

                                                                {
                                                                    this.state.roleNow !== 'student' &&
                                                                        userClass.teacher.user.userPhones.map(itemTeacherPhone => {
                                                                            return ( 
                                                                                <span key={itemTeacherPhone.phone}>  
                                                                                    <li>{this.t('TELEPHONE')}: {itemTeacherPhone.phone}</li>
                                                                                </span>
                                                                            )}
                                                                        )
                                                                }          
                                                            </ul>
                                                        }
                                                        <div className="local">
                                                            <h2>{this.t('LOCAL_CLASS_TIME')}</h2>
                                                            <h3>
                                                                <MomentLocalDate date={userClass.originalScheduledDateTime} locale={this.i18n.language}></MomentLocalDate>
                                                                &nbsp; • &nbsp;
                                                                {this.t(this.state.tagDays[new Date(userClass.originalScheduledDateTime).getDay()])}  
                                                                &nbsp; • &nbsp;

                                                            
                                                                {
                                                                    userClass.teacher != null ? 

                                                                    <div>
                                                                        {userClass.teacher.user.timezone && moment(userTimezoneConvert2(userClass.originalScheduledDateTimeUTC, 'UTC', userClass.teacher.user.timezone), 'HH:mm:ss').format('hh:mm A')}
                                                                        &nbsp; - &nbsp;
                                                                        {userClass.teacher.user.timezone && moment(userTimezoneConvert2(userClass.originalScheduledDateTimeUTC, 'UTC', userClass.teacher.user.timezone).add(30, "minutes"), 'HH:mm:ss').format('hh:mm A')}
                                                                    </div>
                                                                    
                                                                    :
                                                                    
                                                                    <div>                                                                        
                                                                        &nbsp; - &nbsp;                                                                    
                                                                    </div>

                                                                }
                                                                
                                                                
                                                            </h3>
                                                        </div>
                                                    </div>
                                                }

                                                {! userClass.teacher &&
                                                    <div className="data">
                                                        {this.state.roleNow !== 'student' && this.state.roleNow !== 'teacher' ?
                                                            <select onChange={this.handleChange} name='teacherId' disabled={editTeacherDisabled()} value={this.state.teacherId}>
                                                                <option value="">Select</option>
                                                                {this.state.teachers.map(itemTeacher => {                  
                                                                    return (   
                                                                        <option key={itemTeacher.id*8} value={itemTeacher.id}>{itemTeacher.name}</option>
                                                                    )}
                                                                )}   
                                                                </select> : <select onChange={this.handleChange} name='teacherId' value={this.state.teacherId} disabled>
                                                                {this.state.teachers.map(itemTeacher => {                  
                                                                    return (   
                                                                        <option key={itemTeacher.id*9} value={itemTeacher.id}>{itemTeacher.name}</option>
                                                                    )}
                                                                )}   
                                                            </select>
                                                        } 
                                                        <ul>
                                                            <li><strong>{this.t('AVARAGE_RATING')}:</strong> </li>
                                                            <li>{this.t('NATIVE_LANGUAGE')}:  </li>
                                                            <li>{this.t('COUNTRY')}: </li>
                                                            <li>{this.t('TELEPHONE')}: </li>
                                                        </ul>
                                                        <div className="local">
                                                            <h2>{this.t('LOCAL_CLASS_TIME')}</h2>
                                                            <h3></h3>
                                                            
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        :
                                        null
                                        }
                                    </div>
                                </div>

                                {this.state.canSeeNoShowSwitch && <div>
                                    <hr/>
                                    <div className="classInfo">
                                        <h2>{this.t('CARD_CLASS_DETAILS')}</h2>

                                        <div className="infoItem">
                                            <div className="item">
                                                <h3>{this.t('CARD_CLASS_ATTENDED')}</h3>
                                                <div className="switchBox">
                                                    <div className="switch__container">
                                                        <input
                                                            id="switch-shadow"
                                                            className="switch switch--shadow"
                                                            name="noShow"
                                                            type="checkbox"
                                                            checked={this.state.noShow}
                                                            onChange={this.handleChange}
                                                        />
                                                        <label htmlFor="switch-shadow">
                                                            <span style={{marginLeft: '50px', fontSize: '12px'}}>
                                                                {this.state.noShow ? this.t('YES') : this.t('NO')}
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    <hr/>
                                </div>}

                                { this.state.status === 'canceled' && this.state.classScheduleDetails && 
                                    <div className="cancel">
                                        <h2>{this.t('CARD_CLASS_CANCEL')}</h2>
                                        <div className="boxWhite">
                                            { this.state.classScheduleDetails.map((classDetail, index) =>
                                                <div className="boxItem" key={index*8}>
                                                    <div className="infos">
                                                        {/* <div className="avatar">
                                                            <img src={IconAvatar} alt=""/>
                                                        </div>  */}
                                                        <div className="text">
                                                            <div className="name"> {/* <span>Michael Caine</span>*/} {this.t('CARD_CLASS_CANCELLED')}</div>
                                                            <div className="Reason"><strong>{this.t('CARD_CLASS_REASON')}:</strong> {classDetail.canceledDetails}</div>
                                                            <span><strong>{this.t('DATA_TIME')}:</strong> { this.userTimezoneConvert(classDetail.updatedAt, 'UTC').format(this.props.t('DATE_FORMAT') + ' - hh:mm A')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <hr/>
                                    </div>
                                }

                                { this.state.status === 'canceledLingo' || this.state.status === 'canceledFreeLingo' && this.state.classScheduleDetails && 
                                    <div className="cancel">
                                        <h2>{this.t('CARD_CLASS_CANCEL')}</h2>
                                        <div className="boxWhite">
                                            { this.state.classScheduleDetails.map((classDetail, index) =>
                                                <div className="boxItem" key={index*8}>
                                                    <div className="infos">
                                                        {/* <div className="avatar">
                                                            <img src={IconAvatar} alt=""/>
                                                        </div>  */}
                                                        <div className="text">
                                                            <div className="name"> {/* <span>Michael Caine</span>*/} {this.t('CARD_CLASS_CANCELLED')}</div>
                                                            <div className="Reason"><strong>{this.t('CARD_CLASS_REASON')}:</strong> {classDetail.canceledDetails}</div>
                                                            <span><strong>{this.t('DATA_TIME')}:</strong> { this.userTimezoneConvert(classDetail.updatedAt, 'UTC').format(this.props.t('DATE_FORMAT') + ' - hh:mm A')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <hr/>
                                    </div>
                                }
                                <div className="buttons">
                                <CancelCardItem />
                                    <div>
                                        <button onClick={(e) => this.props.history.goBack()} ><i className="fa fa-angle-left" aria-hidden="true"></i>{this.t('BTN_BACK')}</button>
                                        {
                                            this.state.roleNow !== 'teacher' && this.state.status !== 'canceled' && this.state.status !== 'canceledLingo' && 
                                            <button className="save" onClick={this.handleSubmit} disabled={editDisabled() && ! this.state.canSeeNoShowSwitch}>{this.t('BTN_SAVE')}</button>   
                                        }
                                    </div>                                     
                                </div>
                            </ClassD>  
                        </div>
                    </div>}
            </section>
            <Dialog
                id="dialog-error"
                open={this.state.genericError !== ''}
                TransitionComponent={Transition}
                keepMounted>
                
                <DialogTitle id="dialog-error-title">
                    <div>Oops</div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-error-message">
                        {this.state.genericError}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.setState({ genericError: ''})}} color="primary">
                    OK
                    </Button>
                </DialogActions>
            </Dialog>
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
        </div>)
    }
}

Details.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}

const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = dispatch => ({
    getListSequentialClass: async (sequentialID) => dispatch( await getListSequentialClass(sequentialID)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Details)))

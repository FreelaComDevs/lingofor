import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";
import { FlagIcon } from "react-flag-kit";
import { connect } from 'react-redux'
import Idioma from '../../../i18n'
import { getNextClasses, getRequestedClasses } from '../../../actions/userActions'
import Services from "../../_api/Services";
import moment from "moment";
import PlaceholderText from "../../_common/placeholder/placeholderText";
import { Request } from "./styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import scheduleAllocation from "../../../images/img_class-multiple-classes-allocation.png";
import scheduleSequential from "../../../images/schedule/img_class-multiple-classes.png";
import Loading from 'react-fullscreen-loading';
import {MomentHelpers} from '../../_common/momentLocalDate/momentLocalDate';
import queryString from 'query-string'
import Pagination from '../pagination';

import Service from '../../../components/_api/Services'
import timezone from 'moment-timezone'
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

const serv = new Service()
let count = 0;
let saveIndex = 0;
let dataClass = [];
let bundlerClass = false;
  class RequestClass extends Component {
    
    serv = new Services()
    url = "classSchedules/teacher/"

    constructor (props) {
      super(props);
      
      const localData = JSON.parse(localStorage.getItem("@lingo"));
      this.state = {
        loading: false,
        openAlert: false,
        openAlertTeacher: false,
        teacherId: Number(localData.teacherId),
        alertRecurrencyMsg: "",
        alertTitle: "",
        alertMsg: "",
        alertImg: "",
        alertClasses: [],
        totalPages: 0,
        pageNumber: 1,
        pageSize: 10,
        totalFound:0,
        role: localData.role
      }    
    }

    
    componentDidMount(){
      const { pageNumber } = this.state
      this.setState({loading:true})
      this.props.user.requestedClasses = null
      //this.indexkey = Idioma.language == 'pt' ? 'pt_BR' : Idioma.language == 'en' ? 'en_US' : Idioma.language == 'es' ? 'es' : 'en_US'
      this.getRequested(pageNumber)
    }

    async getRequested (pageNumber) {
      console.log('pageNumber:: ', pageNumber);
      const { getRequestedClasses } = this.props      
      await this.setState({pageNumber:pageNumber,loading: true})
      getRequestedClasses(pageNumber)
    } 
    

    componentDidUpdate(prevProps, prevState, snapshot)
    {
      if (this.props.user.requestedClasses !== prevProps.user.requestedClasses) {
        // this.dataClass = this.props.user.requestedClasses;
        count = 0;
        const array = [];
        let saveCod = [];
        const saveSchedule = [];
        let startTime = '';
        let repeat = false;
        console.log('this.props.user.requestedClasses: ', this.props.user.requestedClasses);
        if(this.props.user.requestedClasses.length > 0){
          this.props.user.requestedClasses.map((el, index) => {
            //limita o numero de aulas
            // if(index < 10){
              const time = this.userTimezoneConvert(el.originalScheduledDateTimeUTC,'UTC');
              const user = this.serv.getUserFromToken();
              const resp = timezone.tz(el.originalScheduledDateTimeUTC, 'UTC').clone().tz(user.timezone);
              const initialDate = MomentHelpers.formatHelper(time, this.props.i18n.language);
              const initialDay = this.props.t(time.format("dddd"));
              const initialTime = time.format("hh:mm A");
              const finalTime = time.clone().add(30, "minutes").format("hh:mm A");
              const schedule = `${initialDate} • ${initialDay} • ${initialTime} - ${finalTime}`;
              const semAgrupamento = false;
              if(semAgrupamento == true){
                el.timeTotal = schedule;
                array.push(el);
              }else{
                if(el.sequentialSchedule == true){
                  //agrupamento das aulas sequenciais
                  let numeroAulas = el.sequentialScheduleClassesCount;
                  let cont = 0;
                  if(saveCod.includes(el.allocationScheduleId) === false){
                    saveCod.push(el.allocationScheduleId);
                    for(let a = 0; a < this.props.user.requestedClasses.length; a++){
                      if(this.props.user.requestedClasses[a].allocationScheduleId == el.allocationScheduleId){
                        cont++;
                        if(cont == numeroAulas){
                          //gravar aula no array
                          const user2 = this.serv.getUserFromToken();
                          const resp2 = timezone.tz(this.props.user.requestedClasses[a].originalScheduledDateTimeUTC, 'UTC').clone().tz(user2.timezone);
                          const atualDate2 = this.serv.getLocalTimeFromUtcAdd();
                          //verifica a data da aula com a data atual
                          const formatDateAtual = atualDate2.format("YYYY-MM-DDTHH:mm:ss.sss");
                          const startT = moment(formatDateAtual, "YYYY-MM-DDTHH:mm:ss.sss");
                          const endT = moment(resp2, "YYYY-MM-DDTHH:mm:ss.sss");
                          const hoursDiff = endT.diff(startT, 'minutes');
                          console.log('REQUEST HOJE -> hoursDiff ',(hoursDiff + 30))
                          if((hoursDiff + 30) > 0){
                            const time2 = resp2;
                            const initialDate2 = MomentHelpers.formatHelper(time2, this.props.i18n.language);
                            const initialDay2 = this.props.t(time2.format("dddd"));
                            const finalTime2 = time2.clone().add(30, "minutes").format("hh:mm A");
                            const total = this.timeConvert(numeroAulas * 30);
                            let schedule2 = `${initialDate} • ${initialDay} • ${startTime} - ${finalTime2} ${total}`;
                            //verificar se a aula tem o mesmo horario
                            if(saveSchedule.length > 0){
                              repeat = saveSchedule.includes(schedule2);
                              console.log('repeat :: ', repeat);
                              if(!repeat){
                                //aula de horario diferente
                                //gravar aula no array
                                saveSchedule.push(schedule2);
                                el.timeTotal = schedule2;
                                count++;
                                array.push(el);
                              }
                            }else{
                              //aula de horario diferente
                              //gravar aula no array
                              saveSchedule.push(schedule2);
                              el.timeTotal = schedule2;
                              count++;
                              array.push(el);
                            }
                          }
                        }else{
                          //gravar inicio da aula
                          if(cont == 1){
                            startTime = initialTime.toString();
                          }
                        }
                      }
                    }
                  }
                }else{
                  //nao tem agrupamento
                  const atualDate2 = this.serv.getLocalTimeFromUtcAdd();
                  console.log('REQUEST -> atualDate2 ',atualDate2);
                  console.log('REQUEST -> time ',time);
                  const formatDateAtual = atualDate2.format("YYYY-MM-DDTHH:mm:ss.sss");
                  const startT = moment(formatDateAtual, "YYYY-MM-DDTHH:mm:ss.sss");
                  const endT = moment(resp, "YYYY-MM-DDTHH:mm:ss.sss");
                  const hoursDiff = endT.diff(startT, 'minutes');
                  console.log('REQUEST -> hoursDiff ',(hoursDiff + 30))
                  console.log('REQUEST -> startT ',startT)
                  console.log('REQUEST -> endT ',endT);
                  console.log('REQUEST -> formatDateAtual ',formatDateAtual);
                  console.log('REQUEST -> finalTime ',finalTime)
                  if((hoursDiff + 30) > 0){
                    if(saveSchedule.length > 0){
                      repeat = saveSchedule.includes(schedule);
                      console.log('REQUEST -> repeat:: ', repeat);
                      if(!repeat){
                        //aula de horario diferente
                        //gravar aula no array
                        saveSchedule.push(schedule);
                        el.timeTotal = schedule;
                        count++;
                        array.push(el);
                      }
                    }else{
                      //aula de horario diferente
                      //gravar aula no array
                      saveSchedule.push(schedule);
                      el.timeTotal = schedule;
                      count++;
                      array.push(el);
                    }
                  }
                }
              }
            // }
          })
          //ordenacao
          array.sort((a,b) => a.sequentialScheduleClassesCount < b.sequentialScheduleClassesCount ? 1 : -1).sort((a,b) => a.originalScheduledDateTimeUTC > b.originalScheduledDateTimeUTC ? 1 : -1);
          this.dataClass = array;
          this.setState({loading:false})
        }
        else{
          this.dataClass = [];
          this.setState({loading:false})
        }
      }
    }

    timeConvert = (n) =>{
      let num = n;
      let hours = (num / 60);
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      return rminutes == 0 ? `• (${rhours}h)` : `• (${rhours}h:${rminutes}m)`;
    }

    getPageNumberCurrent = () => {
      console.log('getPageNumberCurrent')
      const params = queryString.parse(this.props.location.search);
      const { pageNumber }  = this.state

      if(params && params["page"]){
        if(params["page"].toString() !== pageNumber.toString()){
          this.getRequested(Number(params["page"]))
        }      
      }
    }

    // pagination = (page, type) => {
    //   console.log('==> pagination: ', page, ' ==> type: ', type)
    //   // const { pageNumber }  = this.state
    //   // if(page.toString() === pageNumber.toString())
    //   //   return
  
    //   // this.getRequested(page)
    // }

    pagination = (page) => {
      console.log('==> pagination: ', page);
      const num = (page + 1);
      console.log('==> pagination num: ', num);
      // const { pageNumber }  = this.state
      // if(page.toString() === pageNumber.toString())
      //   return
  
      this.getRequested(num)
    }

    userTimezoneConvert(time, timeTimezone) {
      console.log('userTimezoneConvert')
      const user = serv.getUserFromToken()
      return timezone.tz(time, timeTimezone).clone().tz(user.timezone)
    }

    reloadPage = () => {
      window.location.reload(false);
    }

    acceptHandle = async (item) => {
      const { 
        allocationSchedule,
        allocationScheduleId,
        sequentialSchedule,
        sequentialScheduleId,
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
        const firstWeekClasses = classes.filter( item => item.time.isSame(classes[0].time, 'day'))
        
        if (classes.length > 1) {
          this.setState({
            openAlert: true,
            alertImg: scheduleAllocation,
            alertTitle: "Fixed Scheduling",
            alertMsg: "MULTYPLE_CLASSES_MESSAGE",
            alertItem: item,
            alertClasses: firstWeekClasses,
            alertRecurrencyMsg 
          })
        } else { return this.acceptedHandle(item) }
      } else if (sequentialSchedule) {
        const { requestedClasses } = this.props.user
        const alertClasses = requestedClasses        
        .filter( item => item.sequentialScheduleId === sequentialScheduleId )
        .map( item => {
          const time = this.userTimezoneConvert(item.originalScheduledDateTimeUTC,'UTC')
          const initialDate = time.format("DD/MM/YYYY")
          const dayWeek = this.props.t(time.format("dddd"))
          const initialTime = time.format("h:mm a")
          const finalTime = moment(item.scheduledEndDateTime).format('h:mm a')
          const schedule = `${initialDate} • ${dayWeek} • ${initialTime} - ${finalTime}`
          return { flag, language: name, schedule }
        })

        this.setState({
          openAlert: true,
          alertImg: scheduleSequential,
          alertTitle: "MULTYPLE_CLASSES",
          alertMsg: "MULTYPLE_CLASSES_MESSAGE",
          alertItem: item,
          alertClasses: alertClasses
        })
      } else { 
        return this.acceptedHandle(item) 
      }
    }

    acceptedHandle = async (item) => {
      console.log('acceptedHandle')
      const { 
        props: { t }
      } = this
      
    this.setState({loading: true})
    const { url, state: { teacherId, pageNumber }, props: { getNextClasses, getRequestedClasses }} = this
    const { sequentialScheduleId, allocationScheduleId, allocationSchedule } = item
      
      if (allocationSchedule === "random") {
        const submitObj = { teacherId, sequentialScheduleId }
        this.serv.ApiPosts(`${url}${teacherId}/acceptSequentialSchedule`, submitObj)
          //.then(() => { getRequestedClasses(pageNumber); getNextClasses(); this.setState({loading: false, openAlert: false})})
          .then(() => { this.reloadPage(); this.setState({loading: false, openAlert: false})})
          .catch(err => {
            const errorMessage = err.data ? err.data.error.message[t("INDEX_KEY_ERROR")] : err.error.message;
            this.setState({
              loading:false,
              openAlert: false,
              openAlertTeacher: true,
              alertMessage: errorMessage
            }); console.log("ERROR ON ACCEPT CLASS", err)
          })
      }
      if (allocationSchedule === "fixed") {
        const submitObj = { teacherId, allocationScheduleId }
        this.serv.ApiPosts(`${url}${teacherId}/acceptAllocationSchedule`, submitObj)
          //.then(() => { getRequestedClasses(pageNumber); getNextClasses(); this.setState({loading: false, openAlert: false})})
          .then(() => { this.reloadPage(); this.setState({loading: false, openAlert: false})})
          .catch(err => {
              const errorMessage = err.data ? err.data.error.message[t("INDEX_KEY_ERROR")] : err.error.message;
              this.setState({
              loading:false,
              openAlertTeacher: true,
              alertMessage: errorMessage
          }); 
          console.log("ERROR ON ACCEPT CLASS", err)
        })
      }
    }

    closeAlert = () => {
      this.setState({ openalert: false })
    }

    closeTeacher = () => {
      const { state: {}, props: { getNextClasses, getRequestedClasses }} = this
      getRequestedClasses({pageNumber :this.state.pageNumber}); 
      getNextClasses();
      this.setState({
        openAlert: false,
        openAlertTeacher: false
    });
  }

    render() {
      const { 
        closeAlert,
        closeTeacher,
        acceptHandle,
        acceptedHandle,
        state: { 
          alertMsg,
          alertRecurrencyMsg,
          alertImg,
          alertTitle,
          alertClasses,
          alertItem,
          openAlert,
          openAlertTeacher,
          alertMessage,
          loading,
          pageNumber
        },
        props: { t, user: { requestedClasses, totalPages, totalFound, sequentialScheduleId } }
      } = this
      
      return (
        <div>
          <Loading loading={loading} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
          <Request>
            <div className="container">
              <div className="nextClass">
                <h2 style={{paddingBottom:'10px'}}><strong>{t("BTN_NEW_CLASS")}</strong>{" "}{t("BTN_REQUEST")} {" "}</h2>
                { !this.dataClass || !this.dataClass.length ? <PlaceholderText/> : (
                  <div style={{overflowY:'auto', height:'500px'}}>
                    { this.dataClass.map((item, index) => {
                      // if(index >= 10) return
                      return (
                        <div key={"i" + index} className="boxClass">
                          <div className="borderLeft" />
                            <div className="boxInfos">
                              <div className="date">
                                <h3>{item.timeTotal}</h3>
                              </div>
                              <div className="infos">
                                <div className="classContent">
                                  <h4>
                                    <FlagIcon code={item.lingoLanguage.flag}/>
                                    {t(item.lingoLanguage.language.name.toUpperCase())}
                                  </h4>
                                  {item.classScheduleDetails.map((classDetails, i) => (
                                    <div key={"cd" + i}>
                                      <h4>
                                        {t("CARD_CLASS_CONTENT")}:{" "}
                                        {classDetails.focus}
                                        { item.type  === 'trial' && ` • ${t("TRIAL_CLASS")}`}
                                      </h4>
                                    </div>
                                  ))}
                                </div>
                                <div className="status">
                                  <button onClick={() => acceptHandle(item)} className="confirm" >
                                    {this.props.t("BTN_CONFIRM")}{" "}
                                    <i className="fa fa-check-circle-o" aria-hidden="true" />
                                  </button>
                                  <Link to={{ pathname: '/calendar', state: { newSchedule: item }}}>
                                    <button> 
                                      {this.props.t("BTN_VIEW_SCHEDULE")}
                                      <i className="fa fa-angle-right" aria-hidden="true" />
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent:'center', paddingTop: '20px'}}>
                        {totalPages === pageNumber ? 
                          <></>:
                          <button 
                            style={{backgroundColor:'#fe0000', borderRadius:'26px', color:'#fff', border:'none', width:'40%', height:'40px', fontSize:'20px', fontWeight:'500', alignItems:'center', justifyContent:'center'}}
                            onClick={() => this.pagination(pageNumber)}
                          >
                            <span style={{padding:'15px'}}>{this.props.t("LOAD_MORE")}</span>
                          </button>
                        }
                      </div>
                      {/* { <Pagination pageCurrent={pageNumber} pageSize={10} totalPages={totalPages} totalFound={(this.dataClass.length)}  onClick={(page, type) => this.pagination(page, type)}/> } */}
                    </div>
                  )}                   
              </div>
            </div>
          </Request>
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
              <button className="new-button" onClick={() => this.setState({openAlert: false})}>
                {t('CANCEL')}
              </button>
              <button className="new-button" onClick={() => acceptedHandle(alertItem)} autoFocus>
                {t('ACCEPT_SEQUENCE')}
              </button>
            </DialogActions>
          </Dialog> 

          <Dialog open={openAlertTeacher} onClose={closeTeacher} className="alert-dialog-slide">
            <DialogTitle className="alert-dialog-slide-title">
              Erro!
            </DialogTitle>
            <DialogContent className="alert-dialog-slide-content">
              <p className="alert-dialog-text">{alertMessage}</p>
            </DialogContent>
            <DialogActions className="alert-dialog-slide-actions">
              <button className="new-button" onClick={() => closeTeacher()}>
                {t('OK')}
              </button>
            </DialogActions>
          </Dialog>  
        </div>
      );
    }
  }


const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = dispatch => ({
  getNextClasses: data => dispatch(getNextClasses(data)),
  getRequestedClasses: data => dispatch(getRequestedClasses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(RequestClass))

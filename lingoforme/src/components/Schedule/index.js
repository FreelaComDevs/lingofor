import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import PropTypes from 'prop-types';
import { translate } from 'react-i18next'
import Idioma from '../../i18n'
import Loading from 'react-fullscreen-loading'
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import timezone from 'moment-timezone'

import validator from 'validator'
import successImg from "../../images/schedule/img_class-scheduled_success.png";

import AuthService from '../_api/AuthService'
import Services from '../_api/Services'

import Modal from '../_common/modal/index'

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import ScheduleImg from '../../images/icons/icon_schedule_header.svg'

import ErroCode from '../../images/img_GeneralError_232px.png'
import swarmImage from '../../images/img_class-scheduled_busy.png'

import InputDatepicker from '../../elements/NewInputs/InputDatepicker'


import { Schedule } from './styles';

const DialogTitle = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        // color: '#004FFF !important',
        fontSize: '36px',
        fontWeight: 'bold',
        fontFamily: 'Quicksand',
        marginTop: '35px'
    },
    closeButton: {
        top: '10px',
        right: '15px',
        color: '#403F4C',
        position: 'absolute',
        marginBottom: '24px',
        width: '12px',
        height: '12px',
    },
  }))(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing.unit * 2,
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing.unit,
    },
  }))(MuiDialogActions);


class Schedules extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plans: [],
            languages: [],
            planosScehdule:[],
            timeSlots: [],
            oldE: null,
            showRepeat: false,
            isVisibleText: false,
            levels:[],
            totalCount: 0,
            textSpecific: null,

            studentPlanId: 0,
            studentId: 0,
            lingoLanguageId: 0,
            focus: this.props.t('BTN_REGULAR'),
            scheduledStart: '12:00:00',
            scheduledEnd: '12:30:00',
            numberOfClasses: 1,
            repeatWeekDays: [],
            repeatEnd: '',
            scheduledDate: '',
            selectedLanguage: '',

            loading: true,
            openalert: false,
            closeAlert: false,
            alertMsg: '',
            alertTitle: '',

            scheduledStartSelectedIndex: 24,

            userHasMultilingo: false,
            userPlansList: [],

            redirect: false,
            forceRedirect:false,

            httpCode: '',

            isButtonDisabled: false

        }



        this.serv = new Services()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.buttonLanguageHandleChange = this.buttonLanguageHandleChange.bind(this)
        this.btnRepeatHandleChange = this.btnRepeatHandleChange.bind(this)
        this.btnScheduleSubmit = this.btnScheduleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlerSubjectEspecific = this.handlerSubjectEspecific.bind(this)
        this.setDate = this.setDate.bind(this)
        this.setRepeatEnd = this.setRepeatEnd.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this.btnHandleWeekDay = this.btnHandleWeekDay.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleStudent = this.handleStudent.bind(this)

        this._handlerListLanguage = this._handlerListLanguage.bind(this);
        this.planSingle = this.planSingle.bind(this)
        this.languagesSingle = this.languagesSingle.bind(this)

        this._calculaQtdAulas = this._calculaQtdAulas.bind(this)

        let initialSchedule = {
            name: 'scheduledStart',
            value: '12:00:00'
        }

        this.handleChange({target: initialSchedule})

    }


    _handlerListLanguage(v){
        if(v.planos.length === 1){
            this.planSingle(v.planos[0].id)
        }

        if(v.languages.length === 1){
            this.languagesSingle(v.languages[0].lingoLanguageId)
        }
        this.setState({languages: v.languages, planosScehdule: v.planos, planosScehduleLoaded: true })
    }

     componentDidMount(){

        // Tratamento do idioma que vem Backend
        this.indexkey = Idioma.language == 'pt' ? 'pt_BR' : Idioma.language == 'en' ? 'en_US' : Idioma.language == 'es' ? 'es' : 'en_US'

        let localData = JSON.parse(localStorage.getItem ('@lingo'));

        this.setState({
            studentId: localData.studentId,
            loading: false,
        })

        let urlGetUserPlans = `studentplans/get/activeplans?studentId=${localData.studentId}`;
        this.serv.get(urlGetUserPlans)
            .then(res => {

                let planos = [];
                let lingoLanguages = [];
                let languages = []
                res.result.items.map((plan) =>{
                    planos.push(plan);
                    plan.studentPlanLanguages.map((language, index) => {
                        languages.push(language.lingoLanguage.description);
                        lingoLanguages.push(language);
                    })
                });

                const listLangDescription = [... new Set(languages)];
                const newArrayLingoLang = [];
                listLangDescription.map((item, i) => {
                    const s =  lingoLanguages.find((r, i) =>{
                        return r.lingoLanguage.description === item;
                    });
                    newArrayLingoLang.push(s);
                });

                this._handlerListLanguage(
                    {languages: newArrayLingoLang, planos: planos}
                )


        })
        .catch(err => console.log('err getPlans ', err))

        //Get Time Slots
        let urlGetTimeSlots = 'classSchedules/classTimes';
        this.serv.get(urlGetTimeSlots)
        .then(res => {
            this.setState({
                timeSlots: res.result.items
            })
        //console.log("TimeSlots: " + JSON.stringify(res.result.items))
        })
        .catch(err => console.log('err getLanguages ', err))

    }

    closeAlert(e){

        if (this.state.redirect){

            this.setState({
                openalert: false,
                redirect: false,
                forceRedirect:true
             })

             //window.location = '/'

        }else{

            this.setState({
                openalert: false,
                redirect: false,
                openSwarm: false
            })

        }

    }

    buttonLanguageHandleChange(e, obj) {

        this.setState({
          [e.target.name]: (e.target.id),
          lingoLanguageId: obj.id,
          lingoLanguage: obj
        }, () => {
          const filterPlan = this._filterGetPlan()
          if (filterPlan.length === 1) {
            this.planSingle(filterPlan[0].id)
            return <span>{filterPlan[0].plan.nameEnglish}</span>
          }
        })

       //console.log(this.state.lingoLanguageId)

    }

    planSingle(id) {
        if(id === this.state.studentPlanId) return

        this.setState({
            studentPlanId: id
        })

    }

    languagesSingle(id) {

        //const obj = (e.target.value)

        //console.log('Plano unico' , id)

        this.setState({
            lingoLanguageId: id
        })



    }

    handleStudent(id){
        this.setState({
            studentPlanId: id
        })
    }

    btnRepeatHandleChange(e){

        if (e.target.name == 'yes'){
            this.setState({
                showRepeat: true
             })
        } else {
            this.setState({
                showRepeat: false
             })
        }

    }



    btnHandleWeekDay(e){

        //Simple verification
        for (var i = 0; i <  this.state.repeatWeekDays.length; i++){
            if (e.target.value == this.state.repeatWeekDays[i].weekDayId){
                this.state.repeatWeekDays.splice(i,1);
                e.target.className = '';
                return;
            }

        }

        e.target.className = 'active'

        this.state.repeatWeekDays.push({"weekDayId": parseInt(e.target.value)})
        //console.log('repeatWeekDays ' + JSON.stringify(this.state.repeatWeekDays))

    }

    handleChange (e) {

        if (e.target.name === 'scheduledStart'){

            for (var item = 0;  item < this.state.timeSlots.length; item++){

                if (this.state.timeSlots[item].start == e.target.value){
                    if(this.state.numberOfClasses == 0){
                        this._calculaQtdAulas(true)

                        this.setState({
                            //scheduledEnd:e.target.value,
                            scheduledStartSelectedIndex:item
                        })
                        continue
                    }else {
                        var index = (parseInt(item) + parseInt(this.state.numberOfClasses))
                        this._calculaQtdAulas(true)
                        this.setState({
                            //scheduledEnd:this.state.timeSlots[index].start,
                            scheduledStartSelectedIndex:item
                        })
                        continue
                    }

                }

            }

        } else if ( e.target.name === 'numberOfClasses'){

                if (e.target.value == 'Select'){
                    this.setState({
                        scheduledEnd: '12:30:00'
                    })
                } else {
                    this._calculaQtdAulas(true)

                    this.setState({
                        //scheduledEnd: this.state.timeSlots[this.state.scheduledStartSelectedIndex + (parseInt(e.target.value))].start
                    })
                }
        }


        this.setState({
            [e.target.name]: (e.target.value === 'Select') ? 0 : e.target.value,
        })
      }

      handlerSubjectEspecific (e){
        var value = e.target.value

        var bool = value === this.t('BTN_SPECIFIC') ? true : false

        this.setState({isVisibleText:bool,textSpecific:null})

        this.handleChange(e)        
      }

      setDate(birth_date) {
        this.setState({scheduledDate : birth_date})
      }

      setRepeatEnd(repeatEndDate) {
        this.setState({repeatEnd : repeatEndDate})
      }

    btnScheduleSubmit = () => {
      this.setState({loading:true})

      if (!this.validateForm())  {
        this.setState({loading:false, isButtonDisabled: false})
        return
      }

      let postScheduleObject = [];
      console.log(this.state.showRepeat)
      if (this.state.showRepeat) {
        postScheduleObject = {
          'studentPlanId' : parseInt(this.state.studentPlanId),
          'studentId' : parseInt(this.state.studentId),
          'lingoLanguageId' : parseInt(this.state.lingoLanguageId),
          'focus': this.state.focus ,
          'specificSubject' : this.state.textSpecific ,
          'scheduledStart' : (this.state.scheduledDate.format('YYYY-MM-DD')) + "T" + this.state.scheduledStart +".000",
          'scheduledEnd' : (this.state.scheduledDate.format('YYYY-MM-DD')) + "T" + this.state.scheduledEnd + ".000",
          'numberOfClasses' : parseInt(this.state.numberOfClasses),
          'repeat' : this.state.showRepeat,
          'repeatWeekDays' : this.state.repeatWeekDays,
          'repeatEnd': this.state.repeatEnd
        }
      } else {
        postScheduleObject = {
          'studentPlanId' : Number(this.state.studentPlanId),
          'studentId' : parseInt(this.state.studentId),
          'lingoLanguageId' : parseInt(this.state.lingoLanguageId),
          'focus':  this.state.focus,
          'specificSubject' : this.state.textSpecific ,
          'scheduledStart' : (this.state.scheduledDate.format('YYYY-MM-DD')) + "T" + this.state.scheduledStart +".000",
          'scheduledEnd' : (this.state.scheduledDate.format('YYYY-MM-DD')) + "T" + this.state.scheduledEnd + ".000",
          'numberOfClasses' : parseInt(this.state.numberOfClasses),
          'repeat' : this.state.showRepeat
        }
      }
      
      this.setState({postScheduleObject, isButtonDisabled: true})
      this.serv.ApiPosts("classSchedules/check", {
        studentId: postScheduleObject.studentId,
        studentPlanId: postScheduleObject.studentPlanId,
        lingoLanguageId: postScheduleObject.lingoLanguageId,
        scheduledStart: postScheduleObject.scheduledStart,
        numberOfClasses: postScheduleObject.numberOfClasses
      })
        .then( res => { this.postSchedule() })
        .catch( res => { if(res.status === 409) {
          const key = this.t("MESSAGE_LANGUAGE")
          const message = res.data.error.message[key].slice(0,-1)
          const alternativeTimes = message.split(",")
          const alternativeTimesMessage = alternativeTimes[0]
          alternativeTimes.shift()
          this.setState({ alternativeTimesMessage, alternativeTimes, openSwarm: true, isButtonDisabled: false })
        }})
    }

    postSchedule = (newTime) => {
      this.setState({openSwarm: false})
      const postObj = Object.assign({}, this.state.postScheduleObject)
      if(newTime) {
        postObj.scheduledStart = newTime
      }
      //Post Schedule
      let urlPostSchedule = 'classSchedules';
      this.serv.ApiPosts(urlPostSchedule, postObj)
        .then(res => {
          this.setState({
            loading: false,
            redirect: true,
            openalert: true,
            alertTitle: this.t('BTN_CLASS_SCHEDULED'),
            alertMsg: '<div className="container"><br> <img src="'+successImg+'"/> <br> ' + this.t('BTN_SCHEDULE_ADDED') + '</div>',
            isButtonDisabled: false
          })
        })
        .catch(err => {
          console.log('err post schedule ', err)
          //getting the error messages
          if (err.data.error !== null && (err.data.error.httpCode === '400' || err.data.error.httpCode === '500')){
            console.log("diferente == 500 ou 400")
            var errorMessagesConcat = ''
            for (var item in err.data.error){
              errorMessagesConcat += '\n' + err.data.error[item].message
              console.log('Error Msg: ' + err.data.error[item].message)
            }

            this.setState({
              loading:false,
              alertTitle: this.t('SOMETHING_WENT_WRONG'),
              httpcode: err.data.error.httpCode,
              openalert: true,
              alertMsg: '<img src="'+ErroCode+'"/>',
              isButtonDisabled: false
            })
          } else {
            console.log("diferente de 500 e 400 ====", err.data.error.httpCode)
            const hasMessage = err.data.error.message && err.data.error.message[this.indexkey]
            const message = hasMessage ? err.data.error.message[this.indexkey] : this.t('ERROR_MESSAGE')
            this.setState({
              loading: false,
              alertTitle: this.t('ERROR_MESSAGE'),
              openalert: true,
              httpcode: err.data.error.httpCode,
              alertMsg: message,
              isButtonDisabled: false
            })
          }
        })

        // setTimeout(() => this.setState({ isButtonDisabled: false }), 5000);
    }

    validateForm(){
        console.log(this.state.lingoLanguageId)

        if (this.state.lingoLanguageId == ''|| this.state.lingoLanguageId == null || this.state.lingoLanguageId == undefined || this.state.lingoLanguageId == 0){

            this.setState({
                loading:false,
                alertTitle: this.t('ERROR_MESSAGE'),
                openalert: true,
                alertMsg: this.t('VALIDATE_SCHEDULE_LANG')
            })

            return false;

        }

        if (this.state.totalCount >= 2 && this.state.studentPlanId == 0){

            this.setState({
                loading:false,
                alertTitle: this.t('ERROR_MESSAGE'),
                openalert: true,
                alertMsg: this.t('VALIDATE_SCHEDULE_PLAN')
            })

            return false;

        }

        if (this.state.studentPlanId == '' || this.state.studentPlanId == null || this.state.studentPlanId == undefined){

          this.setState({
            loading:false,
            alertTitle: this.t('ERROR_MESSAGE'),
            openalert: true,
            alertMsg: this.t('VALIDATE_SCHEDULE_PLAN')
          })

          return false;

        }

        if (this.state.focus == ''|| this.state.focus == null || this.state.focus == undefined || this.state.focus == 0){

            this.setState({
                loading:false,
                alertTitle: this.t('ERROR_MESSAGE'),
                openalert: true,
                alertMsg: this.t('VALIDATE_SCHEDULE_FOCUS')
            })

            return false;

        }

        if (this.state.scheduledDate == '' || this.state.scheduledDate == null || this.state.scheduledDate == undefined || this.state.scheduledDate == 0){

            this.setState({
                loading:false,
                alertTitle: this.t('ERROR_MESSAGE'),
                openalert: true,
                alertMsg: this.t('VALIDATE_SCHEDULE_DATE')
            })

            return false;

        }

        if (this.state.scheduledStart == ''|| this.state.scheduledStart == null || this.state.scheduledStart == undefined || this.state.scheduledStart == 0){

            this.setState({
                loading:false,
                alertTitle: this.t('ERROR_MESSAGE'),
                openalert: true,
                alertMsg: this.t('VALIDATE_SCHEDULE_START')
            })

            return false;

        }

        if (this.state.numberOfClasses == ''|| this.state.numberOfClasses == null || this.state.numberOfClasses == undefined || this.state.numberOfClasses == 0){

            this.setState({
                loading:false,
                alertTitle: this.t('ERROR_MESSAGE'),
                openalert: true,
                alertMsg: this.t('VALIDATE_SCHEDULE_NUM_CLASSES')
            })

            return false;

        }

        if (this.state.showRepeat){

                if (this.state.repeatWeekDays == ''|| this.state.repeatWeekDays == null || this.state.repeatWeekDays == undefined || this.state.repeatWeekDays > 0){

                    this.setState({
                        loading:false,
                        alertTitle: this.t('ERROR_MESSAGE'),
                        openalert: true,
                        alertMsg: this.t('VALIDATE_SCHEDULE_WEEKREPEAT')
                    })

                    return false;

                }

                if (this.state.repeatEnd == ''|| this.state.repeatEnd == null || this.state.repeatEnd == undefined || this.state.repeatEnd == 0){

                    this.setState({
                        loading:false,
                        alertTitle: this.t('ERROR_MESSAGE'),
                        openalert: true,
                        alertMsg: this.t('VALIDATE_SCHEDULE_REPEATEND')
                    })

                    return false;

                }

            }



        return true;

    }

    _filterGetPlan = () => {
      const { planosScehdule = [], lingoLanguage } = this.state

      return planosScehdule.filter(item => {
        if (lingoLanguage === undefined) {
          return item.studentPlanLanguages.indexOf(lingoLanguage)
        }

        return item.studentPlanLanguages.find( val => val.lingoLanguage.id === lingoLanguage.id )
      })
    }

    getPlan(){
      const { studentPlanId } = this.state

      const filterPlan = this._filterGetPlan()
      if (filterPlan.length === 1) {
        return <span>{filterPlan[0].plan.nameEnglish}</span>
      }

      return (
        <select required name='studentPlanId' value={studentPlanId} onChange={this.handleChange}>
          <option value="">{this.t('SELECT')}</option>
          {filterPlan.map(planTeste => {
            return (
              <option value={planTeste.id}>
                {planTeste.plan.nameEnglish}
              </option>
            )})
          }
        </select>
      )
    }

    // addMinutes (dateTime, minutes, convertToJsDateTime) {
    //     if (convertToJsDateTime) {
    //         return moment(dateTime).add(minutes, 'minutes').format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
    //     } else {
    //     return moment(dateTime).add(minutes, 'minutes')
    //     }
    // }


    // faz o calculo da quantidade de horas,
    _calculaQtdAulas(setState){
        let qtd = this.state.numberOfClasses;

        let hourClass = this.state.scheduledStart !== undefined  && this.state.scheduledStart !== '' ? " "+this.state.scheduledStart : "12:00:00";

        hourClass = hourClass.replace(" ", ""); // remove qualquer espaço que venha na string

        // pega a data selecionada no calender date já formatada
        const date = this.state.scheduledDate !== '' ?  this.state.scheduledDate : moment().format('YYYY-MM-DD')
        let dataStart = moment(date).format('YYYY-MM-DD'); // captura a data selecionada e remove o time
        let dataFim = moment( dataStart + "T"+ hourClass+".000").format('YYYY-MM-DD HH:mm:ss'); // soma a data do calendario com o horário selecionado
            if(qtd > 0 && hourClass !== '') {
                qtd = 30 * qtd; // 30 minutos vezes a quantidade de aulas selecionado
                dataFim = moment(dataFim, 'YYYY-MM-DD HH:mm:ss').add(qtd, 'minutes'); // adiciona a quantidade de minutos (1 aula = 30 minutos)
            }

            if( setState == true){
                this.setState ({
                    scheduledEnd: dataFim
                })
            }
        return moment(dataFim).format('hh:mm A'); // formata a hora que data irá finalizar e retorna



    }

    render() {
        const { forceRedirect } = this.state;
        if (forceRedirect) {
            return <Redirect to='/'/>;
        }

        return (
            <div className="view">
                <Dialog open={this.state.openSwarm} onClose={() => this.postSchedule()} className="alert-dialog-slide boxModal">
                  <DialogTitle className="alert-dialog-slide-title">
                    <h2>{this.t("SWARMING_TITLE")}</h2>
                  </DialogTitle>
                  <DialogContent className="alert-dialog-slide-content">
                    <img src={swarmImage} alt="Swarm Image"/>
                    <p>{this.state.alternativeTimesMessage}</p>
                    <div className="timesBox">
                      {this.state.alternativeTimes && this.state.alternativeTimes.length > 0 && this.state.alternativeTimes.map(time => (
                        <button className="new-button" onClick={() => this.postSchedule(time)} autoFocus>
                          {moment(time).format('HH:mm')}
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                  <DialogActions className="alert-dialog-slide-actions">
                    <button className="new-button" onClick={() => this.postSchedule()} autoFocus>
                      {this.t('NO_THANKS')}
                    </button>
                  </DialogActions>
                </Dialog>
                <SideMenu />

                <section>

                    <Header />

                    <Loading loading={this.state.loading} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>

                    <div>
                        <Dialog
                            open={this.state.openalert}
                            onClose={this.closeAlert}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >

                            <DialogTitle id="alert-dialog-title" onClose={this.closeAlert}><div style={{color: this.state.httpCode == '400' || this.state.httpCode == '500' ? '#FF5666' : '#004FFF'}} dangerouslySetInnerHTML={{ __html: this.state.alertTitle }} /></DialogTitle>
                            <DialogContent>
                                <DialogContentText id="pass-dialog-description" className="boxModal">
                                    <div dangerouslySetInnerHTML={{ __html: this.state.alertMsg }} />
                                    {/* <div className="boxModal">
                                        <img src={successImg} alt="" />
                                        <h3>{this.t('BTN_SCHEDULE_ADDED')}</h3>
                                    </div> */}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="boxModal">
                                <Button className="buttons" onClick={this.closeAlert} color="primary" autoFocus>
                                    {
                                        this.state.httpCode === '400' || this.state.httpCode === '500' ? this.t('TRY_AGAIN') : this.t('BTN_CLOSE')
                                    }

                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div className="toptitle">
                        <img src={ScheduleImg} alt={this.t('ITEM_SCHEDULE')}/>
                        <h1>{this.t('ITEM_SCHEDULE')}</h1>
                    </div>

                    <div className="container">
                        <Schedule>
                                <div className="boxWhite">
                                        <div className="selectDays">
                                            <h2>{this.t('BTN_SCHEDULE_NEW_CLASS')} </h2>

                                            <h4>{this.t('LANGUAGE')}:</h4>
                                            <ul>

                                            {
                                                this.state.languages.map((lang,i) => {

                                                return (

                                                    <div key={'lang'+i}>
                                                        <li>
                                                            <div>
                                                                <label className={this.state.lingoLanguageId == lang.lingoLanguage.id ? 'active' : '' }>{this.t(lang.lingoLanguage.description)}
                                                                    <input type="radio" value={lang.lingoLanguage.id} name='lingoLanguageId' onClick={(e) => this.buttonLanguageHandleChange(e, lang.lingoLanguage)} />
                                                                </label>
                                                            </div>
                                                        </li>
                                                    </div>
                                                )})
                                            }

                                                <li>
                                                    <div className="plan">
                                                        <div>
                                                            <span>{this.t('PLAN')}:</span>
                                                            {this.getPlan()}
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            <div className="focus">
                                                    <h4>{this.t('FOCUS')}:</h4>

                                                    <ul>
                                                        <li>
                                                            <select name='focus' value={this.focus} onChange={this.handlerSubjectEspecific}>
                                                              {/* <option>{this.t('SELECT')}</option> */}
                                                                <option value={this.t('BTN_REGULAR')}>{this.t('BTN_REGULAR')}</option>
                                                                <option value={this.t('BTN_SPECIFIC')}>{this.t('BTN_SPECIFIC')}</option>
                                                            </select>
                                                        </li>

                                                        { this.state.isVisibleText ? (
                                                            <input type="text" id='textSpecific' name="textSpecific" value={this.state.textSpecific} onChange={this.handleChange} className="input-lingo" placeholder={this.t('Class_Subject')}/>
                                                        ) : null }

                                                    </ul>


                                                </div>

                                            <div className="time">

                                                <ul>
                                                    <li>
                                                        <span>{this.t('DATE')}:</span>
                                                        <div className="lineInputs">

                                                            {/* <input type="date" id='date' name="scheduledDate" value={this.state.scheduledDate} onChange={this.handleChange}/> */}
                                                            <DatePicker id='date' name='scheduledDate' dateFormat={this.t('DATE_FORMAT')}
                                                            showMonthDropdown showYearDropdown selected={this.state.scheduledDate}
                                                            calendarClassName='customCalendar' placeholderText={this.t('DATE_FORMAT')}
                                                            customInput={<InputDatepicker />}
                                                            onChange={this.setDate} todayButton={this.t('TODAY')} />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <span>{this.t('BTN_START_TIME')}:</span>
                                                        <select name='scheduledStart' onChange={this.handleChange}>
                                                                    <option>{this.t('SELECT')}</option>
                                                        {this.state.timeSlots.map(timeSlots => {
                                                            //const select = timeSlots.start === '12:00:00' ? 'selected'  :  ''
                                                            return (

                                                                <option value={timeSlots.start} selected={timeSlots.start === '12:00:00'} key={timeSlots.start}>{moment(timeSlots.start,'HH:mm:ss').format('hh:mm A')}</option>

                                                            )})}
                                                        </select>
                                                    </li>
                                                    <li>
                                                     <span>{this.t('BTN_NUMBER_CLASSES')}:</span>
                                                        <select  name='numberOfClasses' value={this.state.numberOfClasses} onChange={this.handleChange}>
                                                            <option value='Select'>{this.t('SELECT')}</option>
                                                            <option value='1'>1 </option>
                                                            <option value='2'>2 </option>
                                                            <option value='3'>3 </option>
                                                            <option value='4'>4 </option>
                                                            <option value='5'>5 </option>
                                                            <option value='6'>6 </option>
                                                            <option value='7'>7 </option>
                                                            <option value='8'>8 </option>
                                                            <option value='9'>9 </option>
                                                            <option value='10'>10 </option>
                                                        </select>
                                                    </li>
                                                    <li>
                                                        <span>{this.t('BTN_END_TIME')}:</span>

                                                        {/*}
                                                        <select name='scheduledEnd' value={this.state.scheduledEnd} disabled>
                                                        {this.state.timeSlots.map(timeSlots => {
                                                            return (

                                                                    <option selectedIndex={this.state.scheduledEndSelectedIndex} value={timeSlots.start}>{timeSlots.start}</option>

                                                            )})}
                                                        </select>
                                                            */}

                                                             {/* <button className="button-blue">{this.state.scheduledEnd}</button> */}

                                                             <button className="button-blue">{this._calculaQtdAulas()}</button>
                                                    </li>
                                                </ul>

                                            </div>

                                            <div className="time">
                                                <h4>¿{this.t('REPEAT')}?</h4>

                                                <ul>
                                                    <li>
                                                        <button onClick={this.btnRepeatHandleChange} className={this.state.showRepeat ? '' : 'active'} name='no'>{this.t('BTN_NO')}</button>
                                                    </li>
                                                    <li>
                                                        <button onClick={this.btnRepeatHandleChange} className={this.state.showRepeat ? 'active' : ''} name='yes'>{this.t('BTN_YES')}</button>
                                                    </li>
                                                </ul>

                                            </div>

                                            <div id='repeatClass' className="repeatClass" style={{display: this.state.showRepeat ? 'block' : 'none' }}>
                                                <h4>{this.t('BTN_DAYS_TO_REPEAT_CLASS')}:</h4>
                                                <ul>
                                                    <li>
                                                        <button id='WEEK_SUNDAY' value='0' onClick={this.btnHandleWeekDay}>{this.t('WEEK_SUNDAY')}</button>
                                                    </li>
                                                    <li>
                                                        <button id='WEEK_MONDAY' value='1' onClick={this.btnHandleWeekDay}>{this.t('WEEK_MONDAY')}</button>
                                                    </li>
                                                    <li>
                                                        <button id='WEEK_TUESDAY' value='2' onClick={this.btnHandleWeekDay}>{this.t('WEEK_TUESDAY')}</button>
                                                    </li>
                                                    <li>
                                                        <button id='WEEK_WEDNESDAY' value='3' onClick={this.btnHandleWeekDay}>{this.t('WEEK_WEDNESDAY')}</button>
                                                    </li>
                                                    <li>
                                                        <button id='WEEK_THURSDAY' value='4' onClick={this.btnHandleWeekDay}>{this.t('WEEK_THURSDAY')}</button>
                                                    </li>
                                                    <li>
                                                        <button id='WEEK_FRIDAY' value='5' onClick={this.btnHandleWeekDay}>{this.t('WEEK_FRIDAY')}</button>
                                                    </li>
                                                    <li>
                                                        <button id='WEEK_SATURDAY' value='6' onClick={this.btnHandleWeekDay}>{this.t('WEEK_SATURDAY')}</button>
                                                    </li>
                                                    <li>
                                                        <span>{this.t('BTN_REPEAT_UNITIL')}:</span>
                                                        <div className="lineInputs">
                                                                {/* <input type="date" id='repeatEnd' name="repeatEnd" value={this.state.repeatEnd} onChange={this.handleChange}/> */}
                                                                <DatePicker id='repeatEnd' name='repeatEnd' dateFormat={this.t('DATE_FORMAT')}
                                                                showMonthDropdown showYearDropdown selected={this.state.repeatEnd}
                                                                calendarClassName='customCalendar' placeholderText={this.t('DATE_FORMAT')}
                                                                customInput={<InputDatepicker />}
                                                                onChange={this.setRepeatEnd} todayButton={this.t('TODAY')} />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                </div>
                                <div className="buttons">
                                    <button className="button-blue" onClick={() => this.btnScheduleSubmit()} disabled={this.state.isButtonDisabled}>{this.t('BTN_SCHEDULE')}</button>
                                </div>

                        </Schedule>
                    </div>
                </section>
            </div>
        );
    }
}

Schedules.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}

export default translate('translations')(Schedules)

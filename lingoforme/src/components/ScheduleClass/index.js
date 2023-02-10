import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Services from '../_api/Services'
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
import successImg from "../../images/schedule/img_class-scheduled_success.png";
import ErroCode from '../../images/img_GeneralError_232px.png'
import { Schedule } from './styles';

class Schedules extends Component {
  state = this.initialState
  get initialState() {
    let localData = JSON.parse(localStorage.getItem ('@lingo'));

    return {
      studentId: localData.studentId,
      plans: [],
      languages: [],
      plansSchedule:[],
      timeSlots: [],
      levels:[],
      repeatWeekDays: [
        { label: "WEEK_SUNDAY", value: 0, selected: false },
        { label: "WEEK_MONDAY", value: 1, selected: false },
        { label: "WEEK_TUESDAY", value: 2, selected: false },
        { label: "WEEK_WEDNESDAY", value: 3, selected: false },
        { label: "WEEK_THURSDAY", value: 4, selected: false },
        { label: "WEEK_FRIDAY", value: 5, selected: false },
        { label: "WEEK_SATURDAY", value: 6, selected: false },
      ],
      oldE: null,
      userPlansList: [],
      showRepeat: false,
      isVisibleText: false,
      totalCount: 0,
      textSpecific: null,
      studentPlanId: 0,
      lingoLanguageId: 0,
      focus: '',
      scheduledStart: '12:00:00',
      scheduledEnd: '12:30:00',
      numberOfClasses: 0,
      repeatEnd: '',
      scheduledDate: '',
      selectedLanguage: '',
      loading: false,
      openalert: false,
      closeAlert: false,
      alertMsg: '',
      alertTitle: '',
      scheduledStartSelectedIndex: 23,
      userHasMultilingo: false,
      redirect: false,
      httpCode: ''
    }
  }

  serv = new Services()

  _handlerListLanguage = (v) => {
    if(v.planos.length === 1){
      this.setState({ studentPlanId: v.planos[0].id })
    }

    if(v.languages.length === 1){
      this.setState({ lingoLanguageId: v.languages[0].lingoLanguageId })
    }

    this.setState({languages: v.languages, plansSchedule: v.planos })
  }

  componentDidMount() {
    this.indexkey = Idioma.language === 'pt' ? 'pt_BR' : Idioma.language === 'en' ? 'en_US' : Idioma.language === 'es' ? 'es' : 'en_US'
    this.serv.get(`studentplans/getbystudentid/${this.state.studentId}`)
      .then(res => {
        let planos = [];
        let lingoLanguages = [];
        let languages = []
        res.result.items.map((plan) =>{
          planos.push(plan);
          plan.studentPlanLanguages.map((language) => {
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
        const languagesResult = newArrayLingoLang;
        this._handlerListLanguage({languages: languagesResult, planos: planos})
      })
      .catch(err => console.log('err getPlans ', err))
      let urlGetTimeSlots = 'classSchedules/classTimes';
      this.serv.get(urlGetTimeSlots)
      .then(res => {
        this.setState({
          timeSlots: res.result.items
        })
      })
      .catch(err => console.log('err getLanguages ', err))
  }

  closeAlert = (e) => {
    if (this.state.redirect){
      this.setState({ openalert: false, redirect: false })
      this.props.history.push("/")

    } else{
      this.setState({ openalert: false, redirect: false })
    }
  }

  buttonLanguageHandleChange = (e, obj) => {
    const { name, id } = e.target
    this.setState({ [name]: (id), lingoLanguageId: obj.id, lingoLanguage: obj })
  }

  btnRepeatHandleChange = (e) => {
    this.setState({ showRepeat: e.target.name === "yes" ? true : false })
  }

  handleActiveRepeatDay = (e) => {
    const { value } = e.target
    const newRepeatWeekDays = [...this.state.repeatWeekDays]
    newRepeatWeekDays[value] = {
      ...newRepeatWeekDays[value],
      selected: !newRepeatWeekDays[value].selected
    }
    this.setState({ repeatWeekDays: newRepeatWeekDays })
  }

  handleChange = (e) => {
    if (e.target.name === 'scheduledStart'){
      for (var item = 0;  item < this.state.timeSlots.length; item++){
        if (this.state.timeSlots[item].start === e.target.value){
          if(this.state.numberOfClasses === 0){
            this.setState({ scheduledEnd:e.target.value, scheduledStartSelectedIndex:item })
            continue
          }else {
            var index = (parseInt(item) + parseInt(this.state.numberOfClasses))
            this.setState({
              scheduledEnd:this.state.timeSlots[index].start,
              scheduledStartSelectedIndex:item
            })
            continue
          }
        }
      }
    } else if ( e.target.name === 'numberOfClasses'){
      if (e.target.value === 'Select'){
        this.setState({ scheduledEnd: '12:00:00' })
      } else { this.setState({ scheduledEnd: this.state.timeSlots[this.state.scheduledStartSelectedIndex + (parseInt(e.target.value))].start })}
    }
    this.setState({[e.target.name]: (e.target.value === 'Select') ? 0 : e.target.value})
  }

  submitHandle = () => {
    this.setState({ loading:true })

    if (!this.validateForm())  {
      this.setState({ loading:false })
      return
    }

    let submitObj = [];
    if (this.state.showRepeat) {
      submitObj = {
        'studentPlanId' : parseInt(this.state.studentPlanId),
        'studentId' : parseInt(this.state.studentId),
        'lingoLanguageId' : parseInt(this.state.lingoLanguageId),
        'focus': this.state.focus ,
        'specificSubject' : this.state.textSpecific ,
        'scheduledStart' : (this.state.scheduledDate) + "T" + this.state.scheduledStart +".000",
        'scheduledEnd' : (this.state.scheduledDate) + "T" + this.state.scheduledEnd + ".000",
        'numberOfClasses' : parseInt(this.state.numberOfClasses),
        'repeat' : this.state.showRepeat,
        'repeatEnd': this.state.repeatEnd
      }
    } else {
      submitObj = {
        'studentPlanId' : Number(this.state.studentPlanId),
        'studentId' : parseInt(this.state.studentId),
        'lingoLanguageId' : parseInt(this.state.lingoLanguageId),
        'focus':  this.state.focus,
        'specificSubject' : this.state.textSpecific ,
        'scheduledStart' : (this.state.scheduledDate) + "T" + this.state.scheduledStart +".000",
        'scheduledEnd' : (this.state.scheduledDate) + "T" + this.state.scheduledEnd + ".000",
        'numberOfClasses' : parseInt(this.state.numberOfClasses),
        'repeat' : this.state.showRepeat
      }
      console.log('POST Schedule:' + JSON.stringify(submitObj))
      //Post Schedule
      let urlPostSchedule = 'classSchedules';
      let errorMessagesConcat = '';
      this.serv.ApiPosts(urlPostSchedule, submitObj)
        .then(res => {
          console.log("result Post Schedule: " + JSON.stringify(res))
          this.setState({
            loading: false,
            redirect: true,
            openalert: true,
            alertTitle: this.props.t('BTN_CLASS_SCHEDULED'),
            alertMsg: '<div className="container"><br> <img src="'+successImg+'"/> <br> ' + this.props.t('BTN_SCHEDULE_ADDED') + '</div>'
          })
        })
        .catch(err => {
          console.log('err post schedule ', err)
          //getting the error messages
          if (err.data.error !== null && (err.data.error.httpCode === '400' || err.data.error.httpCode === '500')){
            console.log("diferente === 500 ou 400")
            for (var item in err.data.error){
              errorMessagesConcat += '\n' + err.data.error[item].message
              console.log('Error Msg: ' + err.data.error[item].message)
            }
            this.setState({
              loading:false,
              alertTitle: this.props.t('SOMETHING_WENT_WRONG'),
              httpcode: err.data.error.httpCode,
              openalert: true,
              alertMsg: '<img src="'+ErroCode+'"/>'
            })
          } else {
            console.log("diferente de 500 e 400 ====", err.data.error.httpCode)
            this.setState({
              loading: false,
              alertTitle: this.props.t('ERROR_MESSAGE'),
              openalert: true,
              httpcode: err.data.error.httpCode,
              alertMsg: err.data.error.message[`${this.indexkey}`]
            })
          }
        })
    }
  }

  validateForm = () => {
    if (this.state.lingoLanguageId === ''|| this.state.lingoLanguageId === null || this.state.lingoLanguageId === undefined || this.state.lingoLanguageId === 0){
      this.setState({
        loading:false,
        alertTitle: this.props.t('ERROR_MESSAGE'),
        openalert: true,
        alertMsg: this.props.t('VALIDATE_SCHEDULE_LANG')
      })
      return false;
    }
    if (this.state.totalCount >= 2 && this.state.studentPlanId === 0){
      this.setState({
        loading:false,
        alertTitle: this.props.t('ERROR_MESSAGE'),
        openalert: true,
        alertMsg: this.props.t('VALIDATE_SCHEDULE_PLAN')
      })
      return false;
    }
    if (this.state.studentPlanId === '' || this.state.studentPlanId === null || this.state.studentPlanId === undefined){
      this.setState({
        loading:false,
        alertTitle: this.props.t('ERROR_MESSAGE'),
        openalert: true,
        alertMsg: this.props.t('VALIDATE_SCHEDULE_PLAN')
      })
      return false;
    }
    if (this.state.focus === ''|| this.state.focus === null || this.state.focus === undefined || this.state.focus === 0){
      this.setState({
        loading:false,
        alertTitle: this.props.t('ERROR_MESSAGE'),
        openalert: true,
        alertMsg: this.props.t('VALIDATE_SCHEDULE_FOCUS')
      })
      return false;
    }
    if (this.state.scheduledDate === '' || this.state.scheduledDate === null || this.state.scheduledDate === undefined || this.state.scheduledDate === 0){
      this.setState({
        loading:false,
        alertTitle: this.props.t('ERROR_MESSAGE'),
        openalert: true,
        alertMsg: this.props.t('VALIDATE_SCHEDULE_DATE')
      })
      return false;
    }
    if (this.state.scheduledStart === ''|| this.state.scheduledStart === null || this.state.scheduledStart === undefined || this.state.scheduledStart === 0){
      this.setState({
        loading:false,
        alertTitle: this.props.t('ERROR_MESSAGE'),
        openalert: true,
        alertMsg: this.props.t('VALIDATE_SCHEDULE_START')
      })
      return false;
    }
    if (this.state.numberOfClasses === ''|| this.state.numberOfClasses === null || this.state.numberOfClasses === undefined || this.state.numberOfClasses === 0){
      this.setState({
        loading:false,
        alertTitle: this.props.t('ERROR_MESSAGE'),
        openalert: true,
        alertMsg: this.props.t('VALIDATE_SCHEDULE_NUM_CLASSES')
      })
      return false;
    }
    if (this.state.showRepeat){
      if (this.state.repeatWeekDays === ''|| this.state.repeatWeekDays === null || this.state.repeatWeekDays === undefined || this.state.repeatWeekDays > 0){
        this.setState({
          loading:false,
          alertTitle: this.props.t('ERROR_MESSAGE'),
          openalert: true,
          alertMsg: this.props.t('VALIDATE_SCHEDULE_WEEKREPEAT')
        })
        return false;
      }
      if (this.state.repeatEnd === ''|| this.state.repeatEnd === null || this.state.repeatEnd === undefined || this.state.repeatEnd > 0){
        this.setState({
          loading:false,
          alertTitle: this.props.t('ERROR_MESSAGE'),
          openalert: true,
          alertMsg: this.props.t('VALIDATE_SCHEDULE_REPEATEND')
        })
        return false;
      }
    }
    return true;
  }

  getPlan = () => {
    if (this.state.plansSchedule.length > 0){
      const filterPlan = this.state.plansSchedule.filter((item) => {
        if(this.state.lingoLanguage === undefined){
          return item.studentPlanLanguages.indexOf(this.state.lingoLanguage)
        }
        return item.studentPlanLanguages.find((val, index) => {
          const lingoL = this.state.lingoLanguage
          return  val.lingoLanguage.id === lingoL.id;
          return true
        });
      })

      if (filterPlan.length > 1) {
        return (
          <select required name='studentPlanId' value={this.state.studentPlanId} onChange={this.handleChange}  >
            { filterPlan.map(planTeste => <option value={planTeste.id}>{planTeste.plan.nameEnglish}</option> )}
          </select>
        )
      } else if (filterPlan.length > 0) {
        return <span>{filterPlan[0].plan.nameEnglish}</span>
      } else {
        return (
          <select required name='studentPlanId' value={this.state.studentPlanId} onChange={this.handleChange}  >
            {filterPlan.map(planTeste => <option value={planTeste.id}> {planTeste.plan.nameEnglish}</option>)}
          </select>
        )
      }
    }
  }

  handlerSubjectEspecific = (boll, value) => {
    this.setState({ isVisibleText: boll, textSpecific:  !!boll ? this.state.textSpecific :  '', focus: value })
  }

  render() {
    const {
      state,
      props,
      closeAlert,
      handleChange,
      submitHandle,
      handleActiveRepeatDay,
      focus,
      getPlan,
    } = this
    const {
      loading,
      openalert,
      alertTitle,
      httpCode,
      alertMsg,
      languages,
      lingoLanguageId,
      isVisibleText,
      textSpecific,
      numberOfClasses,
      repeatEnd,
      showRepeat,
      scheduledEnd,
      timeSlots,
      scheduledDate,
      repeatWeekDays
    } = state
    const { t } = props
    const numberOfClassesOptions = [1,2,3,4,5,6,7,8,9,10]

    return (
      <div className="view">
          { <Loading loading={loading} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/> }
          <Dialog open={openalert} onClose={closeAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title" onClose={closeAlert}><div style={{color: httpCode === '400' || httpCode === '500' ? '#FF5666' : '#004FFF'}} dangerouslySetInnerHTML={{ __html: alertTitle }} /></DialogTitle>
            <DialogContent>
              <DialogContentText id="pass-dialog-description" className="boxModal">
                <div dangerouslySetInnerHTML={{ __html: alertMsg }} />
              </DialogContentText>
            </DialogContent>
            <DialogActions className="boxModal">
              <Button className="buttons" onClick={closeAlert} color="primary" autoFocus>
                { httpCode === '400' || httpCode === '500' ? t('TRY_AGAIN') : t('BTN_CLOSE') }
              </Button>
            </DialogActions>
          </Dialog>
          <div className="container">
            <Schedule>
              <div className="boxWhite">
                <div className="selectDays">
                  <h2>{t('BTN_SCHEDULE_NEW_CLASS')} </h2>
                  <h4>{t('LANGUAGE')}:</h4>
                  <div>
                  <ul>
                    { languages.map(lang => (
                      <li>
                        <div>
                          <label className={lingoLanguageId === lang.lingoLanguage.id ? 'active' : '' }>{t(lang.lingoLanguage.description)}
                            <input type="radio" value={lang.lingoLanguage.id} name='lingoLanguageId' onClick={(e) => this.buttonLanguageHandleChange(e, lang.lingoLanguage)} />
                          </label>
                        </div>
                      </li>
                    ))}
                    </ul>
                  </div>
                    
                  <div className="focus">
                  <div>
                      <ul>

                      <li>
                      <div className="plan">
                        <div>
                          <span>{t('PLAN')}:</span>
                          {getPlan()}
                        </div>
                      </div>
                    </li>
                  </ul>
                    </div>
                      <div>
                      <h4>{t('FOCUS')}:</h4>
                      <ul>
                        <li>
                          <select name='focus' value={focus} onChange={ ({target: {value}}) => {
                            value ===  t("BTN_SPECIFIC") ? this.handlerSubjectEspecific(true, value) : this.handlerSubjectEspecific(false, value);
                          }}>
                            <option>{t('BTN_REGULAR')}</option>
                            <option>{t('BTN_SPECIFIC')}</option>
                          </select>
                        </li>
                        { isVisibleText && <input type="text" id='textSpecific' name="textSpecific" value={textSpecific} onChange={handleChange} className="input-lingo" placeholder={t('Class_Subject')}/> }
                      </ul>
                      </div>
                    </div>
                    <div className="time">
                      <ul>
                        <li>
                          <span>{t('DATE')}:</span>
                          <div className="lineInputs">
                            <input type="date" id='date' name="scheduledDate" value={scheduledDate} onChange={handleChange}/>
                          </div>
                        </li>
                      </ul>
                        <ul style={{justifyContent: "space-between"}}>
                        <li>
                          <span>{t('BTN_START_TIME')}:</span>
                          <select name='scheduledStart' onChange={handleChange}>
                            {timeSlots.map(timeSlots => (
                              <option value={timeSlots.start} selected={timeSlots.start === '12:00:00'} key={timeSlots.start}>{timeSlots.start}</option>
                            ))}
                          </select>
                        </li>
                        <li style={{width: "75px"}}>
                          <span>{t('BTN_NUMBER_CLASSES')}:</span>
                          <select  name='numberOfClasses' value={numberOfClasses} onChange={handleChange}>
                            <option value='Select'>{"0"}</option>
                            {numberOfClassesOptions.map(num => <option value={num}>{num}</option>)}
                          </select>
                        </li>
                        <li>
                          <span>{t('BTN_END_TIME')}:</span>
                          <button className="button-blue">{scheduledEnd}</button>
                        </li>
                        </ul>
                  </div>
                  <div className="time">
                    <h4>{t('REPEAT')}?</h4>
                    <ul>
                      <li><button className={showRepeat ? '' : 'active'} onClick={ () => this.setState({ showRepeat: false })}>
                        {t('BTN_NO')}
                      </button></li>
                      <li><button className={showRepeat ? 'active' : ''} onClick={ () => this.setState({ showRepeat: true })}>
                        {t('BTN_YES')}
                      </button></li>
                    </ul>
                  </div>
                  <div id='repeatClass' className="repeatClass" style={{display: showRepeat ? 'block' : 'none' }}>
                    <h4>{t('BTN_DAYS_TO_REPEAT_CLASS')}:</h4>
                    <ul>
                      { repeatWeekDays.map(day => <li><button className={day.selected ? "active" : ""} value={day.value} onClick={e => handleActiveRepeatDay(e)}>{t(day.label)}</button></li>)}
                      <li style={{marginTop: "40px"}}><span>{t('BTN_REPEAT_UNITIL')}:</span>
                        <div className="lineInputs">
                          <input type="date" id='repeatEnd' name="repeatEnd" value={repeatEnd} onChange={handleChange}/>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="buttons">
                    <button className="button-blue" onClick={submitHandle}>{t('BTN_SCHEDULE_HOME')}</button>
                  </div>
                </div>
              </div>
             
            </Schedule>
          </div>
      </div>
    );
  }
}

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
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
  root: { margin: 0, padding: theme.spacing.unit },
}))(MuiDialogActions);

export default withRouter(translate('translations')(Schedules))

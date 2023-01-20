import React, { Component, Fragment } from 'react'
import moment from 'moment'
import timezone from 'moment-timezone'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { getLingoLanguages, getLingoClassTimes, getLingoLevels } from '../../actions/lingoActions'
import { getTeachers } from '../../actions/teacherActions'
import { getCoordinators } from '../../actions/coordinatorsActions'
import IconAvatar from '../../images/profile/img_placeholder.svg';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FlagIcon from 'react-flag-kit/lib/FlagIcon'
import Rating from 'react-rating';
import FormControl from '@material-ui/core/FormControl';
import Services from '../../components/_api/Services';
import {ajusteTimeZoneSaoPailo} from '../../components/_common/momentLocalDate/momentLocalDate'

const service = new Services();

class InputForLingoArray extends Component {

    componentDidMount() {
        this.props.getLingoLanguages();
        this.props.getLingoClassTimes();
        this.props.getCoordinators();
        this.props.getLingoLevels();
        this.props.getTeachers({
            status: "true", 
            countryId: "", 
            demoClass: "true", 
            firstClass: "", 
            levelId: "", 
            name: "",
            nativeLanguageId: "",
            otherLanguageId: "",
            ratingFrom: "",
            ratingTo: "",
            skip: "",
            take: ""
        })
    }

    //Essa função converte o horario da aula conforme o timezone do usuário.
    convertTimeFromClassToUser(datetime, originTimezoneClass, format, addtime) {
        const user = service.getUserFromToken()
        let originTimezone = originTimezoneClass
        if (originTimezone && originTimezone === 'America/Sao_Paulo') { 
            originTimezone = 'America/Bahia'
        }
        let utcDate =timezone.tz(datetime, originTimezone).clone().tz('UTC') 
        if(addtime){
            utcDate = utcDate.add(addtime, 'minutes')
        }
       
        return timezone.tz(utcDate, 'UTC').clone().tz(user.timezone).format(format)     
    }

    render() {
        const { props, convertTimeFromClassToUser } = this
        const { 
            t, 
            name, 
            data, 
            timezone,
            addField, 
            removeField, 
            childInputChange, 
            demoClasses: { demoClass },
            teachers: { teachers },
            coordinators: { coordinators },
            lingo: { lingoLanguages, lingoClassTimes, lingoLevels },
            newItem = { 
                lingoLanguageId: { value: "", required: true }, 
                status: { value: "pending" }, 
                scheduledDate: { value: "" }, 
                scheduledStart: { value: ""}, 
                teacherId: { value: "" },
                levelByStudent: { value: "" }, 
                levelByLingo: { value: "" }
            }
        } = props
        const statusOptions = [ "pending", "noShow", "done", "canceled" ].map(option => { return {id: option, name: option }})
        const levelOptions = [ '1','2','3','4','5','6','7','8','9','10' ].map( (option, index) => { return { id: index, name: option }})
        const teachersAndCoordinators = teachers.map(({teacherId, teacherName, nativeLanguageName}) => { return { id: teacherId, name: teacherName, nativeLanguageName }})//.concat(coordinators.map(({userId, user}) => { return { id: userId, name: user.name }}))
        const lingoLevelsOptions = lingoLevels.map( ({id, level}) => { return { id, name: level }})
        const atualDate = service.getLocalTimeFromUtc()        
        return (
        <div className="input-demoClassSchedules-array">     
            <h3>{t("LINGOS")}</h3>
            { data.map( (item, index) => {
                const atualStatus = demoClass && demoClass.demoClassSchedules[index] && demoClass.demoClassSchedules[index].status ? demoClass.demoClassSchedules[index].status : ''
                const originalClasstime = demoClass && demoClass.demoClassSchedules[index] && demoClass.demoClassSchedules[index].originalScheduledDateTimeUTC ? service.userTimezoneConvert(demoClass.demoClassSchedules[index].originalScheduledDateTimeUTC, 'UTC') : ''
                //console.log('tmp', demoClass.demoClassSchedules[index].originalScheduledDateTimeUTC, moment(originalClasstime).format())
                const finishedStatus = atualStatus === 'canceled' || moment(originalClasstime).add(30,'minute').isBefore(atualDate) ? true : false
                return (
                    <div key={name+index} className={`input-demoClassSchedules`}>
                        <div>
                            <div className={`input-lingoLanguageId select-wrapper`}>
                                <FormControl className="languageInput" disabled={item.disabledEdit || finishedStatus}>
                                  <Select 
                                      className={`${!item.lingoLanguageId.value ? "placeholder" : ""} ${item.lingoLanguageId.error?"invalid":""} `}
                                      name={name} 
                                      id={"lingoLanguageId"} 
                                      value={item.lingoLanguageId.value} 
                                      onChange={(e) => childInputChange({id: "lingoLanguageId", name, value: e.target.value}, index)} 
                                      displayEmpty 
                                      disableUnderline
                                  >
                                      <MenuItem value={""} >{ t("SELECT") }</MenuItem>
                                      { lingoLanguages.map((option) => 
                                          <MenuItem key={option.language.name} value={option.id}>
                                              <FlagIcon code={option.flag} number={'22px'}/>&nbsp;
                                              <span className="lingoLanguageItem'">{t(option.language.name.toUpperCase())}</span>
                                          </MenuItem> 
                                      )}
                                  </Select>                      
                                </FormControl>
                            </div>
                            { index > 0 && <button className='new-button remove-button' onClick={ (e) => removeField(e, name, index) }>Delete <i className="fa fa-times-circle-o" aria-hidden="true" /></button> }
                            <div className={`input-status`}>
                                <div className="select-wrapper">
                                    <select data-item={item.status.value.toUpperCase()} name={name} id="status" value={item.status.value} onChange={(e) => childInputChange(e.target, index)} disabled={atualStatus === 'canceled'}>
                                        { statusOptions.map((option) => <option className={option.name.toUpperCase()} key={option.name} value={option.name}>{ demoClass && demoClass.demoClassSchedules[index] && option.name === demoClass.demoClassSchedules[index].status && "●"} {t(option.name.toUpperCase()) }</option> )}
                                    </select>    
                                </div>                
                            </div>
                            { item.lingoLanguageId.value && 
                                <Fragment>
                                    <div className="schedule">
                                        <h4>{ t("SCHEDULE") }</h4>
                                        <div>
                                            <div className={`input-scheduledDate`}>
                                                <label className={!item.disabledEdit && item.scheduledDate.error ? "invalid" : ""} htmlFor={`scheduledDate`}>{ t("DATE") }</label>
                                                <div className={`${!item.scheduledDate.value ? "placeholder" : ""} select-wrapper`}>
                                                    <input 
                                                      className={`${!item.scheduledDate.value ? "placeholder" : ""} ${item.scheduledDate.error?"invalid":""} `} 
                                                      type={"date"} 
                                                      name={name} 
                                                      id={"scheduledDate"} 
                                                      min={(!demoClass || !demoClass.demoClassSchedules[index]) ? atualDate : "false"} 
                                                      value={item.scheduledDate.value} 
                                                      disabled={item.disabledEdit || finishedStatus}
                                                      onChange={(e) => childInputChange(e.target, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`input-scheduledStart`}>
                                                <label className={item.scheduledStart.error ? "invalid" : ""} htmlFor={`scheduledStart`}>{ t("START_TIME") }</label>
                                                <div className={`${!item.scheduledStart.value ? "placeholder" : ""} select-wrapper`}>
                                                    <select className={`${!item.scheduledDate.value ? "placeholder" : ""} ${item.scheduledDate.error?"invalid":""} `} name={name} id="scheduledStart" value={item.scheduledStart.value} onChange={(e) => childInputChange(e.target, index)} disabled={item.disabledEdit || finishedStatus} >
                                                        <option value={""} > { t("SELECT") }</option>
                                                        { lingoClassTimes.map((option) => <option key={option.start} value={option.start}> {moment(option.start, 'HH:mm:ss').format('hh:mm A')} </option> )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={`input-scheduledEnd`}>
                                                <label htmlFor={`scheduledEnd`}>{ t("END_TIME") }</label>
                                                <input type={"text"} name={name} id="scheduledEnd" value={item.scheduledStart.value && item.scheduledDate.value ? moment(`${item.scheduledDate.value} ${item.scheduledStart.value}`).add(30, "minutes").format('hh:mm A') : ""} readOnly/>
                                            </div>
                                            { item.scheduledStart.value && item.scheduledDate.value && <p>{t("SHCEDULING_IN")}<br/><span>{t("STUDENTS_TIMEZONE")}</span></p> }
                                        </div>
                                    </div>
                                    { (item.scheduledDate.value && item.scheduledStart.value && timezone) && 
                                        <div className="schedule_tmz ">
                                            {/* <p>{ service.userTimezoneConvert(`${item.scheduledDate.value} ${item.scheduledStart.value}`, timezone).format('DD/MM/YYYY') } </p> */}
                                            <p>{convertTimeFromClassToUser(item.scheduledDate.value + 'T' + item.scheduledStart.value, timezone, 'DD/MM/YYYY',null)} </p>
                                            
                                            {/* <p>{ service.userTimezoneConvert(`${item.scheduledDate.value} ${item.scheduledStart.value}`, timezone).format('hh:mm A') } </p> */}
                                            <p>{ convertTimeFromClassToUser(item.scheduledDate.value + 'T' + item.scheduledStart.value, timezone,'hh:mm A',null) } </p>
                                            { /* <p>{ service.userTimezoneConvert(`${item.scheduledDate.value} ${item.scheduledStart.value}`, timezone).add(30, "minutes").format('hh:mm A') } </p> */ }
                                            <p>{ convertTimeFromClassToUser(item.scheduledDate.value + 'T' + item.scheduledStart.value, timezone,'hh:mm A',30) } </p>
                                            <p>{t("SHCEDULING_IN")} <span>{t("YOUR_TIMEZONE")}</span></p>
                                        </div>
                                    }
                                    <div className="teacher">
                                        <h4>{ t("ASSIGNED_TEACHER") }</h4>
                                        <div>
                                            <div className="avatar">
                                                <img src={ teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0] && teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0].picture || IconAvatar } alt=""/>
                                            </div>
                                            <div>
                                                <div className={`input-teacherId`}>
                                                    <div className={`${!item.teacherId.value ? "placeholder" : ""} select-wrapper`}>
                                                        <select name={name} id="teacherId" value={item.teacherId.value} onChange={(e) => childInputChange(e.target, index)} disabled={item.disabledEdit || finishedStatus}>
                                                            <option value={""} > { t("SELECT") }</option>
                                                            { teachersAndCoordinators
                                                              .filter(({nativeLanguageName}) => {
                                                                const selectedLanguage = lingoLanguages
                                                                  .find((language) => language.id === item.lingoLanguageId.value )
                                                                return selectedLanguage && nativeLanguageName === selectedLanguage.language.name
                                                              })
                                                              .map((option, index) => <option key={option.name + index} value={option.id}> {option.name} </option> )
                                                            }
                                                        </select>                      
                                                    </div>
                                                </div>
                                                { item.teacherId.value && 
                                                    <div className="teacher-rating">
                                                        <h4>{t('AVARAGE_RATING')}:</h4>
                                                        <p>{ teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0] && teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0].averageRating }</p>
                                                        <Rating
                                                            emptySymbol="fa fa-star-o fa-2x"
                                                            fullSymbol="fa fa-star fa-2x"
                                                            initialRating={ teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0] && Number(teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0].averageRating) }
                                                            readonly = {true} 
                                                        /> 
                                                    </div> 
                                                }
                                                <div className="teacher-info">
                                                    <p>{t("NATIVE_LANGUAGE")}: { teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0] && teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0].nativeLanguageName }</p>
                                                    <p>{t("COUNTRY")}: { teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0] && teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0].countryName }</p>
                                                    <p>{t("TELEPHONE")}: { teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0] && teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0].userPhones && teachers.filter( (teacher) => teacher.teacherId === Number(this.props.data[index].teacherId.value))[0].userPhones.split(",") }</p>
                                                </div> 
                                            </div> 
                                        </div>
                                    </div>
                                    <div className={`input-levelByStudent`}>
                                        <label className={item.levelByStudent.error ? "invalid" : ""} htmlFor="levelByStudent">{ t("LEVEL_BY_STUDENT") }</label>
                                        <span>{ t('REQUIRED_FIELD')}</span>
                                        <div className="select-wrapper">
                                            <select className={item.levelByStudent.error ? "invalid" : ""} name={name} id="levelByStudent" value={item.levelByStudent.value} onChange={(e) => childInputChange(e.target, index)} disabled={item.disabledEdit || finishedStatus}>
                                                <option value={""} > { t("SELECT") }</option>
                                                { levelOptions.map((option, index) => <option key={option.name + index} value={option.name}> {option.name.toUpperCase()} </option> )}
                                            </select>         
                                        </div>             
                                    </div>
                                    <div className={`input-levelByLingo`}>
                                        <label htmlFor="levelByLingo">{ t("REAL_LEVEL") }</label>
                                        <div className="select-wrapper">
                                            <select name={name} id="levelByLingo" value={item.levelByLingo.value} onChange={(e) => childInputChange(e.target, index)}>
                                                <option value={""} > { t("SELECT") }</option>
                                                { lingoLevelsOptions.map((option, index) => <option key={option.name + index} value={option.name}> {option.name} </option> )}
                                            </select>                      
                                        </div>
                                    </div>
                                </Fragment>
                            }
                        </div>
                    </div>
                )
            })}
            
            <button className='new-button add-button' onClick={ (e) => addField(e, name, newItem) }>{t("ADD_NEW_LINGO")} <span className="plus">+</span></button>
        </div>
        )
    }
} 

const mapStateToProps = ({ lingo, teachers, coordinators, demoClasses }) => ({ lingo, teachers, coordinators, demoClasses });
const mapDispatchToProps = dispatch => ({
    getLingoLanguages: data => dispatch(getLingoLanguages(data)),
    getLingoClassTimes: data => dispatch(getLingoClassTimes(data)),
    getTeachers: data => dispatch(getTeachers(data)),
    getCoordinators: data => dispatch(getCoordinators(data)),
    getLingoLevels: data => dispatch(getLingoLevels(data)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(translate('translations')(InputForLingoArray))

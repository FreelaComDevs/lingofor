import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'
import moment from 'moment'
import timezone from 'moment-timezone'
import { addField, removeField } from '../../helpers/inputs'
import { getTeachers } from '../../actions/teacherActions'
import { getLingoLevels } from '../../actions/lingoActions'
import { Fragment } from 'react';
import Service from '../../components/_api/Services'
import IconAvatar from '../../images/profile/img_placeholder.svg';
import Rating from 'react-rating'
const serv = new Service()

class InputLingoArray extends Component {
    state = {
        teacherInfo: ""
    }

    componentDidMount() {
        this.props.getLingoLevels()
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

    userTimezoneConvert(time, timeTimezone) {
        const user = serv.getUserFromToken()
        return timezone.tz(time, timeTimezone).clone().tz(user.timezone)
    }

    teacherChange = (e, name, value, param, index, onChange) => {
        childChange(e, name, value, param, index, onChange)
        let selectedTeacher = this.props.teachers.teachers.filter((teacher) => teacher.teacherId === Number(value[index].teacherId))[0]
        const newTeacherInfo = Object.assign({}, this.state.teacherInfo)
        newTeacherInfo[index] = {
            teacherPicture: selectedTeacher.picture, 
            teacherRating: selectedTeacher.averageRating, 
            teacherNativeLanguage: selectedTeacher.nativeLanguageName, 
            teacherCountry: selectedTeacher.countryName,
            teacherPhone: selectedTeacher.userPhones && selectedTeacher.userPhones.split(",") 
        }
        console.log(newTeacherInfo)
        this.setState({teacherInfo: newTeacherInfo})
    }

    render() {
        const { state, props, teacherChange } = this
        const { teacherInfo } = state
        const { 
            t, 
            name, 
            value, 
            timezone, 
            onChange, 
            required, 
            type, 
            error, 
            lingo: { lingoLanguages, classTimes, levels }, 
            teachers: { teachers }, 
            newItem = { language: "", status: 1, date: "", start: "", teacherId: "", levelByStudent: "", levelByLingo: "" }
        } = props
        const statusOptions = ["DONE", "PENDING", "CANCELLED"].map( (option, index) => { return { id: index, name: option }})
        const teachersOptions = teachers.map( ({teacherId, teacherName}, index) => { return { id: teacherId, name: teacherName }})
        const lingoLevelsOptions = levels.map( ({id, level}, index) => { return { id, name: level }})
        const levelOptions = [ t("BEGINNER"), t("INTERMEDIARY"), t("ADVANCED") ].map( (option, index) => { return { id: index, name: option }})
        const atualDate = moment().format("YYYY-MM-DD");
        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)}`}>
                <h3>{t("LINGOS")}</h3>
                { value.map((item, index) => (
                    <div key={name+index}>
                        <div>
                            <div className={`lineInput`}>
                                <select name={name+index+"lingoLanguageId"} value={item.lingoLanguageId} onChange={(e) => childChange(e, name, value, "lingoLanguageId", index, onChange)}>
                                    <option value={""} > { t("SELECT") }</option>
                                    { lingoLanguages.map((option) => <option key={option.language.name} value={option.id}> {option.language.name} </option> )}
                                </select>                        
                            </div>
                            { index > 0 && <button className='removeInput' onClick={ (e) => removeField(e, name, value, index, onChange) }>Delete <i className="fa fa-times-circle-o" aria-hidden="true" /></button> }
                            <div key={index} className={`lineInput lineInputStatus`}>
                                <select name={name+index+"status"} value={item.status} onChange={(e) => childChange(e, name, value, "status", index, onChange)}>
                                    <option value={""} > { t("SELECT") }</option>
                                    { statusOptions.map((option) => <option key={option.name} value={option.name}> {option.name} </option> )}
                                </select>                        
                            </div>
                        </div>
                        { value[index].lingoLanguageId &&
                            <Fragment>
                                <div className="schedule">
                                    <label htmlFor={`type${item}`}>{ t("SCHEDULE") }</label>
                                    <div>
                                        <div className={`lineInput`}>
                                            <label htmlFor={name+index+"date"}>{ t("DATE") }</label>
                                            <input type={"date"} name={name+index+"scheduledDate"} min={atualDate} value={item.scheduledDate} onChange={(e) => childChange(e, name, value, "scheduledDate", index, onChange)}/>
                                        </div>
                                        <div className={`lineInput`}>
                                            <label htmlFor={name+index+"start"}>{ t("START") }</label>
                                            <select name={name+index+"scheduledStart"} value={item.scheduledStart} onChange={(e) =>  childChange(e, name, value, "scheduledStart", index, onChange)}>
                                                <option value={""} > { t("SELECT") }</option>
                                                { classTimes.map((option) => <option key={option.start} value={option.start}> {option.start} </option> )}
                                            </select>
                                        </div>
                                        <div className={`lineInput end`}>
                                            <label htmlFor={name+index+"end"}>{ t("END") }</label>
                                            <input type={"text"} name={name+index+"end"} value={item.scheduledStart ? moment(`${item.scheduledDate} ${item.scheduledStart}`).add(30, "minutes").format('h:mm:ss') : ""} readOnly/>
                                        </div>
                                        <p>{t("SHCEDULING_IN")}<span>{t("STUDENTS_TIMEZONE")}</span></p>
                                    </div>
                                </div>
                                { (item.scheduledDate && item.scheduledStart && timezone) && 
                                    <div className="schedule_tmz">
                                        <p>{ this.userTimezoneConvert(`${item.scheduledDate} ${item.scheduledStart}`, timezone).format('DD/MM/YYYY') } </p>
                                        <p>{ this.userTimezoneConvert(`${item.scheduledDate} ${item.scheduledStart}`, timezone).format('h:mm:ss') } </p>
                                        <p>{ this.userTimezoneConvert(`${item.scheduledDate} ${item.scheduledStart}`, timezone).add(30, "minutes").format('h:mm:ss') } </p>
                                        <p>{t("SHCEDULING_IN")}<span>{t("YOUR_TIMEZONE")}</span></p>
                                    </div>
                                }
                                <div className="teacher">
                                    <label htmlFor={`type${item}`}>{ t("ASSIGNED_TEACHER") }</label>
                                    <div>
                                        <div className="avatar">
                                            <img src={teacherInfo[index] && teacherInfo[index].teacherPicture || IconAvatar } alt=""/>
                                        </div>
                                        <div>
                                            <div key={index} className={`lineInput`}>
                                                <select name={name+index+"teacherId"} value={item.teacherId} onChange={(e) => teacherChange(e, name, value, "teacherId", index, onChange)}>
                                                    <option value={""} > { t("SELECT") }</option>
                                                    { teachersOptions.map((option) => <option key={option.id} value={option.id}> {option.name} </option> )}
                                                </select>                        
                                            </div>
                                            <div className="teacher-rating">
                                                <h4>{t('AVARAGE_RATING')}:</h4>
                                                <p>{ teacherInfo[index] ? teacherInfo[index].teacherRating : "" }</p>
                                                { teacherInfo[index] && teacherInfo[index].teacherRating && <Rating
                                                    emptySymbol="fa fa-star-o fa-2x"
                                                    fullSymbol="fa fa-star fa-2x"
                                                    initialRating={teacherInfo[index].teacherRating}
                                                    readonly = {true} 
                                                /> }
                                            </div>
                                            <div className="teacher-info">
                                                <p>{t("Native language")}: {teacherInfo[index] ? teacherInfo[index].teacherNativeLanguage : ""}</p>
                                                <p>Country: {teacherInfo[index] ? teacherInfo[index].teacherCountry : ""}</p>
                                                <p>Telephone: {teacherInfo[index] ? teacherInfo[index].teacherPhone : ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`lineInput lineInputLevel ${error ? "invalid" : ""}`}>
                                    <label htmlFor={name}>{ t("LEVEL_BY_STUDENT") }</label>
                                    { required && <span>{ t('REQUIRED_FIELD')}</span> }
                                    <select name={name} value={item.levelByStudent} onChange={(e) => childChange(e, name, value, "levelByStudent", index, onChange)}>
                                        <option value={""} > { t("SELECT") }</option>
                                        { levelOptions.map((option) => <option key={option.name} value={option.name}> {option.name} </option> )}
                                    </select>
                                </div>
                                <div className={`lineInput lineInputLevel ${error ? "invalid" : ""}`}>
                                    <label htmlFor={name}>{ t("REAL_LEVEL") }</label>
                                    { required && <span>{ t('REQUIRED_FIELD')}</span> }
                                    <select name={name} value={item.levelByLingo} onChange={(e) => childChange(e, name, value, "levelByLingo", index, onChange)}>
                                        <option value={""} > { t("SELECT") }</option>
                                        { lingoLevelsOptions.map((option) => <option key={option.name} value={option.name}> {option.name} </option> )}
                                    </select>
                                </div>
                            </Fragment>
                        }
                    </div>
                ))}
                <button className='addInput' onClick={ (e) => addField(e, name, value, newItem, onChange) }>{`Add New Lingo +`}</button>
            </div>
        )
    }
}

const mapStateToProps = ({ lingo, teachers }) => ({ lingo, teachers });

const mapDispatchToProps = dispatch => ({
    getTeachers: data => dispatch(getTeachers(data)),
    getLingoLevels: data => dispatch(getLingoLevels(data)),
});

export default (connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(translate('translations')(InputLingoArray)))

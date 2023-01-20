import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
	addDemoClass, 
	getDemoClass, 
	updateDemoClass, 
	unsetDemoClass, 
	sendDemoClassMessage,
	setDemoClassError,
	unsetDemoClassSuccess,
} from '../../actions/demoClassActions'
import moment from 'moment'
import timezone from 'moment-timezone'
import Form from '../../elements/NewForm';
import IconAvatar from '../../images/profile/img_placeholder.svg';
import Enter from '../../images/btn_send.png';
import DemoClassMessages from './DemoClassMessages';

import InputForText from '../../elements/NewInputs/InputForText';
import InputForLingoPlan from '../../elements/NewInputs/InputForLingoPlan';
import InputForClassTool from '../../elements/NewInputs/InputForClassTool';
import InputForCountry from '../../elements/NewInputs/InputForCountry';
import InputForTimezone from '../../elements/NewInputs/InputForTimezone';
import InputForPhoneArray from '../../elements/NewInputs/InputForPhoneArray';
import InputForLingoArray from '../../elements/NewInputs/InputForLingoArray';
import InputForYesSwitch from '../../elements/NewInputs/InputForYesSwitch';
import {ajusteTimeZoneSaoPailo} from '../_common/momentLocalDate/momentLocalDate'

import Service from '../../components/_api/Services'
const serv = new Service()

class DemoClass extends Component {
	state = this.initialState    
	
	get initialState() {
    const { demoClass } = this.props.demoClasses
	const atualDate = moment.utc();
	
		return {	
			inputs: {
				commercialResponsibleName: (demoClass && demoClass.commercialResponsibleName) ? { value: demoClass.commercialResponsibleName } : { value: "" },
				name: demoClass ? { value: demoClass.name, required: true } : { value: "", required: true },
				email: demoClass ? { value: demoClass.email, required: true } : { value: "", required: true },
				planId: demoClass ? { value: demoClass.planId, required: true } : { value: "", required: true },
				classTool: demoClass ? { value: demoClass.classTool, required: false } : { value: "", required: false },
				classToolId: demoClass ? { value: demoClass.classToolId, required: false } : { value: "", required: false },
				companyName: (demoClass && demoClass.companyName) ? { value: demoClass.companyName, required: true } : { value: "" },
				occupation: (demoClass && demoClass.occupation) ? { value: demoClass.occupation, required: true } : { value: "" },
				countryId: demoClass ? { value: demoClass.countryId, required: true } : { value: "", required: true },
				timezone: demoClass ? { value: demoClass.timezone, required: true } : { value: "", required: true },
				address: demoClass ? { value: demoClass.address, required: true } : { value: "", required: true },
				classConverted: demoClass ? { value: demoClass.classConverted } : { value: false },
				classConvertedEmail: demoClass ? { value: demoClass.classConvertedEmail } : { value: "" },
				message: { value: "" },
				demoClassPhones: demoClass 
					? demoClass.demoClassPhones.map( ({ phone, userPhoneTypeId }) => { 
						return { 
							phone: { value: phone, required: true },
							userPhoneTypeId: { value: userPhoneTypeId, required: true }
						}
					}) 
					: [{ phone: { value: "", required: true }, userPhoneTypeId: { value: "", required: true }}],
					
				demoClassSchedules: demoClass 
					? demoClass.demoClassSchedules.map( ({lingoLanguageId, status, teacher, scheduledDate, scheduledStartTime, originalScheduledDateTimeUTC, container : { levelByStudent, levelByLingo }}) => { 
			
            return { 
              			disabledEdit: moment.utc().isAfter(moment(originalScheduledDateTimeUTC).utc()) ? true :false, 
						lingoLanguageId: { value: lingoLanguageId, required: true }, 
						status: { value: status },  
						teacherId: { value: teacher ? teacher.id : "" },  
						scheduledDate: { value: scheduledDate },
						scheduledStart: { value: scheduledStartTime },
						levelByStudent: { value: levelByStudent, required: true },  
						levelByLingo: { value: levelByLingo }
					}}) : [{ 
						lingoLanguageId: { value: "", required: true }, 
						status: { value: "pending" }, 
						scheduledDate: { value: "" }, 
						scheduledStart: { value: "" }, 
						teacherId: { value: "" },
						levelByStudent: { value: "", required: true }, 
						levelByLingo: { value: "" }
					}]
			}
		}
	}

	componentWillUnmount() {
		this.props.unsetDemoClass()
		this.props.unsetDemoClassSuccess()
		
	}

	inputChange = (change) => {
		const { value, name, type } = change
		if(type === "checkbox") { return this.setState({ inputs: { ...this.state.inputs, [name]: { ...this.state.inputs[name], value: !this.state.inputs[name].value, error: false }}})}
		this.setState({ inputs: { ...this.state.inputs, [name]: { ...this.state.inputs[name], value: value, error: false }}})
	} 

	childInputChange = (data, index ) => {
		const { name, id, value } = data
		let newValue = this.state.inputs[name]
		if (!id) { newValue[index] = { ...this.state.inputs[name][index], value, error: false }}
		else { newValue[index][id] = { ...this.state.inputs[name][index][id], value, error: false }}
		this.setState({ inputs: { ...this.state.inputs, [name]: newValue }})
	}

	addField = (e, name, newItem) => { 
		e.preventDefault()
		let newValue = this.state.inputs[name]
		newValue.push(newItem)
		this.setState({ inputs: { ...this.state.inputs, [name]: newValue }})
	}

	removeField = (e, name, index) => { 
		e.preventDefault()
		let newValue = this.state.inputs[name]
		newValue.splice(index, 1)
		this.setState({ inputs: { ...this.state.inputs, [name]: newValue }})
	}

  submitHandle = async (e) => {
		e.preventDefault()
		const { demoClass } = this.props.demoClasses
		const { inputs } = this.state
		const { t } = this.props

		const submitObj = {}
		inputs.commercialResponsibleName.value && ( submitObj.commercialResponsibleName = inputs.commercialResponsibleName.value )
		inputs.name.value ? ( submitObj.name = inputs.name.value ) : await this.setState({ inputs: { ...this.state.inputs, name: { ...this.state.inputs.name, error: true }}})
		
		inputs.email.value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email.value) ? ( submitObj.email = inputs.email.value.toLowerCase() ) : await this.setState({ inputs: { ...this.state.inputs, email: { ...this.state.inputs.email, error: true }}})
		
		inputs.planId.value ? ( submitObj.planId = Number(inputs.planId.value) ) : await this.setState({ inputs: { ...this.state.inputs, planId: { ...this.state.inputs.planId, error: true }}})
		inputs.classTool.value  && ( submitObj.classTool = inputs.classTool.value ) //: await this.setState({ inputs: { ...this.state.inputs, classTool: { ...this.state.inputs.classTool, error: true }}})
		inputs.classToolId.value  && ( submitObj.classToolId = inputs.classToolId.value ) //: await this.setState({ inputs: { ...this.state.inputs, classToolId: { ...this.state.inputs.classToolId, error: true }}})
		inputs.companyName.value && ( submitObj.companyName = inputs.companyName.value )
		inputs.occupation.value && ( submitObj.occupation = inputs.occupation.value )
		inputs.countryId.value ? ( submitObj.countryId = Number(inputs.countryId.value) ) : await this.setState({ inputs: { ...this.state.inputs, countryId: { ...this.state.inputs.countryId, error: true }}})
		inputs.timezone.value ? ( submitObj.timezone = inputs.timezone.value ) : await this.setState({ inputs: { ...this.state.inputs, timezone: { ...this.state.inputs.timezone, error: true }}})
		inputs.address.value ? ( submitObj.address = inputs.address.value ) : await this.setState({ inputs: { ...this.state.inputs, address: { ...this.state.inputs.address, error: true }}})
		submitObj.classConverted = inputs.classConverted.value
		inputs.classConvertedEmail.value && ( submitObj.classConvertedEmail = inputs.classConvertedEmail.value )
		if(inputs.classConverted.value === true && !inputs.classConvertedEmail.value){
			await this.setState({ inputs: { ...this.state.inputs, classConvertedEmail: { ...this.state.inputs.classConvertedEmail, error: true }}})
		} else { 
			await this.setState({ inputs: { ...this.state.inputs, classConvertedEmail: { ...this.state.inputs.classConvertedEmail, error: false }}}) 
		}
		
		inputs.demoClassPhones.map( async ({phone, userPhoneTypeId}, index) => {
			const newDemoClassPhones = this.state.inputs.demoClassPhones
			!phone.value && (newDemoClassPhones[index].phone.error = true); await this.setState({ inputs: { ...this.state.inputs, demoClassPhones: newDemoClassPhones } })
			!userPhoneTypeId.value && (newDemoClassPhones[index].userPhoneTypeId.error = true); await this.setState({ inputs: { ...this.state.inputs, demoClassPhones: newDemoClassPhones } })
		})
		let invalidDate
		inputs.demoClassSchedules.map( async ({lingoLanguageId, levelByStudent, scheduledDate, originalScheduledDateTimeUTC, scheduledStart}, index) => {
			const newDemoClassSchedules = this.state.inputs.demoClassSchedules
			newDemoClassSchedules[index].lingoLanguageId.error = !lingoLanguageId.value ? true : false
			newDemoClassSchedules[index].levelByStudent.error = !levelByStudent.value ? true : false

			var startClassUTC = timezone.tz(moment(`${scheduledDate.value} ${scheduledStart.value}`), submitObj.timezone).clone().tz('UTC').format('YYYY-MM-DD HH:mm')
      var currentDateTimeUtc = timezone().tz('UTC').format()
      var localCurrentDateTime = timezone.tz(currentDateTimeUtc).tz(submitObj.timezone).format('YYYY-MM-DD HH:mm')

      console.log((moment(startClassUTC).diff(localCurrentDateTime) > 0))

      if(!newDemoClassSchedules[index].disabledEdit && ( (!scheduledDate.value || !scheduledStart.value) || ((moment(startClassUTC).diff(localCurrentDateTime) <= 0) || moment.utc().isAfter(moment(originalScheduledDateTimeUTC).utc())))){
				newDemoClassSchedules[index].scheduledDate.error = true
				newDemoClassSchedules[index].scheduledStart.error = true
			}else{
				newDemoClassSchedules[index].scheduledDate.error = false
				newDemoClassSchedules[index].scheduledStart.error = false
			}
			
			await this.setState({ inputs: { ...this.state.inputs, demoClassSchedules: newDemoClassSchedules } })
		})
		submitObj.demoClassPhones = inputs.demoClassPhones.map(({ userPhoneTypeId, phone }) => { 
			return { userPhoneTypeId: Number(userPhoneTypeId.value), phone: phone.value }
		})
		submitObj.demoClassSchedules = inputs.demoClassSchedules.map(({ lingoLanguageId, status, teacherId, scheduledDate, scheduledStart, levelByStudent, levelByLingo }) => { 
			const submitDemoClassSchedules = {}
				submitDemoClassSchedules.lingoLanguageId = Number(lingoLanguageId.value)
				submitDemoClassSchedules.status = status.value
				submitDemoClassSchedules.levelByStudent = levelByStudent.value
				scheduledStart.value && (submitDemoClassSchedules.scheduledStart = moment(`${scheduledDate.value} ${scheduledStart.value}`).format("YYYY-MM-DDTHH:mm:ss.sss")) 
				levelByLingo.value && (submitDemoClassSchedules.levelByLingo = levelByLingo.value) 
				teacherId.value ? submitDemoClassSchedules.teacherId = Number(teacherId.value) : submitDemoClassSchedules.teacherId = null
			return submitDemoClassSchedules
		})
		if (demoClass) {
			submitObj.id = demoClass.id
			submitObj.demoClassSchedules = submitObj.demoClassSchedules.map((item, index) => { return demoClass.demoClassSchedules[index] ? { ...item, id: demoClass.demoClassSchedules[index].id } : { ...item }})
		}
		const invalid = await document.getElementsByClassName("invalid")
		if (invalid.length) { 			
			for(let f = 0;f < invalid.length;f++){
				if(invalid[f].control && (invalid[f].control.id === 'scheduledDate' || invalid[f].control.id === 'scheduledStart')){
					return this.props.setDemoClassError(t("VALIDATE_SCHEDULE_DATE_PAST")) 
				}
				if(invalid[f].control && invalid[f].control.id === 'email'){
					return this.props.setDemoClassError(t("EMAIL_INVALID")) 
				}
			}
			let erroMessage = t("INVALID_FORM_DESCRIPTION")
			return this.props.setDemoClassError(erroMessage) 
		} else {
			demoClass 
				? this.props.updateDemoClass(submitObj)
				: this.props.addDemoClass(submitObj)
		}
	} 

	exit = () => {
		this.props.history.push("/demo-class")
	}

	sendMessage = () => {
        this.props.sendDemoClassMessage({ demoClassId: this.props.demoClasses.demoClass.id, message: this.state.inputs.message.value})
        this.setState({ inputs: { ...this.state.inputs, message: { value: "" }}})
    }
	
  	render () {
		const { state, props, inputChange, childInputChange, addField, removeField, submitHandle, sendMessage, exit } = this
		const { 
			commercialResponsibleName, 
			name, 
			email, 
			planId, 
			classTool, 
			classToolId, 
			companyName, 
			occupation, 
			countryId, 
			timezone, 
			address, 
			demoClassPhones, 
			demoClassSchedules, 
			classConverted, 
			classConvertedEmail, 
			message
		} = state.inputs
		const { t, demoClasses: { demoClass, success, error } } = props
		const user = serv.getUserFromToken()
		// console.log('error 2', error)
		{ success && exit() }
		
		return (
			<Fragment>		
				<Form inputChange={inputChange} childInputChange={childInputChange} addField={addField} removeField={removeField} submit={submitHandle} >
					<h2>{!demoClass ? t("ADD_NEW") : t("EDIT")} {t("DEMOCLASS")}</h2>
					<InputForText name="commercialResponsibleName" data={commercialResponsibleName} label="COMERCIAL_RESPONSIBLE" placeholder="COMERCIAL_RESPONSIBLE_NAME"/>
					<h3>{t("PERSONAL_INFORMATION")}</h3>
					<InputForText name="name" data={name} label="NAME" placeholder="STUDENT_NAME"/>
					<InputForText name="email" data={email} label="EMAIL" placeholder="STUDENT_EMAIL"/>
					<InputForLingoPlan name="planId" data={planId}/>
					<InputForClassTool name="classTool" data={classTool}/>
					<InputForText name="classToolId" data={classToolId} label="TOOL_ID" placeholder="STUDENT_TOOL_ID"/>
					<InputForText name="companyName" data={companyName} label="STUDENT_COMPANY" placeholder="STUDENT_COMPANY_NAME"/>
					<InputForText name="occupation" data={occupation} label="OCCUPATION" placeholder="STUDENT_OCCUPATION"/>
					<InputForCountry name="countryId" data={countryId}/>
					<InputForTimezone name="timezone" data={timezone}/>
					<InputForText name="address" data={address} label="ADDRESS" placeholder="STUDENT_ADDRESS"/>
					<InputForPhoneArray name="demoClassPhones" data={demoClassPhones}/>
					<InputForLingoArray name="demoClassSchedules" data={demoClassSchedules} timezone={timezone.value}/>
					<InputForYesSwitch name="classConverted" data={classConverted} label="CLASS_CONVERTED"/>
					<InputForText name="classConvertedEmail" data={classConvertedEmail} label="EMAIL" placeholder="LINGO_EMAIL"/>
				</Form>
				{ demoClass && 
					<div className="new-container">
						<div className="notesBox">
							<DemoClassMessages />
							<div className="boxType send">
								<div className="avatar">
									<img src={user.picture || IconAvatar } alt=""/>
								</div>
								<form>
									<div className="typeMessage">
										<textarea className="input-lingo" name={"message"} value={message.value} placeholder={t("TYPE_MESSAGE")} onChange={(e) => inputChange(e.target)}></textarea>                                            
									</div>
									<button type="button" className="enter" onClick={ (e) => sendMessage(e) }>
										<img src={Enter} alt=""/>
									</button>
								</form>
							</div>
						</div>
					</div>
				}
			</Fragment>
		)
	}
}

const mapStateToProps = ({ demoClasses }) => ({ demoClasses });
const mapDispatchToProps = dispatch => ({
	getDemoClass: data => dispatch(getDemoClass(data)),
    addDemoClass: data => dispatch(addDemoClass(data)),
	updateDemoClass: data => dispatch(updateDemoClass(data)),
	sendDemoClassMessage: data => dispatch(sendDemoClassMessage(data)),
	unsetDemoClass: data => dispatch(unsetDemoClass(data)),
	setDemoClassError: data => dispatch(setDemoClassError(data)),
	unsetDemoClassSuccess: data => dispatch(unsetDemoClassSuccess(data)),
});

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DemoClass))))

import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLingoPlans, getLingoEconomicGroups, getLingoEconomicGroupCompanys } from '../../actions/lingoActions'
import { addTeacher, getTeachers, getTeacher, updateTeacher, removeTeacher, unsetTeacher } from '../../actions/teacherActions'
import TeacherRating from './TeacherRating'
import Form from '../../elements/Form';
import Tabs from '../_common/Tabs/tabs';

class TeacherForm extends Component {
	state = this.initialState    
	
	get initialState() {
		const { teacher } = this.props.teachers
		return {
            activeTab: this.props.t('PERSONAL_INFO'),
			inputs: {
                id: teacher ? teacher.userId : "",
                name: teacher ? teacher.teacherName : "",
                email: teacher ? teacher.teacherName : "",
                userEmails: [ {email: '', notify: false}],
                gender: '',
                languages:[{languageId: 0, isNative: true}, {languageId: 0}],
                countryId: '',
                timezone: '',
                address: '',            
                userPhones: [{phone: ''}],
                levels: [{label: 'A0', active: false },{ label: 'A1', active: false},{label: 'A2', active: false},{label: 'B1', active: false},{label: 'B2', active: false},{label: 'C1', active: false},{label: 'C2', active: false},{label: 'DM', active: false}],
                firstClass: false,
                demoClass: false,
                isActive: false,
                picture: null,
                oldpicture: null,
                teacherId: "",

				code: teacher ? teacher.key : "",
				discount: teacher ? teacher.percentage : "",
				expiration: teacher ? teacher.dueDate : "",
				legalName: teacher ? teacher.company.id : "",
				selectedPlans: teacher ? teacher.teacherPlans.map( item => item.planId) : [0],
				status: teacher ? teacher.active : false,
			},
		}
    }
    
	inputChange = (e, name) => {
		const { value, type } = e.target
		const inputs  = Object.assign({}, this.state.inputs)
		if (type === "checkbox") { inputs[name] = !this.state.inputs[name]; return this.setState ({ inputs })}
        inputs[name] = value
		this.setState({ inputs })
	} 

    submitHandle = () => {
		const { teacher } = this.props.teachers
		const { inputs: { code, discount, expiration, economicGroup, legalName, selectedPlans, status } } = this.state
		const submitObj = {
			key: code,
			percentage: discount,
			dueDate: expiration,
			economicGroupId: economicGroup,
			companyId: legalName,
			active: status,
			plans: selectedPlans
		}
		teacher && ( submitObj.id = this.props.teachers.teacher.id )
		teacher 
			? this.props.updateTeacher(submitObj)
			: this.props.addTeacher(submitObj)
	} 

	deleteHandle = (e) => {
		e.preventDefault()
		this.props.teachers.teacher 
			? this.props.removeTeacher(this.props.teachers.teacher.id) 
			: this.setState({  })
	}
	
	resetInputs = async () => {
		this.setState({ filters: this.initialState.filters })   
	}

  	render () {
		const { state, props, inputChange, submitHandle, deleteHandle } = this
		const { activeTab, inputs } = state;
		const { code, discount, expiration, economicGroup, legalName, selectedPlans, status } = inputs
		const { t, closeForm, label, lingo: { plans, economicGroups, economicGroupCompanys }, teachers: { teacher }, unsetTeacher } = props
		const plansOptions = plans.map(({id, nameEnglish}) => { return { id, name: nameEnglish }})
		const formInputs = [

		]

		return (
			<Fragment>
                { teacher && <TeacherRating 
                    teacherName={teacher && teacher.name } 
                    teacherNativeLanguage={teacher && teacher.teachers[0].teacherLanguages[0].language.name} 
                    teacherCountry={teacher && teacher.country.name} 
                    teacherRating={teacher && teacher.teachers[0].averageRating} /> 
                }
                <Tabs activeTab={activeTab}>
                    <section label={t('PERSONAL_INFO')}>
                        <Form 
                            label={label} 
                            inputs={formInputs} 
                            inputChange={inputChange} 
                            deleteHandle={deleteHandle} 
                            edit={!!teacher}/>
                        <button className='save' onClick={ (e) => submitHandle(e) }>Save</button>
                        <button className='exit' onClick={ (e) => { unsetTeacher() ;closeForm(e) }}>{`< Back`}</button>
                    </section>
                    <section label={t('MANAGE_AVAILABLE_HOURS')} ><h1>Teste</h1></section>
                </Tabs>
			</Fragment>
		)
	}
}

const mapStateToProps = ({ teachers, lingo }) => ({ teachers, lingo });
const mapDispatchToProps = dispatch => ({
    addTeacher: data => dispatch(addTeacher(data)),
    getTeacher: data => dispatch(getTeacher(data)),
    getTeachers: data => dispatch(getTeachers(data)),
	updateTeacher: data => dispatch(updateTeacher(data)),
	removeTeacher: data => dispatch(removeTeacher(data)),
	unsetTeacher: data => dispatch(unsetTeacher(data)),
	getLingoPlans: data => dispatch(getLingoPlans(data)),
	getLingoEconomicGroups: data => dispatch(getLingoEconomicGroups(data)),
	getLingoEconomicGroupCompanys: data => dispatch(getLingoEconomicGroupCompanys(data))
});

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TeacherForm))))
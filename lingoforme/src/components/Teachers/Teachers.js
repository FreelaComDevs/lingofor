import React, { Component, Fragment} from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLingoPlans, getLingoAllCountries, getLingoAllLanguages, getLingoLevels } from '../../actions/lingoActions'
import { getTeachers, getTeacher, unsetTeacher } from '../../actions/teacherActions'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Loading from 'react-fullscreen-loading'
import Filter from '../../elements/Filter'
import TableList from '../../elements/TableList'
import TeacherForm from './TeacherForm'
import teacherIcon from '../../images/icons/icon_teacher_header.svg'
import './style.scss'
import NewTeacher from './NewTeacher';

class Teachers extends Component {

	state = this.initialState    
	
	get initialState() {
		return {
			newTeacher: false,
			filters: {
				name: "",
				nativeLanguage: "",
				otherLanguage: "",
				country: "",
				level: "",
				firstClass: "",
				demoClass: "",
				ratingFrom: "",
				ratingTo: "",
				status: "",
			},
		}
	}

	componentDidMount () {
		this.props.getLingoLevels()
		this.props.getLingoAllCountries()
		this.props.getLingoAllLanguages()
		this.props.getLingoPlans()
		this.props.getTeachers(this.initialState.filters)
		this.props.match.path === "/teachers/:id" ? this.props.getTeacher(this.props.match.params.id) : this.props.unsetTeacher()
	}

	componentWillUnmount() {
		this.props.unsetTeacher()
	}

	inputChange = (e, name) => {
		const { filters } = this.state
		const { value } = e.target
		const newFilters = { ...filters, [name]: value }
		this.setState({ filters: newFilters })
	}

	applyFilters = () => {
		this.props.getTeachers(this.state.filters)
	} 
	
	resetFilter = async () => {
		this.props.getTeachers(this.initialState.filters)
		this.setState({ filters: this.initialState.filters })   
	}

	render () {
		console.log(this.props.match.path)
		const { state, props, inputChange, applyFilters, resetFilter } = this
		const { newTeacher, filters: { name, nativeLanguage, otherLanguage, country, level, firstClass, demoClass, ratingFrom, ratingTo, status }} = state;
		const { lingo, lingo: { countries, languages, lingoLevels }, teachers: { loading, teachers, teacher }, getTeacher, t } = props
		
		// Filter
		const countryOptions = lingo.countries.map(({id, name}) => { return { id, name }})
		const languagesOptions = lingo.languages.map(({id, name}) => { return { id, name }})
		const levelsOptions = lingoLevels.map(({id, level}) => { return { id, name: level }})
		const statusOptions = [ "Inactive", "Active" ].map( (option, index) => { return { id: Boolean(index), name: option }})
		const rangeOptions = [ "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5" ].map( (option) => { return { id: option, name: option }})
		
		const filters = [
			{ name: "name", value: name, label: "Name", placeholder: "Teacher Name", type: "text" },
			{ name: "nativeLanguage", value: nativeLanguage, label: "Native Language", placeholder: "Select", options: languagesOptions, type: "select" },
			{ name: "otherLanguage", value: otherLanguage, label: "Other Language", placeholder: "Select", options: languagesOptions, type: "select" },
			{ name: "country", value: country, label: "Coountry", placeholder: "Select", options: countryOptions, type: "select" },
			{ name: "level", value: level, label: "Level", placeholder: "Select", options: levelsOptions, type: "select" },
			{ name: "firstClass", value: firstClass, label: "First Class", placeholder: "Select", options: statusOptions, type: "select" },
			{ name: "demoClass", value: demoClass, label: "Demo Class", placeholder: "Select", options: statusOptions, type: "select" },
			{ name: "ratingFrom", value: ratingFrom, label: "Rating From", placeholder: "Select", options: rangeOptions, type: "select" },
			{ name: "ratingTo", value: ratingTo, label: "Rating To", placeholder: "Select", options: rangeOptions, type: "select" },
			{ name: "status", value: status, label: "Status", placeholder: "Select", options: statusOptions, type: "select" },
        ]
        
		// List
		const listedTeachers = teachers.map( item => { 
            return { 
				id: item.userId, 
				name: item.teacherName, 
				nativeLanguage: item.nativeLanguageName, 
				otherLanguage: item.otherLanguageName, 
				country: item.countryName, 
				levels: item.teacherLevel, 
				firstClass: item.firstClass ? "Yes" : "No", 
				demoClass: item.demoClass ? "Yes" : "No", 
				rating: item.averageRating,
				status: item.isActive ? "Active" : "Inactive"
			}
		})

		const listItems = [
			{ label: "Name", name: "name" },
			{ label: "Native Language", name: "nativeLanguage" },
			{ label: "Other Language", name: "otherLanguage" },
			{ label: "Country", name: "country" },
			{ label: "Levels", name: "levels" },
			{ label: "First Class", name: "firstClass" },
			{ label: "Demo Class", name: "demoClass" },
			{ label: "Rating", name: "rating" },
			{ label: "Status", name: "status" },
			{ label: "", name: "button" }
		]


		return (
			<div className='view'>
                <SideMenu />
                <section>
                    <Header/>
                    <Loading loading={this.state.loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>
                    <div className="toptitle">      
                        <img src={teacherIcon} alt="B2b" />    
                        <h1>Teachers</h1>                   
                    </div>
					<div className='container'>

						<div className='button buttonRight'>
							<button onClick={ () => { this.setState({ newTeacher: true }); this.props.history.push("/teachers/new") } }>
								<i className='fa fa-plus' aria-hidden='true' />{t("ADD_TEACHER")}
							</button>
						</div>
						<Filter 
							filters={ filters } 
							inputChange={ inputChange } 
							submit={ applyFilters } 
							clear={ resetFilter } />
						<TableList 
							component="teachers"
							listItems={ listItems } 
							listedItems={ listedTeachers } 
							action={ getTeacher } 							
							/>
					</div>
				</section>
			</div>
		)
	}
}

const mapStateToProps = ({ teachers, lingo }) => ({ teachers, lingo });
const mapDispatchToProps = dispatch => ({
    getLingoLevels: data => dispatch(getLingoLevels(data)),
    getLingoPlans: data => dispatch(getLingoPlans(data)),
	getLingoAllCountries: data => dispatch(getLingoAllCountries(data)),
	getLingoAllLanguages: data => dispatch(getLingoAllLanguages(data)),
    getTeachers: data => dispatch(getTeachers(data)),
    getTeacher: data => dispatch(getTeacher(data)),
    unsetTeacher: data => dispatch(unsetTeacher(data))
});

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Teachers))))
import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTeachers } from '../../actions/teacherActions'
import Loading from 'react-fullscreen-loading'
import { getLingoLevels, getLingoAllCountries, getLingoAllLanguages } from '../../actions/lingoActions'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import CircularProgress from '@material-ui/core/CircularProgress';
import teacherIcon from '../../images/icons/icon_teacher_header.svg'
import TeachersList from './TeachersList'
import InputText from '../../elements/Inputs/InputText';
import InputSelect from '../../elements/Inputs/InputSelect';
import '../../scss/components/teacher.scss'
import Placeholder from '../_common/placeholder/placeholderByPage';

class Teacher extends Component {
	state = this.initialState    

    get initialState() {
        return {
            loading: false,
            filters: {
                name: "",
                countryId: "",
                ratingFrom: "",
                ratingTo: "",
                active: "",
                nativeLanguageId: "",
				otherLanguageId: "",
				levelId: "",
				firstClass: "",
				demoClass: "",
				skip: "",
				take: ""
            }
        };
	}
	
	componentDidMount() {
		this.props.getTeachers(this.initialState.filters)
		this.props.getLingoAllCountries()
		this.props.getLingoAllLanguages()
		this.props.getLingoLevels()
	}
	
	inputChange = (e, name) => {
        const { value } = e.target
        const { filters }  = this.state
        filters[name] = value
        this.setState({ filters })
	} 

    applyFilters = () => {
        this.resetBuilder().then(this.setState({loading: false}))
	} 
	
	resetBuilder = async () => {
		this.props.getTeachers(this.state.filters)
		this.setState({ loading: true, filters: this.initialState.filters })   
	}

  	render () {
		const { props, state, inputChange, applyFilters, resetBuilder } = this
		const { loading, filters: { name, countryId, ratingFrom, ratingTo, active, nativeLanguageId, otherLanguageId, levelId, firstClass, demoClass }} = state;
		const { t, teachers: { teachers }, lingo: { countries, languages, levels } } = props;
		const rangeOptions = [ "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5" ].map( (option) => { return { id: option, name: option }})
		const statusOptions = [ t("INACTIVE"), t("ACTIVE")  ].map( (option, index) => { return { id: Boolean(index), name: option }})
		const switchOptions = [ t("NO"), t("YES")  ].map( (option, index) => { return { id: Boolean(index), name: option }})

		return (
			<div className='view teachers-view'>
				<SideMenu />
				<section>
					<Header/>
					<div className="toptitle">      
						<img src={teacherIcon} alt="Professor" />    
						<h1>{t("TEACHERS")}</h1>                   
					</div>
					<div className='container teacher-container'>
						<button onClick={ () => this.props.history.push('teachers/new') }><i className="fa fa-plus" aria-hidden="true"></i> {t('ADD_NEW_TEACHER')}</button>
						<div className='bigBox filterBox'>
							<h2><i className="fa fa-filter" aria-hidden="true"></i>{t('FILTERS')}</h2>
							<div className="filterItems">
								<InputText name="name" placeholder={ t('TEACHER_NAME') } label={ t('NAME') } value={ name } onChange={ inputChange } />
								<InputSelect name="countryId" placeholder={ t('SELECT') } label={ t('COUNTRY') } options={ countries } value={ countryId } onChange={ inputChange } />
								<InputSelect name="ratingFrom" placeholder={ t('RATING_FROM') } label={ t('RATING_FROM') } options={ rangeOptions } value={ ratingFrom } onChange={ inputChange } />
								<InputSelect name="ratingTo" placeholder={ t('RATING_TO') } label={ t('RATING_TO') } options={ rangeOptions } value={ ratingTo } onChange={ inputChange } />
								<InputSelect name="active" placeholder={ t('SELECT') } label={ t('STATUS') } options={ statusOptions } value={ active } onChange={ inputChange } />
								<InputSelect name="nativeLanguageId" placeholder={ t('SELECT') } label={ t('NATIVE_LANGUAGE') } options={ languages } value={ nativeLanguageId } onChange={ inputChange } />
								<InputSelect name="otherLanguageId" placeholder={ t('SELECT') } label={ t('OTHER_LANGUAGE') } options={ languages } value={ otherLanguageId } onChange={ inputChange } />
								<InputSelect name="levelId" placeholder={ t('SELECT') } label={ t('LEVELS') } options={ levels } value={ levelId } onChange={ inputChange } />
								<InputSelect name="firstClass" placeholder={ t('SELECT') } label={ t('FIRST_CLASS') } options={ switchOptions } value={ firstClass } onChange={ inputChange } />
								<InputSelect name="demoClass" placeholder={ t('SELECT') } label={ t('DEMO_CLASS') } options={ switchOptions } value={ demoClass } onChange={ inputChange } />
							</div>
							<button onClick={ (e) => applyFilters(e) }  disabled={ loading } >{t('FILTER')}</button>
                            <button className="clear" onClick={ (e) => resetBuilder() }>{t('CLEAR_FILTERS')}</button>
						</div>
						{ teachers ? <TeachersList teachers={ teachers } /> : <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/> }
					</div>
				</section>
			</div>
		)
	}
}

const mapStateToProps = ({ teachers, lingo }) => ({ teachers, lingo });
const mapDispatchToProps = dispatch => ({
    getTeachers: data => dispatch(getTeachers(data)),
    getLingoLevels: data => dispatch(getLingoLevels(data)),
    getLingoAllCountries: data => dispatch(getLingoAllCountries(data)),
    getLingoAllLanguages: data => dispatch(getLingoAllLanguages(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Teacher)))
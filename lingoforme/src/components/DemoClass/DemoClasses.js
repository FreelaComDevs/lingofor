import React, { Component, Fragment } from 'react'
import { connect,  } from 'react-redux'
import { getDemoClasses, getDemoClass, unsetDemoClass } from '../../actions/demoClassActions'
import Filter from '../../elements/NewFilter';
import InputForText from '../../elements/NewInputs/InputForText';
import InputForLingoLanguages from '../../elements/NewInputs/InputForLingoLanguages';
import InputForDate from '../../elements/NewInputs/InputForDate';
import InputForStatus from '../../elements/NewInputs/InputForStatus';
import TableList from '../../elements/NewTableList'
import TableDataText from '../../elements/TableDataText'
import TableDataTextTranslated from '../../elements/TableDataTextTranslated'
import TableDataFlag from '../../elements/TableDataFlag'
import TableDataDate from '../../elements/TableDataDate'
import TableDataButton from '../../elements/TableDataButton'
import moment from 'moment'
import Pagination from '../_common/pagination';
import queryString from 'query-string'

class DemoClasses extends Component {
	state = this.initialState    
	
	get initialState() {
		return {			 
			loading: false,
			filters: {
				pageNumber: 1,
				pageSize: 10,
				student: "" ,
				lingoLanguageId: "" ,
				startAt: "",
				endAt: "",
				status:  "" ,
				orderByDesc : "createdAt"
			},
		}
	}

	componentDidMount () {
		this.setState({loading:true});
		this.getPageNumberCurrent()
	}
	
	getPageNumberCurrent = () => {
		const params = queryString.parse(this.props.location.search);
		const { filters }  = this.state

		if(params && params["page"]){
			filters["pageNumber"] = Number(params["page"])
			this.setState({filters}, this.applyFilters());
		}else{
			this.applyFilters()
		}
	}

	pagination = (page, type) => {
		const { filters }  = this.state
		filters["pageNumber"] = Number(page)
		this.setState({filters});
		this.applyFilters(null,false);
	}


	inputChange = (change) => {
		const { value, name } = change
		if(name === 'startAt' || name === 'endAt'){
			this.setState({ filters: { ...this.state.filters, [name]:  value }})
		}else{
			this.setState({ filters: { ...this.state.filters, [name]: { value: value }}})
		}
	} 

	applyFilters = (e,resetPage) => {
		if(e)
			e.preventDefault()
		
		const { filters } = this.state	
		if(resetPage){
			filters["pageNumber"] = Number(1)
			this.setState({filters});
		}	
		this.props.getDemoClasses(filters)
	} 
	
	resetFilter = async (e) => {
		e.preventDefault()
		const reset = await this.initialState
		this.setState(reset, () => this.applyFilters(null, true))   
	}

	listButtonAction = (demoClassId) => {
		this.props.getDemoClass(demoClassId)
		this.props.history.push(`/demo-class/${demoClassId}`)
	}

  render () {
		const { state, props, inputChange, applyFilters, resetFilter, listButtonAction } = this
		const { filters: { student, lingoLanguageId, startAt, endAt, status,pageNumber }} = state;
		const { demoClasses: { demoClasses : { demoClasses, totalPages, totalFound } } } = props
		// List
		const listedDemoClasses = demoClasses ? demoClasses.map( item => { 
			const { demoClassSchedules, createdAt, id, name } = item
			const flags =  demoClassSchedules.map(lingo => lingo.lingoLanguage.flag)
			const status =  demoClassSchedules.sort((a, b) => parseInt(moment(b.originalScheduledDateTime).format("YYYYMMDDHHmmss")) - parseInt(moment(a.originalScheduledDateTime).format("YYYYMMDDHHmmss")))[0].status
			const scheduledStartDateTime = demoClassSchedules && demoClassSchedules[0].scheduledStartDateTime
			return { id, name, flags, createdAt, scheduledStartDateTime, status }
		}) : []

		return (

			<Fragment>
				<Filter component="demoClass" submit={(e) => applyFilters(e,true)} clear={resetFilter} inputChange={inputChange}>
					<InputForText name="student" label="STUDENT" placeholder="STUDENT_NAME" data={student} /> 
					<InputForLingoLanguages name="lingoLanguageId" data={lingoLanguageId} /> 
					<InputForDate name="startAt" label="PERIOD_START" data={startAt} value={startAt} /> 
					<InputForDate name="endAt" label="PERIOD_END" data={endAt} value={endAt}/> 
					<InputForStatus name="status" data={status} /> 
				</Filter>
				<TableList listedItems={listedDemoClasses}>
					<TableDataText label="student" name="name"/>	
					<TableDataFlag label="classLingo" name="flags"/>	
					<TableDataDate label="firstAppointment" name="scheduledStartDateTime"/>	
					<TableDataTextTranslated label="status" name="status"/>	
					<TableDataButton name="id" action={listButtonAction}/>	
				</TableList>
				<Pagination pageCurrent={pageNumber} totalPages={totalPages} totalFound={totalFound} onClick={(page, type) => this.pagination(page, type)}/>
			</Fragment> 
				
		)
	}
}

const mapStateToProps = ({ demoClasses }) => ({ demoClasses });
const mapDispatchToProps = dispatch => ({
    getDemoClasses: data => dispatch(getDemoClasses(data)),
    getDemoClass: data => dispatch(getDemoClass(data)),
    unsetDemoClass: data => dispatch(unsetDemoClass(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoClasses)

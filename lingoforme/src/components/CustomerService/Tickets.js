import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import i18next from 'i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LanguageDetector from 'i18next-browser-languagedetector'


import { } from '../../actions/lingoActions'
import { getTickets, getTicketTypes, getTicketSubTypes, getTicket, unsetTicket, unsetTicketSubTypes } from '../../actions/ticketActions'
import Filter from '../../elements/Filter';
import CardList from '../../elements/CardList'

import Pagination from '../_common/pagination';

class CostumerService extends Component {
	state = this.initialState    
	
	get initialState() {
		return {
			filters: {
				id: "",
                requester: "",
                role: "",
                ticketTypeId: "",
                ticketSubTypeId: "",
                createdAt: "",
				status: "",
				pageNumber: 1,
				pageSize: 10,
			}
		}
	}

	getPageNumberCurrent = () => {
		const params = queryString.parse(this.props.location.search);
		const { filters }  = this.state

		if(params && params["page"]){
			filters["pageNumber"] = Number(params["page"])
			this.setState({filters});
		}
	}

	pagination = (page, type) => {
		const { filters }  = this.state
		filters["pageNumber"] = Number(page)
		this.setState({filters});
		this.applyFilters();
	}
	


	getUserInfo() {
        const token = JSON.parse(localStorage.getItem('@lingo')).token;
        const payload = token.split('.')[1];
        const base64 = payload.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
	}
	
	componentWillMount(){
		this.props.unsetTicket()
		this.getPageNumberCurrent()
	}

	componentDidMount () {
		this.getPageNumberCurrent()
		this.props.getTickets(this.state.filters)
        this.props.getTicketTypes()
	}

	inputChange = (e, name) => {
        const { value } = e.target
        const { filters }  = this.state
        filters[name] = value
		this.setState({ filters })
		name === "ticketTypeId" && this.props.getTicketSubTypes(value)
	}

    applyFilters = (e) => {
        this.props.getTickets(this.state.filters)
	} 
	
	resetFilter = async () => {
		this.props.getTickets(this.initialState.filters)
		this.setState({ filters: this.initialState.filters })   
	}

  	render () {
		const { state, props, inputChange, applyFilters, resetFilter, getUserInfo } = this
		const { filters: { id, requester, role, ticketTypeId, ticketSubTypeId, createdAt, status, pageNumber, pageSize }} = state;
		const { t,  tickets: { loading,  tickets, totalPages, totalFound  }, getTicket } = props
	
		const user = getUserInfo()
		// Filter
		const filters = (user.role === "student" || user.role === "teacher") ? 
		
			[
				{ name: "id", value: id, label: 'TICKET_ID', placeholder: 'ENTER_TICKET', type: "text" },
				{ name: "ticketTypeId", value: ticketTypeId, type: "ticketTypes"},
				{ name: "ticketSubTypeId", value: ticketSubTypeId, type: "ticketSubTypes"},
				{ name: "createdAt", value: createdAt, label: "OPEN_DATE", type: "date" },
				{ name: "status", value: status, type: "ticketStatus" },
			]

			:

			[
				{ name: "id", value: id, label: 'TICKET_ID', placeholder: 'ENTER_TICKET', type: "text" },
				{ name: "requester", value: requester, label: t("CREATOR_USER_ID"), placeholder: 'ENTER_NAME', type: "text" },
				{ name: "role", value: role, type: "ticketProfiles"},
				{ name: "ticketTypeId", value: ticketTypeId, type: "ticketTypes"},
				{ name: "ticketSubTypeId", value: ticketSubTypeId, type: "ticketSubTypes"},
				{ name: "createdAt", value: createdAt, label: "OPEN_DATE", type: "date" },
				{ name: "status", value: status, type: "ticketStatus" },
			]
		
	
		// List
		const listedTickets = tickets ? tickets.map( item => { 
      const curretnLanguage = i18next.use(LanguageDetector)
      const timezoneUser = getUserInfo()
      
      console.log(item.ticketType.nameEnglish)
      console.log(item.ticketSubType.nameEnglish)

      let ticketType = ''
      let ticketSubType = ''

      if(curretnLanguage.language === 'en'){
        ticketType = item.ticketType.nameEnglish
        ticketSubType = item.ticketSubType.nameEnglish
      }else if(curretnLanguage.language === 'pt'){
        ticketType = item.ticketType.namePortuguese
        ticketSubType = item.ticketSubType.namePortuguese
      }else if(curretnLanguage.language === 'es'){
        ticketType = item.ticketType.nameSpanish
        ticketSubType = item.ticketSubType.nameSpanish
      }else{
        ticketType = item.ticketType.nameEnglish
        ticketSubType = item.ticketSubType.nameEnglish
      }
      
			return { 
				id: item.id, 
				status: item.status, 
				title: item.title, 
				creatorUserId: item.creatorUser.name, 
				role: item.creatorUser.role,
				type: ticketType, 
				subType: ticketSubType, 
				createdAt: item.createdAt, 
				lastInteraction: item.updatedAt, 
				timezone: timezoneUser.timezone,
				status: item.status
			}
		}) : []

		
		const listItems = [
			{ label: "Ticket #", name: "id" },
			{ label: t("STATUS"), name: "status" },
			{ label: t("TITLE"), name: "title" },
			{ label: t("CREATOR_USER_ID"), name: "creatorUserId" },
			{ label: t("PROFILE"), name: "role" },
			{ label: t("TYPE"), name: "type" },
			{ label: t("SUBTYPE"), name: "subType" },
			{ label: t("OPEN_DATE"), name: "createdAt" },
			{ label: t("LAST_INTERACTION"), name: "lastInteraction" },
			{ label: "", name: "button" }
		]
		
		
		return (
			
           <Fragment>
			   { (user.role === "student" || user.role === "teacher") &&
                <div className='button buttonRight'>
                    <button onClick={ () => this.props.history.push("/customer-service/new") }>
                        <i className='fa fa-plus' aria-hidden='true' /> {t("ADD_NEW_TICKET")}
                    </button>
                </div>
			   }
                <Filter 
                    filters={ filters } 
                    inputChange={ inputChange } 
                    submit={ applyFilters } 
                    clear={ resetFilter } /> 
				<CardList 
					component="customer-service"
                    listItems={ listItems } 
                    listedItems={ listedTickets } 
                    action={ getTicket } />

				<Pagination pageCurrent={pageNumber} totalPages={totalPages} totalFound={totalFound} onClick={(page, type) => this.pagination(page, type)}/>
            </Fragment> 
		)
	}
}

const mapStateToProps = ({ tickets, roles }) => ({ tickets, roles });
const mapDispatchToProps = dispatch => ({
    getTickets: data => dispatch(getTickets(data)),
    getTicket: data => dispatch(getTicket(data)),
    getTicketTypes: data => dispatch(getTicketTypes(data)),
    getTicketSubTypes: data => dispatch(getTicketSubTypes(data)),
    unsetTicket: data => dispatch(unsetTicket(data)),
    unsetTicketSubTypes: data => dispatch(unsetTicketSubTypes(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(CostumerService)))

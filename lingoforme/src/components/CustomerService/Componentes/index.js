import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { } from '../../actions/lingoActions'
import { getTickets, getTicketTypes, getTicketSubTypes, getTicket, unsetTicket, unsetTicketSubTypes } from '../../actions/ticketActions'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Loading from 'react-fullscreen-loading'
import Filter from '../../elements/Filter';
import CustomerService from '../../images/icons/icon_customerservice_header.svg'
import TableList from '../../elements/TableList'
import NewTicket from './NewTicket'
import './styles.scss'
import Ticket from './Ticket';

class CostumerService extends Component {
	state = this.initialState    
	
	get initialState() {
		return {
			newTicket: false,
			filters: {
				id: "",
                creatorUserId: "",
                role: "",
                ticketTypeId: "",
                ticketSubTypeId: "",
                createdAt: "",
                status: "",
			},
		}
	}

	componentDidMount () {
		this.props.getTickets()
        this.props.getTicketTypes()
	}

	componentWillUnmount() {
		this.props.unsetTicket()
	}

	closeNewTicket = () => {
		this.setState({newTicket: false})
	}

	inputChange = (e, name) => {
        const { value } = e.target
        const { filters }  = this.state
        filters[name] = value
		this.setState({ filters })
		name === "ticketType" && this.props.getTicketSubTypes(value)
	} 

    applyFilters = (e) => {
        this.props.getTickets(this.state.filters)
	} 
	
	resetFilter = async () => {
		this.props.getTickets(this.initialState.filters)
		this.setState({ filters: this.initialState.filters })   
	}

  	render () {
		const { state, props, inputChange, applyFilters, resetFilter, closeNewTicket } = this
		const { newTicket, filters: { id, creatorUserId, role, ticketTypeId, ticketSubTypeId, createdAt, status }} = state;
        const { t, tickets: { loading, tickets, ticket }, getTicket } = props
        
        // Filter
		const filters = [
			{ name: "id", value: id, label: 'TICKET_ID', placeholder: 'ENTER_TICKET', type: "text" },
			{ name: "creatorUserId", value: creatorUserId, label: 'creatorUserId', placeholder: 'ENTER_NAME', type: "text" },
			{ name: "role", value: role, type: "profiles"},
			{ name: "ticketTypeId", value: ticketTypeId, type: "ticketTypes"},
            { name: "ticketSubTypeId", value: ticketSubTypeId, type: "ticketSubTypes"},
            { name: "createdAt", value: createdAt, label: "OPEN_DATE", type: "date" },
			{ name: "status", value: status, type: "ticketStatus" },
		]

		// List
		const listedTickets = tickets.map( item => { 
			return { 
				id: item.id, 
				status: item.status, 
				title: item.title, 
				creatorUserId: item.creatorUser.name, 
				role: item.creatorUser.role,
				type: item.ticketType.nameEnglish, 
				subType: item.ticketSubType.nameEnglish, 
				createdAt: item.createdAt, 
				lastInteraction: item.updatedAt, 
				status: item.status
			}
		})
		const listItems = [
			{ label: "Ticket #", name: "id" },
			{ label: "Status", name: "status" },
			{ label: "Title", name: "title" },
			{ label: "creatorUserId", name: "creatorUserId" },
			{ label: "role", name: "role" },
			{ label: "Type", name: "type" },
			{ label: "Subtype", name: "subType" },
			{ label: "Open Date", name: "createdAt" },
			{ label: "Last Interaction", name: "lastInteraction" },
			{ label: "", name: "button" }
		]

		return (
            <div className="view">                
                <SideMenu />
                <section>
                    <Header/>  
                    <div className="toptitle">      
                        <img src={CustomerService} alt="Customer Service" />    
                        <h1>{t("CUSTOMER_SERVICE")}</h1>                   
                    </div> 
                    <Loading loading={loading} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
                    <div className="container">
                        { !(ticket || newTicket)
                            && <Fragment>
                                <div className='button buttonRight'>
                                    <button onClick={ () => this.setState({ newTicket: true }) }>
                                        <i className='fa fa-plus' aria-hidden='true' /> {t("ADD_NEW_TICKET")}
                                    </button>
                                </div>
                                <Filter 
                                    filters={ filters } 
                                    inputChange={ inputChange } 
                                    submit={ applyFilters } 
                                    clear={ resetFilter } /> 
                                <TableList 
                                    listItems={ listItems } 
                                    listedItems={ listedTickets } 
                                    action={ getTicket } />
                            </Fragment> 
						}
						{ newTicket && <NewTicket closeNewTicket={closeNewTicket}/> }
						{ ticket && <Ticket /> }
                    </div>
                </section>
			</div>
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
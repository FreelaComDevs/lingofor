import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { FlagIcon } from "react-flag-kit"
import { getTicketTypes, getTicketSubTypes, unsetTicket, unsetTicketSubTypes, proceedTicket, closeTicket, cancelTicket, getTicketMessages } from '../../actions/ticketActions'
import InputTicketTypes from '../../elements/Inputs/InputTicketTypes';
import InputTicketSubTypes from '../../elements/Inputs/InputTicketSubTypes';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'

function Transition (props) {
    return <Slide direction='up' {...props} />
}
class Ticket extends Component {
    state = this.initialState    
	
	get initialState() {
        const {ticket} = this.props.tickets
		return {
            modalOpen: false,
            modalAction: "",
			inputs: {
                type: ticket.ticketTypeId,
                subType: ticket.ticketSubTypeId,
                status: ticket.status,
                reason: ""
			},
		}
    }
    
    getUserInfo() {
        const token = JSON.parse(localStorage.getItem('@lingo')).token;
        const payload = token.split('.')[1];
        const base64 = payload.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    componentDidMount() {
        this.props.getTicketTypes()
        this.props.getTicketMessages(this.props.tickets.ticket.id)
        this.props.getTicketSubTypes(this.props.tickets.ticket.ticketTypeId)
    }

    componentWillUnmount() {
        this.props.unsetTicket()
    }

	statusChange = (e) => {
        const { value } = e.target
		value === "inProgress" && this.props.proceedTicket(this.props.tickets.ticket.id)
		value !== "inProgress" && this.setState({ modalOpen: true, modalAction: value })
    } 


	inputChange = (e, name) => {
        const { value } = e.target
        const { inputs }  = this.state
        inputs[name] = value
        name === "type" && this.props.getTicketSubTypes(value)
        this.setState({ inputs })
    } 

    confirmModal = (ticketId) => {
        this.state.modalAction === "closed" && this.props.closeTicket(ticketId)
        this.state.modalAction === "cancelled" && this.props.cancelTicket( {ticketId, message: this.state.inputs.reason } )
        this.setState({modalOpen: false})
    }

    render() {
        const { state, props, getUserInfo, inputChange, statusChange, confirmModal } = this
        const { inputs: { status, type, subType, reason }, modalAction } = state
        const { tickets: { ticket, ticketMessages } } = props
        const user = getUserInfo()

        return (
            <Fragment>
                <div className="topTicket">
                    <div className="numberTicket">
                        <h3>Ticket #{ticket.id}</h3>
                        <span>Open date: {ticket.createdAt}</span>
                    </div>
                    <select value={status} onChange={(e) => statusChange(e)}>                                   
                        { ticket.status === "open" && <option value="open">{status === "open" && "•"} Open</option> }
                        { ((ticket.status === "open" && (user.role === "companyManager" || user.role === "customerService")) || ticket.status === "inProgress") && <option value="inProgress">{ticket.status === "inProgress" && "•"} In Progress</option> }
                        { (ticket.status !== "closed" && (ticket.status === "cancelled" || user.role === "student" || user.role === "teacher")) && <option value="cancelled">{ticket.status === "cancelled" && "•"} Cancelled</option> }
                        { (ticket.status !== "cancelled" && (ticket.status === "closed" || user.role === "companyManager" || user.role === "customerService")) && <option value="closed">{ticket.status === "closed" && "•"} Closed</option> }
                    </select>
                </div>
                
                <div className="bigBox">
                    <div className="infoTicket">
                        <p><span>Name: </span>{ticket.creatorUser.name}<span className="tag">{ticket.creatorUser.role}</span></p>
                    </div> 

                        <div className="infoTicket">
                            { (user.role === "student" || user.role === "teacher" || status === "closed" || status === "cancelled" ) 
                                && <Fragment>
                                    <p><span>Type: </span>{ticket.ticketType.nameEnglish}</p>
                                    <p><span>Subtype: </span>{ticket.ticketSubType.nameEnglish}</p>
                                </Fragment>
                            } { ((user.role === "companyManager" || user.role === "customerService") && !(status === "closed" || status === "cancelled")) 
                                && <Fragment>
                                    <InputTicketTypes name="type" value={type} type={"ticketTypes"} onChange={inputChange} />
                                    <InputTicketSubTypes name="subtype" value={subType} type={"ticketSubTypes"} onChange={inputChange} />
                                </Fragment> 
                            }
                            <p><span>Lingo: </span><FlagIcon code={ticket.lingoLanguage.flag} />{ticket.lingoLanguage.language.name}</p>            
                        </div> 
                        <hr/>
                        <div className="infoTicket">
                            <p><span>Title: </span>{ticket.title}</p>                                   
                            <p><span>Description: </span></p>                                   
                            <p>{ticket.description}</p>                                   
                        </div>      
                </div>
                { ticket.status === "cancelled" && ticketMessages.length > 0 &&
                    <Fragment>
                        <div className="topTicket">
                            <div className="numberTicketCancel">
                                <h3>Cancel information</h3>
                                <span>Cancel date: {ticket.updatedAt}</span>
                            </div>
                        </div>
                        <div className="bigBox">
                            <form>
                                <div className="infoTicket">
                                    <p>{ticketMessages[ticketMessages.length - 1].message}</p>                                     
                                </div>      
                            </form>                                   
                        </div>
                    </Fragment>
                }

                <Dialog
                    open={this.state.modalOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.setState({modalOpen: false})}
                    aria-labelledby='alert-dialog-slide-title'
                    aria-describedby='alert-dialog-slide-description'
                    >
                    <DialogTitle id='alert-dialog-slide-title'>
                        {'Please confirm'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-slide-description'>
                            { modalAction === "closed" && 'Do you really want to close this ticket ?'}
                            { modalAction === "cancelled" && 'Why you want to cancel your ticket?'}
                            <textarea value={reason} onChange={(e) => inputChange(e, "reason")} /> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => confirmModal(ticket.id) } color='primary'>
                            { modalAction === "closed" && 'Yes, close'}
                            { modalAction === "cancelled" && 'Confirm'}
                        </Button>
                        <Button onClick={() => this.setState({ modalOpen: false })  } color='primary'>
                        {'Cancel'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );

    }
}

const mapStateToProps = ({ tickets }) => ({ tickets });
const mapDispatchToProps = dispatch => ({
    getTicketTypes: data => dispatch(getTicketTypes(data)),
    getTicketSubTypes: data => dispatch(getTicketSubTypes(data)),
    unsetTicket: data => dispatch(unsetTicket(data)),
    unsetTicketSubTypes: data => dispatch(unsetTicketSubTypes(data)),
    proceedTicket: data => dispatch(proceedTicket(data)),
    cancelTicket: data => dispatch(cancelTicket(data)),
    closeTicket: data => dispatch(closeTicket(data)),
    getTicketMessages: data => dispatch(getTicketMessages(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Ticket))
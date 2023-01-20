import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { FlagIcon } from "react-flag-kit"
import { getTicketTypes, getTicketSubTypes, unsetTicket, unsetTicketSubTypes, proceedTicket, closeTicket, cancelTicket, sendTicketMessage, unsetTicketMessages, updateTicket } from '../../actions/ticketActions'
import InputTicketTypes from '../../elements/Inputs/InputTicketTypes';
import InputTicketSubTypes from '../../elements/Inputs/InputTicketSubTypes';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import { TicketStyle } from './styles';
import TicketMessages from './TicketMessages';
import IconAvatar from '../../images/profile/img_placeholder.svg';
import Enter from '../../images/btn_send.png';
import moment from 'moment';

import cancelImg from "../../images/schedule/img_class-scheduled_cancel.png";

import closedImg from "../../images/schedule/img_ticket-close.png";

import './styles.scss'

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
                type: ticket && ticket.ticketTypeId,
                subType: ticket && ticket.ticketSubTypeId,
                status: ticket && ticket.status,
                reason: "",
                message: ""
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
        this.props.getTicketSubTypes(this.props.tickets.ticket.ticketTypeId)
    }

    componentWillUnmount() {
        this.props.unsetTicket()
        this.props.unsetTicketMessages()
    }

	statusChange = (e) => {
        const { value } = e.target
		value === "inProgress" && this.props.proceedTicket(this.props.tickets.ticket.id)
		value !== "inProgress" && this.setState({ modalOpen: true, modalAction: value })
    } 


	inputChange = (e, name) => {
        const { value } = e.target
        console.log(name, value)
        name === "type" && this.props.getTicketSubTypes(value)
        this.setState({ inputs: { ...this.state.inputs, [name]: value } })
    } 

    confirmModal = (ticketId) => {
        this.state.modalAction === "closed" && this.props.closeTicket(ticketId)
        this.state.modalAction === "cancelled" && this.props.cancelTicket( {ticketId, message: this.state.inputs.reason } )
        this.setState({modalOpen: false})
    }

    sendMessage = () => {
        this.props.sendTicketMessage({ ticketId: this.props.tickets.ticket.id, message: this.state.inputs.message})
        this.setState({ inputs: { ...this.state.inputs, message: "" }})
    }

    ticketUpdate = () => {
        this.props.updateTicket({
            id: this.props.tickets.ticket.id,
            value: {
                ticketTypeId: Number(this.state.inputs.type),
                ticketSubTypeId: Number(this.state.inputs.subType),
                lingoLanguageId: Number(this.props.tickets.ticket.lingoLanguageId),
                title: this.props.tickets.ticket.title,
                description:  this.props.tickets.ticket.description,
                active: Boolean(this.props.tickets.ticket.active),
            }
        })
    }

    render() {
        const { state, props, getUserInfo, inputChange, statusChange, confirmModal, sendMessage, ticketUpdate } = this
        const { inputs: { status, type, subType, reason, message }, modalAction } = state
        const { t, tickets: { ticket, ticketMessages } } = props
        const user = getUserInfo()



        return (
            <TicketStyle>
                { ticket && 
                    <div>
                        <div className="topTicket" >
                            <div className="numberTicket">
                                <h3>Ticket #{ticket.id}</h3> 
                                <span>{t('OPEN_DATE')}: {moment(ticket.createdAt).tz(user.timezone).format(this.props.t('DATE_FORMAT') + ' - hh:mm A')}</span>
                            </div>
                            <select value={status} onChange={(e) => statusChange(e)} data-item={ticket.status === 'open' ? "OPEN" : ticket.status === 'inProgress' ? "IN_PROGRESS" : 'CANCELLED'}>                                   
                                { ticket.status === "open" && <option value="open">{status === "open" && "•"} {t('OPEN')}</option> }
                                { ((ticket.status === "open" && (user.role === "companyManager" || user.role === "customerService")) || ticket.status === "inProgress") && <option value="inProgress">{ticket.status === "inProgress" && "•"} {t('IN_PROGRESS')}</option> }
                                { (ticket.status !== "closed" && (ticket.status === "cancelled" || user.role === "student" || user.role === "teacher")) && <option value="cancelled">{ticket.status === "cancelled" && "•"} {t('CANCELLED')}</option> }
                                { (ticket.status !== "cancelled" && (ticket.status === "closed" || user.role === "companyManager" || user.role === "customerService")) && <option value="closed">{ticket.status === "closed" && "•"} {t('CLOSED')}</option> }
                            </select>
                        </div>
                        
                        <div className="bigBox infoTicket">
                        <form>
                            <div className="infoTicket">
                                <label>{t('NAME')}: </label><p>{ticket.creatorUser.name}</p><span className="tag">{t(`CARD_LIST_CUSTOM_SERVICE.${ticket.creatorUser.role}`)}</span>
                            </div> 
                               
                                    <div className="infoTicket">
                                        { (user.role === "student" || user.role === "teacher" || status === "closed" || status === "cancelled" ) 
                                            && <Fragment>
                                                <label>{t('TYPE')}: </label> {ticket.ticketType.nameEnglish} <label> {t('SUBTYPE')}:</label> {ticket.ticketSubType.nameEnglish}
                                                
                                            </Fragment>
                                        } { ((user.role === "companyManager" || user.role === "customerService") && !(status === "closed" || status === "cancelled")) 
                                            && <Fragment>
                                                <InputTicketTypes name="type" value={type} type={"ticketTypes"} onChange={inputChange} />
                                                <InputTicketSubTypes name="subType" value={subType} type={"ticketSubTypes"} onChange={inputChange} />
                                            </Fragment> 
                                        }
                                        <label>Lingo: </label> <FlagIcon code={ticket.lingoLanguage.flag} /> <p>{ticket.lingoLanguage.language.name}</p>           
                                    </div> 
                                    <hr/>
                                    <div className="infoTicket">
                                        <label>{t('TITLE')}: </label> <p> {ticket.title} </p>                             
                                    </div>  

                                    <div className="infoTicket">                                        
                                        <label> {t('DESCRIPTION')}: </label> <p>{ticket.description}</p>  
                              
                                    </div>  
                            </form>    
                        </div>
                        { ticket.status === "cancelled" && ticketMessages.length > 0 &&
                            <Fragment>
                                <div className="topTicket">
                                    <div className="numberTicketCancel">
                                        <h3>{t('CARD_CLASS_CANCEL')}</h3>
                                        <span>{t('CANCEL_DATE')}: {moment(ticket.updatedAt).format(this.props.t('DATE_FORMAT') + ' - hh:mm A')}</span>
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

                        { ticketMessages.length > 0 && <TicketMessages/> }

                        { ticket.status === "closed" &&
                            <div className="ticketClosed">
                                <h4>{t('CLOSED_TICKET')}</h4>
                                <span>{moment(ticket.updatedAt).format(this.props.t('DATE_FORMAT') + ' - hh:mm A')}</span>
                            </div>    
                        }

                        { ticket.status === "cancelled" &&
                            <div className="notes">
                                <div className="ticketCancelled">
                                    <h4>{t('CENCELLED_TICKET')}</h4>
                                    <span>{moment(ticket.updatedAt).format(this.props.t('DATE_FORMAT') + ' - hh:mm A')}</span>
                                </div>   
                            </div> 
                        }

                        { !(ticket.status === "closed" || ticket.status === "cancelled") &&
                            <div className="notes">
                                <div className="boxType send">
                                    <div className="avatar">
                                        <img src={user.picture || IconAvatar } alt=""/>
                                    </div>
                                    <form>
                                        <div className="typeMessage">
                                            <textarea className="input-lingo" value={message} placeholder={t('TYPE_MESSAGE')}  maxLength="2000" onChange={(e) => inputChange(e, "message")}></textarea>                                            
                                        </div>
                                        <button type="button" className="enter" onClick={ () => sendMessage() }>
                                            <img src={Enter} alt=""/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        }
                        

                        <div className="buttons">
                            <button type="button" onClick={ () => this.props.history.goBack()}>{t('BTN_BACK')}</button>
                            <button type="button" className="button-save" onClick={ (e) => { ticketUpdate(e); this.props.history.push("/customer-service") }}>{t('BTN_SAVE')}</button>
                        </div>
                        <Dialog
                            open={this.state.modalOpen}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => this.setState({modalOpen: false})}
                            aria-labelledby='alert-dialog-slide-title'
                            aria-describedby='alert-dialog-slide-description'
                            className="boxModal"
                            >
                            <DialogTitle id='alert-dialog-slide-title' className="titleCancelClass">
                            { modalAction === "cancelled" && 
                                t('CANCEL_TICKET')
                            }

                            { modalAction === "closed" && 
                                'Close ticket'
                            }
                            </DialogTitle>
                            <DialogContent className="boxModal">
                                <DialogContentText id='alert-dialog-slide-description'>
                                    
                                    { modalAction === "closed" && 
                                        <div>
                                            <img src={closedImg} alt="closedImg" />
                                            <h3>Do you really want to close this ticket ?</h3>
                                        </div>
                                    }
                                    { modalAction === "cancelled" && 
                                        <div>
                                            <img src={cancelImg} alt="cancelImg" />
                                            <h3>{t('CANCEL_MESSAGE_TICKET')}</h3>
                                        </div>
                                    }

                                    { modalAction === "cancelled" &&
                                       
                                        <textarea value={reason} onChange={(e) => inputChange(e, "reason")} className="input-lingo inputManage" placeholder={t('PLEASE_TELL_CANCEL_MESSAGE_TICKET')} required/> 
                                        
                                    }
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="boxModal">
                                <Button onClick={ () => confirmModal(ticket.id) } color="secondary" autoFocus style={{width: '318px', marginLeft: '10px', background: '#FF5666', color: '#fff', border: 'none', fontFamily: 'Work Sans, sans-serif',  fontWeight: 'bold', fontSize: '14px', marginTop: '15px'}}>
                                    { modalAction === "closed" && 'Yes, close'}
                                    { modalAction === "cancelled" && t('CANCEL_OPENDED_TICKET')}
                                </Button>
                                <Button onClick={() => this.setState({ modalOpen: false })  } color="primary" autoFocus style={{backgroundColor: 'transparent', border: '1px solid #787780', color: '#787780', fontWeight: '500'}}>
                                {t('OOOPS_DONT')}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
            </TicketStyle>
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
    sendTicketMessage: data => dispatch(sendTicketMessage(data)),
    unsetTicketMessages: data => dispatch(unsetTicketMessages(data)),
    updateTicket: data => dispatch(updateTicket(data)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(translate('translations')(Ticket))

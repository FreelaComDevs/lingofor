import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Up from '../../images/icons/icon_cs_up.png';
import Down from '../../images/icons/icon_cs_down.png';
import IconAvatar from '../../images/profile/img_placeholder.svg';

import moment from 'moment';
import timezone from "moment-timezone";

import Moment from 'react-moment'

import './styles.scss'

class TicketMessages extends Component {

    state = this.initialState    
	
	get initialState() {
		return {
            isVisibleExtra: false,
		}
    }

    last5Messages = (messages) => {
        if (messages.length > 5) {
            return messages.filter((message, index) => {
                console.log(message, index)
            })
        } else { return messages }
    }

    handleSubmit = () => {
        this.props.sendTicketMessage(this.state.inputs.message)
    }

	inputChange = (e, name) => {
        const { value } = e.target
        const { inputs }  = this.state
        inputs[name] = value
		this.setState({ inputs })
    } 

    filterMessages = (messages) => {
        return messages.filter((message, index) => {
            if (this.props.tickets.ticket.status === "cancelled") {
                if (index > messages.length - 7 && index !== messages.length - 1) { 
                    console.log(index);return true 
                } else return false
            }
            if (index > messages.length - 6) { return true }
        })
    }

    getUserInfo() {
        const token = JSON.parse(localStorage.getItem('@lingo')).token;
        const payload = token.split('.')[1];
        const base64 = payload.replace('-', '+').replace('_', '/');
        const userTime = JSON.parse(window.atob(base64));
        Moment.globalTimezone = userTime.timezone;
        
        return JSON.parse(window.atob(base64));
    }

    userTimezoneConvert = (time, timeTimezone) => {
        const user = this.getUserInfo();
        return timezone
          .tz(time, timeTimezone)
          .clone()
          .tz(user.timezone);
      };

    render() {
        const { state, props, filterMessages, getUserInfo } = this
        const { isVisibleExtra } = state
        const { t, tickets: { ticketMessages } } = props
        let filtredMessages = []
        filtredMessages = !isVisibleExtra ? filterMessages(ticketMessages) : ticketMessages
        const user = getUserInfo()
        

        return (
            <div className="notes">
                { filtredMessages.length > 0 && 
                    <Fragment>
                        <h2>{t('HISTORY')}</h2>
                        { ticketMessages.length > 5 &&
                            <div className="extras">
                                { !isVisibleExtra 
                                    ? <button onClick={() => this.setState({ isVisibleExtra: !isVisibleExtra})}> 
                                        Show more messages ({ticketMessages.length})<img src={Down} /> 
                                    </button>
                                    : <button onClick={() => this.setState({ isVisibleExtra: !isVisibleExtra})}> 
                                        Show less messages <img src={Up} /> 
                                    </button>
                                }
                            </div>
                        }
                        <hr/>
                        { filtredMessages.map(ticketMessage => {
                            const userTimeZone = moment(ticketMessage.updatedAt).tz(user.timezone);
                            
                            return(
                                
                            <div key={ticketMessage.id} className={`infos ${ ticketMessage.creatorUser.id === user.id ? "owner" : "" }`}>
                                <div className="avatar">
                                    <img src={ticketMessage.creatorUser.picture || IconAvatar } alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                {ticketMessage.creatorUser.name}
                                            </div>
                                            <div className="itemInfo">
                                                <span>{t(`CARD_LIST_CUSTOM_SERVICE.${ticketMessage.creatorUser.role}`)}</span>
                                            </div>
                                            <div className="itemInfo">
                                                {userTimeZone.format("DD/MM/YYYY") + ' • ' + t(userTimeZone.format('dddd'))+ ' • ' +userTimeZone.format('hh:mm a')} 
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>{ticketMessage.message}</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                        <hr/>    
                    </Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ tickets }) => ({ tickets });
export default connect(mapStateToProps)(translate('translations')(TicketMessages))

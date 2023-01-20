import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import Up from '../../images/icons/icon_cs_up.png';
import Down from '../../images/icons/icon_cs_down.png';
import IconAvatar from '../../images/profile/img_placeholder.svg';
import Moment from 'react-moment';

class DemoClassMessages extends Component {

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
            if (index > messages.length - 6) { return true }
        })
    }

    getUserInfo() {
        const token = JSON.parse(localStorage.getItem('@lingo')).token;
        const payload = token.split('.')[1];
        const base64 = payload.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    render() {
        const { state, props, filterMessages, getUserInfo } = this
        const { isVisibleExtra } = state
        const { t, demoClasses: { demoClassMessages } } = props
        let filtredMessages = []
        filtredMessages = !isVisibleExtra ? filterMessages(demoClassMessages) : demoClassMessages
        const user = getUserInfo()

        return (
            <div className="demoClassNotes">
                { filtredMessages.length > 0 && 
                    <Fragment>
						          { demoClassMessages.length > 0 ? <h4>{t("NOTES_HISTORY")}</h4> : <h4>{t("ADD_NOTE")}</h4> }
                        { demoClassMessages.length > 5 &&
                            <div className="extras">
                                { !isVisibleExtra 
                                    ? <button onClick={() => this.setState({ isVisibleExtra: !isVisibleExtra})}> 
                                        Show more messages ({demoClassMessages.length})<img src={Down} /> 
                                    </button>
                                    : <button onClick={() => this.setState({ isVisibleExtra: !isVisibleExtra})}> 
                                        Show less messages <img src={Up} /> 
                                    </button>
                                }
                            </div>
                        }
                        <hr/>
                        { filtredMessages.map(message => 
                            <div key={message.id} className={`infos ${ message.user.id === user.id ? "owner" : "" }`}>
                                <div className="demoClassMessage">
                                    <div className="avatar">
                                        <img src={message.user.picture || IconAvatar } alt=""/>
                                    </div>
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="name">
                                                {message.user.name}
                                            </div>
                                            <div className="role">
                                                <span>{t(message.user.role.toUpperCase())}</span>
                                            </div>
                                            <div className="date">
                                            <Moment format="DD/MM/YYYY - hh:mm A">{message.user.createdAt}</Moment>
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>{message.message}</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr/>    
                    </Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ demoClasses }) => ({ demoClasses });
export default connect(mapStateToProps)(translate('translations')(DemoClassMessages))

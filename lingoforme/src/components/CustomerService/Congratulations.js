import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Congratulations } from './styles'
import Confirm from '../../images/sign-up/subscription_confirm.png'

class CongratulationsComp extends Component {
    render() {
        const { tickets: { ticket } } = this.props
        return (
            <Congratulations>
                <div>
                    <div className="bigBox">
                        <h3>Congratulations!</h3>
                        <img src={Confirm} alt="Confirm" />
                        <p>Your ticket has been opened!<br/> Ticket number:</p>
                        <span>{ticket.id}</span>
                    </div>
                </div>
                <div className="container">
                    <div className="buttons">
                        <button type="button" onClick={ () => this.props.history.push(`/customer-service/${ticket.id}`) }>View ticket</button>
                    </div>
                </div>
            </Congratulations>
        );

    }
}

const mapStateToProps = ({ tickets }) => ({ tickets });


export default withRouter(connect(mapStateToProps)(translate('translations')(CongratulationsComp)))
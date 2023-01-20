import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

class InputTicketSubTypes extends Component {
    render() {
        const { t, type, name, value, onChange, required, error, tickets: { ticketSubTypes } } = this.props

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                <label htmlFor={name}>{ t("SUBTYPE") }</label>
                { required && <span className={`${error ? "invalid" : ""}`}>{ t('REQUIRED_FIELD')}</span> }
                <select name={name} value={value} onChange={(e) => onChange(e, name)}>
                    <option value={""} > { t("SELECT") }</option>
                    { ticketSubTypes.map((option) => 
                       option.active === true && (
                            <option key={option.nameEnglish} value={option.id}> {option.nameEnglish} </option> )
                        )
                    }
                </select>
            </div>
        )
    }
} 

const mapStateToProps = ({ tickets }) => ({ tickets, });
export default (connect(mapStateToProps, null, null, { pure: false })(translate('translations')(InputTicketSubTypes)))
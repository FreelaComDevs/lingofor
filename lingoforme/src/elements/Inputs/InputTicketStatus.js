import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

class InputStatus extends Component {
    render() {
        const { t, type, name, value, onChange, required, error} = this.props
        const statusOptions = [
            { id: 'inProgress', name: t('CARD_LIST_CUSTOM_SERVICE.inProgress') },
            { id: 'open', name: t('CARD_LIST_CUSTOM_SERVICE.open') },
            { id: 'closed', name: t('CARD_LIST_CUSTOM_SERVICE.closed') },
            { id: 'cancelled', name: t('CARD_LIST_CUSTOM_SERVICE.cancelled') }
        ]

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                <label htmlFor={name}>{ t("STATUS") }</label>
                { required && <span>{ t('REQUIRED_FIELD')}</span> }
                <select name={name} value={value} onChange={(e) => onChange(e, name)}>
                    <option value={""} > { t("SELECT") }</option>
                    { statusOptions.map((option) => <option key={option.name} value={option.id}> {option.name} </option> )}
                </select>
            </div>
        )
    }
} 

export default translate('translations')(InputStatus)

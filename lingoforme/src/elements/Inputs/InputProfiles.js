import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

class InputProfiles extends Component {
    render() {
        const { t, type, name, value, onChange, required, error } = this.props
        const profiles = [ 'STUDENT', 'TEACHER', 'COORDINATOR', 'COMPANY_MANAGER', 'CUSTOMER_SERVICE', 'B2B' ].map((option, index) => { return { id: index, name: option }})

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                <label htmlFor={name}>{ t("PROFILE") }</label>
                { required && <span>{ t('REQUIRED_FIELD')}</span> }
                <select name={name} value={value} onChange={(e) => onChange(e, name)}>
                    <option value={""} > { t("SELECT") }</option>
                    { profiles.map((option) => <option key={option.name} value={option.id}> {option.name} </option> )}
                </select>
            </div>
        )
    }
} 

export default translate('translations')(InputProfiles)
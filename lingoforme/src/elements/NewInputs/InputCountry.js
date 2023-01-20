import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

class InputLingoPlans extends Component {
    render() {
        const { t, type, name, value, onChange, required, error, lingo: { countries } } = this.props

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                <label htmlFor={name}>{ t("COUNTRY") }</label>
                { required && <span>{ t('REQUIRED_FIELD')}</span> }
                <select name={name} value={value} onChange={(e) => onChange(e, name)}>
                    <option value={""} > { t("SELECT") }</option>
                    { countries.map((option) => <option key={option.name} value={option.id}> {option.name} </option> )}
                </select>
            </div>
        )
    }
} 

const mapStateToProps = ({ lingo }) => ({ lingo, });
export default (connect(mapStateToProps, null, null, { pure: false })(translate('translations')(InputLingoPlans)))
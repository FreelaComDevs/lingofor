import React from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

const InputCompanySelect = ({ t, type, name, value, onChange, required, error, lingo: { economicGroups } }) =>  (
    <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
        <label htmlFor={name}>{ t("ECONOMIC_GROUP") }</label>
        { required && <span>{ t('REQUIRED_FIELD')}</span> }
        <select name={name} defaultValue={value}  onChange={(e) => onChange(e, name)}>
            <option value={""}> { t("SELECT") }</option>
                { economicGroups.map(({name, id}) => <option key={name} value={id}>{name}</option> )}
        </select>
    </div>
)

const mapStateToProps = ({ lingo }) => ({ lingo });
export default (connect(mapStateToProps)(translate('translations')(InputCompanySelect)))
import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'
import { isEqual } from 'lodash'


const InputEconomicGroupCompanySelect = ({ t, type, name, value, onChange, required, error, lingo: { economicGroupCompanys } }) =>  (
    <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
        <label htmlFor={name}>{ t("COMPANY") }</label>
        { required && <span>{ t('REQUIRED_FIELD')}</span> }
        <select name={name}  onChange={(e) => onChange(e, name)}>
            <option value={""}> { t("SELECT") }</option>
                { economicGroupCompanys.map(({id, socialName}, index) => 
                    <option key={socialName} value={id} defaultValue={value === "" ? false : (Number(id) === value ? true : false)} >
                        {socialName}
                    </option> 
                )}
        </select>
    </div>
)

const mapStateToProps = ({ lingo }) => ({ lingo });
export default (connect(mapStateToProps)(translate('translations')(InputEconomicGroupCompanySelect)))
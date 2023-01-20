import React from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'
import moment from 'moment'
import TimezonePicker from 'react-timezone'

const InputTimezone = ({ t, type, name, label, value, onChange, required, error }) => (
    <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
        { label && <label htmlFor={name}>{ t(label) }</label> }
        { required && <span>{ t('REQUIRED_FIELD')}</span> }
        <div>
            <TimezonePicker 
                name= 'timezone' 
                value={value} 
                inputProps={{ placeholder: t("SELECT_TIMEZONE") }}
                onChange={timezoneName => onChange({ target: { value: timezoneName }}, name)} 
            />
            { value && <p>{t("CURRENT_TIME")}<br />{`${t("IN_THIS_TIMEZONE")} ${moment.tz(value).format('LT')}`}</p> }
        </div>
    </div>
)

export default (translate('translations')(InputTimezone))
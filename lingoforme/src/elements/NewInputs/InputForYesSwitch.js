import React from 'react'
import { translate } from 'react-i18next'

const InputForYesSwitch = ({ t, name, label, data, inputChange, required }) =>  (
    <div className={`input-yesSwitch input-${name}`}>
        { label && <label htmlFor={name}>{ t(label) }</label> }
        { required && <span>{ t('REQUIRED_FIELD')}</span> }
        <div>
            <input id={name} type={"checkbox"} name={name} checked={data.value} onChange={(e) => inputChange(e.target)}/>
            <label className={data.value ? "isActive" : ""} htmlFor={name}>{data.value ? t("YES") : t("NO") }</label>
        </div>
    </div>
)

export default (translate('translations')(InputForYesSwitch))


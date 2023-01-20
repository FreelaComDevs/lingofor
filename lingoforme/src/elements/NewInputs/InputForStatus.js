import React from 'react'
import { translate } from 'react-i18next'
import InputSelect from './InputSelect'

const InputStatus = (props) => {
    const { t, name } = props
    const statusOptions = [ "pending", "noShow", "done", "cancelled" ].map(option => { return {id: option, name: option }})
    
    return (
        <div>
            <label htmlFor={name}>{ t("STATUS") }</label>
            <InputSelect options={statusOptions} { ...props }  />
        </div>
    )
}

export default translate('translations')(InputStatus)
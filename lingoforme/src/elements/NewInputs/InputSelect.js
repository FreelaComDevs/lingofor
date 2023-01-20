import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'

class InputSelect extends Component {
    render() {
        const { t, name, data, options, inputChange } = this.props
        const { value } = data 

        return (
            <div className="select-wrapper">
                <select className={ !value ? "placeholder" : "" } name={name} value={value} onChange={(e) => inputChange(e.target)}>
                    <option value={""} > { t("SELECT") }</option>
                    { options.map((option) => <option key={option.id} value={option.id}> {t(option.name.toUpperCase())} </option> )}
                </select>
            </div>
        )
    }
} 

export default (translate('translations')(InputSelect))
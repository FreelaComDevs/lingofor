import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FlagIcon from 'react-flag-kit/lib/FlagIcon';

class InputLingoLanguages extends Component {
    render() {
        const { t, type, name, value, onChange, required, error, lingo: { lingoLanguages } } = this.props

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                <label htmlFor={name}>{ t("LANGUAGE") }</label>
                { required && <span>{ t('REQUIRED_FIELD')}</span> }
                <div className="select-wrapper">
                    <Select disableUnderline name={name} value={value} onChange={(e) => onChange(e, name)} displayEmpty >
                        <MenuItem value={""} >{ t("SELECT") }</MenuItem>
                        { lingoLanguages.map((option) => 
                            <MenuItem key={option.language.name} value={option.id}>
                                <FlagIcon code={option.flag}/> 
                                <span className="lingoLanguageItem'">&nbsp;{t(option.language.name.toUpperCase())}</span>
                            </MenuItem> 
                        )}
                    </Select>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = ({ lingo }) => ({ lingo, });
export default (connect(mapStateToProps, null, null, { pure: false })(translate('translations')(InputLingoLanguages)))
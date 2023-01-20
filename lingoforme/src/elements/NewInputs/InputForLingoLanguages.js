import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { getLingoLanguages } from '../../actions/lingoActions'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FlagIcon from 'react-flag-kit/lib/FlagIcon';

class InputLingoLanguages extends Component {
    
  componentDidMount() {
    this.props.getLingoLanguages()
  }

  render() {
    const { t, name, data, inputChange, required, lingo: { lingoLanguages } } = this.props
    const { error, value } = data

    return (
      <div className="input-lingoLanguages">
        <label className={error?"invalid":""} htmlFor={name}>{t("LANGUAGE")}</label>
        {required && <span>{ t('REQUIRED_FIELD')}</span>}
        <div className="select-wrapper">
          <Select disableUnderline className={ !value ? "placeholder" : "" } name={name} id={name} value={value || ""} onChange={(e) => inputChange(e.target)} displayEmpty >
            <MenuItem value={""} >{ t("SELECT") }</MenuItem>
            { lingoLanguages.map((option) => 
              <MenuItem key={option.language.name} value={option.id}>
                <FlagIcon code={option.flag} number={'22px'}/>&nbsp;
                <span className="lingoLanguageItem'">{t(option.language.name.toUpperCase())}</span>
              </MenuItem> 
            )}
          </Select>
        </div>
      </div>
    )
  }
} 

const mapStateToProps = ({ lingo }) => ({ lingo, });
const mapDispatchToProps = dispatch => ({
    getLingoLanguages: data => dispatch(getLingoLanguages(data)),
});

export default (connect(mapStateToProps, mapDispatchToProps)(translate('translations')(InputLingoLanguages)))
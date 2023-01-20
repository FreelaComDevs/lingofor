import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { getLingoPlans } from '../../actions/lingoActions'

class InputLingoLanguages extends Component {
    
  componentDidMount() {
    this.props.getLingoPlans()
  }

  render() {
    const { t, name, data, inputChange, lingo: { lingoClassTool } } = this.props
    const { error, value, required } = data
    return (
      <div className="input-lingoClassTool">
        <label htmlFor={name}>{t("CLASS_TOOL")}</label>
        {/* {required && <span>{ t('REQUIRED_FIELD')}</span>} */}
        <div className="select-wrapper">
          <select name={name} value={value ? value : ''} onChange={(e) => inputChange(e.target)}>
            <option value={""} > { t("SELECT") }</option>
            { lingoClassTool && lingoClassTool.map((option) => <option key={option.name} value={option.name}> {option.name} </option> )}
          </select>
        </div>
      </div>
    )
  }
} 

const mapStateToProps = ({ lingo }) => ({ lingo, });
const mapDispatchToProps = dispatch => ({
  getLingoPlans: data => dispatch(getLingoPlans(data)),
});

export default (connect(mapStateToProps, mapDispatchToProps)(translate('translations')(InputLingoLanguages)))
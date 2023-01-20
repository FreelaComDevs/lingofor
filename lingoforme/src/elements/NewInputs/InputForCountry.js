import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { getLingoAllCountries } from '../../actions/lingoActions'

class InputForCountry extends Component {
    
  componentDidMount() {
    this.props.getLingoAllCountries()
  }

  render() {
    const { t, name, data, inputChange, lingo: { countries } } = this.props
    const { error, value, required } = data

    return (
      <div className="input-country">
        <label className={error?"invalid":""} htmlFor={name}>{t("COUNTRY")}</label>
        {required && <span>{ t('REQUIRED_FIELD')}</span>}
        <div className="select-wrapper">
          <select className={error?"invalid":""}  name={name} value={value} onChange={(e) => inputChange(e.target)}>
            <option value={""} > { t("SELECT") }</option>
            { countries && countries.map((option) => <option key={option.name} value={option.id}> {option.name} </option> )}
          </select>
        </div>
      </div>
    )
  }
} 

const mapStateToProps = ({ lingo }) => ({ lingo, });
const mapDispatchToProps = dispatch => ({
  getLingoAllCountries: data => dispatch(getLingoAllCountries(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(InputForCountry))
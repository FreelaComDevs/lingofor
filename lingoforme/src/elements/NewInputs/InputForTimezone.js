import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { translate } from 'react-i18next'
import moment from 'moment'
import TimezonePicker from 'react-timezone'

import {ajusteTimeZoneSaoPailo} from '../../components/_common/momentLocalDate/momentLocalDate'

class InputForTimezone extends Component {

  constructor(props) {
    super(props);

    this.inputTimezone = React.createRef();
  }

  componentDidMount(){
   
    var buttons = document.getElementsByTagName('button');
    for (var i = 0, len = buttons.length; i < len; ++i) {
      var button = buttons[i]
      if(button.title === 'Amazon Time (Cuiaba)'){
        button.innerHTML = '(GMT-04:00) Amazon Time (Cuiaba)'
      }     
    }

  }

  render() {
    const { t, name, data, inputChange } = this.props

    setTimeout(() => {
      var inputs = document.getElementsByTagName('input');
      for (var i = 0, len = inputs.length; i < len; ++i) {
        var input = inputs[i]
        if(input.className.indexOf('jsx-4179805763') > -1){
          if(input.value === '(GMT-03:00) Amazon Time (Cuiaba)'){
            input.value = '(GMT-04:00) Amazon Time (Cuiaba)'
          }       
        }     
      }
    },50);
    
    return (
      <div className="input-timezone">
        <label className={data.error?"invalid":""} htmlFor={name}>{t("TIMEZONE")}</label>
        {data.required && <span>{ t('REQUIRED_FIELD')}</span>}
        <div className="select-wrapper">
          <div>
            <TimezonePicker 
                ref={this.inputTimezone}
                name= 'timezone' 
                value={data.value} 
                inputProps={{ placeholder: t("SELECT_TIMEZONE"), className: data.error ? "invalid":"" }}
                onChange={timezoneName => inputChange({ value: timezoneName, name }) } 
            />
            { data.value && <p>{t("CURRENT_TIME")}<br />{`${t("IN_THIS_TIMEZONE")} ${ajusteTimeZoneSaoPailo(moment(), data.value, 'LT')}`}</p> }
          </div>
        </div>
      </div>
    )
  }
} 

export default translate('translations')(InputForTimezone)
import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'

class InputForPhoneArray extends Component {

  render() {
    const { t, name, data, addField, removeField, childInputChange, newItem = { phone: { value: "", required: true }, userPhoneTypeId: { value: "", required: true }} } = this.props
    const phoneTypeOptions = ["COMMERCIAL", "RESIDENCIAL", "MOBILE", "WHATSAPP"].map( (option, index) => { return { id: index, name: option }})

    return (
      <div className="input-phone-array">     
        { data.map( (item, index) => (
          <div key={[item + index]}>
            <div className={`input-phone`}>
              <label className={item.phone.error ? "invalid" : ""} htmlFor={`phone`}>{ t("TELEPHONE") }</label>
              { item.phone.required && <span>{ t('REQUIRED_FIELD')}</span> }
              <input 
                className={item.phone.error?"invalid":""}
                name={name} 
                id={"phone"} 
                value={item.phone.value}
                placeholder={t("STUDENT_PHONE")} 
                onChange={(e) => childInputChange(e.target, index)}
              />
            </div>
            <div className={`input-userPhoneTypeId`}>
                <label className={item.userPhoneTypeId.error ? "invalid" : ""} htmlFor={`userPhoneTypeId`}>{ t("TYPE") }</label>
                { item.userPhoneTypeId.required && <span>{ t('REQUIRED_FIELD')}</span> }
                <div className="select-wrapper">
                  <select className={`${!item.userPhoneTypeId.value ? "placeholder" : ""} ${item.userPhoneTypeId.error?"invalid":""}`} name={name} id="userPhoneTypeId" value={item.userPhoneTypeId.value} onChange={(e) => childInputChange(e.target, index)}>
                    <option value={""} > { t("SELECT") }</option>
                    { phoneTypeOptions.map((option) => <option key={option.id} value={option.id + 1}> {t(option.name.toUpperCase())} </option> )}
                  </select>
                </div>
            </div>
            { index > 0 
              ? <button className='new-button remove-button' onClick={ (e) => removeField(e, name, index) }>{t("DELETE")} <i className="fa fa-times-circle-o" aria-hidden="true" /></button> 
              : <button className='new-button add-button' onClick={ (e) => addField(e, name, newItem) }>{t("ADD_TELEPHONE")} <span className="plus">+</span></button>
            }
          </div>
        ))}   
      </div>
    )
  }
} 

export default translate('translations')(InputForPhoneArray)
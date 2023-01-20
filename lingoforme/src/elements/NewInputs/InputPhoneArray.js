import React from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'
import { childChange, addField, removeField } from '../../helpers/inputs'

const InputPhoneArray = ({ t, type, name, value, newItem = { number: "", type: "" }, onChange, required, error }) =>  {
    const phoneTypeOptions = ["COMMERCIAL", "RESIDENCIAL", "MOBILE", "WHATSAPP"].map( (option, index) => { return { id: index, name: option }})

    return (
        <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
            { value.map( (item, index) => (
                <div key={name+index} className='lineInput'>
                    <div>
                        <label htmlFor={ name+index }>{t("TELEPHONE")}</label>
                        { required && <span className='invalid'>{ t('REQUIRED_FIELD')}</span> }
                        <input type="text" name={name} placeholder={t("STUDENT_PHONE")} value={item.phone} onChange={ (e) => childChange(e, name, value, "phone", index, onChange) } />
                    </div>
                    <div>
                        <label htmlFor={`type${index}`}>{ t("TYPE") }</label>
                        { required && <span className='invalid'>{ t('REQUIRED_FIELD')}</span> }
                        <div>
                            <select name={`${name+index}`} value={item.userPhoneTypeId}  onChange={ (e) => childChange(e, name, value, "userPhoneTypeId", index, onChange) }>
                                <option value={ "" }> { t("SELECT") }</option>
                                { phoneTypeOptions.map((option, optionsIndex) => { 
                                    return <option key={ optionsIndex } value={ option.id + 1}>{ option.name } </option>
                                })}
                            </select>
                            { index > 0 
                                ? <button className='removeInput' onClick={ (e) => removeField(e, name, value, index, onChange) }>{t("DELETE")} <i className="fa fa-times-circle-o" aria-hidden="true" /></button> 
                                : <button className='addInput' onClick={ (e) => addField(e, name, value, newItem, onChange) }>{`${t("ADD_TELEPHONE")} +`}</button>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = ({ lingo }) => ({ lingo, });
export default (connect(mapStateToProps, null, null, { pure: false })(translate('translations')(InputPhoneArray)))

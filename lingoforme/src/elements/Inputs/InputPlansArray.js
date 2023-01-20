import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { translate } from 'react-i18next'
import { cap } from '../../helpers/helpers'
import { childChange, addField, removeField } from '../../helpers/inputs'

class InputPlansArray extends Component {
    render() {
        const { t, type, name, value, onChange, required, error, newItem=0, lingo: { lingoPlans } } = this.props

        return (
            <div className={`lineInput lineInput${type} lineInput${cap(name)} ${error ? "invalid" : ""}`}>
                <div className="lineInput">
                    <label>{t("PLANS")}</label>
                    <div>
                        { value.map( (item, index) => (
                            <div key={`plan${index}`} className='lineInput'>
                                <label htmlFor={name+index}>{ t("PLAN") }
                                    { required && <span>{t('REQUIRED_FIELD')}</span> }
                                </label>
                                <select name={`${name+index}`} value={value[index]} onChange={(e) => childChange(e, name, value, null, index, onChange)}>
                                    <option value={""}> {t("SELECT")}</option>
                                    { lingoPlans.map(({id, nameEnglish}) => ( <option key={nameEnglish} value={id}>{nameEnglish}</option> ))}
                                </select>
                                { index > 0 && <button className='removeInput' onClick={(e) => removeField(e, name, value, index, onChange)}>Delete</button> }
                            </div>
                        ))}
                    </div>
                </div>   
                <button className='addInput' onClick={ (e) => addField(e, name, value, newItem, onChange) }>{`${t("BTN_ADD_NEW_PLAN")} +`}</button>
            </div>
        )
    }
} 

const mapStateToProps = ({ lingo }) => ({ lingo, });
export default (connect(mapStateToProps, null, null, { pure: false })(translate('translations')(InputPlansArray)))
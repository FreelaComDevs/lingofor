import React, { Fragment } from 'react'
import { translate } from 'react-i18next'
import InputText from './Inputs/InputText';
import InputSelect from './Inputs/InputSelect';
import InputDate from './Inputs/InputDate'
import InputPlansArray from './Inputs/InputPlansArray'
import InputSwitch from './Inputs/InputSwitch'
import InputNumber from './Inputs/InputNumber'
import InputTimezone from './Inputs/InputTimezone';
import InputLingoArray from './Inputs/InputLingoArray';
import InputEconomicGroupSelect from './Inputs/InputEconomicGroupSelect';
import InputEconomicGroupCompanySelect from './Inputs/InputEconomicGroupCompanySelect';
import InputLingoLanguages from './Inputs/InputLingoLanguages';
import InputPlans from './Inputs/InputPlans';
import InputClassTools from './Inputs/InputClassTools';
import InputCountry from './Inputs/InputCountry';
import InputPhoneArray from './Inputs/InputPhoneArray';
import InputProfiles from './Inputs/InputProfiles';

const Form = ({ t, label, inputs, inputChange, deleteHandle, edit }) => (
	<div className="bigBox bigBoxForm">
		<h2>{`${ edit ? t("EDIT") : t("ADD_NEW") } ${ t(label.toUpperCase()) }`}</h2>
		<form>
			{ inputs && inputs.map((data, index) => {
				switch (data.type) {
					case "title":
						return <h3 key={data.name}>{ data.label }</h3>
					case "text":
						return <InputText key={data.name} { ...data } onChange={inputChange}/> 
					case "select":
						return <InputSelect key={data.name} { ...data } onChange={inputChange}/> 
					case "number":
						return <InputNumber key={data.name} { ...data } onChange={inputChange}/> 
					case "date":
						return <InputDate key={data.name} { ...data } onChange={inputChange}/> 
					case "switch":
						return <InputSwitch key={data.name} { ...data } onChange={inputChange}/> 
					case "timezone":
						return <InputTimezone key={data.name} { ...data } onChange={inputChange}/>
					case "lingoLanguages":
						return <InputLingoLanguages key={data.name} { ...data } onChange={inputChange}/>
					case "plans":
						return <InputPlans key={data.name} { ...data } onChange={inputChange}/>
					case "profiles":
						return <InputProfiles key={data.name} { ...data } onChange={inputChange}/>
					case "countries":
						return <InputCountry key={data.name} { ...data } onChange={inputChange}/>
					case "phoneArray":
						return <InputPhoneArray key={data.name} { ...data } onChange={inputChange}/>
					case "classTools":
						return <InputClassTools key={data.name} { ...data } onChange={inputChange}/>
					case "plansArray":
						return <InputPlansArray key={data.name} { ...data } onChange={inputChange}/>
					case "economicGroupSelect":
						return <InputEconomicGroupSelect key={data.name} { ...data } onChange={inputChange}/>
					case "economicGroupCompanySelect":
						return <InputEconomicGroupCompanySelect key={data.name} { ...data } onChange={inputChange}/>
					case "lingoArray":
						return <InputLingoArray key={data.name} { ...data } onChange={inputChange}/>
					default:
						break;
				}
			})}
			{ deleteHandle && <button className='delete' onClick={ (e) => deleteHandle(e) }>{`Delete ${label}`}</button> }
		</form>
	</div>
)

export default (translate('translations')(Form))

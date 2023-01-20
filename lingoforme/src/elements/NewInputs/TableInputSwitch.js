import React from 'react'
import { translate } from 'react-i18next'

function TableInputSwitch(props){
  const { t, id, name, data, inputChange } = props
  return(
    <div className={`input-yesSwitch input-${name}`}>
        <div>
            <input id={name+id} type={"checkbox"} name={name} checked={data} onChange={(e) => { inputChange(e.target, id)}}/>
            <label className={data ? "isActive" : ""} htmlFor={name+id}>{data ? t("YES") : t("NO") }</label>
        </div>
    </div>
)}

export default (translate('translations')(TableInputSwitch))


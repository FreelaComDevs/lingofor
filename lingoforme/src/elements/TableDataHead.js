import React from "react"
import { translate } from 'react-i18next'

const TableDataText = ({t, data}) => { 
  if(data) { return (
    <th>{t(data.toUpperCase())}</th>
  )} else return <th></th>
}

export default translate('translations')(TableDataText)

import React from "react"
import { translate } from 'react-i18next'
import InputSwitch from "./NewInputs/TableInputSwitch";

const TableDataSwitch = ({ data, name, id, inputChange}) => (
  <td>
    <InputSwitch id={id} data={data} name={name} inputChange={inputChange} />
  </td>
)

export default translate('translations')(TableDataSwitch)

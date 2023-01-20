import React from "react"
import { translate } from 'react-i18next'

const TableDataButton = ({t, data, action}) => (
  <td>
    <button className="view-button" onClick={() => {action(data)}}>
      {t("VIEW")} <i className="fa fa-angle-right" aria-hidden="true" />
    </button>
  </td>
)

export default translate('translations')(TableDataButton)

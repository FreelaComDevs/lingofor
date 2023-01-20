import React from "react"
import { translate } from 'react-i18next'

const TableDataText = ({t, data}) => {
    return (
        <td data-item={data.toUpperCase()} >{t(data.toUpperCase())}</td>
    )
}

export default translate('translations')(TableDataText)

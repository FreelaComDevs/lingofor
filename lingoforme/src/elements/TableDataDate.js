import React from "react"
import { translate } from 'react-i18next'
import moment from 'moment'

const TableDataDate = ({t, data}) => (
    <td>{ moment(data).format('DD MMM YYYY - h:mm a')}</td>
)

export default translate('translations')(TableDataDate)

import React from "react"
import { translate } from 'react-i18next'
import FlagIcon from 'react-flag-kit/lib/FlagIcon';

const TableDataFlag = ({t, data}) => (   
    <td>{data.map((flag,index) => <FlagIcon key={'tblRowFlag'+ new Date().getMilliseconds() +index + flag} code={flag} size={18}/>)}</td>
)

export default translate('translations')(TableDataFlag)

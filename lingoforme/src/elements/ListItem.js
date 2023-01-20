import React from 'react'
import { translate } from 'react-i18next'

const ListItem = ({ name, label, value, t }) => (
    <div data-item={value} className={`list-item list-item-${name}`}>
        <h3>{ label }</h3>
        <p><span>{ t(value) }</span></p>
    </div>
)

export default (translate('translations')(ListItem))
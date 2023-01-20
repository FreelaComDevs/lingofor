import React from 'react'
import { translate } from 'react-i18next'
import Rating from 'react-rating';

const ListItem = ({ name, label, value }) => (
    <div data-item={value} className={`list-item list-item-rating list-item-${name}`}>
        <h3 className="rating">{ label }</h3>
        <label>{ value }</label>
        <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={value} readonly={true} />
    </div>
)

export default (translate('translations')(ListItem))
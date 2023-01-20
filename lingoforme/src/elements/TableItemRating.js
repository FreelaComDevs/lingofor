import React from 'react'
import { translate } from 'react-i18next'
import Rating from 'react-rating';

const ListItem = ({ index, item }) => (
    <td key={ 'tlbRowRating'+index } data-item={ item.rating } className="ratingTeachers">
        <label className="label">{ item.rating }</label>
        <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" initialRating={Number(item.rating)} readonly={true} />
    </td>
)

export default (translate('translations')(ListItem))
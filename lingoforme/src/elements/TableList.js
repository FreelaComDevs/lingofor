import React, { Fragment } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import Placeholder from '.././components/_common/placeholder/placeholderByPage';
import TableItemRating from './TableItemRating'
import { cap } from '../helpers/helpers'
import FlagIcon from 'react-flag-kit/lib/FlagIcon';

const TableList = ({ t, listItems, listedItems, action, component, history, type }) =>  {
    return (
        <Fragment>
            { !listedItems.length 
                ? <Placeholder pageName='users' textMsg='No results' /> 
                : <div className='bigBox bigBoxTableList'>
                    <table>
                        <tbody>
                            <tr>{ listItems.map( ({ label }, index) => <th key={ index }>{ label }</th> )}</tr>
                            { listedItems.map( ( item, index) => (
                                <tr key={ 'tblList'+index }>
                                    { listItems.map( ({ name }, index) => {
                                        switch (name) {
                                            case "button":
                                                return (
                                                    <td key={ 'tblRow'+index }>
                                                        <button className="view" onClick={ () => { action(item.id); component && history.push(`/${component}/${item.id}`) }}>
                                                            {t("VIEW")} <i className="fa fa-angle-right" aria-hidden="true" />
                                                        </button>
                                                    </td>
                                                )    
                                            case "rating":
                                                return <TableItemRating key={ 'tblRow'+index } name={name} item={item} index={index} />  
                                            case "classLingo":
                                                return <td>{item.languages.map((flag) => <FlagIcon code={flag} />)}</td>
                                            case "date":
                                                return <td key={ index }><p>{ item[name] }</p></td>
                                            default:
                                                return <td key={ index } data-item={ String(item[name]).toUpperCase() } ><p>{ t(item[name]) }</p></td>
                                            }
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
            }
        </Fragment>
    )
}

export default (withRouter((translate('translations')(TableList))))
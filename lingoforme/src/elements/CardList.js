import React, { Fragment } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import Placeholder from '.././components/_common/placeholder/placeholderByPage';
import TableItemRating from './TableItemRating'
import { cap } from '../helpers/helpers'

import moment from 'moment';

import './styles.scss'

const TableList = ({ t, listItems, listedItems, action, component, history, type }) =>  {

    return (
        <Fragment>
            { !listedItems.length 
                ? <Placeholder pageName='users' textMsg={t('NO_RESULTS')} /> 
                : listedItems.map((item, iItem) => (
                    <div key={'BigBox'+iItem} className='bigBoxCards'>
                        <div key={'box'+iItem} className='boxItems'>
                            { listItems.map(({label, name},i) => (
                                <div key={'listItem'+i} data-item={item[name]} className={`list-item list-item-${name}`}>
                                    
                                    { name === "rating" && <TableItemRating name={name} item={item[name]} /> }

                                    
                                    
                                    { !(name === "rating" || name === "button" ||  name === "createdAt" || name === "lastInteraction" || name==='status' || name==='role')
                                        && <Fragment>
                                            <h3>{ label }</h3>
                                            <p><span>{item[name]}</span></p>                                            
                                        </Fragment>
                                    }

                                    {(name==='role' || name ==='status')
                                      && <Fragment>                                            
                                          <h3>{ label }</h3>
                                          <p><span>{t(`CARD_LIST_CUSTOM_SERVICE.${item[name]}`)}</span></p>                                        
                                      </Fragment>
                                    }   
                                    
                                    { ( name === "createdAt" || name === "lastInteraction") && 
                                        <Fragment>
                                            <h3>{ label }</h3>
                                            <p><span>
                                                {moment(item[name]).tz(item.timezone).format(t('DATE_FORMAT') + ' - hh:mm A')}
                                            </span></p>
                                        </Fragment>
                                    }

                                    { name === "button" 
                                        &&  <button className="view" onClick={ () => { action(item.id); component && history.push(`/${component}/${item.id}`) }}>
                                            {t('VIEW')} <i className="fa fa-angle-right" aria-hidden="true" />
                                        </button>
                                    }
                                   
                                </div> 
                            ))}
                        </div>
                    </div>
                )) 
            }
        </Fragment>
    )
}

export default (withRouter((translate('translations')(TableList))))

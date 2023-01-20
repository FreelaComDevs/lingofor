import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { TableUser } from './styles';


class CompaniesList extends Component {

    setSelectedCompany = item => {
        this.props.setParentState({
            selectedCompany: item,
            showCompanyForm: true
        });
    }

    render () {
        const { t } = this.props;
        const items = this.props.items || [];
        return (<TableUser>
            <div>
                <div className='bigBox'>
                <table>
                    <thead>
                        <tr>
                            <th>{t('LEGAL_NAME')}</th>
                            <th>{t('ECONOMIC_GROUP')}</th>
                            <th>{t('DOCUMENT_NUMBER')}</th>
                            <th>{t('DATE')}</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.socialName}</td>
                                    <td>{item.economicGroup ? item.economicGroup.name : ''}</td>
                                    <td>{item.documentNumber}</td>
                                    <td>{item.registerDate}</td>
                                    <td><span className={(!item.active) ? 'inativo' : ''}>{(item.active) ? 'Active' : 'Inactive'}</span></td>
                                    <td>
                                        <button type="button" onClick={() => this.setSelectedCompany(item)}>
                                            {t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
            </div>
        </TableUser>)
    }
}

CompaniesList.propTypes = {
    t: PropTypes.func,
    items: PropTypes.array
}

export default translate('translations')(CompaniesList)

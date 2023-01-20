import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { TableUser } from '../companies/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from './actions';
import Placeholder from '../../_common/placeholder/placeholderByPage';


class ContractsList extends Component {

    componentDidMount () {
        const { service, actions } = this.props;
        service.fetchContracts(service.getEmptyContractFilter(), items => {
            actions.setContracts(items);
        });
    }

    setSelected = (item, contract) => {
        if (item.contracts && item.contracts.length > 0) {
            contract.economicGroup = item.economicGroup;
            contract.economicGroupId = item.economicGroupId;
            contract.socialName = item.socialName;
            contract.companyId = item.contracts[0].companyId;
            this.props.actions.setContract(contract);
        }
        
        this.props.setParentState({
            showContractForm: true
        });
    }

    render () {
        const { t } = this.props;
        const items = this.props.contracts || [];
        return (<TableUser>
            <div>
                <div className='bigBox'>
                <table>
                    <thead>
                        <tr>
                            <th>{t('CONTRACT_NUMBER')}</th>
                            <th>{t('ECONOMIC_GROUP')}</th>
                            <th>{t('COMPANY')}</th>
                            <th>{t('DESCRIPTION')}</th>
                            <th>{t('PERIOD')}</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => {
                            return item.contracts.map(contract => {
                              return (
                                <tr key={JSON.stringify(contract)}>
                                    <td data-id={contract.id}>{contract.code}</td>
                                    <td>{item.economicGroup.name}</td>
                                    <td>{item.socialName}</td>
                                    <td>{contract.description}</td>
                                    <td>{contract.startDate} - {contract.endDate}</td>
                                    <td><span className={(!contract.active) ? 'inativo' : ''}>{(contract.active) ? 'Active' : 'Inactive'}</span></td>
                                    <td>
                                        <button type="button" onClick={() => this.setSelected(item, contract)}>
                                            {t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                              )
                            })
                        })}
                    </tbody>
                </table>
                </div>
            </div>

            {items.length === 0 &&
                <div style={{paddingTop: '50px'}}>
                    <Placeholder pageName='users' textMsg='Nothing here yet' />
                </div>
            }
        </TableUser>)
    }
}

const mapStateToProps = state => {
    return {
      contracts: state.contracts.contracts
    };
};

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ContractsList))

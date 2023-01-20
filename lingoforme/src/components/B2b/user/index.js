import React, { Component } from 'react'
import Header from '../../_common/header/Header';
import SideMenu from '../../_common/SideMenu/SideMenu';
import Tabs from '../../_common/Tabs/tabs';
import { translate } from 'react-i18next'
import b2bImg from '../../../images/icons/icon_contract.svg'
import Placeholder from '../../_common/placeholder/placeholderByPage';
import Loading from 'react-fullscreen-loading';
import { Tab } from '../styles';
import { FilterUser } from '../companies/styles';

import ContractsFilter from './ContractsFilter';
import ContractsList from './Contracts';
import ContractForm from './ContractsForm';
import ContractTabs from '../contracts/Tabs';
import ContractTitle from '../contracts/Title';
import ContactSearch from '../contracts/ContactSearch';
import ContactList from '../contracts/ContactList';
import ContactFormList from '../contracts/ContactFormList';
import Students from '../students';
import util from '../companies/util';
import ContractService from './service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from '../contracts/actions';


class UserContracts extends Component {

    constructor (props) {
        super(props)
        this.service = new ContractService();
        this.state = {
            loading: false,
            activeTab : this.props.t('CONTRACTS_INFO'),
            showCompanyForm: false,
            showContractForm: false,
            selectedContract: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
          this.setState({ showContractForm: true });
        }
    }

    setSelected = (item, contract) => {
        if (item.contracts && item.contracts.length > 0) {
            contract.economicGroup = item.economicGroup;
            contract.economicGroupId = item.economicGroupId;
            contract.socialName = item.socialName;
            contract.companyId = item.contracts[0].companyId;
            this.props.actions.setContract(contract);
        }
        
        this.setParentState({
            showContractForm: true
        });
    }

    setParentState = (state) => {
        this.setState(state);
    }
 
    render () {
        const { t } = this.props;
        const deps = { util, service: this.service, setParentState: this.setParentState };
        const items = this.props.contracts || [];
        return (<div className='view'>
          <SideMenu />
          <section>
            <Header/>
            { this.state.loading && <Loading loading={this.state.loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/> }
            <div className="toptitle">      
              <img src={b2bImg} alt="B2b" />    
              <h1>B2B</h1>                   
            </div>

            <Tab>        
              <div className="container">                                    
                <Tabs activeTab={this.state.activeTab}>
                  <div label=""></div>
                  <div label={t('CONTRACTS_INFO')} >
                    {! this.state.showContractForm && <div>
                        <FilterUser>
                            <div>
                                <div style={{height:'55px'}}></div>
                                <ContractsFilter {...deps} />
                            </div>
                        </FilterUser>
                        <ContractsList {...deps} />
                    </div>}

                    {this.state.showContractForm && <div>
                        <ContractTitle />
                        <ContractTabs>
                            <div label="Contract">
                                <ContractForm {...deps}>
                                    <ContactList readOnly={true} {...deps} />
                                </ContractForm>
                            </div>
                            <div label="Students">
                                <Students {...deps} />
                            </div>
                        </ContractTabs>
                    </div>}
                  </div>
                </Tabs>
              </div>
            </Tab>
          </section>
        </div>)  
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

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(UserContracts))

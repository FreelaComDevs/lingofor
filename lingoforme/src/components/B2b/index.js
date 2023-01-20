import React, { Component } from 'react'
import Header from '../_common/header/Header';
import SideMenu from '../_common/SideMenu/SideMenu';
import Tabs from '../_common/Tabs/tabs';
import { translate } from 'react-i18next'
import b2bImg from '../../images/icons/icon_contract.svg'
import Placeholder from '../_common/placeholder/placeholderByPage';
import Loading from 'react-fullscreen-loading';
import { Tab } from './styles';
import { FilterUser } from './companies/styles';

import CompaniesFilter from './companies/Filter';
import CompaniesList from './companies/List';
import CompanyForm from './companies/Form';

import ContractsFilter from './contracts/Filter';
import ContractsList from './contracts/List';
import ContractForm from './contracts/Form';
import ContractTabs from './contracts/Tabs';
import ContractTitle from './contracts/Title';
import ContactSearch from './contracts/ContactSearch';
import ContactList from './contracts/ContactList';
import ContactFormList from './contracts/ContactFormList';
import Students from './students';

import util from './companies/util';
import CompanyService from './companies/service';
import Coupons from './Coupons/Coupons';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

class B2B extends Component {

    constructor (props) {
        super(props)
        this.service = new CompanyService();
        this.state = {
            loading: false,
            activeTab : this.props.t('COMPANY_INFO'),
            // activeTab : this.props.t('CONTRACTS_INFO'),
            showCompanyForm: false,
            showContractForm: false,
            selectedCompany: null,
            selectedContract: null,
            companies: [],
            showDialog: false,
            alertMessage: ''
        }
    }

    componentDidMount () {
        if (this.service.isCompanyManager()) {
            const self = this
            this.service.fetchCompanies(this.service.getEmptyFilter(), (companies) => {
                self.setState({ companies })
            });
        }
        if (this.props.match.path === "/b2b/coupons") {
            this.setState({ activeTab: "COUPONS_INFO" })
        }
    }

    setParentState = (state) => {
        this.setState(state);
    }

    render () {
        const { t, contracts } = this.props;
        const deps = { util, service: this.service, setParentState: this.setParentState };
        const { companies } = this.state;
        return (
            <div className='view'>
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
                                <div label={t('COMPANY_INFO')}>
                                    {! this.state.showCompanyForm && <div>
                                        <FilterUser>
                                            <div>
                                                <div className='button' style={{height:'55px'}}>
                                                    <button type="button" onClick={() => { this.setState({ showCompanyForm: true}) }}>
                                                        <i className='fa fa-plus' aria-hidden='true' /> {t('ADD_NEW_COMPANY')}
                                                    </button>
                                                </div>
                                                <CompaniesFilter {...deps} />
                                            </div>
                                        </FilterUser>

                                        {companies && companies.length > 0 && (
                                            <CompaniesList {...deps} items={companies} />
                                        )}

                                        {! this.state.loading && companies.length === 0 &&
                                            <div style={{paddingTop: '50px'}}>
                                                <Placeholder pageName='users' textMsg='Nothing here yet' />
                                            </div>
                                        }
                                    </div>}

                                    {this.state.showCompanyForm && <div>
                                        <div style={{height:'55px'}}></div>
                                        <CompanyForm {...deps} selectedCompany={this.state.selectedCompany} />
                                    </div>}
                                </div>
                                                
                                <div label={t('CONTRACTS_INFO')} >
                                    {! this.state.showContractForm && <div>
                                        <FilterUser>
                                            <div>
                                                <div className='button' style={{height:'55px'}}>
                                                    <button type="button" onClick={() => { this.setState({ showContractForm: true}) }}>
                                                        <i className='fa fa-plus' aria-hidden='true' /> {t('Add New Contract')}
                                                    </button>
                                                </div>
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
                                                    <ContactSearch {...deps} />
                                                    <ContactList {...deps}>
                                                        <ContactFormList {...deps} />
                                                    </ContactList>
                                                </ContractForm>
                                            </div>
                                            <div label="Students">
                                                <Students {...deps} />
                                            </div>
                                        </ContractTabs>
                                    </div>}
                                </div>
                            
                                <div label={t('COUPONS_INFO')}>
                                    <Coupons />
                                </div>
                            </Tabs>                                   
                        </div>
                    </Tab>  
                    <Dialog open={this.state.showDialog} onClose={() => this.setState({showDialog: false})} className="alert-dialog-slide">
                        <DialogTitle className="alert-dialog-slide-title boxModal teste">
                            {t(this.state.alerttitle)}
                        </DialogTitle>
                        <DialogContent className="alert-dialog-slide-content boxModal">
                            {t(this.state.alertMessage)}
                        </DialogContent><br/>
                        
                        <DialogActions className="alert-dialog-slide-actions buttons boxModal">
                            <button onClick={() => this.setState({showDialog: false})}>
                            {t('OK')}
                            </button>
                        </DialogActions>
                    </Dialog> 

                </section>
            </div>
        )

    }
}


export default (translate('translations')(B2B))

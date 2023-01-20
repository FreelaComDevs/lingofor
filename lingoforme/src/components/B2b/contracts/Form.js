import React, {Component} from 'react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { User } from '../companies/styles';
import * as actionsCreators from './actions';

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export class ContractForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.contract,
            companies: [],
            open: false
        };
    }

    componentDidMount () {
        const { service, actions, contract } = this.props
        service.fetchCompanies(service.getEmptyFilter(), items => {
            const economicGroups = service.extractEconomicGroupsFromCompanies(items)
            actions.setEconomicGroups(economicGroups)
            if (contract.id && contract.economicGroupId) {
                const economicGroup = this.props.economicGroups.find(item => {
                    return parseInt(item.id) === parseInt(contract.economicGroupId);
                });
                this.setState({
                  companies: economicGroup.companies
                });
            }
        });
        service.fetchAllPlans(items => {
            actions.setPlanList(items);
        });
    }

    validateForm () {

        this.props.contractContactsNew.map(item => {
            //console.log('teste telefone', item)
             if(!item.name) { return this.setState({open: true, dialogMsg: 'Required Name',  dialogTitle: 'ERROR'})}
             if(!item.email) { return this.setState({open: true, dialogMsg: 'Required Email',  dialogTitle: 'ERROR'})}
             if(!item.gender) { return this.setState({open: true, dialogMsg: 'Required Gender',  dialogTitle: 'ERROR'})}
             if(!item.timezone) { return this.setState({open: true, dialogMsg: 'Required Timezone',  dialogTitle: 'ERROR'})}
             if(!item.address) { return this.setState({open: true, dialogMsg: 'Required Address',  dialogTitle: 'ERROR'})}
             if(item.userPhones.lenght === 0) { return this.setState({open: true, dialogMsg: 'Required Telephone',  dialogTitle: 'ERROR'})}
             
            })
    
        if(this.state.code === '') {
          this.setState({
            open: true,
            dialogMsg: 'Required number of contract',
            dialogTitle: 'ERROR'
          })
          return false
        }

        if(this.state.description === '') {
            this.setState({
              open: true,
              dialogMsg: 'Required description',
              dialogTitle: 'ERROR'
            })
            return false
        }

        if(this.state.companyId === 0) {

            this.setState({
              open: true,
              dialogMsg: 'Necessary economic group',
              dialogTitle: 'ERROR'
            })
            return false
        }

        // if(this.state.companyId === undefined) {
        //     this.setState({
        //       open: true,
        //       dialogMsg: 'Necessary',
        //       dialogTitle: 'ERROR'
        //     })
        //     return false
        // }

        if(this.state.startDate === '') {
            this.setState({
              open: true,
              dialogMsg: 'Necessary Start',
              dialogTitle: 'ERROR'
            })
            return false
        }

        if(this.state.endDate === '') {
            this.setState({
              open: true,
              dialogMsg: 'Necessary End',
              dialogTitle: 'ERROR'
            })
            return false
        }

       
        
    
        return true
      }

    addField = () => {
        const { contractPlans } = this.state;
        contractPlans.push({
            planId: this.props.planList[0].id,
            quantity: 1
        });
        this.setState({ contractPlans })
    }

    removeField = e => {
        const { index } = e.target.dataset;
        const { contractPlans } = this.state;
        contractPlans.splice(index, 1);
        this.setState({ contractPlans })
    }

    handleChange = e => {
        const name = e.target.name;
        const value = (name === 'active') ? !this.state.active : e.target.value;
        this.setState({
          [name]: value
        })
    }

    handleChangeEconomicGroup = e => {
        
            const id = e.target.value;
            const economicGroup = this.props.economicGroups.find(item => {
                
                    return parseInt(item.id) === parseInt(id);
            
            });
            
            this.setState({
                companies: economicGroup.companies,
                companyId: economicGroup.companies[0].id
            })
                
            
    }

    handleBack = () => {
        this.props.setParentState({ showContractForm: false });
        this.props.actions.clearContractForm();
    }

    handleChangeContractPlans = e => {
       
        const { name, value, dataset } = e.target;
        const items = this.state.contractPlans
        if (dataset.id) {
            items[dataset.index].id = dataset.id
        }
        items[dataset.index][name] = value
        this.setState({
            contractPlans: items
        })
        
    }

    handleDelete = () => {
        const { service, setParentState } = this.props;
        setParentState({ loading: true });
        service.removeContractById(this.state.id)
            .then(() => {
                setParentState({ loading: false });
                // window.location.reload();
            })
            .catch(err => {
                console.error('Failed to delete contract. ', err);
                setParentState({ loading: false });
                window.location.reload();
            });
    }

      handleSubmit = () => {

        if (this.validateForm()) {
            const { service, setParentState, contract, contractContactsNew } = this.props;
            const newContract = {
                ...contract,
                ...this.state
            };
            newContract.contractContacts = contract.contractContacts;
            
            setParentState({ loading: true });
            service.saveContract({
                ...newContract,
                contractContactsNew
            })
            .then(res => {
                // const contractContacts = res.result.items[0].contractContacts;
                // contractContacts.forEach((contractContact, idx) => {
                //     const contact = contractContactsNew[idx];
                //     if (contact && contact.file) {
                //         console.log('tentando upload')
                //         const formData = new FormData();
                //         formData.append('file', contact.file);
                //         service.uploadPicture(contractContact.contact.userId, formData);
                //     }
                // });
                setParentState({ loading: false });
                this.props.setParentState({ showContractForm: false });
                this.props.actions.clearContractForm();
            })
            .catch(err => {
                console.log('Failed to save the contract.', err);
                setParentState({ loading: false });
            });
        }
    }

    render () {
        const { t } = this.props;
        const economicGroups = this.props.economicGroups || []
        const { id } = this.state;

        return (<User>
            <div className='bigBox bigBoxForm' style={{paddingLeft: '100px'}}>

                <h2>{id && id > 0 ? t('EDIT') : t('ADD_NEW')} {t('CONTRACT')}</h2>
                
                <form className='formulario' style={{margin: '0'}}>
                    <div className='lineInputs'>
                        <div>
                            <label>{t('CONTRACT_NUMBER')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <input type="text" name="code" value={this.state.code} onChange={this.handleChange} />
                    </div>

                    <div className='lineInputs'>
                        <div>
                            <label>{t('DESCRIPTION')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    </div>

                    <div className='lineInputs'>
                        <div>
                            <label>{t('ECONOMIC_GROUP')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>

                        
                        <select
                            value={this.state.economicGroupId}
                            onChange={this.handleChangeEconomicGroup}
                            className='input-lingo'
                            name='economicGroupId'
                        >

                            <option>Select</option>
                            {economicGroups.sort((a, b) => (a.name > b.name) ? 1 : -1).map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>
                    
                    <div>
                        <div>
                            <label>{t('LEGAL_NAME')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <select
                            value={this.state.companyId}
                            onChange={this.handleChange}
                            className='input-lingo'
                            name='companyId'
                        >
                            <option>Select</option>
                            {this.state.companies.map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>


                    <div className="lineInputs period">
                        <label>{t('PLANS')}</label>
                        <div className="lingos">
                            <div className="lingoSelects">
                                <div className="linha"></div>
                                <div className="selects">
                                    <div className="delet">
                                        {this.state.contractPlans.map((item, index) => {
                                            return <div key={index*7}>
                                                <div>
                                                    {t('PLAN')} #{index+1}
                                                    <button type="button" data-index={index} className="btn delete" onClick={this.removeField}>
                                                        Delete <i className="fa fa-times-circle-o" aria-hidden="true" />
                                                    </button>
                                                </div>

                                                <div style={{display:'flex'}}>
                                                    <div className="lineInputs" style={{flex: '1 0 auto', marginRight: '20px'}}>
                                                        <div>
                                                            <label>{t('PLAN')}</label>
                                                            <span>{t('REQUIRED')}</span>
                                                        </div>

                                                        <select
                                                            onChange={this.handleChangeContractPlans}
                                                            data-index={index}
                                                            data-id={item.plan ? item.plan.id : null}
                                                            value={item.planId}
                                                            name='planId'
                                                        >
                                                            <option>Select</option>
                                                            {this.props.planList.map(p => {
                                                                return (
                                                                    <option
                                                                        key={p.id}
                                                                        value={p.id}>
                                                                        {p.nameEnglish}
                                                                    </option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="lineInputs" style={{flex: '1 0 auto'}}>
                                                        <div>
                                                            <label>{t('STUDENTS')}</label>
                                                            <span>{t('REQUIRED')}</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className={`quantity_${index}`}
                                                            style={{width: '150px'}}
                                                            name="quantity"
                                                            data-index={index}
                                                            value={item.quantity}
                                                            onChange={this.handleChangeContractPlans} />
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                        <div>
                                            {this.state.contractPlans.length < this.props.planList.length &&
                                                <button type="button" className="btn-add-field" onClick={this.addField}>
                                                    {t('BTN_ADD_NEW_PLAN')} +
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lineInputs period">
                        <label>{t('PERIOD')}</label>
                        <div className="lingos">
                            <div className="lingoSelects">
                                <div className="selects" style={{flexDirection: 'row'}}>
                                    <div className="lineInputs" style={{marginRight: '20px'}}>
                                        <div>
                                            <label>{t('START')}</label>
                                            <span>{t('REQUIRED')}</span>
                                        </div>
                                        <input style={{width:'200px'}} type="date" name="startDate" value={this.state.startDate} onChange={this.handleChange}/>
                                    </div>
                                    <div className="lineInputs">
                                        <div>
                                            <label>{t('END')}</label>
                                            <span>{t('REQUIRED')}</span>
                                        </div>
                                        <input style={{width:'200px'}} type="date" name="endDate" value={this.state.endDate} onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.props.children}


                    <div>
                        <label>Status</label>
                        <div className="switchBox">
                            <div className="switch__container">
                                <input
                                    id="switch-shadow"
                                    className="switch switch--shadow"
                                    name="active"
                                    type="checkbox"
                                    checked={this.state.active}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="switch-shadow">
                                    <span style={{marginLeft: '50px', fontSize: '12px'}}>
                                        {this.state.active ? 'Active' : 'Inactive'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    { this.state.id > 0 &&
                        <button type="button" className='deleteLast' onClick={this.handleDelete}>
                            {t('DELETE')} {t('CONTRACT')}
                        </button>
                    }
                </form>
            </div>

            <div className='form-buttons'>
                <button type="button" className="btn-back" onClick={this.handleBack}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>{t('BTN_BACK')}
                </button>
                <button type="submit" className='btn-save' onClick={this.handleSubmit}>{t('SAVE')}</button>
            </div>

            <Dialog
                open={this.state.open}
                keepMounted
                onClose={() => this.setState({open: false})}
                aria-labelledby='alert-dialog-slide-title'
                aria-describedby='alert-dialog-slide-description'
                className="boxModal"
            >
            <DialogTitle id='alert-dialog-slide-title' className="boxModal">
                {this.state.dialogTitleMsg}
            </DialogTitle>
            <DialogContent className="boxModal">
                <DialogContentText id='alert-dialog-slide-description'>
                {this.state.dialogMsg}
                </DialogContentText>
            </DialogContent>
            <DialogActions className="boxModal">
                {this.state.isDelete &&
                <Button onClick={this.callDeleteApi} color='primary'>
                    Yes, delete
                </Button>
                }


                <Button onClick={() => this.setState({open: false})} color='primary'>
                    Ok
                </Button>
            </DialogActions>
            </Dialog>
        </User>)
    }
}

const mapStateToProps = state => {
    return {
      economicGroups: state.contracts.economicGroups,
      contract: state.contracts.contract,
      planList: state.contracts.planList,
      contractContactsNew: state.contracts.contractContactsNew
    };
};

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(translate('translations')(ContractForm))

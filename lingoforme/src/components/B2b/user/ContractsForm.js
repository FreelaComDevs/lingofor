import React, {Component} from 'react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { User } from '../companies/styles';
import * as actionsCreators from '../contracts/actions';

export class ContractForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contractPlans: [],
            contractContacts: [],
            companies: [],
            ...props.contract
        };
    }

    handleBack = () => {
        this.props.setParentState({ showContractForm: false });
        this.props.actions.clearContractForm();
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
                        <input readOnly type="text" name="code" value={this.state.code} />
                    </div>

                    <div className='lineInputs'>
                        <div>
                            <label>{t('DESCRIPTION')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <input readOnly type="text" name="description" value={this.state.description} />
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
                                                </div>

                                                <div style={{display:'flex'}}>
                                                    <div className="lineInputs" style={{flex: '1 0 auto', marginRight: '20px'}}>
                                                        <div>
                                                            <label>{t('PLAN')}</label>
                                                            <span>{t('REQUIRED')}</span>
                                                        </div>

                                                        <select
                                                            readOnly
                                                            data-index={index}
                                                            data-id={item.plan ? item.plan.id : null}
                                                            value={item.planId}
                                                            name='planId'
                                                        >
                                                            <option>{item.plan.nameEnglish}</option>
                                                            {/* {this.props.planList.map(p => {
                                                                return (
                                                                    <option
                                                                        key={p.id}
                                                                        value={p.id}>
                                                                        {p.nameEnglish}
                                                                    </option>
                                                                )
                                                            })} */}
                                                        </select>
                                                    </div>
                                                    <div className="lineInputs" style={{flex: '1 0 auto'}}>
                                                        <div>
                                                            <label>{t('STUDENTS')}</label>
                                                            <span>{t('REQUIRED')}</span>
                                                        </div>
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            className={`quantity_${index}`}
                                                            style={{width: '150px'}}
                                                            name="quantity"
                                                            data-index={index}
                                                            value={item.quantity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        })}
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
                                        <input readOnly style={{width:'200px'}} type="date" name="startDate" value={this.state.startDate} />
                                    </div>
                                    <div className="lineInputs">
                                        <div>
                                            <label>{t('END')}</label>
                                            <span>{t('REQUIRED')}</span>
                                        </div>
                                        <input readOnly style={{width:'200px'}} type="date" name="endDate" value={this.state.endDate} />
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
                                    readOnly
                                    id="switch-shadow"
                                    className="switch switch--shadow"
                                    name="active"
                                    type="checkbox"
                                    checked={this.state.active}
                                />
                                <label htmlFor="switch-shadow">
                                    <span style={{marginLeft: '50px', fontSize: '12px'}}>
                                        {this.state.active ? 'Active' : 'Inactive'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

            <div className='form-buttons'>
                <button type="button" className="btn-back" onClick={this.handleBack}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>{t('BTN_BACK')}
                </button>
            </div>
        </User>)
    }
}

const mapStateToProps = state => {
    return {
      contract: state.contracts.contract,
      planList: state.contracts.planList
    };
};

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ContractForm))

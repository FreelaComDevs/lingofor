import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionsCreators from './actions';
import Avatar from '../../../images/profile/img_placeholder.svg'
import './styles.scss';


export class ContactList extends Component {

    removeContact = contact => {
        const { actions } = this.props;
        actions.removeContactFromContract(contact);
    }

    addContactForm = () => {
        this.props.actions.addContactForm();
    }

    render () {
        const { t, contract, readOnly } = this.props;
        const contractContacts = contract.contractContacts

        return (
            <div className="lineInputs period">
                <label>{t('CONTACTS')}</label>
                <div className="lingos">
                    <div className="lingoSelects">
                        <div className="linha"></div>
                        <div className="selects">
                            <div className="delet">
                                {contractContacts.map((item, index) => {
                                    return (
                                        <div key={index*7}>
                                            <div>
                                                {t('CONTACT')} #{index+1}
                                                {!readOnly && <button
                                                    type="button"
                                                    name={`delete_${index}`}
                                                    className="btn delete"
                                                    onClick={() => { this.removeContact(item)}}
                                                >
                                                    {t('DELETE')} <i className="fa fa-times-circle-o" aria-hidden="true" />
                                                </button>}
                                            </div>

                                            <div className="contacts">
                                                <div className="results" style={{width:'100%', border:'0'}}>
                                                    <div className="boxResults card" style={{border:'0'}}>
                                                        {item.contact && <img src={item.contact.user.picture ? item.contact.user.picute : Avatar} alt="Avatar" />}
                                                        {item.user && <img src={item.user.picture ? item.user.picute : Avatar} alt="Avatar" />}
                                                        <div>
                                                            <h5>{item.contact ? item.contact.user.name : item.user.name}</h5>  
                                                            <h5>{item.contact ? item.contact.user.email : item.user.email}</h5>  
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {this.props.children}
                            </div>
                        </div>
                    </div>


                    {!readOnly && <div style={{padding:'20px'}}>
                        <button type="button" onClick={this.addContactForm} className="btn-create-in-list">{t('BTN_CREATE_NEW_CONTACT')}</button>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      contract: state.contracts.contract
    };
};

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ContactList))

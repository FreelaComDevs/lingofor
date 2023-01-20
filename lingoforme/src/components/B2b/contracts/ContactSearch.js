import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionsCreators from './actions';
import Avatar from '../../../images/profile/img_placeholder.svg'
import './styles.scss';

class ContactSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            done: false
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
    }

    addContact = e => {
        const { dataset } = e.target;
        const { contactsFound, actions } = this.props;
        const contact = contactsFound[dataset.index];
        console.log('contact', contact)
        actions.addContactToContract(contact);
        this.setState({ searchTerm: '', done: false })
    }

    clearSearch = () => {
        this.props.actions.setContactsFound([]);
        this.setState({ searchTerm: '', done: false })
    }

    handleSubmit = () => {
        const { service, actions } = this.props;
        const { searchTerm } = this.state;
        const self = this;
        if (searchTerm && searchTerm.length > 0) {
            service.searchContacts(searchTerm, items => {
                self.setState({ done: true });
                actions.setContactsFound(items);
            });
        }
    }

    render () {
        const { t, contactsFound } = this.props;
        return (
            <div className="contacts">
                <h4>{t('CONTACTS')}</h4>
                <div>
                    <label>{t('SEARCH_USER')}</label>
                </div>
                <input type="search" value={this.state.searchTerm} onChange={this.handleChange} name="searchTerm" placeholder="Name" />
                <button type="button" onClick={this.handleSubmit} value="Search">{t('BTN_SEARCH')}</button>
                {contactsFound.length === 0 && this.state.done &&
                    <span style={{color:'red', fontSize:'12px'}}>No contacts found.</span>
                }
                {contactsFound.length > 0 && <div className="results">
                    <div className="overflow">
                        {contactsFound.map((item, index) => {
                            return (
                                <div key={index*8} className="boxResults card">
                                    <img src={item.user.picture ? item.user.picute : Avatar} alt="Avatar" /> 
                                    <div>
                                        <div>
                                            <h5>{item.user.name}</h5>  
                                        </div>
                                        {/* <div>
                                            <div className="tag">{item.user.name}</div>  
                                        </div> */}
                                    </div>
                                    <div style={{marginRight:'10px'}}>
                                        <button data-index={index} onClick={this.addContact} className="btn" type="button">
                                            {t('ADD_TO_CONTRACT')} <i className="fa fa-plus" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>}
                {contactsFound.length > 0 &&
                    <div className="clear-search">
                        <button type="button" onClick={this.clearSearch}>{t('BTN_CLEAR_SEARCH')}</button>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      contactsFound: state.contracts.contactsFound
    };
};

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ContactSearch))
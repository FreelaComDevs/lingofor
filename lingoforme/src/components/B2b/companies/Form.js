import React, {Component} from 'react';
import { translate } from 'react-i18next';

import { User } from './styles';


export class CompanyForm extends Component {

    constructor (props) {
        super(props)
        const { service } = this.props
        const economicGroups = this.props.economicGroups || [];
        const countries = this.props.countries || [];
        this.state = Object.assign({}, service.getEmptyCompany(), {
            economicGroups,
            countries
        });
    }

    componentDidMount () {
        const { service } = this.props
        const self = this;
        service.fetchEconomicGroups((items) => {
            self.setState({ economicGroups: items })
        });
        service.fetchCountries(countries => {
            self.setState({ countries })
        });
    }

    componentDidUpdate () {
        const { selectedCompany } = this.props;
        if (selectedCompany && selectedCompany.id > 0 && selectedCompany.id !== this.state.id) {
            const newState = Object.assign({}, this.state, selectedCompany);
            this.setState(newState);
        }
    }

    addField = () => {
        const { companyResponsibleContacts } = this.state;
        const { service } = this.props;
        companyResponsibleContacts.push(service.getEmptyContact())
        this.setState({ companyResponsibleContacts })
    }

    removeField = e => {
        const { index } = e.target.dataset;
        const { companyResponsibleContacts } = this.state;
        companyResponsibleContacts.splice(index, 1);
        this.setState({ companyResponsibleContacts })
    }

    handleChange = e => {
        const name = e.target.name;
        const value = (name === 'active') ? !this.state.active : e.target.value;
        this.setState({
          [name]: value
        })
    }

    handleBack = () => {
        this.setState(this.props.service.getEmptyCompany());
        this.props.setParentState({ showCompanyForm: false, selectedCompany: null });
    }

    handleChangeContact = e => {
        const { name, value, dataset } = e.target;
        const items = this.state.companyResponsibleContacts
        items[dataset.index][name] = value
        this.setState({
            companyResponsibleContacts: items
        })
    }

    handleDelete = () => {
        const { service, setParentState } = this.props;
        setParentState({ loading: true });
        service.removeCompanyById(this.state.id, () => {
            setParentState({ loading: false });
            window.location.reload();
        })
    }

    handleSubmit = () => {
        const { service, setParentState } = this.props;
        setParentState({ loading: true });
        service.saveCompany(this.state, (res) => {            
            if(res.data && res.data && !res.data.success){
                console.log('handleSubmit company',res)
                setParentState({
                    showDialog: true,
                    redirect: false,
                    loading: false,
                    alerttitle: "INVALID_FORM_TITLE", 
                    alertMessage: res && res.data && res.data.error ? res.data.error : res.data
                });
            }else{
                setParentState({ loading: false });
                window.location.reload();
            }            
        })
    }

    render () {
        const { t } = this.props;
        const company = this.state;

        return (<User>
            <div className='bigBox bigBoxForm' style={{paddingLeft: '100px'}}>

                <h2>{company.id ? t('EDIT_COMPANY') : t('ADD_NEW_COMPANY')}</h2>
                
                <form className='formulario' onSubmit={this.handleSubmit}>
                    <div className='lineInputs'>
                        <div>
                            <label>{t('ECONOMIC_GROUP')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <select
                            value={company.economicGroupId}
                            onChange={this.handleChange}
                            className='input-lingo'
                            name='economicGroupId'
                        >
                            <option>Select</option>
                            {this.state.economicGroups.sort((a, b) => (a.name > b.name) ? 1 : -1).map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='lineInputs'>
                        <div>
                            <label>{t('LEGAL_NAME')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <input type="text" name="socialName" value={company.socialName} onChange={this.handleChange} />
                    </div>
                    <div>
                        <div>
                            <label>{t('COMPANY_NAME')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <input type="text" name="fantasyName" value={company.fantasyName} onChange={this.handleChange} />
                    </div>
                    <div>
                        <div>
                            <label>{t('DOCUMENT_NUMBER')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <input type="text" name="documentNumber" value={company.documentNumber} onChange={this.handleChange} />
                    </div>
                    <div>
                        <div>
                            <label>{t('ADDRESS')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <input type="text" name="address" value={company.address} onChange={this.handleChange} />
                    </div>
                    <div className='lineInputs'>
                        <div>
                            <label>{t('COUNTRY')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <select
                            value={company.countryId}
                            onChange={this.handleChange}
                            className='input-lingo'
                            name='countryId'
                        >
                            <option>Select</option>
                            {this.state.countries.map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='lineInputs'>
                        <div>
                            <label>{t('DATE')}</label>
                            <span>{t('REQUIRED')}</span>
                        </div>
                        <input type="date" name="registerDate" value={company.registerDate} onChange={this.handleChange}/>
                    </div>

                    <div className="lineInputs period">
                        <label>{t('CONTACTS')}</label>
                        <div className="lingos">
                            <div className="lingoSelects">
                                <div className="linha"></div>
                                <div className="selects">
                                    <div className="delet">
                                        <div>
                                            {company.companyResponsibleContacts.map((item, index) => {
                                                return <div key={index*7}>
                                                    <div>
                                                        {t('CONTACT')} #{index+1}
                                                        <button type="button" data-index={index} className="btn delete" onClick={this.removeField}>
                                                            Delete <i className="fa fa-times-circle-o" aria-hidden="true" />
                                                        </button>
                                                    </div>

                                                    <div className="lineInputs">
                                                        <div>
                                                            <label>{t('NAME')}</label>
                                                            <span>{t('REQUIRED')}</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className={`name_${index}`}
                                                            data-index={index}
                                                            value={item.name}
                                                            onChange={this.handleChangeContact} />
                                                    </div>
                                                    <div className="lineInputs">
                                                        <div>
                                                            <label>{t('EMAIL')}</label>
                                                            <span>{t('REQUIRED')}</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className={`email_${index}`}
                                                            name="email"
                                                            data-index={index}
                                                            value={item.email}
                                                            onChange={this.handleChangeContact} />
                                                    </div>
                                                    <div className="lineInputs">
                                                        <div>
                                                            <label>{t('TELEPHONE_COMMERCIAL')}</label>
                                                            <span>{t('REQUIRED')}</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className={`commercialPhone_${index}`}
                                                            name="commercialPhone"
                                                            data-index={index}
                                                            value={item.commercialPhone}
                                                            onChange={this.handleChangeContact} />
                                                    </div>
                                                    <div className="lineInputs">
                                                        <div>
                                                            <label>{t('TELEPHONE_MOBILE')}</label>
                                                            <span>{t('REQUIRED')}</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className={`mobilePhone_${index}`}
                                                            name="mobilePhone"
                                                            data-index={index}
                                                            value={item.mobilePhone}
                                                            onChange={this.handleChangeContact} />
                                                    </div>
                                                </div>
                                            })}
                                            <div>
                                                <button type="button" className="btn-add-field" style={{width:'180px'}} onClick={this.addField}>
                                                    {t('BTN_ADD_NEW_CONTACT')} +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        {company.active ? 'Active' : 'Inactive'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    { this.state.id > 0 &&
                        <button type="button" className='deleteLast' onClick={this.handleDelete}>
                            {t('DELETE')} {t('COMPANY')}
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
        </User>)
    }
}

export default translate('translations')(CompanyForm)

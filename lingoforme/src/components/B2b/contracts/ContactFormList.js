import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimezonePicker from 'react-timezone';

import * as actionsCreators from './actions';
import avatar from '../../../images/profile/img_placeholder.svg'
import cameraIcon from '../../../images/profile/ico_camera.svg';

import './styles.scss';


export class ContactFormList extends Component {

    componentDidMount () {
        const { service } = this.props
        const self = this;
        service.fetchCountries(countries => {
            self.setState({ countries })
        });
    }

    removeContactForm = index => {
        const { actions } = this.props;
        actions.removeContactForm(index);
    }

    handleChange = e => {
        let { name, value, dataset } = e.target;
        const { index } = dataset;
        if (name === 'countryId') {
            value = parseInt(value);
        }
        this.props.actions.handleContactFormChange({
            name, value, index
        });
    }

    handleChangeInList = e => {
        const { name, value, dataset } = e.target;
        const { index, subindex, field } = dataset;
        this.props.actions.handleChangeInList({
            name, value, index, subindex, field
        });
    }

    addFieldInList = e => {
        const { dataset } = e.target;
        const { index, field } = dataset;
        let value;
        if (field === 'userEmails') {
            value = {
                email: '',
                notify: true
            }
        }
        if (field === 'userPhones') {
            value = {
                phone: '',
                userPhoneTypeId: ''
            }
        }
        this.props.actions.addFieldInList({
            field, value, index
        });
    }

    removeFieldInList = e => {
        const { dataset } = e.target;
        const { index, subindex, field } = dataset;
        this.props.actions.removeFieldInList({
            field, index, subindex
        });
    }

    handleUpload = e => {
        const file = e.target.files[0];
        if (file) {
            const { index } = e.target.dataset;
            const fileSize = file.size / 1024 / 1024
            if (fileSize <= 2) {
                let reader = new FileReader();
                reader.onload = evt => {
                    this.handleChange({
                        target: {
                            name: 'picture',
                            value: evt.target.result,
                            dataset: {
                                index
                            }
                        }
                    })
                }
        
                reader.readAsDataURL(file)
                const event = {
                    target: {
                        name: 'file',
                        value: file,
                        dataset: {
                            index
                        }
                    }
                }
                this.handleChange(event)
                // this.service.Upload(`admin/users/${this.state.userId}/picture`, formData).then(res => {
                //     console.log('upload successful', res.result);
                // })
                // .catch(err => {
                //     console.log('upload failed', err);
                // })
            }
        }
    }

    render () {
        const { t, contractContactsNew } = this.props;
        
        return (
            <div>
                {contractContactsNew.map((item, index) => {
                    return <div key={index*99}>
                        <div>
                            {t('NEW')} {t('CONTACT')} #{index+1}
                            <button
                                type="button"
                                name={`delete_${index}`}
                                className="btn delete"
                                onClick={() => { this.removeContactForm(index)}}
                            >
                                {t('DELETE')} <i className="fa fa-times-circle-o" aria-hidden="true" />
                            </button>
                        </div>
                        <div className='viewUser'>
                            <div className='changePhoto'>
                                <h2>{t('PHOTO')}</h2>
                                <div style={{margin:'0'}}>
                                    <div className='photo'>
                                        <img
                                            src={item.picture ? item.picture : avatar}
                                            alt='Avatar'
                                            width='112'
                                            height='112'
                                            className='avatarRound'
                                        />
                                        <div className='fileUpload btn btn-primary'>
                                            <span>
                                                <img src={ cameraIcon } alt='Camera' width='16' height='14' />
                                                 {t('CHANGE')}
                                            </span>
                                            <input
                                                id='uploadBtn'
                                                type='file'
                                                className='upload'
                                                data-index={index}
                                                onChange={this.handleUpload}
                                                accept="image/x-png,image/jpeg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='formulario'>
                                <div>
                                    <div>
                                        <label>{t('NAME')}</label>
                                        <span>{t('REQUIRED')}</span>
                                    </div>
                                    <input
                                        placeholder='Your name'
                                        name='name'
                                        data-index={index}
                                        type="text"
                                        className='inputMobile'
                                        value={item.name}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div>
                                    <div>
                                        <label>Login email</label>
                                        <span>{t('REQUIRED')}</span>
                                    </div>
                                    <div className="addEmail">
                                        <input
                                            placeholder='Your email'
                                            name='email'
                                            data-index={index}
                                            type="email"
                                            className='inputMobile'
                                            value={item.email}
                                            onChange={this.handleChange}
                                        />
                                        <button
                                            type="button"
                                            data-field='userEmails'
                                            data-index={index}
                                            className='addInput'
                                            onClick={this.addFieldInList}
                                        >
                                            Add Email +
                                        </button>
                                    </div>
                                </div>
                                {item.userEmails.map((i, idx) => {
                                    return (
                                        <div key={'e'+idx}>
                                            <div>
                                                <label>{t('ALTERNATIVE_EMAIL')}</label>
                                                <span>{t('REQUIRED')}</span>
                                            </div>
                                            <input
                                                data-index={index}
                                                data-subindex={idx}
                                                placeholder='Your email'
                                                name='email'
                                                data-field='userEmails'
                                                type="email"
                                                className='inputMobile'
                                                value={i.email}
                                                onChange={this.handleChangeInList}
                                            />
                                            <button
                                                data-index={index}
                                                data-subindex={idx}
                                                data-field='userEmails'
                                                className='delete'
                                                onClick={this.removeFieldInList}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )
                                })}
                                            
                                <div className='lineInputs'>
                                    <div>
                                        <label>{t('GENDER')}</label>
                                        <span>{t('REQUIRED')}</span>
                                    </div>
                                    <select
                                        value={item.gender}
                                        data-index={index}
                                        onChange={this.handleChange}
                                        className='input-lingo'
                                        name='gender'>
                                        <option value='male'>{t('MALE')}</option>
                                        <option value='female'>{t('FEMALE')}</option>
                                    </select>
                                </div>

                                <div className='inputs'>
                                    <div className='lineInputs'>
                                        <div>
                                            <label>{t('COUNTRY')}</label>
                                            <span>{t('REQUIRED')}</span>
                                        </div>
                                        <select
                                            value={item.countryId}
                                            data-index={index}
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
                                            <label>Timezone</label>
                                            <span>{t('REQUIRED')}</span>
                                        </div>
                                        <TimezonePicker
                                            value={item.timezone}
                                            onChange={timezoneName => {
                                                const e = {};
                                                e.target = {
                                                    name: 'timezone',
                                                    value: timezoneName,
                                                    dataset: {
                                                        index
                                                    }
                                                }
                                                this.handleChange(e)
                                            }}
                                            inputProps={{
                                                placeholder: 'Select Timezone...',
                                                name: 'timezone'
                                            }}
                                        />
                                    </div>
                                    <div className='lineInputs'>
                                        <p style={{margin: '22px 0 0 0'}}>
                                            Current time <br />
                                            in this timezone: {this.props.util.getFormattedTimezone(item.timezone)}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label>{t('ADDRESS')}</label>
                                        <span>{t('REQUIRED')}</span>
                                    </div>
                                    <input
                                        placeholder='Address'
                                        data-index={index}
                                        name='address'
                                        value={item.address}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                {item.userPhones.map((i, idx) => {
                                    return (
                                        <div key={'phone'+idx} className='inputs'>
                                            <div className='lineInputs'>
                                                <div>
                                                    <label>{t('TELEPHONE')}</label>
                                                    <span>{t('REQUIRED')}</span>
                                                </div>
                                                <div>
                                                    <input
                                                        placeholder='Phone number'
                                                        name='phone'
                                                        data-index={index}
                                                        data-subindex={idx}
                                                        data-field='userPhones'
                                                        type='text'
                                                        value={i.phone}
                                                        onChange={this.handleChangeInList} />
                                                </div>
                                            </div>
                                            <div className='lineInputs'>
                                                <div>
                                                    <label>{t('TYPE')}</label>
                                                    <span>{t('REQUIRED')}</span>
                                                </div>
                                                <select
                                                    value={i.userPhoneTypeId}
                                                    onChange={this.handleChangeInList}
                                                    className='input-lingo'
                                                    name='userPhoneTypeId'
                                                    data-field='userPhones'
                                                    data-subindex={idx}
                                                    data-index={index}
                                                >
                                                    <option value="1">Commercial</option>
                                                    <option value="2">Residential</option>
                                                    <option value="3">Mobile</option>
                                                    <option value="4">Whatsapp</option>
                                                </select>
                                            </div>
                                            <div className='lineInputs'>
                                                {idx === 0 && (
                                                    <button
                                                        type="button"
                                                        data-index={index}
                                                        data-field='userPhones'
                                                        style={{width:'150px'}}
                                                        className='addInput'
                                                        onClick={this.addFieldInList}
                                                    >
                                                        Add {t('TELEPHONE')} +
                                                    </button>)}
                                                {idx > 0 && (
                                                    <button
                                                        type="button"
                                                        data-index={index}
                                                        data-field='userPhones'
                                                        className='delete'
                                                        onClick={this.removeFieldInList}
                                                    >
                                                        {t('BTN_DELETE')}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        contractContactsNew: state.contracts.contractContactsNew
    };
};

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(translate('translations')(ContactFormList))

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import timezone from 'moment-timezone';
import TimezonePicker from 'react-timezone';
import Services from '../_api/Services';

import Loading from 'react-fullscreen-loading';

import Header from '../_common/header/Header';
import SideMenu from '../_common/SideMenu/SideMenu';
import Engrenagem from '../../images/icons/icon_coordinator_header.svg';
import { User } from '../Users/styles';
import cameraIcon from '../../images/profile/ico_camera.svg';
import { Textbox } from 'react-inputs-validation';
import avatar from '../../images/profile/img_placeholder.svg';
import { throws } from 'assert';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import validator from 'validator'

import './styles.css';

class CoordinatorsEdit extends Component {

    constructor (props) {
        super(props)
        this.t = this.props.t
        this.i18n = this.props.i18n
        this.service = new Services()

        this.state = {
            loading: false,
            redirect: false,

            picture: null,
            userId: null,
            active: true,
            name: '',
            gender: 'male',
            birthDate: '',
            validations:{},
            address: '',
            phones: [{
                phone: '',
                userPhoneTypeId: 3
            }],
            emails: [],
            email: '',
            countryId: 212,
            otherLanguages: [],
            responsibleLanguages: [],
            
            languages: [],
            lingoLanguages: [],
            countries: [],
            timenow: Date.now(),
            timezone: '',

            userInfo: {},
            showDialog: false,
            alertMessage: ''
        }

        this.addFieldInList = this.addFieldInList.bind(this)
        this.removeFieldInList = this.removeFieldInList.bind(this)
        this.changeFieldInList = this.changeFieldInList.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }

    componentWillMount () {
        let userProfile = this.service.getProfile()
        if(userProfile.role === 'companyManager') {
            this.fetchCountries();
            this.fetchLingoLanguages();
            this.fetchLanguages();           

            
        }
    }

    fetchCountries () {
        this.service.get('countries/getall')
        .then(res => {
            this.setState({
                countries: res.result.items
            })
        })
        .catch(err => {
            console.error('Failed getting countries for filter coordinators ', err);
        })
    }

    fetchLanguages () {
        this.service.get('languages?skip=0&take=1000')
        .then(res => {
            const languages = res.result.items
            const firstLanguage = {
                languageId: languages[0].id,
                isNative: true
            }
            const newState = { languages }
            if (! this.state.id) {
                newState.otherLanguages = [firstLanguage]
            }
            this.setState(newState,()=>{
                const { id } = this.props.match.params;
                if (id) {
                    this.fetchCoordinator(id)
                }
            })
        })
        .catch(err => {
            console.error('Failed getting languages for coordinators ', err);
        })
    }

    fetchLingoLanguages () {
        this.service.get('lingolanguages/getall')
        .then(res => {
            const lingoLanguages = res.result.items
            const newState = { lingoLanguages }
            if (! this.state.id) {
                newState.responsibleLanguages = [lingoLanguages[0].id]
            }
            this.setState(newState)
        })
        .catch(err => {
            console.error('Failed getting lingo languages for coordinators ', err);
        })
    }

    fetchCoordinator (id) {
        this.setState({ loading: true });

        this.service.get(`coordinators/${id}`).then(res => {
            const coordinator = res.result.items[0];
            const {
                user,
                userId,
                coordinatorLanguages,
                coordinatorLanguageResponsibles
            } = coordinator;

            const {
                picture,
                active,
                name,
                gender,
                birthDate,
                address,
                email,
                countryId,
                country,
                userPhones,
                userEmails,
                timezone
            } = user;

            const otherLanguages = coordinatorLanguages.map(item => {
                return {
                    languageId: item.languageId,
                    isNative: item.isNative
                }
            });
            
            const responsibleLanguagesNames = [];
            const responsibleLanguages = coordinatorLanguageResponsibles.map(item => {
                responsibleLanguagesNames.push(item.lingoLanguage.description);
                return item.lingoLanguageId;
            });

            const nativeLanguage = otherLanguages.find(item => {
                return item.isNative;
            });

            const nativeLanguageFound = this.state.languages.find(item => {
                return item.id === nativeLanguage.languageId
            }) || {};

            let phones = [{
                userPhoneTypeId: 1, phone: ''
            }];
            if (userPhones.length > 0) {
                phones = userPhones.map(item => {
                    return {
                        phone: item.phone,
                        userPhoneTypeId: item.userPhoneTypeId
                    }
                });
            }

            const newState = {
                loading: false,
                otherLanguages,
                responsibleLanguages,
                phones,
                emails: userEmails,
                
                picture,
                active,
                name,
                gender,
                birthDate,
                address,
                email,
                countryId,
                timezone: timezone.replace(' ', '_'),
                userId,
                id: coordinator.id,
                userInfo: {
                    name,
                    country: country.name,
                    nativeLanguage: nativeLanguageFound.name,
                    lingoThatCoordinates: responsibleLanguagesNames.join(', ')
                }
            }

            this.setState(newState)
        })
        .catch(err => {
            console.error('Failed getting countries for filter coordinators ', err);
            this.setState({ loading: false });
        })
    }

    handleUpload (e) {
        const file = e.target.files[0];
        if (file && this.state.userId) {
            const formData = new FormData()
            const fileSize = file.size / 1024 / 1024
            if (fileSize <= 2) {
                let reader = new FileReader();
                reader.onload = e => {
                    this.setState({ picture: e.target.result })
                }
        
                reader.readAsDataURL(file)
                formData.append('file', file)
                this.service.Upload(`admin/users/${this.state.userId}/picture`, formData).then(res => {
                    console.log('upload successful', res.result);
                })
                .catch(err => {
                    console.log('upload failed', err);
                })
            }
        }
    }

    addFieldInList (e) {
        e.preventDefault()
        const data = e.target.dataset.items
        let obj = {}
        switch (data) {
            case 'emails': {
                obj = { email: '', notify: true };
                break;
            }
            case 'phones': {
                obj = { userPhoneTypeId: 3, phone: '' }
                break;
            }
            case 'otherLanguages': {
                const languageId = this.state.languages[0].id
                obj = { languageId, isNative: false }
                break;
            }
            case 'responsibleLanguages': {
                const lingolanguage = this.state.lingoLanguages[0].id
                obj = lingolanguage
                break;
            }
        }
        const items = this.state[data]
        items.push(obj)
        this.setState({
            [data]: items
        })
    }

    removeFieldInList (e) {
        e.preventDefault()
        const data = e.target.dataset.items
        const items = this.state[data]
        items.splice(e.target.dataset.index, 1)
        this.setState({
            [data]: items
        })
    }

    changeFieldInList (e) {
        e.preventDefault()
        const { dataset, value } = e.target;
        const data = dataset.items
        const items = this.state[data]        
        const hasDuplicate = items.filter(itemInData => itemInData.languageId && itemInData.languageId.toString() === value.toLowerCase()).length > 0;
        if(hasDuplicate){
            this.setState({showDialog: true, alerttitle: this.t('INVALID_FORM_TITLE'), alertMessage: 'Duplicate language' })
        }
        else{
            if (dataset.field) {
                items[dataset.index][dataset.field] = value.toLowerCase()
            } else {
                items[dataset.index] = value.toLowerCase()
            }
        }        
        this.setState({
            [data]: items
        })
    }

    handleChange (e) {
        const value = e.target && e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [e.target.name]: value
        })
    }

    handleDelete (e) {
        e.preventDefault();
        const { id } = this.state;
        this.setState({ loading: true });
        this.service.ApiDelete(`coordinators/${id}`).then(res => {
            this.setState({ redirect: true });
        })
        .catch(err => {
            console.log('Failed to delete coordinator.', err)
            this.setState({ loading: false });
        })
    }

    handleSubmit (e) {
        const convertStringsToIntInArrayOfObjects = (arr, key) => {
            return arr.map(item => {
                const strValue = item[key];
                item[key] = parseInt(strValue);
                return item;
            });
        }
        const convertStringsToIntInArrayOfPrimitives = arr => {
            return arr.map(item => {
                return parseInt(item);
            });
        }

        e.preventDefault();
        const state = this.state;

        const userPhones = convertStringsToIntInArrayOfObjects(state.phones, 'userPhoneTypeId');
        const languages = convertStringsToIntInArrayOfObjects(state.otherLanguages, 'languageId');
        const responsibleLanguages = convertStringsToIntInArrayOfPrimitives(state.responsibleLanguages) || [state.responsibleLanguages[0].id];
        
        let req = {
            name: state.name,
            email: state.email.toLowerCase(),
            userEmails: state.emails,
            gender: state.gender,
            birthDate: state.birthDate,
            countryId: parseInt(state.countryId),
            timezone: state.timezone,
            address: state.address,
            userPhones,
            languages,
            responsibleLanguages,
            role: 'coordinator'
        }

        let api = 'ApiPosts';
        if (state.id) {
            req.id = state.userId;
            req.coordinatorId = state.id;
            api = 'ApiPut';
        }

        this.setState({ loading: true });
        this.service[api]('coordinators', req).then(res => {
            this.setState({
                showDialog: false,
                redirect: true,
                loading: false
            });
        }) 
        .catch(err => {
            console.error('Failed creating a new coordinator. ', err);
            this.setState({
                showDialog: true,
                redirect: false,
                loading: false,
                alerttitle: "INVALID_FORM_TITLE", 
                alertMessage: err && err.data && err.data.error ? err.data.error : err.data
            });
        })   

        // if(this.hasMoreThanOneEnglish(languages)){
        //     this.setState({showDialog: true, alertMessage: 'Duplicate language' });
        // }else if (!this.validateForm()){
        //     console.log(this.validateForm())
        //     this.setState({ showDialog: true, loading:false, alerttitle: this.t('INVALID_FORM_TITLE')})
        // } else{
        //     this.setState({ loading: true });
        //     this.service[api]('coordinators', req).then(res => {
        //         this.setState({
        //             showDialog: false,
        //             redirect: true,
        //             loading: false
        //         });
        //     }) 
        //     .catch(err => {
        //         console.error('Failed creating a new coordinator. ', err);
        //         this.setState({
        //             showDialog: true,
        //             redirect: false,
        //             loading: false,
        //             alerttitle: "INVALID_FORM_TITLE", 
        //             alertMessage: err.data.error
        //         }, () => this.validateForm() );
        //     })   
        // }
    }

    hasMoreThanOneEnglish(languages){
        const englishId = this.state.languages[0].id;
        return languages.filter(language => language.languageId && language.languageId === englishId).length > 1;
    }

    validateForm () {
        let validations = []
        let errorMsg = ''
        validations = {
            'name': validator.isEmpty(this.state.name),
            'email': !validator.isEmail(this.state.email) || validator.isEmpty(this.state.email),
            'address': validator.isEmpty(this.state.address === null ? '' : this.state.address ),
            'timezone' : validator.isEmpty(this.state.timezone),
            'birthday' : !this.state.birthDate || moment(this.state.birthDate) >= moment().add(1, 'hours'),
            'gender': validator.isEmpty(this.state.gender),
            'phone' : this.state.userPhones && this.state.userPhones.length === 0
        }
        if(this.state.role === 'student')
            validations.language = this.state.languages.length === 0 || this.state.languages[0].languageId === 0
        
        
        if(validations.birthday){
            errorMsg = 'birthday is required!'
        }

        this.setState({
            alertMessage : errorMsg,
            validations: validations
        })             
    }



    render () {
        if (this.state.redirect) {
            return <Redirect to='/coordinators' />;
        }

        const { t } = this.props;
        let timezone = this.state.timezone

        if(timezone && timezone === 'America/Sao_Paulo'){        
            timezone = 'America/Bahia'
        }

        // Arrumando o timezone horario de verão são paulo, subtraindo 1 hora.
        let dataNew = moment(new Date()).tz(timezone)
        moment.tz(timezone) 
        let dataTimeZone = moment(dataNew).format('LT')

        return (
            <div className='view'>
                { this.state.loading && <Loading loading={this.state.loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/> }

                <SideMenu lang={'english'} />
                <section>
                    <Header/>
                    <div className="toptitle">      
                        <img src={Engrenagem} alt="Engrenagem" />    
                        <h1>{t('COORDINATOR')}</h1>                   
                    </div>
                    
                    {this.state.id && (<div className='coordinator'>
                        <div className='userinfo'>
                            <h2>{this.state.userInfo.name}</h2>
                            <div>{t('NATIVE_LANGUAGE')}: {this.state.userInfo.nativeLanguage}</div>
                            <div>{t('COUNTRY')}: {this.state.userInfo.country}</div>
                            <div>{t('LINGO_THAT_COORDINATES')}: {this.state.userInfo.lingoThatCoordinates}</div>
                        </div>
                    </div>)}

                    <User>
                        <div className='container'>
                            <div className='bigBox'>
                                
                                <div className='viewUser'>
                                    <div className='changePhoto'>
                                        <h2>{t('PHOTO')}</h2>
                                        <form>
                                            <div className='photo'>
                                                <img
                                                    src={this.state.picture !== null ? this.state.picture : avatar}
                                                    alt='Avatar'
                                                    width='112'
                                                    height='112'
                                                    className='avatarRound'
                                                />
                                                {this.state.id && (<div className='fileUpload btn btn-primary'>
                                                    <span><img src={ cameraIcon } alt='Camera' width='16' height='14' />{t('CHANGE')}</span>
                                                    <input
                                                        id='uploadBtn'
                                                        type='file'
                                                        className='upload'
                                                        onChange={this.handleUpload}
                                                        accept="image/x-png,image/jpeg"
                                                    />
                                                </div>)}
                                            </div>
                                        </form>
                                    </div>

                                    <form className='formulario'>
                                        <div>
                                            <div>
                                                <label>{t('NAME')}</label>
                                                <span>{  this.state.validations['name'] && t('REQUIRED_FIELD')}</span>
                                                {/* <span>{t('REQUIRED')}</span> */}
                                            </div>
                                            <Textbox
                                                tabIndex='1'
                                                id={'name'}
                                                name='name'
                                                type='text'
                                                value={this.state.name}
                                                disabled={false}
                                                placeholder='Your name'
                                                validate
                                                validationCallback={res => this.setState({ hasNameError: res, validate: false })}
                                                onChange={name => {
                                                    this.setState({ name })
                                                }}
                                                validationOption={{
                                                    name: 'name',
                                                    required: true,
                                                    type: 'string',
                                                    min: 4,
                                                    msgOnError: 'This field is required'
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <div>
                                                <label>Login email</label>
                                                <span>{  this.state.validations['email'] && t('REQUIRED_FIELD')}</span>
                                                {/* <span>{t('REQUIRED')}</span> */}
                                            </div>
                                            <div className="addEmail">
                                                <input placeholder='Your email' name='email' data-field="email" type="email" className='inputMobile' value={this.state.email} onChange={this.handleChange} />
                                                <button data-items='emails' className='addInput' onClick={this.addFieldInList}>Add Email +</button>
                                            </div>
                                        </div>
                                        {this.state.emails.map((item, index) => {
                                            return (
                                                <div key={'e'+index}>
                                                    <div className="label">
                                                        <label htmlFor='email'>{t('ALTERNATIVE_EMAIL')}</label>
                                                        <span>{t('REQUIRED')}</span>
                                                    </div>

                                                    <input data-index={index} placeholder='Your email' name='email' data-items='emails' data-field="email" type="email" className='inputMobile' value={item.email} onChange={this.changeFieldInList} />
                                                    <button data-index={index} data-items='emails' className='delete' onClick={this.removeFieldInList}>Delete</button>
                                                </div>
                                            )
                                        })}
                                        <div className="inputs">
                                            <div className='lineInputs'>
                                                <div>
                                                    <label>{t('GENDER')}</label>
                                                    <span>{  this.state.validations['gender'] && t('REQUIRED_FIELD')}</span>
                                                    {/* <span>{t('REQUIRED')}</span> */}
                                                </div>
                                                <select
                                                    value={this.state.gender}
                                                    onChange={this.handleChange}
                                                    className='input-lingo'
                                                    name='gender'>
                                                    <option value='male'>{t('MALE')}</option>
                                                    <option value='female'>{t('FEMALE')}</option>
                                                </select>
                                            </div>

                                            <div className="lineInputs">
                                                <div>
                                                    <label htmlFor="birthDate">{t('BIRTH_DATE')}</label>
                                                    <span>{  this.state.validations['birthday'] && t('REQUIRED_FIELD')}</span>
                                                </div>                                
                                                {                                     
                                                    <input type="date" id='date' name="birthDate" value={this.state.birthDate} onChange={this.handleChange}/> 
                                                }
                                            </div>
                                        </div>

                                        {this.state.otherLanguages.map((item, index) => {
                                            return (
                                                <div key={'l'+index} className='lineInputs'>
                                                    <div className={index > 0 ? 'label' : ''}>
                                                        <label>{ index === 0 ? t('NATIVE_LANGUAGE') : t('OTHER_LANGUAGE') }</label>
                                                        {/* <span>{t('REQUIRED')}</span> */}
                                                        <span>{  this.state.validations['languageId'] && t('REQUIRED_FIELD')}</span>
                                                    </div>

                                                    <select
                                                        value={item.languageId}
                                                        onChange={this.changeFieldInList}
                                                        className='input-lingo'
                                                        name='languageId'
                                                        data-index={index}
                                                        data-field="languageId"
                                                        data-items='otherLanguages'
                                                    >
                                                        {this.state.languages.map((item, index) => {
                                                            return (<option value={item.id} key={item.id*index*222}>{item.name}</option>)
                                                        })}
                                                    </select>

                                                    {index === 0 && (<button data-items='otherLanguages' className='addInput' style={{width: '150px'}} onClick={this.addFieldInList}>{t('ADD_LANGUAGE')} +</button>)}

                                                    {index > 0 && (<button data-index={index} data-items='otherLanguages' className='delete' onClick={this.removeFieldInList}>{t('DELETE')}</button>)}
                                                </div>
                                            )
                                        })}


                                        {this.state.responsibleLanguages.map((item, index) => {
                                            return (
                                                <div key={'l'+index} className='lineInputs'>
                                                    <div className={index > 0 ? 'label' : ''}>
                                                        <label>{ index === 0 ? t('LINGO_THAT_COORDINATES') : t('OTHER_LINGO') }</label>
                                                        {/* <span>{t('REQUIRED')}</span> */}
                                                        <span>{  this.state.validations['id'] && t('REQUIRED_FIELD')}</span>
                                                    </div>

                                                    <select
                                                        value={item}
                                                        onChange={this.changeFieldInList}
                                                        className='input-lingo'
                                                        name='id'
                                                        data-index={index}
                                                        data-items='responsibleLanguages'
                                                    >
                                                        {this.state.lingoLanguages.map((item, index) => {
                                                            return (<option value={item.id} key={item.id*index*222}>{item.language.name}</option>)
                                                        })}
                                                    </select>

                                                    {index === 0 && (<button data-items='responsibleLanguages' className='addInput' style={{width: '150px'}} onClick={this.addFieldInList}>{t('ADD_LINGO')} +</button>)}

                                                    {index > 0 && (<button data-index={index} data-items='responsibleLanguages' className='delete' onClick={this.removeFieldInList}>{t('DELETE')}</button>)}
                                                </div>
                                            )
                                        })}


                                        <div className='inputs'>
                                            <div className='lineInputs'>
                                                <div>
                                                    <label>{t('COUNTRY')}</label>
                                                    {/* <span>{t('REQUIRED')}</span> */}
                                                    <span>{  this.state.validations['countryId'] && t('REQUIRED_FIELD')}</span>
                                                </div>
                                                <select
                                                    value={this.state.countryId}
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
                                                    {/* <span>{t('REQUIRED')}</span> */}
                                                    <span>{  this.state.validations['timezone'] && t('REQUIRED_FIELD')}</span>
                                                </div>
                                                <TimezonePicker
                                                    value={this.state.timezone}
                                                    onChange={timezoneName => {
                                                        this.setState({timezone: timezoneName }, ()=> { return this.validateForm() })
                                                    }}
                                                    inputProps={{
                                                        placeholder: 'Select Timezone...',
                                                        name: 'timezone'
                                                    }}
                                                />
                                            </div>
                                            <div className='lineInputs'>
                                                <p>Current time<br /> in this timezone: {dataTimeZone}</p>
                                            </div>
                                        </div>


                                        <div>
                                            <div>
                                                <label>{t('ADDRESS')}</label>
                                                {/* <span>{t('REQUIRED')}</span> */}
                                                <span>{  this.state.validations['address'] && t('REQUIRED_FIELD')}</span>
                                            </div>
                                            <input placeholder='Address' name='address' value={this.state.address} onChange={this.handleChange} />
                                        </div>

                                        {this.state.phones.map((item, index) => {
                                            return (
                                                <div key={'phone'+index} className='inputs'>
                                                    <div className='lineInputs'>
                                                        <div>
                                                            <label>{t('TELEPHONE')}</label>
                                                            {/* <span>{t('REQUIRED')}</span> */}
                                                            <span>{  this.state.validations['phone'] && t('REQUIRED_FIELD')}</span>
                                                        </div>
                                                        <div>
                                                            <input
                                                                placeholder='Phone number'
                                                                name='phone'
                                                                data-index={index}
                                                                data-items='phones'
                                                                data-field='phone'
                                                                type='text'
                                                                value={item.phone}
                                                                onChange={this.changeFieldInList} />
                                                        </div>
                                                    </div>
                                                    <div className='lineInputs'>
                                                        <div>
                                                            <label>{t('TYPE')}</label>
                                                            {/* <span>{t('REQUIRED')}</span> */}
                                                            <span>{  this.state.validations['userPhoneTypeId'] && t('REQUIRED_FIELD')}</span>
                                                        </div>
                                                        <select
                                                            value={item.userPhoneTypeId}
                                                            onChange={this.changeFieldInList}
                                                            className='input-lingo'
                                                            name='userPhoneTypeId'
                                                            data-items='phones'
                                                            data-field='userPhoneTypeId'
                                                            data-index={index}
                                                        >
                                                            <option value={1}>Commercial</option>
                                                            <option value={2}>Residential</option>
                                                            <option value={3}>Mobile</option>
                                                            <option value={4}>Whatsapp</option>
                                                        </select>
                                                    </div>
                                                    <div className='lineInputs'>
                                                        {index === 0 && (<button data-index={index} data-items='phones' style={{width:'150px'}} className='addInput' onClick={this.addFieldInList}>Add {t('TELEPHONE')} +</button>)}
                                                        {index > 0 && (<button data-index={index} data-items='phones' className='delete' onClick={this.removeFieldInList}>Delete</button>)}
                                                    </div>
                                                </div>
                                            )
                                        })}


                                        <div>
                                            <label>{t('COORDINATOR')} status</label>
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

                                        
                                        { this.state.id && this.state.id > 0 &&
                                            <button className='deleteLast' style={{width:'150px'}} onClick={this.handleDelete}>{t('DELETE')} {t('COORDINATOR')}</button>
                                        }

                                    </form>
                                </div>
                            </div>

                            <div className='button'>
                                <button className='save' onClick={this.handleSubmit}>{t('SAVE')}</button>
                            </div>
                            <Dialog open={this.state.showDialog} onClose={() => this.setState({showDialog: false})} className="alert-dialog-slide">
                                <DialogTitle className="alert-dialog-slide-title boxModal teste">
                                    {/* {t('SOMETHING_WENT_WRONG')} */}
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
                        </div>
                    </User>
                </section>
            </div>
        )
    }
}

CoordinatorsEdit.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}
  
export default translate('translations')(CoordinatorsEdit)

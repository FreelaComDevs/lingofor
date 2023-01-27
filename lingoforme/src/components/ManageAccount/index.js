/* eslint-disable linebreak-style */
import React, { Component } from 'react'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Manage } from './Styles'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import Loading from 'react-fullscreen-loading'
import Button from '@material-ui/core/Button';
import DialogModal from '../_common/DialogModal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import avatar from '../../images/profile/img_placeholder.svg'
import camera from '../../images/profile/ico_camera.svg'
import TimezonePicker from 'react-timezone'
import moment from 'moment'
import timezone from 'moment-timezone'
import validator from 'validator'
import { translate } from 'react-i18next'
import Myaccount from '../../images/icons/icon_myaccount_header.svg'
import { MultiSelect } from "react-multi-select-component";
import './multi-select.css';
import { IoMdArrowDropdown } from "react-icons/io";

import InputForClassTool from '../../elements/NewInputs/InputForClassTool';

import { connect } from 'react-redux'

let DateTimeFormat = global.Intl.DateTimeFormat;
const AUTH = new AuthService()

class ManageAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            role: '',
            name: '',
            email: '',
            classTool: '',
            classToolId: '',
            address: '',
            countryId: 0,
            gender: '',
            birthDate: '',
            timezone: '',
            originalTimezone: '',
            picture: null,
            oldpicture: null,
            languages: [{ languageId: 0, isNative: true }],
            coordinatorLanguageResponsible: [],
            userPhones: [],
            userEmails: [{ email: '', notify: false }], //não deve acontecer
            countries: [],
            globallanguages: [],
            validations: {},
            languageLabel: this.props.t('OTHER_LANGUAGE'),
            newpassword: '',
            confirmpassword: '',
            messagepassword: '',
            openmodalpass: false,
            openalert: false,
            loading: true,
            alerttitle: '',
            alertdescription: '',
            loggedIn: AUTH.loggedIn(),
            redirect: false,
            dialog: {
                opened: false,
                title: '',
                message: '',
                onClose: () => console.log('You should implement the onClose function.')
            }
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()
        this.timezone = timezone
        this.callApi = this.callApi.bind(this)
        this.addField = this.addField.bind(this)
        this.removeField = this.removeField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeList = this.handleChangeList.bind(this)
        this.submitPassword = this.submitPassword.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this.handleUploadFile = this.handleUploadFile.bind(this)
    }

    componentWillMount() {
        let user = this.service.getProfile()
        let languageLabel = this.t('OTHER_LANGUAGE') //for students
        if (user.role === 'teacher') {
            languageLabel = this.t('LANGUAGE_TEACHER')
        }

        this.setState({ id: user.id, role: user.role, languageLabel: languageLabel }, () => {
            if (this.state.id > 0) {
                this.callApi(false)
            }
        })
    }

    callApi(showModal) {
        if (!showModal) {
            this.service.get('countries/getall')
                .then(res => {
                    this.setState({
                        countries: res.result.items
                    })
                })
                .catch(err => console.log('err countryGetAll ', err))

            this.service.get('languages?skip=0&take=999999')
                .then(res => {
                    this.setState({
                        globallanguages: res.result.items
                    })
                })
                .catch(err => console.log('err languages ', err))
        }

        let urlCall = `admin/users/${this.state.id}`
        if (this.state.role === 'student')
            urlCall = `studentManagement/getbyuser/${this.state.id}`
        else if (this.state.role === 'teacher')
            urlCall = `teachermanagement/getbyuser/${this.state.id}`
        // else if (this.state.role === 'coordinator'){
        //     let user = this.service.getProfile()
        //     urlCall = `coordinators/${user.coordinatorId}`
        // }        

        this.service.get(urlCall)
            .then(res => {
                if (!res.success || !res.result.items || res.result.items.length === 0) {
                    return
                }
                if (this.state.role === 'student') {
                    if (res.result.items[0].students && res.result.items[0].students.length > 0) {
                        res.result.items[0].languages = res.result.items[0].students[0].studentLanguages
                        res.result.items[0].classTool = res.result.items[0].students[0].classTool
                        res.result.items[0].classToolId = res.result.items[0].students[0].classToolId
                    }
                } else if (this.state.role === 'teacher') {
                    if (res.result.items[0].teachers && res.result.items[0].teachers.length > 0)
                        res.result.items[0].languages = res.result.items[0].teachers[0].teacherLanguages
                } else if (this.state.role === 'coordinator') {
                    if (res.result.items[0].coordinators && res.result.items[0].coordinators.length > 0) {
                        res.result.items[0].languages = res.result.items[0].coordinators[0].coordinatorLanguages
                        res.result.items[0].coordinatorLanguageResponsible = res.result.items[0].coordinators[0].coordinatorLanguageResponsibles
                    }
                }

                if (this.state.role === 'student' || this.state.role === 'teacher' || this.state.role === 'coordinator') {
                    if (res.result.items[0].languages && res.result.items[0].languages.length > 0) {
                        res.result.items[0].languages.sort((x, y) => (x.isNative === y.isNative) ? 0 : x.isNative ? -1 : 1)
                    } else if (res.result.items[0].languages && res.result.items[0].languages.length === 0) {
                        res.result.items[0].languages = [{ languageId: 0, isNative: true }]
                    }
                }
                if (res.result.items[0].userPhones.length === 0) {
                    res.result.items[0].userPhones = [{ userPhoneTypeId: 15, phone: '' }]
                }

                if (res.result.items[0].picture !== null) {
                    res.result.items[0].oldPicture = res.result.items[0].picture
                }



                if (showModal) {
                    this.setState({ ...res.result.items[0], originalTimezone: res.result.items[0].timezone, loading: false, openalert: true, alerttitle: this.t('SAVE_FORM_TITLE'), alertdescription: this.t('SAVE_FORM_DESCRIPTION') }, () => this.validateForm())
                } else {
                    this.setState({ ...res.result.items[0], originalTimezone: res.result.items[0].timezone, loading: false }, () => this.validateForm())
                }
            })
            .catch(err =>
                console.log('ERRO GET USERS ', err)
            )

    }

    closeAlert(e) {
        this.setState({
            openalert: false,
            redirect: false
        })

        // const loginFirst = this.state.loggedIn
        // if (loginFirst !== 'firstAccess') {

        //     this.setState({  
        //         loggedIn: false,
        //         redirect: true,
        //     })             
        // }
    }

    addField(e) {
        e.preventDefault()
        if (e.target.name === 'addemail') {
            let arrEmail = this.state.userEmails
            arrEmail.push({ email: '', notify: false })

            this.setState({
                userEmails: arrEmail
            })
        }

        if (e.target.name === 'addphone') {
            let arrPhone = this.state.userPhones
            arrPhone.push({ userPhoneTypeId: '', phone: '' })

            this.setState({
                userPhones: arrPhone
            })
        }

        if (e.target.name === 'addlanguage') {
            let lang = this.state.languages
            lang.push({ languageId: 0, isNative: false })

            this.setState({
                languages: lang
            })
        }
    }

    removeField(e) {
        e.preventDefault()

        if (e.target.name === 'removeemail') {
            let arr = this.state.userEmails
            arr.splice(e.target.id, 1)
            this.setState({
                userEmails: arr
            })
        }

        if (e.target.name === 'removephone') {
            let arr = this.state.userPhones
            arr.splice(e.target.id, 1)

            this.setState({
                userPhones: arr
            })
        }

        if (e.target.name === 'removelanguage') {
            let lang = this.state.languages
            lang.splice(e.target.id, 1)

            this.setState({
                languages: lang
            })
        }
    }

    handleChangeList(e, index, extra) {
        e.preventDefault()
        let newObj = []
        if (e.target.name === 'email') {
            newObj = this.state.userEmails
            newObj[index][e.target.name] = e.target.value.toLowerCase()
            this.setState({
                userEmails: newObj
            }, () => { this.validateForm() })
        }

        if (e.target.name === 'notify') {
            newObj = this.state.userEmails
            newObj[index][e.target.name] = e.target.checked
            this.setState({
                userEmails: newObj
            }, () => { this.validateForm() })
        }

        if (e.target.name === 'phone') {
            newObj = this.state.userPhones
            newObj[index][e.target.name] = e.target.value
            this.setState({
                userPhones: newObj
            }, () => { this.validateForm() })
        }

        if (e.target.name === 'userPhoneTypeId') {
            newObj = this.state.userPhones
            newObj[index][e.target.name] = parseInt(e.target.value)
            this.setState({
                userPhones: newObj
            }, () => { this.validateForm() })
        }

        if (e.target.name === 'language') {
            console.log("extra", extra)
            newObj = this.state.languages

           const selectedLanguages = extra.reduce((acc, selectedLanguage)=>{
            const existLanguage = newObj.find((item)=> item.languageId == selectedLanguage.value)

                if(existLanguage) {
                    acc.currentLanguages.push(selectedLanguage)
                } else {
                    acc.newLanguages.push(selectedLanguage)
                }
                return acc
           }, { currentLanguages:[], newLanguages:[] })

           console.log("currentLanguages", selectedLanguages.currentLanguages, "newLanguages", selectedLanguages.newLanguages)
          

           newObj = newObj.map((item, key)=>{
            const existLanguage = selectedLanguages.currentLanguages.find(found=>item.languageId == found.value)
            if (existLanguage) {
                item.isNative = true
            } else if (item.isNative) {
                item.delete = key
            }
            return item
           })
           newObj.forEach((itemDelete)=>{
            if (itemDelete?.delete >= 0){
                newObj.splice(itemDelete.delete, 1)
            }
           })
           console.log("newObj", newObj)
            selectedLanguages.newLanguages.forEach(element => {            
            newObj.push({ languageId: element.value, isNative: true, language:{
                id:element.value, name:element.label
            } })            
        }); 
            
            this.setState({
                languages: newObj
            }, () => { this.validateForm() })
        }
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => { this.validateForm() });
    }

    inputChange = (change) => {
        const { value, name, type } = change
        this.setState({ [name]: value });
    }


    handleUploadFile(e) {
        if (e.target.files[0]) {
            const dialog = {
                opened: true,
                title: 'Too big file',
                message: 'The max filesize is 2MB',
                onClose: () => {
                    const d = { ...this.state.dialog, opened: false }
                    this.setState({ dialog: d });
                }
            }

            const file = e.target.files[0];

            if ((file.size / 1024 / 1024) > 2) {
                this.setState({ dialog });
                return;
            }

            if (file && file !== this.state.oldpicture) {
                const pictureData = new FormData()
                pictureData.append('file', file, file.name)

                const reader = new FileReader();
                reader.onloadend = evt => {
                    this.setState({ picture: evt.target.result });
                }
                reader.readAsDataURL(file);

                this.setState({ loading: true })
                this.service.ApiPosts(`admin/users/${this.state.id}/picture`, pictureData)
                    .then((res) => {
                        if (res.data && res.data.result) {
                            this.setState({
                                //: res.data.result.items[1].picture,
                                loading: false
                            })
                            this.service.refreshtokenToAddNewImage()
                            return;
                        }
                        throw Error('Upload failed.');
                    })
                    .catch(err => {
                        dialog.message = JSON.stringify(err.message);
                        this.setState({
                            dialog,
                            loading: false
                        });
                    })
            }
        }
    }

    validateForm() {
        let validations = []
        validations = {
            'name': validator.isEmpty(this.state.name),
            'email': !validator.isEmail(this.state.email) || validator.isEmpty(this.state.email),
            'address': validator.isEmpty(this.state.address === null ? '' : this.state.address),
            'countryId': this.state.countryId <= 0 ? true : false,
            'timezone': validator.isEmpty(this.state.timezone),
            'birthday': !this.state.birthDate || moment(this.state.birthDate) >= moment().add(-1, 'hours') ? true : false,
            'gender': validator.isEmpty(this.state.gender),
            'phone': this.state.userPhones.length === 0 || validator.isEmpty(this.state.userPhones[0].phone)
        }
        if (this.state.role === 'student')
            validations.nativelanguage = (this.state.languages.length === 0 || this.state.languages[0].languageId === 0) ? true : false


        this.setState({
            validations: validations
        })
    }



    handleSubmit(e) {
        e.preventDefault()
        this.setState({ loading: true })
        if (Object.values(this.state.validations).indexOf(true) < 0) {
            let formData = {
                name: this.state.name.toString(),
                email: this.state.email.toLowerCase(),
                address: this.state.address,
                countryId: Number(this.state.countryId),
                id: this.state.id,
                role: this.state.role,
                gender: this.state.gender,
                birthDate: this.state.birthDate,
                timezone: this.state.timezone,
                userEmails: this.state.userEmails,
                userPhones: this.state.userPhones,
                classTool: this.state.classTool,
                classToolId: this.state.classToolId
            }


            let languages = this.state.languages
            if (languages && languages.length > 0) {
                const nativeLanguages = languages.filter(l => l.isNative)
                if (nativeLanguages.length !== 1) {
                    for (let index = 0; index < languages.length; index++) {
                        languages[index].isNative = false;
                    }
                    languages[0].isNative = true
                }
            }

            let urlCall = `admin/users`
            if (this.state.role === 'student') {
                urlCall = `studentManagement/updatePersonalInformation`
                if (this.state.students && this.state.students.length > 0) {
                    let student = this.state.students[0]
                    student.studentLanguages = languages
                    student.languages = languages
                    formData.student = student
                    student.classTool = this.state.classTool
                    student.classToolId = this.state.classToolId

                    if (this.state.loggedIn == 'firstAccess' && this.state.firstAccess)
                        formData.firstAccess = false
                }
            } else if (this.state.role === 'teacher') {
                urlCall = `teachermanagement`
                let teacher = this.state.teachers[0]
                teacher.languages = languages
                // //teacher.teacherLanguages = this.state.languages
                // teacher.levels = []
                // if(teacher.teacherLevels){
                //     teacher.teacherLevels.map((level)=>{
                //         teacher.levels.push(level.id)
                //     })
                // }
                delete teacher.updatedAt
                delete teacher.createdAt
                delete teacher.deletedAt
                delete teacher.teacherAvailabilities
                delete teacher.teacherLevels
                delete teacher.teacherLanguages
                delete teacher.levels
                formData.teacher = teacher
            } else if (this.state.role === 'coordinator') {
                let coordinator = this.state.coordinators[0]
                coordinator.coordinatorLanguages = languages
                formData.coordinator = coordinator
            }

            formData.userEmails.map((email) => {
                delete email.id
                delete email.userId
                delete email.updatedAt
                delete email.createdAt
                delete email.deletedAt
                delete email.userPhoneType
            })

            formData.userPhones.map((phone) => {
                delete phone.id
                delete phone.userId
                delete phone.updatedAt
                delete phone.createdAt
                delete phone.deletedAt
                delete phone.userPhoneType
            })
            this.service.ApiPut(urlCall, JSON.parse(JSON.stringify(formData)))
                .then(res => {
                    if (!res || !res.success) {
                        return
                    }

                    if (this.state.timezone !== this.state.originalTimezone) {
                        this.setState({
                            redirect: false,
                            openmodalpass: false,
                            openalert: false,
                            loading: false,
                            dialog: {
                                opened: true,
                                title: this.t('MODAL_RELOAD_SUBJECT'),
                                message: this.t('MODAL_RELOAD_MESSAGE'),
                                buttonLabel: 'LOGIN',
                                onClose: () => {
                                    this.auth.logout()
                                }
                            }
                        })
                    } else {
                        //Evitar reload?
                        //Não evitar porque o object retornado é diferente do get
                        this.auth.updateUser(res.result.items[0])
                        this.callApi(true)

                        this.setState({
                            loggedIn: false
                        })
                    }
                })
                .catch(e => {
                    this.setState({ loading: false, openalert: true, alerttitle: this.t('ERROR_MESSAGE'), alertdescription: this.t('ERROR_DIALOG') })
                })
        } else {
            this.setState({ openalert: true, loading: false, alerttitle: this.t('INVALID_FORM_TITLE'), alertdescription: this.t('INVALID_FORM_DESCRIPTION') })
        }
    }

    closeModalPassword = e => {
        e.preventDefault()
        this.setState({ openmodalpass: false })
    }

    openModalPassword = e => {
        e.preventDefault()
        this.setState({ openmodalpass: true })
    }

    submitPassword(e) {
        const t = this
        e.preventDefault()
        const closeDialogModal = () => {
            this.setState({
                openmodalpass: true,
                dialog: {
                    opened: false
                }
            });
        }

        const dialog = {
            opened: true,
            title: this.t('VALIDATION_ERROR'),
            onClose: closeDialogModal
        };

        var patt = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&[\]{},.;<>:/~^´`\-_()"])[A-Za-z\d@$!%*#?&[\]{},.;<>:/~^´`\-_()"]{6,20}$/g

        if (!patt.test(this.state.newpassword)) {
            dialog.message = this.t('PASS_INVALID_MESSAGE')
        }

        if (this.state.newpassword !== this.state.confirmpassword) {
            dialog.message = this.t('PASS_NOTEQUAL_MESSAGE')
        }

        if (dialog.message) {
            this.setState({
                openmodalpass: false,
                dialog
            });
            return;
        }

        this.setState({ loading: true });

        let formData = {
            id: this.state.id,
            userPassword: {
                password: this.state.newpassword
            }
        }

        const newState = {
            redirect: false,
            openmodalpass: false,
            openalert: false,
            loading: false,
            dialog: {
                opened: true,
                title: this.t('VALID_FORM_TITLE'),
                message: this.t('VALID_FORM_DESCRIPTION'),
                buttonLabel: 'Ok',
                onClose: () => {
                    this.setState({ redirect: true });
                }
            }
        }

        this.service.ApiPosts('admin/users/changepassword', formData)
            .then(res => {
                this.setState(newState)
            })
            .catch(e => {
                newState.dialog = {
                    title: 'Ooops, something was wrong',
                    message: 'The password cannot be changed.',
                    opened: true,
                    onClose: closeDialogModal
                };
                this.setState(newState)
            })
    }

    render() {
        const { t } = this
        const { redirect, dialog } = this.state;
        const nativeLanguage = this.state.languages.filter(item => item.isNative)
        const validationLanguageNative = nativeLanguage ? nativeLanguage.languageId : null
        let timezone = this.state.timezone

        // Arrumando o timezone horario de verão são paulo, subtraindo 1 hora.
        if (timezone && timezone === 'America/Sao_Paulo') {
            timezone = 'America/Bahia'
        }
        let dataNew = moment(new Date()).tz(timezone);

        moment.tz(timezone)

        let dataTimeZone = moment(dataNew).format('LT')
        if (redirect) {
            return <Redirect to='/' />;
        }
        return (
            <div className="view">
                <DialogModal
                    opened={dialog.opened}
                    title={dialog.title}
                    onClose={dialog.onClose}
                    buttonLabel="Ok"
                >
                    <p className="message">{dialog.message}</p>
                </DialogModal>

                <Dialog
                    open={this.state.openmodalpass}
                    onClose={this.closeModalPassword}
                    aria-labelledby="pass-dialog-title"
                    aria-describedby="pass-dialog-description"
                    className="boxModal"
                >
                    <DialogTitle id="pass-dialog-title"><span className="titleModal">{t('CHANGE_PASSWORD_TITLE')}</span></DialogTitle>
                    <DialogContent>
                        <div id="pass-dialog-description" className="boxModal">

                            <form className="formulario">
                                <div className="description">
                                    <p>{t('CHANGE_PASSWORD_DESCRIPTION')}</p>
                                </div>
                                <div className="items">
                                    <label htmlFor='newpassword'>{this.t('PASSWORD')}</label>
                                    <span>{this.t('REQUIRED_FIELD')}</span>
                                </div>
                                <input type='password' placeholder={t('PASS_PLACEHOLDER')} name='newpassword' id='newpassword' value={this.state.newpassword} onChange={this.handleChange} required minLength={6} className="input-lingo inputManage" style={{ borderCcolor: '#B2B2B7 !important' }} pattern="(?=.*\d)(?=.*[a-z]).{6,}" />
                                <div className="items">
                                    <label htmlFor='confirmpassword'>{this.t('CHECK_PASS')}</label>
                                    <span>{this.t('REQUIRED_FIELD')}</span>
                                </div>
                                <input type='password' placeholder={this.t('CHECK_PASS_PLACEHOLDER')} name='confirmpassword' id='confirmpassword' value={this.state.confirmpassword} onChange={this.handleChange} required minLength={6} className="input-lingo" pattern="(?=.*\d)(?=.*[a-z]).{6,}" />

                            </form>

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className="buttons changePassword">
                            <button onClick={this.closeModalPassword} autoFocus>
                                {t('CANCEL')}
                            </button>
                            <button onClick={this.submitPassword} color="primary" autoFocus>
                                {t('CHANGE_PASSWORD_TITLE')}
                            </button>
                        </div>
                    </DialogActions>
                </Dialog>
                <SideMenu />
                <section>
                    {
                        this.state.loading &&
                        <Loading loading={true} background="rgba(0,0,0,0.6)" loaderColor="#3498db" />
                    }
                    <Header />
                    <div className="toptitle">
                        <img src={Myaccount} alt={t('MANAGE_ACCOUNT_TITLE')} />
                        <h1>{t('MANAGE_ACCOUNT_TITLE')}</h1>
                    </div>
                    <Manage>
                        {this.state.loggedIn == 'firstAccess' &&
                            <div className="container">
                                <h3>{t('FIRST_ACESS_TEXT')}</h3>
                            </div>
                        }

                        <div className="container">
                            <div>
                                <Dialog
                                    open={this.state.openalert}
                                    onClose={this.closeAlert}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    className="boxModal"
                                >
                                    <DialogTitle id="alert-dialog-title"><span className="titleModal">{this.state.alerttitle}</span></DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="pass-dialog-description" className="boxModal">
                                            <form className="formulario">
                                                <div className="description">
                                                    {this.state.alertdescription}
                                                </div>
                                            </form>
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <div className="buttons">

                                            <button onClick={this.closeAlert} color="primary" autoFocus>
                                                {t('CLOSE')}
                                            </button>
                                        </div>
                                    </DialogActions>
                                </Dialog>
                            </div>

                            <div className="tabs">
                                <ManageAccountTabs />
                                <div className="tab-content">
                                    <div className="box">
                                        <div className="changePhoto">
                                            <h2>Foto</h2>
                                            <form>
                                                <div className='photo'>
                                                    <img
                                                        src={(this.state.picture !== null) ? this.state.picture : avatar}
                                                        alt='Avatar'
                                                        width='112'
                                                        height='112'
                                                        className='avatarRound'
                                                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                                                    />
                                                    <div className='fileUpload btn btn-primary'>
                                                        <span>
                                                            <img src={camera} alt='Camera' width='16' height='14' />{this.t('CHANCE_PICTURE')}</span>
                                                        <input
                                                            id='uploadBtn'
                                                            type='file'
                                                            className='upload'
                                                            onChange={this.handleUploadFile}
                                                            accept="image/x-png,image/jpeg"
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <form className="formulario">
                                            <div>
                                                <label htmlFor='name' required={this.state.validations['name']}>{this.t('NAME')}</label>
                                                <span className='invalid'>{this.state.validations['name'] && this.t('REQUIRED_FIELD')}</span>
                                            </div>
                                            <input
                                                type='text'
                                                value={this.state.name}
                                                placeholder={this.t('NAME_PLACEHOLDER')}
                                                name='name'
                                                id='name'
                                                onChange={this.handleChange}
                                                required />
                                            <div>
                                                <div>
                                                    <label htmlFor='email'>{this.t('LOGIN_EMAIL')}</label>
                                                    <span>{this.state.validations['email'] && this.t('REQUIRED_FIELD')}</span>
                                                </div>
                                                <input
                                                    type='text'
                                                    placeholder={this.t('LOGIN_EMAIL')}
                                                    name='email'
                                                    id='email'
                                                    className="inputMobile"
                                                    value={this.state.email}
                                                    onChange={this.handleChange}
                                                    required
                                                    disabled
                                                    readOnly />
                                                <button name='addemail' className='addInput' onClick={this.addField}>{this.t('ADD_EMAIL')} +</button>
                                            </div>
                                            {this.state.userEmails.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div>
                                                            <label htmlFor={'email' + index}>{this.t('EXTRA_EMAIL')} </label>
                                                        </div>
                                                        <div className="notification">
                                                            <input
                                                                type='text'
                                                                className='newemail inputMobile'
                                                                name='email'
                                                                id={'email' + index}
                                                                placeholder={this.t('EXTRA_EMAIL_PLACEHOLDER')}
                                                                value={item.email}
                                                                onChange={(e) => this.handleChangeList(e, index)}
                                                                required />
                                                            <div className="switchBox">
                                                                <div className="switch__container">
                                                                    <input
                                                                        className="switch switch--shadow"
                                                                        name='notify'
                                                                        id={'notify' + index}
                                                                        type="checkbox"
                                                                        onChange={(e) => this.handleChangeList(e, index)}
                                                                        checked={item.notify}
                                                                    />
                                                                    <label htmlFor={'notify' + index} ><span>{this.t('NOTIFICATION')}</span></label>
                                                                </div>
                                                            </div>
                                                            <button id={index} name='removeemail' className='delete' style={{ margin: '5px 0px 20px 0' }} onClick={this.removeField}>{this.t('DELETE')} <i className="fa fa-times-circle-o fa-lg"></i></button>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <div className="inputs">
                                                <div className="lineInputs">
                                                    <div>
                                                        <label htmlFor="gender">{this.t('GENDER')}</label>
                                                        <span className='invalid'>{this.state.validations['gender'] && this.t('REQUIRED_FIELD')}</span>
                                                    </div>
                                                    <select
                                                        name="gender"
                                                        value={this.state.gender}
                                                        onChange={this.handleChange}>
                                                        <option value=''>{t('SELECT')}</option>
                                                        <option value='notInformed'>{this.t('NOT_INFORMED')}</option>
                                                        <option value='male'>{this.t('MALE')}</option>
                                                        <option value='female'>{this.t('FEMALE')}</option>
                                                    </select>
                                                </div>



                                                <div className="lineInputs">
                                                    <div>
                                                        <label htmlFor="birthDate">{this.t('BIRTH_DATE')}</label>
                                                        <span className='invalid'>{this.state.validations['birthday'] && this.t('REQUIRED_FIELD')}</span>
                                                    </div>

                                                    {

                                                        this.state.loggedIn == 'firstAccess' ?

                                                            <input type="date" id='date' name="birthDate" value={this.state.birthDate} onChange={this.handleChange} />


                                                            :
                                                            <input type="date" id='date' name="birthDate" value={this.state.birthDate} onChange={this.handleChange} />

                                                    }

                                                </div>
                                            </div>

                                            {(this.state.role === 'student' || this.state.role === 'teacher' || this.state.role === 'coordinator') &&
                                                <div>
                                                    <div>
                                                        <label htmlFor="language">{this.t('NATIVE_LANGUAGE')}</label>
                                                        <span className='invalid'>{this.state.validations['nativelanguage'] && this.t('REQUIRED_FIELD')}</span>
                                                    </div>
                                                    <div>
                                                        <MultiSelect
                                                            options={
                                                                this.state.globallanguages.map((item) => {
                                                                    return {
                                                                        label: item.name,
                                                                        value: item.id
                                                                    }
                                                                })
                                                            }
                                                            onChange={(languages) => {                                                                
                                                                this.handleChangeList({ target: { name: "language" }, preventDefault: function () { } }, 0, languages)
                                                            }}
                                                            value={
                                                                nativeLanguage.map((item) => {
                                                                    return {
                                                                        label: item?.language?.name,
                                                                        value: item?.language?.id
                                                                    }
                                                                })
                                                            }
                                                            className="multi-select"
                                                            hasSelectAll={false}
                                                            ArrowRenderer={()=>{
                                                                return <IoMdArrowDropdown color='#757575' fontSize={"18px"} className="arrowDropDown"/>
                                                            }}
                                                        />

                                                        {/* <select
                                                            name='language'
                                                            value={validationLanguageNative ? validationLanguageNative : ''}
                                                            disabled={this.state.role !== 'student' ? true : null}
                                                            onChange={(e) => this.handleChangeList(e, 0)}
                                                            className="language inputMobile" >
                                                            <option value=''>{t('SELECT')}</option>
                                                            {this.state.globallanguages.map((item, index) => {
                                                                return (<option key={'nativ' + item.id} value={item.id}>{item.name}</option>)
                                                            })}
                                                        </select> */}


                                                        {
                                                            this.state.role === 'student' &&
                                                            <button name='addlanguage' className='addInput' onClick={this.addField}>{this.t('ADD_LANGUAGE')} +</button>
                                                        }

                                                    </div>
                                                </div>
                                            }
                                            {(this.state.role === 'student' || this.state.role === 'teacher' || this.state.role === 'coordinator') &&
                                                this.state.languages.filter(item => !item.isNative).map((item, index) => {
                                                    if ((this.state.role === 'student') || (index >= 0 && this.state.role !== 'student'))
                                                        index = index + 1
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                <label htmlFor={'language' + index}>{this.t('OTHER_LANGUAGE')}</label>
                                                                {this.state.role === 'student' &&
                                                                    <span>{this.t('REQUIRED_FIELD')}</span>
                                                                }
                                                            </div>
                                                            <div>
                                                                <select
                                                                    name='language'
                                                                    id={'language' + index}
                                                                    disabled={this.state.role !== 'student' ? true : null}
                                                                    className="language inputMobile"
                                                                    value={item.languageId}
                                                                    onChange={(e) => this.handleChangeList(e, index)} >
                                                                    <option value=''>Select</option>
                                                                    {this.state.globallanguages.map((item, i) => {
                                                                        i = i + 1
                                                                        return <option key={'gLang' + item.id + i} value={item.id}>{item.name}</option>
                                                                    })}
                                                                </select>
                                                                {this.state.role === 'student' &&
                                                                    <button id={index} name='removelanguage' className='delete' onClick={this.removeField}>{this.t('DELETE')} <i className="fa fa-times-circle-o fa-lg"></i></button>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            {(this.state.role === 'coordinator' && this.state.coordinatorLanguageResponsible && this.state.coordinatorLanguageResponsible.length > 0 &&
                                                <div>
                                                    <div>
                                                        <label htmlFor={'lingoLanguage'}>{this.t('COORDINATED_LANGUAGES')}</label>
                                                    </div>
                                                    <div>
                                                        <select
                                                            name='lingoLanguage'
                                                            id={'lingoLanguage'}
                                                            disabled={true}
                                                            className="language inputMobile">
                                                            {this.state.coordinatorLanguageResponsible.map((lang) => {
                                                                return <option key={'lingoLang' + lang.id} value={lang.id}>{lang.lingoLanguage.desc}</option>
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="inputs">
                                                <div className="lineInputs">
                                                    <div>
                                                        <label htmlFor='countryId'>{this.t('COUNTRY')}</label>
                                                        <span className='invalid'>{this.state.validations['countryId'] && this.t('REQUIRED_FIELD')}</span>
                                                    </div>
                                                    <select name='countryId' value={this.state.countryId} onChange={this.handleChange}>
                                                        <option value='0'>Select</option>
                                                        {this.state.countries.map(item => {
                                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                                        })}
                                                    </select>
                                                </div>

                                                <div className="lineInputs">
                                                    <div>
                                                        <label htmlFor="timezone">{this.t('TIMEZONE')} </label>
                                                        <span className='invalid'>{this.state.validations['timezone'] && this.t('REQUIRED_FIELD')}</span>
                                                    </div>
                                                    <TimezonePicker
                                                        value={this.state.timezone}
                                                        onChange={timezoneName => {
                                                            this.setState({ timezone: timezoneName }, () => { return this.validateForm() })
                                                        }}
                                                        inputProps={{
                                                            placeholder: 'Select Timezone...',
                                                            name: 'timezone'
                                                        }}
                                                    />

                                                </div>
                                                <div className='lineInputs'>
                                                    {/* <p>{this.t("CURRENT_TIME")}<br /> {this.t("IN_THIS_TIMEZONE")}: { moment.tz(this.state.timezone).format('LT') }</p> */}
                                                    <p>{this.t("CURRENT_TIME")}<br /> {this.t("IN_THIS_TIMEZONE")}: {dataTimeZone}</p>


                                                </div>

                                            </div>
                                            {this.state.firstAccess == false && this.state.role === 'student' &&
                                                <div className="inputs selectClass">
                                                    <div className="lineInputs">
                                                        <InputForClassTool name="classTool" data={{ value: this.state.classTool, required: false }} inputChange={this.inputChange} readonly="readonly" tabindex="-1" aria-disabled="true" />
                                                    </div>
                                                    <div className="lineInputs">
                                                        <div>
                                                            <label htmlFor="classToolId">{this.t("TOOL_ID")}</label>
                                                            <span className='invalid'>{this.state.validations['classToolId']}</span>
                                                        </div>
                                                        <span>

                                                        </span>
                                                        <input
                                                            placeholder={this.t("STUDENT_TOOL_ID")}
                                                            id='classToolId'
                                                            name="classToolId"
                                                            value={this.state.classToolId}
                                                            onChange={this.handleChange}
                                                            disabled="disabled"
                                                        />
                                                    </div>
                                                </div>
                                            }

                                            <div>
                                                <label htmlFor="address">{this.t('ADDRESS')} </label>
                                                <span className="invalid">{this.state.validations['address'] && this.t('REQUIRED_FIELD')}</span>
                                            </div>
                                            <input
                                                placeholder={this.t('ADDRESS_PLACEHOLDER')}
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                                required />

                                            {this.state.userPhones.map((item, index) => {
                                                return (
                                                    <div key={index} className='inputs telefone' style={{ flexDirection: 'row' }}>
                                                        <div className='lineInputs'>
                                                            <div>
                                                                <label htmlFor={'phone' + index}>{this.t('TELEPHONE')}</label>
                                                                {index === 0 &&
                                                                    <span className='invalid'>{this.state.validations['phone'] && this.t('REQUIRED_FIELD')}</span>
                                                                }
                                                            </div>
                                                            <input
                                                                id={'phone' + index}
                                                                className="inputMobile"
                                                                required={index === 0}
                                                                placeholder={this.t('PHONE_PLACEHOLDER')}
                                                                name='phone'
                                                                value={item.phone}
                                                                onChange={(e) => this.handleChangeList(e, index)} />
                                                        </div>
                                                        <div className='lineInputs'>
                                                            <div>
                                                                <label htmlFor={'userPhoneTypeId' + index}>{this.t('TYPE')}</label>
                                                            </div>
                                                            <select
                                                                name='userPhoneTypeId'
                                                                id={'phoneType' + index}
                                                                className="inputMobile"
                                                                value={item.userPhoneTypeId || 15}
                                                                onChange={(e) => this.handleChangeList(e, index)} >
                                                                <option value="15">{this.t('SELECT')}</option>
                                                                <option value="1">{this.t('COMMERCIAL')}</option>
                                                                <option value="2">{this.t('RESIDENCIAL')}</option>
                                                                <option value="3">{this.t('CELLPHONE')}</option>
                                                                <option value="4">{this.t('WHATSAPP')}</option>
                                                            </select>
                                                        </div>
                                                        {index === 0 &&
                                                            <div className='lineInputs'>
                                                                <button name='addphone' className='addInput inputMobile' onClick={this.addField}>{this.t('BTN_ADD_TEL')} +</button>
                                                            </div>
                                                        }
                                                        {index > 0 &&
                                                            <button id={index} name='removephone' className='delete' onClick={this.removeField}>{this.t('DELETE')} <i className="fa fa-times-circle-o fa-lg"></i></button>
                                                        }
                                                    </div>

                                                )
                                            })}

                                            <div>
                                                <div>
                                                    <label htmlFor="password">{this.t('PASSWORD')}</label>
                                                    {this.state.firstAccess &&
                                                        <span className="invalid">{this.state.validations['address'] && this.t('REQUIRED_FIELD')}</span>
                                                    }
                                                </div>
                                                <button type="button" className="password" onClick={this.openModalPassword}>{this.t('CHANGE_PASSWORD')}</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="buttonSave">
                                        <button type="submit" onClick={this.handleSubmit} >{t('BTN_SAVE')}</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Manage>
                </section>
            </div>

        );
    }
}

ManageAccount.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}

const mapStateToProps = ({ lingo }) => ({ lingo, });

export default (connect(mapStateToProps)(translate('translations')(ManageAccount)))

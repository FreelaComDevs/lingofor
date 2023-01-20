import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 

import { StudentManagementCss } from './styles'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import RatingStudent from './rating'


import Loading from 'react-fullscreen-loading'
import Button from '@material-ui/core/Button';
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

import UsersIcon from '../../images/icons/icon_students_header.svg'

import InputForClassTool from '../../elements/NewInputs/InputForClassTool';
import { fetchLingoTools } from '../../actions/lingoActions'
import InputForText from '../../elements/NewInputs/InputForText';


let DateTimeFormat = global.Intl.DateTimeFormat;

class ViewStudent extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            id: 0,
            role: '',
            name: '',
            email: '',
            address: '',            
            countryId: '',
            gender: '',
            birthDate: moment().format('YYYY-MM-DD'),
            timezone: '',
            picture: null,
            oldpicture: null,
            languages:[{languageId: 2, isNative: true}],
            userPhones: [],
            userEmails: [ {email: '', notify: false}], //não deve acontecer
            countries: [],
            globallanguages: [],
            validations:{},
            languageLabel: this.props.t('OTHER_LANGUAGE'),
            newpassword: '',
            confirmpassword: '',
            messagepassword: '',
            openmodalpass: false,
            openalert: false,
            loading: true,
            alerttitle: '',
            alertdescription: '',
            classTool: '',
            classToolId: ''
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()
        this.timezone = timezone
        this.userId = this.props.match.params.id

        this.callApi = this.callApi.bind(this)
        this.addField = this.addField.bind(this)
        this.removeField = this.removeField.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeList = this.handleChangeList.bind(this)

        this.closeAlert = this.closeAlert.bind(this)

        this.handleUploadFile = this.handleUploadFile.bind(this)
    }

    componentWillMount () {   
        this.callApi(false);
    }

    callApi (onlyUser) {
        if(!onlyUser){
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

        this.service.noAuthGet(`studentManagement/getbyuser/${this.userId}`)
        .then(res => {
            if(!res.success || !res.result.items || res.result.items.length === 0)
            {
                return
            }
            if(res.result.items[0].students && res.result.items[0].students.length > 0 )
                res.result.items[0].languages = res.result.items[0].students[0].studentLanguages

            if(res.result.items[0].languages && res.result.items[0].languages.length === 0){
                res.result.items[0].languages = [{languageId: 2, isNative: true}]
            }                

            if( res.result.items[0].userPhones.length === 0){
                res.result.items[0].userPhones = [{userPhoneTypeId: 1, phone: ''}]
            }

            if(res.result.items[0].picture !== null){
                res.result.items[0].oldPicture = res.result.items[0].picture
            }

            if(onlyUser){
                this.setState({...res.result.items[0], loading:false, openalert:true, alerttitle: this.t('SAVE_FORM_TITLE'), alertdescription:this.t('SAVE_FORM_DESCRIPTION') }, () => this.validateForm() )
            }else
                this.setState({...res.result.items[0], loading:false}, () => this.validateForm() )

                this.setState({

                    classTool: res.result.items[0].students[0].classTool,
                    classToolId: res.result.items[0].students[0].classToolId

                })
        })
        .catch(err => console.log('ERRO GET USERS ', err))

      }

    closeAlert(e){
        this.setState({  openalert: false })
    }

    addField (e) {
        e.preventDefault()
        if (e.target.name === 'addemail') {
          let arrEmail = this.state.userEmails
          arrEmail.push({email: '', notify: false})
    
          this.setState({
            userEmails: arrEmail
          })
        }
    
        if (e.target.name === 'addphone') {
          let arrEmail = this.state.userPhones
          arrEmail.push({userPhoneTypeId: '', phone: ''})
    
          this.setState({
            userPhones: arrEmail
          })
        }

        if (e.target.name === 'addlanguage') {
            let lang = this.state.languages
            lang.push({languageId: 2, isNative: false})
      
            this.setState({
                languages: lang
            })
        }
    }
    
    removeField (e) {
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
    
    handleChangeList (e,index) {
        e.preventDefault()
        let newObj = []
        if (e.target.name === 'email') {
          newObj = this.state.userEmails
          newObj[index][e.target.name] = e.target.value
          this.setState({
            userEmails: newObj
          },() => { this.validateForm() })     
        }

        if (e.target.name === 'notify') {
            newObj = this.state.userEmails
            newObj[index][e.target.name] = e.target.checked
            this.setState({
                userEmails: newObj
            },() => { this.validateForm() })     
        }
    
        if (e.target.name === 'phone') {
          newObj = this.state.userPhones
          newObj[index][e.target.name] = e.target.value
          this.setState({
            userPhones: newObj
        },() => { this.validateForm() })     
        }

        if (e.target.name === 'userPhoneTypeId') {
            newObj = this.state.userPhones
            newObj[index][e.target.name] = parseInt(e.target.value)
            this.setState({
                userPhones: newObj
            },() => { this.validateForm() })     
        }

        if (e.target.name === 'language') {
            newObj = this.state.languages
            newObj[index] = { languageId: parseInt(e.target.value), isNative: index ===0 ? true : false} 
            this.setState({
                languages: newObj
            },() => { this.validateForm() })               
        }
    }
    
    handleChange (e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        }, () => { this.validateForm () });     
    }

    inputChange = (change) => {
		const { value, name, type } = change
        this.setState({ [name]: value});
	} 


    handleUploadFile (e) {
        
        this.setState({loading:true}) 

        if(e.target.files[0] !== undefined) {
            if((e.target.files[0].size / 1024 / 1024) > 2) {
                alert('too large file!')
                this.setState({loading:false}) 
            } else {
                if(e.target.files[0] !== this.state.oldpicture && e.target.files[0] !== null) {
                    const pictureData = new FormData()
                    pictureData.append('file', e.target.files[0], e.target.files[0].name)
                    
                    this.service.ApiPosts(`admin/users/${this.state.id}/picture`, pictureData)
                    .then((res) => {
                        
                        if(!res || !res.data || !res.data.result.items || res.data.result.items.length === 0)
                        {
                            return
                        }
                        
                        this.setState({picture: res.data.result.items[1].picture,loading:false})
                    })
                    .catch(err => { console.log(err) })
                }
            }            
        }        
    }
      
    validateForm () {
        let validations = []
        validations = {
            'name': validator.isEmpty(this.state.name),
            'email': !validator.isEmail(this.state.email) || validator.isEmpty(this.state.email),
            'address': validator.isEmpty(this.state.address === null ? '' : this.state.address ),
            'timezone' : validator.isEmpty(this.state.timezone),
            'birthday' : moment(this.state.birthDate) >= moment().add(1, 'hours'),
            'gender': validator.isEmpty(this.state.gender),
            'phone' : this.state.userPhones.length === 0 || validator.isEmpty(this.state.userPhones[0].phone)
        }
        if(this.state.role === 'student')
            validations.language = this.state.languages.length === 0 || this.state.languages[0].languageId === 0

        this.setState({
            validations: validations
        })             
    }


      
    handleSubmit(e){
        e.preventDefault()
        this.setState({loading:true}) 
        if (Object.values(this.state.validations).indexOf(true) < 0)  {
            let formData ={
                name: this.state.name.toString(),
                email: this.state.email,
                address: this.state.address,
                countryId: Number(this.state.countryId),
                id: this.state.id,
                role: this.state.role,
                gender:this.state.gender,
                birthDate:this.state.birthDate,
                timezone: this.state.timezone,
                userEmails: this.state.userEmails,
                userPhones : this.state.userPhones ,
                classTool: this.state.classTool,
                classToolId: this.state.classToolId               
            }


            if(this.state.students && this.state.students.length > 0){
                let student = this.state.students[0]
                student.studentLanguages = this.state.languages
                student.languages = this.state.languages
                formData.student = student
                student.classTool = this.state.classTool
                student.classToolId = this.state.classToolId 
            }                

            formData.userEmails.forEach((email)=>{
                delete email.id
                delete email.userId
                delete email.updatedAt
                delete email.createdAt
                delete email.deletedAt
                delete email.userPhoneType
            })

            formData.userPhones.forEach((phone)=>{
                delete phone.id
                delete phone.userId
                delete phone.updatedAt
                delete phone.createdAt
                delete phone.deletedAt
                delete phone.userPhoneType
            })

            let languages = this.state.languages
            if(languages && languages.length > 0){
                languages[0].isNative = true
            }

            this.setState({loading:false}) 
            this.service.ApiPut(`studentManagement/updatePersonalInformation`, JSON.parse(JSON.stringify(formData)))
            .then(res => {
                if(!res || !res.success)
                {
                    return
                }
                //Evitar reload?
                //Não evitar porque o object retornado é diferente do get
                //this.auth.updateUser(res.result.items[0])
                this.callApi(true)
            })
            .catch(e => {
                console.log(e.response)
                this.setState({loading:false, openalert: true, alerttitle: this.t('ERROR_MESSAGE'), alertdescription:this.t('ERROR_DIALOG')}) 
            })
        }else{
            this.setState({  openalert: true, loading:false, alerttitle: this.t('INVALID_FORM_TITLE'), alertdescription:this.t('INVALID_FORM_DESCRIPTION') })
        }
    }

    render() {
        const {
            t,
            userId,
            service: { isAdmin },
            props
        } = this
        const isEditEmailDisabled = !userId || !isAdmin

        let timezone = this.state.timezone
        // Arrumando o timezone horario de verão são paulo, subtraindo 1 hora.
        if(timezone && timezone === 'America/Sao_Paulo'){        
            timezone = 'America/Bahia'
        }

        let dataNew = moment(new Date()).tz(timezone)
        moment.tz(timezone) 

        let dataTimeZone = moment(dataNew).format('LT')
      
        const nativeLanguageArray = this.state.languages.filter(item => item.isNative)

        const nativeLanguageId = nativeLanguageArray.length > 0 ? nativeLanguageArray[0].languageId : this.state.languages[0].languageId

        return (
            <div className="view">    
            <SideMenu />
            <section>
            {
                this.state.loading &&
                <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
            } 
                <Header/>  
                <div className="toptitle">      
                    <img src={UsersIcon} alt="UsersIcon" />    
                    <h1>{this.t('ITEM_STUDENTS')}</h1>                   
                </div>
                <RatingStudent userId={Number(this.userId)}/>             
                <StudentManagementCss>                                           
                <div className="container">     
                <Dialog
                        open={this.state.openalert}
                        onClose={this.closeAlert}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{this.state.alerttitle}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="pass-dialog-description">
                                {this.state.alertdescription}
                            </DialogContentText>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeAlert} color="primary" autoFocus>
                        {t('CLOSE')}
                        </Button>
                    </DialogActions>
                </Dialog>      
                <div className="tabs">
                    <ManageAccountTabs studentId={this.userId}/>
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
                                        style={{borderRadius:'50%', objectFit: 'cover'}}
                                    />
                                    <div className='fileUpload btn btn-primary'>
                                    <span>
                                        <img src={ camera } alt='Camera' width='16' height='14' />Trocar</span>
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
                                <span className='invalid'>{  this.state.validations['name'] && this.t('REQUIRED_FIELD')}</span>
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
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required 
                                    disabled={isEditEmailDisabled}/>
                                    <button name='addemail' className='addInput' onClick={this.addField}>{this.t('ADD_EMAIL')} +</button>
                            </div>
                            { this.state.userEmails.map((item,index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <label htmlFor={'email'+index }>{this.t('EXTRA_EMAIL')} </label>
                                        </div>                                    
                                        <div className="notification">  
                                            <input
                                                type='text'
                                                className='newemail'
                                                name='email'
                                                id={'email'+index }
                                                placeholder={this.t('EXTRA_EMAIL_PLACEHOLDER')}
                                                value={item.email} 
                                                onChange={(e) => this.handleChangeList(e,index)}
                                                required/>
                                            <div className="switchBox">
                                                <div className="switch__container">
                                                    <input 
                                                        className="switch switch--shadow"  
                                                        name='notify'
                                                        id={'notify'+index }                                
                                                        type="checkbox" 
                                                        onChange={(e) => this.handleChangeList(e,index)}
                                                        checked = {item.notify}                                                        
                                                        />
                                                    <label htmlFor={'notify'+index } ><span>{this.t('NOTIFICATION')}</span></label>
                                                </div>                                                
                                            </div>
                                            <button id={index} name='removeemail' className='delete' style={{margin: '5px 0px 20px 0'}} onClick={this.removeField}>{this.t('DELETE')} <i className="fa fa-times-circle-o fa-lg"></i></button>
                                        </div>                                        
                                    </div>
                                );
                            }) }
                        
                                <div className="inputs">
                                    <div className="lineInputs">
                                        <div>
                                            <label htmlFor="gender">{this.t('GENDER')}</label>
                                            <span className='invalid'>{  this.state.validations['gender'] &&this.t('REQUIRED_FIELD')}</span>
                                        </div>
                                        <select 
                                            name="gender"
                                            value={this.state.gender}
                                            onChange={this.handleChange}>
                                            <option value=''>Select</option>
                                            <option value='notInformed'>{this.t('NOT_INFORMED')}</option>
                                            <option value='male'>{this.t('MALE')}</option>
                                            <option value='female'>{this.t('FEMALE')}</option>
                                        </select>
                                    </div>

                                    <div className="lineInputs">
                                        <div>
                                            <label htmlFor="birthDate">{this.t('BIRTH_DATE')}</label>
                                            <span className='invalid'>{  this.state.validations['birthday'] &&this.t('REQUIRED_FIELD')}</span>
                                        </div>
                                        <input type="date" id='date' name="birthDate" value={this.state.birthDate} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="language">{this.t('NATIVE_LANGUAGE')}</label>
                                        <span className='invalid'>{  this.state.validations['nativelanguage'] && this.t('REQUIRED_FIELD')}</span>
                                    </div>            
                                    <div>
                                        <select 
                                            name='language'
                                            value={nativeLanguageId} 
                                            disabled={ this.state.role !== 'student'? true : null}
                                            onChange={(e) => this.handleChangeList(e,0)} 
                                            className="language" >
                                                <option value=''>Select</option>
                                        {this.state.globallanguages.map((item,index) => {
                                            return (<option key={'nativ'+item.id} value={item.id}>{item.name}</option>)
                                        })}
                                        </select>
                                        <button name='addlanguage' className='addInput' onClick={this.addField}>{this.t('ADD_LANGUAGE')} +</button>
                                    </div>
                                </div>
                                { (this.state.role === 'student' || this.state.role === 'teacher' || this.state.role === 'coordinator') &&
                                    this.state.languages.map((item,index) => {
                                    if(item.isNative === false)
                                        return (
                                            <div key={index}>
                                                <div>
                                                    <label htmlFor={'language'+index}>{this.state.languageLabel}</label>
                                                    { this.state.role === 'student' && 
                                                        <span>{this.t('REQUIRED_FIELD')}</span>
                                                    }
                                                </div>
                                                <div>
                                                    <select 
                                                        name='language'
                                                        id={'language'+index}
                                                        disabled={ this.state.role !== 'student'? true : null}
                                                        className="language" 
                                                        value={this.state.languages[index].languageId} 
                                                        onChange={(e) => this.handleChangeList(e,index)} >
                                                        <option value=''>Select</option>
                                                    {this.state.globallanguages.map((item,index) => {
                                                        return <option key={'gLang'+item.id+index} value={item.id}>{item.name}</option>
                                                    })}
                                                    </select>  
                                                    { this.state.role === 'student' &&
                                                        <button id={index} name='removelanguage' className='delete' onClick={this.removeField}>{this.t('DELETE')} <i className="fa fa-times-circle-o fa-lg"></i></button>
                                                    }
                                                </div>
                                            </div>
                                        )
                                }) }
                        
                                <div className="inputs">
                                    <div className="lineInputs">
                                        <div>
                                            <label htmlFor='countryId'>{this.t('COUNTRY')}</label>
                                            <span>{this.t('REQUIRED_FIELD')}</span>
                                        </div>
                                        <select name='countryId' value={this.state.countryId} onChange={this.handleChange}>
                                        <option value=''>Select</option>
                                        {this.state.countries.map(item => {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                        </select>
                                    </div>
                                    
                                    <div className="lineInputs">
                                        <div>
                                            <label htmlFor="timezone">{this.t('TIMEZONE')} </label>
                                            <span className='invalid'>{ this.state.validations['timezone'] && this.t('REQUIRED_FIELD')}</span>
                                        </div>
                                        <TimezonePicker      
                                        name= 'timezone'    
                                        value={this.state.timezone}
                                        onChange={timezoneName => {
                                            this.setState({timezone: timezoneName }, ()=> { return this.validateForm() })
                                        }}
                                        inputProps={{
                                            placeholder: 'Select Timezone...',
                                        }}
                                    />
                                    </div>
                                    <div className='lineInputs'>
                                        <p>Current time<br /> in this timezone: {dataTimeZone}</p>
                                    </div>
                                    
                                </div>
                                <div className="inputs">
                                    <div className="lineInputs">
                                        <InputForClassTool name="classTool" data={{ value: this.state.classTool, required: false}} inputChange={this.inputChange} />
                                    </div>
                                    <div className="lineInputs">
                                        <div>
                                            <label htmlFor="classToolId">{ this.t("TOOL_ID") }</label>
                                            <span className='invalid'>{  this.state.validations['classToolId'] }</span>
                                        </div>
                                        <input type="text" id='classToolId' name="classToolId" value={this.state.classToolId} onChange={this.handleChange} placeholder={this.t("STUDENT_TOOL_ID")}/>
                                    </div>
                                </div>
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
            
                            { this.state.userPhones.map((item, index) => {
                                return (  
                                    <div key={index} className='inputs'>
                                    <div className='lineInputs'>
                                        <div>
                                            <label htmlFor={'phone'+index }>{this.t('TELEPHONE')}</label>
                                            { index === 0 && 
                                                <span className='invalid'>{this.state.validations['phone'] && this.t('REQUIRED_FIELD')}</span>
                                            }
                                        </div>
                                        <input 
                                            id={'phone'+index }
                                            required={index ===0}
                                            placeholder={this.t('PHONE_PLACEHOLDER')} 
                                            name='phone' 
                                            value={item.phone} 
                                            onChange={(e) => this.handleChangeList(e,index)} />
                                    </div>
                                    <div className='lineInputs'>
                                        <div>
                                            <label htmlFor={'userPhoneTypeId'+index }>{this.t('TYPE')}</label>
                                        </div>
                                        <select 
                                            name='userPhoneTypeId'
                                            id={'phoneType'+index }
                                            value={item.userPhoneTypeId} 
                                            onChange={(e) => this.handleChangeList(e,index)} >
                                        <option value="1">{this.t('COMMERCIAL')}</option>
                                        <option value="2">{this.t('RESIDENCIAL')}</option>
                                        <option value="3">{this.t('CELLPHONE')}</option>
                                        <option value="4">{this.t('WHATSAPP')}</option>
                                        </select>
                                    </div>
                                    {index === 0 &&
                                        <div className='lineInputs'>
                                        <button name='addphone' className='addInput' onClick={this.addField}>{this.t('BTN_ADD_TEL')} +</button>
                                        </div>
                                    }
                                    { index > 0 &&
                                        <button id={index} name='removephone' className='delete' onClick={this.removeField}>{this.t('DELETE')} <i className="fa fa-times-circle-o fa-lg"></i></button>
                                    }
                                    </div>

                                )
                                })}
                            </form>                        
                        </div>
                        <div className="buttonSave">
                            <button type="submit" onClick={this.handleSubmit} >Save</button>
                        </div>
                    </div>
                    </div> 
                </div>                            
            </StudentManagementCss>                        
        </section>               
    </div>

        );
    }
}

ViewStudent.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
  }

const mapStateToProps = ({ lingo }) => ({ lingo, });
const mapDispatchToProps = dispatch => ({
    fetchLingoTools: data => dispatch(fetchLingoTools()),
});

export default (connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ViewStudent)))

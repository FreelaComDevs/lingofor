import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { getTeacher, addTeacher, removeTeacher, updateTeacher } from '../../actions/teacherActions'
import { getLingoLevels, getLingoAllCountries, getLingoAllLanguages } from '../../actions/lingoActions'
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
const rolesPermissed = ["customerService", "companyManager", "coordinator"]

const service = new Services()

class ManageAccount extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            id: this.props.id,
            name: '',
            email: '',
            userEmails: [ {email: '', notify: false}],
            gender: '',
            languages:[{languageId: 0, isNative: true}],
            countryId: '',
            timezone: '',
            address: '',            
            userPhones: [{phone: '', userPhoneTypeId: 1}],
            levels: [{label: 'A0', active: false },{ label: 'A1', active: false},{label: 'A2', active: false},{label: 'B1', active: false},{label: 'B2', active: false},{label: 'C1', active: false},{label: 'C2', active: false},{label: 'DM', active: false}],
            firstClass: false,
            demoClass: false,
            isActive: false,
            picture: null,
            oldpicture: null,
            teacherId: "",
            birthDate: '',
            role: '',
            countries: [],
            globallanguages: [],
            validations:{},
            languageLabel: this.props.t('OTHER_LANGUAGE'),
            newpassword: '',
            confirmpassword: '',
            messagepassword: '',
            openmodalpass: false,
            openalert: false,
            loading: this.props.teacher ? true : false,
            alerttitle: '',
            alertdescription: ''
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()
        this.timezone = timezone

        this.callApi = this.callApi.bind(this)
        this.addField = this.addField.bind(this)
        this.removeField = this.removeField.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeList = this.handleChangeList.bind(this)

        this.handleDigPassword = this.handleDigPassword.bind(this)
        this.submitPassword = this.submitPassword.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this.handleUploadFile = this.handleUploadFile.bind(this)
    }

    levelsChange = (e, index) => {
        e.preventDefault()
        const { levels } = this.state
        levels[index].active = !levels[index].active
        this.setState({ levels },() => { this.validateForm() })
    }

    componentWillMount () {   
        let user = this.service.getProfile() 
        if (!rolesPermissed.includes(user.role)) {
            this.props.history.push("/")
        }
        this.props.getLingoAllLanguages()
        this.props.getLingoAllCountries()
    }

    componentDidMount() {
        const { teacher } = this.props
        const teacherLevels = this.props.teacher ? teacher.teachers[0].teacherLevels.map((level) => level.levelId - 1) : []
        const { levels } = this.state
        teacherLevels.forEach(level => {
            levels[level].active = true
        })

        if(this.props.teacher)
            teacher.teachers[0].teacherLanguages.sort((x,y) => (x.isNative === y.isNative)? 0 : x.isNative? -1 : 1)

        this.setState({
            ...teacher,
            languages: this.props.teacher ?  teacher.teachers[0].teacherLanguages : [{languageId: 0, isNative: true}],
            teacherId: this.props.teacher ?  teacher.teachers[0].id : "",
            firstClass: this.props.teacher ?  teacher.teachers[0].firstClass : false, 
            isActive: this.props.teacher ? teacher.teachers[0].isActive : false, 
            demoClass: this.props.teacher ? teacher.teachers[0].demoClass : false, 
            levels,                     
            loading:false
        }, () => this.validateForm() )
    }


    showErrorMsg = () => {
      const {
        state: { validations },
        props: { t }
      } = this
        const errorFound = Object
        .entries(validations)
        .find(([fieldName, hasError]) => hasError === true )

        if(errorFound){
            const [fieldName = ''] = errorFound
            const message = t("FIELD_IS_REQUIRED", {fieldName})
            this.setState({openalert: true, alerttitle: t("ERROR"), alertdescription: message })
            return true
        }

        return false

    }

    addTeacher = async e => {
        const { t } = this.props
        e.preventDefault()

        const hasError = this.showErrorMsg()
        if(hasError) return

        let formData ={
            name: this.state.name.toString(),
            email: this.state.email.toLowerCase(),
            emails: this.state.userEmails,
            gender:this.state.gender,
            birthDate: this.state.birthDate,
            languages: this.state.languages.map((language, index) => {
                return ({
                    languageId: Number(this.state.languages[index].languageId ),
                    isNative: this.state.languages[index].isNative
                })
            }),
            countryId: Number(this.state.countryId),
            timezone: this.state.timezone,
            address: this.state.address,
            userPhones : this.state.userPhones,                
            firstClass : this.state.firstClass,                
            demoClass : this.state.demoClass,                
            levels : this.state.levels.map((level, index) => { if(level.active === true) return index + 1 }).filter(level => { return level !== undefined}),
            isActive: this.state.isActive
        }
        console.log(formData)
        
        this.setState({loading: true})
        await service.ApiPosts(`teachermanagement`, formData)
        .then((res) => {
            this.props.addTeacher()
            this.props.history.push("/teachers")
            this.setState({loading: false})
        })
        .catch((err) => {
            const error = !err.data && err.response ? err.response.data.error : (err.data.error || '')
            const message = error.message ? error.message : t("ERROR")
            this.setState({openalert: true, alerttitle: t("ERROR"), alertdescription: message, loading: false })
            console.error('Error on Create Teacher', err)
        })
    }

    updateTeacher = async (e) => {
        e.preventDefault()
        const { t } = this.props

        const hasError = this.showErrorMsg()
        if(hasError) return
        
        let formData ={
            id: this.state.id,  
            address: this.state.address,
            countryId: Number(this.state.countryId),
            email: this.state.email.toLowerCase(),
            gender:this.state.gender,
            birthDate: this.state.birthDate,
            name: this.state.name.toString(),
            role: 'teacher',
            timezone: this.state.timezone,
            userPhones : this.state.userPhones,                
            userEmails: this.state.userEmails,
            teacher: {
                id: Number(this.state.teacherId),
                languages: this.state.languages.map((language, index) => {
                    return ({
                        languageId: Number(this.state.languages[index].languageId ),
                        isNative: this.state.languages[index].isNative
                    })
                }),
                firstClass : !!this.state.firstClass,
                demoClass : !!this.state.demoClass,                
                isActive : !!this.state.isActive,
                levels : this.state.levels.map((level, index) => { if(level.active === true) return index + 1 }).filter(level => { return level !== undefined}),
            },
            languages: this.state.languages.map((language, index) => {
                return ({
                    languageId: Number(this.state.languages[index].languageId ),
                    isNative: this.state.languages[index].isNative
                })
            }),
            levels : this.state.levels.map((level, index) => { if(level.active === true) return index + 1 }).filter(level => { return level !== undefined}),
            firstClass : this.state.firstClass,                
            demoClass : this.state.demoClass,                
            isActive : this.state.isActive,
        }
        formData.userEmails.map((email)=>{
            delete email.id
            delete email.userId
            delete email.updatedAt
            delete email.createdAt
            delete email.deletedAt
            delete email.userPhoneType
        })

        formData.userPhones.map((phone)=>{
            delete phone.id
            delete phone.userId
            delete phone.updatedAt
            delete phone.createdAt
            delete phone.deletedAt
            delete phone.userPhoneType
        })
        console.log(formData)

        await service.ApiPut(`teachermanagement`, formData)
        .then((res) => {
            this.props.updateTeacher(res.result.items[0])
            this.props.history.push("/teachers")
        })
        .catch((err) => {
            const error = !err.data && err.response ? err.response.data.error : (err.data.error || '')
            const message = error.message ? error.message : t("ERROR")
            this.setState({openalert: true, alerttitle: t("ERROR"), alertdescription: message })
            console.error('Error on Update Teacher', err)
        })
    }

    callApi() {
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

        if (this.props.id) {
            this.service.get(`teachermanagement/getbyuser/${this.props.id}`)
            .then(res => {
                const teacherInfo = res.result.items[0].teachers[0]
                const teacherLevels = teacherInfo.teacherLevels.map((level) => level.levelId - 1)
                const { levels } = this.state
                teacherLevels.forEach(level => {
                    levels[level].active = true
                })

                 //order by language, isNative first
                if(this.teacherInfo)
                    teacherInfo.teacherLanguages.sort((x,y) => (x.isNative === y.isNative)? 0 : x.isNative? -1 : 1)

                this.setState({
                    ...res.result.items[0],
                    languages: teacherInfo.teacherLanguages,
                    teacherId: teacherInfo.id,
                    firstClass: teacherInfo.firstClass, 
                    isActive: teacherInfo.isActive, 
                    demoClass: teacherInfo.demoClass, 
                    levels,                     
                    loading:false
                }, () => this.validateForm() )
                console.log(res)
            })
            .catch(err => console.log('ERRO GET USERS ', err))
        } else { this.setState({ loading:false}, () => this.validateForm() )
    }


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
          newObj[index][e.target.name] = e.target.value.toLowerCase()
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
            newObj[index] = { languageId: e.target.value, isNative: index ===0 ? true : false} 
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

    handleUploadFile (e) {
        
        this.setState({loading:true}) 

        if(e.target.files[0] !== undefined) {
            if((e.target.files[0].size / 1024 / 1024) > 2) {
            alert('too large file!')
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
            'birthday' : !this.state.birthDate || moment(this.state.birthDate) >= moment().add(1, 'hours'),
            'gender': validator.isEmpty(this.state.gender),
            'levels' : this.state.levels.length === 0 || this.state.levels.filter(level => level.active).length === 0,
            'phone' : this.state.userPhones.length === 0 || validator.isEmpty(this.state.userPhones[0].phone)
        }
        if(this.state.role === 'student')
            validations.language = this.state.languages.length === 0 || this.state.languages[0].languageId === 0

        this.setState({
            validations: validations
        })             
    }

    deleteTeacher(e, id){
        e.preventDefault()
        this.props.removeTeacher(id)
        this.props.history.push('/teachers')
    }

    
    handleDigPassword(e,open){
        this.setState({  openmodalpass: open })
    }

    submitPassword(e){
        const { t } = this.props
        e.preventDefault()        
        var patt = new RegExp('(?=.*\d)(?=.*[a-z]).{6,}')

        if(!patt.test(this.state.newpassword)){
            this.setState({loading:false, messagepassword: t('PASS_INVALID_MESSAGE')}) 
        } else if(this.state.newpassword !== this.state.confirmpassword){
            this.setState({loading:false, messagepassword: t('PASS_NOTEQUAL_MESSAGE')}) 
        } else {
            this.setState({loading:true}) 
            let formData= {
                id: this.state.id,
                userPassword: { password: this.state.newpassword  }
            }
            
            this.service.ApiPosts('admin/users/changepassword',formData)
            .then(res => {
                this.setState({openmodalpass:false, openalert: true, loading:false, openalert:true, alerttitle: t('VALID_FORM_TITLE'), alertdescription:t('VALID_FORM_DESCRIPTION') }) 
            })
            .catch(e => {
                this.setState({loading:false}) 
            })
        }      
    }

    render() {
        const { teacher, t } = this.props
        let timezone = this.state.timezone
        // Arrumando o timezone horario de verão são paulo, subtraindo 1 hora.
        if(timezone && timezone === 'America/Sao_Paulo'){        
            timezone = 'America/Bahia'
        }

        let dataNew = moment(new Date()).tz(timezone)
        moment.tz(timezone) 

        let dataTimeZone = moment(dataNew).format('LT')
        
        return (
            <div> 
                {
                    this.state.loading &&
                    <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
                }
                <div className="box">
                { this.state.id && (
                        <div className="changePhoto">
                            <h2>{t('PHOTO')}</h2>
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
                                        <img src={ camera } alt='Camera' width='16' height='14' />Change</span>
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
                    )}
                    <form className="formulario">
                            <div>
                                <label htmlFor='name' required={this.state.validations['name']}>{t('NAME')}</label>
                                <span className='invalid'>{  this.state.validations['name'] && t('REQUIRED_FIELD')}</span>
                            </div>
                            <input
                                type='text'
                                value={this.state.name}
                                placeholder={t('NAME_PLACEHOLDER')}
                                name='name'
                                id='name'
                                onChange={this.handleChange}
                                required />
                            <div>    
                                <div>
                                    <label htmlFor='email'>{t('LOGIN_EMAIL')}</label>
                                    <span>{this.state.validations['email'] && t('REQUIRED_FIELD')}</span>
                                </div>
                                <input
                                    type='text'
                                    placeholder={t('LOGIN_EMAIL')}
                                    name='email'
                                    id='email'                                    
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required 
                                    disabled={(this.props.id)}
                                    readOnly={(this.props.id)}/>
                                    <button name='addemail' className='addInput' onClick={this.addField}>{t('ADD_EMAIL')} +</button>
                            </div>
                            { this.state.userEmails.map((item,index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <label htmlFor={'email'+index }>{t('EXTRA_EMAIL')} </label>
                                        </div>                                    
                                        <div className="notification">  
                                            <input
                                                type='text'
                                                className='newemail'
                                                name='email'
                                                id={'email'+index }
                                                placeholder={t('EXTRA_EMAIL_PLACEHOLDER')}
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
                                                    <label htmlFor={'notify'+index } ><span>{t('NOTIFICATION')}</span></label>
                                                </div>                                                
                                            </div>
                                            <button id={index} name='removeemail' className='delete' style={{margin: '5px 0px 20px 0'}} onClick={this.removeField}>{t('DELETE')} x</button>
                                        </div>                                        
                                    </div>
                                );
                            }) }
                        
                        <div className="inputs">
                            <div className="lineInputs">
                                <div>
                                    <label htmlFor="gender">{t('GENDER')}</label>
                                    <span className='invalid'>{  this.state.validations['gender'] &&t('REQUIRED_FIELD')}</span>
                                </div>
                                <select 
                                    name="gender"
                                    value={this.state.gender}
                                    onChange={this.handleChange}>
                                    <option value=''>Select</option>
                                    <option value='notInformed'>{t('NOT_INFORMED')}</option>
                                    <option value='male'>{t('MALE')}</option>
                                    <option value='female'>{t('FEMALE')}</option>
                                </select>
                            </div>
                            <div className="lineInputs">
                                <div>
                                    <label htmlFor="birthDate">{this.t('BIRTH_DATE')}</label>
                                    <span>{  this.state.validations['birthday'] && t('REQUIRED_FIELD')}</span>
                                </div>                                
                                {                                     
                                    <input type="date" id='date' name="birthDate" value={this.state.birthDate} onChange={this.handleChange}/> 
                                }
                            </div>
                        </div>       

                        { this.state.languages.map((item,index) => (
                            <div key={index}>
                                    <div>
                                        <label htmlFor={'language'+index}>{index === 0 ? t('NATIVE_LANGUAGE') : this.state.languageLabel}</label>
                                        <span>{t('REQUIRED_FIELD')}</span>
                                    </div>
                                    <div>
                                        <select 
                                            name='language'
                                            id={'language'+index}
                                            className="language" 
                                            value={this.state.languages[index].languageId} 
                                            onChange={(e) => this.handleChangeList(e,index)} >
                                            <option value=''>Select</option>

                                        {this.props.lingo.languages.map((item,index) => {
                                            return <option key={item.id} value={item.id}>{item.name}</option>
                                        })}
                                        </select>  
                                        { index === 0 && 
                                            <button name='addlanguage' className='addInput' onClick={this.addField}>{t('ADD_LANGUAGE')} +</button>
                                        }
                                        { index > 0 && 
                                            <button id={index} name='removelanguage' className='delete' onClick={this.removeField}>{t('DELETE')} x</button>
                                        }
                                        </div>
                                </div>
                        ))}
                        
                        <div className="inputs">
                            <div className="lineInputs">
                                <div>
                                    <label htmlFor='countryId'>{t('COUNTRY')}</label>
                                    <span>{t('REQUIRED_FIELD')}</span>
                                </div>
                                <select name='countryId' value={this.state.countryId} onChange={this.handleChange}>
                                <option value=''>Select</option>
                                {this.props.lingo.countries.map(item => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })}
                                </select>
                            </div>
                            
                            <div className="lineInputs">
                                <div>
                                    <label htmlFor="timezone">{t('TIMEZONE')} </label>
                                    <span className='invalid'>{ this.state.validations['timezone'] && t('REQUIRED_FIELD')}</span>
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
                        <div>
                            <label htmlFor="address">{t('ADDRESS')} </label>
                            <span className="invalid">{this.state.validations['address'] && t('REQUIRED_FIELD')}</span>
                        </div>
                        <input 
                            placeholder={t('ADDRESS_PLACEHOLDER')} 
                            name="address" 
                            value={this.state.address} 
                            onChange={this.handleChange}
                            required />
        
                        { this.state.userPhones.map((item, index) => {
                            return (  
                                <div key={index} className='inputs'>
                                <div className='lineInputs'>
                                    <div>
                                        <label htmlFor={'phone'+index }>{t('TELEPHONE')}</label>
                                        { index === 0 && 
                                            <span className='invalid'>{this.state.validations['phone'] && t('REQUIRED_FIELD')}</span>
                                        }
                                    </div>
                                    <input 
                                        id={'phone'+index }
                                        required={index ===0}
                                        placeholder={t('PHONE_PLACEHOLDER')} 
                                        name='phone' 
                                        value={item.phone} 
                                        onChange={(e) => this.handleChangeList(e,index)} />
                                </div>
                                <div className='lineInputs'>
                                    <div>
                                        <label htmlFor={'userPhoneTypeId'+index }>{t('TYPE')}</label>
                                    </div>
                                    <select 
                                        name='userPhoneTypeId'
                                        id={'phoneType'+index }
                                        value={item.userPhoneTypeId} 
                                        onChange={(e) => this.handleChangeList(e,index)} >
                                    <option value="1">{t('COMMERCIAL')}</option>
                                    <option value="2">{t('RESIDENCIAL')}</option>
                                    <option value="3">{t('CELLPHONE')}</option>
                                    <option value="4">{t('WHATSAPP')}</option>
                                    </select>
                                </div>
                                {index === 0 &&
                                    <div className='lineInputs'>
                                    <button name='addphone' className='addInput' onClick={this.addField}>{t('BTN_ADD_TEL')} +</button>
                                    </div>
                                }
                                { index > 0 &&
                                    <button id={index} name='removephone' className='delete' onClick={this.removeField}>{t('BTN_DELETE')} X</button>
                                }
                                </div>

                            )
                            })}

                            <div className="inputs">
                                <div className="lineInputs">
                                    <div>
                                        <label htmlFor="levels">{t('LEVEL')}</label>
                                        <span className='invalid'>{  this.state.validations['levels'] &&t('REQUIRED_FIELD')}</span>
                                    </div>
                                    <ul>
                                        { this.state.levels.map((level, index) => (
                                            <li className="levels-items" key={index}>
                                                <button type="button" className={ level.active ? "active" : "" } onClick={ (e) => this.levelsChange(e, index) } >{ level.label }</button>
                                            </li>
                                        ))}                              
                                    </ul>
                                    
                                </div>
                            </div> 
                            

                            <div className="inputs">
                            <div className="lineInputs">
                                    <div>
                                        <label htmlFor="firstClass">{t('FIRST_CLASS')}</label>
                                        <span className='invalid'>{ t('REQUIRED_FIELD')}</span>
                                        <div className="switch__container">
                                            <input 
                                                id="switch-shadow1" 
                                                className="switch switch--shadow2" 
                                                type="checkbox"
                                                name="firstClass"
                                                checked={this.state.firstClass}
                                                onChange={(e) => this.setState({firstClass: !this.state.firstClass})}
                                                />
                                            <label htmlFor="switch-shadow1">{t('YES')}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="lineInputs">
                                    <div>
                                        <label htmlFor="demoClass">{t('DEMO_CLASS')}</label>
                                        <span className='invalid'>{ t('REQUIRED_FIELD')}</span>
                                        <div className="switch__container">
                                            <input 
                                                id="switch-shadow2" 
                                                className="switch switch--shadow2" 
                                                type="checkbox"
                                                name="demoClass"
                                                checked={this.state.demoClass}
                                                onChange={(e) => this.setState({demoClass: !this.state.demoClass})}
                                                />
                                            <label htmlFor="switch-shadow2">{t('YES')}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="lineInputs">
                                    <div>
                                        <label htmlFor="isActive">{t('ISACTIVE')}</label>
                                        <span className='invalid'>{ t('REQUIRED_FIELD')}</span>
                                        <div className="switch__container">
                                            <input 
                                                id="switch-shadow3" 
                                                className="switch switch--shadow2" 
                                                type="checkbox"
                                                name="isActive"
                                                checked={this.state.isActive}
                                                onChange={(e) => this.setState({isActive: !this.state.isActive})}
                                                />
                                            <label htmlFor="switch-shadow3">{t('YES')}</label>
                                        </div>
                                    </div>
                                </div>
                            </div> 



                            { this.state.id && (
                                <div>
                                    <button type="button"name='delete-teacher' className='delete' style={{margin: '30px 0px 20px 0', width:'auto', padding: '0 10px'}} onClick={(e) => this.deleteTeacher(e, this.props.teachers.teacher.teachers[0].id)}>{t('DELETE_TEACHER')} </button>
                                    {/* <button type="button" className="password" onClick={(e) =>  this.handleDigPassword(e,true)}>Change Password</button> */}
                                </div>
                            )}

                        </form>
                        
                    </div>
                        <div className="buttonSave">
                            <button type="button" onClick={teacher ? this.updateTeacher : this.addTeacher} >Save</button>
                        </div>
                        <Dialog
                            open={this.state.openmodalpass}
                            onClose={(e) =>  this.handleDigPassword(e,false)}
                            aria-labelledby="pass-dialog-title"
                            aria-describedby="pass-dialog-description"
                        >
                        <DialogTitle id="pass-dialog-title">{t('CHANGE_PASSWORD_TITLE')}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="pass-dialog-description">
                                <div className='box'>
                                    <form className="formulario">
                                        <h2>{t('CHANGE_PASSWORD_DESCRIPTION')}</h2><br/>
                                        <div>
                                            <label htmlFor='newpassword'>{t('PASSWORD')}</label>
                                            <span>{t('REQUIRED_FIELD')}</span>
                                        </div>
                                        <input
                                            type='password'
                                            placeholder={t('PASS_PLACEHOLDER')}
                                            name='newpassword'
                                            id='newpassword'
                                            value={this.state.newpassword}
                                            onChange={this.handleChange}
                                            required 
                                            minLength={6}
                                            className="input-lingo inputManage"
                                            style={{borderCcolor: '#B2B2B7 !important'}}
                                            pattern="(?=.*\d)(?=.*[a-z]).{6,}"
                                            />
                                        <div>
                                            <label htmlFor='confirmpassword'>{t('CHECK_PASS')}</label>
                                            <span>{t('REQUIRED_FIELD')}</span>
                                        </div>
                                        <input
                                            type='password'
                                            placeholder={t('CHECK_PASS_PLACEHOLDER')}
                                            name='confirmpassword'
                                            id='confirmpassword'
                                            value={this.state.confirmpassword}
                                            onChange={this.handleChange}
                                            required 
                                            minLength={6}
                                            className="input-lingo"
                                            pattern="(?=.*\d)(?=.*[a-z]).{6,}"/>
                                        <div>
                                            <label><span style={{fontSize: '0.9em', marginLeft: '5px'}}>{this.state.messagepassword}</span></label>
                                        </div>
                                    </form>
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.submitPassword} color="primary" autoFocus>
                                {t('CHANGE_PASSWORD_TITLE')}
                            </Button>
                        </DialogActions>
                        </Dialog>
                <div>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ teachers, lingo }) => ({ teachers, lingo });
const mapDispatchToProps = dispatch => ({
    getTeacher: data => dispatch(getTeacher(data)),
    addTeacher: data => dispatch(addTeacher(data)),
    removeTeacher: data => dispatch(removeTeacher(data)),
    updateTeacher: data => dispatch(updateTeacher(data)),
    getLingoLevels: data => dispatch(getLingoLevels(data)),
    getLingoAllCountries: data => dispatch(getLingoAllCountries(data)),
    getLingoAllLanguages: data => dispatch(getLingoAllLanguages(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ManageAccount)))

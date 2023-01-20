import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import Loading from 'react-fullscreen-loading'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import { User } from './styles'
import avatar from '../../images/profile/img_placeholder.svg'
import camera from '../../images/profile/ico_camera.svg'
import TimezonePicker from 'react-timezone'
// import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
// import moment from 'moment'
import moment from 'moment'
import timezone from 'moment-timezone'
// import Select from '@material-ui/core/Select'

import PATH_SERVER from '../_api/PATH_SERVER'

import Services from '../_api/Services'
import axios from 'axios'

import Moment from 'react-moment';
import validator from 'validator'

import { Textbox } from 'react-inputs-validation'
// import 'react-inputs-validation/lib/react-inputs-validation.min.css'

import Engrenagem from '../../images/icons/icon_users_header.svg'


export default class EditUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      username: 'Add new User',
      validate: false,
      isDelete: false,
      name: '',
      email: '',
      address: '',
      countries: [],
      countryId: 212,
      gender: 'male',
      birthDate: '',
      role: 'select',
      active: true,
      timenow: Date.now(),
      timezone: '',
      // picture: '',
      redirect: false,
      picture: null,
      userPhones: [
        {userPhoneTypeId: 1, phone: ''}
      ],
      userEmails: [{email: '', notify: false}],
      prices: [
        {
          priceCountryId: '',
          baseValue: '',
          discount: '',
          value: '',
          baseSeller: false
        }
      ]
    }

    this.oldImageVar = this.state.picture
    

    // console.log(moment.now())
    // console.log(timezone.tz.guess())
    // console.log(timezone.tz.zone(timezone.tz.guess()))
    // console.log(moment.tz(this.state.timezone).format())

    this.serv = new Services()
    this.userID = this.props.match.params.id
    this.callApi = this.callApi.bind(this)
    this.addField = this.addField.bind(this)
    this.removeField = this.removeField.bind(this)
    this.handlerChange = this.handlerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.callDeleteApi = this.callDeleteApi.bind(this)
    this.handlerChangeList = this.handlerChangeList.bind(this)
    this.handleUploadFile = this.handleUploadFile.bind(this)
  }

  componentWillMount () {
    // if (this.userID !== undefined) {
    this.callApi(true)
    // }
  }

  callApi () {
    this.serv.get('countries/getall')
      .then(res => {
        this.setState({
          countries: res.result.items
        })
      })
      .catch(err => console.log('err countryGetAll ', err))

    if (this.userID !== undefined) {
      this.serv.noAuthGet(`admin/users/${this.userID}`)
        .then(res => {
          console.log('RESULT ', res.result.items[0])
          if (res.result.items[0].role === 'student' || res.result.items[0].role === 'teacher') {
          // REDIRECT TO STUDENDS, TEACHER AND CORDINATOR OR SHOW ERROR?
            alert(`User type: ${res.result.items[0].role}`)
          // TODO best solution for this
          }
          this.setState({
            username: res.result.items[0].name,
            ...res.result.items[0]
          })
        })
        .catch(err => console.log('ERRO GET USERS ', err))
    }
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
      arrEmail.push({userPhoneTypeId: 1, phone: ''})
      this.setState({
        userPhones: arrEmail
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
  }

  handlerChangeList (e,index) {
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

    if (e.target.name === 'phone' || e.target.name === 'userPhoneTypeId') {
      let newObj = this.state.userPhones
      newObj[e.target.id][e.target.name] = e.target.value
      this.setState({
        userPhones: newObj
      })
    }
  }

  validateForm () {
    let validations = []
    validations = {
        'name': validator.isEmpty(this.state.name),
        'email': !validator.isEmail(this.state.email) || validator.isEmpty(this.state.email),
        'address': validator.isEmpty(this.state.address === null ? '' : this.state.address ),
        'countryId': this.state.countryId <= 0 ? true : false,
        'timezone' : validator.isEmpty(this.state.timezone),
        'birthday' : !this.state.birthDate || moment(this.state.birthDate) >= moment().add(-1, 'hours') ? true : false,
        'gender': validator.isEmpty(this.state.gender),
        'phone' : this.state.userPhones.length === 0 || validator.isEmpty(this.state.userPhones[0].phone)
    }
    if(this.state.role === 'student')
      validations.nativelanguage = (this.state.languages.length === 0 || this.state.languages[0].languageId === 0) ? true : false

    this.setState({
        validations: validations
    })             
}

  handlerChange (e) {

    console.log('activeStatus ', e.target.value)

    if(e.target.name === 'active') {
      this.setState({
        active: !this.state.active
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    // if(this.state.validate) {
    // TODO VALIDATONS
    let objUser = {
      name: this.state.name.toString(),
      email: this.state.email,
      address: this.state.address,
      countryId: Number(this.state.countryId),
      timezone: this.state.timezone,
      gender: this.state.gender,
      birthDate: this.state.birthDate,
      role: this.state.role,
      userEmails: this.state.userEmails,
      userPhones: this.state.userPhones
    }
    
    if(this.userID !== undefined) {
      objUser.id = Number(this.userID)
      
      if(objUser.userPhones.length > 0) {
        objUser.userPhones.map(item => {
          item.userPhoneTypeId = Number(item.userPhoneTypeId)
          delete item.userPhoneType
          delete item.id
          delete item.userId
          delete item.updatedAt
          delete item.createdAt
          delete item.deletedAt
        })
      } else {
        delete objUser.userPhones
      }

      if(objUser.userEmails.length > 0) {
        objUser.userEmails.map(item => {
          delete item.id
          delete item.userId
          delete item.updatedAt
          delete item.createdAt
          delete item.deletedAt
        })
      } else {
        delete objUser.userEmails
      }

      if (this.state.active === 'true' || this.state.active) {
        objUser.active = true
      } else {
        objUser.active = false
      }
      
      if(this.state.picture !== this.oldImageVar) {
        
        this.setState({loading: true})
        axios.post(`${PATH_SERVER.DOMAIN}/admin/users/${this.userID}/picture`, this.state.formDataImage)
          .then(() => {
            // console.log('OK FORMDATA IMAGE ', res)
            // this.setState({
            //   loading: true
            // })
          })
          .catch(err => { console.log(err) })
      }


      this.setState({loading: true}) 
      axios.put(PATH_SERVER.DOMAIN + '/admin/users', objUser)
        .then(res => {
          console.log('OK SEND ', res)
          this.setState({
            redirect: true
          })
        })
        .catch(err => {
          console.log('Error sendUser Data ', err.response.data)
          try{
            let errMsg = (err.response.data.error[0] !== undefined) ? err.response.data.error[0].message : err.response.data.error.message
            this.setState({
              dialogTitleMsg: 'Ops!',
              dialogMsg: errMsg,
              loading: false,
              open: true
            })
          }
          catch(err) {
            this.setState({
              dialogTitleMsg: 'Ops!',
              dialogMsg: 'Sorry, something wrong ',
              loading: false,
              open: true
            })
          }
        })
    } else {

      objUser.userPhones.map(item => {
        item.userPhoneTypeId = Number(item.userPhoneTypeId)
      })
      
      this.setState({loading: true}) 
      this.serv.ApiPosts('admin/users', objUser)      
        .then(res => {   
               
          console.log('OK SEND ', res)          
         

          if(this.state.picture !== this.oldImageVar) {
            axios.post(`${PATH_SERVER.DOMAIN}/admin/users/${res.data.result.items[0].id}/picture`, this.state.formDataImage)
              .then(() => {
                console.log('OK FORMDATA IMAGE CREATE')
                // this.setState({
    
                //   // redirect: true
                // })

                this.setState({     
                  redirect: true
                })
              })
              .catch(err => { console.log('FORM DATA CREATOR ', err) })
          } else {
            this.setState({     
              redirect: true
            })
          }
        })
        .catch(err => { 
          console.log('Error sendUser Data ', err)
          let errMsg = (err.data.error.message !== undefined) ? err.data.error.message : err.data.error[0].message
          this.setState({
            dialogTitleMsg: 'Ops!',
            dialogMsg: errMsg,
            open: true,
            loading: false  
          })
        })
      }
  }

  handleDelete(e) {
    e.preventDefault()
    this.setState({
      isDelete: true, 
      open: true,
      dialogMsg: `Really want to delete user ${this.state.username}`,
      dialogTitleMsg: 'Delete',
      redirect: false
    })
  }

  callDeleteApi() {
    console.log('call DELETE API')
    this.setState({loading: true, open: false})
    this.serv.ApiDelete(`admin/users/${this.userID}`)
      .then(res => {
        console.log('-----> -> ->  RES DELETE API')
        this.setState({
          open: false,          
          redirect: true
        })
      })
      .catch(err => { 
        console.log('X X X X X ERROR DELETE API')
        this.setState({
          dialogTitleMsg: 'Ops!',
          dialogMsg: err.message,
          open: false,
          loading: false,
          redirect: false
        })
      })
  }

  handleUploadFile (event) {
    const data = new FormData()
    
    if(event.target.files[0] !== undefined) {
      if((event.target.files[0].size / 1024 / 1024) > 2) {
        alert('arquivo enorme')
      } else {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({picture: e.target.result})
        }

        reader.readAsDataURL(event.target.files[0])
        data.append('file', event.target.files[0])
        // data.append('name', event.target.files[0])
        // data.append('description', 'some value user types')

        this.setState({
          formDataImage: data
        })
      }
    }

    // '/files' is your node.js route that triggers our middleware
    // axios.post('/files', data).then((response) => {
    //     console.log(response); // do something with the response
    // })

  }

  

  render () {
    const { redirect } = this.state;
    const { t } = this

    let timezone = this.state.timezone
    // Arrumando o timezone horario de verão são paulo, subtraindo 1 hora.
    if(timezone && timezone === 'America/Sao_Paulo'){        
        timezone = 'America/Bahia'
    }

    let dataNew = moment(new Date()).tz(timezone)
    moment.tz(timezone) 

    let dataTimeZone = moment(dataNew).format('LT')

    if (redirect) {
      return <Redirect to='/users'/>;
    }

    return (
      <div className='view'>
        {
          this.state.loading &&
          <Loading loading={true} background="rgba(0,0,0,0.6)"
          loaderColor="#3498db"/>
        }

        <SideMenu lang={'english'} />
        <section>
          <Header/>
          <div className="toptitle">      
              <img src={Engrenagem} alt="Engrenagem" />    
              <h1>Users</h1>                   
          </div>
          <User>
            <div className='container'>
              <div className='bigBox'>
                <div className="userName">
                  <h2>{this.state.username}</h2>
                </div>
                <div className='viewUser'>
                  <div className='changePhoto'>
                    <h2>Photo</h2>
                    <form>
                      <div className='photo'>
                        <img
                          src={(this.state.picture !== null) ? this.state.picture : avatar}
                          alt='Avatar'
                          width='112'
                          height='112'
                          className='avatarRound'
                        />
                        <div className='fileUpload btn btn-primary'>
                          <span><img src={ camera } alt='Camera' width='16' height='14' />Change</span>
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

                  <form className='formulario'>
                    <div>
                      <label htmlFor='role'>Profile</label>
                      <span>Required</span>
                    </div>
                    
                    <div className='profile'>
                      <select 
                        value={this.state.role}
                        onChange={this.handlerChange}
                        className='input-lingo role'
                        name='role'
                        id='role-simple'
                        disabled={this.state.role === 'b2b' }
                      >
                        <option value='select'>Select</option>
                        <option value='customerService'>Customer Service</option>
                        <option value='companyManager'>Company Manager</option>
                        { this.state.role === 'b2b' &&
                          <option value='b2b'>Contato B2B</option>
                        }
                      </select>

                      <select 
                        value={this.state.active}
                        onChange={this.handlerChange}
                        className={`input-lingo active ${(!this.state.active) ? ' inactive':''}`}
                        // style={{ backgroundColor: (!this.state.active) ? 'red' : '#00D36A'}}
                        name='active'
                        
                      >
                        <option value className="greenActive">&bull; Active</option>
                        <option value={false} className="redInactive">&bull; Inactive</option>
                      </select>

            

                      
                    </div>
                    <div>
                      <label htmlFor='name'>Name</label>
                      <span>Required</span>
                    </div>
                    {/* <input placeholder='Your name' name='name' value={this.state.name} onChange={this.handlerChange} /> */}
                    <Textbox
                      tabIndex='1' // Optional.[String or Number].Default: -1.
                      id={'name'} // Optional.[String].Default: ''.  Input ID.
                      name='name' // Optional.[String].Default: ''. Input name.
                      type='text' // Optional.[S tring].Default: 'text'. Input type [text, password, number].
                      value={this.state.name} // Optional.[String].Default: ''.
                      disabled={false} // Optional.[Bool].Default: false.
                      // maxLength={maxLength} //Optional.[String].Default: ''.
                      placeholder='Your name' // Optional.[String].Default: ''.
                      validate // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the 'validationCallback' you provide.
                      validationCallback={res =>
                        this.setState({ hasNameError: res, validate: false })} //Optional.[Func].Default: none. Return the validation result. 
                      onChange={(name, e) => {
                        this.setState({ name })
                        console.log(e)
                      }} // Required.[Func].Default: () => {}. Will return the value.
                      onBlur={(e) => { console.log('onBlur ', e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                      // onFocus={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                      // onClick={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                      // onKeyUp={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                      validationOption={{
                        name: 'name', // Optional.[String].Default: ''. To display in the Error message. i.e Please enter your ${name}.
                        required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                        type: 'string', // Optional.[String].Default: 'string'. Validation type, options are ['string', 'number', 'phone'].
                        min: 4, // Optional.[Number].Default: 0. Validation of min length when validationOption['type'] is string, min amount when validationOption['type'] is number.
                        // locale: 'en-US', //Optional.[String].Default: 'en-US'. For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'. If your are looking for more options, you can take a look at 'window.REACT_INPUTS_VALIDATION' section, which provides the extensibility for your own locale.
                        msgOnError: 'This field is required' //Optional.[String].Default: '' Show your custom error message no matter what when it has error if it is provied.
                      }}
                    />

                    <div>
                      <div>
                        <label htmlFor='email'>
                          Login email
                        </label>
                        <span>Required</span>
                      </div>
                      <div className="addEmail">
                        {/* <input placeholder='your email' name='email' className='inputMobile' value={this.state.email} onChange={this.handlerChange} /> */}
                        <Textbox
                          tabIndex='1' // Optional.[String or Number].Default: -1.
                          id={'email'} // Optional.[String].Default: ''.  Input ID.
                          name='email' // Optional.[String].Default: ''. Input name.
                          type='email' // Optional.[S tring].Default: 'text'. Input type [text, password, number].
                          value={this.state.email} // Optional.[String].Default: ''.
                          placeholder='Your email' // Optional.[String].Default: ''.
                          validate // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the 'validationCallback' you provide.
                          onChange={(email, e) => {
                            this.setState({ email })
                            console.log(e)
                          }} // Required.[Func].Default: () => {}. Will return the value.
                          onBlur={(e) => { console.log('onBlur ', e) }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                          // onFocus={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                          // onClick={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                          // onKeyUp={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                          validationOption={{
                            name: 'email', // Optional.[String].Default: ''. To display in the Error message. i.e Please enter your ${name}.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            type: 'string', // Optional.[String].Default: 'string'. Validation type, options are ['string', 'number', 'phone'].
                            min: 6, // Optional.[Number].Default: 0. Validation of min length when validationOption['type'] is string, min amount when validationOption['type'] is number.
                            msgOnError: 'This field is required', // Optional.[String].Default: '' Show your custom error message no matter what when it has error if it is provied.
                            customFunc: email => {
                              const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                              if (reg.test(String(email).toLowerCase())) {
                                return true
                              } else {
                                return 'is not a valid email address'
                              }
                            }
                          }}
                          // customStyleWrapper={{
                            
                          //   width: '45%',
                          //   marginRight: '5px',
                          // }}
                          // customStyleContainer={{
                            
                          // }}
                        />
                        <button name='addemail' className='addInput' onClick={this.addField}>Add Email +</button>
                      </div>
                      
                    </div>
                    { this.state.userEmails.map((item, index) => {
                      return (
                        
                        <div>
                          <div className="label">
                            <label htmlFor='email'>
                              Alternate email
                            </label>
                            <span>Required</span>
                          </div>
                          <div className="notification">  
                            <input id={index} placeholder='your email' name='email' className='inputMobile' value={item.email} onChange={(e) => this.handlerChangeList(e,index)} />
                            <div className="switchBox">
                                <div className="switch__container">
                                    <input 
                                        className="switch switch--shadow"  
                                        name='notify'
                                        id={'notify'+index }                                
                                        type="checkbox" 
                                        onChange={(e) => this.handlerChangeList(e,index)}
                                        checked = {item.notify}                                                        
                                        />
                                    <label htmlFor={'notify'+index } ><span>NOTIFICATION</span></label>
                                </div>                                                
                            </div>
                            <button id={index} name='removeemail' className='delete' onClick={this.removeField}>Delete</button>
                          </div>
                        </div>
                      )
                    })}
                    <div className='inputs genderBox'>
                      <div className='lineInputs'>
                        <div>
                          <label htmlFor='gender'>Gender</label>
                          <span>Required</span>
                        </div>
                        <select
                          value={this.state.gender}
                          onChange={this.handlerChange}
                          className='input-lingo'
                          name='gender'
                        >
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                        </select>
                      </div>
                      <div className='lineInputs'>
                        <div>
                          <label htmlFor='birthDate'>Date of birth</label>
                          <span>Required</span>
                        </div>
                        <input type="date" name="birthDate" value={this.state.birthDate} onChange={this.handlerChange}/>
                      </div>
                    </div>

                    <div className='inputs'>
                      <div className='lineInputs'>
                        <div>
                          <label htmlFor='countryId'>Country</label>
                          <span>Required</span>
                        </div>
                        <select
                          value={this.state.countryId}
                          onChange={this.handlerChange}
                          className='input-lingo'
                          name='countryId'
                          
                        >
                          {this.state.countries.map(item => {
                            return <option value={item.id}>{item.name}</option>
                          })}
                        </select>
                      </div>

                      <div className='lineInputs'>
                        <div>
                          <label htmlFor='countryId'>Timezone</label>
                          <span>Required</span>
                        </div>
                        <TimezonePicker
                          value={this.state.timezone}
                          onChange={timezoneName => {
                            this.setState({timezone: timezoneName })
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
                      <label htmlFor='name'>Address</label>
                      <span>Required</span>
                    </div>
                    <input placeholder='Address' name='address' value={this.state.address} onChange={this.handlerChange} />

                    { this.state.userPhones.map((item, index) => {
                      return (
                        <div key={index} className='inputs'>
                          <div className='lineInputs'>
                            <div>
                              <label htmlFor='phone'>Telephone</label>
                              <span>Required</span>
                            </div>
                            <input id={index} placeholder='Phone number' name='phone' type='number' value={item.phone} onChange={this.handlerChangeList} />
                          </div>
                          <div className='lineInputs'>
                            <div>
                              <label htmlFor='phoneType'>Type</label>
                              <span>Required</span>
                            </div>
                            <select
                              value={item.userPhoneTypeId}
                              onChange={(event) => {
                                let objTarget = {
                                  target: {
                                    id: index,
                                    name: event.target.name,
                                    value: event.target.value
                                  }
                                }
                                this.handlerChangeList(objTarget)

                                // this.handlerChangeList()
                              }}
                              className='input-lingo'
                              id='index.toString()'
                              name='userPhoneTypeId'
                             
                            >
                              <option id={index} value={1}>Commercial</option>
                              <option id={index} value={2}>Residential</option>
                              <option id={index} value={3}>Mobile</option>
                              <option id={index} value={4}>Whatsapp</option>
                            </select>
                          </div>
                          {index === 0 &&
                            <div className='lineInputs'>
                              <button name='addphone' className='addInput' onClick={this.addField}>Add Phone +</button>
                            </div>
                          }
                          { index > 0 &&
                            <div className="removephone">
                              <button id={index} name='removephone' className='delete' onClick={this.removeField}>Delete</button>
                            </div>
                          }
                        </div>

                      )
                    })}
                    {this.userID && <button className='deleteLast' onClick={this.handleDelete}>Delete User</button>}
                  </form>
                </div>
              </div>
              <div className='button'>
                
                
                <button className='back' onClick={() => {window.location.replace('/users')}}><i class="fa fa-angle-left" aria-hidden="true"></i>Back</button>
                <button className='save' onClick={this.handleSubmit}>Save</button>
              </div>
            </div>
          </User>
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
            <DialogContent>
              <DialogContentText id='alert-dialog-slide-description' className="boxModal">
                {this.state.dialogMsg}
              </DialogContentText>
            </DialogContent><br/>
            <DialogActions className="boxModal">
              {this.state.isDelete &&
                <Button onClick={this.callDeleteApi} color='primary'>
                  Yes, delete
                </Button>
              }
              
              <Button onClick={() => this.setState({open: false})} color='primary'>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </section>
      </div>
    )
  }
}

EditUser.propTypes = {
  match: PropTypes.object
}

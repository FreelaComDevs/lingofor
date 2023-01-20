import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate, Trans } from 'react-i18next'
import Button from '@material-ui/core/Button'
import logo from '../../images/logo_lingo.svg'
import ButtonMB from '../_common/button/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import AuthService from '../_api/AuthService'
import validator from 'validator'
import queryString from 'query-string'
import Axios from 'axios'
import PATH_SERVER from '../_api/PATH_SERVER'

import Services from '../_api/Services'

import './Login.css'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class ForgetPass extends Component {
  constructor (props) {
    super(props)
    this.bgImgArr = [
      // 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      require('../../images/login/img_bg1.jpg'),
      require('../../images/login/banner_home-forme_2.jpg'),
      require('../../images/login/banner_home-forme_3.jpg'),
      // 'https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ]
    this.state = {
      password: '',
      confirmPassword: '',
      lang: 'pt',
      open: false,
      errors: [],
      goToLogin: false,
      bgImage: this.bgImgArr[Math.round(Math.random() * 2)]
    }

    this.auth = new AuthService()
    this.handleChange = this.handleChange.bind(this)
    // this.changeLanguage = this.changeLanguage.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.i18n = this.props.i18n
    this.t = this.props.t
    // this.changeLanguage(this.state.lang)

    this.serv = new Services()
  }

  componentWillMount() {
    let forgetToken = queryString.parse(this.props.location.search).token

    if(forgetToken !== undefined) {
      localStorage.removeItem('@lingo')
      this.serv.get(`token/verify?token=${forgetToken}`)
        .then(res => {
          this.setState({
            ...res
          })
          this.serv.get(`/token/create/${res.data.items[0].id}`)
            .then(res => console.log('new token ', res))
        })
        .catch(err => { console.log(err)})
    }
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
    // if (e.target.name === 'lang') this.changeLanguage(e.target.value)
  }

  handleForm (e) {
    e.preventDefault()

    var patt = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&[\]{},.;<>:/~^´`\-_()"])[A-Za-z\d@$!%*#?&[\]{},.;<>:/~^´`\-_()"]{6,20}$/g   
    if(!patt.test(this.state.password)) {
      this.setState({
        open: true,
        dialogMsg: this.t('PASS_INVALID_MESSAGE'),
        dialogTitle: this.t('INVALID_FORM_TITLE')
      })
      return false
    }else{

      this.setState({
        errors: [
          (!validator.isEmpty(this.state.password)) ? !(this.state.password === this.state.confirmPassword) : validator.isEmpty(this.state.password), // password validator
          (!validator.isEmpty(this.state.confirmPassword)) ? !(this.state.password === this.state.confirmPassword) : validator.isEmpty(this.state.confirmPassword)
        ]
      }, () => {
        if (!this.state.errors[0] && !this.state.errors[1]) {
          let objSend = {
            id: this.state.id,
            userPassword: {
              password: this.state.password
            }
          }
          let objHeader = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${queryString.parse(this.props.location.search).token}`
          }
          this.serv.changePassWord('admin/users/changepassword', JSON.stringify(objSend), objHeader)
          // this.serv.ApiPosts('', JSON.stringify())
            .then(res => {
              this.setState({
                open: true,
                dialogMsg: this.t('PASSWORD_CHANGE'),
                dialogTitle: this.t('SUCCESS_MESSAGE'),
                goToLogin: true
              })
            })
            .catch(e => {
              console.log('teste error', e.message)
              //let errMsg = (e.response.data.error !== undefined) ? err.response.data.error : err.response.data.error
              let errMsg = (e.data.error.message !== undefined) ? e.data.error.message : e.data.error.message
              this.setState({
                open: true,
                dialogMsg: errMsg,
                dialogTitle: this.t('ERROR_MESSAGE')
              })
            })
        } else {
          this.setState({
            open: true,
            dialogMsg: this.t('PASSWORD_NOT_MATCH'),
            dialogTitle: this.t('ERROR_MESSAGE')
          })
        }

      })
    }
  }

  render () {
    if (this.state.success || this.state.authenticated) {
      return (<Redirect to='/' />)
    }

    const { t } = this
    const bgStyle = {
      backgroundImage: `url(${this.state.bgImage})`
    }
    return (
      <div className='containerBox'>
        <div className='content-left' style={bgStyle}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <img src={logo} className='logo-top' alt='logo' />
          </div>
        </div>

        <div className='content-right'>
          <div className='forget-pass'>
            <div className='forget-header-holder' >
              <div className='forget-header'>
                <span>{this.t('CHANGE_PASSWORD_TITLE')}</span>
              </div>
              <div className='red-line' />
            </div>
            <div className='form-holder'>
              <form>
                <label htmlFor='password'>{t('PASSWORD')}<span style={{fontSize: '0.9em'}}>{}</span></label>
                <input className='input-lingo' name='password' type='password' placeholder={t('PASSWORD')} value={this.state.password} onChange={this.handleChange} />
                <label htmlFor='confirmPassword'>{t('PASSWORD_CONFIRM')}<span style={{fontSize: '0.9em'}}>{}</span></label>
                <input className='input-lingo' name='confirmPassword' type='password' placeholder={t('PASSWORD_CONFIRM')} value={this.state.confirmPassword} onChange={this.handleChange} />
              </form>
              <div className='holder-buttons'>
                <ButtonMB
                  title={t('BTN_SEND')}
                  clickAction={this.handleForm}
                />
              </div>
              
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.setState({open: false})}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          className="boxModal"
        >
          <DialogTitle id='alert-dialog-slide-title' className="boxModal">
            {this.state.dialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description' className="boxModal">
              {this.state.dialogMsg}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="boxModal">
            {this.state.goToLogin &&
            <Button onClick={() => window.location.replace('/login')} color='primary'>
              {t('BTN_CLOSE')}
            </Button>
            }

            {!this.state.goToLogin &&
            <Button onClick={() => this.setState({open: false})} color='primary'>
              {t('BTN_CLOSE')}
            </Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ForgetPass.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}

export default translate('translations')(ForgetPass)

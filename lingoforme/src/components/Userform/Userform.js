import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import ReactPixel from 'react-facebook-pixel';
import { PIXEL_FB, GTM_ID, TAG_INIFITE_PLAN, TAG_ESSENTIAL_PLAN, TAG_EVERYDAY_PLAN, TAG_EFECTIVE_PLAN } from '../_api/environment'
import ButtonMB from '../_common/button/Button'
import validator from 'validator'
import Loading from 'react-fullscreen-loading'
import AuthService from '../_api/AuthService'
import PATH_SERVER from '../_api/PATH_SERVER'
import Services from '../_api/Services'
import IconsLingo from '../_common/iconsLingo/iconsLingo'
import Header from '../_common/header/Header'
import SideMenuSub from '../_common/SideMenu/SideMenuSub'
import {Link} from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import axios from 'axios'
import queryString from 'query-string'
import SignUpForm from './SignUpForm'
import ChoosePlanForm from './ChoosePlanForm'
import Review from './Review'
import ChangePlans from './ChangePlans'
import Confirmation from './Confirmation'
import moment from 'moment'
import { Form, Buttons } from './Styles'
import GTMContainer from './../_common/googleTagManager'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.auth = new AuthService()
    this.i18n = this.props.i18n
    this.t = this.props.t
    this.service = new Services()
    this.countries = []
    
    this.languages = []
    this.handleCoupon = this.handleCoupon.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNextStep = this.handleNextStep.bind(this)
    this.backAction = this.backAction.bind(this)
    this.togglePlans = this.togglePlans.bind(this)
    this.toggleSignForm = this.toggleSignForm.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
    this.changePlanLanguage = this.changePlanLanguage.bind(this)
    this.swapPlans = this.swapPlans.bind(this)
    this.updateValues = this.updateValues.bind(this)
    this.updatePlanValues = this.updatePlanValues.bind(this)
    this.loadingStatus = false
    this.paypalSession = ''
    this.targetStep = 0
    this.defaultStudentData = {}
    try {
      this.paypalSession = localStorage.getItem('@paypal')
      if(this.paypalSession !== null) {
        // this.targetStep = 1
        // this.loadingStatus = true
        // this.defaultStudentData = JSON.parse(localStorage.getItem('@studentData'))
      }
    } catch(err) {
      console.log(err , ' NO PAYPAL SESSION')
    }

    // validate form in child -- SignUpForm
    this.validateForm = this.validateForm.bind(this)
    this.state = {
      objTag:{dataLayer: "pageView", codeConversion:""},
      step: this.targetStep,
      formValues: {
        name: '',
        email: '',
        userPhones: [],
        userPhoneTypeId: '3',
        countryId: 0,
        password: '',
        passwordConfirm: '',
        timezone: ''
      },

      planAvailableLang: [],
      loading: this.loadingStatus,
      loadingPlanForm: true,
      details: true,
      review: false,
      confirm: false,
      // countryId: '',
      lang: 'en',
      plans: [],
      countries: [],
      planLanguages: [{
        lingoLanguageId: 0,
        focus: 'business',
        struct: 'conversational',
        studentLanguageLevel: 'basic'
      }],
      studentData: this.defaultStudentData,
      paypalURL: this.paypalSession,
      selectedPlan: {},
      selectedPlanId: 0,
      showBack: false,
      showPlans: false,
      showSignUp: false,
      failed: false,
      open: false,
      dialogTitle: '',
      dialogMsg: '',
      couponKey: "",
      selLingoLanguageId : 0,
      userExist:false
    }

    this.service.get('lingolanguages/getall')
      .then(res => {this.setState({allLanguages: res.result.items.filter(item => item.active)})})
      .catch(err => console.log('err getLanguages ', err))
  }

  componentWillReceiveProps(e) {
    console.log(e, ' and LANG ', this.i18n.language)
  }

  componentDidMount () {
    ReactPixel.init(PIXEL_FB);
    ReactPixel.pageView();

    let paypalStatus = queryString.parse(this.props.location.search).status
    let paypalToken = queryString.parse(this.props.location.search).token

    if(paypalStatus !== undefined) {
      this.setState({loading: true})
      
      axios.get(`${PATH_SERVER.DOMAIN}/subscriptions/${paypalStatus}Subscription?token=${paypalToken}`)
        .then(res => {
          this.setState({
            step: 2,
            loading: false,
            paypalStatus: paypalStatus
          })
        })
        .catch(err => {
          if(err.response.status === 404) {
            this.setState({
              step: 2,
              loading: false,
              paypalStatus: 'oldToken'
            })
          } else {
            this.setState({
              step: 2,
              loading: false,
              paypalStatus: 'error'
            })
          }
        })
      return
    }
    
    if(queryString.parse(this.props.location.search).planId === undefined || queryString.parse(this.props.location.search).countryId === undefined) {
      window.location.replace('/login')
    }
    let selPlanId = Number(queryString.parse(this.props.location.search).planId)
    this.getGoogleTagManagerByPlanId(selPlanId)
    let countryId_INITIAL = Number(queryString.parse(this.props.location.search).countryId)

    let formV = this.state.formValues
    formV.countryId = countryId_INITIAL
    this.changeLanguage(countryId_INITIAL === 26 ? 'pt' : 'en');
    this.setState({
      formValues: formV,
      loading: false,
      selectedPlanId: selPlanId
    }, () => {
      
      this.service.get('countries/getall')
        .then(res => {
          this.setState({
            countries: res.result.items
          })
          this.changePlansByCountry(selPlanId)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
  

  changePlansByCountry () {
    let countryId = queryString.parse(this.props.location.search).countryId
    let planId = queryString.parse(this.props.location.search).planId
    let languageIdFromUrl = Number(queryString.parse(this.props.location.search).languageId)
    let isTrial = queryString.parse(this.props.location.search).trial || false
        // this.service.get(`planprices/getByCountry/${countryId}`)
    this.service.get(`planprices/getByLingoLanguage/${languageIdFromUrl}/${isTrial}`)
      .then(res => {       
        let selPlan = null
        if(JSON.parse(isTrial)){
          selPlan = res.result.items[0]
        }else{
          selPlan = res.result.items.find(item => { return item.planId === Number(planId)})
        }

        if(!selPlan && res.result.items.length > 0){
          selPlan = res.result.items[0]
        }

        this.setState({
          selLingoLanguageId : languageIdFromUrl,
          plans: res.result.items,
        }, () => this.swapPlans(selPlan))
      })
      .catch(err => console.log('ERROR GET PLANS ', err))
  }

  changeLanguage (lng) {
    this.i18n.changeLanguage(lng)
    this.setState({lang: lng})
  }

  changePlanLanguage(lingoLanguageId){

    this.service.get(`planprices/getByLingoLanguage/${lingoLanguageId}/false`)
    .then(res => {       
      const selPlan = res.result.items[0]
      const availableLang = this.state.allLanguages.find(l => l.id === Number(lingoLanguageId)) 
      const newPlanLanguages = [{
        lingoLanguageId: selPlan.lingoLanguageId,
        focus: 'business',
        struct: 'conversational',
        studentLanguageLevel: 'basic'
      }]

      this.setState({
        selLingoLanguageId : lingoLanguageId,
        plans: res.result.items,
      }, () => this.setState({
          selectedPlan: selPlan,
          planLanguages: newPlanLanguages,
          availableLang: availableLang
        }))

    })
    .catch(err => console.log('ERROR GET PLANS LANGUAGE', err))
  }

  handleCoupon (coupon) {
    this.setState({ couponKey: coupon.key, selectedPlan: { ...this.state.selectedPlan, discount: (this.state.selectedPlan.baseValue - (this.state.selectedPlan.baseValue * coupon.percentage / 100)).toFixed(2)  }})
  
  }

  parseDataToSend = () => {
    const { 
      couponKey,
      selectedPlan,
      planLanguages,
      formValues : {
        strategy,
        token,
        socialId,
        name,
        email,
        userPhones,
        userPhoneTypeId,
        countryId,
        password
      }
    } = this.state

    const planToSend = planLanguages.map(({flag, description, ...item}) => item)

    let sendData = {
      student: {
        name: name,
        email: email.toLowerCase(),        
        countryId: Number(countryId),
        timezone: moment.tz.guess(),
        userPhones: [ { phone: userPhones, userPhoneTypeId :Number(userPhoneTypeId) } ]
      },
      coupon: couponKey,
      planId: selectedPlan.planId,
      priceId: selectedPlan.priceId,
      planLanguages: planToSend

    }

    const registerWithSocialMedia = strategy !== undefined
    if(registerWithSocialMedia) {
      sendData.student.socialProvider = {
        providerName: strategy,
        providerToken: token,
        providerUserId: socialId
      }
    }
    else {
      sendData.student.userPassword = { password: password }
    }

    !this.state.couponKey && delete sendData.coupon

    return sendData
  }

  async handleSubmit () {

    const { selectedPlan }= this.state

    const data = this.parseDataToSend()

    try {
      const res = await this.service.noAuthPost('subscriptions', data)
      if(selectedPlan.trial){
        this.state.paypalStatus = 'con'
        this.setState({
          studentData: res.data.result.items[0].user,
          paypalStatus: 'confirm_trial',
          paypalURL: '',
          details: false,
          review: false,
          step: 2,
          showBack: false,
          loading: false
        })
      }else{
        this.setState({
          studentData: res.data.result.items[0].user,
          paypalURL: res.data.result.items[0].paymentUrl,
          details: false,
          review: true,
          step: 1,
          showBack: true,
          loading: false
        })
      }
    }
    catch (e){
      console.error("Failed to send Userform", e,e.error.message,e.error)
      console.log(e.error.message)
      this.setState({
        open: true,
        dialogMsg: (e.error.message !== undefined) ? e.error.message : e.error[0].message,
        dialogTitle: 'Ops!',
        loading: false,
        // userExist: e.error.message.indexOf('already exists!') > -1 ? true : false
      })
    }
  }

  validateForm () {
    const {
      name,
      email,
      userPhones,
      userPhoneTypeId,
      countryId,
      password,
      passwordConfirm,
      acceptedTerms,
      isMajor,
      strategy:mediaSocialLogin = false
    } = this.state.formValues
    const { t } = this

    if(validator.isEmpty(name)) {
      this.setState({
        open: true,
        dialogMsg: t('NAME_REQUIRED'),
        dialogTitle: t('ERROR')
      })
      return false
    }

    if(validator.isEmpty(email)) {
      this.setState({
        open: true,
        dialogMsg: t('EMAIL_REQUIRED'),
        dialogTitle: t('ERROR')
      })
      return false
    }

    if(validator.isEmpty(userPhones)) {
      console.log('TEL INVALD');
      this.setState({
        open: true,
        dialogMsg: t('TEL_REQUIRED'),
        dialogTitle: t('ERROR')
      })
      return false
    }

    if(userPhoneTypeId == 15 || userPhoneTypeId === 0) {
      this.setState({
        open: true,
        dialogMsg: t('TEL_REQUIRED'),
        dialogTitle: t('ERROR')
      })
      return false
    }

    if(!validator.isEmpty(email) && !validator.isEmail(email)) {
      this.setState({
        open: true,
        dialogMsg: t('EMAIL_INVALID'),
        dialogTitle: t('ERROR')
      })
      return false
    }

    if(countryId === 0) {
      this.setState({
        open: true,
        dialogMsg: t('COUNTRY_REQUIRED'),
        dialogTitle: t('ERROR')
      })
      return false
    }


    
    if(!mediaSocialLogin && validator.isEmpty(password)) {
      this.setState({
        open: true,
        dialogMsg: t('PASS_INVALID'),
        dialogTitle: t('ERROR')
      })
      return false
    }
    
    if(!mediaSocialLogin && validator.isEmpty(passwordConfirm)) {
      this.setState({
        open: true,
        dialogMsg: t('CONFIRM_PASS_INVALID'),
        dialogTitle: t('ERROR')
      })
      return false
    }
    
    if(!mediaSocialLogin && passwordConfirm !== password) {
      this.setState({
        open: true,
        dialogMsg: t('PASS_NOT_MATCH'),
        dialogTitle: t('ERROR')
      })
      return false
    }

    var patt = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&[\]{},.;<>:/~^´`\-_()"])[A-Za-z\d@$!%*#?&[\]{},.;<>:/~^´`\-_()"]{6,20}$/g   
    if(!mediaSocialLogin && !patt.test(password)) {
      this.setState({
        open: true,
        dialogMsg: t('PASS_INVALID_MESSAGE'),
        dialogTitle: t('INVALID_FORM_TITLE')
      })
      return false
    }
    
    const haslingoLanguageId = this.state.planLanguages.filter(plan => plan.lingoLanguageId === 0)
    if(haslingoLanguageId.length > 0){
      this.setState({
        open: true,
        dialogMsg: t('SELECT_LANGUAGES'),
        dialogTitle: t('ERROR')
      })
      return false
    }

    // const hasstudentLanguageLevel = this.state.planLanguages.filter(plan => !plan.studentLanguageLevel)
    // if(hasstudentLanguageLevel.length > 0){
    //   this.setState({
    //     open: true,
    //     dialogMsg: t('SELECT_LANGUAGE_LEVEL'),
    //     dialogTitle: t('ERROR')
    //   })
    //   return false
    // }
    
    if(!acceptedTerms) {
      this.setState({
        open: true,
        dialogMsg: t('CHECK_ACCEPT_TERMS'),
        dialogTitle: t('ERROR')
      })
      return false
    }

    // if(!isMajor) {
    //   this.setState({
    //     open: true,
    //     dialogMsg: t('CHECK_ACCEPT_MAJOR'),
    //     dialogTitle: t('ERROR')
    //   })
    //   return false
    // }
    
    return true
  }

  handleNextStep () {
    switch (this.state.step) {
    case 0:
      if(this.validateForm()) {
        this.setState({
          loading: true,
          showBack: true,
        }, () => {
          this.handleSubmit()
        })
      }
      // this.setState({
      //   step: 1,
      //   showBack: true
      // })
      break

    case 1:
      // paypal
      // https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0WY39027LN5179420

      this.setState({
        step: 2,
        showBack: true
      })
      break

    case 2:
      // do payment
      break
    }
  }
  // BACK ACTIONS
  backAction () {
    if (this.state.step === 0 && this.state.showPlans) {
      this.togglePlans()
    }

    if (this.state.step === 0 && this.state.showSignUp) {
      this.toggleSignForm()
    }

    if (this.state.step === 1) {
      this.setState({
        step: 0,
        showBack: false
      })
      // backaction to login
    }

    if (this.state.step === 2) {
      this.setState({
        step: 1
      })
      // backaction to login
    }
  }

  updateValues(e) {
    e.preventDefault()
    const { formValues } = this.state
    this.setState({
      formValues: { ...formValues, [e.target.name]: e.target.value }
    })
    if(e.target.name === 'countryId') {
      this.changePlansByCountry()
    }
  }

  registerSocialMedia = user => {
    const { formValues } = this.state
    this.setState({ formValues: { ...formValues, ...user }})
  }

  openDialogSocialMediaLoginError = () => {
    const { t } = this.props

    this.setState({
      open: true,
      dialogMsg: t('SOCIAL_MEDIA.LOGIN_ERROR'),
      dialogTitle: t('ERROR')
    })
  }

  updatePlanValues(e) {
    let newObj = this.state.planLanguages
    // if(e.target.name === 'studentLanguageLevel') {
    //   console.log('VALUE SELECT ', e.target.value)
    //   newObj[e.target.name] = e.target.value
    // } else {
    newObj[e.target.id][e.target.name] = e.target.value
    //   newObj[e.target.name] = e.target.value
    // }
    this.setState({
      planLanguages: newObj
    })
  }

  // PLANS ACTIONS
  togglePlans () {
    this.setState({
      showPlans: !this.state.showPlans,
      showBack: !this.state.showPlans
    })
  }

  planNotFoundDialog = () => {
    const { t } = this.props
    this.onCloseDialog = () => this.props.history.push('/')
      this.setState({
        open: true,
        dialogMsg: t('PLAN_NOT_FOUND'),
        dialogTitle: t('ERROR')
    })
  }

  onCloseDialog = () => {
    this.setState({open: false})
  }

  swapPlans (selPlan) {
    let newPlanLanguages = []
    let availableLang = []
    
    if(selPlan && selPlan.multiLingo) {
      this.state.allLanguages.map(item => {
        newPlanLanguages.push({
          lingoLanguageId: item.id,
          focus: 'business',
          struct: 'conversational',
          studentLanguageLevel: 'basic',
          flag: item.flag,
          description: item.description
        })
      })
    } else {
      let lingoLanguageId = selPlan && selPlan.lingoLanguageId ? selPlan.lingoLanguageId : 1
      availableLang.push( this.state.allLanguages.find(l => l.id === Number(lingoLanguageId)) )
      // })
      newPlanLanguages.push({
        lingoLanguageId: lingoLanguageId,
        focus: 'business',
        struct: 'conversational',
        studentLanguageLevel: 'basic'
      })
    
    }

    this.setState({
      showPlans: false,
      showBack: false,
      loadingPlanForm: false,
      selectedPlan: selPlan,
      planLanguages: newPlanLanguages,
      availableLang: availableLang
    })
  }
  // SIGNIN ACTIONS
  toggleSignForm () {
    this.setState({
      showSignUp: !this.state.showSignUp,
      showBack: !this.state.showBack
    })
  }

  getGoogleTagManagerByPlanId = (selectedPlanId) =>{
   selectedPlanId = Number(queryString.parse(this.props.location.search).planId)

      let objTag = {dataLayer: "pageView", codeConversion:""};

      if(selectedPlanId){
        const planId = selectedPlanId
      if(planId === 1) {
            objTag.codeConversion = TAG_ESSENTIAL_PLAN
            objTag.dataLayer = "Essential" 
      }else if(planId ===  2) {
            objTag.codeConversion = TAG_EFECTIVE_PLAN
            objTag.dataLayer = "Effective"   
        }else if( planId ===  3){
            objTag.codeConversion = TAG_INIFITE_PLAN
            objTag.dataLayer = "Infinite" 
        }else if(planId ===  5 ){
        objTag.codeConversion = TAG_EVERYDAY_PLAN
        objTag.dataLayer = "Everyday"
      };
    }

    // this.setState({objTag})
    return objTag;

  }

  render () {
    const { t } = this
    let {selectedPlanId, objTag, userExist} = this.state;    
    objTag = this.getGoogleTagManagerByPlanId();
    const event = { platform: 'react-stack', conversion: objTag.dataLayerName }
    return (
      <div className='view'>
        
        <GTMContainer reload={objTag} gtmId={GTM_ID+objTag.codeConversion} scriptId='react-google-tag-manager-gtm' dataLayerName={objTag.dataLayer} additionalEvents={event} previewVariables='' />

        {this.state.loading &&
          <Loading
            loading={true}
            background="rgba(0,0,0,0.1)"
            loaderColor="#3498db"
          />
        }
        <SideMenuSub lang={this.state.lang} languageTrigger={this.changeLanguage} hideItens/>
            <section>              
              <div className="toptitle">      
                  <h1>{t('LOGIN_SUBS')}</h1>                   
              </div> 
            <div className='container'>
              <Dialog
                open={this.state.open}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                className="alert-dialog-slide"
              >
              <DialogTitle id="alert-dialog-slide-title">
                {this.state.dialogTitle}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  {this.state.dialogMsg}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {<Button onClick={this.onCloseDialog} color="primary" className="new-button">
                  {t('BTN_CANCEL')}
                </Button> }
                { userExist &&  
                    <Button onClick={() => this.props.history.push('/login?target=newplan')} color="primary" className="new-button">
                      {t('BTN_LOGIN')}
                    </Button>
                }
              </DialogActions>
            </Dialog>
            <Form >
              <div className='icons'>
                <span className={this.state.step === 0 ? 'icons-inner-active' : 'icons-inner'}>
                  <IconsLingo name='order-details' fill={this.state.step === 0 ? 'var(--color-blue)' : '#C5C3C9'} width={'49'} height={'auto'} style={{paddingLeft: '29px'}}/>
                  {this.t('ORDER_DETAILS')}
                </span>
                <hr />
                { this.state.selectedPlan && !this.state.selectedPlan.trial &&
                  <span className={this.state.step === 1 ? 'icons-inner-active' : 'icons-inner'}>
                    <IconsLingo name='review-pay' fill={this.state.step === 1 ? 'var(--color-blue)' : '#C5C3C9'} width={'30'} height={'auto'} />
                    {this.t('ORDER_REVIEW')}
                  </span>
                }
                <hr />
                <span className={this.state.step === 2 ? 'icons-inner-active' : 'icons-inner'}>
                  <IconsLingo name='confirm' fill={this.state.step === 2 ? 'var(--color-blue)' : '#C5C3C9'} width={'35'} height={'auto'} />
                  {this.t('ORDER_COMPLETE')}
                </span>
              </div>
              {this.state.step === 0 &&
                  
                    <div>
                      {!this.state.showPlans &&
                        <div className='boxBig'>
                          <div className='box'>
                            <SignUpForm
                              showSignUp={this.state.showSignUp}
                              toggleSignForm={this.toggleSignForm}
                              formValues={this.state.formValues}
                              countries={this.state.countries}
                              updateForm={this.updateValues}
                              registerSocialMedia={this.registerSocialMedia}
                              openDialogSocialMediaLoginError={this.openDialogSocialMediaLoginError}
                            />
                          </div>
                          <div className='box'>
                            {this.state.plans.length > 0 && !this.state.loadingPlanForm &&
                              <ChoosePlanForm
                                togglePlans={this.togglePlans}
                                availableLang={this.state.allLanguages}
                                selectedPlan={this.state.selectedPlan}
                                selectedLanguage={this.state.selLingoLanguageId}
                                planLanguages={this.state.planLanguages}
                                // availableLang={this.state.availableLang}
                                updateForm={this.updatePlanValues}
                                handleCoupon={this.handleCoupon}
                                
                              />
                            
                            }

                          </div>
                        </div>
                      }

                      { this.state.showPlans &&
                        <div className='boxBig' >
                          {/* Change Plan */}
                          <ChangePlans
                            changePlanLanguage = {this.changePlanLanguage}
                            availableLang={this.state.allLanguages}
                            selectedLanguage={this.state.selLingoLanguageId}
                            togglePlans={this.togglePlans}
                            plans={this.state.plans}
                            swapPlans={this.swapPlans}
                            serv={this.service}
                            {...this.props}
                          />
                        </div>
                      }
                    </div>
                  
                
              }

              {/* Review */}
              {this.state.step === 1 &&
                <div >
                  <div className='boxBig'>
                    <Review
                      selectedCountry={this.state.countries}
                      languages={this.state.allLanguages}
                      selectedPlan={this.state.selectedPlan}
                      planLanguages={this.state.planLanguages}
                      studentData={this.state.studentData}
                    />
                  </div>
                </div>
              }

              {/* Confirmation */}
              {this.state.step === 2 &&
                <div>
                  <div className='boxBig'>
                    <Confirmation
                      paypalStatus={this.state.paypalStatus}
                    />
                  </div>
                  <Buttons>
                    <div className="footer-btns">
                    <Link to="/login">
                      <button className="button">
                        Processed to Log in
                        </button>
                    </Link>
                    </div>
                  </Buttons>
                </div>
              }
            </Form>

            <Buttons>
              
                <div className='footer-btns'>
                  {this.state.showBack && 
                    <div className="buttonBack">
                      <button onClick={this.backAction} > <i className="fa fa-angle-left" aria-hidden="true"></i> {this.t('BTN_BACK')}</button>
                    </div>
                  }
                  {this.state.step === 1 && 
                    <ButtonMB
                      capitalize={false}
                      className="button-mb-payPal"
                      clickAction={() => {
                        window.location.replace(this.state.paypalURL)
                      }}
                    />
                  }

                  {(this.state.step === 0 && this.state.selectedPlan && this.state.selectedPlan.trial) &&
                    <ButtonMB
                      disabled={this.state.showSignUp}
                      className={(this.state.showSignUp) ? 'button-mb-disable': ''}
                      capitalize={true}
                      title={this.t('BTN_CREATE_ACCOUNT')}
                      clickAction={this.handleNextStep}
                    />
                  }

                  {(this.state.step === 0 && !this.state.showPlans && !this.state.selectedPlan.trial) &&
                    <ButtonMB
                      disabled={this.state.showSignUp}
                      className={(this.state.showSignUp) ? 'button-mb-disable': ''}
                      capitalize={true}
                      title={this.t('BTN_PROCEED_PAYMENT')}
                      clickAction={this.handleNextStep}
                    />
                  }

                

                </div>
              
            </Buttons>
          </div>
        </section>
      </div>
     
    )
  }
}

SignUp.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}

export default translate('translations')(SignUp)

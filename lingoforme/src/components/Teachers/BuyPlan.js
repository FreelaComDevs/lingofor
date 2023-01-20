import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import ButtonMB from '../_common/button/Button'

import Loading from 'react-fullscreen-loading'
import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import IconsLingo from '../_common/iconsLingo/iconsLingo'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import axios from 'axios'
import queryString from 'query-string'
import ChoosePlanForm from '../Userform/ChoosePlanForm'
import Review from '../Userform/Review'
import ChangePlans from '../Userform/ChangePlans'
import Confirmation from '../Userform/Confirmation'
import moment from 'moment'
// import timezone from 'moment-timezone'
import { Form, Buttons } from './Styles'

class BuyPlan extends Component {
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
    this.changeLanguage = this.changeLanguage.bind(this)
    this.swapPlans = this.swapPlans.bind(this)
    this.updateValues = this.updateValues.bind(this)
    this.updatePlanValues = this.updatePlanValues.bind(this)
    this.loadingStatus = false
    this.paypalSession = ''
    this.targetStep = 0
    this.defaultStudentData = {}
    if(this.props.PaypalStatus){
      if(this.props.PaypalStatus === 'confirm')
        this.targetStep = 3
    }

    // validate form in child -- SignUpForm
    // this.validateForm = this.validateForm.bind(this)
    this.state = {
      step: this.targetStep,
      formValues: {
        name: '',
        email: '',
        countryId: '',
        password: '',
        timezone: ''
      },
      planAvailableLang: [],
      loading: this.loadingStatus,
      details: true,
      review: false,
      confirm: false,
      countryId: 212,
      lang: 'pt',
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
      showBack: true,
      showSignUp: false,
      failed: false,
      paypalStatus: this.props.PaypalStatus
    }
  }

  componentWillMount () {
    let user = this.service.getProfile()
    let selPlanId = 1
    this.setState({
      countryId: 212,
      loading: false,
      selectedPlanId: 1
    }, () => {
      this.service.get('countries/getall')
        .then(res => {
          this.setState({
            countries: res.result.items
          })
        })
        .catch(err => {
          console.log(err)
        })      
      
      this.service.get(`planprices/${selPlanId}`)
        .then(res => {
          let planLangs = [{
            lingoLanguageId: res.result.items.length > 0 ? res.result.items[0].lingoLanguageId :  13,
            studentLanguageLevel: 'basic',
            focus: 'business',
            struct: 'grammatical'
          }]
          this.setState({
            planAvailableLang: res.result.items,
            planLanguages : planLangs
          })
        })

      // GET ALL AVAILABLE PLANS BY COUNTRY
      this.service.get(`planprices/getByCountry/${this.state.countryId}`)
        .then(res => {
          this.setState({
            plans: res.result.items,
            selectedPlan: res.result.items.find(item => item.planId === selPlanId)
          })
        })
        .catch(err => {
          console.log('ERROR GET PLANS ', err)
        })
    })
  }

  changeLanguage (lng) {
    this.i18n.changeLanguage(lng)
    this.setState({lang: lng})
  }

  handleCoupon (e) {
    e.preventDefault()
    if (e.target.length > 7) {
      this.service.noAuthGet('coupon')
        .then(coupon => {
          if (!coupon) {
            return
          }
          let discount = coupon.discount || this.state.planPrice
          return this.setState({ planPrice: this.state.planPrice - discount })
        })
        .catch(e => console.log(e))
    }
  }

  async handleSubmit () {
    let user = this.service.getProfile()
    let sendData = {
      studentId: 4,
      planId: this.state.selectedPlan.planId,
      priceId: this.state.selectedPlan.priceId,
      planLanguages: this.state.planLanguages 
    }
    sendData.planLanguages[0].studentLanguageLevel = Boolean(sendData.planLanguages[0].speakThisLanguage) ? 'advanced' : 'basic'
    console.log('==> TEACHERS DATA PLAN:: ', sendData);
    this.service.noAuthPost('accountManagement/newPurchasePlan', sendData)
      .then(res => {
        console.log('return newPurchasePlan ', res)

        this.setState({
          paypalURL: res.data.result.items[0].paymentUrl,
          details: false,
          review: true,
          step: 4,
          showBack: true,
          loading: false
        },() => window.location.replace(this.state.paypalURL) )
      })
      .catch(e => {
        console.log(e)
        this.setState({
          open: true,
          dialogMsg: (e.error.message !== undefined) ? e.error.message : e.error[0].message,
          dialogTitle: 'Ops!',
          loading: false
        })

      })
  }

  handleNextStep () {
    switch (this.state.step) {
      case 0:
        this.setState({
          loading: false,
          showBack: true
        })
        break
      case 1:
        this.setState({
          loading: false,
          showBack: true,
          step: 2
        })
        break

      case 2:
        // paypal
        // https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0WY39027LN5179420

        this.setState({
          loading: true,
          showBack: false
        }, () => {
          this.handleSubmit()
        })
        break

      case 3:
        // do payment
        break
      }
  }
  // BACK ACTIONS
  backAction () {
    if (this.state.step === 0) {
      this.props.returnToTab()
    }

    if (this.state.step === 1) {
      this.setState({
        step: 0
      })
    }

    if (this.state.step === 2) {
      this.setState({
        step: 1
      })
    }

    if (this.state.step === 3) {
      window.location.reload()
    }
  }

  updateValues(e) {
    let newObj = this.state.formValues
    newObj[e.target.name] = e.target.value
    this.setState({
      formValues: newObj
    })
  }

  updatePlanValues(e) {
    let newObj = this.state.planLanguages
    if(e.target.name === 'speakThisLanguage') {
      console.log('VALUE SELECT ', e.target.value)
      newObj[e.target.name] = e.target.value
    } else {
      newObj[e.target.name] = e.target.value
    }
    this.setState({
      planLanguages: newObj
    })
  }

  // PLANS ACTIONS
  togglePlans () {
    this.setState({
      showBack: true,
      step: 0
    })
  }

  swapPlans (targetPlan) {
    this.setState({
      step: 1,
      selectedPlan: this.state.plans[targetPlan]
    })
  }

  render () {
    const { t } = this
    const client = {
      sandbox:    '0WY39027LN5179420',
      production: 'YOUR-PRODUCTION-APP-ID',
  } 
    return (
      <div>
        {this.state.loading &&
          <Loading
            loading={true}
            background="rgba(0,0,0,0.6)"
            loaderColor="#3498db"
          />
        }
        {/* <div className='container'>           */}
          <Form>
            {this.state.step > 0 &&
            <div className='icons'>
              <span className={this.state.step === 1 ? 'icons-inner-active' : 'icons-inner'}>
                <IconsLingo name='order-details' fill={this.state.step === 1 ? 'var(--color-blue)' : '#97979E'} width={'50'} height={'auto'} />
                {this.t('ORDER_DETAILS')}
              </span>
              <hr />
              <span className={this.state.step === 2? 'icons-inner-active' : 'icons-inner'}>
                <IconsLingo name='review-pay' fill={this.state.step === 2 ? 'var(--color-blue)' : '#97979E'} width={'30'} height={'auto'} />
                {this.t('ORDER_REVIEW')}
              </span>
              <hr />
              <span className={this.state.step === 3 ? 'icons-inner-active' : 'icons-inner'}>
                <IconsLingo name='confirm' fill={this.state.step === 3 ? 'var(--color-blue)' : '#97979E'} width={'35'} height={'auto'} />
                {this.t('ORDER_COMPLETE')}
              </span>
            </div>
          }

              {/* <section> */}
                {/* <div className="container"> */}
                  { this.state.step === 0 &&
                    <div className='boxBig'>
                      <div className='box'>
                      {/* Change Plan */}
                      <ChangePlans
                        togglePlans={this.togglePlans}
                        plans={this.state.plans}
                        swapPlans={this.swapPlans}
                        serv={this.service}
                      />
                      </div>
                    </div>
                  }

                  {this.state.step === 1 &&
                    <div className='boxBig'>
                      <div className='box'>
                        <ChoosePlanForm
                          availableLang={this.state.planAvailableLang}
                          planLanguages={this.state.planLanguages}
                          togglePlans={this.togglePlans}
                          selectedPlan={this.state.selectedPlan}
                          updateForm={this.updatePlanValues}
                        />
                      </div>
                    </div>
                  }

                  {this.state.step === 2 && 
                   <div className='boxBig'>
                      <div className="change" style={{textAlign:"center"}}>
                        <h3>Atenção: você já possui um plano Lingo contratado</h3>
                      </div>
                      <br/>
                      <div className='review'>                          
                          <Review
                            selectedCountry={this.state.countries}
                            selectedPlan={this.state.selectedPlan}
                            planLanguages={this.state.planLanguages}
                            studentData={this.state.studentData}
                          />
                      </div>
                    </div>
                  }

                  { this.state.step === 3 && 
                    <div className='boxBig'>
                      <Confirmation />
                    </div>
                  }
                  
                {/* </div> */}
              {/* </section> */}
            
          </Form>

          <Buttons>
            <div className='footer-btns'>
              {this.state.step <= 2 &&
                <div className='save'>
                  <button onClick={this.backAction} > <i className="fa fa-angle-left" aria-hidden="true"></i> Back</button>
                </div>
              }
              {this.state.step === 1 &&
                <ButtonMB
                  title={this.t('BTN_PROCEED_PAYMENT')}
                  clickAction={this.handleNextStep}
                />
              }
              {this.state.step === 2 && 
                <ButtonMB
                  title={this.t('BTN_PROCEED_PAYMENT')}
                  clickAction={this.handleNextStep}
                  // clickAction={() => { 
                  //   console.log('testes ', this.state.paypalURL)
                  //   window.location.replace(this.state.paypalURL) 
                  // }}
                />
              }
            </div>
          </Buttons>
        </div>
      // </div>
    )
  }
}

BuyPlan.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}

export default translate('translations')(BuyPlan)

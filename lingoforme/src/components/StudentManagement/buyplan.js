import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import queryString from 'query-string'

import { translate } from 'react-i18next'
import ButtonMB from '../_common/button/Button'

import Loading from 'react-fullscreen-loading'
import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import IconsLingo from '../_common/iconsLingo/iconsLingo'

// import Dialog from '@material-ui/core/Dialog'
// import DialogActions from '@material-ui/core/DialogActions'
// import DialogContent from '@material-ui/core/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
// import DialogTitle from '@material-ui/core/DialogTitle'
// import Button from '@material-ui/core/Button'

import ChoosePlanForm from '../Userform/ChoosePlanForm'
import Review from '../Userform/Review'
import ChangePlans from '../Userform/ChangePlans'
import Confirmation from '../Userform/Confirmation'
// import moment from 'moment'
// import timezone from 'moment-timezone'
import { Form, Buttons } from './styles'

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
    this.swapPlans = this.swapPlans.bind(this)
    this.updateValues = this.updateValues.bind(this)
    this.updatePlanValues = this.updatePlanValues.bind(this)
    this.paypalSession = ''
    this.targetStep = 0
    this.defaultStudentData = {}

    if(this.props.PaypalStatus){
      if(this.props.PaypalStatus !== '')
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
      studentId: 0,
      planAvailableLang: [],
      details: true,
      review: false,
      confirm: false,
      countryId: 0,
      lang: 'pt',
      plans: [],
      countries: [],
      planLanguages: [],
      studentData: {},
      selectedPlan: {},
      selectedPlanId: 1,
      showBack: true,
      showSignUp: false,
      failed: false,
      loading:true,
      state: this.props.targetDestiny,
      paypalStatus: this.props.PaypalStatus,
      targetPlanId: this.props.targetPlanId
    }
  }

  componentWillMount () {
    let user = this.service.getProfile()
    this.service.noAuthGet(`studentManagement/getbyuser/${user.id}`)
      .then(res => {
        if(!res.success || !res.result.items || res.result.items.length === 0)
        {
            return
        }
        let countryId = res.result.items[0].countryId
        this.setState({
          studentData: res.result.items[0],
          countryId: countryId,
          studentId: res.result.items[0].students[0].id
        }, () => {
     
          
          this.service.get('lingolanguages/getall')
          .then(res => {
            let langs= []
            res.result.items.map(item => {
              if(item.active) langs.push(item)
            })
            this.setState({
              allLanguages: langs
            })
          })
          .catch(err => console.log('err getLanguages ', err))

          // GET ALL AVAILABLE PLANS BY COUNTRY
          this.service.get(`planprices/getByCountry/${countryId}`)
            .then(res => {
              this.setState({
                loading:false,
                plans: res.result.items,
                planAvailableLang: res.result.items,
                planLanguages : res.result.items,
                selectedPlan: res.result.items[0]
              })
            })
            .catch(err => {
              console.log('ERROR GET PLANS ', err)
            })
        })
      })
      .catch(err => console.log('ERRO GET USERS ', err))    
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
    this.setState({ loading: true})
    let planToSend = this.state.planLanguages
    planToSend.map(item => {
      delete item.flag
      delete item.description
    })

    let sendData = {
      studentId: this.state.studentId, 
      planId: this.state.selectedPlan.planId,
      priceId: this.state.selectedPlan.priceId,
      planLanguages: planToSend,
      isStudentPlanUpgrade: this.props.targetDestiny === 'upgrade' ? true : false,
      isStudentPlanDowngrade: this.props.targetDestiny === 'downgrade' ? true : false
    }
    console.log('==> STUDANT DATA PLAN:: ', sendData);
    if(this.props.targetDestiny !== 'newplan')
      sendData.currentStudentPlanId = this.props.targetPlanId
    
    this.service.noAuthPost('accountManagement/newPurchasePlan', sendData)
      .then(res => {

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
    e.preventDefault()
    let newObj = this.state.formValues
    newObj[e.target.name] = e.target.value
    this.setState({
      formValues: newObj
    })
  }

  updatePlanValues(e) {
    let newObj = this.state.planLanguages
    newObj[e.target.id][e.target.name] = e.target.value
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
    let selPlan = this.state.plans[targetPlan]
    let newPlanLanguages = []
    let availableLang = []

    if(selPlan.multiLingo) {
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
      selPlan.lingoLanguageId.split(',').map(lang => {
        availableLang.push( this.state.allLanguages.find(l => l.id === Number(lang)) )
      })
      if(availableLang.length > 0){
        newPlanLanguages.push({
          lingoLanguageId: availableLang[0].id,
          focus: 'business',
          struct: 'conversational',
          studentLanguageLevel: 'basic',
          flag: availableLang[0].flag,
          description: availableLang[0].description
        })
      }      
    }


    this.setState({
      step: 1,
      showPlans: false,
      showBack: false,
      loadingPlanForm: false,
      selectedPlan: selPlan,
      planLanguages: newPlanLanguages,
      availableLang: availableLang
    })
  }

  render () {
    const { t } = this
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
                TESTE {this.t('ORDER_DETAILS')}
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
                    <div className='boxBig' >
                      <div className="box">
                        <ChangePlans
                          changePlanLanguage = {this.changePlanLanguage}
                          planLanguages={this.state.planLanguages}
                          availableLang={this.state.availableLang}
                          selectedPlan={this.state.selectedPlan}
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
                      <div className="box">
                        <ChoosePlanForm
                          togglePlans={this.togglePlans}
                          selectedPlan={this.state.selectedPlan}
                          planLanguages={this.state.planLanguages}
                          availableLang={this.state.availableLang}
                          updateForm={this.updatePlanValues}
                        />
                      </div>
                    </div>
                  }

                  {this.state.step === 2 && 
                    <div className='boxBig'>
                      <div className="box">
                        <div className="change" style={{textAlign:"center"}}>
                          <h3>Atenção: você já possui um plano Lingo contratado</h3>
                        </div>
                        <br/>
                        <div className='review'>     
                          <Review
                            selectedCountry={this.state.countries}
                            languages={this.state.allLanguages}
                            selectedPlan={this.state.selectedPlan}
                            planLanguages={this.state.planLanguages}
                            studentData={this.state.studentData}
                          />
                          </div>
                        </div>
                    </div>
                  }

                  { this.state.step === 3 && 
                    <div className='boxBig'>
                     <div className="box">
                        <Confirmation
                          paypalStatus={this.state.paypalStatus}
                        />
                      </div>
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

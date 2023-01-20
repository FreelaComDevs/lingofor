import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { translate, Trans } from 'react-i18next'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FlagIcon } from 'react-flag-kit'

import IcoChange from '../../images/sign-up/ico_change.svg'
import IconPricing from '../../images/sign-up/icon_pricing_world_blue.svg'
import { Form } from './Styles'
import Services from '../_api/Services'
import InputText from '../../elements/Inputs/InputText';

import "./styles.scss"

class ChoosePlanForm extends Component {
  constructor (props) {
    super(props)

    this.t = this.props.t
    this.handleChange = this.handleChange.bind(this)
    this.serv = new Services()
    this.state = {
      language: '0',
      displayName: '',
      displayDescription: '',
      couponInput: "",
      couponValid: "",
      couponValidDate: "",
    }

    this.setLanguage = this.setLanguage.bind(this)
  }

  componentWillMount() {
    this.setLanguage()
  }

  setLanguage() {
    let disName=''
    let disDescri=''

    switch(this.props.i18n.language) {
    case 'es':
      disName = this.props.selectedPlan.nameSpanish
      disDescri = this.props.selectedPlan.descriptionSpanish
      break   
    case 'en':
      disName = this.props.selectedPlan.nameEnglish
      disDescri = this.props.selectedPlan.descriptionEnglish
      break
    case 'pt':
      disName = this.props.selectedPlan.namePortuguese
      disDescri = this.props.selectedPlan.descriptionPortuguese
      break
    }

    this.setState({
      displayName: disName,
      displayDescription: disDescri
    })
  }

  componentWillReceiveProps() {
    this.setLanguage()
  }

  inputChange = (e, name) => {
    e.preventDefault()
    this.setState({ [name]: e.target.value })
  }


  validateCoupon = (e, code, plan) => {
    e.preventDefault()
    this.serv.get(`coupons/validatecoupon?couponKey=${code}&planId=${plan}`)
        .then(res => { 
          this.setState({ 
            couponValid: "true", 
            couponValidDate: res.result.items[0].dueDate 
          }); 
          this.props.handleCoupon(res.result.items[0])  
          
        })
        .catch (err => { console.log ('Error', err); this.setState({ couponValid: "false" }) })
  }

  handleChange (e) {
    e.preventDefault()
    this.props.updateForm(e)
    // let planPrice = this.state.planPrice
    // let country = this.state.country

    // if (e.target.name === 'country_id') {
    //   let id = +e.target.value
    //   country = this.countries.filter(country => country.id === id)[0]
    //   planPrice = +(this.state.selectedPlan.prices.filter(p => p.country_id === id)[0].value.replace('$', ''))
    // }

    // this.setState({[e.target.name]: e.target.value})
  }

  render () {
    const {t} = this
    return (
      <Form>
        <div className='change'>
          <h2>{t("CARD_PLAN")}</h2>
          { this.props.selectedPlan && !this.props.selectedPlan.trial && 
            <div style={{cursor: 'pointer'}} onClick={this.props.togglePlans}>
              <i>{t("CHANGE_PLAN")} <img src={IcoChange} alt='11' width='8' /></i>
            </div>
          }
          
        </div>
        <div className='infos'>
          <div className='reviewPlan'>
            <div className='textPlanTop'>
              <img src={IconPricing} alt='icon-price' width='40' height='40' />
              <div >
                <h4>{this.state.displayName}</h4>
                <p>{this.state.displayDescription}</p>
              </div>
            </div>
            { this.props.planLanguages.map((item, index) => {
              return(
                <Fragment key={item.lingoLanguageId}>
                  {/* <div className='textPlan' id={index}>
                    <div className='infoPlan'>
                      <h5>{t('DO_YOU_SPEAK')}</h5>
                      <div className='language'>
                      <select
                        name='studentLanguageLevel'
                        id={index}
                        required
                        value={item.studentLanguageLevel}
                        onChange={this.props.updateForm}
                      >
                        <option value={''}>{t('SELECT')}</option>
                        <option value={'basic'}>{t('LINGO_BASIC')}</option>
                        <option value={'intermediate'}>{t('LINGO_INTER')}</option>
                        <option value={'advanced'}>{t('LINGO_ADV')}</option>
                      </select>
                    </div>
                      </div>
                  </div> */}
                  <hr />
                </Fragment>
              )
            })}
          </div>
          <div className='textPay'>
            { !this.props.selectedPlan.trial &&
              <form onSubmit={(e) => this.validateCoupon(e, this.state.couponInput, this.props.selectedPlan.planId)} className={`validateCouponForm  ${ this.state.couponValid === "true" ? "valid" : "" } ${ this.state.couponValid === "false" ? "invalid" : "" } `}>
                <span>{`${this.state.couponValid === "true"?t("COUPON_VALID"):""}${this.state.couponValid==="false"?t("COUPON_INVALID"):""}`}</span>
                <InputText
                  name="couponInput" 
                  label={`${t("COUPON")}`} 
                  placeholder={t("ENTER_COUPON_PLACEHOLDER")} 
                  value={this.state.couponInput} 
                  onChange={(e) => this.inputChange(e, "couponInput")} 
                />
                <button 
                  type="submit" 
                //onSubmit={(e) => this.validateCoupon(e, this.state.couponInput, this.props.selectedPlan.planId)}
                >
                  {t("VALIDATE")}
                </button>
              </form>
            }
            <div>
              <div className='total'>
                <h5>TOTAL</h5>
              </div>
              { this.props.selectedPlan.trial &&
                <div className='price'>
                  <h5>{t("FREE")}</h5>
                </div>
              }
              { !this.props.selectedPlan.trial &&
                  <Fragment>
                   <div className='fullPrice'>
                     <h6>{t('MONEY_FORMAT')} {this.props.selectedPlan.baseValue}</h6>
                   </div>
                   <div className='price'>
                     { this.state.couponValid === "true" && <span>{ `Coupon valid until ${this.state.couponValidDate}`}</span> }
                     { /* necessário para forçar a troca de valor quando a página esta sendo traduzida pelo browser */ }
                     { this.state.couponValid && <h5>{t('MONEY_FORMAT')} {this.props.selectedPlan.discount}</h5> } 
                     { !this.state.couponValid && <h5>{t('MONEY_FORMAT')} {this.props.selectedPlan.discount}</h5> }
                        <p>{t("MONTHLY")}</p>
                    </div>
                  <div className='dollar'>
                    <span>*{t('MONEY_FORMAT')} Dollars</span>
                  </div>
                 </Fragment>
              }
             
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

ChoosePlanForm.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object,
  togglePlans: PropTypes.func.isRequired,
  selectedPlan: PropTypes.object.isRequired,
  planLanguages: PropTypes.array.isRequired,
  availableLang: PropTypes.array
}

export default translate('translations')(ChoosePlanForm)

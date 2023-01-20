import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import IconPricing from '../../images/sign-up/icon_pricing_world_blue.svg'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FlagIcon } from 'react-flag-kit'
import { translate, Trans } from 'react-i18next'

class ChangePlans extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lang: 1,
      open: false,
      success: false,
      rerender: false,
      loading: false,
      dialogTitle: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.i18n = this.props.i18n
    this.t = this.props.t

    if(this.props.selectedLanguage){
      this.state.lang = this.props.selectedLanguage
    }
  }

  clickHandler (selPlan) {
    this.props.swapPlans(selPlan)
    // if(this.props.location){
    //   const dataSearch = queryString.parse(this.props.location.search)
    //   //setando dataSearch.planId = selPlan.planId, não é comparador
    //   const query =  (dataSearch.planId = selPlan.planId) ? queryString.stringify(dataSearch) : ""
    //   window.location.replace("sign-up?"+query);
    // }
  }

  handleChange (lingolanguageId) {
    this.setState({lang: lingolanguageId})
    this.props.changePlanLanguage(lingolanguageId)    
  }

  render () {
    const { t } = this
    return (
      <div className='boxChangePlans'>
        <div className='textPrices'>
          <h2>{t('SELECT_LANGUAGE_PLAN_TITLE')}</h2><br/>
          <div className='languageBoxes'>
          {this.props.availableLang && this.props.availableLang.map((lingolanguage, index) => {
              return (
                <button  
                  key={'avl'+index} 
                  className='languageBox' 
                  style={{backgroundColor: this.state.lang == lingolanguage.id ? 'white' :'transparent'}} 
                  onClick={() => this.handleChange(lingolanguage.id)} 
                  value={this.state.id}>
                    <FlagIcon size={25} code={lingolanguage.flag} /> 
                    &nbsp;{  lingolanguage.description }
                </button>
              )} 
            )}
          </div>
        </div>

        <div className='textPrices'>
          <h2>{t('CHOOSE_YOUR_PLAN')}:</h2>
          <h3>{t('PRICE_IN')}</h3>
        </div>

        {this.props.plans.map((item, index) => {
          return (
            <div className='boxChange' key={index}>
              <div className='changePlan'>
                <img src={IconPricing} width='36' height='36' alt='' />
                <h2>{item.nameEnglish}</h2>
              </div>
              <div className='changePlan'>
                <p>{item.descriptionEnglish}</p>
              </div>
              { item.value > 0 &&
                <div className='changePlan'>
                  <div className='off'>{item.value}% off</div>
                  <h3>Limited time offer!</h3>
                </div>
              }             
              <div className='changePlan'>
                { item.baseValue > item.discount && 
                  <h4>{t('MONEY_FORMAT')} {item.baseValue}</h4>
                }                
                <h5>{t('MONEY_FORMAT')} {item.discount}</h5>
                <h6>per month</h6>
              </div>
              <div className='changePlan'>
                <button onClick={() => this.clickHandler(item)}>Buy</button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default translate('translations')(ChangePlans)

import React, {Component} from 'react'

import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {FlagIcon} from 'react-flag-kit'

import IconPricing from '../../images/sign-up/icon_pricing_world_blue.svg'

import Services from '../_api/Services'
import {Form} from './Styles'


class Review extends Component {
  constructor (props) {
    super (props)
    this.t = this.props.t
    this.i18n = this.props.i18n
    this.state = {
      displayDescription: '',
    }
    this.setLanguage = this.setLanguage.bind(this)
    this.service = new Services()
   
    this.countryId = this.props.studentData.countryId
    // this.countryName = this.props.selectedCountry.filter(item => item.id === this.countryId)[0].name 

  }

  setUserCountry(){
    let user = this.service.getUserFromToken() 

    console.log('user', user)

    this.service.get('countries/getall')
      .then(res => {
        console.log('res', res)
        // this.countryName = res.result.items.filter(item => item.id === user.countryId)[0].name
        this.countryName = this.props.selectedCountry.filter(item => item.id === this.countryId)[0].name
        this.setState({
          countries: res.result.items,
          countryName: this.countryName
        })
      })
    .catch(err => {
      console.log(err)
    })   
  }
  
  componentDidMount () {
    console.log('----- REVIEW -------')
    // this.countryId = this.props.studentData.countryId
    console.log(this.props.planLanguages)
    // console.log('student ', localStorage.getItem('@studentData'))

    let user = this.service.getUserFromToken()
    if(user){
      this.setUserCountry()      
    } else{      
      this.countryName = this.props.selectedCountry.filter(item => item.id === this.countryId)[0].name
      this.setState({
        countries: this.props.selectedCountry,
        countryName: this.countryName
      }) 
    }
    
    //
  
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

  render () {
    const { t } = this
    return (
      <Form>
        <div className="boxBig">
          <div className="box">
            <h2>{t('REVIEW_INFORMATION')}</h2>
            <div className="infos">
              <h3>{t("NAME")}</h3>
              <h4>{this.props.studentData.name}</h4>
              
            </div>
            <div className="infos">
              <h3>{t("LOGIN_EMAIL")} </h3>
              <h4>{this.props.studentData.email}</h4>
            </div>
            <div className="infos">
              <h3>{t("COUNTRY")}</h3>
              <h4>{this.countryName}</h4>
            </div>
            <div className="infos">
              <h3>{t("TELEPHONE")}</h3>
              <h4>{this.props.studentData.userPhones && this.props.studentData.userPhones[0].phone}</h4>
              {/* {console.log('studentData', this.props.studentData.userPhones[0].phone)} */}
            </div>
          </div>

          <div className="box">
            <h2>{t("REVIEW_PLAN")}</h2>
            <div className="infos">
              <div className="reviewPlan">

                <div className="textPlanTop">
                  <img src={IconPricing} alt="" width="40" height="40" />
                  <div>
                    <h4>{this.props.selectedPlan.nameEnglish}</h4>
                    {/* <p>{this.props.selectedPlan.totalClasses / 2} hours per month ({this.props.selectedPlan.totalClasses} classes - 30 min each)</p> */}
                    {/* <p>{this.props.selectedPlan.descriptionEnglish}</p> */}
                    <p>{this.state.displayDescription}</p>
                  </div>
                </div>
                {this.props.planLanguages.map(item => {
                  return (
                    <div className="textPlan" key={item.lingoLanguageId}>
                      <div className="infoPlan">
                        <h5>LINGO</h5>
                        <div className="language">
                          <MenuItem value={this.props.selectedPlan.lingoLanguageId}>
                            <FlagIcon code={this.props.languages.find(l => l.id == item.lingoLanguageId).flag} />{this.props.languages.find(l => l.id == item.lingoLanguageId).description}
                          </MenuItem>
                        </div>
                      </div>                      
                    </div>
                  )
                })}
                {/* <div className="textBottom">
                  <p>My current level is Basic </p>
                  <select
                    name="country"
                    id="country"
                    required
                    defaultValue="English"
                  >
                    <option value="Basic">Basic</option>
                  </select>
                </div> */}
              </div>
              <div className="textPay">
                <div>
                  <div className="total">
                    <h5>TOTAL</h5>
                  </div>
                  <div className="price">
                    <h5>{t('MONEY_FORMAT')} {this.props.selectedPlan.discount}</h5>
                    <span>{t("MONTHLY")}</span>
                  </div>
                  <div className="dollar">
                    <span>*{t('MONEY_FORMAT')} Dollars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}


Review.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}


export default translate('translations')(Review)

import React, {Component} from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {FlagIcon} from 'react-flag-kit'
import IconPricing from '../../images/sign-up/icon_pricing_world_blue.svg'
import {Form} from './Styles'

class ReviewSingIn extends Component {
  constructor (props) {
    super (props)

    this.t = this.props.t;
    this.handleChange = this.handleChange.bind (this);

    this.state = {
      countries: [],
      language: 'ENGLISH',
    }
  }

  handleChange (e) {
    e.preventDefault ();
    let planPrice = this.state.planPrice;
    let country = this.state.country;

    if (e.target.name === 'country_id') {
      let id = +e.target.value;

      country = this.countries.filter (country => country.id === id)[0];
      planPrice = +this.state.selectedPlan.prices
        .filter (p => p.country_id === id)[0]
        .value.replace ('$', '');
    }

    this.setState ({[e.target.name]: e.target.value, planPrice, country});
  }

  render () {
    const {t} = this;

    return (
      <Form>
        <div className="boxBig">
          <div className="box">
            <h2>Review your plan</h2>
            <div className="textPlanTop">
              <img src={IconPricing} alt="" width="40" height="40" />
              <div>
                <h4>One-Lingo L4</h4>
                <p>4 hours per month (8 classes - 30 min each)</p>
              </div>
            </div>
          </div>

          <div className="box">

            <div className="infos">
              <div className="reviewPlan">

                <div className="textPlan">
                  <div className="infoPlan">
                    <h5>LINGO</h5>
                    <div className="language">
                      <Select
                        value={this.state.language}
                        onChange={this.handleChange}
                        name="language"
                        className="input-lingo"
                        disableUnderline
                      >
                        <MenuItem value={'ENGLISH'}>
                          <FlagIcon code="US" /> English
                        </MenuItem>
                        <MenuItem value={'PORTUGUESE'}>
                          <FlagIcon code="BR" /> Portuguese
                        </MenuItem>
                        <MenuItem value={'SPANISH'}>
                          <FlagIcon code="ES" /> Spanish
                        </MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div className="infoPlan">
                    <h5>COURSE FOCUS</h5>
                    <select
                      name="country"
                      id="country"
                      required
                      defaultValue="Traditional"
                    >
                      <option value="Traditional">Traditional</option>
                    </select>
                  </div>

                  <div className="infoPlan">
                    <h5>STRUCTURE</h5>
                    <select
                      name="country"
                      id="country"
                      required
                      defaultValue="Traditional"
                    >
                      <option value="Balanced">Balanced</option>
                    </select>
                  </div>
                </div>
                <div className="textBottom">
                  <p>My current level is Basic </p>
                  <select
                    name="country"
                    id="country"
                    required
                    defaultValue="English"
                  >
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>
              <div className="textPay">
                <div>
                  <div className="total">
                    <h5>TOTAL</h5>
                  </div>
                  <div className="price">
                    <h5>{t('MONEY_FORMAT')} 49.99</h5>
                    <span>per month</span>
                  </div>
                  <div className="dollar">
                    <span>*{t('MONEY_FORMAT')} Dollars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="buttonBack">
          <button> Back</button>
          <img src="images/logo_paypal.png" alt="" />
        </div>

      </Form>
    );
  }
}

export default ReviewSingIn;

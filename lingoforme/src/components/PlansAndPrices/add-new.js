import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'

import Loading from 'react-fullscreen-loading'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Services from '../_api/Services'
import PATH_SERVER from '../_api/PATH_SERVER'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {FlagIcon} from 'react-flag-kit'

import Engrenagem from '../../images/icons/icon_planspricing_header.svg'

import {Prices} from './styles'

function Transition (props) {
  return <Slide direction="up" {...props} />
}

class PlansAndPrices extends Component {
  constructor (props) {
    super (props)
    this.services = new Services ()
    this.t = this.props.t
    this.handleChange = this.handleChange.bind (this)
    this.handlePost = this.handlePost.bind (this)
    this.handleInputChange = this.handleInputChange.bind (this)
    this.handlerChangeList = this.handlerChangeList.bind (this)
    this.handleDelete = this.handleDelete.bind(this);
    this.addField = this.addField.bind (this)
    this.removeField = this.removeField.bind (this)
    this.pageTitle = ''
    this.state = {
      loading: false,
      validate: true,
      nameEnglish: '',
      nameSpanish: '',
      namePortuguese: '',
      descriptionEnglish: '',
      descriptionSpanish: '',
      descriptionPortuguese: '',
      totalClasses: '',
      unlimited: false,
      multiLingo: false,
      active: false,
      countries: [],
      lingosLanguages: [],
      planLanguages: [],
      prices: [],
      redirect: false,
      open: false,
      isDelete: false,
      dialogTitle: '',
      dialogMsg: '',
      trial : false
    }

    this.loggedHeader = {
      'Content-Type': 'application/json',
    }
  }

  addField (e) {
    e.preventDefault ()
    if (e.target.name === 'addLingo') {
      let arr = this.state.planLanguages
      arr.push (0)

      this.setState ({
        planLanguages: arr,
      })
    }

    if (e.target.name === 'addCountry') {
      let arr = this.state.prices
      arr.push ({
        bestSeller: false,
      })

      this.setState ({
        prices: arr,
      })
    }
  }

  removeField (e) {
    e.preventDefault ()
    
    if (e.target.name === 'removeLingo') {
      let arr = this.state.planLanguages
      arr.splice (e.target.id, 1)
      this.setState ({
        planLanguages: arr,
      })
    }

    if (e.target.name === 'removePrice') {
      
      let arr = this.state.prices

      let targetArrIndex = e.target.id
      console.log('ID ID ID ', arr[targetArrIndex].id)

      if(arr[targetArrIndex].id !== undefined) {
        if(arr.length > 1) {

          
          // TODO: Loading
          this.setState ({ loading: true })
          // TODO: delete by ID via API, callback function
          this.services.ApiDelete(`prices/${arr[targetArrIndex].id}`)
            .then(res => {
              arr.splice (targetArrIndex, 1)
              this.setState ({
                prices: arr,
                loading: false
              })
            })
            .catch(err => {console.log('ERROR DELETE PRICE ', err)})
        }
      } else {
        arr.splice (targetArrIndex, 1)
        this.setState ({
          prices: arr,
          loading: false
        })
      }



      
    }
  }

  handlerChangeList (e) {
    if (e.target.name === 'planLanguage') {
      let newObj = this.state.planLanguages
      newObj[e.target.id] = e.target.value
      this.setState({
        planLanguages: newObj
      })
    } else {
      let newObj = this.state.prices
      if(e.target.name === 'discount') {
        newObj[e.target.id].discount = (e.target.value)
        newObj[e.target.id].value = String(Math.ceil(((newObj[e.target.id].baseValue - e.target.value) * 100) / newObj[e.target.id].baseValue))
      } else {
        newObj[e.target.id][e.target.name] = e.target.value
      }

      this.setState({
        prices: newObj
      })
    }
  }


  handleChange (e) {
    this.setState ({[e.target.name]: e.target.value})
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState ({
      [name]: value,
    })
  }

  //Envia objeto para o Back-end
  handlePost () {

    if(!this.state.multiLingo && this.state.planLanguages.length === 0){      
      return this.setState({
        dialogTitle: 'Ops!',
        dialogMsg: 'At least one plan language or multilingo was required!',
        open: true,
        isDelete: false
      })
    }

    if(this.state.prices.length === 0){      
      return this.setState({
        dialogTitle: 'Ops!',
        dialogMsg: 'At least one country price was required!',
        open: true,
        isDelete: false
      })
    }
    if (this.state.validate) {
      let sendObj = {
        plan: {
          nameEnglish: this.state.nameEnglish,
          nameSpanish: this.state.nameSpanish,
          namePortuguese: this.state.namePortuguese,
          descriptionEnglish: this.state.descriptionEnglish,
          descriptionSpanish: this.state.descriptionSpanish,
          descriptionPortuguese: this.state.descriptionPortuguese,
          totalClasses: Number(this.state.totalClasses),
          unlimited: this.state.unlimited,
          active: this.state.active,
          multiLingo: this.state.multiLingo,
          trial: this.state.trial
        },
        prices: this.state.prices,
        planLanguages: (this.state.multiLingo) ? [] : this.state.planLanguages
      }
      sendObj.prices.map(item => {
        item.baseValue = String(item.baseValue)
        item.discount = String(item.discount)
        item.value = String(item.value)
      })



      let id = this.props.match.params.id

      if (id !== undefined) {
        sendObj.plan.id = Number(id)
      }
      this.setState({loading: true})
      axios.post (
        `${PATH_SERVER.DOMAIN}/planprices`,
        JSON.stringify (sendObj),
        {headers: this.loggedHeader}
      )
        .then (res => {
          this.setState ({
            dataSend: true,
            redirect: true
          })
        })
        .catch(err => {
          let errMsg = (err.response.data.error.message !== undefined) ? err.response.data.error.message : err.response.data.errors[0].message
          this.setState({
            dialogTitle: 'Ops!',
            dialogMsg: errMsg,
            open: true,
            isDelete: false
          })
          // console.log(err)
        })
    }
  }

  handleDelete () {
    this.setState({loading: true, open: false})
    this.services.ApiDelete(`planprices/${this.props.match.params.id}`)
      .then(res => {
        console.log('RES RE ', res)
        this.setState({redirect: true})
      })
      .catch(err => {
        let errMsg = (err.response.data.error.errors[0].message !== undefined) ? err.response.data.error.errors[0].message : err.data.errors[0].message
        this.setState({
          dialogTitle: 'Ops!',
          dialogMsg: errMsg,
          open: true,
          isDelete: false
        })
      })
  }

  componentDidMount () {
    // GET LINGO LANGUAGES
    axios.get (`${PATH_SERVER.DOMAIN}/lingolanguages/getall`
    )
      .then (response => {
        this.setState ({
          lingosLanguages: response.data.result.items,
        })
      })
      .catch (err => console.log ('Error', err))
    
    // GET PRICE COUNTRIES
    axios.get (
      `${PATH_SERVER.DOMAIN}/pricecountries/list?skip=0&take=255`
    )
      .then (response => {
        

        this.setState ({
          countries: response.data.result.items,
        })
      })
      .catch (err => {
        console.log ('Error', err)
      })

    // monta campos preenchidos anteriormente
    let countryId = this.props.match.params.id

    if (countryId !== undefined) {
      // TODO implementar no res do get
      this.pageTitle = 'Name Plan'
      axios.get (`${PATH_SERVER.DOMAIN}/planprices/${countryId}`)
        .then (res => {
          let pricesMaped = []
          console.log('RES PLANPRICES ', res)
          if(res.data && res.data.result.items.length === 0){
            return false
          }

          if(res.data.result.items[0].plan && res.data.result.items[0].plan.prices){
            res.data.result.items[0].plan.prices.map(itemPrice => {
              pricesMaped.push(
                {
                  id: itemPrice.id,
                  baseValue: itemPrice.baseValue,
                  discount: itemPrice.discount,
                  value: itemPrice.value,
                  priceCountryId: itemPrice.priceCountryId,
                  bestSeller: itemPrice.bestSeller,
                  currency: itemPrice.priceCountry.standardCurrency
                }
              )
            })
          }

          this.setState ({
            country_id: countryId,
            languageId: res.data.result.items[0].languageId,
            nameEnglish: res.data.result.items[0].plan.nameEnglish,
            nameSpanish: res.data.result.items[0].plan.nameSpanish,
            namePortuguese: res.data.result.items[0].plan.namePortuguese,
            descriptionEnglish: res.data.result.items[0].plan.descriptionEnglish,
            descriptionSpanish: res.data.result.items[0].plan.descriptionSpanish,
            descriptionPortuguese: res.data.result.items[0].plan.descriptionPortuguese,
            totalClasses: res.data.result.items[0].plan.totalClasses,
            unlimited: res.data.result.items[0].plan.unlimited,
            trial: res.data.result.items[0].plan.trial,
            multiLingo: res.data.result.items[0].multiLingo,
            active: res.data.result.items[0].plan.active,
            prices: pricesMaped
          })
          
          let planLanguages = []

          res.data.result.items.map (item => {
            this.pageTitle = item.name
            if(item.lingoLanguage !== null) {
              planLanguages.push(item.lingoLanguage.id)
            }
          })

          this.setState ({
            planLanguages: planLanguages
          })
        })
        .catch (err => {
          console.log('ERR MSG ', err)
          let errMsg = (err.response.data.error.message !== undefined) ? err.response.data.error.message : err.response.data.errors[0].message
          this.setState({
            dialogTitle: 'Ops!',
            dialogMsg: errMsg,
            open: true,
            isDelete: false
          })
        })

      // vai para add new
    } else {
      this.pageTitle = 'Add New Plan'
      axios
        .get (
          `${PATH_SERVER.DOMAIN}/pricecountries/list?skip=0&take=255`
        )
        .then (res => {
          this.setState ({
            countries: res.data.result.items,
          });
        })
        .catch (err => console.log (err))
    }
  }

  render () {
    const { t } = this

    if(this.state.redirect) {
      return <Redirect to='/plans-and-prices' />
    }

    return (
      <div className="view">
        {
          this.state.loading &&
          <Loading loading={true} background="rgba(0,0,0,0.3)"
            loaderColor="#3498db"
          />
        } 
        <SideMenu />

        <section>
          <Header/>
          <div className="toptitle">      
              <img src={Engrenagem} alt="Engrenagem"/>    
              <h1>Plans and Prices</h1>                   
          </div>

          <Prices>
            <div className="container">
              <div className="bigBox">
                <h2>
                  {this.pageTitle}
                </h2>

                <div className="planInfo">
                  <h3>
                    Plan Information
                  </h3>

                  <h4>{(this.state.nameEnglish !== '') ? this.state.nameEnglish : 'New Plan'}</h4>

                  <form className="formulario">

                    <div>
                      <label for="name">English</label>
                      <span>Required</span>
                    </div>
                    <input
                      placeholder="Enter name"
                      name="nameEnglish"
                      value={this.state.nameEnglish}
                      onChange={this.handleChange}
                    />

                    <div>
                      <label for="name">Português</label>
                      <span>Required</span>
                    </div>
                    <input
                      placeholder="Enter name"
                      name="namePortuguese"
                      value={this.state.namePortuguese}
                      onChange={this.handleChange}
                    />

                    <div>
                      <label for="name">Español</label>
                      <span>Required</span>
                    </div>
                    <input
                      placeholder="Enter name"
                      name="nameSpanish"
                      value={this.state.nameSpanish}
                      onChange={this.handleChange}
                    />

                    <h4>Description</h4>

                    <div>
                      <label for="name">English</label>
                      <span>Required</span>
                    </div>
                    <input
                      placeholder="Description of the language"
                      name="descriptionEnglish"
                      value={this.state.descriptionEnglish}
                      onChange={this.handleChange}
                    />

                    <div>
                      <label for="name">Português</label>
                      <span>Required</span>
                    </div>
                    <input
                      placeholder="Description of the language"
                      name="descriptionPortuguese"
                      value={this.state.descriptionPortuguese}
                      onChange={this.handleChange}
                    />

                    <div>
                      <label for="name">Español</label>
                      <span>Required</span>
                    </div>
                    <input
                      placeholder="Description of the language"
                      name="descriptionSpanish"
                      value={this.state.descriptionSpanish}
                      onChange={this.handleChange}
                    />

                    <label htmlFor="switch-shadow">Unlimited classes?</label>
                    <div className="switchBox">
                      <div className="switch__container addInput">
                        <input
                          id="switch-shadow"
                          className="switch switch--shadow"
                          name="unlimited"
                          type="checkbox"
                          checked={this.state.unlimited}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="switch-shadow">
                          <span>{this.state.unlimited ? 'Yes' : 'No'}</span>
                        </label>
                      </div>
                    </div>

                    <div className="numberClass" style={{display: (this.state.unlimited) ? 'none' : '' }}>
                      <div>
                        <label for="gender">Number of classes</label>
                        <span>Required</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Number of classes"
                        name="totalClasses"
                        value={this.state.totalClasses}
                        onChange={this.handleChange}
                        className="inputMobile"
                      />
                    </div>

                    <label htmlFor="switch-shadow5">Multi language?</label>
                    <div className="switchBox">
                      <div className="switch__container addInput">
                        <input
                          id="switch-shadow5"
                          className="switch switch--shadow"
                          name="multiLingo"
                          type="checkbox"
                          checked={this.state.multiLingo}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="switch-shadow5">
                          <span>{this.state.multiLingo ? 'Yes' : 'No'}</span>
                        </label>
                      </div>
                    </div>

                    <label htmlFor="switch-shadow5">Trial ?</label>
                    <div className="switchBox">
                      <div className="switch__container addInput">
                        <input
                          id="switch-shadow6"
                          className="switch switch--shadow"
                          name="trial"
                          type="checkbox"
                          checked={this.state.trial}
                          onChange={this.handleInputChange}
                        />
                        <label htmlFor="switch-shadow6">
                          <span>{this.state.trial ? 'Yes' : 'No'}</span>
                        </label>
                      </div>
                    </div>
                  </form>

                  <div className="lingos" style={{display: (this.state.multiLingo) ? 'none' : '' }}>
                    <h4>Lingos</h4>

                    <div className="lingoSelects">
                      <div className="linha" />
                      <div className="selects">

                        <div className="delet">
                          <div className="inputDelete">
                            {this.state.planLanguages.map ((item, index) => (
                              <div>
                                <Select
                                  value={item}
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
                                  inputProps={{
                                    id: index.toString(),
                                    name: 'planLanguage',
                                  }}
                                  className="input-lingo"
                                  disableUnderline
                                >
                                  {this.state.lingosLanguages.map (item => {
                                    return (
                                      <MenuItem key={item.id} value={item.id}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                          <FlagIcon code={item.flag} />
                                          {' '}
                                          &nbsp;{item.language.name}
                                        </div>
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                                <button
                                  id={index}
                                  name="removeLingo"
                                  className="delete"
                                  onClick={this.removeField}
                                >
                                  Delete
                                  {' '}
                                  <i
                                    class="fa fa-times-circle-o"
                                    aria-hidden="true"
                                  />
                                </button>
                                
                              </div>
                            ))}

                          </div>
                          <button name="addLingo" onClick={this.addField}>
                            Add lingo
                            {' '}
                            +
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="lingos ">
                    <div className="price">
                      <h4>Price</h4>

                      <div className="lingoSelects">

                        <div className="selects">

                          <div className="delet">
                            <div className="priceSelect" />
                            {this.state.prices.map ((item, index) => (
                              <div className="lineContent">
                                <div className="linhaPrice" />
                                <div>
                                  <label for="country">Country</label>
                                  <div className="countryCurrency">
                                    <select
                                      value={item.priceCountryId}
                                      id={index.toString()}
                                      name={'priceCountryId'}
                                      onChange={(event) => {
                                        let objTarget = {
                                          target: {
                                            id: index,
                                            name: event.target.name,
                                            value: Number(event.target.value)
                                          }
                                        }
                                        this.handlerChangeList(objTarget)
                                      }}
                                      // inputProps={{
                                      // }}
                                      className="input-lingo"
                                    >
                                      <option >Select</option>
                                      {this.state.countries.map (countrie => (
                                        
                                        <option
                                          key={countrie.id}
                                          value={countrie.id}
                                        >
                                          {countrie.country.name}
                                        </option>
                                      ))}
                                    </select>
                                    <span className="currency">Currency: {item.currency}</span>
                                  </div>
                                  <form className="formulario">
                                    <div>
                                      <label for="name">Base Price</label>
                                      <span>Required</span>
                                    </div>
                                    <input
                                      id={index}
                                      placeholder="Base price"
                                      name="baseValue"
                                      type="number"
                                      value={item.baseValue}
                                      onChange={this.handlerChangeList}
                                      required
                                    />
                                    <div>
                                      <label htmlFor="discount">Discount Price</label>
                                      <span>Required</span>
                                    </div>
                                    <input
                                      id={index}
                                      placeholder="Discount price"
                                      name="discount"
                                      type="number"
                                      value={item.discount}
                                      onChange={this.handlerChangeList}
                                      className="inputMobile"
                                      required
                                    />
                                    <div>
                                      <label htmlFor="value">Discount Rate</label>
                                      <span>Required</span>
                                    </div>
                                    <input
                                      id={index}
                                      placeholder="Discount rate"
                                      name="value"
                                      type="number"
                                      value={item.value}
                                      onChange={this.handlerChangeList}
                                      className="inputMobile"
                                      required
                                    />
                                    <label htmlFor="gender">Best Seller?</label>
                                    <div className="switchBox">
                                      <div className="switch__container">
                                        <input
                                          key={index}
                                          // id={index}
                                          id={'switch-shadow'+(7+index)}
                                          className="switch switch--shadow"
                                          name="bestSeller"
                                          type="checkbox"
                                          checked={item.bestSeller}
                                          onClick={(event) => {
                                            let objTargetSwitch = {
                                              target: {
                                                id: index,
                                                name: event.target.name,
                                                value: !item.bestSeller
                                              }
                                            }
                                            this.handlerChangeList(objTargetSwitch)
                                          }}
                                        />
                                        <label htmlFor={'switch-shadow'+(7+index)}>
                                          <span className="bestSeller">
                                            {item.bestSeller
                                              ? 'Yes'
                                              : 'No'}
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                    { this.state.prices.length > 1 &&
                                      <button
                                        id={index}
                                        name="removePrice"
                                        onClick={this.removeField}
                                        className="delete"
                                      >
                                        Delete
                                        {' '}
                                        <i
                                          class="fa fa-times-circle-o"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    }

                                  </form>
                                </div>
                              </div>
                            ))}

                            <button name="addCountry" onClick={this.addField}>
                              Add Country
                              {' '}
                              +
                            </button>
                              <label htmlFor="gender">Status</label>
                              <div className="switchBox">
                                <div className="switch__container addInput">
                                  <input
                                    id="switch-shadow4"
                                    className="switch switch--shadow"
                                    name="active"
                                    type="checkbox"
                                    checked={this.state.active}
                                    onChange={this.handleInputChange}
                                  />
                                  <label htmlFor="switch-shadow4">
                                    <span>
                                      {this.state.active ? 'Yes' : 'No'}
                                    </span>
                                  </label>
                                </div>
                            </div>

                            {this.props.match.params.id &&
                              <button
                                onClick={() => this.setState ({open: true, isDelete: true})}
                                className="deletePlans"
                              >
                                Delete Plan
                              </button>}

                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              </div>
              <div className="buttons">
                <Link to="/plans-and-prices">
                  <button><i class="fa fa-angle-left" aria-hidden="true"></i>Back</button>
                </Link>
                <button onClick={this.handlePost}>Save</button>
              </div>
            </div>

            <Dialog
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => this.setState ({open: false})}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              className="boxModal"
            >
              {/* <DialogTitle id="alert-dialog-slide-title" className="boxModal title">
                {this.state.dialogTitle}
              </DialogTitle> */}
              <DialogContent className="boxModal">
                <DialogContentText id="alert-dialog-slide-description" className="boxModal">
                <h3>{ (this.state.isDelete)
                    ? 'Do you really want to delete' + this.state.nameEnglish
                    : this.state.dialogMsg
                  }
                  </h3>
                </DialogContentText>
              </DialogContent>
              <DialogActions className="boxModal">
                {this.state.isDelete && 
                  <Button onClick={this.handleDelete} color="primary">
                    {'Yes, delete'}
                  </Button>
                }
                <Button
                  onClick={() => this.setState ({open: false, loading: false})}
                  color="primary"
                >
                  {'Cancel'}
                </Button>
              </DialogActions>
            </Dialog>
          </Prices>

        </section>
      </div>
    );
  }
}

export default PlansAndPrices

import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import Loading from 'react-fullscreen-loading'
// import validator from 'validator'
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

// import Select from '@material-ui/core/Select'

import Engrenagem from '../../images/icons/icon_settings_header.svg'

import { Language } from './styles'

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class Country extends Component {

  constructor (props) {
    super(props)
    this.services = new Services()
    this.t = this.props.t
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.callDeleteApi = this.callDeleteApi.bind(this)
    this.getCountryData = this.getCountryData.bind(this)
    this.pageTitle = ''
    this.state = {
      loading: false,
      open: false,
      countries: [],
      languagesSel: [],
      countryId: 0,
      name: 'Add new Country',
      lingoLanguageId: 0,
      paymentMethod: undefined,
      standardCurrency: '',
      defaultCountry: false,
      extraClassPercentage: "",
      active: false,
      validate: true,
      value: '',
      redirect: false
    }
    this.loggedHeader = {
      'Content-Type': 'application/json'
    }
  }

  componentDidMount () {
    // Lista linguas
    axios.get(`${PATH_SERVER.DOMAIN}/lingolanguages/getall`)
      .then(response => {
        console.log('##### response LINGUAS ', response);
        this.setState({ 
          languagesSel: response.data.result.items
        })
        axios.get(`${PATH_SERVER.DOMAIN}/countries/getall`)
          .then(res => {
            console.log('##### response COUNTRIES ', res)
            this.setState({
              countries: res.data.result.items
            }, () => this.getCountryData())
          })
          .catch(err => console.log(err))
      })
      .catch(err => {
        console.log('err languages ', err)
      })
  }

  getCountryData () {
    let countryId = this.props.match.params.id
    console.log('countryId = ', countryId)
    
    // monta campos preenchidos anteriormente
    if (countryId !== undefined) {
      // TODO implementar no res do get
      axios.get(`${PATH_SERVER.DOMAIN}/pricecountries/get/${countryId}`)
        .then(res => {
          console.log('##### RES ', res.data.result.items)

          res.data.result.items.map(item => {
            this.pageTitle = this.state.countries.filter(__country => __country.id == item.countryId)
            
            this.setState({
              countryId: Number(item.countryId),
              lingoLanguageId: item.lingoLanguageId,
              paymentMethod: item.paymentMethod,
              defaultCountry: item.defaultCountry,
              standardCurrency: item.standardCurrency,
              extraClassPercentage: item.extraClassPercentage,
              active: item.active,
              name: this.pageTitle[0].name
            })
          })
        })
        .catch(err => {
          console.log('ERRPR PRICE ', err)
        })

    // vai para add new
    }
  }

  handleChange (e) { 
    this.setState({[e.target.name]: e.target.value})
  }

   
  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }
     
  validateForm () {

    console.log('++++++ ', this.state.paymentMethod)

    if(this.state.countryId === 0) {
      this.setState({
        open: true,
        dialogMsg: 'COUNTRY_REQUIRED',
        dialogTitle: 'ERROR'
      })
      return false
    }

    if(this.state.lingoLanguageId === 0) {
      this.setState({
        open: true,
        dialogMsg: 'LANGUAGE_REQUIRED',
        dialogTitle: 'ERROR'
      })
      return false
    }
    
    if(this.state.paymentMethod === '' || this.state.paymentMethod === undefined) {
      this.setState({
        open: true,
        dialogMsg: 'PAYMENT_REQUIRED',
        dialogTitle: 'ERROR'
      })
      return false
    }

    if(this.state.standardCurrency === '' || this.state.standardCurrency.length !== 3) {
      this.setState({
        open: true,
        dialogMsg: 'CURRENCY_REQUIRED_OR_INVALID',
        dialogTitle: 'ERROR'
      })
      return false
    }

    if(this.state.standardCurrency === '' || this.state.standardCurrency.length !== 3) {
      this.setState({
        open: true,
        dialogMsg: 'CURRENCY_REQUIRED_OR_INVALID',
        dialogTitle: 'ERROR'
      })
      return false
    }

    return true
  }

  //Envia objeto para o Back-end
  handlePost () {
    if (this.validateForm()) {

      let sendObj = {
        countryId: Number(this.state.countryId),
        lingoLanguageId: Number(this.state.lingoLanguageId),
        paymentMethod: this.state.paymentMethod,
        standardCurrency: this.state.standardCurrency,
        extraClassPercentage: Number(this.state.extraClassPercentage),
        defaultCountry: this.state.defaultCountry,
        active: this.state.active
      }

      console.log(sendObj);
      let id = this.props.match.params.id

      if (id === undefined) {
        this.setState({loading: true})
        axios.post(`${PATH_SERVER.DOMAIN}/pricecountries`, JSON.stringify(sendObj), { headers: this.loggedHeader })
          .then(res => {
            console.log(res)
            this.setState({
              dataSend: true,
              redirect: true,
              open: false
            })
          })
          .catch(err => {
            console.log('Error sendUser Data ', err.response.data.error.errors[0].message)
            let errMsg = (err.response.data.error.errors[0].message !== undefined) ? err.response.data.error.errors[0].message : err.data.errors[0].message
            this.setState({
              dialogTitleMsg: 'Ops!',
              dialogMsg: errMsg,
              open: true
            })
          })
      
      } else{
        this.setState({loading: true}) 
        axios.put(`${PATH_SERVER.DOMAIN}/pricecountries`, JSON.stringify(Object.assign({id: Number(id)}, sendObj)) ,{ headers: this.loggedHeader })
          .then(response => {
            console.log('##### ATUALIZAR ',response)
            this.setState({
              countryId: id,
              redirect: true,
            })
          })
          .catch(err => {
            console.log(err)
          })

      }
    }
  }

  handleDelete(e) {
    e.preventDefault()
    this.setState({
      isDelete: true, 
      open: true,
      dialogMsg: `Are you sure you want do delete country ${this.state.name} ?`,
      dialogTitleMsg: 'Delete'
    })
  }

  callDeleteApi (e) {
    //e.preventDefault()
    // validate modal

    //console.log('CALL DELETE #####################')
    this.setState({loading: true, open: false})
    console.log('DELETE PATH ', `${PATH_SERVER.DOMAIN}/pricecountries/${this.props.match.params.id}`)
    axios.delete(`${PATH_SERVER.DOMAIN}/pricecountries/${this.props.match.params.id}`)
      .then(res => {
        // redirect list
        this.setState({
          redirect: true
        })
      })
      .catch(err => {
        //console.log(err)
        this.setState({
          dialogTitleMsg: 'Ops!!!!!!',
          dialogMsg: err.message,
          open: true
        })
      })
  }    

   
    render() {
      const { redirect } = this.state;
      const { t } = this.props;

      if (redirect) {
        return <Redirect to='/countries'/>;
      }
        return (
            <div className="view">      
             {
                this.state.loading &&
                <Loading loading={true} background="rgba(0,0,0,0.6)"
                loaderColor="#3498db"/>
              }            
                <SideMenu />
                <section>
                    <Header/>   
                    <div className="toptitle">      
                        <img src={Engrenagem} alt="Engrenagem"/>    
                        <h1>Countries</h1>                   
                    </div> 
                    <Language>
                        <div className="container">
                            <div className="bigBox">
                                <h2>
                                 {this.state.name}
                                </h2>

                                <div className="planInfo">
                                   
                                    <form className="formulario">

                                        <div className="country">

                                            <div className="countryTop">
                                                <div>
                                                    <label htmlFor="name">Country</label>
                                                    <span>Required</span>
                                                </div>
                                               
                                                <select value={this.state.countryId} onChange={this.handleChange} name='countryId' className='input-lingo' disabled={this.state.countries.length === 1}>
                                                    <option >Select</option>
                                                    
                                                    {
                                                        this.state.countries.map(country => ( 
                                                            <option key={country.id} value={country.id}>{country.name}</option>
                                                        ))
                                                    }  
                                                </select>
                                            </div>

                                            <div className="countryTop">
                                                <div>
                                                    <label htmlFor="name">Country Language</label>
                                                    <span>Required</span>
                                                </div>
                                                <select value={this.state.lingoLanguageId} onChange={this.handleChange} name='lingoLanguageId' className='input-lingo'>
                                                    <option >Select</option>
                                                
                                                    {
                                                        this.state.languagesSel.map((lang, index) => ( 
                                                            <option key={lang.id} value={lang.id}>{lang.language.name}</option>
                                                        ))
                                                    }  
                                                </select>
                                            </div>
                                        </div>

                                        <div>

                                            <div className="country">

                                                <div className="countryTop">
                                                    <div>
                                                        <label htmlFor="name">Standard Payment</label>
                                                        <span>Required</span>
                                                    </div>
                                                                
                                                    <select value={this.state.paymentMethod} onChange={this.handleChange} name='paymentMethod' className='input-lingo'>
                                                        <option>Select</option>
                                                        <option value={'paypal'}>PayPal</option>
                                                    </select>
                                                </div>

                                                <div className="countryTop">
                                                    <div>
                                                        <label htmlFor="name">Standard Currency</label>
                                                        <span>Required</span>
                                                    </div>                                                    
                                                    <input type='text' value={this.state.standardCurrency} onChange={this.handleChange} name='standardCurrency' placeholder="Enter Currency code" maxLength="3"/>
                                                </div>
                                            </div>  
                                            <div className="country">

                                                <div className="countryTop">
                                                    <div>
                                                        <label htmlFor="name">{`${t("EXTRA_CLASS_PRICE")} - %`}</label>
                                                        <span>Required</span>
                                                    </div>
                                                    <input value={this.state.extraClassPercentage} onChange={this.handleChange} name='extraClassPercentage' className='input-lingo' placeholder={t("ENTER_%_VALUE")}/>
                                                </div>
                                            </div>  

                                            <label htmlFor="gender">Standard country?</label>                                            
                                            <div className="switchBox">
                                                <div className="switch__container addInput">
                                                    <input id="switch-shadow2" className="switch switch--shadow" name="defaultCountry" type="checkbox" checked={this.state.defaultCountry} onChange={this.handleInputChange} />
                                                    <label htmlFor="switch-shadow2"><span>{this.state.defaultCountry ? 'Yes' : 'No' }</span></label>
                                                    
                                                </div>
                                            </div>

                                            <label htmlFor="gender">Active?</label>                                            
                                            <div className="switchBox">
                                                <div className="switch__container addInput">
                                                    <input id="switch-shadow3" className="switch switch--shadow" name='active' type="checkbox" checked={this.state.active} onChange={this.handleInputChange} />
                                                    <label htmlFor="switch-shadow3"><span>{this.state.active ? 'Yes' : 'No' }</span></label>
                                                </div>
                                            </div>

                                            {
                                              this.props.match.params.id &&
                                              <Button onClick={this.handleDelete} className="deleteType">Delete Country</Button>
                                            }
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                            <div className="buttons">
                                <Link to="/countries">
                                  <button><i class="fa fa-angle-left" aria-hidden="true"></i>Back</button>
                                </Link>
                                <button onClick={this.handlePost}>Save</button>
                            </div>
                        </div>

                        <Dialog
                          open={this.state.open}
                          keepMounted
                          onClose={() => this.setState({open: false})}
                          aria-labelledby='alert-dialog-slide-title'
                          aria-describedby='alert-dialog-slide-description'
                        >
                        <DialogTitle id='alert-dialog-slide-title'>
                          {this.state.dialogTitleMsg}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id='alert-dialog-slide-description'>
                            {this.state.dialogMsg}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
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

                      {/* <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => this.setState({open: false})}
                        aria-labelledby='alert-dialog-slide-title'
                        aria-describedby='alert-dialog-slide-description'
                      >
                        <DialogTitle id='alert-dialog-slide-title'>
                          {'Please confirm'}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id='alert-dialog-slide-description'>
                            {'Do you really want to remove the country? ' + this.state.name}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleDelete} color='primary'>
                            {'SIM'}
                          </Button>
                          <Button onClick={() => this.setState({open: false})} color='primary'>
                            {'CANCELAR'}
                          </Button>
                        </DialogActions>
                      </Dialog> */}

                     
                    </Language>
                    
                </section>
            </div>
        );
    }
}

export default translate('translations')(Country)
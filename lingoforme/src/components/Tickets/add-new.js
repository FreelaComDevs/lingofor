import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Services from '../_api/Services'
import PATH_SERVER from '../_api/PATH_SERVER'
import axios from 'axios'

import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Engrenagem from '../../images/icons/icon_settings_header.svg'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import { FlagIcon } from "react-flag-kit"
import Select from '@material-ui/core/Select'

import { Prices } from './styles';

function Transition (props) {
    return <Slide direction='up' {...props} />
}

class Tickets extends Component {  
    
    constructor (props) {
        super(props)
        this.i18n = this.props.i18n
        this.t = this.props.t

        this.services = new Services()
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSubtype = this.handleChangeSubtype.bind(this)
        this.handlePost = this.handlePost.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.addSubtype = this.addSubtype.bind(this)
        this.pageTitle = ''

        this.state = {
            validate: true,
            redirect: false,
            itemID: '',
            id: '',
            nameEnglish: '',
            nameSpanish: '',
            namePortuguese: '',
            SubnameEnglish: '',
            SubnameSpanish: '',
            SubnamePortuguese: '',
            role: 'select',
            lingoLanguageId: 13,
            ticketID: '',
            type: [], 
            subtypes: [
                {nameEnglish: '', nameSpanish: '', namePortuguese: '', role: '', lingoLanguageId: 0, active:false}
            ], 
            lingos:[],
            flag: '', 
            active: false,
            activeType: false ,
            activeSub: false,
            selectedSubtype: '',
            selectedtype: ''         
        }

        this.loggedHeader = {
            'Content-Type': 'application/json'
        }
    }

    componentDidMount () {

        //console.log(this.state.type.length)
    
        let ticketID = this.props.match.params.id
        console.log('ticketID = ', ticketID)
    
        // monta campos preenchidos anteriormente

        if (ticketID !== undefined) {

          // TODO implementar no res do get

          this.pageTitle = 'Add New Ticket'

          this.services.get(`ticketTypes/${ticketID}/ticketSubTypes`)
            .then(res => {
                console.log('##### response@@@@@ ', res.result.items);

                const subtypesArray = []
                res.result.items.map((item, index) => {                    
                        subtypesArray[index] = { 
                            nameEnglish: item.nameEnglish, 
                            nameSpanish: item.nameSpanish, 
                            namePortuguese: item.namePortuguese,
                            role: item.role,
                            lingoLanguageId: item.lingoLanguageId,
                            active: item.active,
                            id: item.id
                        }
                    })
                    //console.log(subtypesArray);
                this.setState({ subtypes: subtypesArray })
                })

          this.services.get(`ticketTypes/${ticketID}`)
          .then(res => {
            //console.log('##### response@@@@@ ', res.result.items);
    
            res.result.items.map(item => {
              this.pageTitle = item.name
              this.setState({                
                    nameEnglish: item.nameEnglish,
                    nameSpanish: item.nameSpanish,
                    namePortuguese: item.namePortuguese,
                    active: item.active,
                    id: item.id
              })
            })
            
          })
          .catch(err => {
            console.log(err)
          })

        // vai para add new
        } else {
          this.pageTitle = 'Add New Ticket'
          this.services.get(`ticketTypes`)
          .then(res => {
            this.setState({
              type: res.result.items
            })
          })
          .catch(err => console.log(err))
        }

        // GET LINGO LANGUAGES
         this.services.get (`lingolanguages/getall`)
         .then (response => {
             this.setState ({
                 lingos: response.result.items,
             })
         })
         .catch (err => console.log ('Error', err))
    }

     
    handleDelete () {
        let ticketID = this.props.match.params.id
        
           // console.log('Role', ticketSubTypes)   
            
        this.state.selectedSubtype 
            ? this.services.ApiDelete(`ticketTypes/${ticketID}/ticketSubTypes/${this.state.selectedSubtype}`)
            .then(res => {
                    this.setState({
                        dataSend: true,
                        redirect: true
                    })
                })
            .catch(err => console.log(err))
            : this.services.ApiDelete(`ticketTypes/${ticketID}`)
            .then(res => {
                this.setState({
                    dataSend: true,
                    redirect: true
                })
                })
            .catch(err => console.log(err))
        
    }


    handleChange (e) {
        console.log('STATE ', this.state)
        console.log('TYPEOF CHANGE ', typeof(e))
        this.setState({[e.target.name]: e.target.value}) 
        console.log('---------- STATE ', this.state)
    }

    handleChangeSubtype (e,index) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let subtypeObj = this.state.subtypes
        subtypeObj[index][e.target.name] = value
        this.setState({
            subtypes: subtypeObj
        })

        

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    //Envia objeto para o Back-end
    handlePost () {

        let ticketTypesObj = {
            nameEnglish: this.state.nameEnglish,
            nameSpanish: this.state.nameSpanish,
            namePortuguese: this.state.namePortuguese,
            active: this.state.activeType
        }

       

        // let ticketSubtypesObj = [
        //     {
        //         nameEnglish: this.state.nameEnglish,
        //         nameSpanish: this.state.nameEnglish,
        //         namePortuguese: this.state.nameEnglish,
        //         role: this.state.role,
        //         lingoLanguageId: Number(this.state.lingoLanguageId),     
        //         active: this.state.active
        //     }
        // ]
        // let ticketSubtypesObj = []
        // this.state.subtypes.map((item, index) => {
        //     ticketSubtypesObj.push({
        //         nameEnglish: item.nameEnglish,
        //         nameSpanish: item.nameSpanish,
        //         namePortuguese:item.namePortuguese,
        //         role: item.role,
        //         lingoLanguageId: Number(item.lingoLanguageId),     
        //         active: item.active
        //     })
        // })

        //console.log('Role', ticketSubtypesObj)        
        let ticketID = this.props.match.params.id
        let promise

        if ( ticketID ) {
            promise = this.services.ApiPut(`ticketTypes/${ticketID}`, ticketTypesObj)
        } else {
            promise = this.services.ApiPosts(`ticketTypes`, ticketTypesObj)
        }

        promise.then(res => {
            
            // if (res.status === 200) {
            //     return Promise.resolve(res.data)      
            // }
            // return Promise.resolve(res) 

            let id = 0 
            if(res.result)
                id = res.result.items[0].id
            else if (res.data.result) 
                id = res.data.result.items[0].id

            let promises = [] 
            const services = this.services

            this.state.subtypes.forEach(item => {
                delete item.name
                if (item.id) {
                    const subTypeId = item.id
                    delete item.id
                    promises.push(new Promise(function(resolve, reject) {
                        services.ApiPut(`ticketTypes/${id}/ticketSubTypes/${subTypeId}`, item)
                        .then(r => {
                            resolve(true)
                        })
                        .catch(err => reject(err.response))    
                    }))
                   
                } else {
                    promises.push(new Promise(function(resolve, reject) {
                        services.ApiPosts(`ticketTypes/${id}/ticketSubTypes`, item)
                        .then(r => {
                            resolve(true)
                        })
                        .catch(err => reject(err.response))   
                    })) 
                }
            })   
            
            Promise.all(promises)
            .then(r => {
                this.setState({
                    dataSend: true,
                    redirect: true
                })
            })
            .catch(err => console.log(err))    
            
    
        })
        .catch(err => console.log('ERRO GET USERS ', err))    
       
       
    }

    addSubtype (e) {
        e.preventDefault()
        let subtypesList = this.state.subtypes

        subtypesList.push({
            name: 'ADICIONADO'
        })
        this.setState({
            subtypes: subtypesList
        })
    }
    

    render() {
        const { t } = this

        const { redirect } = this.state;
        //console.log(this.state.subtypes);
        if (redirect) {
            return <Redirect to='/tickets'/>;
        }

        return (
            <div className="view">
                <SideMenu/>                  

                <section>
                    <Header/>  
                    <div className="toptitle">      
                        <img src={Engrenagem} alt="Engrenagem" />    
                        <h1>Tickets</h1>                   
                    </div> 

                    <Prices>
                        <div className="container">
                            <div className="bigBox">
                                <h2>
                                    { this.pageTitle }
                                </h2>

                                <div className="planInfo">
                                    <h3>
                                        Type
                                    </h3>

                                    <form className="formulario">

                                        <div>
                                            <label forHtml="name">English</label>
                                            <span>Required</span>
                                        </div>
                                        <input placeholder="Enter ticket type" name="nameEnglish" value={ this.state.nameEnglish} onChange={this.handleChange}/>
                                       
                                        <div>
                                            <label forHtml="gender">Português</label>
                                            <span>Required</span>
                                        </div>
                                        <input placeholder="Enter ticket type" name="namePortuguese" value={this.state.namePortuguese} onChange={this.handleChange} className="inputMobile"/> 

                                        <div>
                                            <label forHtml="gender">Español</label>
                                            <span>Required</span>
                                        </div>
                                        <input placeholder="Enter ticket type" name="nameSpanish" value={this.state.nameSpanish} onChange={this.handleChange} className="inputMobile"/> 

                                        <label for="active">Active?</label>                                            
                                        <div className="switchBox">
                                            <div className="switch__container addInput">
                                                <input id="switch-shadow" className="switch switch--shadow2" type="checkbox" checked={this.state.activeType} onChange={this.handleInputChange} name='activeType'/>
                                                <label htmlFor="switch-shadow"><span>{this.state.activeType ? 'Yes' : 'No' }</span></label>
                                            </div>
                                        </div>

                                        <div>
                                            {
                                             this.props.match.params.id &&
                                                <Button onClick={() => this.setState({open: true})} className="deleteType">Delete type</Button>
                                            }
                                        </div>

                                        <h3>
                                            Subtypes
                                        </h3>

                                        
                                        {this.state.subtypes.map((item, index) => {
                                            
                                            return (
                                            <div>
                                                <div>
                                                    <div>
                                                        <label forHtml="name">English</label>
                                                        <span>Required</span>
                                                    </div>
                                                    <input id={index} placeholder="Enter subtype" name="nameEnglish" value={item.nameEnglish} onChange={(e) => this.handleChangeSubtype(e,index)} />
                                                
                                                    <div>
                                                        <label forHtml="gender">Português</label>
                                                        <span>Required</span>
                                                    </div>
                                                    <input id={index} placeholder="Enter subtype" name="namePortuguese" value={item.namePortuguese} onChange={(e) => this.handleChangeSubtype(e,index)}/> 

                                                    <div>
                                                        <label forHtml="gender">Español</label>
                                                        <span>Required</span>
                                                    </div>
                                                    <input id={index} placeholder="Enter subtype" name="nameSpanish" value={item.nameSpanish} onChange={(e) => this.handleChangeSubtype(e,index)}/> 
                                                        
                                                    <div className="linhaSelects">
                                                        <div>
                                                            <label forHtml="role">Profile</label>
                                                            <span>Required</span>                                                    
                                                            <div>                                                            
                                                                <select value={item.role} onChange={(e) => this.handleChangeSubtype(e,index)} name='role' id={index}>
                                                                    <option value=''>Select</option>
                                                                    <option value="coordinator">{t('COORDINATOR')}</option>
                                                                    <option value="customerService">{t('ITEM_CUSTOMER_SERVICE')}</option>
                                                                    <option value="companyManager">{t('COMPANY_MANAGER')}</option>                                                                    
                                                                </select>
                                                            </div>

                                                        </div>

                                                        <div>
                                                            <label forHtml="language">Language</label>                                            
                                                            <div>
                                                                {/* {console.log(item.flag)} */}
                                                                <Select value={item.lingoLanguageId} onChange={(e) => this.handleChangeSubtype(e,index)} className='input-lingo Select' name= 'lingoLanguageId'>
                                                                    {/* <option >Select</option>                                                  */}

                                                                    {
                                                                        this.state.lingos.map(lingo => {                                            
                                                                            return (
                                                                                <MenuItem key={lingo.id} value={lingo.id}>
                                                                                <FlagIcon code={lingo.flag} />
                                                                                {' '}
                                                                                {lingo.language.name}
                                                                                </MenuItem>
                                                                            );
                                                                        })
                                                                    
                                                                    }
                                                                                                                
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <label for="activeSub">Active?</label>                                            
                                                    <div className="switchBox">
                                                        <div className="switch__container addInput">
                                                            <input id={`switch-shadow${index}`} className="switch switch--shadow3" type="checkbox" checked={item.active} onChange={(e) => this.handleChangeSubtype(e,index)} name='active'/>
                                                            <label htmlFor={`switch-shadow${index}`}><span>{item.active ? 'Yes' : 'No' }</span></label>
                                                        </div>
                                                    </div>                                                    

                                                    <hr /> 
                                                </div>


                                                {/* {console.log(item)} */}

                                                <div>
                                                    {
                                                        this.props.match.params.id &&
                                                        <Button onClick={() => this.setState({open: true, selectedSubtype: item.id})} className="deleteType">Delete Subtypes</Button>
                                                    } 
                                                </div>
                                            </div>
                                            )
                                            })
                                        }

                                        
                                                                                      
                                        
                                        <button onClick={this.addSubtype}>Add Subtype <i className="fa fa-plus" aria-hidden="true"></i></button> 
                                    </form>
                                </div>
                            </div>

                            <div className="buttons">
                                <Link to="/tickets/">
                                  <button><i className="fa fa-angle-left" aria-hidden="true"></i>Back</button>
                                </Link>
                                <button onClick={this.handlePost} className="save">Save</button>
                            </div>
                        </div>
                    </Prices>

            

                      <Dialog
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
                            {'Do you really want to remove the ticket ?'}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleDelete} color='primary'>
                            {'Yes, delete'}
                          </Button>
                          <Button onClick={() => this.setState({open: false})} color='primary'>
                            {'Cancel'}
                          </Button>
                        </DialogActions>
                      </Dialog>
                </section>
           </div>
        );

    }
}

Tickets.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}

export default translate('translations') (Tickets);
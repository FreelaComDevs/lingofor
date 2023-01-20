import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import { Manage, Billing } from './Styles'
import Myaccount from '../../images/icons/icon_myaccount_header.svg'
import Loading from 'react-fullscreen-loading'

import AuthService from '../_api/AuthService'
import Services from '../_api/Services'

import { translate } from 'react-i18next'

class NotificationAccount extends Component {
    constructor (props) {
        super(props)
    
        //TODO Important think, the user need set the first confirmation? or we need set the first config with positive
        this.state = {
            id: 1,
            userId: 0,
            website:false,
            email:false,
            app:false,
            erro:false,
            loading: true
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        this.callApi = this.callApi.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentWillMount () {
        let user = this.service.getProfile() 
        this.setState({ userId: parseInt(user.id) }, () => {
            this.callApi(true)
        })        
    }

    callApi () {
        this.service.noAuthGet(`notificationsettings/getbyuser/${this.state.userId}`)
        .then(res => {
          if(!res.success || !res.result.items)
          {
            return
          }

          this.setState({...res.result.items[0],loading:false})
        })
        .catch(err => {
            console.log('ERRO GET NOTIFICATIONS ', err)
            if(!err || !err.response.data || !err.response.data.success)
            {
                return
            }

            if(err.response.data && err.response.data.result && err.response.data.result.items == null){
                let newData = {
                    userId: parseInt(this.state.userId),
                    website: true,
                    email: true,
                    app: true
                }
                this.service.ApiPosts('notificationsettings',newData)
                    .then(res => {
                        if(!res.success || !res.result.items || res.result.items.length == 0)
                        {
                            return
                        }
                        this.setState({...res.result.items[0]})
                    })  
                    .catch(e => { console.log(e) })
            }
        })
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        let newstate = this.state
        newstate[name] = value
        let newData = {
            id: this.state.id,
            userId: this.state.userId,
            website: newstate.website,
            email: newstate.email,
            app: newstate.app
        }

        this.setState({  
            loading: true,
            website: newstate.website,
            email: newstate.email,
            app: newstate.app 
        }, () => {
                return this.service.ApiPut('notificationsettings',newData)
                .then(res => {
                    if(!res.success || !res.result.items || res.result.items.length == 0)
                    {
                        return
                    }
                    //TODO review if necessary or dont have problem
                    this.setState({...res.result.items[0], loading: false})
                })  
                .catch(e => { console.log(e) })
            })
    }

    render() {
        const { t } = this

        return (
            <div className="view">    
            <SideMenu />
            <section>
            {
                this.state.loading &&
                <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
            } 
                <Header/>  
                <div className="toptitle">      
                    <img src={Myaccount} alt={t('MANAGE_ACCOUNT_TITLE')}/>    
                    <h1>{t('MANAGE_ACCOUNT_TITLE')}</h1>                   
                </div> 
                <Manage>                            
                    <div className="container">                    
                    <div className="tabs">
                        <ManageAccountTabs/>
                        <div className="tab-content">  
            <div className="box">
                { this.state.loading &&
                    <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
                }
                <div className="infoNotification">
                    <div>
                        <h2>{this.t('NOTIFICATION_TITLE')}</h2>
                    </div>
                    <ul>
                        <li>
                            <span style={{marginTop: '-26px', marginRight: '10px',fontWeight: 'bold'}}>{this.t('WEBSITE')}</span>
                            <div className="switch__container addInput">
                                <input 
                                    id="switch-shadow" 
                                    className="switch switch--shadow"
                                    type="checkbox"
                                    name="website"
                                    checked={this.state.website}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="switch-shadow"><span>{this.state.website ? this.t('BTN_YES') : this.t('BTN_NO') }</span></label>
                            </div>
                        </li>
                        <li>
                            <span style={{marginTop: '-26px', marginRight: '10px',fontWeight: 'bold'}}>{this.t('EMAIL')}</span>
                            <div className="switch__container">
                                <input 
                                    id="switch-shadow2" 
                                    className="switch switch--shadow2" 
                                    type="checkbox"
                                    name="email"
                                    checked={this.state.email}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="switch-shadow2"><span>{this.state.email ? t('BTN_YES') : t('BTN_NO') }</span></label>
                            </div>
                        </li>
                        <li>
                            <span style={{marginTop: '-26px', marginRight: '10px',fontWeight: 'bold'}}>{this.t('APP')}</span>
                            <div className="switch__container">
                                <input 
                                    id="switch-shadow3" 
                                    className="switch switch--shadow2" 
                                    type="checkbox"
                                    name="app"
                                    checked={this.state.app}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="switch-shadow3"><span>{this.state.app ? t('BTN_YES') : t('BTN_NO') }</span></label>
                            </div>
                        </li>
                    </ul>
                    
                </div>
                
            </div>     
            </div> 
            </div>  
                </div>                            
            </Manage>                        
        </section>               
    </div>                         
        );
    }
}

NotificationAccount.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}
  
 export default translate('translations')(NotificationAccount)
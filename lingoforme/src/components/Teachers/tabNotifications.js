import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
            loading: false
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
          if(!res.success || !res.result.items || res.result.items.length == 0)
          {
            return
          }

          this.setState({...res.result.items[0]})
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
            <div className="box">
                {
                    this.state.loading &&
                    <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
                }
                <div className="infoNotification">
                    <div>
                        <h2>{this.t('NOTIFICATION_TITLE')}</h2>
                    </div>
                    
                    <ul className='ulcl'>
                        <li>
                            <span>{this.t('WEBSITE')}</span>
                            <div className="switch__container">
                                <input 
                                    id="switch-shadow" 
                                    className="switch switch--shadow2"
                                    type="checkbox"
                                    name="website"
                                    checked={this.state.website}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="switch-shadow">{this.t('YES')}</label>
                            </div>
                        </li>
                        <li>
                            <span>{this.t('EMAIL')}</span>
                            <div className="switch__container">
                                <input 
                                    id="switch-shadow2" 
                                    className="switch switch--shadow2" 
                                    type="checkbox"
                                    name="email"
                                    checked={this.state.email}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="switch-shadow2">{this.t('YES')}</label>
                            </div>
                        </li>
                        <li>
                            <span>{this.t('APP')}</span>
                            <div className="switch__container">
                                <input 
                                    id="switch-shadow3" 
                                    className="switch switch--shadow2" 
                                    type="checkbox"
                                    name="app"
                                    checked={this.state.app}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="switch-shadow3">{this.t('YES')}</label>
                            </div>
                        </li>
                    </ul>
                    
                </div>
                
            </div>            
        );
    }
}

NotificationAccount.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}
  
 export default translate('translations')(NotificationAccount)
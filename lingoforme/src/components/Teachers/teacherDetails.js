import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Tabs from '../_common/Tabs/tabs';

import ManageAccount from './tabManageAccount';
import LevelScoreAccount from './tabLevelScore';
import PlansAccount from './tabPlans';
import NotificationAccount from './tabNotifications';
import AvailableHoursAccount from './tabAvailableHours';

import AuthService from '../_api/AuthService'
import Services from '../_api/Services'

import { translate } from 'react-i18next'
import { Manage } from './Styles'

let DateTimeFormat = global.Intl.DateTimeFormat;

class IndexTeacherManagement extends Component {
    constructor (props) {
        super(props)
    
        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        let userProfile = this.service.getProfile()
        this.state = {
            //role: userProfile.role
            role : 'user',
            activeTab : this.t('PERSONAL_INFO'),
            paypalStatus: ''
        }
    }

    

    componentWillMount () {
        let paypalToken = queryString.parse(this.props.location.search).token
        let paypalStatus = queryString.parse(this.props.location.search).status
        let userProfile = this.service.getProfile()
        if(paypalStatus !== undefined && paypalToken !== undefined && userProfile.role == 'student') {
            this.service.noAuthGet(`subscriptions/confirmSubscription?token=${paypalToken}`)
                .then(res => {
                    this.state = {
                        paypalStatus: paypalStatus,
                        activeTab : this.t('PLANS'),
                        role: userProfile.role
                    }
                })
                .catch(err => console.log('ERRO GET USERS ', err))             
        }else{
            this.state = {
                role: userProfile.role
            }
        }
    }

    render() {
        const { t } = this        

        return (           
            <div className="view">                
                <SideMenu />                 

                <section>
                    <Header title={t('MANAGE_ACCOUNT_TITLE')}/>   
                    <Manage>                            
                        <div className="container">
                            <Tabs activeTab={this.state.activeTab}>
                                <section label={t('PERSONAL_INFO')}>
                                    <ManageAccount />                     
                                </section> 

                                {this.state.role === 'student' &&
                                    <section label={t('PLANS')}>
                                        <p>Nada para mostrar</p>
                                    </section>
                                }  

                                {this.state.role === 'student' &&
                                    <section label={t('LEVEL_SCORE')}>
                                        <p>Nada para mostrar</p>
                                    </section>
                                }

                                { this.state.role === 'student' &&
                                    <section label={t('NOTIFICATION')}>
                                        <p>Nada para mostrar</p>
                                    </section>
                                } 

                                { this.state.role === 'teacher' &&
                                    <section label={this.t('MANAGE_AVAILABLE_HOURS')}>
                                        <p>Nada para mostrar</p>
                                    </section>                                    
                                } 
                            </Tabs>                                    
                        </div>                            
                    </Manage>                        
                </section>               
            </div>
        );
    }
}

IndexTeacherManagement.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
  }
  
 export default translate('translations')(IndexTeacherManagement)
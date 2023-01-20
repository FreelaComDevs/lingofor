import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import Services from '../_api/Services'
import { Tab } from './styles'

class ManageStudentTabs extends Component {
    constructor (props) {
        super(props)
    
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()
        const pathname = window.location.pathname 
        const studentId = this.props.studentId
        const rootpath = '/manage-student/'+studentId

        var tabs = [
            {
                class: pathname === rootpath+'/subscription' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: this.t('SUBSCRIPTION'),
                link: rootpath+'/subscription'
            }, {
                class: pathname === rootpath+'/plan' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: this.t('PLANS'),
                link: rootpath+'/plan'
            },{
                class: pathname === rootpath+'/class' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: this.t('CARD_PLAN_CLASS'),
                link: rootpath+'/class'
            },{
                class: pathname === rootpath+'/levelscore' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: this.t('LEVEL_SCORE'),
                link: rootpath+'/levelscore'
            }, {
                class: pathname === (rootpath+'/teacher') ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: this.t('ITEM_TEACHERS'),
                link: rootpath+'/teacher'
            },{
                class: pathname === rootpath+'/ticket' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: this.t('TICKETS'),
                link: rootpath+'/ticket'
            }
        ]

        let user = this.service.getProfile() 
        if(user.role === 'customerService' || user.role === 'companyManager' || user.role === 'coordinator' )
        {
            tabs.unshift({
                class: pathname === rootpath ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: this.t('PERSONAL_INFO'),
                link: rootpath
            })
        }

        this.state = {
            tabs:tabs
        }
    }

    render() {
        const { t } = this        

        return (    
            <Tab>    
            <div className="tabs">                
                <ol className="tab-list">
                    <div className="tab-content">
                        {this.state.tabs.map((tab,index) => {
                            return  <Link key={index} to={{ pathname: tab.link }}><li className={tab.class}>{tab.name}</li></Link>
                        })}
                    </div>
                </ol> 
            </div>
            </Tab>    
        );
    }
}

ManageStudentTabs.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}
  
export default translate('translations') (ManageStudentTabs)


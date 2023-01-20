import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import Services from '../_api/Services'

class ManageAccountTabs extends Component {
    constructor (props,context) {
        super(props,context)
    
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()
        var pathname = window.location.pathname       
        let user = this.service.getProfile() 

        var tabs = [{
            class: pathname === '/manage-account' ? 'tab-list-item tab-list-active' : 'tab-list-item',
            name: 'PERSONAL_INFO',
            link: '/manage-account'
        }]

        if(user.role === 'student'){
            tabs.push({
                class: pathname === '/manage-account/plan' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: 'PLANS',
                link: '/manage-account/plan'
            })
            tabs.push({
                class: pathname === '/manage-account/levelscore' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: 'LEVEL_SCORE',
                link: '/manage-account/levelscore'
            })
            tabs.push({
                class: pathname === '/manage-account/notification' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: 'NOTIFICATION',
                link: '/manage-account/notification'
            })
        }
        if(user.role === 'teacher'){
            tabs.push({
                class: pathname === '/manage-account/availablehour' ? 'tab-list-item tab-list-active' : 'tab-list-item',
                name: 'MANAGE_AVAILABLE_HOURS',
                link: '/manage-account/availablehour'
            })
        }

        this.state = {
            pathname :  pathname,
            tabs:tabs
        }
    }

    render() {
        const { t } = this        

        return (       
            <ol className="tab-list">
                <div className="tabsContent">
                    {this.state.tabs.map((tab,index) => {
                        return  <Link key={index} to={{ pathname: tab.link }}><li className={tab.class}>{t(tab.name)}</li></Link>
                    })}
                </div>
            </ol> 
        );
    }
}

ManageAccountTabs.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object,
    router: PropTypes.object
}
  
export default translate('translations') (ManageAccountTabs)


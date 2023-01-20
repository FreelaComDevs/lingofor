import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AuthService from '../_api/AuthService'
import Services from '../_api/Services'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import RatingStudent from './rating'

import { StudentManagementCss , DivTickets } from './styles'
import Moment from 'react-moment'

import { FlagIcon } from "react-flag-kit";
import { translate } from 'react-i18next'
import Loading from 'react-fullscreen-loading'
import UsersIcon from '../../images/icons/icon_students_header.svg'
class TicketStudent extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            id : 0,
            studentId:0,
            loading: true,
            tickets: []
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        this.userId = this.props.match.params.id

        this.callApi = this.callApi.bind(this)
    }

    componentWillMount () {
        this.callApi(true)       
    }

    callApi () {
        this.service.get(`tickets?creatorUserId=${this.userId}&orderByDesc=creatorUserId`)
        .then(res => {
            if(!res.success || !res.result.items)
            {
                return
            }

            this.setState({ tickets: res.result.items, loading: false})
        })
        .catch(err => {
            console.log('ERRO GET tickets ', err.response)
            this.setState({ tickets: [], loading: false})
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
                <img src={UsersIcon} alt="UsersIcon" />    
                <h1>{this.t('ITEM_STUDENTS')}</h1>                   
            </div>            
            <RatingStudent userId={Number(this.userId)}/>
            <StudentManagementCss>                           
                <div className="container">                    
                    <div className="tabs">
                        <ManageAccountTabs studentId={this.userId}/>
                        <DivTickets>  
                        <div className="tab-content">
                            <br/><br/>
                            {  this.state.tickets.map((ticket) => (
                                <div key={ticket.id} className="boxRow">
                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('TICKET_ID')}</label>
                                            <span>{ticket.id}</span>
                                        </div>
                                    </div>
                                
                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('STATUS')}</label>
                                            <span className={(ticket.active) ? 'active' : 'deactive'}>{(ticket.active) ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('TITLE')}</label>
                                            <span>{ticket.title}</span>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('TYPE')}</label>
                                            <span>{ticket.ticketType ? ticket.ticketType.nameEnglish : ''}</span>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('SUBTYPE')}</label>
                                            <span>{ticket.ticketSubType ? ticket.ticketSubType.nameEnglish : ''}</span>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('OPEN_DATE')}</label>
                                            <span><Moment format="YYYY/MM/DD • hh:mm">{ticket.createdAt}</Moment></span>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="boxColumn">                                        
                                            <label>Last Interaction</label>
                                            <span><Moment format="YYYY/MM/DD • hh:mm">{ticket.updatedA}</Moment></span>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="boxColumn">
                                            <div className="status">
                                                <Link to={`/customer-service/`+ticket.id}>
                                                    <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                </Link>  
                                            </div>                  
                                        </div>
                                    </div>

                                                 

                                </div>
                            ))}

                            { this.state.tickets.length === 0 &&
                                <div align='center'>
                                    <h4 style={{fontSize: '24px', fontFamily: 'Quicksand', fontWeight: '500', color:'#797881',  margin: '20px'}}>No results</h4>
                                </div>
                            }

                        </div> 
                        </DivTickets>  
                    </div> 
                </div>
            </StudentManagementCss>                             
        </section>               
    </div>                  
        )
    }
}

TicketStudent.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
  }
  
 export default translate('translations')(TicketStudent)

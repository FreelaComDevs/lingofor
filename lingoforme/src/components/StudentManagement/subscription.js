import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AuthService from '../_api/AuthService'
import Services from '../_api/Services'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import RatingStudent from './rating'

import { StudentManagementCss , DivSubscription } from './styles'
import Moment from 'react-moment'

import { FlagIcon } from "react-flag-kit";
import { translate } from 'react-i18next'
import Loading from 'react-fullscreen-loading'
import UsersIcon from '../../images/icons/icon_students_header.svg'

class StudentSubscription extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            id : 0,
            studentId:0,
            loading: true
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
        this.service.noAuthGet(`studentplans/getbyuserid/${this.userId}`)
        .then(res => {
           
            if(!res.success || !res.result.items || res.result.items.length === 0)
            {
                this.setState({ student: null ,contractStudents: null , loading: false})
            }else{
                let student = {
                    active : res.result.items[0].student.active,
                    updatedAt : res.result.items[0].student.updatedAt,
                    createdAt: res.result.items[0].student.createdAt,
                    democlass: '-',
                    idiomaLevel: res.result.items[0].studentPlanLanguages,
                    plans: res.result.items[0].plan
                }
        
                let contractStudents = undefined
                if(res.result.items[0].student.contractStudents && res.result.items[0].student.contractStudents.length > 0){
                    contractStudents = res.result.items[0].student.contractStudents[0]
                }
                this.setState({ student: student, contractStudents: contractStudents , loading: false})
            }           
        })
        .catch(err => console.log('ERRO GET USERS ', err))
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
                        <DivSubscription>  
                        <div className="tab-content">
                            {this.state.student && 
                                <div className="boxRow">
                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('STATUS')}</label>
                                            <span className={(!this.state.student.active) ? 'deactive' : 'active'}>{(this.state.student.active) ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </div>
                                
                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('STATUS_CHANGE')}</label>
                                            <span><Moment format="YYYY/MM/DD">{this.state.student.updatedA}</Moment></span>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('SUBSCRIPTION_DATE')}</label>
                                            <span><Moment format="YYYY/MM/DD">{this.state.student.createdAt}</Moment></span>
                                        </div>
                                    </div>
                                    <div className="item ">
                                        <div className="boxColumn">
                                            <label>{t('DEMO_CLASS')}</label>
                                            <span>{this.state.student.democlass}</span>
                                        </div>
                                    </div>
                                    <div className="item ">
                                        <div className="boxColumn">
                                            <label>{t('LANGUAGE_LEVEL')}</label>
                                            <span>
                                                {
                                                    this.state.student && this.state.student.idiomaLevel.map((item, index) => {
                                                       
                                                        return(index > 0 ? ', ' + item.studentLanguageLevel : '' + item.studentLanguageLevel)
                                                    })
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }

                            { this.state.contractStudents && 
                                <div className="boxRow">
                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>B2B</label>
                                            <span>{ this.state.contractStudents.contract.active ? t('BTN_YES') :  t('BTN_NO')}</span>
                                        </div>
                                    </div>
                                
                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('COMPANY')}</label>
                                            <span>{ this.state.contractStudents.contract.company.socialName }</span>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('CONTRACT')} #</label>
                                            <span>{ this.state.contractStudents.id}</span>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="boxColumn">
                                            <label>{t('EXPIRES_ON')}</label>
                                            <span><Moment format="YYYY/MM/DD">{this.state.contractStudents.contract.endDate}</Moment></span>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="boxColumn">
                                            <Link to={`plan`}>
                                                <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                            </Link>  
                                        </div>
                                    </div>                                   
                                </div> 
                            }
                            
                            { this.state.student && !this.state.student.plans && 
                                <div className="boxRow boxColumn">Student hasn't finalized a subscription!</div> 
                            }

                        </div> 
                        </DivSubscription>  
                    </div> 
                </div>
            </StudentManagementCss>                             
        </section>               
    </div>                  
        )
    }
}

StudentSubscription.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
  }
  
 export default translate('translations')(StudentSubscription)

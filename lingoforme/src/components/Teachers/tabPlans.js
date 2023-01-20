import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AuthService from '../_api/AuthService'
import Services from '../_api/Services'

import IconPricing from '../../images/sign-up/icon_pricing_world_blue.svg'
import { FlagIcon } from 'react-flag-kit';
import IconsLingo from '../_common/iconsLingo/iconsLingo'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import moment from 'moment'
import timezone from 'moment-timezone'
import { translate } from 'react-i18next'
import { Manage, Billing } from './Styles'
import BuyPlan from './BuyPlan';

class PlansAccount extends Component {
    constructor (props) {
        super(props)
        
        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        this.callApi = this.callApi.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.tooglePaymentHistory = this.tooglePaymentHistory.bind(this)

        this.listPlans = this.listPlans.bind(this)
        this.selectPlan = this.selectPlan.bind(this)
        this.swapPlans = this.swapPlans.bind(this)
        this.returnToTab = this.returnToTab.bind(this)

        
        this.state = {
            id: 0,            
            showPlan: true,
            showBuy: false,
            editPlan: false,
            showPaymentHistories: false,
            userPlans: [],
            historyPlan : [],
            planByCountry: [],
            lingoLanguages:[],
            selectedPlanName:'',
            lingoLanguageId: 1,
            countries: [],
            countryId: 212,            
            loading: this.loadingStatus,
            loading: false,
            selectedPlanId: 1,
            selectedPlan : {},
            planLanguages: {},
            studentData: this.defaultStudentData,
            paypalURL: this.paypalSession,
            selectedPlan: {},
            editedPlans:[],
            failed: false,
            step: 0,
            paypalStatus: this.props.PaypalStatus
        }
    }

    componentWillMount () {
        let user = this.service.getProfile() 

        this.setState({ id: user.id }, () => {
            if (this.state.id > 0) {
                this.callApi(true)
            }
            return
        })     
    }

    callApi (loadfull) {      
                
            this.service.noAuthGet(`studentplans/getbyuserid/${this.state.id}`)
            .then(res => {

                // if(levelGrade.length > 0){
                //     res.result.items.map((item)=>{
                //         item.studentPlanLanguages.map((lang)=>{
                //             let level = levelGrade.filter((level) => level.lingoLanguageId == lang.lingoLanguageId)
                //             if(level.length > 0)
                //                 lang.level = level[0].level.level
                //         })
                //     })
                // }
                let userPlans = res.result.items
                userPlans.map((item)=>{
                    item.edit = false
                    let levels =  item.student.studentLevelGrades
                    item.studentPlanLanguages.map((studentPlanLang) => {
                        let level = levels.filter((level) => level.lingoLanguageId == studentPlanLang.lingoLanguageId)
                        if(level.length > 0){
                            studentPlanLang.level = level[0].level.level
                        }
                    })
                })
                
                
                if(this.state.paypalStatus) {
                    this.setState({ 
                        userPlans : userPlans,
                        showPlan: false,
                        showBuy: true,
                        editPlan: false,
                        showPaymentHistories: false,
                        step: 4
                    })
                }else {
                    this.setState({ 
                        userPlans : userPlans,
                        showPaymentHistories:false, 
                        editPlan: false,
                        showPlan: true,
                        showBuy: false ,
                        step: 0
                    })
                }
            })
            .catch(err => console.log('ERRO GET studentplans ', err)) 

            

            
            // sort the data by date using moment.js
            // seriesRawDataArray.sort(function (left, right) {
            //     return moment.utc(left.createdAt).diff(moment.utc(right.createdAt))
            // });
 
        if(loadfull){
            //Usado para carrega o combo de idiomas e complementar o request
            this.service.get(`lingolanguages/getall`)
            .then(res => {
                console.log('lingolanguages/getall',   res.result.items)
                
                this.setState({
                    lingoLanguages: res.result.items
                })
            })
            .catch(err => {
                console.log('ERROR GET PLANS ', err)
            })
            
            //talvez faça sentido deixar no load para poder pegar apenas o ID na volta do chooseplan
            //Obter o CountryId do User
            this.service.get(`planprices/getByCountry/${this.state.countryId}`)
            .then(res => {
                console.log('listPlans planprices/getByCountry/',   res.result.items)
                
                this.setState({
                    planByCountry: res.result.items
                })
            })
            .catch(err => {
                console.log('ERROR GET PLANS ', err)
            })

            // let plans = [{"planId":19,"nameEnglish":"Limited 8 One-Lingo","nameSpanish":"Limited 8 One-Lingo","namePortuguese":"Limited 8 One-Lingo","descriptionEnglish":"Choose one language: Portuguese, Spanish or English","descriptionSpanish":"Escoja un idioma: Inglés, Portugués o Español ","descriptionPortuguese":"Escolha um idioma: Inglês, Espanhol ou Português","totalClasses":16,"unlimited":false,"priceId":8,"baseValue":124.99,"discount":89.99,"value":28,"bestSeller":true},{"planId":35,"nameEnglish":"Plan Test INSERT","nameSpanish":"Plan Test INSERT","namePortuguese":"Plan Test INSERT","descriptionEnglish":"Plan Test INSERT","descriptionSpanish":"Plan Test INSERT","descriptionPortuguese":"Plan Test INSERT","totalClasses":0,"unlimited":true,"priceId":22,"baseValue":200.03,"discount":0,"value":200.03,"bestSeller":true},{"planId":1,"nameEnglish":"Limited 4 One-Lingo","nameSpanish":"Limited 4 One-Lingo","namePortuguese":"Limited 4 One-Lingo","descriptionEnglish":"Descrição em inglês","descriptionSpanish":"Descrição em espanhol","descriptionPortuguese":"Descrição em português","totalClasses":8,"unlimited":false,"priceId":2,"baseValue":69.43,"discount":49.99,"value":28,"bestSeller":true}]
            // this.setState({
            //     planByCountry: plans
            // })
        }
    }
    
    tooglePaymentHistory (e,planId, show) {
        e.preventDefault()
        if(show && planId){            
            this.setState({ 
                historyPlan : this.state.userPlans.filter((plan) => plan.id == planId)[0].studentPlanPayments, 
                selectedPlanName: this.state.userPlans.filter((plan) => plan.id == planId)[0].plan.nameEnglish,
                showPaymentHistories:true,
                showPlan: false,
            })
        }else{
            this.setState({
                showPaymentHistories: false,
                showPlan: true,
                showBuy: false,
                editPlan: false
            })
        }
    }

    listPlans (e,upgrade) {
        e.preventDefault()

        this.setState({
            showPaymentHistories: false,
            showPlan: false,
            showBuy: true,
            editPlan: false
        })
    }
      
    selectPlan (e,targetPlan) {
        let plans = this.state.userPlans
        plans.map((plan)=>{
            if(plan.id === targetPlan)
                plan.edit = true
        })

        this.setState({
            userPlans: plans,
            showPaymentHistories: false,
            showPlan: true,
            showBuy: false,
            editPlan: true
        })
    }

    swapPlans (targetPlan) {
        let newPlan = this.state.planByCountry[targetPlan]
        console.log('swapPlans',this.state.planByCountry[targetPlan])
        
        this.setState({
            showPaymentHistories: false,
            showPlan: false,
            showBuy: false,
            editPlan: false,
            selectedPlan : newPlan
        })
    }

    returnToTab () {
        this.setState({
            showPaymentHistories: false,
            showPlan: true,
            showBuy: false,
            editPlan: false
        })
    }
    


    handleChange (e,studentPlanLanguageid) {
        console.log('handleChange',studentPlanLanguageid,e.target.name,e.target.value )
        let userPlans = this.state.userPlans
        userPlans.map(function (plan,i) {
            plan.studentPlanLanguages.map(function(planLang,index) {
                if(planLang.id == studentPlanLanguageid){                
                    planLang[e.target.name] = e.target.value  
                    planLang['edited'] = true                 
                }    
            })                    
        })

        this.setState({
            userPlans : userPlans
        }); 
    }
      
    handleSubmit (e, submit) {
        e.preventDefault()
        console.log('handleSubmit',submit)
        if(submit){
            let changedPlanLanguage = []
            let studentId = this.state.userPlans[0].studentId
            this.state.userPlans.map(function (plan,i) {
                plan.studentPlanLanguages
                .filter((lang) => lang.edited === true)
                .map(function(planLang,index) {
                    changedPlanLanguage.push({
                        id : planLang.id,
                        studentPlanId:  planLang.studentPlanId,
                        studentId : studentId,
                        lingoLanguageId : planLang.lingoLanguageId,
                        focus: planLang.focus,
                        struct : planLang.struct,
                        randomFixedTeachers: planLang.randomFixedTeachers
                    })
                })                    
            })

            if(changedPlanLanguage.length > 0){
                this.service.ApiPut(`accountManagement/updateMultipleStudentPlanLanguage`,changedPlanLanguage)
                .then(res => {
                    this.callApi(true)
                })
                .catch(err => {
                    console.log('ERROR GET PLANS ', err)
                })
            }else{
                this.callApi(true)
            }
        }else
        {
            //DEVMIND Ainda não estou totamente decidido quanto a isso
            this.callApi(true)
        }
    }


    render() {
        const { t } = this

        return (
            <div>
                { this.state.showPlan &&
                    <div className="planBox">
                        {this.state.userPlans.map((studentPlan,planIndex) => {
                            return <div className="box" key={'plan'+planIndex}>
                            <div className="PlansBox">
                                <div className="plans">
                                    <img src={IconPricing} alt="" width="40" height="40" />
                                    <div className="changePlan">
                                        <h2>{studentPlan.plan.nameEnglish}</h2>
                                        {studentPlan.studentPlanPayments.length > 0 
                                            && moment() < moment(studentPlan.studentPlanPayments[0].policyUnlockUpgradeDate) 
                                            && <button onClick={(e) => this.listPlans(e, true)}>Upgrade <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                        }
                                        {studentPlan.studentPlanPayments.length > 0 
                                            && moment() < moment(studentPlan.studentPlanPayments[0].policyUnlockDowngradeDate) 
                                            && <button onClick={(e) => this.listPlans(e, false)}>Downgrade <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                        }
                                    </div>
                                </div>
                                <div className="plans"> 
                                    <div className="controlPlan"> 
                                        <div className="infos">                         
                                            <h2>{t('SCHEDULING_CONTROL').toUpperCase()}</h2>
                                            <h3>{t('RESETS_ON')} {moment(studentPlan.studentPlanPayments.providerNextCycleDate).format('MMM d')}</h3>
                                        </div>
                                        <div className="numbers">
                                            <span>{(parseInt(studentPlan.availableClasses)/parseInt(studentPlan.plan.totalClasses))*100 } %</span>
                                            <span>{studentPlan.availableClasses}/{studentPlan.plan.totalClasses} classes</span>
                                        </div>
                                    </div>
                                    <div className="stock">
                                        <hr/>
                                        <span>You have <strong>{parseInt(studentPlan.plan.totalClasses)-parseInt(studentPlan.availableClasses)} extra classes</strong> in stock</span>
                                    </div>
                                </div>
                                {studentPlan.studentPlanPayments.length > 0 &&
                                    <div className="pagamento">
                                        <div className="plans">
                                            <div className="payment">
                                                <h2>{t('PAYMENT_METHOD').toUpperCase()}</h2>
                                                <h3>{studentPlan.studentPlanPayments[0].provider}</h3>
                                                {/* <button>Change</button> */}
                                            </div>
                                        </div>
                                        <div className="plans"> 
                                            <div className="value">                           
                                                <h2>{t('VALUE').toUpperCase()}</h2>
                                                <h3>U$ {studentPlan.studentPlanPayments[0].finalPrice}</h3>
                                                <a onClick={(e) => this.tooglePaymentHistory(e, studentPlan.id,true)}>
                                                    <button>{t('BILLING_HISTORY')}</button>
                                                </a>                                    
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="plans">                            
                                    <button onClick={(e) =>  this.selectPlan(e,studentPlan.id)}>View Details <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <hr/>
                            { studentPlan.studentPlanLanguages.map((studentPlanLanguage,index) => {
                                return <div key={index} className="PlansBox">                             
                                    <div className="plans">
                                        <div className="payment">                                    
                                            <h2>LINGO</h2>
                                            { !studentPlan.edit ?
                                                (<h3><FlagIcon code={studentPlanLanguage.lingoLanguage.flag} /> {studentPlanLanguage.lingoLanguage.description}</h3>) :
                                                (<Select
                                                    name="lingoLanguageId"
                                                    value={studentPlanLanguage.lingoLanguageId}
                                                    onChange={(e) => this.handleChange(e,studentPlanLanguage.id)}
                                                    className='input-lingo'
                                                    inputProps={{ name:'lingoLanguageId'}}
                                                    disableUnderline
                                                    >
                                                    {this.state.lingoLanguages.map((item,index) => {
                                                        return <MenuItem key={index} value={item.id}><FlagIcon code={item.flag} />{item.description}</MenuItem>
                                                    })}
                                                </Select>)
                                            }
                                        </div>
                                    </div>
                                    <div className="plans">
                                        <div className="payment">
                                            <h2>COURSE FOCUS</h2>
                                            { !studentPlan.edit?
                                                (<h3>{studentPlanLanguage.focus}</h3>) :
                                                (<select
                                                    name='focus'                                      
                                                    value={studentPlanLanguage.focus}
                                                    onChange={(e) => this.handleChange(e,studentPlanLanguage.id)}
                                                    required                                          
                                                >   
                                                    <option value={'business'}>{t('PLAN_BUSINESS')}</option>
                                                    <option value={'traditional'}>{t('PLAN_TRADITIONAL')}</option>
                                                    
                                                </select>)
                                            }
                                        </div>
                                    </div>
                                    <div className="plans">
                                        <div className="payment">
                                            <h2>STRUCTURE </h2>
                                            { !studentPlan.edit ?
                                                (<h3>{studentPlanLanguage.struct}</h3>) :
                                                (<select
                                                    name='struct'
                                                    id='struct'                                            
                                                    value={studentPlanLanguage.struct}
                                                    onChange={(e) => this.handleChange(e,studentPlanLanguage.id)} 
                                                    required 
                                                >
                                                    <option value={'conversational'}>{t('PLAN_CONVERSATIONAL')}</option>
                                                    <option value={'grammatical'}>{t('PLAN_GRAMMAR')}</option>                                                    
                                                    <option value={'balanced'}>{t('PLAN_BALANCED')}</option>
                                                </select>)
                                            }
                                        </div> 
                                    </div>                                      
                                    <div className="plans last">
                                        <div className="payment">
                                            <h2>MULTIPLE CLASSES</h2>
                                            { !studentPlan.edit ? 
                                                (<h3>{studentPlanLanguage.randomFixedTeachers}</h3>) : 
                                                (<select
                                                    name='randomFixedTeachers'
                                                    id='randomFixedTeachers'                                        
                                                    value={studentPlanLanguage.randomFixedTeachers}
                                                    onChange={(e) => this.handleChange(e,studentPlanLanguage.id)}   
                                                    required
                                                >
                                                    <option value='random'>Random</option>
                                                    <option value='fixed'>Fixed</option>
                                                </select>)
                                            }
                                        </div>   
                                    </div>     
                                    <div className="plans">
                                        <div className="payment">
                                            <h2>LEVEL </h2>
                                            <h3>{studentPlanLanguage.level}</h3> 
                                        </div>   
                                    </div>    
                                </div>
                            })} 
                            {studentPlan.edit &&
                                <div className="PlansBox" style={{marginLeft:'80%'}}>
                                    <div className="buttons">
                                        <button onClick={(e) => this.handleSubmit(e,false)}>{t('BTN_CANCEL')}</button>
                                        <button onClick={(e) => this.handleSubmit(e,true)}>{t('BTN_SAVE')}</button>
                                    </div>
                                </div>
                            }
                            </div>                
                                   
                        })}
                    </div>
                }
                
                { this.state.showPaymentHistories &&
                    <Billing>

                        <div className="box">                                                
                            <div className="topBox">
                                <img src={IconPricing} alt="" width="40" height="40"/>
                                <h2>{this.state.selectedPlanName}</h2>
                            </div>

                            <div className="titleBox">
                                <h2>{t('BILLING_HISTORY')}</h2>
                            </div>
                        </div>
                        { this.state.historyPlan.map((history,index) => { 
                            return (
                                <div key={index} className="box"  style={{marginTop: '-10px'}}>  
                                    <div className="boxInfo">                                                                       
                                        <div className="infoBilling">                            
                                            <h2>{t('DATE')}</h2>
                                            <h3>{moment(history.createdAt).format(t('DATE_FORMAT'))}</h3>
                                        </div>
                                        <div className="infoBilling">                            
                                            <h2>{t('VALUE')}</h2>
                                            <h3><span>{t('MONEY_FORMAT')} {history.finalPrice}</span></h3>
                                        </div>
                                        <div className="infoBilling">                            
                                            <h2>{t('PAYMENT_METHOD')}</h2>
                                            <h3>{history.provider}</h3>
                                        </div>
                                        <div className="infoBilling">                            
                                            <h2>{t('STATUS')}</h2>
                                            <h3><span>{history.status}</span></h3>
                                        </div>                            
                                    </div>
                                </div>)
                            }
                        )}                   
                        
                        <div className="buttons"> 
                            <a onClick={(e) => this.tooglePaymentHistory(e, null,false)}>
                                <button> <i class="fa fa-angle-left" aria-hidden="true"></i>{t('BACK')}</button>
                            </a>
                        </div> 

                    </Billing>                   
                }

                { this.state.showBuy &&
                    <BuyPlan returnToTab={this.returnToTab} PaypalStatus={this.state.paypalStatus} />
                }
            </div>            
        );
    }
}

PlansAccount.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}
  
 export default translate('translations')(PlansAccount)
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import Loading from 'react-fullscreen-loading'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import RatingStudent from './rating'
import { StudentManagementCss, Billing } from './styles'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import IconPricing from '../../images/sign-up/icon_pricing_world_blue.svg'
import { FlagIcon } from 'react-flag-kit'
import UsersIcon from '../../images/icons/icon_students_header.svg'

import Moment from 'react-moment'
import moment from 'moment'
// import timezone from 'moment-timezone'
import { translate } from 'react-i18next'

import cancelImg from "../../images/img-cancel-plan.png";


class PlansAccount extends Component {
    constructor (props) {
        super(props)
        
        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        this.callApi = this.callApi.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCancelPlans = this.handleChangeCancelPlans.bind(this)

        this.tooglePaymentHistory = this.tooglePaymentHistory.bind(this)

        this.listPlans = this.listPlans.bind(this)
        this.selectPlan = this.selectPlan.bind(this)
        this.swapPlans = this.swapPlans.bind(this)
        this.returnToTab = this.returnToTab.bind(this)
        this.userId = this.props.match.params.id

        this.state = {
            id: 0,            
            showPlan: true,
            showBuy: false,
            editPlan: false,
            showPaymentHistories: false,
            userPlans: [],
            historyPlan : [],
            planByLanguage: [],
            lingoLanguages:[],
            selectedPlanName:'',
            lingoLanguageId: 1,
            countries: [],
            countryId: 212,            
            loading: false,
            selectedPlanId: 1,
            selectedPlan : {},
            planLanguages: {},
            selectedPlan: {},
            editedPlans:[],
            failed: false,
            step: 0,
            targetDestiny: '',
            targetPlanId:0,
            paypalStatus: '',
            openalert: false,
            reasonForcancellation: '',
            studentPlanId: 0,
            redirect: false,
            responseError: '',
            sucessMsg: false
        }
    }

    componentWillMount () {
        this.callApi(true) 
    }

    callApi(loadfull) {      
                
            this.service.noAuthGet(`studentplans/getbyuserid/${this.userId}`)
            .then(res => {
                
                let userPlans = res.result.items
                userPlans.map((item)=>{
                    const { availableClasses } = item;
                    const { totalClasses } = item.plan;
                    item.cyclePercentage = 100 - ((availableClasses / totalClasses) * 100);
                    item.edit = false
                    let levels =  item.student.studentLevelGrades
                    item.studentPlanLanguages.map((studentPlanLang) => {
                        let level = levels.filter((level) => level.lingoLanguageId == studentPlanLang.lingoLanguageId)
                        if(level.length > 0){
                            studentPlanLang.level = level[0].level.level
                        }
                    })
                })
                
                
                this.setState({ 
                    userPlans : userPlans,
                    showPaymentHistories:false, 
                    editPlan: false,
                    showPlan: true,
                    showBuy: false ,
                    step: 0,
                    loading:false
                })
            })
            .catch(err => {
                console.log('ERRO GET studentplans ', err)
                this.setState({loading:false})
            }) 

            

            
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
        }
    }
    
    tooglePaymentHistory (e,studentPlanId, planId, show) {
        e.preventDefault()
        if(show && planId){            
            this.getPaymentHistory(studentPlanId, planId)
        }else{
            this.setState({
                showPaymentHistories: false,
                showPlan: true,
                showBuy: false,
                editPlan: false
            })
        }
    }

    getPaymentHistory(studentPlanId,planId) {
        this.service.get(`studentplans/studentplanpayments/getStudentPlanPaymentByStudentAndPlan`,
            { params: { studentId: this.state.userPlans[0].studentId, planId: planId, id: studentPlanId } })
            .then(res => {
                const history = res.result.items;
                
                this.setState({
                    historyPlan: history.length > 0 ?  
                        res.result.items.filter((studentPlan) => studentPlan.studentPlanPayments.length > 0)
                        : [],
                        selectedPlanName: this.state.userPlans.filter((plan) => plan.id == studentPlanId)[0].plan.nameEnglish,
                        showPaymentHistories: true,
                        showPlan: false,                        
                });
                window.scrollTo(0, 0);
            })
            .catch(err => {
                //this.showDialogError(err);
                this.setState({
                    historyPlan: []
                });
            })
    }

    listPlans (e,upgrade, planId) {
        e.preventDefault()
        this.setState({
            targetDestiny: upgrade,
            targetPlanId:planId,
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
        let newPlan = this.state.planByLanguage[targetPlan]
        
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

    
    handleChangeCancelPlans = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }
      
    handleSubmit (e, submit) {
        e.preventDefault()
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
            this.callApi(true)
        }
    }

    handleCancelPlan = (v) => {
        this.setState({
            openalert: true,
            cancelPlan: v
        })
    }


    closeAlert = () => {
        window.parent.location = window.parent.location.href
        this.setState({
            openalert: false,
        })
    }

    _handlerError(v){
        this.setState({responseError: v})
    }
  
    submitCancel = () => {
        this.setState({loading: true})
        const {cancelPlan} = this.state
        const studentPlanId = cancelPlan.studentPlanPayments[0].studentPlanId;

        

        const sendObj = {
            cancelNotes: this.state.reasonForcancellation
        }

        console.log('ID', studentPlanId)

        const urlCancelPlan = `studentplans/${studentPlanId}/cancel`;
        
        this.service.ApiPosts(urlCancelPlan, sendObj)
            .then(res => {
                if(res.status == 200){
                    // let sucessMsg = res.data.result.items[0].items;
                    // sucessMsg = sucessMsg.replace(/\[/g,"").replace(/]/g,""); 
                    // const items = sucessMsg.split("items:");

                   //window.parent.location = window.parent.location.href

                    this.setState({
                        sucessMsg: 'Your plan was cancelled. You can schedule classes until the end of your billing cycle.',
                    })

                    
                }
            }).catch (err => {
                console.log(err);
                if(err.status > 201){
                    let msg =err.data.error.message;
                    msg = msg.replace(/\[/g,"").replace(/]/g,"");
                    const message = msg.split("message:");
                    console.log(message[1]);
                    this._handlerError(message[1] !== undefined ? message[1]  : err.data.error.message );
                }else if(Array.isArray(err.data.error)){
                    this._handlerError(err.data.error[0].message);
                }else{
                    this._handlerError("Make sure all fields are filled in");
                }
     
                this.setState({
                    loading: false
                })
            });
    }

    render() {
        const { t, openalert, closeAlert, reasonForcancellation, handleChange, handleChangeCancelPlans, submitCancel } = this

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
                    
                    <div>                
                        <Dialog
                            open={this.state.openalert === true}
                            onClose={this.closeAlert}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{this.state.alerttitle}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="pass-dialog-description">
                                    {this.state.alertdescription}
                                </DialogContentText>
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeAlert} color="primary" autoFocus>
                            {t('CLOSE')}
                            </Button>
                        </DialogActions>
                        </Dialog>      
                    </div>
                <div className="tabs">
                    <ManageAccountTabs studentId={this.userId}/>
                    <div className="tab-content">
                
                { this.state.showPlan && this.state.userPlans.length > 0 && 
                    <div className="planBox">
                        {this.state.userPlans.map((studentPlan,planIndex) => {
                            console.log(studentPlan)
                             const cancels = studentPlan.studentPlanPayments.find((item) => {
                                return item.providerState === "Cancelled"
                            })

                            const cyclePercentage = parseFloat((studentPlan.availableClasses/studentPlan.plan.totalClasses) * 100) % 1 !== 0 ? parseFloat(100-(studentPlan.availableClasses/studentPlan.plan.totalClasses) * 100).toFixed(2) : parseFloat(100-(studentPlan.availableClasses/studentPlan.plan.totalClasses) * 100);
                            return <div className="box" key={'plan'+planIndex}>
                            <div className="PlansBox">
                                <div className="plans">
                                    <img src={IconPricing} alt="" width="40" height="40" />
                                    <div className="changePlan">
                                        <h2>{studentPlan.plan.nameEnglish}</h2>
                                    </div>
                                </div>


                                    {/* {Planos cancelados} */}
                                    {
                                         
                                         !cancels ?

                                      
                                            <div className="plans"> 
                                                <div className="controlPlan"> 
                                                    <div className="infos">                         
                                                        <h2>{t('SCHEDULING_CONTROL').toUpperCase()}</h2>
                                                        { studentPlan.studentPlanPayments.length > 0 &&
                                                            <h3>{t('RESETS_ON')} <Moment format="YYYY/MM/DD">{studentPlan.studentPlanPayments[0].providerNextCycleDate}</Moment></h3>
                                                        }
                                                    </div>
                                                    { studentPlan.plan.unlimited &&
                                                        <div className="numbers">
                                                            <span><img style={{width: '24px',marginTop:'6px'}} src={require(`../../images/flag_multilingo.png`)} alt='multilingo' /></span>
                                                            <span style={{ color:'#00D36A' }}>Unlimited</span>
                                                        </div>
                                                    } 
                                                    { !studentPlan.plan.unlimited &&
                                                        <div className="numbers">
                                                            <span>{cyclePercentage}%</span>
                                                            <span>{studentPlan.plan.totalClasses - studentPlan.availableClasses}/{studentPlan.plan.totalClasses} classes</span>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="stock">
                                                    { studentPlan.plan.unlimited &&
                                                    <hr  style={{ backgroundColor:'#00D36A' }}/>
                                                    } 
                                                    { !studentPlan.plan.unlimited && 
                                                        <div>
                                                            <hr style={{width: cyclePercentage+'%'}}/>
                                                        </div>
                                                    } 
                                                </div>
                                            </div>
                                        :
                                        
                                        <div className="planCancel">Plan cancelled</div>
    
                                    }
                                    {studentPlan.studentPlanPayments.length > 0 &&
                                        <div className="pagamento">
                                            <div className="plans">
                                                <div className="payment">
                                                    <h2>{t('PAYMENT_METHOD').toUpperCase()}</h2>
                                                    <h3>{studentPlan.studentPlanPayments[0].provider}</h3>
                                                    {/* <button>Change</button> */}
                                                    
                                                    {
                                         
                                                        !cancels ?
                                                            <button onClick={() => this.handleCancelPlan(studentPlan)}>Cancel my plan</button>
                                                    : null
                                                    }
                                                </div>
                                            </div>
                                            <div className="plans"> 
                                                <div className="value">                           
                                                    <h2>{t('VALUE').toUpperCase()}</h2>
                                                    <h3>U$ {studentPlan.studentPlanPayments[0].finalPrice}</h3>
                                                    <a onClick={(e) => this.tooglePaymentHistory(e, studentPlan.id, studentPlan.planId, true)}>
                                                        <button>{t('BILLING_HISTORY')}</button>
                                                    </a>                                    
                                                </div>
                                            </div>
                                        </div>
                                    } 

                            <div className="plans"> 
                                <button onClick={(e) =>  this.selectPlan(e, studentPlan.id)}>View Details <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                            </div>
                            </div>                           
                            <hr/>
                            { studentPlan.studentPlanLanguages.map((studentPlanLanguage,index) => {
                                return <div key={index} className="PlansBox teste">                 
                                    <div className="plans">
                                        <div className="payment">                                    
                                            <h2>{t('CARD_PLAN_COURSE')}</h2>
                                            <h3><FlagIcon code={studentPlanLanguage.lingoLanguage.flag} /> {studentPlanLanguage.lingoLanguage.description}</h3>
                                        </div>
                                    </div>
                                    <div className="plans last">
                                        <div className="payment">
                                            <h2>{t('CARD_PLAN_SCHEDULE')}</h2>
                                            <h3>{studentPlanLanguage.randomFixedTeachers}</h3>
                                        </div>   
                                    </div>     
                                    <div className="plans">
                                        <div className="payment">
                                            <h2>{t('CARD_PLAN_LEVEL')}</h2>
                                            <h3>{studentPlanLanguage.level}</h3> 
                                        </div>   
                                    </div> 

                                    {studentPlan.edit &&
                                        <div className="PlansBox">
                                            <div className="buttons">
                                                <button onClick={(e) => this.handleSubmit(e,false)}>{t('BTN_CANCEL')}</button>
                                                <button onClick={(e) => this.handleSubmit(e,true)}>{t('BTN_SAVE')}</button>
                                            </div>
                                        </div>
                                    }       
                                     
                                </div>
                            })} 
                     
                            </div> 
                        })}
                    </div>                   
                } 
                {
                  this.state.showPlan && this.state.userPlans.length ===0 && <div className="planBox box centered">Student hasn't finalized a subscription!</div>
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
                        { this.state.historyPlan.length > 0 &&
                                                this.state.historyPlan[0].studentPlanPayments.length > 0 &&
                                                this.state.historyPlan[0].studentPlanPayments[0].studentPlanPaymentHistories.map((history, index) => {
                                                return (
                                                    <div key={index} className="box" style={{ marginTop: '-10px' }}>
                                                        <div className="boxInfo">
                                                            <div className="infoBilling">
                                                                <h2>{t('DATE')}</h2>
                                                                <h3>{moment(history.createdAt).format(t('DATE_FORMAT'))}</h3>
                                                            </div>
                                                            <div className="infoBilling">
                                                                <h2>{t('PAYMENT_METHOD')}</h2>
                                                                <h3>{this.state.historyPlan[0].studentPlanPayments[0].provider}</h3>
                                                            </div>
                                                            <div className="infoBilling word-wrap-break">
                                                                <h2>{t('TRANSACTION_ID')}</h2>
                                                                <h3>{this.state.historyPlan[0].studentPlanPayments[0].providerTransactionId}</h3>
                                                            </div>
                                                            <div className="infoBilling">
                                                                <h2>{t('VALUE')}</h2>
                                                                <h3>
                                                                    <span>{t('MONEY_FORMAT')} {this.state.historyPlan[0].studentPlanPayments[0].finalPrice}</span>
                                                                </h3>
                                                            </div>
                                                            <div className="infoBilling">
                                                                <h2>{t('STATUS')}</h2>
                                                                <h3><span>{history.providerState}</span></h3>
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

                </div> 
             </div> 
            </div>          
            </StudentManagementCss>                   
        </section> 

        <Dialog
                open={this.state.openalert}
                onClose={this.closeAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="boxModal"
            >
                <DialogTitle id="pass-dialog-title" className="titleCancelClass"><h2>Cancel plan</h2></DialogTitle>
                    
                    {
                        this.state.responseError !== '' ?
                            <div>
                                <img src={cancelImg} alt="cancelImg" />
                                <div>
                                    <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                                        <h3>{this.state.responseError}</h3>
                                    </div>
                                    <DialogActions className="boxModal">
                                        <Button onClick={this.closeAlert} color="primary" autoFocus>
                                        {t('CLOSE')}
                                        </Button>
                                    </DialogActions>
                                </div>
                            </div>

                            : 

                            <div>
                                {/* <img src={cancelImg} alt="cancelImg" /> */}
                                <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                                    <h3>{this.state.sucessMsg}</h3>
                                </div><br/><br/>

                                {
                                    !this.state.sucessMsg === false &&
                                    <DialogActions className="boxModal">
                                        <Button onClick={this.closeAlert} color="primary" autoFocus>
                                            {t('CLOSE')}
                                        </Button>
                                    </DialogActions>
                                }
                            </div>
                        }

                    {
                        this.state.responseError == '' && this.state.sucessMsg == false ?
                        <div>
                            <DialogContent>
                                <DialogContentText id="pass-dialog-description" className="boxModal">
                                   
                                    <div>
                                        <img src={cancelImg} alt="cancelImg" />

                                        <form className="formulario" className="boxModal">
                                            <h3>We’re sad you are leaving us :(<br/> Why do you want to cancel your plan?</h3>
                                            <span style={{ color: 'red', fontSize: '14px' }}></span>
                                            <textarea
                                                type='text'
                                                placeholder="Please tell us why you want to cancel your plan"
                                                name='reasonForcancellation'
                                                id='reasonForcancellation'
                                                value={reasonForcancellation}
                                                onChange={handleChangeCancelPlans}
                                                required
                                                className="input-lingo inputManage"
                                            />
                                        </form>
                                       
                                    </div>

                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="boxModal">
                            
                                <Button onClick={submitCancel} color="secondary" autoFocus>
                                    Cancel my plan
                                </Button>
                                <Button onClick={this.closeAlert} color="primary" autoFocus>
                                    Ooops! I dont want to cancel my plan
                                </Button>
                               
                            </DialogActions>
                        </div>
                :
                null    
                }
            </Dialog>                     
    </div>          
        );
    }
}

PlansAccount.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}
  
 export default translate('translations')(PlansAccount)

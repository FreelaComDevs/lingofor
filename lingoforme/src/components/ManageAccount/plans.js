import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import Loading from 'react-fullscreen-loading'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import BuyPlan from './buyplan'
import ManageAccountTabs from './tabs'
import BuyExtraClass from './BuyExtraClass'
import { Manage, Billing } from './Styles'
import Myaccount from '../../images/icons/icon_myaccount_header.svg'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconPricing from '../../images/sign-up/icon_pricing_world_blue.svg'
import { FlagIcon } from 'react-flag-kit'
import Moment from 'react-moment'
import moment from 'moment'
import { translate } from 'react-i18next'
import ButtonDriveContent from '../_common/button/ButtonDriveContent';

import cancelImg from "../../images/img-cancel-plan.png";

const textCancelClass = (studentPlan, t, i18n) => {
    const cancels = studentPlan.studentPlanPayments && studentPlan.studentPlanPayments.find((item) => {
        return item.providerState === "Cancelled"
    })
    const hasCancelDate = studentPlan.studentPlanPayments && studentPlan.studentPlanPayments.find((item) => {
        return item.providerCancelDate !== null && item.providerCancelDate !== undefined;
    })
    return(
        hasCancelDate && !cancels?
            <div style={{marginTop:5}}>
                <p style={{color:'#FF5666', fontWeight: '200', fontSize:12}}>
                    {t('YOUR_PLAN')} <span style={{color:'#FF5666', fontWeight: 'bold'}}>{t('CANCELED_CYCLE')}</span> {t('RESET_CYCLE')}
                </p>
             </div>
        :
        <div/>
    )
};

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

        this.handleChangeModal = this.handleChangeModal.bind(this)

        this.state = {
            id: 0,            
            showPlan: true,
            showBuy: false,
            buyExtraClass: false,
            editPlan: false,
            showPaymentHistories: false,
            userPlans: [],
            historyPlan : [],
            planBylanguage: [],
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
            extraClassInfos: "",
            extraClassConfirm: false,
            openalert: false,
            openalertCancel: false,
            reasonForcancellation: '',
            studentPlanId: 0,
            redirect: false,
            responseError: '',
            sucessMsg: false,
            btnCanceledDisable: false
        }
    }
    
    showDialogError = e => {
      const { t } = this.props
      const { message = t('ERROR_MESSAGE') } = e.response.data.error

      this.setState({
        openalert: true,
        alerttitle: t('ERROR_MESSAGE'),
        alertdescription: message
      })
    }

    componentWillMount () {
        let userProfile = this.service.getProfile()
        let paypalToken = queryString.parse(this.props.location.search).token
        let paypalStatus = queryString.parse(this.props.location.search).status        
        let paypalPaymentId = queryString.parse(this.props.location.search).paymentId        
        let paypalPayertId = queryString.parse(this.props.location.search).PayerID  
        let paypalType = queryString.parse(this.props.location.search).type  
              
        if( paypalType === "buynewplan" && userProfile.role == 'student') {
            this.setState({ targetDestiny: 'newplan', targetPlanId:0, showPaymentHistories: false, showPlan: false, showBuy: true, editPlan: false })
            return
        }

        if( paypalType === "extraclass" && paypalPaymentId && paypalPayertId && userProfile.role == 'student') {
            this.setState({ showPlan: false, buyExtraClass: true, extraClassConfirm: true }, () => {
                this.service.ApiPosts("studentplanpartpayments/execute", { providerId: paypalPaymentId, payerId: paypalPayertId })
            })
        }

        if( paypalType === "extraclass" && paypalToken && userProfile.role == 'student') {
            this.setState({ showPlan: false, buyExtraClass: true, extraClassConfirm: true, paypalStatus })
        }

        if(paypalType !== "extraclass" && paypalStatus !== undefined && paypalToken !== undefined && userProfile.role == 'student') {
            this.setState({
                paypalStatus: paypalStatus
            }, () => {
                this.service.noAuthGet(`subscriptions/${paypalStatus}Subscription?token=${paypalToken}`)
            })
        }
       
        this.setState({ id: userProfile.id }, () => {
            if (this.state.id > 0) {
                this.callApi(true)
            }
            return
        })  
    }

    closeAlert = () => {
      this.setState({openalert: false })
    }

    callApi (loadfull) {      
        this.service.noAuthGet(`studentplans/getbyuserid/${this.state.id}`)
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
         

            let planId = queryString.parse(this.props.location.search).planId  
            
            
            if(this.state.paypalStatus && !this.state.extraClassConfirm) {
                this.setState({ 
                    userPlans : userPlans,
                    showPlan: false,
                    showBuy: true,
                    editPlan: false,
                    showPaymentHistories: false,
                    step: 4,
                    loading:false
                })
            } else if(this.state.extraClassConfirm) {
                this.setState({ 
                    userPlans : userPlans,
                    showPlan: false,
                    showBuy: false,
                    editPlan: false,
                    showPaymentHistories: false,
                    buyExtraClass: true,
                    step: 4,
                    loading:false
                })
            } else if ( planId ) {
                const extraClassInfos = userPlans
                .filter( ({plan}) => plan.id === Number(planId) )
                .map( plan => { 
                    const planPrice = plan.studentPlanPayments[0].finalPrice
                    const planClasses = plan.studentPlanPayments[0].studentPlanClasses
                    const extraClassPorcentage = plan.studentPlanPayments[0].price.priceCountry.extraClassPercentage
                    const classPrice = planPrice / planClasses
                    const extraClassPrice = (classPrice * extraClassPorcentage / 100) + classPrice
                    return { 
                    studentPlanId: plan.id,
                    extraClassPrice: Math.floor((extraClassPrice) * 100) / 100,
                    planName: plan.plan.nameEnglish,
                    planLingos: plan.studentPlanLanguages.map( language => { return {
                    flag: language.lingoLanguage.flag,
                    name: language.lingoLanguage.language.name
                    }
                    })
                }})[0]
                
                this.setState({  extraClassInfos, showPlan: false, buyExtraClass: true, loading: false })
            } else {
                this.setState({ 
                    userPlans : userPlans,
                    showPaymentHistories:false, 
                    editPlan: false,
                    showPlan: true,
                    showBuy: false ,
                    step: 0,
                    loading:false
                })
            }
        })
        .catch(err => {
            this.showDialogError(err)
            this.setState({loading:false})
        }) 
 
        if(loadfull){
            //Usado para carrega o combo de idiomas e complementar o request
            this.service.get(`lingolanguages/getall`)
            .then(res => {
                this.setState({
                    lingoLanguages: res.result.items
                })
            })
            .catch(err => {
                this.showDialogError(err)
            })
        }
    }
    
    tooglePaymentHistory (e,studentPlanId, planId, show) {
        e.preventDefault()
        if(show && planId){            
            this.getPaymentHistory(studentPlanId, planId);
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
        this.service.get(`studentplans/${studentPlanId}/studentplanpayments`,
            { params: { studentPlanId: studentPlanId } })
            .then(res => {
                const history = res.result.items;
                
                this.setState({
                    historyPlan: history.length > 0 ?  
                        history : [],
                        selectedPlanName: this.state.userPlans.filter((plan) => plan.id == studentPlanId)[0].plan.nameEnglish,
                        showPaymentHistories: true,
                        showPlan: false,                 
                });
                window.scrollTo(0, 0);
            })
            .catch(err => {
                this.showDialogError(err);
                this.setState({
                    historyPlan: []
                });
            })
    }

    listPlans (e, upgrade, planId) {
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
      
    selectPlan (e, targetPlan) {
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
                    this.showDialogError(err)
                })
            }else{
                this.callApi(true)
            }
        }else
        {
            this.callApi(true)
        }
    }

     showBuyExtraClass = (e, planId) => {
        e.preventDefault()
        const { userPlans } = this.state
        const extraClassInfos = userPlans
            .filter( plan => plan.id === planId )
            .map( plan => { 
              const planPrice = plan.studentPlanPayments[0].price.discount
              const planClasses = plan.studentPlanPayments[0].studentPlanClasses
              const extraClassPorcentage = plan.studentPlanPayments[0].price.priceCountry.extraClassPercentage
              const classPrice = planPrice / planClasses
              const extraClassPrice = (classPrice * extraClassPorcentage / 100) + classPrice
              return { 
                studentPlanId: planId,
                extraClassPrice: Math.floor((extraClassPrice) * 100) / 100,
                planName: plan.plan.nameEnglish,
                planLingos: plan.studentPlanLanguages.map( language => { return {
                    flag: language.lingoLanguage.flag,
                    name: language.lingoLanguage.language.name
                }
              })
            }})[0]
        this.setState({ extraClassInfos, showPlan: false, buyExtraClass: true })
    }

    exitHandle = () => {
        this.setState({
            showPaymentHistories: false,
            showPlan: true,
            showBuy: false,
            editPlan: false,
            buyExtraClass: false,
            extraClassConfirm: false
        }, this.props.history.push("/manage-account/plan"))
    }

    handleCancelPlan = (v) => {
        this.setState({
            openalertCancel: true,
            cancelPlan: v
        })
    }
    
    
    handleChangeModal = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    closeAlert = () => {
        window.parent.location = window.parent.location.href
        this.setState({
            openalertCancel: false,
        })
    }

    _handlerError(v){
        this.setState({responseError: v})
    }

    submitCancel = () => {

        if(this.state.btnCanceledDisable)
            return

        this.setState({loading: true, btnCanceledDisable : true})
        const { t } = this.props        
        const {cancelPlan} = this.state
        const studentPlanId = cancelPlan.studentPlanPayments[0].studentPlanId;

       

        const sendObj = {
            cancelNotes: this.state.reasonForcancellation
        }

        const urlCancelPlan = `studentplans/${studentPlanId}/cancel`;
        
        this.service.ApiPosts(urlCancelPlan, sendObj)
            .then(res => {
                if(res.status == 200){
                    // let sucessMsg = res.data.result.items[0].items;
                    // sucessMsg = sucessMsg.replace(/\[/g,"").replace(/]/g,""); 
                    // const items = sucessMsg.split("items:");

                   //window.parent.location = window.parent.location.href

                    this.setState({
                        loading: false,
                        btnCanceledDisable : false,
                        sucessMsg: t('SUCESS_CANCEL_PLAN'), 
                    })

                    
                }
            }).catch (err => {
                if(err.status > 201){
                    let msg = err.data.error || err.data.error.message;
                    msg = msg.replace(/\[/g,"").replace(/]/g,"");
                    const message = msg.split("message:");
                    this._handlerError(message[1] !== undefined ? message[1]  : msg );
                }else if(Array.isArray(err.data.error)){
                    this._handlerError(err.data.error[0].message);
                }else{
                    this._handlerError("Make sure all fields are filled in");
                }
     
                this.setState({
                    loading: false,
                    btnCanceledDisable : false
                })
            });
    }

    render() {
        const { state, showBuyExtraClass, exitHandle, openalert, openalertCancel, closeAlert, reasonForcancellation, handleChange, handleChangeModal, submitCancel } = this
        const { buyExtraClass, extraClassInfos, extraClassConfirm, paypalStatus } = state
        const {t, i18n} = this.props

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
                    
                    <div>                
                        <Dialog
                            open={this.state.openalert}
                            onClose={this.closeAlert}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            className="boxModal"
                        >
                        <DialogTitle id="alert-dialog-title">{this.state.alerttitle}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="pass-dialog-description">
                                    {this.state.alertdescription}
                                </DialogContentText>
                            </DialogContent>
                        <DialogActions className="boxModal">
                            <Button onClick={this.closeAlert} color="primary" autoFocus>
                            {t('CLOSE')}
                            </Button>
                        </DialogActions>
                        </Dialog>      
                    </div>
                <div className="tabs">
                    <ManageAccountTabs/>
                    <div className="tab-content">

                { buyExtraClass && <BuyExtraClass extraClassInfos={extraClassInfos} extraClassConfirm={extraClassConfirm} exit={exitHandle} paypalStatus={paypalStatus}/> }
               
                {  this.state.showPlan &&
                <div>
                    <div className="planBox">
                        {this.state.userPlans.map((studentPlan,planIndex) => {
                             const cancels = studentPlan.studentPlanPayments.find((item) => {
                                return item.providerState === "Cancelled"
                            })

                            const hasCancelDate = studentPlan.studentPlanPayments.find((item) => {
                                return item.providerCancelDate !== null && item.providerCancelDate !== undefined;
                            })

                            const cyclePercentage = parseFloat((studentPlan.availableClasses/studentPlan.plan.totalClasses) * 100) % 1 !== 0 ? parseFloat(100-(studentPlan.availableClasses/studentPlan.plan.totalClasses) * 100).toFixed(2) : parseFloat(100-(studentPlan.availableClasses/studentPlan.plan.totalClasses) * 100);
                           
                            return <div className="box" key={'plan'+planIndex}>
                            <div className="PlansBox">
                                <div className="plans">
                                    <img src={IconPricing} alt="" width="40" height="40" />
                                    <div className="changePlan">
                                        <h2>{studentPlan.plan.nameEnglish}</h2>
                                        { ( cancels || hasCancelDate) ?
                                                null
                                            :
                                                <div>
                                                    {studentPlan.studentPlanPayments.length > 0 
                                                        && !studentPlan.plan.multiLingo
                                                        && moment() > moment(studentPlan.studentPlanPayments[0].policyUnlockUpgradeDate) 
                                                        && <button onClick={(e) => this.listPlans(e, 'upgrade',studentPlan.id)}>Upgrade <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                    }
                                                    {studentPlan.studentPlanPayments.length > 0 
                                                        && moment() > moment(studentPlan.studentPlanPayments[0].policyUnlockDowngradeDate) 
                                                        && <button onClick={(e) => this.listPlans(e, 'downgrade',studentPlan.id)}>Downgrade <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>

                                {/* {Planos cancelados} */}
                                {
                                         
                                    !cancels ?
                                        
                                        <div className="plans"> 
                                            <div className="controlPlan"> 
                                                <div className="infos">                         
                                                    <h2>{t('SCHEDULING_CONTROL').toUpperCase()}</h2>
                                                    { studentPlan.studentPlanPayments && studentPlan.studentPlanPayments.length > 0 && studentPlan.studentPlanPayments[0].providerNextCycleDate &&
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
                                                        <span>{cyclePercentage} %</span>
                                                        <span>{studentPlan.plan.totalClasses - studentPlan.availableClasses}/{studentPlan.plan.totalClasses} {t('CLASSES')}</span>
                                                    </div>
                                                }                                            
                                            </div>
                                            <div className="stock">
                                                { studentPlan.plan.unlimited &&
                                                <hr style={{ backgroundColor:'#00D36A' }}/>
                                                } 
                                                { !studentPlan.plan.unlimited && 
                                                    <div>
                                                        <hr style={{width: cyclePercentage+'%'}}/>
                                                    </div>
                                                } 
                                                {studentPlan.availablePartClasses > 0 &&
                                                    <div>
                                                        <span>You have <b>{studentPlan.availablePartClasses} extra classes</b> in stock.</span>
                                                    </div>
                                                }
                                            </div>

                                            <div className="stock">
                                                {textCancelClass(studentPlan, t, i18n)}
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
                                                {
                                                    !cancels && !hasCancelDate ? 
                                                        <button  onClick={() => this.handleCancelPlan(studentPlan)}>{t('CANCEL_MY_PLAN')}</button>
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
                                <div className="plans buttons-plans">  
                                    {
                                        !cancels ?                          
                                            <button onClick={(e) =>  this.selectPlan(e, studentPlan.id)}>{t('VIEW_DETAILS')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                        : null
                                    }
                                    { studentPlan.cyclePercentage === 100 && studentPlan.studentPlanPayments.length > 0 && !studentPlan.plan.trial &&
                                        <button className="button-buy-more" onClick={(e) =>  showBuyExtraClass(e, studentPlan.id) }>
                                            {t("BUY_MORE_CLASSES")}
                                        </button> 
                                    }
                                </div>
                            </div>                           
                            <hr/>
                            { studentPlan.studentPlanLanguages.map((studentPlanLanguage,index) => {
                                return <div key={index} className="PlansBox">                 
                                    <div className="plans">
                                        <div className="payment">                                    
                                            <h2>LINGO</h2>
                                            {/* { !studentPlan.edit ?
                                                (<h3><FlagIcon code={studentPlanLanguage.lingoLanguage.flag} /> {t(studentPlanLanguage.lingoLanguage.description.toUpperCase())}</h3>) :
                                                (<Select
                                                    name="lingoLanguageId"
                                                    value={studentPlanLanguage.lingoLanguageId}
                                                    onChange={(e) => this.handleChange(e,studentPlanLanguage.id)}
                                                    disabled={ studentPlan.studentPlanLanguages.length === 1 ? null : true}
                                                    className='input-lingo'
                                                    disableUnderline
                                                    inputProps={{ name:'lingoLanguageId'}}
                                                    >
                                                    {this.state.lingoLanguages.map((item,index) => {
                                                        return <MenuItem key={index} value={item.id}><FlagIcon code={item.flag} />{item.description}</MenuItem>
                                                    })}
                                                </Select>)
                                            } */}
                                            <h3><FlagIcon code={studentPlanLanguage.lingoLanguage.flag} /> {t(studentPlanLanguage.lingoLanguage.description.toUpperCase())}</h3>
                                        </div>
                                    </div>
                                    <div className="plans last">
                                        <div className="payment">
                                            <h2>{t('MULTYPLE_CLASSES')}</h2>
                                            <h3>{t(studentPlanLanguage.randomFixedTeachers.toUpperCase())}</h3>
                                            {/* 
                                                { !studentPlan.edit ? 
                                                (<h3>{studentPlanLanguage.randomFixedTeachers}</h3>) : 
                                                (<select
                                                    name='randomFixedTeachers'
                                                    id='randomFixedTeachers'                                        
                                                    value={studentPlanLanguage.randomFixedTeachers}
                                                    onChange={(e) => this.handleChange(e,studentPlanLanguage.id)}   
                                                    required
                                                >
                                                    <option value='random'>{t('RANDOM')}</option>
                                                    <option value='fixed'>{t('FIXED')}</option>
                                                </select>)
                                            } 
                                            */}
                                        </div>   
                                    </div>
                                    {/* <div className="plans">
                                        <div className="payment">
                                            <h2>{t('LINK_DRIVE')} </h2>
                                            <ButtonDriveContent language={''} link={t(`LINK_${studentPlanLanguage.level}`)}/>
                                        </div>   
                                    </div>    */}
                                    <div className="plans">
                                        <div className="payment">
                                            <h2>{t('LEVEL')} </h2>
                                            <h3>{studentPlanLanguage.level}</h3> 
                                        </div>   
                                    </div>    
                                </div>
                            })} 
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
                    <div className="PlansBox">
                        <div className="buttons">
                            <button onClick={(e) => this.listPlans(e, 'newplan',0)}>{t('BTN_BUY_PLAN')}</button>
                        </div>
                    </div>
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
                        { this.state.historyPlan.length > 0 &&
                                                this.state.historyPlan[0].studentPlanPaymentHistories.map((history, index) => {
                                                return (
                                                    <div key={index} className="box" style={{ marginTop: '-10px' }}>
                                                        <div className="boxInfo">
                                                            <div className="infoBilling">
                                                                <h2>{t('DATE')}</h2>
                                                                <h3>{moment(history.createdAt).format(t('DATE_FORMAT'))}</h3>
                                                            </div>
                                                            <div className="infoBilling">
                                                                <h2>{t('PAYMENT_METHOD')}</h2>
                                                                <h3>{this.state.historyPlan[0].provider}</h3>
                                                            </div>
                                                            <div className="infoBilling word-wrap-break">
                                                                <h2>{t('TRANSACTION_ID')}</h2>
                                                                <h3>{this.state.historyPlan[0].providerTransactionId}</h3>
                                                            </div>
                                                            <div className="infoBilling">
                                                                <h2>{t('VALUE')}</h2>
                                                                <h3>
                                                                    <span>{t('MONEY_FORMAT')} {this.state.historyPlan[0].finalPrice}</span>
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
                                <button> <i className="fa fa-angle-left" aria-hidden="true"></i>{t('BACK')}</button>
                            </a>
                        </div> 

                    </Billing>                   
                }

                { this.state.showBuy &&
                    <BuyPlan returnToTab={this.returnToTab} targetDestiny={this.state.targetDestiny} targetPlanId={this.state.targetPlanId} PaypalStatus={this.state.paypalStatus} />
                }
                </div> 
             </div> 
                </div>                            
            </Manage>                        
        </section> 

        <Dialog
                open={this.state.openalertCancel}
                onClose={this.closeAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="boxModal"
            >
               
                    
                    {
                        this.state.responseError !== '' ?
                            <div>
                                 <DialogTitle id="pass-dialog-title" className="titleCancelClass"><h2>Cancel plan</h2></DialogTitle>
                                <img src={cancelImg} alt="cancelImg" />
                                <div>
                                    <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                                        <h3>{this.state.responseError}</h3>
                                    </div><br/><br/>
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
                             <DialogTitle id="pass-dialog-title" className="titleCancelClass"><h2>{t('CANCEL_PLAN')}</h2></DialogTitle>
                            <DialogContent>
                                <DialogContentText id="pass-dialog-description" className="boxModal">
                                   
                                    <div>
                                        <img src={cancelImg} alt="cancelImg" />

                                        <form className="formulario" className="boxModal">
                                            <h3>{t('CANCEL_PLAN_MENSSAGEM')} :(<br/> {t('CANCEL_PLAN_MENSSAGEM_2')}</h3>
                                            <textarea
                                                type='text'
                                                placeholder={t('TELL_US_CANCEL_MY_PLAN')}
                                                name='reasonForcancellation'
                                                id='reasonForcancellation'
                                                value={reasonForcancellation}
                                                onChange={handleChangeModal}
                                                required="required"
                                                className="input-lingo inputManage"
                                                style={{marginBottom: 0}}
                                            />
                                            { !this.state.reasonForcancellation && <span style={{ color: 'red', fontSize: '14px' }}>{t('REQUIRED_FIELD')}</span> }
                                            <br/>
                                        </form>
                                       
                                    </div>

                                </DialogContentText>
                            </DialogContent>
                            <DialogActions className="boxModal">
                            
                                <Button onClick={submitCancel} color="secondary" autoFocus disabled={!this.state.reasonForcancellation || this.state.btnCanceledDisable}>
                                    {t('CANCEL_MY_PLAN')}
                                </Button>
                                <Button onClick={this.closeAlert} color="primary" autoFocus>
                                    {t('OOOPS_CANCEL_MY_PLAN')}
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

export default translate('translations')(PlansAccount)

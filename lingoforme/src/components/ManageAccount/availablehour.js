import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import { Manage, Billing } from './Styles'
import Myaccount from '../../images/icons/icon_myaccount_header.svg'
import Loading from 'react-fullscreen-loading'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import { translate } from 'react-i18next'
import moment from 'moment'

class AvailableHoursAccount extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            teacherId: 0,
            name: '',
            weekDays : [0,1,2,3,4,5,6],
            tagDays : ['WEEK_SUNDAY','WEEK_MONDAY','WEEK_TUESDAY','WEEK_WEDNESDAY','WEEK_THURSDAY','WEEK_FRIDAY','WEEK_SATURDAY'],
            teacherAvailabilities: [],
            tempTimeSlots: [],
            checkdayStatus:[false,false,false,false,false,false,false],
            showAdd: false,
            hours:[],
            loading: false,
            openmodaldelete:false,
            openalert: false,
            loading: true,
            alerttitle: '',
            alertdescription: ''
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()
        let user = this.service.getProfile()

        this.userId = user.id
        let id = this.props.match.params.id
        if(id !== undefined){
            this.userId = id
        }
        //this.userId = this.props.userId

        this.callApi = this.callApi.bind(this)
        this.loadTimetable = this.loadTimetable.bind(this)
        this.saveSlots = this.saveSlots.bind(this)
        this.toggleAddDay = this.toggleAddDay.bind(this)
        this.removeDay = this.removeDay.bind(this)
        this.addSlot = this.addSlot.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getTimes = this.getTimes.bind(this)
        this.checkBtn =  this.checkBtn.bind(this)

        this.closeAlert = this.closeAlert.bind(this)
    }

    componentWillMount () {
        let setHours = []
        for (let i = 0; i < 24; i++) { 
            setHours.push(i+":00")
            setHours.push(i+":30")
        }
        this.setState({ hours : setHours })
        this.callApi()
    }

    callApi () {
        this.setState({loading:true}) 
        this.service.noAuthGet(`teachermanagement/getbyuser/${this.userId}`)
        .then(res => {
            if(!res.success || !res.result.items || res.result.items.length == 0)
            {
                return
            }            
            if(res.result.items[0].teachers.length > 0){
                this.setState({ 
                    userId : this.props.userId, 
                    teacherId: res.result.items[0].teachers[0].id,
                    //teacherAvailabilities : res.result.items[0].teachers[0].teacherAvailabilities.length > 0 ? this.loadTimetable(res.result.items[0].teachers[0].teacherAvailabilities) : [], 
                    showAdd : false  
                },()=>{
                    this.service.noAuthGet(`teacheravailabilities/${this.state.teacherId}`)
                    .then((res) => {
                        // if(!res.success || !res.result.items || res.result.items.length == 0)
                        // {
                        //     return
                        // }
                                                
                        this.setState({ 
                            loading:false,
                            teacherAvailabilities : this.loadTimetable(res.result.items)
                        })
                    })
                    .catch(err => console.log('ERRO GET teacheravailabilities ', err))
                }) 
            }else{
                this.setState({loading:false})  
            }            
            
        })
        .catch(err => console.log('ERRO GET TEACH TIME ', err))
    }

    loadTimetable(serverTimetable){
        let loadTimetable = []
        let pivotTime = {}        

        for(let day = 0;day <7;day++) {
            let weekDay = serverTimetable.filter( function( elem, index ) {
                return elem.weekDay === day.toString()
            } )

            weekDay.sort(function(a, b){
                if(a.start && b.start){
                    let x = a.start.toLowerCase();
                    let y = b.start.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                }
                return 0;
            });

            pivotTime = null
            weekDay.map( function( elem, index ) {
                if(index === 0){
                    pivotTime = elem
                }else {
                    if(pivotTime.end === elem.start){
                        pivotTime.end = elem.end    
                    }else{
                        loadTimetable.push(pivotTime)
                        pivotTime = elem
                    }
                }
            })

            if(pivotTime)
                loadTimetable.push(pivotTime)
        }
        return loadTimetable
    }
    
    closeAlert(e){
        this.setState({ alerttitle: '', alertdescription: '',  openalert: false,openmodaldelete:false })
    }

    toggleAddDay (show) {       
        this.setState({ 
            showAdd : show, 
            tempTimeSlots: [{start: 0, end:1}],
            checkdayStatus:[false,false,false,false,false,false,false]
        })      
    }

    saveSlots (e) {
        e.preventDefault()
        this.setState({loading:true}) 
        let newtimetable = []
        if(this.state.checkdayStatus.indexOf(true) < 0)
        {
            this.setState({ alerttitle: 'Validation', alertdescription: 'Obrigatório a seleção de 1 dia ou mais',  openalert: true, loading:false })
            return false
        }
        if(this.state.tempTimeSlots.length === 0){
            this.setState({ alerttitle: 'Validation', alertdescription: 'Obrigatório pelo menos 1 período e dia da semana',  openalert: true, loading:false })
            return false
        }

        let checkEquals = false
        this.state.tempTimeSlots.map((slot) => {
            let hasEquals = this.state.tempTimeSlots.filter((a) => {
                return slot.start === a.start || slot.end === a.end
            })

            if(hasEquals.length > 1){
                checkEquals = true
                return false
            }                
        })
        if(checkEquals){
            this.setState({ alerttitle: 'Validation', alertdescription: 'Não é permitido slots iguais',  openalert: true, loading:false })
            return false
        }

        //Valida na lista de slots já criado, se existe algum range conflitante
        var hasInvalidRange = false
        for (let d = 0; d < 7; d++) {
            let addDay = this.state.checkdayStatus[d]                 
            
            if(addDay){
                let loadSlots = this.state.teacherAvailabilities.filter( function( elem ) {
                    return elem.weekDay === d.toString()
                })    

                this.state.tempTimeSlots.map((slot,i) => {
                    
                    let starttime = (slot.start<20? '0': '') + this.state.hours[slot.start]+ ':00'
                    let endtime = (slot.end<20? '0': '') + this.state.hours[slot.end]+ ':00'
                    
                    if(loadSlots.length > 0){
                        loadSlots.map( function( slot, i ) {
                            if(slot.start <= starttime && starttime <= slot.end)
                                hasInvalidRange = true
                            else if(slot.start <= endtime && endtime <= slot.end)
                                hasInvalidRange = true
                        })
                    }
                    if(!hasInvalidRange){                        
                        newtimetable.push(
                        {
                            teacherId: this.state.teacherId,
                            weekDay : d.toString(),
                            startTime : starttime,
                            endTime : endtime 
                        })
                    }
                })
            }
        }        

        if(hasInvalidRange){
            this.setState({ alerttitle: 'Validation', alertdescription: 'Período selecionado, está sobreposto a outro período já cadastrado',  openalert: true, loading:false })
            return false
        }else if(newtimetable.length > 0)
        {
            //console.log('newtimetable', JSON.parse(JSON.stringify({ teacherAvailabilities :newtimetable })))
            this.service.noAuthPost('teacheravailabilities', JSON.parse(JSON.stringify({ teacherAvailabilities :newtimetable })))
            .then(res => {
                //console.log('newtimetable 2',res)
                if(!res)
                {
                    return
                }
                if(!res.data.success || !res.data.result.items)
                {
                    return
                }

                this.setState({ loading:false, teacherAvailabilities : this.loadTimetable(res.data.result.items), showAdd : false  })
                //verificar melhor solucao porque nao volto para a lista
                
            })
            .catch((err) => {
                this.setState({loading:false})
                console.log('ERRO POST teacheravailabilities ', err)
            })
        }
    }
    
    removeDay (e,id) {
        e.preventDefault()
        this.setState({loading:true}) 

        let filterAvailabilities = this.state.teacherAvailabilities.filter((item) => { return item.id === id })
        if(filterAvailabilities.length > 0 )
        {
            const deleteObj ={
                id : filterAvailabilities[0].id,
                teacherId : this.state.teacherId,
                weekDay: filterAvailabilities[0].weekDay,
                startTime: filterAvailabilities[0].start,
                endTime:filterAvailabilities[0].end,
                reason: 'TODO'
            }

            this.service.ApiDelete('teacheravailabilities', deleteObj )
            .then(res => {
            if(!res)
            {
                return
            }
            if(!res.data.success || !res.data.result.items)
            {
                return
            }
            
            this.callApi()
        })
        .catch((err) => {
            this.setState({loading:false}) 
            console.log('ERRO POST teacheravailabilities ', err)
        })

        }else{
            this.setState({loading:false}) 
        }
    }

    addSlot (e) {
        e.preventDefault()
        let slots = this.state.tempTimeSlots
        slots.push({start:0,end:1})
        this.setState({ tempTimeSlots : slots })
    }

    removeSlot (e,index) {
        e.preventDefault()
        let slots = this.state.tempTimeSlots
        delete slots[index]
        this.setState({ tempTimeSlots : slots })
    }
    
    getTimes(day) {
        let resultDays = []
        resultDays = this.state.teacherAvailabilities.filter(function( elem, index ) {
            return elem.weekDay == day   
        })
        return resultDays
    }

    checkBtn (e) {
        let checkDays = this.state.checkdayStatus
        checkDays[parseInt(e.target.name)] = !this.state.checkdayStatus[parseInt(e.target.name)]
        this.setState({ checkdayStatus : checkDays })           
    }


    handleChange (e, index) {
        e.preventDefault()
        const target = e.target
        const name = target.name   
        const value = target.value     

        if(name == 'start' || name == 'end')
        {
            let slots = this.state.tempTimeSlots
            slots.map((slot,i) => {
                if(i === index){
                    if(name == 'end'){
                        if(parseInt(slot.start) >= parseInt(value) && parseInt(value) !== 0){
                            if(parseInt(slot.start) !== 0 ){
                                this.setState({ alerttitle: 'Validation', alertdescription: 'End time need to be more than start time',  openalert: true, loading:false })
                                return false
                            }
                        }
                    }
                    slot[name] = parseInt(value)
                }
            })
            this.setState({ tempTimeSlots : slots })
        } else {
            this.setState({  [name]: value });      
        }        
    }      

    render() {
        const { t } = this  
        const hours = () => {
            let hours = []
            for (let i = 0; i < 24; i++) { 
                hours.push(i + ":00")
                hours.push(i + ":30")
            }   
            return hours
        }         
        
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
             
                        <Dialog
                            open={this.state.openalert}
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

                        <Dialog
                            open={this.state.openmodaldelete}
                            onClose={this.closeAlert}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{this.state.alerttitle}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="pass-dialog-description">
                                    <h3>Delete Time Slot</h3>

                                </DialogContentText>
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeAlert} color="primary" autoFocus>
                                YES DELETE
                            </Button>
                            <Button onClick={this.closeAlert} color="primary" autoFocus>
                                OPPs....
                            </Button>
                        </DialogActions>
                        </Dialog>   
            
                { this.state.showAdd ? (
                    <div>
                        <div className="box">
                            <div className="selectDays">
                                <h2>{t('ADD_NEW_TIMESLOT')}</h2>
                                <h3>{t('ADD_NEW_TIMESLOT_TITLE')}:</h3>

                                <h4>{t('DAYS')}:</h4>
                                <ul>
                                    { this.state.checkdayStatus.map((check,index) => { 
                                        return (
                                        <li key={index.toString()}>
                                            <button
                                                name={index}
                                                onClick={this.checkBtn}
                                                className = {check ? 'active' : '' } >
                                            { t(this.state.tagDays[index])}
                                            </button>
                                        </li>)
                                    })}
                                </ul>    
                                <div className="time">
                                    <h4>{t('TIME_SLOT_DURATION')}</h4>

                                    { this.state.tempTimeSlots.map((slot,index) => { 
                                        return (
                                            <ul key={index} style={{marginTop: '-34px'}}>
                                                <li>
                                                    <span>{t('START_TIME')}:</span>
                                                    <select name="start" onChange={(e)=> this.handleChange(e,index)} value={slot.start}  >
                                                        { this.state.hours.map((hour,index) => { 
                                                            return (<option key={index.toString()} value={index}>
                                                                        {moment(hour, 'H:mm').format('hh:mm A')}
                                                                    </option>)
                                                        })}  
                                                    </select>
                                                </li>                                
                                                <li>
                                                    <span>{t('END_TIME')}:</span>
                                                    <select name="end" onChange={(e)=> this.handleChange(e,index)}  value={slot.end} >
                                                        { this.state.hours.map((hour,index) => { 
                                                            return (<option key={index.toString()} value={index}>
                                                                        {moment(hour, 'H:mm').format('hh:mm A')}
                                                                    </option>)
                                                        })}  
                                                    </select>
                                                </li>   
                                                { this.state.tempTimeSlots.length-1 === index ? (
                                                    <div className="addSlot" style={{paddingTop: '45px'}}>
                                                        <button onClick={this.addSlot} >{t('ADD_NEW_TIMESLOT')}</button>
                                                    </div>
                                                ) : (
                                                    <div  className="addSlot" style={{paddingTop: '40px', width:'90px', }}>
                                                        <button  style={{border: '2px solid #FF5666', color: '#FF5666'}} onClick={(e) => this.removeSlot(e,index)} >X {t('DELETE')}</button>
                                                    </div>
                                                )}                             
                                            </ul>
                                            )
                                    })}     
                                </div>        
                            </div>
                            
                        </div>
                        <div className="selectDays">
                            <div className="buttons">
                                <button onClick={() => this.toggleAddDay(false)}><i className="fa fa-angle-left" aria-hidden="true"></i>{t('BTN_CANCEL')}</button>
                                <button onClick={this.saveSlots}>{t('BTN_SAVE')}</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                    <div className="box">
                        <div className="topManage">
                            <div>
                                <h2>{t('MANAGE_HOURS_TITLE')}</h2>
                            </div>
                            <div>
                                <button className="addInput" onClick={() => this.toggleAddDay(true)}><i className="fa fa-plus" aria-hidden="true"></i> {t('BTN_ADD_TIME')}</button>
                            </div>
                        </div>                    
                    </div>
                    { this.state.weekDays.map((dayWeek,index) => {
                        return (
                            <div key={index.toString()} className="box">
                                <div className="manage">
                                    <div className="day">
                                        <div>
                                            <h2>{ t(this.state.tagDays[index])}</h2>
                                        </div>
                                        <div>
                                            {/* <button className="addInput">{t('BTN_ADD')}</button> Remove from espec */}
                                        </div>
                                    </div>
                                    <div>
                                        <ul>
                                        {   this.getTimes(index).map((time) => {                            
                                                return (
                                                <div key={time.id} className="configDay">
                                                    <li>{moment(time.start, 'HH:mm:ss').format('hh:mm A')} - {moment(time.end, 'HH:mm:ss').format('hh:mm A')}</li>
                                                    <li><button 
                                                            onClick={ (e) => { this.removeDay(e, time.id) } }>{t('DELETE')} x</button>
                                                    </li>
                                                </div>
                                            )}                              
                                        )}
                                        </ul>
                                    </div>
                                    { this.getTimes(index).length == 0 &&
                                        <div>
                                            <p>{t('MANAGE_HOURS_NOTIME')} </p>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        )
                    })}  
                    </div>                                    
                )}
                <br />
            </div>    
            </div>
            </div>                      
            </Manage>                        
        </section>               
    </div>
        );
    }
}

AvailableHoursAccount.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}
  
 export default translate('translations')(AvailableHoursAccount)

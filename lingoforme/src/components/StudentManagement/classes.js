import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import moment from 'moment';
import { Link } from 'react-router-dom';
import PlaceholderText from '../_common/placeholder/placeholderText';
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import RatingStudent from './rating'
import { StudentManagementCss, Next } from './styles'
import UsersIcon from '../../images/icons/icon_students_header.svg'
import { FlagIcon } from "react-flag-kit";
import { translate } from 'react-i18next'
import Loading from 'react-fullscreen-loading'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import queryString from 'query-string'
import Pagination from '../_common/pagination';

class LevelScoreAccount extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            id : 0,
            studentId:0,
            userNextClasses: [],
            tagDays : ['WEEK_SUNDAY','WEEK_MONDAY','WEEK_TUESDAY','WEEK_WEDNESDAY','WEEK_THURSDAY','WEEK_FRIDAY','WEEK_SATURDAY'],
            loading: true,
            studentId:0,
            userRole: JSON.parse(localStorage.getItem('@lingo')).role,
            open: false,
            totalPages: 0,
            totalFound:0,
            filter: {
                pageNumber: 1,
                pageSize: 10,    
            }
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        this.applyFilters = this.applyFilters.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
        this.callApi = this.callApi.bind(this)
        this.userId = Number(this.props.match.params.id)
    }

    componentWillMount () {          
        this.getPageNumberCurrent()  
    }

    getPageNumberCurrent = () => {
		const params = queryString.parse(this.props.location.search);
		const { filter }  = this.state

		if(params && params["page"]){
			filter["pageNumber"] = Number(params["page"])
			this.setState({filter}, this.callApi() );
		}else{
            this.callApi() 
        }
	}

	pagination = (page, type) => {
		const { filter }  = this.state
		filter["pageNumber"] = Number(page)
		this.setState({filter});
		this.applyFilters();
	}

    callApi () {
       

        this.service.get(`studentManagement/getbyuser/${this.userId}`)
        .then(res => {
            if(!res.success || !res.result.items || res.result.items.length === 0)
            {
                return
            }

            let cleanFilter = { ...this.state.filter }
            const params = Object.keys(cleanFilter).forEach((key) => (cleanFilter[key] === undefined || cleanFilter[key] === '') && delete cleanFilter[key]);
            const query = queryString.stringify(cleanFilter)
            console.log('query', query)
            this.setState({ studentId:res.result.items[0].students[0].id }, () => {
                this.service.get(`classSchedules?studentId=${this.state.studentId}&orderBy=originalScheduledDateTimeUTC&`+query)
                .then(res => {
                    console.log('classSchedules ', res)
                    let nextClass = [];
                    let closestDate = 0;
                    let currentDate = new Date().getTime(); 
                    
                    this.setState ({
                        userNextClasses: res.result.items, 
                        loading:false,
                        totalPages: res.result.totalPages,
                        totalFound: res.result.totalFound
                    })     
                })
                .catch(err => {
                    console.log('ERRO GET classSchedules ', err.response.data)
                    this.setState({loading:false})
                }) 
            })           
        })
        .catch(err => console.log('ERRO GET USERS ', err))

    }

    applyFilters () {
        //this.setState({ loading: true })
        let cleanFilter = { ...this.state.filter }
        const params = Object.keys(cleanFilter).forEach((key) => (cleanFilter[key] === undefined || cleanFilter[key] === '') && delete cleanFilter[key]);
        const query = queryString.stringify(cleanFilter)
        console.log('query 2', query)
    
        console.log('filterObject ', params)
        this.service.get(`classSchedules?studentId=${this.state.studentId}&orderBy=originalScheduledDateTimeUTC&`+query)
        .then(res => {
          console.log('RESULT FILTERED', res)
    
          this.setState({
            userNextClasses: res.result.items, 
            loading:false,
            totalPages: res.result.totalPages
          })
        })
        .catch(err => console.log('ERRO GET USERS ', err))
    }

    clearFilters () {
        this.setState({
          filter: {
            pageNumber: 1,
            pageSize: 10,
          },
          loading: true
        }, () => this.applyFilters())
      }

    handleReversePayment = (id) => {
        this.setState({loading:true})
        this.service.ApiPosts(`classSchedules/classScheduleReversal/${id}`)
        .then(res => {
            console.log('handleReversePayment',res);
            this.callApi()  
            this.setState({
                open: false,
            })             
          })
          .catch(e => {
            console.log('error modal', e)
            let errMsg = (e.data.error.message !== undefined) ? e.data.error.message : e.data.error.message
            this.setState({
              open: true,
              dialogMsg: errMsg,
              loading: false
            })
    
          })
    }

    closeAlert = () => {
       // window.parent.location = window.parent.location.href
        this.setState({
            open: false,
        })
    }


    render() {
        const { 
            userId,
            handleReversePayment,
            t,
            open,
            state,
            state: {
                loading
            }
         } = this

         const { totalPages, totalFound, filter: { pageNumber }} = state;
        return (
            <div className="view">    
                <SideMenu />
                <section>
                <Loading loading={ loading } background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
                <Header/>  
                <div className="toptitle">      
                    <img src={UsersIcon} alt="UsersIcon" />    
                    <h1>{this.t('ITEM_STUDENTS')}</h1>                   
                </div>
                <RatingStudent userId={userId}/>
                <StudentManagementCss>                            
                    <div className="container">                    
                        <div className="tabs">
                            <ManageAccountTabs studentId={userId}/>
                            <div className="tab-content">
                            <Next>
                                {  !this.state.userNextClasses ?  <PlaceholderText /> :
                                <div> 
                                    <div>
                                        { this.state.userNextClasses.map( item => {                  
                                            return (
                                                 <div className="nextClass" key={item.id}>
                                                    { item.status == 'canceled'  &&   <div className="borderCancelled"></div> }   
                                                    <div className="boxClass">
                                                        <div className="date">
                                                             <h3>
                                                                {moment(item.scheduledDate).format(this.t('DATE_FORMAT'))}
                                                                &nbsp; • &nbsp;
                                                                {this.t(this.state.tagDays[new Date(item.scheduledDate).getUTCDay()])}  
                                                                &nbsp; • &nbsp;
                                                                {moment(item.scheduledStartTime, 'HH:mm:ss').format('hh:mm A')}
                                                                &nbsp; - &nbsp;
                                                                {moment(item.scheduledEndTime, 'HH:mm:ss').format('hh:mm A')}
                                                            </h3>
                                                        </div>
                                                        <div className="infos">
                                                        <div className="classContent">
                                                            <h4><FlagIcon code={item.lingoLanguage.flag}/>{item.lingoLanguage.language.name}</h4>
                                                            <div className="classAndTeacher">
                                                                <div>
                                                                    {item.classScheduleDetails.map((classDetails,i) => {                  
                                                                        return (    
                                                                            <div key={i}>
                                                                                <h4>{this.t('CARD_CLASS_CONTENT')}: {classDetails.focus}</h4>
                                                                            </div>    
                                                                        )})}
                                                                    </div>
                                                                </div>         
                                                                <h4> {this.t('CARD_CLASS_TEACHER')} : { item.teacher  
                                                                    ? <div> {item.teacher.user.name} </div> 
                                                                    : <div dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}} />   }      
                                                                    <div dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;'}} />  
                                                                </h4>
                                                            </div>
                                                            { !item.classScheduleDetails[0].classScheduleReversed && item.status !== 'canceled' && item.status !== 'pending' && item.status !== 'accepted' && item.status !== 'done' &&
                                                                <div>                
                                                                    <button style={{ width: "auto", height: "auto", padding: "5px 15px" }}  onClick={(e) => handleReversePayment(item.id)}>{this.t('BTN_REVERSE_PAYMENT')}</button>
                                                                </div>
                                                            }

                                                            { item.status == 'canceled' &&
                                                                <div className="status">
                                                                    <h4 className="cancel">{this.t('CARD_CLASS_CANCELLED')}</h4>
                                                                    <Link to={`/class-details/`+item.id}>
                                                                        <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                                    </Link>  
                                                                </div>
                                                            }

                                                            { item.status == 'pending' &&
                                                                <div className="status">
                                                                   <h5 className={"scheduleWithoutTeacher"} >{t('WITHOUT_TEACHER')}</h5>
                                                                   { !item.classScheduleDetails[0].classScheduleReversed &&
                                                                    <button style={{ width: "auto", height: "auto", padding: "5px 15px", marginRight: '20px' }}  onClick={(e) => handleReversePayment(item.id)}>{this.t('BTN_REVERSE_PAYMENT')}</button>
                                                                   } 
                                                                    { item.classScheduleDetails[0].classScheduleReversed &&
                                                                       <button style={{ width: "auto", height: "auto", padding: "5px 15px", marginRight: '20px' }} >{this.t('BTN_REVERSED_PAYMENT')}</button>
                                                                    }
                                                                   <Link to={`/class-details/`+item.id}>
                                                                        <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                                    </Link> 
                                                                </div>
                                                            }

                                                            { (item.status == 'done' || (item.status == 'noShow' && item.classScheduleDetails[0].classScheduleReversed)) && 
                                                                <div className="status">
                                                                    <h4>{this.t('CARD_CLASS_CONFIRMED')} <i className="fa fa-check-circle-o" aria-hidden="true"></i></h4>
                                                                     { !item.classScheduleDetails[0].classScheduleReversed &&
                                                                        <button style={{ width: "auto", height: "auto", padding: "5px 15px", marginRight: '20px' }}  onClick={(e) => handleReversePayment(item.id)}>{this.t('BTN_REVERSE_PAYMENT')}</button>
                                                                     } 
                                                                     { item.classScheduleDetails[0].classScheduleReversed &&
                                                                        <button style={{ width: "auto", height: "auto", padding: "5px 15px", marginRight: '20px' }} disabled>{this.t('BTN_REVERSED_PAYMENT')}</button>
                                                                     }
                                                                    <Link to={`/class-details/`+item.id}>
                                                                        <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                                    </Link>                                                            
                                                                </div>
                                                            }

                                                            { item.status == 'accepted' &&
                                                                <div className="status">
                                                                    <h4>{this.t('CARD_CLASS_CONFIRMED')} <i className="fa fa-check-circle-o" aria-hidden="true"></i></h4>
                                                                    {/* <div>
                                                                        <button style={{border: '0px solid', width: '100px', color:'red' }} value={item.id} onClick={this.handleCancelClass}>   
                                                                            { this.t('BTN_CANCEL')} <i className="fa fa-ban" aria-hidden="true" ></i>
                                                                        </button>
                                                                    </div> */}
                                                                    <Link to={`/class-details/`+item.id}>
                                                                        <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                                    </Link>                                                                                 
                                                                </div>
                                                            }
                                                            
                                                            {/* { item.status == 'pending' || this.state.userRole != 'b2b' &&  
                                                                <div className="status">
                                                                    <h4>{this.t('CARD_CLASS_CONFIRMED')} <i className="fa fa-check-circle-o" aria-hidden="true"></i></h4>
                                                                    <div>
                                                                        <button style={{border: '0px solid', width: '100px', color:'red' }} value={item.id} onClick={this.handleCancelClass}>   
                                                                            {this.t('BTN_CANCEL')}<i className="fa fa-ban" aria-hidden="true" ></i>
                                                                        </button>
                                                                    </div>                                                      
                                                                    <Link to={`/class-details/`+item.id}>
                                                                        <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                                    </Link>            
                                                                </div>
                                                            } */}
                                                            {/* { item.status == 'accepted'  &&  
                                                                <div className="status">
                                                                    <h4>{this.t('CARD_CLASS_CONFIRMED')} <i className="fa fa-check-circle-o" aria-hidden="true"></i></h4>
                                                                    <div>
                                                                        <button style={{border: '0px solid', width: '100px', color:'red' }} value={item.id} onClick={this.handleCancelClass}>   
                                                                            { this.t('BTN_CANCEL')}<i className="fa fa-ban" aria-hidden="true" ></i>
                                                                        </button>
                                                                    </div>                                                            <Link to={`/class-details/`+item.id}>
                                                                        <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                                    </Link>                                                                                 
                                                                </div>
                                                            } */}
                                                            {/* { item.status == 'canceled' &&
                                                                <div className="status">                                
                                                                    <h4 className="cancel">{this.t('CARD_CLASS_CANCELLED')}</h4>
                                                                    <Link to={`/class-details/`+item.id}>
                                                                        <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                                    </Link>                               
                                                                </div>
                                                            }                     */}
                                                        </div>
                                                    </div> 
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <Pagination pageAtual={pageNumber} totalPages={totalPages} totalFound={totalFound} onClick={(page, type) => this.pagination(page, type)}/>                      
                                </div>
                                }
                                
                                </Next> 
                            </div> 
                        </div> 
                    </div>      
                     
                </StudentManagementCss> 

                <Dialog
                    open={this.state.open === true}
                    onClose={this.closeAlert}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="boxModal"
                >
                <DialogTitle id="alert-dialog-title">{'Error'}</DialogTitle>
                    <DialogContent className="boxModal">
                        <DialogContentText id="pass-dialog-description">
                            {this.state.dialogMsg}
                        </DialogContentText>
                    </DialogContent><br/>
                <DialogActions className="boxModal">
                    <Button onClick={this.closeAlert} color="primary" autoFocus>
                        {t('CLOSE')}
                    </Button>
                </DialogActions>
                </Dialog>                             
            </section>               
        </div>                  
        )
    }
}
  
 export default translate('translations')(LevelScoreAccount)

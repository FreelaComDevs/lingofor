import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Services from '../_api/Services'
import moment, { utc } from 'moment'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Loading from 'react-fullscreen-loading'
import { setClassesForRating } from '../../actions/userActions'
import { getLingoRatingCriterias } from '../../actions/lingoActions'
import { FilterUser, RatingModal, Next } from './styles'
import ModalRating from './modal_rating'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FlagIcon } from 'react-flag-kit'
import { translate } from 'react-i18next'
import ClassRatingIcon from '../../images/icons/icon_classratings_header.svg'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import ratingImg from '../../images/rating/img_classRatingStarsHero.png'
import Rating from 'react-rating'

import queryString from 'query-string'
import Pagination from '../_common/pagination';

import Service from '../../components/_api/Services'
import timezone from 'moment-timezone'

const serv = new Service()

class ClassRatings extends Component {
  constructor (props) {
    super(props)
    let startDate = moment().subtract(30, "days").format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    this.state = {
      classesRatings: [],
      target: "",
      studentRating: [],
      teacherRating: [],
      lingos: [],    
      levels: [],
      totalPages: 0,
      pageSize: 10, 
      filter: {
        pageNumber: 1,
        pageSize: 10,    
        startAt : startDate,
        endAt: endDate,
        student: '',
        teacher: '',
        classRatingStatus: '',
        lingoLanguageId: '',
        ratingCriteriaId: '',
        ratingCriteriaGrade:'',
        lingoLanguageId: '',
        status: '',
        planId: '',
        studentLevel: '',
        levelId: ''
      },
      loading: true,
      expanded:false,
      closedClasses: [],
      ratings:null,
      blankfield : '&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;',
      showRating : false,
      alertMsg: '',
      alertTitle: '',
      tagDays : ['WEEK_SUNDAY','WEEK_MONDAY','WEEK_TUESDAY','WEEK_WEDNESDAY','WEEK_THURSDAY','WEEK_FRIDAY','WEEK_SATURDAY']
    }

    this.i18n = this.props.i18n
    this.t = this.props.t
    this.service = new Services()
    this.user = this.service.getProfile()
    this.applyFilters = this.applyFilters.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFilterPanel = this.handleFilterPanel.bind(this)    
    this.openRating = this.openRating.bind(this)
  }

  componentWillMount () {
    this.props.getLingoRatingCriterias()
    this.callApi()
  }

  componentDidMount () {
    this.getPageNumberCurrent()
	}


  getPageNumberCurrent = () => {
		const params = queryString.parse(this.props.location.search);
		const { filter }  = this.state

		if(params && params["page"]){
      if(params["page"].toString() !== filter["pageNumber"].toString()){
        filter["pageNumber"] = Number(params["page"])    
        this.setState({filter: filter,loading: true},this.callApi(false))
      }      
		}
	}

	pagination = (page, type) => {

    const { filter }  = this.state
    if(page.toString() === filter["pageNumber"].toString())
      return

    filter["pageNumber"] = page
		this.setState({filter: filter,loading: true},this.callApi(false) );
	}

  callApi = (fullLoad = true) => {    
    let cleanFilter = { ...this.state.filter }
    Object.keys(cleanFilter).forEach((key) => (cleanFilter[key] === undefined || cleanFilter[key] === '' || cleanFilter[key] === 0) && delete cleanFilter[key])

    if(this.user.role === "student" ||  this.user.role === "teacher"){
      cleanFilter.startAt =  undefined
      cleanFilter.endAt =  undefined
    }else{
      cleanFilter.startAt =  cleanFilter.startAt ? moment(cleanFilter.startAt).format('YYYY-MM-DD 00:00') : undefined
      cleanFilter.endAt =  cleanFilter.endAt ? moment(cleanFilter.endAt).format('YYYY-MM-DD 23:59') : undefined
    }    

    cleanFilter['status'] = 'done'
    cleanFilter['type'] = 'all' 
    cleanFilter['orderBy'] = ['originalScheduledDateTimeUTC','desc']

    this.service.get('ClassScheduleRating', { params: cleanFilter })
      .then(res => { 
        const targetString = this.user.role === "student" ? "teacherRating" : this.user.role === "teacher" ? "studentRating" : ""
        let ratingClasses = res.result.items
        //let ratingClasses = res.result.items.filter( item =>{
        //  return true
          // if( this.user.role === "student" || this.user.role === "teacher"){
          //   return item.status !== "canceled"
          //     && item.status !== "pending"
          //     && item.status !== "noShow" 
          //     // && !item[targetString]
          //     && item.teacher !== null
          // }else{
          //   return true
          // }
          
        //})
        //console.log("ratintargetSS", ratingClasses);
        //console.log("res.result.items", res.result.items);

        // ratingClasses = ratingClasses
        //   .filter( item => !!item.teacher ) 


        let closedClasses = []
        for(let i in ratingClasses){
          let item = ratingClasses[i]
          // if(!item.teacherId)
          //   return false;
          // let filterSequentialID = ratingClasses.filter(f =>{
          //     return f.sequentialScheduleId === item.sequentialScheduleId
          // })
          // let filterAllClassDone = filterSequentialID.filter(f =>{
          //   if( this.user.role === "student" || this.user.role === "teacher"){
          //     return f.sequentialScheduleId === item.sequentialScheduleId && f.status === "done"
          //   }else{
          //     return true
          //   } 
            
          // })
          // console.log("filterAllClassDone "+item.id, filterAllClassDone,filterSequentialID)

          // if(filterAllClassDone.length == filterSequentialID.length){
         

          let newStudentRating = {
            classScheduleId: item.id,
            minimunTeacherRating: item.minimunTeacherRating,
            originalScheduledTimezoneName : item.originalScheduledTimezoneName,
            originalScheduledDateTime: item.originalScheduledDateTime,
            scheduledDate: item.scheduledDate,
            tagDay:this.t(this.state.tagDays[new Date(item.originalScheduledDateTime).getDay()]),
            scheduledStartDateTime : item.scheduledStartDateTime,
            scheduledEndDateTime : item.scheduledEndDateTime,
            lingoLanguage : item.lingoLanguage,
            classDetail: (item.classScheduleDetails && item.classScheduleDetails.length > 0) ? item.classScheduleDetails[0].focus : undefined,
            student : item.student.user.name ? item.student.user.name : undefined,
            studentId: item.student.id ? item.student.id : undefined,
            teacher : item.teacher && item.teacher.user ? item.teacher.user.name : undefined,
            teacherId: item.teacher && item.teacher.id ? item.teacher.id : undefined,
            studentLevelGrade : item.student.studentLevelGrades && item.student.studentLevelGrades.length > 0 ? item.student.studentLevelGrades[item.student.studentLevelGrades.length-1].level.level : undefined,
            sequentialScheduleId: item.sequentialScheduleId,
            status: 'pending',
            role : 'teacher',
            target : 'student',
            comments: '',
            justify:'',
            keepTeacher: null,
            blockTeacher: -1,
            studentRating: item.studentRating ? item.studentRating : null,
            teacherRating: item.teacherRating ? item.teacherRating : null
          }


          if(this.user.role !== 'student') {
            newStudentRating.status = newStudentRating.studentRating ? newStudentRating.studentRating.status : 'pending'
            closedClasses.push(newStudentRating)
          }
          if(this.user.role !== 'teacher')
          {
            let newTeacherRating = {...newStudentRating}
            newTeacherRating.role = 'student'
            newTeacherRating.target = 'teacher'
            newTeacherRating.status = newTeacherRating.teacherRating ? newTeacherRating.teacherRating.status : 'pending'

            closedClasses.push(newTeacherRating)
          }
        }

        this.setState ({
            classesRatings: res.result.items, 
            closedClasses: closedClasses,
            pageSize: closedClasses.length,  
            totalPages: res.result.totalPages,
            totalFound: res.result.totalFound*2,
            loading:false, 
            ratings:null, 
            showRating: false 
          })           
         
      })
      .catch(err => {
        console.log('ERRO GET classSchedules ', err)
        this.setState({loading:false})
      }) 
  
           
    if(fullLoad){
      //GET LINGO LANGUAGES
      this.service.get('lingolanguages/getall')
        .then(res => {
          this.setState({
            lingos: res.result.items
          })
        })
        .catch(err => console.log('err lingolanguages ', err))

      //GET LEVELS
      this.service.get('levels')
        .then(res => {
          this.setState({
            levels: res.result.items
          })
        })
        .catch(err => console.log('err levels ', err))
    }
  }

  
  applyFilters () {
    const { filter }  = this.state
    filter["pageNumber"] = 1
		this.setState({filter: filter,loading: true},this.callApi(false));    
  }

  clearFilters () {
    let startDate = moment().subtract(30, "days").format('YYYY-MM-DD 00:00:00')
    let endDate = moment().format('YYYY-MM-DD 23:59:59')

    this.setState({
      filter: {
        pageNumber : 1,
        pageSize : 10,
        startAt : startDate,
        endAt: endDate,
        student: '',
        teacher: '',
        ratingStatus: '',
        lingoLanguageId: '',
        ratingCriteriaId: '',
        ratingCriteriaGrade:'',
        lingoLanguageId: '',
        status: 'done',
        planId: '',
        levelId: ''
      },
      loading: true
    }, () => this.callApi(false))
  }

  handleFilterPanel(e){
    e.preventDefault()
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  handleChange (e) {
    const target = e.target
    const name = target.name
    let value = target.type === 'checkbox' ? target.checked : target.value
    
    value = value == '0' ? undefined : value 

    this.setState({ filter : { ...this.state.filter, [name]: value } })
  }
  
  openRating(e, index){
    e.preventDefault()
    const { 
      props: { setClassesForRating }, 
      state: { closedClasses, classesRatings }
    } = this
    const { target } = closedClasses[index]
    const classesForRating = classesRatings
      .filter( item => item.sequentialScheduleId === closedClasses[index].sequentialScheduleId )
      .map( item => { return ({ ...item, target})})
    setClassesForRating({classesForRating, target})
    this.setState({ target })
  }

  userTimezoneConvert(time, timeTimezone) {
    const user = serv.getUserFromToken()
    return timezone.tz(time, timeTimezone).clone().tz(user.timezone)
  }

  render () {
    const { 
      t,
      applyFilters,
      props: { user: { classesForRating, role }, lingo: { ratingCriterias }}, 
      state: { target, totalFound,totalPages, pageSize, filter: { pageNumber } } 
    } = this
    return (
      <div className='view'>
        <SideMenu />
        <section>
          <Header/>
          <div className="toptitle">      
            <img src={ClassRatingIcon} alt="UsersIcon" />    
            <h1>{this.t('CLASS_RATING')}</h1>                   
          </div>
          <Loading loading={this.state.loading} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
          { this.user.role !== 'student' && this.user.role !== 'teacher' &&
          <FilterUser>
            <div className='container'>
              <div className='bigBox'>
              
                <h2><i className="fa fa-filter" aria-hidden="true"></i>Filters</h2>
                <form className='formulario'>
                  <div className='lineInput'>
                    <label htmlFor='startAt'>Period - start</label>
                    <input type="date" id='startAt' name="startAt" value={this.state.filter.startAt} onChange={this.handleChange} min="2000-01-01" max="2050-12-31" />
                  </div>
                  <div className='lineInput'>
                    <label htmlFor='endAt'>Period - end</label>
                    <input type="date" id='endAt' name="endAt" value={this.state.filter.endAt} onChange={this.handleChange} min="2000-01-01" max="2050-12-31" />
                  </div>
                  <div className='lineInput'>
                    <label htmlFor='teacher'>Teacher</label>
                    <input placeholder='Teacher name' name='teacher' onChange={this.handleChange} value={this.state.filter.teacher} />
                  </div>
                  <div className='lineInput'>
                    <label htmlFor='student'>Student</label>
                    <input placeholder='Student name' name='student' onChange={this.handleChange} value={this.state.filter.student} />
                  </div>
                  <div className='lineInput'>
                    <label htmlFor='classRatingStatus'>Status</label>
                    <select name='classRatingStatus' value={this.state.filter.classRatingStatus} onChange={this.handleChange}>
                      <option value="0">{t('SELECT')}</option>
                      <option value={'rated'}>{'rated'}</option>
                      <option value={'pending'}>{'pending'}</option>
                    </select>
                  </div>
                </form>

                { this.state.expanded && 
                  <div>
                    <hr style={{width: '100%',margin: '0'}}/><br/>
                    <form className='formulario'> 
                      <div className='lineInput'>
                        <label htmlFor='lingoLanguageId'>Lingo</label>
                        <Select
                          name="lingoLanguageId"
                          value={this.state.filter.lingoLanguageId}
                          onChange={this.handleChange}
                          className='input-lingo'
                          disableUnderline
                          displayEmpty
                        >
                          <MenuItem value={undefined} >{t("SELECT")}</MenuItem>
                          {this.state.lingos.map((item,index) => {
                            return <MenuItem key={index} value={item.id}><FlagIcon code={item.flag} />{t(item.description.toUpperCase())}</MenuItem>
                          })}
                        </Select>
                      </div>                   
                      <div className='lineInput'>                      
                        <label htmlFor='studentLevel'>Levels</label>
                        <select name='studentLevel' value={this.state.filter.studentLevel} onChange={this.handleChange}>
                          <option value="0">{t('SELECT')}</option>
                          {this.state.levels.map((item) => {
                            return (<option key={item.id} value={item.level}>{item.level}</option>)
                          })}
                        </select>
                      </div>
                      <div className='lineInput'>
                      </div>
                    </form>
                  </div>
                }         
           
                <div className='buttons'>        
                  <button onClick={this.handleFilterPanel}>View More +</button>
                  <button onClick={this.clearFilters}>{t('CLEAR_FILTERS')}</button>
                  <button onClick={this.applyFilters}  disabled={this.state.loading} >{t('FILTERS')}</button>
                </div>
              </div>
             
            </div>
          </FilterUser>
          }
          { !this.state.loading && this.state.closedClasses.length > 0 &&

            <Next>
              { this.state.closedClasses !== undefined && this.state.closedClasses.length > 0 &&  
              <div className="container">
          
                { this.state.closedClasses.map((item,index) => {   
                  const time = this.userTimezoneConvert(item.scheduledStartDateTime,item.originalScheduledTimezoneName)
                  return (
                    <div  key={index} className="nextClass">
                          
                      <div className="boxClass">
  
                        <div className="date">
                          <h3>
                            {time.format(this.t('DATE_FORMAT'))}
                                  &nbsp; • &nbsp;
                            { this.t(time.format("dddd"))}  
                                  &nbsp; • &nbsp;
                            {time.format("h:mm a")}
                                  &nbsp; - &nbsp;
                            {time.clone().add(30, "minutes").format("h:mm a")}
                          </h3>
                        </div>

                        <div className="infos">
                          <div className="classContent">                                                
    
                            <h4><FlagIcon code={item.lingoLanguage.flag}/>{t(item.lingoLanguage.language.name.toUpperCase())}</h4>
                                                        
                            <div className="classAndTeacher">
                              <div>
                                <div>
                                  <h4>
                                    {item.role !== 'student' ? (<i className="fa fa-circle" aria-hidden="true"></i>) : ('') } &nbsp;
                                    {this.t('CARD_CLASS_STUDENT')}: {item.student ? (item.student) : (<div dangerouslySetInnerHTML={{ __html: this.state.blankfield}} />) } 
                                        &nbsp; • &nbsp;
                                    {this.t('CARD_CLASS_CONTENT')}: {item.classDetail ? (item.classDetail) : (<div dangerouslySetInnerHTML={{ __html: this.state.blankfield}} />) }
                                  </h4>
                                </div>    
                                                                    
                                <h4>
                                  {item.role !== 'teacher' ? (<i className="fa fa-circle" aria-hidden="true"></i>) : ('')}
                                      &nbsp;
                                  {this.t('CARD_CLASS_TEACHER')}: 
                                  { item.teacher ? 
                                    (<div>    
                                      {item.teacher}
                                    </div> ) : (<div dangerouslySetInnerHTML={{ __html: this.state.blankfield}} />)                               
                                  }                                           
                                                 
                                </h4>         
    
                              </div>
                                                                                                               
                            </div>         

                            <h4> 
                              {this.t('CARD_PLAN_LEVEL')}:  
                              {item.studentLevelGrade  ? 
                                ( <div>
                                  {item.studentLevelGrade } 
                                </div> ) :

                                ( <div dangerouslySetInnerHTML={{ __html: this.state.blankfield}} />)  
                              }
                            </h4>    
                            { (!!item[`${item.target}Rating`] && !!item[`${item.target}Rating`].averageRating ) ?  
                              (<div className="rating-card">
                                <h4 className="title">{item.role === 'student' ? t('TEACHER_AVERAGE_RATING') : t('STUDENT_AVERAGE_RATING')}</h4>
                                  
                                <div className="stars startList">
                                  <span className="average">{item.role === 'student' ? (item.teacherRating  ? item.teacherRating.averageRating : 0) : (item.studentRating ? item.studentRating.averageRating : 0) }</span>
                                  <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    initialRating={item.role === 'student' ? (item.teacherRating  ? item.teacherRating.averageRating : 0) : (item.studentRating ? item.studentRating.averageRating : 0)  }
                                    readonly = {true} 
                                  />
                                </div>
                                  
                              </div>) :(
                                <div dangerouslySetInnerHTML={{ __html: this.state.blankfield}} />
                              )
                            }
                            { (!!item[`${item.target}Rating`] && !!item[`${item.target}Rating`].averageRating ) ?  
                              ( <div className="status">
                                <h4 className="success">{this.t('RATING_CONFIRMED')} <i className="fa fa-check-circle-o" aria-hidden="true"></i></h4>
                                <button onClick={(e) => this.openRating(e,index)} >{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                              </div>) 
                              : 
                              (<div className="status">
                                <h4 className="pending">{this.t('RATING_PENDING')}</h4>

                                { this.user.role !== 'customerService' && this.user.role !== 'coordinator' && 
                                  <button onClick={(e) => this.openRating(e,index)} className="active">{this.t('RATE')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                }
                              </div>)
                            }
                          </div>
                                    
                        </div>
                      </div> 
                    </div>
                  )
                })}

              </div>
              } 
              { <Pagination pageCurrent={pageNumber} pageSize={pageSize}  totalPages={totalPages} totalFound={totalFound}  onClick={(page, type) => this.pagination(page, type)}/> }
            </Next> 
          }

          {
            !this.state.loading && this.state.closedClasses.length === 0 &&
              <div align='center'>
                <h4 style={{fontSize: '24px', fontFamily: 'Quicksand', fontWeight: '500', color:'#797881',  margin: '20px'}}>No results</h4>
              </div>
          }         
        { !!classesForRating.length && !!ratingCriterias.length && <ModalRating target={classesForRating[0].target} updateScreen={applyFilters} /> }
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({ user, lingo }) => ({ user, lingo })
const mapDispatchToProps = dispatch => ({
  setClassesForRating: data => dispatch(setClassesForRating(data)),
  getLingoRatingCriterias: data => dispatch(getLingoRatingCriterias(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ClassRatings))

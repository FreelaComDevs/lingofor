import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import { FilterUser  } from './styles'
import RatingStudent from './rating'
import UsersIcon from '../../images/icons/icon_students_header.svg'
import avatar_default from '../../images/profile/img_placeholder.svg'
import DragImg from '../../images/icon_draganddrop.png'
import { translate } from 'react-i18next'
import Loading from 'react-fullscreen-loading'
import Rating from 'react-rating'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class LevelScoreAccount extends Component {
  constructor (props) {
    super(props)
        this.state = {
            id : 0,
            studentId:0,
            loading: true,
            teacherId:0,
            teachers: [],
            isFavorite: false,
            teacherFavorites: [],
            teacherExceptions: [],
            scheduleclass: false,
            userRole: JSON.parse(localStorage.getItem('@lingo')).role,
            openalert: false,
            alertdescription: '',
            teachersRemoveSelect: [],
        }

        this.auth = new AuthService()
        this.i18n = props.i18n
        this.t = props.t
        this.service = new Services()
        this.userId = props.match.params.id
        this.callApi = this.callApi.bind(this)
        this.addTeacher = this.addTeacher.bind(this)
        this.deleteTeacher = this.deleteTeacher.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleScheduleClass = this.handleScheduleClass.bind(this)
        this.onSortEnd = this.onSortEnd.bind(this)
    }



    componentWillMount () {
        this.callApi()
    }

    callApi () {
        this.service.get(`teachermanagement?skip=0&take=99999&active=true`)
        .then(res => {
            if(!res.success || !res.result.items || !res.result.items.length === 0)
            {
                return
            }

            let teachers = []
            res.result.items.map((item) => {
                if(item.active && item.teachers && item.teachers.length > 0)
                {
                    teachers.push({  id: item.teachers[0].id ,name : item.name })
                }
                return false
            })

            this.service.get(`studentManagement/getbyuser/${this.userId}`)
            .then(res => {
                if(!res.success || !res.result.items || res.result.items.length === 0)
                {
                    return
                }
                this.setState({ teachers, studentId:res.result.items[0].students[0].id }, () => {
                    this.loadFavorites(null,-1)
                    this.loadExceptions()
                })
                this.setState({ scheduleclass: res.result.items[0].students[0].scheduleOnlyWithFavorite});
            })
            .catch(err => console.log('ERRO GET USERS ', err))
        })
        .catch(err => console.log('ERRO GET TEACHERS ', err))



    }

    loadFavorites(e,order) {
        this.service.get(`studentManagement/getStudentTeacherFavorite/${this.state.studentId}`)
        .then(res => {
            if(!res.success || !res.result.items)
            {
                return
            }
            
            this.setState({ loading:false, teacherFavorites : res.result.items}, () => {
                if(order && order > -1){
                    order = order > res.result.items.length-1 ? res.result.items.length-1 : order
                    const index = {
                        newIndex:res.result.items.length-1,
                        oldIndex:order
                    }
                    this.onSortEnd(index, e)
                }
            })
            this.removeArrayTeacherFavorites()
        })
        .catch(err => console.log('ERRO GET getStudentTeacherFavorite ', err))
    }

    loadExceptions() {
        this.service.get(`studentManagement/getStudentTeacherRestriction/${this.state.studentId}`)
        .then(res => {
            if(!res.success || !res.result.items)
            {
                return
            }
            this.setState({ loading:false, teacherExceptions : res.result.items})
            this.removeArrayTeacherExceptions()
        })
        .catch(err => console.log('ERRO GET getStudentTeacherRestriction ', err))
    }

    removeArrayTeacherExceptions(){
      let tempTeacher = this.state.teachers;
      this.state.teacherExceptions.map((el) =>{
        tempTeacher = tempTeacher.filter(e => e.id !== el.teacher.id);
      })
      this.setState({teachers: tempTeacher});
    }

    removeArrayTeacherFavorites(){
      let tempTeacher = this.state.teachers;
      this.state.teacherFavorites.map((el) =>{
        tempTeacher = tempTeacher.filter(e => e.id !== el.teacher.id);
      })
      this.setState({teachers: tempTeacher});
    }

    addTeacher(e){
        e.preventDefault()
        this.setState({ loading : true})

        if(this.state.studentId === 0 || this.state.teacherId === 0){
            this.setState({
                openAlert: true,
                loading: false,
                alertMessage : this.t('SELECT_TEACHER')
              })
              return;
        }


        let newobj = {
            studentId : parseInt(this.state.studentId),
            teacherId : parseInt(this.state.teacherId)
        }

        if(this.state.isFavorite){
            this.service.ApiPosts(`studentManagement/createStudentTeacherFavorite`, newobj)
            .then((res) => {
                if(!res || !res.data || !res.data.result.items || res.data.result.items.length === 0)
                {
                    return
                }

                this.setState({  loading:false, teacherFavorites : res.data.result.items})
            })
            .catch(err => { this.setState({ loading:false}); })
        }else{
            this.service.ApiPosts(`studentManagement/createStudentTeacherRestriction`, newobj)
            .then((res) => {

                if(!res || !res.data || !res.data.result.items || res.data.result.items.length === 0)
                {
                    return
                }

                this.setState({ loading:false, teacherExceptions : res.data.result.items})
            })
            .catch(err => { this.setState({ loading:false}); })
        }
    }

    deleteTeacher(e,order){
        this.setState({ loading : true})

        if(e.target.name === 'favorite'){
            this.service.ApiDelete(`studentManagement/deleteStudentTeacherFavorite/${e.target.value}`)
            .then((res) => {

                if(!res || !res.data || !res.data.result.items || res.data.result.items.length === 0)
                {
                    return
                }

                this.loadFavorites(e,order)
            })
            .catch(err => { console.log(err) })
        }else if(e.target.name === 'exception'){
            this.service.ApiDelete(`studentManagement/deleteStudentTeacherRestriction/${e.target.value}`)
            .then((res) => {

                if(!res || !res.data || !res.data.result.items || res.data.result.items.length === 0)
                {
                    return
                }

                this.loadExceptions()
            })
            .catch(err => { console.log(err) })
        }

    }

    onSortEnd (index, e) {
        this.setState({ loading : true})
        let favorites = this.state.teacherFavorites
        if(!favorites[index.oldIndex]){
          this.setState({ loading : false})
          return;
        }
        favorites[index.oldIndex].order = index.newIndex  + (index.oldIndex < index.newIndex ? 1.1 : 0.1)
        favorites.sort(function(left, right) {
            return left.order < right.order ? -1 : 1;
        })

        let studentTeacherFavoriteIds = []
        for(let index = 0;index < favorites.length;index++){
            favorites[index].order = index+1
            studentTeacherFavoriteIds.push(favorites[index].id)
        }

        let newobj = {
            studentId : parseInt(this.state.studentId),
            studentTeacherFavoriteIds : studentTeacherFavoriteIds
        }

        this.service.ApiPosts(`studentManagement/updateStudentTeacherFavoriteOrder`, newobj)
        .then((res) => {
            if(!res || !res.data || !res.data.result.items || res.data.result.items.length === 0)
            {
                return
            }
            this.setState({ loading : false, teacherFavorites :  res.data.result.items})
        })
        .catch(err => { console.log(err) })
    }


    handleChange (e) {
        e.preventDefault()

        if(e.target.name === 'favorite'){
            this.setState({ isFavorite: true });
        }else if(e.target.name === 'exception'){
            this.setState({ isFavorite: false });
        } else{
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    handleScheduleClass(e){
        const value = e.target.checked

        this.service.ApiPut('studentManagement/updateStudentFavoriteTeacherFlag/' + this.state.studentId + '/' + value )
        .then(res => {
            if(!res || !res.result || res.result.items.length === 0)
            {
                return
            }

            this.setState({
                loading : false,
                scheduleclass: !this.state.scheduleclass
            })
        })
        .catch(err => { console.log(err) })

    }

    render() {
        const { t } = this

        // This can be any component you want
        const DragHandle = SortableHandle(() => <label><img src={DragImg} alt="Drag Drop"></img></label>)

        const SortableItem = SortableElement(({value}) => {
            return (
                <FilterUser>
                <div key={value.id}  className="bigBoxTeacher">
                    <div className="boxInfo">
                        <div className="boxColumn">
                        <label>{value.order}
                        {value.order === 1 && 'st'}
                        {value.order === 2 && 'nd'}
                        {value.order === 3 && 'rd'}
                        {value.order >= 4 && 'th'}
                        </label>
                        </div>
                        <div className="boxColumn">
                        <img
                            src={(value.teacher.user && value.teacher.user.picture) ? value.teacher.user.picture : avatar_default}
                            alt='Avatar'
                            width='48'
                            height='48'
                            className='avatarRound'
                            style={{borderRadius:'50%', objectFit: 'cover'}}
                        />
                        </div>
                        <div className="boxColumn">
                            <label>{value.teacher.user ? value.teacher.user.name : ''}</label>
                            <div className="rating startList">
                                <p>{this.t('AVARAGE_RATING')}: </p>
                                {' '}
                                <span className="grades"> {value.teacher.averageRating} </span>
                                {' '}
                                <Rating
                                    emptySymbol="fa fa-star-o fa-2x"
                                    fullSymbol="fa fa-star fa-2x"
                                    initialRating= {value.teacher.averageRating}
                                    readonly = {true}
                                />
                            </div>
                        </div>
                    </div>

                    {
                     this.state.userRole != 'b2b' &&
                        <div className="endColumn">
                            <button name="favorite" value={value.id}  onClick={(e) => { this.deleteTeacher(e, value.order)}} className="delete">Delete <i className="fa fa-times-circle-o" aria-hidden="true"></i></button>
                            <DragHandle />
                        </div>
                    }


                </div>
                </FilterUser>
            )
        })

        const SortableList = SortableContainer(({items}) => {

            return (
                <div className="" style={{width:'100%', marginLeft: '-30px'}}>
                   { items.map((value, index) => (
                        <SortableItem  key={`item-${value.id}`} index={index} value={value} />
                    ))  }
                </div>
            )
        })


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
                <FilterUser>
                   <div className="container">
                        <ManageAccountTabs studentId={this.userId}/>

                        {
                            this.state.userRole != 'b2b' &&
                                <div className='bigBox' style={{marginTop: '25px'}}>
                                    <h2>{t('ADD_TEACHER')}</h2>
                                    <form className='formulario'>
                                        <div className='lineInput'>
                                            <label htmlFor='teacher'>{this.t('CARD_CLASS_TEACHER')}:</label>
                                            <select name='teacherId' value={this.state.teacherId} onChange={this.handleChange}>
                                              <option value="">{this.t("SELECT")}</option>
                                              { this.state.teachers.map((teacher) => {
                                                  
                                                  return (
                                                    
                                                  
                                                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                                  )
                                              })}
                                            </select>
                                        </div>
                                        <div className='lineInput'>
                                            <label htmlFor='favorite'>{this.t('CHOOSE_LIST_TEACHER')}:</label>
                                            <div className="buttonsSelect">
                                                <button name='favorite' className={this.state.isFavorite ? 'active' : '' } onClick={this.handleChange}>{this.t('FAVORITE_TEACHER')}</button>
                                                <button name='exception' className={!this.state.isFavorite ? 'active' : '' } onClick={this.handleChange}>{this.t('EXCEPTION_TEACHER')}</button>
                                            </div>
                                        </div>

                                        <div className='lineInput'>
                                            <div className="buttons">
                                                <button name='addteacher' onClick={this.addTeacher}>{this.t('ADD_TEACHER')}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                        }

                        <div className="teacherListBox">
                            <h3>Favorite Teachers List</h3>
                            {
                                this.state.userRole != 'b2b' &&
                                <div className="switch__container">
                                    <input
                                        id="switch-shadow"
                                        className="switch switch--shadow"
                                        type="checkbox"
                                        name="scheduleclass"
                                        checked={this.state.scheduleclass}
                                        onChange={this.handleScheduleClass} />
                                    <label htmlFor="switch-shadow"><span>Schedule class only with favorite teachers</span></label>
                                </div>
                            }
                        </div>
                        { this.state.teacherFavorites.length > 0 &&
                            <SortableList
                                items={this.state.teacherFavorites}
                                onSortEnd={this.onSortEnd}
                                useDragHandle={true}
                            />
                        }
                        { this.state.teacherFavorites.length === 0 &&
                            <div align='center'>
                                <h4 style={{fontSize: '24px', fontFamily: 'Quicksand', fontWeight: '500', color:'#797881',  margin: '20px'}}>No results</h4>
                            </div>
                        }

                        <div className="teacherListBox">
                            <h3>Exception List</h3>
                        </div>

                        { this.state.teacherExceptions.map((exception, index) => {
                            return (
                                <div key={index} className="bigBoxTeacher">
                                    <div className="boxInfo">
                                        <div className="boxColumn">
                                            <img
                                                src={(exception.teacher.user.picture !== null) ? exception.teacher.user.picture : avatar_default}
                                                alt='Avatar'
                                                width='48'
                                                height='48'
                                                className='avatarRound'
                                                style={{borderRadius:'50%', objectFit: 'cover'}}
                                            />
                                        </div>
                                        <div className="boxColumn">
                                            <label>{exception.teacher.user.name}</label>
                                            <div className="rating startList">
                                                <p>{this.t('AVARAGE_RATING')}:</p>
                                                {' '}
                                                <span className="grades">{exception.teacher.averageRating}</span>
                                                {' '}
                                                <Rating
                                                    emptySymbol="fa fa-star-o fa-2x"
                                                    fullSymbol="fa fa-star fa-2x"
                                                    initialRating={exception.teacher.averageRating}
                                                    readonly = {true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.userRole != 'b2b' &&
                                        <div className="endColumn">
                                            <button name="exception" value={exception.id} onClick={(e) => { this.deleteTeacher(e, -1)}}  className="delete">Delete <i className="fa fa-times-circle-o" aria-hidden="true"></i></button>
                                        </div>
                                    }
                                </div>
                            )}
                        ) }
                        {  this.state.teacherExceptions.length === 0 &&
                            <div align='center'>
                                <h4 style={{fontSize: '24px', fontFamily: 'Quicksand', fontWeight: '500', color:'#797881',  margin: '20px'}}>No results</h4>
                            </div>
                        }

                    </div>
                    </FilterUser>
                    <Dialog open={this.state.openAlert} onClose={() => this.setState({openAlert: false})} className="alert-dialog-slide">
                        <DialogTitle className="alert-dialog-slide-title">
                        {t('SOMETHING_WENT_WRONG')}
                        </DialogTitle>
                        <DialogContent className="alert-dialog-slide-content">
                        {t(this.state.alertMessage)}
                        </DialogContent>
                        <DialogActions className="alert-dialog-slide-actions">
                        <button className="new-button close" onClick={() => this.setState({openAlert: false})}>
                            {t('OK')}
                        </button>
                        </DialogActions>
                    </Dialog>
            </section>
        </div>
        )
    }
}

LevelScoreAccount.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
  }

 export default translate('translations')(LevelScoreAccount)

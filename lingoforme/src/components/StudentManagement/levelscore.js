import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AuthService from '../_api/AuthService'
import Services from '../_api/Services'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ManageAccountTabs from './tabs'
import RatingStudent from './rating'
import { StudentManagementCss } from './styles'
import UsersIcon from '../../images/icons/icon_students_header.svg'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { FlagIcon } from "react-flag-kit"
import { translate } from 'react-i18next'
import Loading from 'react-fullscreen-loading'

class LevelScoreAccount extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
            id : 0,
            studentId:0,
            loading: true,
            levels:[],
            languagesbylevel:[],
            editIndex:-1,
            openalert: false,
            alerttitle: '',
            alertdescription: '',
            userRole: JSON.parse(localStorage.getItem('@lingo')).role
        }

        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        this.callApi = this.callApi.bind(this)
        this.addNewLevel = this.addNewLevel.bind(this)
        this.editLevel = this.editLevel.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        
        this.save = this.save.bind(this)
        this.userId = this.props.match.params.id

    }

    componentWillMount () {
        this.callApi()      
    }

    callApi () {
        this.service.noAuthGet(`levels`)
        .then(res => {
            if(!res.success || !res.result.items)
            {
                return
            }
            this.setState({ levels : res.result.items})
        })
        .catch(err => console.log('ERRO GET USERS ', err))


        this.service.noAuthGet(`studentplans/getbyuserid/${this.userId}`)
        .then(res => {
            if(!res.success || !res.result.items)
            {
                return this.setState({ loading: false})
            }
            let studentPlanLanguages = []
            let studentId = -1
            res.result.items.map((plan) => {
                studentId = plan.student.id
                plan.studentPlanLanguages.map((studentPlanLanguage) => {
                    let indexLang = -1
                    studentPlanLanguages.map((lang,index) =>{
                        if(lang.lingoLanguageId === studentPlanLanguage.lingoLanguageId)
                            indexLang = index
                    })                  

                    if(indexLang === -1){
                        studentPlanLanguage.studentId = studentId
                        studentPlanLanguages.push(studentPlanLanguage)               
                    }
                })                       
            })
        
            this.service.noAuthGet(`studentManagement/listStudentLevelGrade?skip=0&take=99999&id=${this.userId}`)
            .then(res => {
                if(!res.success || !res.result.items)
                {
                    return this.setState({ loading: false})
                }

                res.result.items.map((level,i) =>{
                    let indexLang = -1
                    studentPlanLanguages.map((lang,index) =>{
                        if(lang.lingoLanguageId === level.lingoLanguageId)
                            indexLang = index
                    })
    
                    if(indexLang > -1){
                        level.editing = false
                        level.isnew = false
                        
                        if(!studentPlanLanguages[indexLang].levels)
                            studentPlanLanguages[indexLang].levels = []
                        studentPlanLanguages[indexLang].levels.push(level)
                    }
                })

                studentPlanLanguages.map((lang) =>{
                    if(!lang.levels)
                    {
                        let newlevel = {}
                        newlevel.levelId = 1
                        newlevel.oralGrade = ""
                        newlevel.writingGrade = ""
                        newlevel.dictationGrade = ""
                        newlevel.averageGrade = ""
                        newlevel.editing = true
                        newlevel.isnew = true
                        newlevel.lingoLanguageId = lang.lingoLanguageId
                        newlevel.studentId = lang.studentId

                        lang.levels = []
                        lang.levels.push(newlevel)
                    }
                })
                this.setState({ languagesbylevel : studentPlanLanguages, loading: false})
            })
            .catch(err => console.log('ERRO GET USERS ', err))
    
        })
        .catch(err => console.log('ERRO GET USERS ', err))
    }

    addNewLevel(e,index){
        let language = this.state.languagesbylevel
        let selectedLang = {...language[index]}
        
        //Foi preciso replicar toda a estrutura para não quebrar o endpoint
        let newlevel = {...language[index]}
        newlevel.levelId = 1
        newlevel.oralGrade = 0
        newlevel.writingGrade = 0
        newlevel.dictationGrade = 0
        newlevel.averageGrade = 0
        newlevel.editing = true
        newlevel.isnew = true
        selectedLang.levels.push(newlevel)
        this.setState({ languagesbylevel : language})
    }

    editLevel(e,languageIndex,lvlIndex){
        let newList = this.state.languagesbylevel
        newList.map((lang,index)=>{
            if(index === languageIndex){
                lang.levels.map((lvl,i)=>{
                    if(i === lvlIndex){
                        lvl.editing = !lvl.editing
                    }
                })
            }
        })
        this.setState({
            languagesbylevel: newList
        })
    }

    save(e, index){
        this.setState({ loading : true})
        let newLevels = []
        let updateLevels = []

        let haserror = false
        this.state.languagesbylevel[index].levels.map((lvl) => { 
                if(lvl.isnew && lvl.hasupdate){ //checkupdate para ignorar leveis adicionados e não editados
                    newLevels.push({
                        studentId: parseInt(lvl.studentId),
                        lingoLanguageId: parseInt(lvl.lingoLanguageId),
                        levelId:  parseInt(lvl.levelId),
                        oralGrade: parseFloat(lvl.oralGrade),
                        writingGrade: parseFloat(lvl.writingGrade),
                        dictationGrade: parseFloat(lvl.dictationGrade),
                        averageGrade: parseFloat(lvl.averageGrade)
                    })
                }else if(lvl.hasupdate){
                    updateLevels.push({
                        id: parseInt(lvl.id),
                        studentId: parseInt(lvl.studentId),
                        lingoLanguageId: parseInt(lvl.lingoLanguageId),
                        levelId:  parseInt(lvl.levelId),
                        oralGrade: parseFloat(lvl.oralGrade),
                        writingGrade: parseFloat(lvl.writingGrade),
                        dictationGrade: parseFloat(lvl.dictationGrade),
                        averageGrade: parseFloat(lvl.averageGrade)
                    })
                }
            })
        console.log(this.state.languagesbylevel[index].levels)
        this.state.languagesbylevel[index].levels.map((level) => {
          let i = newLevels.findIndex((lv) => { 
            return lv.levelId === level.levelId && this.state.languagesbylevel[index].levels.length > newLevels.length
          })
          if(i === 0) {
            haserror = true
          }
        })

        if(updateLevels.length == 0 && newLevels.length === 0){
          this.callApi()
        }

        if(!haserror)
        {
            if(newLevels.length > 0){
                this.service.ApiPosts(`studentManagement/createStudentLevelGradeArray`, newLevels)
                .then((res) => {
                    
                    if(!res || !res.data || !res.data.result.items || res.data.result.items.length === 0)
                    {
                        return
                    }

                    if(updateLevels.length == 0){
                        this.callApi()
                    }
                })
                .catch(err => { console.log(err) })
            }
            if(updateLevels.length > 0){
                this.service.ApiPut(`studentManagement/updateStudentLevelGradeArray`, updateLevels)
                .then((res) => {
                    this.callApi()
                })
                .catch(err => { console.log(err) })
            }
        } else {
          this.setState({ 
            openAlert: true, 
            loading: false,
            alertTitle: "SOMETHING IS WRONG",
            alertMessage : "LEVEL IS ALREADY ON THIS LANGUAGE"
          })
        }
        
    }

    handleChangeList (e,languageIndex,lvlIndex) {
        e.preventDefault()
        if(e.target.value !== ''){
            let newList = this.state.languagesbylevel
            newList.map((lang,index)=>{
                if(index === languageIndex){
                    lang.levels.map((lvl,i)=>{
                        if(i === lvlIndex){
                            lvl[e.target.name] = e.target.value
                            lvl.hasupdate = true
                        }
                    })
                }
            })
            this.setState({
                languagesbylevel: newList
            })
        }
    }

    closeAlert(e){
        this.setState({  openalert: false })
    }

    changeLevels = (e, index) => {
        const languagesbylevelToChange = this.state.languagesbylevel
        languagesbylevelToChange[index].levels = languagesbylevelToChange[index].levels.map( item => {return { ...item, editing: languagesbylevelToChange[index].levels[0].editing ?  false : true }})
        languagesbylevelToChange[index].levels = languagesbylevelToChange[index].levels.map( item => { return { ...item, editing: item.isnew  ?  true : languagesbylevelToChange[index].levels[0].editing }})
        this.setState({ languagesbylevel: languagesbylevelToChange  })
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
                            <ManageAccountTabs studentId={this.userId} />
                            <div className="tab-content">
                                
                                { this.state.languagesbylevel.map((language,index) => {
                                    return (
                                        <div key={index} className="box">      
                                            <div className="boxBig">
                                            { language.levels.map((level,i) => {
                                                return (
                                                    <div key={i} className="itemBox">
                                                        <div className="levelTop">
                                                            <div className="levelTopLinguage">
                                                                { i === 0 &&
                                                                    <div className="boxLanguage">
                                                                        <h5>LINGO</h5>
                                                                        <div className="language">
                                                                            <FlagIcon size={ 35 } code={language.lingoLanguage.flag} />
                                                                            <h5>{language.lingoLanguage.description}</h5>
                                                                        </div>
                                                                    </div>
                                                                } 
                                                             { i >= 1 &&
                                                                <div className="boxLanguage">
                                                                    <h5></h5>
                                                                    <div className="language">
                                                                        
                                                                    </div>
                                                                </div>  
                                                            } 
                                                                <div className="columLevel">
                                                                    <div className="boxLevel">
                                                                        <h5>{t('CARD_PLAN_LEVEL')}</h5>
                                                                        { level.editing ? (
                                                                            <select 
                                                                                name="levelId"
                                                                                value={level.levelId}
                                                                                onChange={(e) => this.handleChangeList(e,index,i)}>
                                                                                { this.state.levels.map((lvl) => {
                                                                                    return <option key={lvl.id} value={lvl.id}>{lvl.level}</option>
                                                                                    }
                                                                                )}
                                                                            </select>
                                                                        ):(
                                                                            <h5>{level.level ? level.level.level : ''}</h5>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grades"> 
                                                        { i < 1 &&                               
                                                            <h6>{t('GRADES')}</h6> 
                                                        }
                                                        { i >= 1 &&                               
                                                            <h6></h6> 
                                                        }
                                                            <div>
                                                                <h5><span>{t('ORAL')}</span></h5>
                                                                { level.editing ? (
                                                                    <input 
                                                                    id={'oral'+i }
                                                                    required={true}
                                                                    type="number"
                                                                    min= "0"
                                                                    max= "10"
                                                                    placeholder={this.t('ORAL')} 
                                                                    name='oralGrade' 
                                                                    value={level.oralGrade} 
                                                                    onChange={(e) => this.handleChangeList(e,index,i)} />
                                                                ):(
                                                                    <h5>{level.oralGrade}</h5>
                                                                )}
                                                                                                
                                                            </div>                               
                                                        </div>
                                                        <div>
                                                            <h5><span>{t('WRITING')}</span></h5>
                                                            { level.editing ? (
                                                                <input 
                                                                id={'writingGrade'+i }
                                                                type="number"
                                                                min= "0"
                                                                max= "10"
                                                                required={true}
                                                                placeholder={this.t('WRITING')} 
                                                                name='writingGrade' 
                                                                value={level.writingGrade} 
                                                                onChange={(e) => this.handleChangeList(e,index,i)} />
                                                            ):(
                                                                <h5>{level.writingGrade}</h5>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h5><span>{t('DICTATION')}</span></h5>
                                                            { level.editing ? (
                                                                <input 
                                                                id={'dictationGrade'+i }
                                                                type="number"
                                                                min= "0"
                                                                max= "10"
                                                                required={true}
                                                                placeholder={this.t('DICTATION')} 
                                                                name='dictationGrade' 
                                                                value={level.dictationGrade} 
                                                                onChange={(e) => this.handleChangeList(e,index,i)} />
                                                            ):(
                                                                <h5>{level.dictationGrade}</h5>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h5>
                                                                <span>
                                                                    <strong>{t('AVERAGE')}</strong>
                                                                </span>
                                                            </h5>
                                                            { level.editing ? (
                                                                <input 
                                                                id={'averageGrade'+i }
                                                                type="number"
                                                                min= "0"
                                                                max= "10"
                                                                required={true}
                                                                placeholder={this.t('AVERAGE')} 
                                                                name='averageGrade' 
                                                                value={level.averageGrade} 
                                                                onChange={(e) => this.handleChangeList(e,index,i)} />
                                                            ):(
                                                                <h5>{level.averageGrade}</h5>
                                                            )}
                                                        </div>
                                                        {this.state.userRole != 'b2b' && 
                                                            <div className="buttonLast">
                                                        
                                                                { language.levels.length-1 === i  && (
                                                                    <Fragment>
                                                                        <button style={{marginBottom: '10px'}} onClick={(e) => this.changeLevels(e,index)}>Change</button>
                                                                        <button onClick={(e) => this.addNewLevel(e,index)}>Add New Level + </button>
                                                                    </Fragment>
                                                                ) 
                                                                }  

                                                            </div>
                                                        }
                                                    </div>
                                                )})}
                                                { language.levels.filter((lvl) => lvl.editing).length > 0 &&
                                                    <div className='buttons'>                  
                                                        <button className="active" onClick={(e) => this.save(e, index)}>Save</button>
                                                    </div>                  
                                                }      
                                            </div>
                                            </div>  
                                        )} 
                                            
                                    )} 
                                    {this.state.languagesbylevel.length === 0 &&
                                        <div align='center'>
                                            <h4 style={{fontSize: '24px', fontFamily: 'Quicksand', fontWeight: '500', color:'#797881',  margin: '20px'}}>No results</h4>
                                        </div>
                                    }
                                            
                                          
                                    </div> 
                                </div> 
                            </div>                            
                        </StudentManagementCss>                        
                        <Dialog open={this.state.openAlert} onClose={() => this.setState({openAlert: false})} className="alert-dialog-slide">
                          <DialogTitle className="alert-dialog-slide-title">
                            {t(this.state.alertTitle)}
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

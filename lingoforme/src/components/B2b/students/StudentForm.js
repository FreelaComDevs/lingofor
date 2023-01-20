import React, { Component } from 'react';
import { Redirect} from 'react-router-dom'
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from './actions';
import TimezonePicker from 'react-timezone';
import { User } from '../companies/styles';
import Photo from './components/Photo';
import Email from './components/Email';
import Language from './components/Language';
import Country from './components/Country';
import Phone from './components/Phone';
import Plan from './components/Plan';
import ListLanguage from './components/ListLanguage';
import Switch from './components/Switch';
import Switchs from './components/Switchs';
import InputForClassTool from '../../../elements/NewInputs/InputForClassTool';

import './styles.scss';

import Loading from 'react-fullscreen-loading'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class StudentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDialog2: false,
      showDialog: false,     
      alertMessage: '',
      loading: false,
      redirect: false,
      success: false,
      languages: [],
      plans:[], 
      selectedPlan:null,
      studentPlanLanguages:[],
      level: '' 
    }

  }

  async componentDidMount() {
    const { student, apiClient } = this.props;
    const plans = await apiClient.fetchContractsById(student.contractId)
    const languages = await apiClient.fetchLingoLanguages();
    

    let selectedPlan = []
    if(student.contractPlanId){
      selectedPlan = plans.filter(p => p.contractPlanId === student.contractPlanId)
      selectedPlan = selectedPlan.length > 0 ? selectedPlan[0] : []
    }
    if(student && student.id !== ""){
      const levels = await apiClient.fetchStudentLevelGrade(student.id)
      let levelId = 0
      levels.map(lvl => {
        if(lvl.level.id > levelId){
          levelId = lvl.level.id
        }
      })
      this.setState({level: levelId})
    }
    this.setState({ plans, selectedPlan, languages },() => this.studentPlanLanguages(selectedPlan))
  }

  studentPlanLanguages = (selectedPlan) => {
    const { student } = this.props
    const { languages } = this.state
    let studentPlanLanguages = []    
    selectedPlan = selectedPlan.length > 0 ? selectedPlan[0] : selectedPlan

    if(student && student.studentPlanLanguages && student.studentPlanLanguages.length > 0){
      studentPlanLanguages = student.studentPlanLanguages
    }else if(selectedPlan && selectedPlan.multiLingo){
        languages.map(l =>{
            studentPlanLanguages.push({ lingoLanguageId: l.id, focus: 'traditional',  struct: 'balanced', studentLanguageLevel: 0 })
        })
    }else {
        studentPlanLanguages.push({ lingoLanguageId: (languages.length > 0 ? languages[0].id : 0), focus: 'traditional', struct: 'balanced', studentLanguageLevel: 0 })
    }
    this.setState({ studentPlanLanguages })
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.changeItem(name, value);
  }

  changeLanguages = (name, value, index) => {
    let studentPlanLanguages = this.state.studentPlanLanguages
    studentPlanLanguages[index][name] = value
    
    this.setState({studentPlanLanguages})
    this.changeItem('studentPlanLanguages', studentPlanLanguages)
  }
 
  handlePlan = async (e) => {
    let { name, value } = e.target
    const { plans } =this.state
    let selectedPlan = plans.filter(p => p.contractPlanId == value)
    await this.changeItem('studentPlanLanguages', [])
    await this.changeItem(name, value)
    this.setState({selectedPlan}, () => this.studentPlanLanguages(selectedPlan))  
  }

  inputChange = (change) => {
    const { value, name, type } = change
    this.changeItem(name, value);
  }
  
  changeItem = (name, value) => {
    const { student, service } = this.props;
    const newStudent = service.deepChange({
      original: student,
      field: name,
      value
    });
    this.props.actions.changeItem(newStudent);
  }

  handleBack = () => {
    this.props.setParentState({
      showAddStudentForm: false
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.btn.setAttribute("disabled", "disabled")
    this.setState({ loading: true })

    const { student, service, apiClient, setParentState } = this.props;
    const req = service.prepare(student);
    try {

      if(!req.birthDate){
        delete req.birthDate
      }

      const res = await apiClient.saveStudent(req);
      this.setState({
        showDialog2: true,
        showDialog: false,
        showAddStudentForm: false, 
        redirect: false, 
        loading: false,
        success: true       
      })
      const userId = res.result.items[0].id;
      if (student.file) {
        const formData = new FormData();
        formData.append('file', student.file);
        await apiClient.uploadPicture(userId, formData);
      }
      this.btn.removeAttribute("disabled")
    } catch(err) {
      this.btn.removeAttribute("disabled")
      if(err.data && err.data.error && err.data.error.message ){
        if(err.data.error.message.indexOf('The maximum students per plan limit reached') !== -1){
          this.setState({
            showDialog2: false,
            showDialog: true,
            alertMessage: this.props.t('MAXIMUM_STUDENTS'),
            loading: false,
            redirect: false,
            success: false,
           
          })
        }
        else{
          this.setState({
            showDialog2: false,
            showDialog: true,
            alertMessage: err.data.error.message,
            loading: false,
            redirect: false,
            success: false
           
          })
        }
      }
    }
  }


  render() {
    const { redirect, success, plans, selectedPlan, level } = this.state;
    const { t, student } = this.props;
    if (redirect) {
      return <Redirect goBack/>;
    }
    return (<User>

      {
        this.state.loading &&
        <Loading loading={true} background="rgba(0,0,0,0.6)"
        loaderColor="#3498db"/>
      }  


      <Dialog open={this.state.showDialog2} onClose={() => this.setState({showDialog2: false})} className="alert-dialog-slide boxModal">
        <DialogTitle className="alert-dialog-slide-title boxModal">
        {('Aluno Cadastrado')}
        </DialogTitle>

        <DialogActions className="alert-dialog-slide-actions boxModal">
        <button type="button" className="btn-back" onClick={this.handleBack} >
          {('Back')}
        </button>
        </DialogActions>
      </Dialog> 

      <Dialog open={this.state.showDialog} onClose={() => this.setState({showDialog: false})} className="alert-dialog-slide boxModal">
        <DialogTitle className="alert-dialog-slide-title boxModal">
          {t('SOMETHING_WENT_WRONG')}
        </DialogTitle>
        <DialogContent className="alert-dialog-slide-content boxModal">
          {t(this.state.alertMessage)}
        </DialogContent>
        <DialogActions className="alert-dialog-slide-actions boxModal">
          <button className="new-button close" onClick={() => this.setState({showDialog: false})}>
            {t('OK')}
          </button>
        </DialogActions>
      </Dialog> 
      <div className='bigBox bigBoxForm' style={{paddingLeft: '100px'}}>

        <h2>{t('ADD_NEW_STUDENT')}</h2>
        
        <div className='viewUser'>
          <Photo {...this.props} item={student} onChange={this.handleChange} />
          <div className='formulario'>
            <h4>Personal information</h4>

            <div>
              <div>
                <label>{t('NAME')}</label>
                <span>{t('REQUIRED')}</span>
              </div>
              <input
                placeholder='Your name'
                name='name'
                type="text"
                className='inputMobile'
                value={student.name}
                onChange={this.handleChange}
              />
            </div>

            <Email {...this.props} item={student} />

            <div className='inputs'>
              <div className='lineInputs'>
                <div>
                  <label>{t('GENDER')}</label>
                  <span>{t('REQUIRED')}</span>
                </div>
                <select
                  value={student.gender}
                  onChange={this.handleChange}
                  className='input-lingo mediumSelect'
                  name='gender'>
                  <option value='male'>{t('MALE')}</option>
                  <option value='female'>{t('FEMALE')}</option>
                </select>
              </div>
              <div className='lineInputs'>
                <div>
                  <label>{t('BIRTH_DATE')}</label>
                </div>
                <input
                  type="date"
                  value={student.birthDate}
                  onChange={this.handleChange}
                  className='input-lingo selectDate'
                  name='birthDate'
                />
              </div>
            </div>

            <Language {...this.props} item={student} />

            <div className='inputs'>
              <Country {...this.props} item={student} handleChange={this.handleChange} />
              <div className='lineInputs'>
                <div>
                  <label>Timezone</label>
                  <span>{t('REQUIRED')}</span>
                </div>
                <TimezonePicker
                  value={student.timezone}
                  onChange={timezoneName => {
                    const e = {};
                    e.target = {
                      name: 'timezone',
                      value: timezoneName
                    }
                    this.handleChange(e)
                  }}
                  inputProps={{
                    placeholder: 'Select Timezone...',
                    name: 'timezone'
                  }}
                />
              </div>
            </div>
            <div className="inputs b2bClassTool">
                  <div className="lineInputs">
                      <InputForClassTool name="classTool" data={{ value: student.classTool, required: false}} inputChange={this.inputChange} />
                  </div>
                  <div className="lineInputs">
                      <div>
                          <label htmlFor="classToolId">{ t("TOOL_ID") }</label>
                          {/* <span className='invalid'>{  this.state.validations['classToolId'] }</span> */}
                      </div>
                      <input type="text" id='classToolId' name="classToolId" value={student.classToolId} onChange={this.handleChange} placeholder={t("STUDENT_TOOL_ID")}/>
                  </div>
            </div>
            <div>
              <div>
                <label>{t('ADDRESS')}</label>
                <span>{t('REQUIRED')}</span>
              </div>
              <input
                placeholder='Address'
                name='address'
                value={student.address}
                onChange={this.handleChange}
              />
            </div>

            <Phone {...this.props} item={student} />

            <h4>Classes settings</h4>

            { plans &&
              <Plan {...this.props} item={student} plans={this.state.plans} onChange={this.handlePlan} />
            }
            
            { level ?
              (<div className='inputs'>
                <div className='inputs lineInputs' style={{flexDirection: "column"}}>
                  <ListLanguage {...this.props} selectedPlan={selectedPlan} onChangeLanguages={(o, v, i) => this.changeLanguages(o, v, i) } studentPlanLanguages={this.state.studentPlanLanguages} student={student} level={level} t={t}/>
                  {/* <StudentPlan {...this.props} item={student} selectedPlan={selectedPlan}  changeLanguages={(obj, lingoLanguageId) => this.changeLanguages(obj, lingoLanguageId)}/> */}
                </div>
              </div>) : (
                <div className='inputs'>
                <div className='inputs lineInputs' style={{flexDirection: "column"}}>
                  <ListLanguage {...this.props} selectedPlan={selectedPlan} onChangeLanguages={(o, v, i) => this.changeLanguages(o, v, i) } studentPlanLanguages={this.state.studentPlanLanguages} student={student} t={t}/>
                  {/* <StudentPlan {...this.props} item={student} selectedPlan={selectedPlan}  changeLanguages={(obj, lingoLanguageId) => this.changeLanguages(obj, lingoLanguageId)}/> */}
                </div>
              </div>
              )
            }

            <div>
              <div>
                <label>{t('TARGET_CLASSES_PER_MONTH')}</label>
                <span>{t('REQUIRED')}</span>
              </div>
              <input
                type='text'
                style={{width: '220px'}}
                value={student.studentB2b.targetClassesPerMonth}
                name='studentB2b.targetClassesPerMonth'
                onChange={this.handleChange}
              />
            </div>

            <div>
              <div>
                <label>{t('OBSERVATION')}</label>
                <span>{t('REQUIRED')}</span>
              </div>
              <textarea
                name='studentB2b.observation'
                maxLength="2000"
                value={student.studentB2b.observation}
                onChange={this.handleChange}>
              </textarea> 
            </div>

            <h4>Permissions settings</h4>

            <div style={{paddingTop:'20px', paddingBottom:'30px'}}>
              <Switchs item={student} onChange={this.handleChange} />
            </div>

            <div>
              <div>
                <label>Status</label>
              </div>
              <Switch
                name='active'
                value={student.active}
                onChange={this.handleChange}
                checked='Active'
                notChecked='Inactive'
              />
            </div>


          </div>
        </div>
      </div>
      <div className='form-buttons'>
        <button type="button" className="btn-back" onClick={this.handleBack} >
          <i className="fa fa-angle-left" aria-hidden="true"></i>{t('BTN_BACK')}
        </button>
        <button type="submit" className='btn-save' ref={btn => { this.btn = btn; }}  onClick={this.handleSubmit}>{t('SAVE')}</button>
      </div>
    </User>)
  }

}

const mapStateToProps = state => {
  return {
    student: state.students.student
  };
};

const mapDispatchToProps = dispatch => ({
  actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(StudentForm))

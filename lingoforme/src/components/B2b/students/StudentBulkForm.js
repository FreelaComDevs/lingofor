import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from './actions';
import { User } from '../companies/styles';
import Loading from 'react-fullscreen-loading';

import './styles.scss';

class StudentBulkForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  
  getInitialState() {
    return {
      filename: '',
      file: '',
      errors: [{
        line: 1,
        messages: [],
      }, {
        line: 2,
        messages: []
      }],
      validObjects: [],
      done: false,
      loading: false
    };
  }

  addBulkStudent = () => {
    this.setState(this.getInitialState());
  }

  handleUpload = e => {
    const file = e.target.files[0];
    if (file) {
      this.setState({ file, filename: file.name });
    }
  }

  handleBack = () => {
    this.props.setParentState({
      showAddStudentBulkForm: false
    });
  }

  handleClick = e => {
    this.refs.fileUploader.click();
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { contract, service, apiClient, setParentState } = this.props;
    const { file } = this.state;
    try {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      this.setState({ loading: true });
      const res = await apiClient.bulkInsert(contract.id, formData);
      const items = res.data.result.items[0];
      const { errors, validObjects } = items;
      this.setState({
        loading: false,
        errors,
        validObjects,
        done: errors.length > 0 || validObjects.length > 0
      });
    } catch(err) {
      console.log('Failed to bulk add student.', err);
      this.setState({ loading: false });
    }
  }

  render() {
    const { t } = this.props;
    const { done, validObjects, errors, loading } = this.state;
    return (<User>
      <div className='bigBox bigBoxForm' style={{paddingLeft: '100px'}}>
        { loading && <Loading loading={loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/> }

        <h2>{t('BULK_ADD_NEW_STUDENT')} {done ? (<strong>&#9679; {t('BULK_RESULTS')}</strong>) : null}</h2>
        
        <div className={done ? 'hide' : 'form-upload'}>
          <div className="formulario">
              <div className="bulk">
                  <h3>Add multiple students to this contract. Select your data file and upload it.</h3>
                  <button type="button" onClick={this.handleClick} className="btn-upload">Select file</button>
                  <input
                      ref="fileUploader"
                      type='file'
                      className="hide"
                      onChange={this.handleUpload}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                   />
                  <div className={this.state.filename ? 'filename' : 'hide'}>
                      <b>File:</b> {this.state.filename}
                  </div>
              </div>
          </div>

          
        </div>

        <div className={!done ? 'hide' : 'bulk-results'}>
          <div className="formulario">
            {validObjects && validObjects.length > 0 ? 
              <div className="success">
                <h4>{validObjects.length} students sucessfully added!</h4>
                <button type="button" onClick={() => this.props.setParentState({showAddStudentBulkForm:false})} className="btn">{t('BTN_VIEW')}</button>
              </div> : null
            }

            {errors && errors.length > 0 ?
              <div className="errors">
                <h4>{errors.length} students couldn't be added :(</h4>
                <div className="list">
                  {errors.map(error => {
                    return <div key={JSON.stringify(error)}>
                      <h4>&#9679; Line {error.line}</h4>
                      <ul>
                        {error.messages.map(e => {
                          return <li key={JSON.stringify(e)}>{e}</li>
                        })}
                      </ul>
                    </div>
                  })}
                </div>
              </div> : null
             }
          </div>
          <div className='form-buttons'>
            <button type="button" className="btn-save" style={{width:'200px',marginRight:'20px'}} onClick={this.addBulkStudent}>
              <i className="fa fa-plus" aria-hidden="true"></i> {t('BULK_ADD_STUDENT')}
            </button>
            <button type="button" className="btn-save" style={{width:'200px'}} onClick={this.props.addNewStudent}>
              <i className="fa fa-plus" aria-hidden="true"></i> {t('ADD_NEW_STUDENT')}
            </button>
          </div>
        </div>
      </div>

      <div className='form-buttons'>
            <button type="button" className="btn-back" onClick={this.handleBack} >
              <i className="fa fa-angle-left" aria-hidden="true"></i>{t('BTN_BACK')}
          </button>
          <button type="submit" className='btn-save' onClick={this.handleSubmit}>{t('UPLOAD')}</button>
        </div>
    </User>)
  }

}

const mapStateToProps = state => {
  return {
    contract: state.contracts.contract
  };
};

const mapDispatchToProps = dispatch => ({
  actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(StudentBulkForm))

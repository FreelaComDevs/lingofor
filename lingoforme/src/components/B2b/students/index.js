import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from './actions';
import StudentService from './service';
import StudentsFilter from './StudentsFilter';
import StudentsList from './StudentsList';
import StudentForm from './StudentForm';
import StudentBulkForm from './StudentBulkForm';
import { FilterUser } from '../companies/styles';
import ApiClient from './apiClient';
import StudentReportModal from './StudentReportModal';
import Loading from 'react-fullscreen-loading'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


export class Students extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddStudentForm: false,
      showAddStudentBulkForm: false,
      showStudentReport: false,
      student: {},
      loading: false,
      showDialog: false,
      alertMessage: ''
    }
    this.service = new StudentService();
    this.apiClient = new ApiClient();
  }

  setParentState = state => {
    this.setState(state);
  }

  addNewStudent = () => {
    const contractId = this.props.contract.id;
    this.props.actions.clearStudent(null, contractId);
    this.setState({ showAddStudentForm: true, showAddStudentBulkForm: false })
  }

  addBulkStudent = () => {
    const contractId = this.props.contract.id;
    this.props.actions.clearStudent(null, contractId);
    this.setState({ showAddStudentBulkForm: true, showAddStudentForm: false })
  }



  render() {
    const deps = {
      service: this.service,
      apiClient: this.apiClient,
      setParentState: this.setParentState,
      student: this.state.student,
      t : this.props
    };
    const { t } = this.props;

    return (
      <div>
        
        {!this.state.showAddStudentForm && !this.state.showAddStudentBulkForm &&
          <FilterUser>
            <div>
              <div className='button' style={{ height: '55px' }}>
                <button type="button" onClick={this.addBulkStudent}>
                  <i className='fa fa-plus' aria-hidden='true' /> {t('BULK_ADD_STUDENT')}
                </button>
                <button style={{ marginLeft: '20px' }} type="button" onClick={this.addNewStudent}>
                  <i className='fa fa-plus' aria-hidden='true' /> {t('ADD_NEW_STUDENT')}
                </button>
              </div>
              <StudentsFilter {...deps} />
            </div>
            <StudentsList {...deps} />
          </FilterUser>
        }
        {this.state.showAddStudentForm && <StudentForm {...deps} />}
        {this.state.showAddStudentBulkForm && <StudentBulkForm {...deps} addNewStudent={this.addNewStudent} />}
        {this.state.showStudentReport && <StudentReportModal {...deps} />}
        {this.state.loading && <Loading loading={true} background="rgba(0,0,0,0.6)"
                        loaderColor="#3498db" />
        }
        {/* {this.state.showDialog &&
          <Dialog open={this.state.showDialog} onClose={() => this.setState({showDialog: false})} className="alert-dialog-slide">
                          <DialogTitle className="alert-dialog-slide-title">
                            {t('SOMETHING_WENT_WRONG')}
                          </DialogTitle>
                          <DialogContent className="alert-dialog-slide-content">
                            {t(this.state.alertMessage)}
                          </DialogContent>
                          <DialogActions className="alert-dialog-slide-actions">
                            <button className="new-button close" onClick={() => this.setState({showDialog: false})}>
                              {t('OK')}
                            </button>
                          </DialogActions>
                        </Dialog> 
        } */}
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    contract: state.contracts.contract
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Students))

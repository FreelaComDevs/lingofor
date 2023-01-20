import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { TableUser } from '../companies/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from './actions';
import Placeholder from '../../_common/placeholder/placeholderByPage';
import moment from "moment";


class StudentsList extends Component {

  async componentDidMount() {
    const { service, apiClient, contract, actions } = this.props;
    const emptyFilter = service.getEmptyFilter();
    const filter = {
      ...emptyFilter,
      contractId: contract.id
    }
    const items = await apiClient.fetchStudents(filter);
    actions.setStudents(items);
    this.setState({ showStudentReport: false });
  }

  setSelected = item => {
    const { service, actions, contract } = this.props;
    if (item) {
      const student = service.getStudentFrom(item);
      actions.setStudent(student, contract.id);
    }

    this.props.setParentState({
      showAddStudentForm: true
    });
  }

  showModal = (item) => {
    this.props.setParentState({
      showStudentReport: true,
      student: item
    });
  }

  render() {
    const { t } = this.props;
    const items = this.props.students || [];
    
    return (<TableUser>
      <div>
        <div className='bigBox'>
          <table>
            <thead>
              <tr>
                <th>{t('NAME')}</th>
                <th>{t('COUNTRY')}</th>
                <th>{t('SUBSCRIPTION_DATE')}</th>
                <th>{t('RESETS_ON')}</th>
                <th>{t('PLAN')}</th>
                <th>{t('STATUS')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                let nextCycle = ""
                if(item.students.length && item.students[0].contractPlanStudents.length && item.students[0].contractPlanStudents[0].studentPlanB2BRenewalCycle){
                  nextCycle = moment(item.students[0].contractPlanStudents[0].studentPlanB2BRenewalCycle.nextCy).utc().format(t('DATE_FORMAT'))
                }
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.country.name}</td>
                    <td>{moment(item.createdAt).utc().format(t('DATE_FORMAT'))}</td>
                    <td>{nextCycle}</td>
                    <td>{item.students[0].studentPlans[0].plan.nameEnglish}</td>
                    <td><span className={(!item.active) ? 'inativo' : ''}>{(item.active) ? 'Active' : 'Inactive'}</span></td>
                    <td>
                      <button type="button" onClick={() => this.setSelected(item)}>
                        {t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </button>
                      <button type="button" onClick={() => this.showModal(item)}>
                        {t('REPORT')} <i className="fa fa-angle-right" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {items.length === 0 &&
        <div style={{ paddingTop: '50px' }}>
          <Placeholder pageName='users' textMsg='Nothing here yet' />
        </div>
      }
    </TableUser>
    )
  }
}

const mapStateToProps = state => {
  return {
    students: state.students.students,
    contract: state.contracts.contract
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(StudentsList))

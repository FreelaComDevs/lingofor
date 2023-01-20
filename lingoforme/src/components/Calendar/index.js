import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { setCalendarInitialParams, getScheduledClasses } from '../../actions/calendarActions';
import { getUserInfo } from '../../actions/userActions';
import SideMenu from '../_common/SideMenu/SideMenu';
import Header from '../_common/header/NewHeader';
import scheduleIcon from '../../images/icons/icon_schedule_header.svg';
import Calendar from './Calendar';
import moment from 'moment'

class CalendarIndex extends Component {

  componentDidMount() {
    const { location: { state }, setCalendarInitialParams, getUserInfo } = this.props;
    const targetDate = state ? moment(state.newSchedule.scheduledStartDateTime) : "";
    getUserInfo();
    setCalendarInitialParams(targetDate);
  }

  render () {
  const { t, calendar: { atualDate }, user: { role }} = this.props

    return (
      <div className='view new-view calendar-view'>
        <SideMenu />
        <Header title={t("ITEM_SCHEDULE")} icon={scheduleIcon} />
        { atualDate && role && <Calendar/> }
      </div>
    )
  }
}

const mapStateToProps = ({ calendar, user }) => ({ calendar, user })
const mapDispatchToProps = dispatch => ({
  getUserInfo: data => dispatch(getUserInfo(data)),
  getScheduledClasses: data => dispatch(getScheduledClasses(data)),
  setCalendarInitialParams: data => dispatch(setCalendarInitialParams(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(CalendarIndex)))

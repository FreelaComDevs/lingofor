import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { translate } from "react-i18next";
import { withRouter } from 'react-router-dom';
import {
  setCalendarScreen,
  setCalendarSchedules,
  applyCalendarFilters,
  clearCalendarFilters
} from '../../actions/calendarActions';
import { getNextClasses } from '../../actions/userActions';
import moment from "moment";
import Filter from '../../elements/NewFilter';
import CalendarHeader from "./CalendarHeader";
import MonthCalendar from "./MonthCalendar";
import WeekCalendar from "./WeekCalendar";
import DayCalendar from "./DayCalendar";
import ListCalendar from "./ListCalendar";
import NextClass from "../_common/tableClass/nextClass";
import InputForDate from "../../elements/NewInputs/InputForDate";
import InputForSelect from "../../elements/NewInputs/InputForSelect";
import InputForLingoLanguages from "../../elements/NewInputs/InputForLingoLanguages";
import InputForLingoPlan from "../../elements/NewInputs/InputForLingoPlan";
import InputForStatus from "../../elements/NewInputs/InputForStatus";
import InputForText from "../../elements/NewInputs/InputForText";
import Loading from 'react-fullscreen-loading'
import Example from './calendarSchedule'

class Calendar extends Component {
  state = this.initialState;

  get initialState() {
    const {
      selectedStart,
      selectedEnd,
    } = this.props.calendar
    return {
      filters: {
        startAt: { value: moment().format("YYYY-MM-DD") },
        endAt: { value: moment().format("YYYY-MM-DD") },
        lingoLanguageId: { value: "" },
        type: { value: "" },
        planId: { value: "" },
        status: { value: "" },
        student: { value: "" },
        teacher: { value: "" },
      },
      newScheduledClass: null
    }

  }

  handlerAcepptClass = () => {
    const newScheduledClass = this.props.location.state ? this.props.location.state.newSchedule : null

    if (newScheduledClass) {
      this.setState({
        newScheduledClass
      })
    }
  }

  componentDidMount() {
    this.props.getNextClasses()

  }

  componentWillMount() {
    this.handlerAcepptClass()
  }

  applyFilters = (e) => {
    e.preventDefault()
    const { state: { filters, filters: { startAt, endAt } }, props: { applyCalendarFilters } } = this
    if (!startAt.value || !endAt.value) { return alert("Por favor, confira o campo de data") }
    applyCalendarFilters({ ...filters })
  }

  clearFilters = async (e) => {
    e.preventDefault()
    const { location: { state }, clearCalendarFilters } = this.props
    const targetDate = state ? moment(state.newSchedule.scheduledStartDateTime) : "";
    await clearCalendarFilters(targetDate)
    this.setState({ filters: this.initialState.filters })
  }

  inputChange = (change) => {
    const { value, name } = change
    this.setState({ filters: { ...this.state.filters, [name]: { value: value } } })
  }
  viewHandler = activeScreen => {
    this.props.setCalendarScreen(activeScreen)
  };

  onDateClick = async (day) => {
    console.log(this.props.calendar.selectedLingoLanguageId)
    const {
      state: { filters },
      props: {
        setCalendarSchedules,
        calendar: {
          selectedLingoLanguageId,
          selectedPlanId,
          scheduleType,
          selectedStatus,
          selectedStudent,
          selectedTeacher,
        }
      },
    } = this;
    const activeScreen = "list";
    const getSchedulesObj = {
      activeScreen,
      selectedStart: day.clone().startOf("day"),
      selectedEnd: day.clone().endOf("day"),
      selectedLingoLanguageId,
      selectedPlanId,
      scheduleType,
      selectedStatus,
      selectedStudent,
      selectedTeacher
    };
    await setCalendarSchedules(getSchedulesObj);
    this.props.setCalendarScreen(activeScreen)
    this.setState({
      filters: {
        ...filters,
        startAt: { value: getSchedulesObj.selectedStart },
        endAt: { value: getSchedulesObj.selectedEnd }
      }
    })
  };

  onScheduleClick = (e, scheduleId) => {
    e.stopPropagation()
    this.props.history.push(`/class-details/${scheduleId}`);
  };

  onSchedulesClick = async (e, day, languageId, dateTime) => {
    e.stopPropagation();
    const {
      state: { filters },
      props: {
        setCalendarSchedules,
        calendar: {
          selectedPlanId,
          scheduleType,
          selectedStatus,
          selectedStudent,
          selectedTeacher,
        }
      },

    } = this;
    const activeScreen = "list"
    const getSchedulesObj = {
      selectedStart: day.clone(),
      selectedEnd: dateTime ? day.clone() : day.clone().endOf("day"),
      activeScreen,
      selectedLingoLanguageId: languageId,
      scheduleType,
      selectedPlanId,
      selectedStatus,
      selectedStudent,
      selectedTeacher
    };
    await setCalendarSchedules(getSchedulesObj);
    this.props.setCalendarScreen(activeScreen)
    this.setState({
      filters: {
        ...filters,
        startAt: { value: getSchedulesObj.selectedStart },
        endAt: { value: getSchedulesObj.selectedEnd },
        lingoLanguageId: { value: languageId }
      }
    });
  };

  nextDate = async () => {
    if (this.props.location.state && this.props.location.state.newSchedule) {
      this.props.location.state.newSchedule = null
    }

    this.setState({
      newScheduledClass: null
    })
    const {
      state: { filters },
      props: {
        setCalendarSchedules,
        user: { role },
        calendar: {
          activeScreen,
          selectedStart,
          selectedEnd,
          selectedPlanId,
          selectedType,
          selectedLingoLanguageId,
          selectedStatus,
          selectedStudent,
          selectedTeacher,
        }
      },
    } = this;
    const isManager = role === "companyManager" || role === "customerService" || role === "coordinator";
    let time = activeScreen === "list" ? "day" : activeScreen
    const newSelectedStart = selectedStart.clone().add(1, time)
    const newSelectedEnd = selectedEnd.clone().add(1, time)
    const getSchedulesObj = {
      selectedStart: newSelectedStart,
      selectedEnd: newSelectedEnd,
      selectedDateTime: "",
      activeScreen,
      selectedLingoLanguageId,
      selectedType,
      selectedPlanId,
      selectedStatus,
      selectedStudent,
      selectedTeacher
    }
    await setCalendarSchedules(getSchedulesObj);
    this.setState({
      filters: {
        ...filters,
        startAt: { value: getSchedulesObj.selectedStart.format("YYYY-MM-DD") },
        endAt: { value: getSchedulesObj.selectedEnd.format("YYYY-MM-DD") },
        lingoLanguageId: { value: getSchedulesObj.selectedLingoLanguageId }
      }
    });
  };

  prevDate = async () => {
    if (this.props.location.state && this.props.location.state.newSchedule) {
      this.props.location.state.newSchedule = null
    }

    this.setState({
      newScheduledClass: null
    })
    const {
      state: { filters },
      props: {
        setCalendarSchedules,
        user: { role },
        calendar: {
          activeScreen,
          selectedStart,
          selectedEnd,
          selectedPlanId,
          selectedType,
          selectedLingoLanguageId,
          selectedStatus,
          selectedStudent,
          selectedTeacher,
        }
      },
    } = this;
    const isStudent = role === "student";
    let time = activeScreen === "list" ? "day" : activeScreen
    const newSelectedStart = selectedStart.clone().subtract(1, time)
    const newSelectedEnd = selectedEnd.clone().subtract(1, time)
    const getSchedulesObj = {
      selectedStart: newSelectedStart,
      selectedEnd: newSelectedEnd,
      selectedDateTime: "",
      activeScreen,
      selectedLingoLanguageId,
      selectedType,
      selectedPlanId,
      selectedStatus,
      selectedStudent,
      selectedTeacher
    }
    await setCalendarSchedules(getSchedulesObj);
    this.setState({
      filters: {
        ...filters,
        startAt: { value: getSchedulesObj.selectedStart.format("YYYY-MM-DD") },
        endAt: { value: getSchedulesObj.selectedEnd.format("YYYY-MM-DD") },
        lingoLanguageId: { value: getSchedulesObj.selectedLingoLanguageId }
      }
    });
  };

  atualDate = async () => {
    if (this.props.location.state && this.props.location.state.newSchedule) {
      this.props.location.state.newSchedule = null
    }
    this.setState({
      newScheduledClass: null
    })
    const { newScheduledClass } = this.state
    const {
      state: { filters },
      props: {
        setCalendarSchedules,
        user: { role },
        calendar: {
          atualDate,
          activeScreen,
          selectedPlanId,
          selectedType,
          selectedLingoLanguageId,
          selectedStatus,
          selectedStudent,
          selectedTeacher,
        }
      },
    } = this;
    const isStudent = role === "student" || role === "teacher";
    const weekStart = atualDate.clone().startOf("week").startOf("day");
    const weekEnd = atualDate.clone().endOf("week").endOf("day");
    const newSelectedStart = atualDate.clone().startOf("day") // newScheduledClass ? moment(newScheduledClass.scheduledDate).startOf("day") : atualDate.clone().startOf("day") 
    const newSelectedEnd = atualDate.clone().endOf("day") //newScheduledClass ? moment(newScheduledClass.scheduledDate).endOf("day") : atualDate.clone().endOf("day")
    const getSchedulesObj = {
      selectedStart: newSelectedStart,
      selectedEnd: newSelectedEnd,
      selectedDateTime: "",
      activeScreen,
      selectedLingoLanguageId,
      selectedType,
      selectedPlanId,
      selectedStatus,
      selectedStudent,
      selectedTeacher
    }
    await setCalendarSchedules(getSchedulesObj);
    this.setState({
      filters: {
        ...filters,
        startAt: { value: getSchedulesObj.selectedStart.format("YYYY-MM-DD") },
        endAt: { value: getSchedulesObj.selectedEnd.format("YYYY-MM-DD") },
        lingoLanguageId: { value: getSchedulesObj.lingoLanguageId }
      }
    });

  }

  calendarRender = () => {
    const {
      onDateClick,
      onScheduleClick,
      onSchedulesClick,
      props: { calendar: { activeScreen, atualDate, selectedStart, selectedEnd, scheduledClasses } }
    } = this;

    const { newScheduledClass } = this.state

    if (newScheduledClass) {
      newScheduledClass.toSchedule = true;
    }

    const oldClass = newScheduledClass ? scheduledClasses.find(item => item.id === newScheduledClass.id) : null
    const newScheduledClasses = (oldClass || !newScheduledClass) ? scheduledClasses : scheduledClasses.concat(newScheduledClass)

    const calendarObj = {
      selectedStart: newScheduledClass ? moment(newScheduledClass.scheduledDate) : selectedStart,
      selectedEnd,
      schedules: newScheduledClasses,
      atualDate: newScheduledClass ? moment(newScheduledClass.scheduledDate) : atualDate,
      onDateClick,
      onScheduleClick,
      onSchedulesClick,
      activeScreen
    };
    switch (activeScreen) {
      case "month":
        return <MonthCalendar calendarObj={calendarObj} />;
      case "week":
        return <WeekCalendar calendarObj={calendarObj} />;
      case "day":
        return <DayCalendar calendarObj={calendarObj} />;
      case "list":
        return <ListCalendar calendarObj={calendarObj} />;
      default:
        break;
    }
  };

  render() {
    const {
      applyFilters,
      clearFilters,
      inputChange,
      nextDate,
      prevDate,
      atualDate,
      viewHandler,
      calendarRender,
      state: {
        filters: {
          startAt,
          endAt,
          lingoLanguageId,
          type, planId,
          status,
          teacher,
          student
        }
      },
      props: {
        t,
        calendar: { loading, activeScreen, selectedStart, selectedEnd, selectedDateTime },
        calendar,
        user: { role }
      }
    } = this;


    const { newScheduledClass } = this.state
    const calendarHeaderObj = {
      nextDate,
      prevDate,
      atualDate,
      selectedStart: newScheduledClass ? moment(newScheduledClass.scheduledDate) : selectedStart,
      selectedEnd: newScheduledClass ? moment(newScheduledClass.scheduledDate) : selectedEnd,
      viewHandler,
      activeScreen,
      selectedDateTime
    };

    const typeOptions = [
      { name: "FIRST_CLASS", id: "firstclass" },
      { name: "DEMO_CLASS", id: "demo" },
      { name: "REGULAR", id: "regular" },
      { name: "TRIAL_CLASS", id: "trial" }
    ]
    const isStudent = role === "student";
    const isManager = role === "companyManager" || role === "customerService" || role === "coordinator";
    const isList = activeScreen === "list";

    return (
      <Fragment>
        <Loading loading={loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db" />
        {isManager && (
          <Filter submit={applyFilters} clear={clearFilters} inputChange={inputChange}>
            <InputForDate name="startAt" label="PERIOD_START" data={startAt} />
            {isList && <InputForDate name="endAt" label="PERIOD_END" data={endAt} minDate={startAt.value} />}
            <InputForLingoLanguages name="lingoLanguageId" data={lingoLanguageId} />
            <InputForSelect name="type" label="TYPE" data={type} options={typeOptions} />
            <InputForLingoPlan name="planId" data={planId} />
            <InputForStatus name="status" data={status} />
            <InputForText name="teacher" data={teacher} label="TEACHER" placeholder="TEACHER" extra={true} />
            <InputForText name="student" data={student} label="STUDENT" placeholder="STUDENT" extra={true} />
          </Filter>
        )}
        <div className="new-container">
          <div className="calendar">
            <Example />
          </div>
          {isStudent && (
            <div className="buttonCenterBox">
              <button className="new-button scheduleButton" onClick={() => this.props.history.push("/schedule")} t>
                <i className="fa fa-plus" aria-hidden="true" /> {t('BTN_SCHEDULE_CLASS')}
              </button>
            </div>
          )}
          {!isManager &&

            <div className="listBoxNew">
              <NextClass single={false} isCalendar={true} />
            </div>
          }
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ calendar, user }) => ({ calendar, user })
const mapDispatchToProps = dispatch => ({
  setCalendarScreen: data => dispatch(setCalendarScreen(data)),
  applyCalendarFilters: data => dispatch(applyCalendarFilters(data)),
  clearCalendarFilters: data => dispatch(clearCalendarFilters(data)),
  setCalendarSchedules: data => dispatch(setCalendarSchedules(data)),
  getNextClasses: data => dispatch(getNextClasses(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Calendar)))

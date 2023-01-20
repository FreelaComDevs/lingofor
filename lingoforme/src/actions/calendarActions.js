import { 
  SET_CALENDAR_INITIAL_PARAMS,
  SET_CALENDAR_SCREEN,
  GET_CALENDAR_CLASSES,
  APPLY_CALENDAR_FILTERS,
  SET_CALENDAR_LOADING,
  UNSET_CALENDAR_LOADING,
} from '../helpers/constants';
import moment from 'moment';
import Services from '../components/_api/Services';
const service = new Services();
const atualDate = moment();

export const getScheduledClasses = ({ 
  activeScreen, 
  selectedStart,  
  selectedEnd,
  selectedLingoLanguageId,
  selectedType,
    selectedPlanId,
    selectedStatus,
    selectedStudent, 
    selectedTeacher
  } ) => dispatch => {
    dispatch(setCalendarLoading());
  const userData = JSON.parse(localStorage.getItem("@lingo"));
  const role = userData ? userData.role : "";
  const isManager = role === "companyManager" || role === "customerService" || role === "coordinator";
  const isMonthCalendar = activeScreen === "month";
  const isWeekCalendar = activeScreen === "week";
  const isDayCalendar = activeScreen === "day";
  const isListCalendar = activeScreen === "list";
  const monthStart = selectedStart.clone().startOf("month");
  const weekStart = selectedStart.clone().startOf("week");
  const monthEnd = selectedStart.clone().endOf("month");
  const weekEnd = selectedStart.clone().endOf("week");
  const startDate = () => {
    if (isMonthCalendar) { return monthStart.clone().startOf("week").startOf("day") }
    if (isWeekCalendar) { return weekStart.clone().startOf("day") }
    if (isDayCalendar) { return selectedStart.clone().startOf("day") }
    if (isListCalendar) { return selectedStart.clone().startOf("day")}
  }
  const endDate = () => {
    if (isMonthCalendar) { return monthEnd.clone().endOf("week").endOf("day") }
    if (isWeekCalendar) { return weekEnd.clone().endOf("day") }
    if (isDayCalendar) { return selectedEnd.clone().endOf("day") }
    if (isListCalendar) { return selectedEnd.clone().endOf("day") }
  }
  
  const pageNumber = 1;
  const pageSize = 9999;
  const startAt = startDate().format("YYYY-MM-DDTHH:mm:ss.sss")
  const endAt = endDate().clone().add(1, 'd').startOf("day").format("YYYY-MM-DDTHH:mm:ss.sss")
  const type = selectedType ? selectedType : ''
  const lingoLanguageId = selectedLingoLanguageId ? selectedLingoLanguageId : ''
  const planId = selectedPlanId ? selectedPlanId : ''
  const status = selectedStatus ? selectedStatus : ''
  const student = selectedStudent ? selectedStudent : ''
  const teacher = selectedTeacher ? selectedTeacher : ''
  const orderByAsc = "originalScheduledDateTimeUTC";
  const params = { 
    pageNumber, 
    pageSize, 
    startAt, 
    endAt, 
    lingoLanguageId, 
    type, 
    planId, 
    status, 
    teacher, 
     student, 
    orderByAsc 
  }
  service.ApiGetParams(`classSchedules`, params)
    .then(res => dispatch({ type: GET_CALENDAR_CLASSES, scheduledClasses: res.result.items }))
    .catch(err => { unsetCalendarLoading(); console.log("ERROR ON GET SCHEDULED CLASSES: ", err)});
};

export const setCalendarInitialParams = targetDate => dispatch => {
  const userData = JSON.parse(localStorage.getItem("@lingo"));
  const role = userData ? userData.role : "";
  const isManager = role === "companyManager" || role === "customerService" || role === "coordinator";
  const weekStart = atualDate.clone().startOf("week").startOf("day");
  const weekEnd = atualDate.clone().endOf("week").endOf("day");
  const targetWeekStart = targetDate && targetDate.clone().startOf("week").startOf("day");
  const targetWeekEnd = targetDate && targetDate.clone().endOf("week").endOf("day");
  const activeScreen = targetDate ? "week" : "list";
  const selectedStart = atualDate.clone().startOf("day");
  const selectedEnd = atualDate.clone().endOf("day");
  const getSchedulesObj = { activeScreen, selectedStart, selectedEnd };
  dispatch({
    type: SET_CALENDAR_INITIAL_PARAMS,
    activeScreen,
    atualDate,
    selectedDateTime: "",
    selectedStart,
    selectedEnd,
    selectedLingoLanguageId: "",
    selectedType: "",
    selectedPlanId: "",
    selectedStatus: "",
    selectedStudent: "",
    selectedTeacher: "",
  });
  dispatch(getScheduledClasses(getSchedulesObj));
}

// Change Calendar Active Screen
export const setCalendarScreen = activeScreen => (dispatch, getState) => {
  const { 
    selectedStart, 
    selectedEnd, 
    selectedLingoLanguageId,
    selectedPlanId,
    selectedType,
    selectedStatus,
    selectedStudent,
    selectedTeacher,
  } = getState().calendar;
  console.log(selectedStart)
  const filters = {
    selectedStart, 
    selectedEnd, 
    selectedLingoLanguageId,
    selectedPlanId,
    selectedType,
    selectedStatus,
    selectedStudent,
    selectedTeacher,
  }
  const getSchedulesObj = { activeScreen, ...filters };
  dispatch({type: SET_CALENDAR_SCREEN, ...filters, activeScreen, selectedDateTime: "" });
  dispatch(getScheduledClasses(getSchedulesObj));
}

// Aply Calendar Filter 
export const applyCalendarFilters = _filters => (dispatch, getState) => {
  const { startAt, endAt, lingoLanguageId, type, planId, status, student, teacher } = _filters;
  const { activeScreen } = getState().calendar; 
  const filters = {
    selectedStart: moment(startAt.value),  
    selectedEnd: moment(endAt.value),
    selectedLingoLanguageId: Number(lingoLanguageId.value),
    selectedType: type.value,
    selectedPlanId: Number(planId.value),
    selectedStatus: status.value,
    selectedStudent: student.value, 
    selectedTeacher: teacher.value
  }
  const getSchedulesObj = { activeScreen, ...filters };
  dispatch({ type: APPLY_CALENDAR_FILTERS, ...filters});
  dispatch(getScheduledClasses(getSchedulesObj));
} 

// Clear Filter
export const clearCalendarFilters = targetDate => (dispatch, getState) => {
  const userData = JSON.parse(localStorage.getItem("@lingo"));
  const role = userData ? userData.role : "";
  const isManager = role === "companyManager" || role === "customerService" || role === "coordinator";
  const { activeScreen, atualDate } = getState().calendar
  const weekStart = atualDate.clone().startOf("week").startOf("day");
  const weekEnd = atualDate.clone().endOf("week").endOf("day");
  const targetWeekStart = targetDate && targetDate.clone().startOf("week").startOf("day");
  const targetWeekEnd = targetDate && targetDate.clone().endOf("week").endOf("day");
  const selectedStart = isManager ? atualDate.clone().startOf("day") : targetDate ? targetWeekStart : weekStart;
  const selectedEnd = isManager ? atualDate.clone().endOf("day") : targetDate ? targetWeekEnd : weekEnd;
  const filters = {
    selectedStart, 
    selectedEnd, 
    selectedLingoLanguageId: "",
    selectedType: "",
    selectedPlanId: "",
    selectedStatus: "",
    selectedStudent: "",
    selectedTeacher: "",
  }
  const getSchedulesObj = { activeScreen, ...filters };
  dispatch({ type: APPLY_CALENDAR_FILTERS, ...filters });
  dispatch(getScheduledClasses(getSchedulesObj));
}

export const setCalendarSchedules = getSchedulesObj => dispatch => {
  dispatch(getScheduledClasses(getSchedulesObj));
  dispatch({ type: APPLY_CALENDAR_FILTERS, ...getSchedulesObj });
}

export const updateCalendarClasses = () => (dispatch, getState) => {
  const { 
    activeScreen, 
    selectedStart, 
    selectedEnd, 
    selectedLingoLanguageId,
    selectedType,
    selectedPlanId,
    selectedStatus,
    selectedStudent,
    selectedTeacher,
  } = getState().calendar;
  const filters = {
    activeScreen, 
    selectedStart, 
    selectedEnd, 
    selectedLingoLanguageId,
    selectedType,
    selectedPlanId,
    selectedStatus,
    selectedStudent,
    selectedTeacher,
  }
  const getSchedulesObj = { ...filters };
  dispatch(getScheduledClasses(getSchedulesObj));
}

// User Loading
export const setCalendarLoading = () => ({
  type: SET_CALENDAR_LOADING
});

// Unset User Loading
export const unsetCalendarLoading = () => ({
  type: UNSET_CALENDAR_LOADING,
});
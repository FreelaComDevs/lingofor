import {
  SET_CALENDAR_INITIAL_PARAMS,
  SET_CALENDAR_SCREEN,
  GET_CALENDAR_CLASSES,
  APPLY_CALENDAR_FILTERS,
  SET_CALENDAR_LOADING,
  UNSET_CALENDAR_LOADING,
} from '../helpers/constants'

const initialState = {
  loading: false,
  scheduledClasses: [],
  atualDate: "",
  activeScreen: "",
  selectedDateTime: "",
  selectedStart: "",
  selectedEnd: "",
  selectedLingoLanguageId: "",
  selectedType: "",
  selectedPlanId: "",
  selectedStatus: "",
  selectedStudent: "",
  selectedTeacher: ""
}

const calendar = (state = initialState, action) => {
  const {
    scheduledClasses,
    activeScreen,
    atualDate,
    selectedDateTime,
    selectedStart,
    selectedEnd,
    selectedLingoLanguageId,
    selectedType,
    selectedPlanId,
    selectedStatus,
    selectedStudent,
    selectedTeacher,
    type
  } = action;
  const filters = { 
    selectedDateTime,
    selectedStart,
    selectedEnd,
    selectedLingoLanguageId,
    selectedType,
    selectedPlanId,
    selectedStatus,
    selectedStudent,
    selectedTeacher,
  }
  switch (type) {
    case GET_CALENDAR_CLASSES:
      return { ...state, scheduledClasses, loading: false }
    case SET_CALENDAR_LOADING:
      return { ...state, loading: true }
    case UNSET_CALENDAR_LOADING:
      return { ...state, loading: false }
    case SET_CALENDAR_SCREEN:
      return { ...state, activeScreen, selectedDateTime }
    case APPLY_CALENDAR_FILTERS: 
      return { ...state, ...filters }
    case SET_CALENDAR_INITIAL_PARAMS: 
      return { ...state, ...filters, activeScreen, atualDate }
    default:
      return state;
  }
}

export default calendar
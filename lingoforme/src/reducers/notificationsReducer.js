import { 
    GET_USER_NOTIFICATIONS,
    GET_LINGO_NOTIFICATIONS, 
    SET_NOTIFICATION_LOADING,
    SET_NOTIFICATION_SUCCESS,
    SET_NOTIFICATION_MESSAGE,
    UNSET_NOTIFICATION_LOADING,
    UNSET_NOTIFICATION_SUCCESS,
    UNSET_NOTIFICATION_MESSAGE,
} from '../helpers/constants'

const initialState = {
    userNotifications: [],
    lingoNotifications: [],
    loading: false,
    success: false,
    message: "",
    error: "",
    totalPages: 0,
    totalFound:0
}

const notification = (state = initialState, action) => {
  const { type, userNotifications, lingoNotifications, message, error, totalPages, totalFound } = action;
  switch (type) {
    case GET_LINGO_NOTIFICATIONS:
      return { ...state, lingoNotifications, loading: false }
    case GET_USER_NOTIFICATIONS:
        return { ...state, userNotifications, loading: false, totalPages, totalFound }
    case SET_NOTIFICATION_LOADING:
        return { ...state, loading: true }
    case UNSET_NOTIFICATION_LOADING:
        return { ...state, loading: false }
      case SET_NOTIFICATION_MESSAGE:
        return { ...state, message, loading: false }
    case UNSET_NOTIFICATION_SUCCESS:
        return { ...state, success: false }
      case SET_NOTIFICATION_SUCCESS:
        return { ...state, success: true, }
    case UNSET_NOTIFICATION_MESSAGE:
        return { ...state, message: "" }
    default:
        return state;
  }
}

export default notification

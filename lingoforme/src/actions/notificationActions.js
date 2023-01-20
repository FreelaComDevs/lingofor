import { 
    GET_USER_NOTIFICATIONS,
    GET_LINGO_NOTIFICATIONS, 
    SET_NOTIFICATION_LOADING,
    SET_NOTIFICATION_SUCCESS,
    UNSET_NOTIFICATION_LOADING,
    UNSET_NOTIFICATION_SUCCESS,
    SET_NOTIFICATION_MESSAGE,
    UNSET_NOTIFICATION_MESSAGE,
} from '../helpers/constants'
import Services from '../components/_api/Services'
const service = new Services()

// All Lingo Notifications
export const getLingoNotifications = () => dispatch => {
    dispatch(setNotificationLoading())
    service.ApiGet('notificationmanager/list?pageNumber=1&pageSize=100')
        .then(res => dispatch({ type: GET_LINGO_NOTIFICATIONS, lingoNotifications: res.result.items}))
        .catch(err => { dispatch(unsetNotificationLoading()) })
};

// Update Lingo Notification
export const updateLingoNotification = (submitObj) => dispatch => {
    dispatch(setNotificationLoading())
    service.ApiPut(`notificationManager`, submitObj)
        .then(res => { dispatch(getLingoNotifications({})); dispatch(setNotificationSuccess()) })
        .catch(err => { dispatch(unsetNotificationLoading()) })};


// All Notifications
export const notificationsFetched = (userNotifications, totalPages, totalFound) => ({
    type: GET_USER_NOTIFICATIONS,
    userNotifications,
    totalPages,
    totalFound
});
        
// All User Notifications
export const getUserNotifications = (params) => dispatch => {
 
  dispatch(setNotificationLoading())
  service.ApiGetParams('notificationmanager/getByNotificationSentToUserId', params)
      .then(res => {  
        dispatch(notificationsFetched(res.result, res.result.totalPages, res.result.totalFound))})
      .catch(err => { dispatch(unsetNotificationLoading()) })
};

// All User Notifications
export const setNotificationMessage = ({id, message, userId}) => dispatch => {
  const submitObj = { id, read: true }
  dispatch(setNotificationLoading())
  service.ApiPut('notificationmanager/updateSentToUser', submitObj)
      .then(res => { dispatch(getUserNotifications(userId)); dispatch({ type: SET_NOTIFICATION_MESSAGE, message})})
      .catch(err => { dispatch(unsetNotificationLoading()) })
};

// Notification Loading
export const setNotificationLoading = () => ({
    type: SET_NOTIFICATION_LOADING
});

// Set Notification Success
export const setNotificationSuccess = () => ({
    type: SET_NOTIFICATION_SUCCESS,
});

// Unset Notification Loading
export const unsetNotificationLoading = () => ({
    type: UNSET_NOTIFICATION_LOADING,
});

// Unset Notification Success
export const unsetNotificationSuccess = () => ({
  type: UNSET_NOTIFICATION_SUCCESS,
});

// Unset Notification Message
export const unsetNotificationMessage = () => ({
  type: UNSET_NOTIFICATION_MESSAGE,
});

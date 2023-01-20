import { combineReducers } from "redux";
import teachersReducer from './teachersReducer'
import lingoReducer from './lingoReducer'
import couponsReducer from './couponsReducer'
import contractsReducer from '../components/B2b/contracts/reducer'
import ticketsReducer from './ticketsReducer'
import demoClassReducer from './demoClassReducer'
import coordinatorsReducer from './coordinatorsReducer'
import studentsReducer from '../components/B2b/students/reducer'
import notificationsReducer from './notificationsReducer'
import userReducer from './userReducer'
import calendarReducer from './calendarReducer'


export default combineReducers({ 
    demoClasses: demoClassReducer,
    teachers: teachersReducer, 
    coupons: couponsReducer,
    lingo: lingoReducer,
    tickets: ticketsReducer,
    contracts: contractsReducer,
    coordinators: coordinatorsReducer,
    notifications: notificationsReducer,
    students: studentsReducer,
    user: userReducer,
    calendar: calendarReducer,
});

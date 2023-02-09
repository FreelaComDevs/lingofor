import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import NoRoute from './components/_common/no-route'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home'
import UserForm from './components/Userform/Userform'
import Profile from './components/Profile/Profile'
import PaypalButton from './components/paypal-test'
import ManageAccount from './components/ManageAccount'
import ManagePlans from './components/ManageAccount/plans'
import ManageLvlScore from './components/ManageAccount/levelscore'
import ManageNotification from './components/ManageAccount/notification'
import ManageAvailableHours from './components/ManageAccount/availablehour'
import Users from './components/Users'
import EditUsers from './components/Users/add-new'
import PlansAndPrices from './components/PlansAndPrices'
import AddNewPlansAndPrices from './components/PlansAndPrices/add-new'
import Languages from './components/Languages'
import AddNewLanguages from './components/Languages/add-new'
import Countries from './components/Countries'
import AddNew from './components/Countries/add-new'
import Tickets from './components/Tickets'
import AddTickets from './components/Tickets/add-new'
import Rating from './components/Rating'
import AddRating from './components/Rating/add-new'
import AddRatingteacher from './components/Rating/add-new-teacher'
import EconomicGroup from './components/EconomicGroup'
import AddconomicGroup from './components/EconomicGroup/add-new'
import Parameterization from './components/Parameterization'
import Confirmation from './components/Userform/Confirmation'
import Schedule from './components/Schedule'
import Calendar from './components/Calendar'
import ClassD from './components/ClassDetails'
import DemoClass from './components/DemoClass'
import ForgetPass from './components/Login/ForgetPass'
import Student from './components/StudentManagement'
import ViewStudent from './components/StudentManagement/view'
import PlanStudent from './components/StudentManagement/plans'
import SubsStudent from './components/StudentManagement/subscription'
import LevelStudent from './components/StudentManagement/levelscore'
import ClassStudent from './components/StudentManagement/classes'
import TicketStudent from './components/StudentManagement/tickets'
import ClassRating from './components/ClassRating'
import Coordinators from './components/Coordinator'
import CoordinatorEdit from './components/Coordinator/edit'
import TeacherStudent from './components/StudentManagement/teachers'
import Teachers from './components/Teachers/Teachers';
import TeachersManage from './components/Teachers/NewTeacher';
import B2B from './components/B2b';
import B2BUserContracts from './components/B2b/user';
import CustomerService from './components/CustomerService';
import ScrollToTop from './helpers/scrollToTop';
import NotificationsSettings from './components/Notifications/NotificationsSettings';
import Notifications from './components/Notifications/Notifications';

const NoMatch = () => <NoRoute message='Ops! Nada por aqui.' />

const AuthRoute = ({ component: Component, ...rest }) => {
  const data = JSON.parse(localStorage.getItem('@lingo'))
  return (
    <Route {...rest} render = { props => {
      return data 
        ? data.token && data.firstAccess && props.location.pathname != '/manage-account'
            ? <Redirect to={{pathname: '/manage-account', state: {from: props.location}}} />
            : <Route {...rest } component={Component} /> 
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    }}/>
  )
}  

export default () => (
  <Router>
    <ScrollToTop>
      <Switch>
        <Route path='/login' exact component={Login}/>
        <Route path='/sign-up' exact component={UserForm}/>
        <Route path='/sign-up/confirmSubscription' exact component={Confirmation}/>
        <Route path='/sign-up/cancelSubscription' exact component={Confirmation}/>
        <Route path='/sign-up/notifySubscription' exact component={Confirmation}/>
        <Route path='/forget-pass' exact component={ForgetPass}/>
        <AuthRoute path='/' exact component={Home} />
        <AuthRoute path='/users/new' exact component={EditUsers} />
        <AuthRoute path='/users/:id' exact component={EditUsers} />
        <AuthRoute path='/customer-service' exact component={CustomerService}/>
        <AuthRoute path='/customer-service/new' exact component={CustomerService}/>
        <AuthRoute path='/customer-service/:id' exact component={CustomerService}/>
        <AuthRoute path='/notifications' exact component={Notifications}/>
        <AuthRoute path='/dashboard' exact component={Dashboard}/>
        <AuthRoute path='/myaccount' exact component={PaypalButton}/>
        <AuthRoute path='/manage-account' exact component={ManageAccount}/>
        <AuthRoute path='/manage-account/plan' exact component={ManagePlans}/>
        <AuthRoute path='/manage-account/levelscore' exact component={ManageLvlScore}/>
        <AuthRoute path='/manage-account/notification' exact component={ManageNotification}/>
        <AuthRoute path='/manage-account/availablehour' exact component={ManageAvailableHours}/>
        <AuthRoute path='/manage-account/availablehour/:id' exact component={ManageAvailableHours}/>
        <AuthRoute path='/users' exact component={Users}/>
        <AuthRoute path='/plans-and-prices' exact component={PlansAndPrices}/>
        <AuthRoute path='/plans-and-prices/new' exact component={AddNewPlansAndPrices}/>
        <AuthRoute path='/plans-and-prices/:id' exact component={AddNewPlansAndPrices}/>
        <AuthRoute path='/languages' exact component={Languages}/>
        <AuthRoute path='/languages/new' exact component={AddNewLanguages}/>
        <AuthRoute path='/languages/:id' exact component={AddNewLanguages}/>
        <AuthRoute path='/countries' exact component={Countries}/>
        <AuthRoute path='/countries/new' exact component={AddNew}/>
        <AuthRoute path='/countries/:id' exact component={AddNew}/>
        <AuthRoute path='/tickets' exact component={Tickets}/>
        <AuthRoute path='/tickets/new' exact component={AddTickets}/>
        <AuthRoute path='/tickets/:id' exact component={AddTickets}/>
        <AuthRoute path='/rating' exact component={Rating}/>
        <AuthRoute path='/rating/new' exact component={AddRating}/>
        <AuthRoute path='/rating/:id' exact component={AddRating}/>
        <AuthRoute path='/rating-teacher/new' exact component={AddRatingteacher}/>
        <AuthRoute path='/rating-teacher/:id' exact component={AddRatingteacher}/>
        <AuthRoute path='/economic-group' exact component={EconomicGroup}/>
        <AuthRoute path='/economic-group/new' exact component={AddconomicGroup}/>
        <AuthRoute path='/economic-group/:id' exact component={AddconomicGroup}/>
        <AuthRoute path='/parameterization' exact component={Parameterization}/>
        <AuthRoute path='/notifications-settings' exact component={NotificationsSettings}/>
        <AuthRoute path='/calendar' exact component={Calendar}/>
        <AuthRoute path='/calendar/:id' exact component={Calendar}/>
        <AuthRoute path='/schedule' exact component={Schedule}/>
        <AuthRoute path='/demo-class' exact component={DemoClass}/>
        <AuthRoute path='/demo-class/new' exact component={DemoClass}/>
        <AuthRoute path='/demo-class/:id' exact component={DemoClass}/>
        <AuthRoute path='/account' exact component={Profile} />
        <AuthRoute path='/class-details' exact component={ClassD} />        
        <AuthRoute path='/class-details/:id' exact component={ClassD} />
        <AuthRoute path='/manage-student' exact component={Student} />
        <AuthRoute path='/manage-student/:id' exact component={ViewStudent} />      
        <AuthRoute path='/manage-student/:id/subscription' exact component={SubsStudent} />   
        <AuthRoute path='/manage-student/:id/plan' exact component={PlanStudent} />   
        <AuthRoute path='/manage-student/:id/levelscore' exact component={LevelStudent} />
        <AuthRoute path='/manage-student/:id/class' exact component={ClassStudent} />   
        <AuthRoute path='/manage-student/:id/teacher' exact component={TeacherStudent} />   
        <AuthRoute path='/manage-student/:id/ticket' exact component={TicketStudent} />   
        <AuthRoute path='/coordinators' exact component={Coordinators}/>
        <AuthRoute path='/coordinator/new' exact component={CoordinatorEdit} />
        <AuthRoute path='/coordinator/:id' exact component={CoordinatorEdit} />
        <AuthRoute path='/teachers' exact component={Teachers} />
        <AuthRoute path='/b2b' exact component={B2B}/>
        <AuthRoute path='/b2b/coupons' component={B2B}/>B2BUserContracts 
        <AuthRoute path='/contracts' component={B2BUserContracts}/>
        <AuthRoute path='/contract/:id' component={B2BUserContracts}/>
        <AuthRoute path='/teachers/new' exact component={TeachersManage} />
        <AuthRoute path='/teachers/:id' exact component={TeachersManage} />
        <AuthRoute path='/class-rating' exact component={ClassRating} />  
        {/* <Route path='/recovery' exact component={RecoveryPage}/> */}
        {/* <Route path='/recover/:token' exact component={NewPasswordPage}/> */}
        <Route component={NoMatch} />
      </Switch>
    </ScrollToTop>
  </Router>
)

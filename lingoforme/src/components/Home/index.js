import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getLingoRatingCriterias } from '../../actions/lingoActions'
import { 
  getNextClasses, 
  getRequestedClasses, 
  getUserInfo, 
  getAverageRating, 
  getClassesForRating,
  getUserPlans, 
} from '../../actions/userActions'
import Header from '../_common/header/Header';
import SideMenu from '../_common/SideMenu/SideMenu';
import HomeStudent from './HomeStudent';
import HomeCoordinator from './HomeCoordinator';
import HomeB2B from './HomeB2B';
import HomeTeacher from './HomeTeacher';
import HomeCustomerService from './HomeCustomerService';
import HomeCompanyManager from './HomeCompanyManager';
import { Profile } from './styles';

class Home extends Component {

  constructor (props) {
    super(props);
    this.state = {
      fantasyName: '',
    }    
}

  componentDidMount() {
    const { 
      getUserInfo, 
      getAverageRating, 
      getNextClasses, 
      //getRequestedClasses, 
      getClassesForRating,
      getLingoRatingCriterias,
      getUserPlans,
    } = this.props;
    getUserInfo();
    getNextClasses();
    //getRequestedClasses(1);
    getAverageRating();
    getClassesForRating();
    getLingoRatingCriterias();
    getUserPlans();
  }

  setParentState = (state) => {
    this.setState(state);
  }

  showHome () {
    const { user: { role } } = this.props
    const deps = {
      setParentState : this.setParentState,
      fantasyName: this.state.fantasyName
    };
    switch (role) {
      case 'student':
        return <HomeStudent/>
      case 'teacher':
        return <HomeTeacher/>
      case 'b2b':
        return <HomeB2B {...deps}/>
      case 'coordinator':
        return <HomeCoordinator/>
      case 'customerService':
        return <HomeCustomerService/>
      case 'companyManager':
        return <HomeCompanyManager/>
      default: break
    }
  }

  render () {
    return (
      <div className="view">
        <SideMenu lang={'english'} />
        <section>
          <Header />
          <Profile>
            { this.showHome() }
          </Profile>
        </section>
      </div>
    )
  }
}


const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = dispatch => ({
  getNextClasses: data => dispatch(getNextClasses(data)),
  //getRequestedClasses: data => dispatch(getRequestedClasses(data)),
  getUserInfo: data => dispatch(getUserInfo(data)),
  getAverageRating: data => dispatch(getAverageRating(data)),
  getClassesForRating: data => dispatch(getClassesForRating(data)),
  getLingoRatingCriterias: data => dispatch(getLingoRatingCriterias(data)),
  getUserPlans: data => dispatch(getUserPlans(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
import React, { Component, Fragment } from 'react'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Tabs from '../_common/Tabs/tabs';
import TabManageTeacher from './TabManageTeacher';
import TabAvailableHours from './TabAvailableHours';
import TabTickets from './tabTickets';
import Services from '../_api/Services'
import Loading from 'react-fullscreen-loading'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Manage } from './Styles'
import teacherIcon from '../../images/icons/icon_teacher_header.svg'
import TeacherRating from './TeacherRating'
import { getTeacher } from '../../actions/teacherActions'
import './teacherManage.css'
const rolesPermissed = ["customerService", "companyManager", "coordinator"]
const service = new Services()

class NewTeacher extends Component {

    state = {
        loading: true,
        activeTab : this.props.t('PERSONAL_INFO'),
    }

    componentDidMount() {
        let userProfile = service.getProfile()
        if (!rolesPermissed.includes(userProfile.role)) {
            this.props.history.push("/")
        }
        this.props.getTeacher(this.props.match.params.id)
    }

    render() {
        const { props } = this
        const { t, teachers: { teacher } } = props
        return (           
            <div className="view">                
                <SideMenu />                 
                <section>
                    <Header/>  
                    <div className="toptitle">      
                        <img src={teacherIcon} alt="Teacher Icon"/>    
                        <h1>{t('ITEM_TEACHERS')}</h1>                   
                    </div> 

                    { props.match.path === "/teachers/new" 
                        ? <Manage>                            
                                <div className="container">
                                    <Tabs activeTab={this.state.activeTab}>
                                        <section label={t('PERSONAL_INFO')}>
                                            <TabManageTeacher />
                                        </section> 
                                        { teacher && <section label={t('MANAGE_AVAILABLE_HOURS')}><TabAvailableHours teacherId={teacher.teachers[0].id} availableHours={teacher.teachers[0].teacherAvailabilities}/></section>  }
                                    </Tabs>
                                </div>                            
                        </Manage> 
                        : <Fragment>
                            <TeacherRating 
                                teacherName={teacher && teacher.name } 
                                teacherNativeLanguage={teacher && teacher.teachers[0].teacherLanguages.filter(l => l.isNative)[0].language.name} 
                                teacherCountry={teacher && teacher.country.name} 
                                teacherRating={teacher && teacher.teachers[0].averageRating} /> 
                            <Manage>                            
                                <div className="container">
                                    { teacher 
                                        ? <Tabs activeTab={this.state.activeTab}>
                                            <section label={t('PERSONAL_INFO')}>
                                              { teacher ? <TabManageTeacher teacher={teacher}/> : <TabManageTeacher /> }</section> 
                                            { teacher && <section label={t('MANAGE_AVAILABLE_HOURS')}><TabAvailableHours teacherId={teacher.teachers[0].id} availableHours={teacher.teachers[0].teacherAvailabilities}/></section>  }
                                            { teacher && <section label={t('TICKETS')}><TabTickets userId={teacher.id}/></section>}
                                        </Tabs>
                                        : <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
                                    }                              
                                </div>                            
                            </Manage> 
                        </Fragment> 
                    }
                </section>               
            </div>
        );
    }
}

const mapStateToProps = ({ teachers, lingo }) => ({ teachers, lingo });
const mapDispatchToProps = dispatch => ({
    getTeacher: data => dispatch(getTeacher(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(NewTeacher)))

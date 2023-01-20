import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import ListItem from '../../elements/ListItem';
import ListRatingItem from '../../elements/ListRatingItem';
import Placeholder from '../_common/placeholder/placeholderByPage';
import { connect } from 'react-redux'
import { getTeacher } from '../../actions/teacherActions'

const TeachersList = ({ teachers, t }) => (
    !teachers.length > 0 ? <Placeholder pageName='users' textMsg='No results' /> : teachers.map( teacher => {
        const { averageRating, countryName, demoClass, firstClass, isActive, nativeLanguageName, otherLanguageName, teacherLevel, teacherName, userId } = teacher

        return (
            <div key={ 'tList'+userId } className=" bigBox list-card">
                <div className="list-items">
                    <ListItem name={ "teacherName" } label={ t("NAME") } value={ teacherName } />
                    <ListItem name={ "nativeLanguageName" } label={ t("NATIVE_LANGUAGE") } value={ nativeLanguageName } />
                    <ListItem name={ "otherLanguageName" } label={ t("OTHER_LANGUAGES") } value={ otherLanguageName } />
                    <ListItem name={ "countryName" } label={ t("COUNTRY") } value={ countryName } />
                    <ListItem name={ "teacherLevel" } label={ t("LEVELS") } value={ teacherLevel } />
                    <ListItem name={ "firstClass" } label={ t("FIRST_CLASS") } value={ firstClass ? t("YES") : t("NO") } />
                    <ListItem name={ "demoClass" } label={ t("DEMO_CLASS") } value={ demoClass ? t("YES") : t("NO") } /> 
                    <ListRatingItem name={ "averageRating" } label={ t("RATING") } value={ averageRating } />
                    <ListItem name={ "isActive" } label={ t("STATUS") } value={ isActive ? "ACTIVE" : "INACTIVE" } />
                </div>
                <Link to={`/teachers/${userId}`}>
                    <button className="clear">{ t('VIEW') } onClick={() => this.props.getTeacher(userId)}</button>
                </Link>
            </div>
        )
    })
)

const mapDispatchToProps = dispatch => ({
    getTeacher: data => dispatch(getTeacher(data)),
});

export default withRouter(connect(mapDispatchToProps)(translate('translations')(TeachersList)))
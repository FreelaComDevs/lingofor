import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from "react-router";
import Rating from 'react-rating';
import { connect } from 'react-redux'
import { getTeacher } from '../../actions/teacherActions'

class TeacherRating extends Component {
    render() {
        const { t, teachers: { teacher } } = this.props
        const teacherName = teacher && teacher.name
        const teacherNativeLanguage = teacher && teacher.teachers && teacher.teachers[0].teacherLanguages.filter(l => l.isNative)[0].language.name
        const teacherCountry = teacher && teacher.country.name
        const teacherRating = teacher && teacher.teachers[0].averageRating
     
        return (
            <div className="rating-box">
                <div className="teacher-info">
                    <h2>{teacherName}</h2>
                    <p>Native language: {teacherNativeLanguage}</p>
                    <p>Country: {teacherCountry}</p>
                </div>
                <div className="teacher-rating">
                    <h2>{t('AVARAGE_RATING')}</h2>
                    <p>
                        <span className="rating">{teacherRating}</span>
                        { teacherRating && <Rating
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            initialRating={teacherRating}
                            readonly = {true} 
                        /> }
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ teachers }) => ({ teachers });
const mapDispatchToProps = dispatch => ({
    getTeacher: data => dispatch(getTeacher(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TeacherRating)))
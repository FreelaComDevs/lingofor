import React, { Component, Fragment } from 'react'
import { cap } from '../../helpers/helpers'
import { connect } from 'react-redux'
import { getClassesForRating, unsetClassesForRating, sendRatings } from '../../actions/userActions'
import { FlagIcon } from 'react-flag-kit'
import { translate } from 'react-i18next'
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ratingImg from "../../images/rating/img_classRatingStarsHero.png";
import Rating from 'react-rating'
import Services from '../_api/Services';
const service = new Services();

class ModalRating extends Component {
  state = this.initialState

  get initialState() {
    const { target, lingo: { ratingCriterias }, user: { classesForRating } } = this.props;
    return {
      ratingCriteriasInputs: ratingCriterias
        .filter(criteria => criteria.target === target && !criteria.fixed)
        .map((criteria, index) => {
          if(classesForRating[0] && classesForRating[0].criteriasGrades && classesForRating[0].criteriasGrades.length > 1){
            const hasCriteria = classesForRating[0].criteriasGrades.filter(grade =>  grade.id == criteria.id)
            return ({
              value: hasCriteria.length > 0 ? hasCriteria[0].value : 5,
              id: criteria.id
            })
          }else {
            return ({
              value: 5,
              id: criteria.id
            })
          }

        }),
      comments: !!classesForRating[0][`${target}Rating`] && classesForRating[0][`${target}Rating`].comments ? classesForRating[0][`${target}Rating`].comments : "",
      blockTeacherJustify: { value: "", error: false },
      ratingScreen: "ratings",
    }
  }


  submitRatings = async (e, later) => {
    e.preventDefault()
    const {
      state: { ratingScreen, ratingCriteriasInputs, comments, blockTeacherJustify },
      props: { updateScreen, target, sendRatings, user: { classesForRating }}
    } = this
    let blockTeacher = false
    const action = !!classesForRating[0][`${target}Rating`] ? "update" : "create"
    const ratingClassObj = {
      classScheduleIds: classesForRating.map( rating => rating.id ),
      studentId: Number(classesForRating[0].studentId),
      teacherId: Number(classesForRating[0].teacherId),
      comments,
      status: later ? 'pending' : 'done'
    }

    ratingClassObj[`${target}CriteriaRatings`] = ratingCriteriasInputs.map( rating => {
      return ({
        ratingCriteriaId: Number(rating.id),
        grade: Number(rating.value)
      })
    })

    ratingCriteriasInputs.map( criteria => {
      console.log("criteria ==>", criteria)
      if (criteria.value <= 3 && criteria.id === 1) { blockTeacher = true }
    })

    if(ratingScreen === "ratings" && !later && blockTeacher && target === "teacher") {
      return this.setState({ ratingScreen: "blockTeacherQuestion" })
    } else if(ratingScreen === "blockTeacherJustify" && !later) {
      if (!blockTeacherJustify.value) {
        return this.setState({ blockTeacherJustify: { value: "", error: true }})
      } else {
        let blockTeacher = {
          studentId: parseInt(classesForRating[0].studentId),
          teacherId: parseInt(classesForRating[0].teacherId),
          comments: blockTeacherJustify
        }
        await sendRatings({ ratingClassObj, target, action, updateScreen, blockTeacher })
      }
    } else {
      sendRatings({ ratingClassObj, target, action, updateScreen })
    }
  }

  keepTeacher = (e) => {
    this.submitRatings(e)
  }

  blockTeacher = (e) => {
    this.setState({ratingScreen: "blockTeacherJustify"})
  }

  handleStars = (value, index) => {
    const { ratingCriteriasInputs } = this.state
    const newRatingCriteriasInputs = [ ...ratingCriteriasInputs ]
    newRatingCriteriasInputs[index] = { ...newRatingCriteriasInputs[index], value }
    this.setState({
      ratingCriteriasInputs: newRatingCriteriasInputs
    })
  }

  readOnly = () => {
    const { classesForRating } = this.props.user
    return (classesForRating[0].criteriasGrades && classesForRating[0].criteriasGrades.length > 1)
  }

  render() {
    let {
      handleStars,
      submitRatings,
      keepTeacher,
      blockTeacher,
      readOnly,
      state: { ratingCriteriasInputs, comments, blockTeacherJustify, ratingScreen },
      props: { t, target, unsetClassesForRating, user, user: { role, status },
      lingo: { ratingCriterias } }
    } = this;

    // const { role } = user
    // console.log('userJason', user)
    const targetString = role === "student" ? "teacherRating" : role === "teacher" ? "studentRating" : ""

    const listRating = this.props.user.classesForRating
    const classesForRating =  listRating.filter(val => {
      return val.teacher != null

      && val.status !== "canceled"
      && val.status !== "pending"
      && val.target !== "demo"
      // && (val[targetString] === null || val[targetString].status !== 'done')

    })


    const userFromToken = service.getUserFromToken();
    return (
      <Fragment>

        { classesForRating && classesForRating.length > 0 && classesForRating[classesForRating.length -1].status === 'done' && (
          <Dialog open={!!classesForRating.length} onClose={(e) => submitRatings(e, true)} className="newDialog" >
            <DialogTitle className="dialogTitle">{t("CLASS_RATING")}</DialogTitle>
            <DialogContent className="dialogContent">
              <img className="dialogImage" src={ratingImg} alt={t("CANCEL_IMAGE")} />
              <p className="ratingTitle">{t('RATING_MODAL_TITLE')}:</p>
              <div className="classesForRating">
                { classesForRating.map( rating => {
                  const { lingoLanguage: { flag, description }, scheduledDate, scheduledStartTime, originalScheduledTimezoneName  } = rating
                  const time =  moment.tz(scheduledDate + 'T' + scheduledStartTime + '.000', originalScheduledTimezoneName);
                  const loggedUserTime = time.clone().tz(userFromToken.timezone);
                  const initialDate = loggedUserTime.format(t('DATE_FORMAT'))
                  const initialDay = t(loggedUserTime.format('dddd').toUpperCase())
                  const initialTime = loggedUserTime.format('hh:mm A')
                  const finalTime = loggedUserTime.clone().add(30, "minutes").format('hh:mm A')
                  return (
                    <p key={JSON.stringify(rating)} className="classForRating">
                      <FlagIcon code={flag} size={18}/>
                      {`${t(description.toUpperCase())} • ${initialDate} • ${initialDay} • ${initialTime} - ${finalTime}`}
                    </p>
                  )
                })}
              </div>
              { classesForRating[0][target] &&
                <p className="ratingTarget">
                  <span>{t(target.toUpperCase())}: </span>{classesForRating[0][target].user.name}
                </p>
              }
              <hr/>
              { ratingScreen === "ratings" && (
                <Fragment>
                  <div className="criterias">
                    {  ratingCriterias.length > 0 && ratingCriterias
                      .filter(criteria => criteria.target === target && criteria.nameEnglish !== "Attendance")
                      .map((criteria, index) => {

                        return (
                          <div key={JSON.stringify(criteria)} className="criteria">
                            <h4 className="criteriaTitle">{criteria[t("INDEX_KEY_STRING")]}</h4>
                            <Rating
                              onChange={(value) => handleStars(value, index)}
                              emptySymbol="fa fa-star-o fa-2x"
                              fullSymbol="fa fa-star fa-2x"
                              initialRating={ratingCriteriasInputs[index] ? ratingCriteriasInputs[index].value : 5}
                              fractions={2}
                              readonly={readOnly()}
                              />
                          </div>
                        )
                      }
                    )}
                  </div>
                  <h4>{t('COMMENTS')}</h4>
                  <textarea
                    className="ratingComment"
                    value={comments}
                    onChange={(e) => this.setState({comments: e.target.value})}
                    rows="4"
                    cols="50"
                    name="comments"
                    maxLength="2000"
                    disabled={readOnly()}
                    placeholder={t('COMMENTS')}>
                    </textarea>
                </Fragment>
              )}
              { ratingScreen === "blockTeacherQuestion" && (
                <h4>{t('STOP_HAVING_CLASSES')}?</h4>
              )}
              { ratingScreen === "blockTeacherJustify" && (
                <Fragment>
                  <h4 className={`blockTeacherJustifyLabel ${blockTeacherJustify.error ? "invalid" : ""}`}>{t('PLACEHOLDER_WHY_YOU_WANT')}?</h4>
                  <textarea
                    className={`blockTeacherJustifyInput ${blockTeacherJustify.error ? "invalid" : ""}`}
                    value={blockTeacherJustify.value}
                    onChange={(e) => this.setState({ blockTeacherJustify: { value: e.target.value, error: false }})}
                    rows="4"
                    cols="50"
                    name="justify"
                    maxLength="256"
                    placeholder={t('PLACEHOLDER_WHY_YOU_WANT')}>
                  </textarea>
                </Fragment>
              )}
            </DialogContent>
            <DialogActions className="dialogActions">
              { ratingScreen !== "blockTeacherQuestion"
                ? readOnly()
                  ? <button className="closeRate" onClick={(e) => unsetClassesForRating(e)} >{t('BTN_CLOSE')}</button>
                  : <div className='buttons'>
                      <button className="rateLater" onClick={(e) => submitRatings(e, true)}>{t('CANCEL_LATER_RATE')}</button>
                      <button className="rate" onClick={(e) => submitRatings(e)} >{t('RATE')}</button>
                    </div>
                  : <div className='buttons'>
                      <button className="keepTeacher" onClick={(e) => keepTeacher(e)}>{t('KEEP_TEACHER')}</button>
                      <button className="blockTeacher" onClick={(e) => blockTeacher(e)}>{t('REMOVE_TEACHER')}</button>
                    </div>
              }
            </DialogActions>
          </Dialog>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ user, lingo }) => ({ user, lingo })
const mapDispatchToProps = dispatch => ({
  getClassesForRating: data => dispatch(getClassesForRating(data)),
  unsetClassesForRating: data => dispatch(unsetClassesForRating(data)),
  sendRatings: data => dispatch(sendRatings(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ModalRating))

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getClassesForRating, unsetClassesForRating, sendRatings } from '../../actions/userActions'
import { FlagIcon } from 'react-flag-kit'
import { translate } from 'react-i18next'
import ratingImg from "../../images/rating/img_classRatingStarsHero.png";
import Rating from 'react-rating'
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import yesLove from "../../images/rating/amei.png";
import yes from "../../images/rating/sim.png";
import no from "../../images/rating/nao.png";

import like from "../../images/rating/like.png";
import deslike from "../../images/rating/deslike.png";

import { DialogRatingStudent, RatingStudent } from './styles'
import Services from '../_api/Services';
const service = new Services();

class ModalRatingStudent extends Component {
  state = this.initialState

  ratingLove = {showing: true};
  ratingNo = {showing: true};
  ratingYes = {showing: true};
  
  likeInternet = {showing: true};
  noLikeInternet = {showing: true};

  likeContent = {showing: true};
  noLikeContent = {showing: true};

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

      console.log("criteriacriteriacriteria ==>", criteria)
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
    console.log("OIOIOI==>", ratingCriteriasInputs )
  }

  readOnly = () => {
    const { classesForRating } = this.props.user
    return (classesForRating[0].criteriasGrades && classesForRating[0].criteriasGrades.length > 1)
  }

  render() {
    const { ratingLove, ratingNo, ratingYes, likeInternet, noLikeInternet, likeContent, noLikeContent } = this.state;

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
        <div
            className="justify-center w-auto  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex mx-auto justify-between p-5">
                  <h3 className="text-3xl font-semibold text-[#004FFF]">
                  {t("CLASS_RATING")}
                  </h3>
                </div>

                <img className="mx-auto w-40 h-40 rounded-full mb-8" src={user.picture == "" ? "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png" : user.picture} alt={t("CANCEL_IMAGE")} />


                <p className="mx-auto">
                    <span>{t(target.toUpperCase())}: </span>{classesForRating[0][target].user.name}
                </p>

                <p className="mx-auto font-semibold">{t('RATING_MODAL_TITLE')}:</p>

                <hr/>
                <div className="relative flex-auto mx-auto">
                  { classesForRating.map( rating => {
                    const { lingoLanguage: { flag, description }, scheduledDate, scheduledStartTime, originalScheduledTimezoneName  } = rating
                    const time =  moment.tz(scheduledDate + 'T' + scheduledStartTime + '.000', originalScheduledTimezoneName);
                    const loggedUserTime = time.clone().tz(userFromToken.timezone);
                    const initialDate = loggedUserTime.format(t('DATE_FORMAT'))
                    const initialDay = t(loggedUserTime.format('dddd').toUpperCase())
                    const initialTime = loggedUserTime.format('hh:mm A')
                    const finalTime = loggedUserTime.clone().add(30, "minutes").format('hh:mm A')
                    return (
                      <p key={JSON.stringify(rating)}>
                        <FlagIcon code={flag} size={18}/>
                        {`${t(description.toUpperCase())} • ${initialDate} • ${initialDay} • ${initialTime} - ${finalTime}`}
                      </p>
                    )
                  })}
                </div>
                <hr/>
                <p className="mx-auto font-semibold">{t('Você gostaria de ter mais aulas com este professor?')}</p>
                  
                {  ratingCriterias.length > 0 && ratingCriterias
                      .filter(criteria => criteria.target === target && criteria.nameEnglish !== "Attendance")
                      .map((criteria, index) => {
                        return (
                          <div key={JSON.stringify(criteria)} className="mx-auto  justify-center mt-8">
                            {criteria[t("INDEX_KEY_STRING")] == "Teacher" ? 
                             <div className="flex items-center">
                             <div>
                               <button className={ratingLove || ratingCriteriasInputs[index].value == 5 ? "grayscale-0" : "grayscale"} onClick={(value) => 
                                (handleStars(value = 5, index)) 
                               }>
                                 <img className="px-4" src={yesLove} />
                               </button>
                               <p className="font-[500] text-[21px]">Sim, amei!!!</p>
                             </div>

                             <div>
                                <button className={ratingYes || ratingCriteriasInputs[index].value == 4  ? "grayscale-0" : "grayscale"} onClick={(value) => 
                                  (handleStars(value = 4, index)) 
                                 }>
                                  <img className="px-4" src={yes} />
                                </button>
                                <p className="px-8 font-[500] text-[21px]">Sim</p>
                              </div>

                              <div>
                                <button className={ratingNo || ratingCriteriasInputs[index].value == 3 ? "grayscale-0" : "grayscale"} onClick={(value) => 
                                   (handleStars(value = 3, index)) 
                                }>
                                  <img className="px-4" src={no} />
                                </button>
                                <p className="px-8 font-[500] text-[21px]">Não</p>
                              </div>
                            </div>
                            : null}
                            </div>
                          );
                      }
                )}

                  {ratingNo ?  
                    <div className="mx-auto ">
                     <div className="md flex items-center pl-[20px] pr-[20px]">
                        <div className="mb-4 mr-4 w-60">
                            <input value={"Não se expressa direito"}
                    onChange={(e) => this.setState({comments: e.target.value})} id="default-checkbox" type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-checkbox" className="ml-2 text-[16px] font-medium">Não se expressa direito</label>
                        </div>
                        <div className="mb-4 mr-4 w-60">
                            <input value={"Fala muito baixo"}
                    onChange={(e) => this.setState({comments: e.target.value})} id="default-checkbox" type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-checkbox" className="ml-2 text-[16px] font-medium">Fala muito baixo</label>
                        </div>
                        <div className="mb-4 mr-4 w-60">
                            <input value={"Fala muito durante a aula"}
                    onChange={(e) => this.setState({comments: e.target.value})} id="default-checkbox" type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-checkbox" className="ml-2 text-[16px] font-medium">Fala muito durante a aula</label>
                        </div>  
                     </div>
                     <div className="md flex items-center pl-[20px] pr-[20px]">
                      <div className="mb-4 mr-4 w-60">
                            <input value={"Não aplica correções"}
                    onChange={(e) => this.setState({comments: e.target.value})} id="default-checkbox" type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-checkbox" className="ml-2 text-[16px] font-medium">Não aplica correções</label>
                        </div>
                        <div className="mb-4 mr-4 w-60">
                            <input value={"Não explica bem"}
                    onChange={(e) => this.setState({comments: e.target.value})} id="default-checkbox" type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-checkbox" className="ml-2 text-[16px] font-medium">Não explica bem</label>
                        </div>
                     </div>
                    </div>
                  : null}



                    {  ratingCriterias.length > 0 && ratingCriterias
                      .filter(criteria => criteria.target === target && criteria.nameEnglish !== "Attendance")
                      .map((criteria, index) => {
                        console.log("oioi-->", criteria)
                        
                        return (
                          <div className="flex items-center mx-auto" key={JSON.stringify(criteria)}>
                                
                                {criteria[t("INDEX_KEY_STRING")] === "Conteúdo" ?
                                  <div>
                                  <p className="font-semibold text-[21px] mb-8 px-6">Conexão Internet</p>
                                  
                                  <button className={likeInternet || ratingCriteriasInputs[index].value == 5  ? "grayscale-0" : "grayscale"} 
                                    onClick={(value) => (handleStars(value = 5, index))}>
                                      <img className="px-8" src={like} />
                                    </button>

                                    <button className={noLikeInternet  || ratingCriteriasInputs[index].value == 3  ? "grayscale-0" : "grayscale"} 
                                    onClick={(value) => (handleStars(value = 3, index))}>
                                      <img className="px-3" src={deslike} />
                                    </button>
                                </div> : null
                                  
                                }

                                {criteria[t("INDEX_KEY_STRING")] === "Conteúdo" ?
                                  <div>
                                    <p className="font-semibold text-[21px] mb-8 px-16">Conteúdo</p>
                                    <button className={likeContent  || ratingCriteriasInputs[index].value == 5 ? "grayscale-0" : "grayscale"}  
                                    onClick={(value) => (handleStars(value = 5, index))}>
                                      <img className="pl-16" src={like} />
                                    </button>

                                    <button className={noLikeContent || ratingCriteriasInputs[index].value == 3 ? "grayscale-0" : "grayscale"}  
                                    onClick={(value) => (handleStars(value = 3, index))}>
                                      <img className="pl-9" src={deslike} />
                                    </button>
                                  </div> : 
                                  null
                                } 
                                </div>
                          );
                      }
                )}
               
                 <div className="mx-auto mt-8 mb-8">
                    <button
                      className="rounded-full border border[#3D3D3D] text[#3D3D3D] background-transparent uppercase px-8 py-1 text-[12px] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={(e) => unsetClassesForRating(e)} 
                    >
                      {t('CANCEL_LATER_RATE')}
                    </button>

                    <button
                      className="bg-[#004FFF] text-white active:bg-emerald-600 font-bold uppercase px-8 py-1 text-[12px] rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={(e) => submitRatings(e)}
                    >
                      {t('RATE')}
                    </button>
                  </div>
                      
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ModalRatingStudent))

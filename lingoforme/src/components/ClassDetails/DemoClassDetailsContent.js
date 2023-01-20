import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateDemoClass, unsetDemoClassError, getDemoClassMessages, sendDemoClassMessage } from "../../actions/demoClassActions";
import { getTeachers } from "../../actions/teacherActions";
import { getLingoLanguages, getLingoLevels, getLingoAllCountries } from "../../actions/lingoActions";
import moment from "moment";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconAvatar from "../../images/profile/img_placeholder.svg";
import Enter from '../../images/btn_send.png';
import { FlagIcon } from "react-flag-kit";
import Rating from 'react-rating';
import DemoClassMessages from "../DemoClass/DemoClassMessages";
import Services from '../_api/Services';
const service = new Services();

class DemoClassDetailsContent extends Component {
  state = this.initialState;

  get initialState() {
    const { demoClass } = this.props;

    return {
      teacher: "",
      message: "",
      countries: [],
      language: "ENGLISH",
      inputs: {
        message: { value: "" },
        commercialResponsibleName:
          demoClass && demoClass.commercialResponsibleName
            ? { value: demoClass.commercialResponsibleName }
            : { value: "" },
        name: demoClass
          ? { value: demoClass.name, required: true }
          : { value: "", required: true },
        email: demoClass
          ? { value: demoClass.email, required: true }
          : { value: "", required: true },
        planId: demoClass
          ? { value: demoClass.planId, required: true }
          : { value: "", required: true },
        classTool: demoClass
          ? { value: demoClass.classTool, required: false }
          : { value: "", required: false },
        classToolId: demoClass
          ? { value: demoClass.classToolId, required: false }
          : { value: "", required: false },
        companyName:
          demoClass && demoClass.companyName
            ? { value: demoClass.companyName, required: true }
            : { value: "" },
        occupation:
          demoClass && demoClass.occupation
            ? { value: demoClass.occupation, required: true }
            : { value: "" },
        countryId: demoClass
          ? { value: demoClass.countryId, required: true }
          : { value: "", required: true },
        timezone: demoClass
          ? { value: demoClass.timezone, required: true }
          : { value: "", required: true },
        address: demoClass
          ? { value: demoClass.address, required: true }
          : { value: "", required: true },
        classConverted: demoClass
          ? { value: demoClass.classConverted }
          : { value: false },
        classConvertedEmail: demoClass
          ? { value: demoClass.classConvertedEmail }
          : { value: "" },
        demoClassPhones: demoClass
          ? demoClass.demoClassPhones.map(({ phone, userPhoneTypeId }) => {
            return {
              phone: { value: phone, required: true },
              userPhoneTypeId: { value: userPhoneTypeId, required: true }
            };
          })
          : [
            {
              phone: { value: "", required: true },
              userPhoneTypeId: { value: "", required: true }
            }
          ],
        demoClassSchedules: demoClass
          ? demoClass.demoClassSchedules.map(
            ({
              id,
              lingoLanguageId,
              status,
              currentStatus,
              teacher,
              scheduledDate,
              scheduledStartTime,
              originalScheduledDateTimeUTC,
              container: { levelByStudent, levelByLingo },
              originalScheduledTimezoneName
            }) => {
              return {
                scheduleId: { value: id },
                lingoLanguageId: { value: lingoLanguageId, required: true },
                status: { value: status },
                currentStatus: status,
                teacherId: { value: teacher ? teacher.id : "" },
                scheduledDate: { value: scheduledDate },
                scheduledStart: { value: scheduledStartTime },
                originalScheduledDateTimeUTC: { originalScheduledDateTimeUTC },
                levelByStudent: { value: levelByStudent, required: true },
                levelByLingo: { value: levelByLingo },
                originalScheduledTimezoneName: { value: originalScheduledTimezoneName },
              };
            }
          )
          : [
            {
              lingoLanguageId: { value: "", required: true },
              status: { value: "pending" },
              currentStatus: "pending",
              scheduledDate: { value: "" },
              scheduledStart: { value: "" },
              teacherId: { value: "" },
              levelByStudent: { value: "", required: true },
              levelByLingo: { value: "" },
              originalScheduledTimezoneName: { value: "" }
            }
          ]
      }
    };
  }

  componentDidMount() {
    this.props.getLingoLanguages();
    this.props.getLingoLevels();
    this.props.getLingoAllCountries();
    this.props.getDemoClassMessages(this.props.demoClass.id);
    this.props.getTeachers({
      status: "true",
      countryId: "",
      demoClass: "true",
      firstClass: "",
      levelId: "",
      name: "",
      nativeLanguageId: "",
      otherLanguageId: "",
      ratingFrom: "",
      ratingTo: "",
      skip: "",
      take: ""
    })
  }

  submitHandle = async e => {
    e.preventDefault();
    const { t, demoClass } = this.props;
    const { inputs } = this.state;
    const submitObj = {};
    inputs.commercialResponsibleName.value &&
      (submitObj.commercialResponsibleName =
        inputs.commercialResponsibleName.value);
    inputs.name.value
      ? (submitObj.name = inputs.name.value)
      : await this.setState({
        inputs: {
          ...this.state.inputs,
          name: { ...this.state.inputs.name, error: true }
        }
      });
    inputs.email.value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email.value)
      ? (submitObj.email = inputs.email.value)
      : await this.setState({
        inputs: {
          ...this.state.inputs,
          email: { ...this.state.inputs.email, error: true }
        }
      });
    inputs.planId.value
      ? (submitObj.planId = Number(inputs.planId.value))
      : await this.setState({
        inputs: {
          ...this.state.inputs,
          planId: { ...this.state.inputs.planId, error: true }
        }
      });
    //   console.log('inputs',inputs.classTool.value,inputs.classToolId.value)
    // inputs.classTool.value
    //   ? (submitObj.classTool = inputs.classTool.value)
    //   : await this.setState({
    //       inputs: {
    //         ...this.state.inputs,
    //         classTool: { ...this.state.inputs.classTool, error: true }
    //       }
    //     });
    // inputs.classToolId.value
    //   ? (submitObj.classToolId = inputs.classToolId.value)
    //   : await this.setState({
    //       inputs: {
    //         ...this.state.inputs,
    //         classToolId: { ...this.state.inputs.classToolId, error: true }
    //       }
    //     });
    inputs.companyName.value &&
      (submitObj.companyName = inputs.companyName.value);
    inputs.occupation.value && (submitObj.occupation = inputs.occupation.value);
    inputs.countryId.value
      ? (submitObj.countryId = Number(inputs.countryId.value))
      : await this.setState({
        inputs: {
          ...this.state.inputs,
          countryId: { ...this.state.inputs.countryId, error: true }
        }
      });
    inputs.timezone.value
      ? (submitObj.timezone = inputs.timezone.value)
      : await this.setState({
        inputs: {
          ...this.state.inputs,
          timezone: { ...this.state.inputs.timezone, error: true }
        }
      });
    inputs.address.value
      ? (submitObj.address = inputs.address.value)
      : await this.setState({
        inputs: {
          ...this.state.inputs,
          address: { ...this.state.inputs.address, error: true }
        }
      });
    submitObj.classConverted = inputs.classConverted.value;
    inputs.classConvertedEmail.value &&
      (submitObj.classConvertedEmail = inputs.classConvertedEmail.value);
    if (inputs.classConverted.value === true && !inputs.classConvertedEmail.value) {
      await this.setState({ inputs: { ...this.state.inputs, classConvertedEmail: { ...this.state.inputs.classConvertedEmail, error: true } } })
    } else {
      await this.setState({ inputs: { ...this.state.inputs, classConvertedEmail: { ...this.state.inputs.classConvertedEmail, error: false } } })
    }
    inputs.demoClassPhones.map(async ({ phone, userPhoneTypeId }, index) => {
      const newDemoClassPhones = this.state.inputs.demoClassPhones;
      !phone.value && (newDemoClassPhones[index].phone.error = true);
      await this.setState({
        inputs: { ...this.state.inputs, demoClassPhones: newDemoClassPhones }
      });
      !userPhoneTypeId.value &&
        (newDemoClassPhones[index].userPhoneTypeId.error = true);
      await this.setState({
        inputs: { ...this.state.inputs, demoClassPhones: newDemoClassPhones }
      });
    });
    inputs.demoClassSchedules.map(
      async (
        { lingoLanguageId, levelByStudent, scheduledDate, scheduledStart },
        index
      ) => {
        const newDemoClassSchedules = this.state.inputs.demoClassSchedules;
        !lingoLanguageId.value &&
          (newDemoClassSchedules[index].lingoLanguageId.error = true);
        await this.setState({
          inputs: {
            ...this.state.inputs,
            demoClassSchedules: newDemoClassSchedules
          }
        });
        !levelByStudent.value &&
          (newDemoClassSchedules[index].levelByStudent.error = true);
        await this.setState({
          inputs: {
            ...this.state.inputs,
            demoClassSchedules: newDemoClassSchedules
          }
        });
        !scheduledDate.value ||
          (moment() >
            moment(`${scheduledDate.value} ${scheduledStart.value}`) &&
            (newDemoClassSchedules[index].scheduledDate.error = true));
        await this.setState({
          inputs: {
            ...this.state.inputs,
            demoClassSchedules: newDemoClassSchedules
          }
        });
        !scheduledStart.value &&
          (newDemoClassSchedules[index].scheduledStart.error = true);
        await this.setState({
          inputs: {
            ...this.state.inputs,
            demoClassSchedules: newDemoClassSchedules
          }
        });
      }
    );
    submitObj.demoClassPhones = inputs.demoClassPhones.map(
      ({ userPhoneTypeId, phone }) => {
        return {
          userPhoneTypeId: Number(userPhoneTypeId.value),
          phone: phone.value
        };
      }
    );
    submitObj.demoClassSchedules = inputs.demoClassSchedules.map(
      ({
        lingoLanguageId,
        status,
        teacherId,
        scheduledDate,
        scheduledStart,
        levelByStudent,
        levelByLingo
      }) => {
        const submitDemoClassSchedules = {};
        submitDemoClassSchedules.lingoLanguageId = Number(
          lingoLanguageId.value
        );
        submitDemoClassSchedules.status = status.value;
        submitDemoClassSchedules.levelByStudent = levelByStudent.value;
        scheduledStart.value &&
          (submitDemoClassSchedules.scheduledStart = moment(
            `${scheduledDate.value} ${scheduledStart.value}`
          ).format("YYYY-MM-DDTHH:mm:ss.sss"));
        levelByLingo.value &&
          (submitDemoClassSchedules.levelByLingo = levelByLingo.value);
        teacherId.value &&
          (submitDemoClassSchedules.teacherId = Number(teacherId.value));
        return submitDemoClassSchedules;
      }
    );
    submitObj.id = demoClass.id;
    submitObj.demoClassSchedules = submitObj.demoClassSchedules.map((item, index) => { return demoClass.demoClassSchedules[index] ? { ...item, id: demoClass.demoClassSchedules[index].id } : { ...item } });
    
    if(inputs.classToolId && inputs.classTool){
      submitObj.classTool = inputs.classTool.value
      submitObj.classToolId = inputs.classToolId.value
    }

    // console.log('DEMO CLAS OBJECT', submitObj)
    const invalid = await document.getElementsByClassName("invalid");
    if (invalid.length) {
      if (invalid.length === 1 && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email.value)) {
        return this.props.setDemoClassError(t("EMAIL_INVALID"))
      } else {
        return this.props.setDemoClassError(t("INVALID_FORM_DESCRIPTION"))
      }
    } else {
      this.props.updateDemoClass(submitObj);
    }
  };

  inputChange = (change, index) => {
    const { value, name, id, type } = change;
    const { inputs } = this.state;
    const newInputs = Object.assign({}, inputs);
    newInputs[name][index][id].value = value;
    newInputs[name][index][id].error = false;
    this.setState({ inputs: newInputs });
  };

  sendMessage = () => {
    this.props.sendDemoClassMessage({ demoClassId: this.props.demoClass.id, message: this.state.inputs.message.value })
    this.setState({ inputs: { ...this.state.inputs, message: { value: "" } } })
  }

  exit = () => {
    this.props.history.push("/Calendar")
  }

  ClassToolCardItem = () => {
    const { inputs: { classTool, classToolId } } = this.state;
    const isLink = classToolId.value && classToolId.value.indexOf('http') > -1;
    return (
      classTool && classTool.value ?
        isLink ?
          <Fragment><button type="submit" className="buttonSave pointer" onClick={() => window.open(classToolId.value)}>{classTool.value}</button></Fragment>
          :
          <Fragment><span className="buttonSave">{classTool.value}</span> <span style={{ color: '#5A6C96', fontSize: '11px', fontWeight: '500' }}>{classToolId.value}</span></Fragment>
        :
        ''
    )
  }

  render() {
    const { state, props, inputChange, getUserInfo, submitHandle, sendMessage, exit, ClassToolCardItem } = this;
    const { inputs: { name, countryId, demoClassPhones, demoClassSchedules, teacherId, message, classTool, classToolId }, teacher } = state;
    const {
      t,
      userClass,
      demoClass,
      demoClasses: { demoClasses, success, loading, error },
      lingo: { lingoLanguages, lingoLevels, countries },
      teachers: { teachers },
    } = props;
    const statusOptions = ["pending", "noShow", "done", "canceled"].map(option => { return { id: option, name: option }; });
    const lingoLevelsOptions = lingoLevels.map(({ id, level }) => { return { id, name: level }; });
    const schedule = demoClassSchedules.find(schedule => schedule.scheduleId.value === this.props.userClass.id);
    const index = demoClassSchedules.indexOf(schedule);
    const user = service.getUserFromToken()
    //service.getLocalTimeFromUtc().format("YYYY-MM-DDTHH:mm:ss.sss")
    const userClassTime = service.userTimezoneConvert(schedule.originalScheduledDateTimeUTC.originalScheduledDateTimeUTC, 'UTC')
    // const originalClasstime = moment.tz(
    //   `${demoClassSchedules[index].scheduledDate.value} ${demoClassSchedules[index].scheduledStart.value}`,
    //   demoClassSchedules[index].originalScheduledTimezoneName.value);
    const studentClassTime = userClassTime.clone().tz(demoClass.timezone);

    const country = countries.filter(country => country.id === countryId.value)[0]
    const associatedClasses = demoClassSchedules.filter(schedule => schedule.scheduleId.value !== this.props.userClass.id);
    const atualDate = service.getLocalTimeFromUtc();
    const assignedTeacher = teachers.filter((teacher) => teacher.teacherId === Number(demoClassSchedules[index].teacherId.value))

    const teachersAndCoordinators = teachers.map(({ teacherId, teacherName, nativeLanguageName }) => { return { id: teacherId, name: teacherName, nativeLanguageName } })//.concat(coordinators.map(({userId, user}) => { return { id: userId, name: user.name }}))
    const currentStatus = demoClassSchedules[index] && demoClassSchedules[index].currentStatus ? demoClassSchedules[index].currentStatus : ''

    const editDisable = currentStatus === 'canceled' || (user.role === "teacher" || user.role === "student") || moment(userClassTime).add(30, 'minute').isBefore(atualDate) ? true : false

    { success && exit() }
    return (
      <div className="new-container content-container">
        <div className="classDetailsStatus">
          <h2>{t("CARD_CLASS_DETAILS")}</h2>
          <div className={`input-status`}>
            <div className="select-wrapper">
              <select
                data-item={demoClassSchedules[index].status.value.toUpperCase()}
                name="demoClassSchedules"
                id="status"
                value={demoClassSchedules[index].status.value}
                onChange={e => inputChange(e.target, index)}
                disabled={currentStatus === 'canceled' || user.role === "teacher" || user.role === "student"}
              >
                {statusOptions.map(option => (
                  <option
                    className={option.name.toUpperCase()}
                    key={option.name}
                    value={option.name}
                  >
                    {demoClassSchedules[index] && option.name === demoClassSchedules[index].status && "● "}
                    {t(option.name.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="classDetailsTime">
          <p>
            {userClassTime.format("DD/MM/YYYY • dddd • h:mm a")}{""} - {userClassTime.clone().add(30, "minutes").format("h:mm a")}
            {/* <span>({t("YOUR_TIMEZONE")})</span> */}
          </p>
          <h4>{t("DEMOCLASS")}</h4>
        </div>
        <div className="classDetailsInputs">
          <div className={`input-lingoLanguageId`}>
            <label className={demoClassSchedules[index].scheduledDate.error ? "invalid" : ""} htmlFor={`lingoLanguageId`}>
              {t("LANGUAGE")}:
            </label>
            <div className="select-wrapper">
              <FormControl className="languageInput" disabled={editDisable}>
                <Select
                  disableUnderline
                  className={`${!demoClassSchedules[index].lingoLanguageId.value
                      ? "placeholder"
                      : ""
                    } ${demoClassSchedules[index].lingoLanguageId.error ? "invalid" : ""
                    }`}
                  name="demoClassSchedules"
                  id={"lingoLanguageId"}
                  value={demoClassSchedules[index].lingoLanguageId.value}
                  onChange={e => inputChange({
                    id: "lingoLanguageId",
                    name: "demoClassSchedules",
                    value: e.target.value
                  },
                    index
                  )
                  }
                  displayEmpty
                  disabled={editDisable}
                  style={currentStatus === 'canceled' ? {} : { background: '#ffffff', borderRadius: 20 }}>
                  <MenuItem value={""}>{t("SELECT")}</MenuItem>
                  {lingoLanguages.map(option => (
                    <MenuItem key={option.language.name} value={option.id}>
                      <FlagIcon code={option.flag} size={18} />
                      &nbsp;
                      <span className="lingoLanguageItem'">
                        {t(option.language.name.toUpperCase())}
                      </span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={`input-levelByLingo`}>
            <label htmlFor="levelByLingo">{t("REAL_LEVEL")}:</label>
            <div className="select-wrapper">
              <select
                name="demoClassSchedules"
                id="levelByLingo"
                value={demoClassSchedules[index].levelByLingo.value}
                onChange={e => inputChange(e.target, index)}
                disabled={currentStatus === 'canceled'}
                style={currentStatus === 'canceled' ? {} : { background: '#ffffff' }}>

                <option value={""}> {t("SELECT")}</option>
                {lingoLevelsOptions.map((option, index) => (
                  <option key={option.name + index} value={option.name}>
                    {""}
                    {option.name}{""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="classDetailsPeople">
          <div className="classDetailsStudent">

            <h4>{t("STUDENT")}</h4>

            <div className="infosStudent">
              <p className="studentName">{name.value}</p>
              <ClassToolCardItem />
            </div>
            <p className="userInfo">{`${t("LEVEL_BY_STUDENT")}: ${demoClassSchedules[index].levelByStudent.value}`}</p>
            <p className="userInfo">{`${t("COUNTRY")}: ${country ? country.name : ""}`}</p>
            {user.role !== "teacher" && <p className="userInfo">{`${t("TELEPHONE")}: ${demoClassPhones.map(({ phone }) => phone.value).join(",")}`}</p>}
            <p className="classTime">
              <span>{t("LOCAL_CLASS_TIME")}: </span>
              {studentClassTime.format("DD/MM/YYYY • dddd • h:mm a")} - {studentClassTime.clone().add(30, "minutes").format("h:mm a")}
            </p>

          </div>
          <div className="classDetailsTeacher">
            <h4>{t("ASSIGNED_TEACHER")}</h4>
            <div>
              <div className="avatar">
                <img src={assignedTeacher[0] && assignedTeacher[0].picture || IconAvatar} alt="" />
              </div>
              <div>
                <div className={`input-teacherId`}>
                  <div className={`${!demoClassSchedules[index].teacherId.value ? "placeholder" : ""} select-wrapper`}>
                    <select name={"demoClassSchedules"} id="teacherId" value={demoClassSchedules[index].teacherId.value} onChange={(e) => inputChange(e.target, index)} disabled={editDisable} >
                      <option value={""} > {t("SELECT")}</option>

                      {
                        teachersAndCoordinators
                          .filter(({ nativeLanguageName }) => {
                            const selectedLanguage = lingoLanguages
                              .find((language) => language.id === demoClassSchedules[index].lingoLanguageId.value)
                            return selectedLanguage && nativeLanguageName === selectedLanguage.language.name
                          })
                          .map((option, index) => <option key={option.name + index} value={option.id}> {option.name} </option>)
                      }

                    </select>
                  </div>
                </div>
                {demoClassSchedules[index].teacherId.value &&
                  <div className="teacher-rating">
                    <h4>{t('AVARAGE_RATING')}:</h4>
                    <p>{assignedTeacher[0] && assignedTeacher[0].averageRating}</p>
                    <Rating
                      emptySymbol="fa fa-star-o fa-2x"
                      fullSymbol="fa fa-star fa-2x"
                      initialRating={assignedTeacher[0] && Number(assignedTeacher[0].averageRating)}
                      readonly={true}
                    />
                  </div>
                }
                <div className="teacher-info">
                  <p className="userInfo">{t("NATIVE_LANGUAGE")}: {t(assignedTeacher[0] && assignedTeacher[0].nativeLanguageName.toUpperCase())}</p>
                  <p className="userInfo">{t("COUNTRY")}: {assignedTeacher[0] && assignedTeacher[0].countryName}</p>
                  <p className="userInfo">{t("TELEPHONE")}: {assignedTeacher[0] && assignedTeacher[0].userPhones.split(",")}</p>
                  <p className="classTime">
                    <span>{t("LOCAL_CLASS_TIME")}: </span>
                    {assignedTeacher[0] && userClassTime.clone().tz(assignedTeacher[0].timezone).format("DD/MM/YYYY • dddd • h:mm a")}
                    - {assignedTeacher[0] && userClassTime.clone().tz(assignedTeacher[0].timezone).add(30, "minutes").format("h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="buttons">
          <button className="new-button exit" onClick={(e) => { exit() }}>{t("CANCEL")}</button>
          <button className='new-button' onClick={(e) => submitHandle(e)}>{t("SAVE")}</button>
        </div>
        <div className="classDetailsAssociatedClasses">
          <h4>{t("CARD_CLASS_ASSOCIATED")}</h4>
          <div className="associatedClasses">
            {associatedClasses.map(associatedClass => (
              <div className="associatedClass">
                <p className="classTime">{moment(`${associatedClass.scheduledDate.value} ${associatedClass.scheduledStart.value}`).format("DD/MM/YYYY • dddd • h:mm a")} - {moment(`${associatedClass.scheduledDate.value} ${associatedClass.scheduledStart.value}`).add(30, "minutes").format("h:mm a")}</p>
                <FlagIcon code={lingoLanguages.find(language => language.id === associatedClass.lingoLanguageId) && lingoLanguages.find(language => language.id === associatedClass.lingoLanguageId).flag} number={"22px"} />
                &nbsp;
                <span className="lingoLanguageItem'">
                  {t(lingoLanguages.find(language => language.id === associatedClass.lingoLanguageId.value) && lingoLanguages.find(language => language.id === associatedClass.lingoLanguageId.value).language.name.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="notesBox">
          <DemoClassMessages />
          <div className="boxType send">
            <div className="avatar">
              <img src={user.picture || IconAvatar} alt="" />
            </div>
            <form>
              <div className="typeMessage">
                <textarea className="input-lingo" name={"message"} value={message.value} placeholder={t("TYPE_MESSAGE")} onChange={(e) => this.setState({ inputs: { ...this.state.inputs, message: { value: e.target.value } } })}></textarea>
              </div>
              <button type="button" className="enter" onClick={(e) => { e.preventDefault(); sendMessage(e) }}>
                <img src={Enter} alt="" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ demoClasses, teachers, lingo }) => ({ demoClasses, teachers, lingo });
const mapDispatchToProps = dispatch => ({
  getLingoLanguages: data => dispatch(getLingoLanguages(data)),
  getLingoLevels: data => dispatch(getLingoLevels(data)),
  getLingoAllCountries: data => dispatch(getLingoAllCountries(data)),
  updateDemoClass: data => dispatch(updateDemoClass(data)),
  unsetDemoClassError: data => dispatch(unsetDemoClassError(data)),
  sendDemoClassMessage: data => dispatch(sendDemoClassMessage(data)),
  getDemoClassMessages: data => dispatch(getDemoClassMessages(data)),
  getTeachers: data => dispatch(getTeachers(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate("translations")(DemoClassDetailsContent)));

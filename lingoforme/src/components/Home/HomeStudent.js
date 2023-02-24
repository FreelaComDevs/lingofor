import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NextClassHomeStudent from "../_common/tableClass/nextClassHomeStudent";
import ButtonSchedule from "../Home/Componentes/Buttons/index";
import PlaceholderPlans from "../../images/placeholder/placeholder-noplan.png";
import iconHome from "../../images/icon-home-aluno.svg";
import TablePlansHomeStudent from "../Home/Componentes/TabelaPlans/table_plans_home_student";
import ModalRating from "../ClassRating/modal_rating";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Buttons } from "../Home/Componentes/Buttons/styles";
import SchedulesClass from "../ScheduleClass/index";
import { Legend } from "./styles";
import ScheduleCycle from "./Componentes/CalendarCycles";
import HomeStudentCalendar from "./HomeStudentCalendar";
class HomeStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openAlert: null,
      showing: false,
    };

    this.closeAlert = this.closeAlert.bind(this);
    this.toggleShowing = this.toggleShowing.bind(this);
  }

  state = { showing: true };

  closeAlert(e) {
    this.setState({ openAlert: false });
  }

  toggleShowing() {
    this.setState({ showing: !this.showing });
  }

  render() {
    const { showing } = this.state;
    const {
      t,
      user: { classesForRating, plans },
      lingo: { ratingCriterias },
    } = this.props;
    let { openAlert } = this.state;
    let canceledPlans = [];
    canceledPlans = plans.filter(
      (plan) =>
        plan?.studentPlanPayments &&
        plan?.studentPlanPayments.length > 0 &&
        plan?.studentPlanPayments[0]?.status === "cancelled"
    );

    if (canceledPlans && canceledPlans?.length == 1) {
      if (canceledPlans[0]?.plan?.trial) {
        if (openAlert == null) openAlert = true;
      }
    }

    if (plans && plans?.length) {
      //console.log('valid plan', plans, canceledPlans, plans?.length, plans[0]?.plan?.trial, moment(plans[0]?.expireIn)?.utc().isBefore(moment().utc()),openAlert)
    }

    return (
      <div className="student">
        {!!classesForRating?.length && !!ratingCriterias?.length && (
          <ModalRating target="teacher" />
        )}

        {openAlert != null && (
          <Dialog
            open={openAlert}
            onClose={this.closeAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <span className="titleModal">{t("TITLE_PLAN_EXPIRED")}</span>{" "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="pass-dialog-description">
                <b>{t("DESCRIPTION_PLAN_EXPIRED")}</b>
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Buttons>
                <Link to="/manage-account/plan?type=buynewplan">
                  <button style={{ backgroundColor: "red" }}>
                    {t("BTN_BUY_PLAN")}
                  </button>
                </Link>
              </Buttons>
            </DialogActions>
          </Dialog>
        )}

        <div className="boxInfo">
          <div className="nameScreen">
            <div className="iconScreen">
              <img src={iconHome} alt="IconHome" />
            </div>
            <div>
              <div>
                <h2>{t("SCREEN_HOME")}</h2>
              </div>
            </div>
          </div>
        </div>

        {plans?.length > canceledPlans?.length ? (
          <div>
            <TablePlansHomeStudent />
            {/* <ButtonSchedule /> */}
            <HomeStudentCalendar
              showing={this.state.showing}
              toggleShowing={this.toggleShowing}
            />
          </div>
        ) : plans?.length == 1 &&
          plans[0]?.plan?.trial &&
          moment(plans[0]?.expireIn)?.utc().isBefore(moment().utc()) ? (
          <div className="container">
            <div className="placeholder">
              <h4 className="trial_title">{t("TITLE_PLAN_EXPIRED")}</h4>
              <br />
              <br />
              <img src={PlaceholderPlans} alt="No Plans" />
              <p className="trial_description">
                {t("DESCRIPTION_PLAN_EXPIRED")}
              </p>
              <Buttons>
                <Link to="/manage-account/plan?type=buynewplan">
                  <button style={{ backgroundColor: "red" }}>
                    {t("BTN_BUY_PLAN")}
                  </button>
                </Link>
              </Buttons>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="placeholder">
              <h4>{t("DONT_HAVE_ACTIVE_PLAN")}</h4>
              <img src={PlaceholderPlans} alt="No Plans" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user, lingo }) => ({ user, lingo });
export default connect(mapStateToProps)(translate("translations")(HomeStudent));

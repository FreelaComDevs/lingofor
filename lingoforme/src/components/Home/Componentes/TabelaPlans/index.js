import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import moment from "moment";
import Services from "../../../_api/Services";
import { translate } from "react-i18next";
import { Table } from "./styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import { FlagIcon } from "react-flag-kit";
import PlaceholderText from "../../../_common/placeholder/placeholderText";
import infinite from "../../../../images/flag_multilingo.png";
import {MomentHelpers} from '../../../_common/momentLocalDate/momentLocalDate'
import { Buttons } from '../Buttons/styles'

class TablePlans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userStudentId: 0,
      plans: [],
      languages: []
    };

    this.serv = new Services();
    this.i18n = this.props.i18n;
    this.t = this.props.t;
  }

  componentDidMount() {

    //Get Lnaguages
    let urlGetLanguages = "lingolanguages/getall";
    this.serv
      .get(urlGetLanguages)
      .then(res => {
        this.setState({
          languages: res.result.items
        });
      })
      .catch(err => console.log("err getLanguages ", err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  calculatePlanEndDate(plan){
    if (plan.studentPlanPayments && plan.studentPlanPayments.length > 0){
      return MomentHelpers.formatHelper(plan.studentPlanPayments[0].providerNextCycleDate, this.props.i18n.language)
    }
    else if(plan.student && plan.student.contractPlanStudents && plan.student.contractPlanStudents[0] && plan.student.contractPlanStudents[0].studentPlanB2BRenewalCycle && plan.student.contractPlanStudents[0].studentPlanB2BRenewalCycle.nextCyc){
      return MomentHelpers.formatHelper(moment(plan.student.contractPlanStudents[0].studentPlanB2BRenewalCycle.nextCyc).utc(), this.props.i18n.language)
    }else{
      let monthDiff = moment().diff(plan.createdAt, "month") + 1
      return MomentHelpers.formatHelper(moment(plan.createdAt).add(monthDiff, 'M'), this.props.i18n.language)
    }
  }

  render() {
    const {
      props: { t, user: { plans }}
    } = this;

    let newUserPlans = [];
    var hasMultilingo = false;
    for (var item in plans) {
      if (plans[item].multiLingo) {
        if (!hasMultilingo) {
          newUserPlans.push(plans[item]);
          hasMultilingo = true;
        }
      } else newUserPlans.push(plans[item]);
    }

    const newPlans = newUserPlans.map(item => {
      const {plan: { totalClasses }, availableClasses } = item;
      item.cyclePercentage = parseFloat((availableClasses/totalClasses) * 100) % 1 !== 0 ? parseFloat(100-(availableClasses/totalClasses) * 100).toFixed(2) : parseFloat(100-(availableClasses/totalClasses) * 100);
      return item;
    });

    return (
      <div className="container">
        { !newPlans.length ? <PlaceholderText /> : (
          <Table>
            { newPlans.map(plan => (
              <div key={JSON.stringify(plan)}>
                <div className="bigBox">
                    <div className="boxItem">
                      <div className="item">
                        <div className="itensBox">
                          <h3>{this.t("CARD_PLAN")}</h3>
                          <span>{plan.plan.nameEnglish}</span>
                        </div>
                        <div className="itensBox">
                          <h3>{this.t("CARD_PLAN_COURSE")}</h3>
                          <span>
                            {plan.plan.multiLingo === false && (
                              <div>
                                <MenuItem value={plan.id}>
                                 <FlagIcon code={plan.studentPlanLanguages[0].lingoLanguage.flag} /> {this.t(plan.studentPlanLanguages[0].lingoLanguage.description.toUpperCase())}
                                </MenuItem>
                              </div>
                            )}
                            {plan.plan.multiLingo === true && (
                              <div>
                                <MenuItem value={plan.id}>
                                  <img style={{ width: "24px" }} src={infinite} alt="multilingo" />
                                  {this.t("Multilingo")}
                                </MenuItem>
                              </div>
                            )}
                          </span>
                        </div>
                        <div className="itensBox">
                          <h3>{this.t("CARD_PLAN_LEVEL")}</h3>
                          <span>{plan.student.studentLevelGrades.length > 0 
                            ? plan.student.studentLevelGrades.map(item => item.level.level).join(", ") 
                            : "-"}</span>
                        </div>
                        {/* <div className="itensBox">
                          <h3>{this.t("CARD_PLAN_FOCUS")} </h3>
                          <span>{plan.studentPlanLanguages[0].focus}</span>
                        </div>
                        <div className="itensBox">
                          <h3>{this.t("CARD_PLAN_STRUCTURE")}</h3>
                          <span>{plan.studentPlanLanguages[0].struct}</span>
                        </div> */}
                        <div className="itensBox">
                          <h3>{this.t("CARD_PLAN_SCHEDULE")}</h3>
                          <span>
                            { !plan.plan.trial ? this.t("RESETS_ON") : this.t("EXPIRED_ON")}{" "}
                            {this.calculatePlanEndDate(plan)}
                          </span>
                        </div>
                        { plan.plan.unlimited === false 
                          ? ( <div className="itensBox percentage">
                              <h3>{plan.cyclePercentage > 100 ? '100' : plan.cyclePercentage}%</h3>
                              <span>
                                {(plan.plan.totalClasses - plan.availableClasses) > plan.plan.totalClasses ? plan.plan.totalClasses : (plan.plan.totalClasses - plan.availableClasses)} / {plan.plan.totalClasses} {this.t("CARD_PLAN_CLASS")}
                              </span>
                            </div> )
                        : ( <div className="itensBox percentage">
                            <h3>
                              <img
                                style={{ width: "48px" }}
                                src={infinite}
                                alt="multilingo"
                              />
                            </h3>
                          </div> )
                        }
                        <div>
                        <div className="itensBox itensBoxButtons">
                          <Link to={`/manage-account/plan`}>
                            <button>
                              {this.t("BTN_VIEW")}{" "}
                              <i className="fa fa-angle-right" aria-hidden="true" />
                            </button>
                          </Link>
                          {plan.cyclePercentage === 100 && plan.studentPlanPayments.length > 0 && !plan.plan.trial && (
                            <Link
                              to={`/manage-account/plan?planId=${plan.planId}`}
                            >
                              <button className="button-buy-more">
                                {t("BUY_MORE_CLASSES")}
                              </button>
                            </Link>
                          )}                          
                        </div>
                        { plan.availablePartClasses > 0 && 
                            <div className="extraClassLabel">
                              <span> <b>{plan.availablePartClasses}</b> <b>{t("EXTRA_CLASSES")}</b> {t("IN_STOCK")}.</span>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                </div>
                { plan.plan.multiLingo === false && (
                  <div className={plan.root}>
                    <LinearProgress color="primary" variant="determinate" value={plan.cyclePercentage}/>
                  </div>
                )}
                { plan.plan.multiLingo === true && (
                  <div className={plan.root}>
                    <LinearProgress color="primary" variant="determinate" value="100"/>
                  </div>
                )}  
                { newPlans.length === 1 && plan.plan.trial && 
                  <div>
                    <Buttons>
                        <Link to="/manage-account/plan?type=buynewplan">
                            <button style={{backgroundColor:"red"}}>{this.t('BTN_BUY_PLAN')}</button>
                        </Link>
                    </Buttons>
                  </div>
                }
              </div>
            ))}
          </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user, lingo }) => ({ user, lingo })
export default connect(mapStateToProps)(translate('translations')(TablePlans))

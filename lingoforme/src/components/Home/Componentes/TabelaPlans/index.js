import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import moment from "moment";
import Services from "../../../_api/Services";
import { translate } from "react-i18next";
import { Container } from "./styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import PlaceholderText from "../../../_common/placeholder/placeholderText";
import {MomentHelpers} from '../../../_common/momentLocalDate/momentLocalDate'
import {CardPlan} from '../../../_common/cardPlans/index'
import { Buttons } from '../Buttons/styles'
import  PieChart  from '../../../PieChart/index'

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

    let urlGetLanguages = "lingolanguages/getall";
    this.serv
      .get(urlGetLanguages)
      .then(res => {
        this.setState({
          languages: res?.result?.items
        });
      })
      .catch(err => console.log("err getLanguages ", err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  calculatePlanEndDate(plan){
    if (plan?.studentPlanPayments && plan?.studentPlanPayments?.length > 0){
      return MomentHelpers.formatHelper(plan?.studentPlanPayments[0]?.providerNextCycleDate, this.props.i18n.language)
    }
    else if(plan?.student && plan?.student?.contractPlanStudents && plan?.student?.contractPlanStudents[0] && plan?.student?.contractPlanStudents[0]?.studentPlanB2BRenewalCycle && plan?.student?.contractPlanStudents[0]?.studentPlanB2BRenewalCycle?.nextCyc){
      return MomentHelpers.formatHelper(moment(plan?.student?.contractPlanStudents[0]?.studentPlanB2BRenewalCycle?.nextCyc).utc(), this.props.i18n.language)
    }else{
      let monthDiff = moment().diff(plan?.createdAt, "month") + 1
      return MomentHelpers.formatHelper(moment(plan?.createdAt).add(monthDiff, 'M'), this.props.i18n.language)
    }
  }

  render() {
    const {
      props: {user: { plans }}
    } = this;

    let newUserPlans = [];
    var hasMultilingo = false;
    for (var item in plans) {
      if (plans[item].multiLingo) {
        if (!hasMultilingo) {
          newUserPlans.push(plans[item]);
          hasMultilingo = true;
        }
      } else newUserPlans?.push(plans[item]);
    }

    const newPlans = newUserPlans.map(item => {
      const {plan: { totalClasses }, availableClasses } = item;
      item.cyclePercentage = parseFloat((availableClasses/totalClasses) * 100) % 1 !== 0 ? parseFloat(100-(availableClasses/totalClasses) * 100).toFixed(2) : parseFloat(100-(availableClasses/totalClasses) * 100);
      return item;
    });

    return (
      <div className="container">
        { !newPlans?.length ? <PlaceholderText /> : (
          <Container>
            {newPlans.map(plan => (
              <div key={JSON.stringify(plan)}>
                <CardPlan
                  valueMenuItem={plan?.id}
                  sizeMenuItem={75}
                  codeMenuItem={plan?.studentPlanLanguages[0]?.lingoLanguage?.flag}
                  titlePlan={this.t("CARD_PLAN")}
                  subTitlePlan={plan?.plan?.nameEnglish}
                  pieChart={
                    <div>
                      <PieChart
                        percent={plan?.cyclePercentage > 100 ? '100' : plan?.cyclePercentage} />
                    </div>
                  }
                  titleClass={this.t("CARD_PLAN_CLASS")}
                  classTotal={(plan?.plan?.totalClasses - plan?.availableClasses) > plan?.plan?.totalClasses ? plan?.plan?.totalClasses : (plan?.plan?.totalClasses - plan?.availableClasses)}
                  MissingClass={plan?.plan?.totalClasses}
                  titleExtraClass={this.t("EXTRA_CLASSES")}
                  resetPlans={this.t("RESETS_ON")}
                  subResetPlan={this.calculatePlanEndDate(plan)}
                  numberExtra={plan?.availablePartClasses}
                  href={"/manage-account/plan"}
                  buttonView={this.t("BTN_VIEW")}
                />
                {plan?.plan?.multiLingo === false && (
                  <div className={plan?.root}>
                    <LinearProgress color="primary" variant="determinate" value={plan?.cyclePercentage} />
                  </div>
                )}
                {newPlans?.length === 1 && plan?.plan?.trial &&
                  <div>
                    <Buttons>
                      <Link to="/manage-account/plan?type=buynewplan">
                        <button style={{ backgroundColor: "red" }}>{this.t('BTN_BUY_PLAN')}</button>
                      </Link>
                    </Buttons>
                  </div>}
              </div>
            ))}
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user, lingo }) => ({ user, lingo })
export default connect(mapStateToProps)(translate('translations')(TablePlans))

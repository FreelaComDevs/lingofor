import ScheduleCycle from "./Componentes/CalendarCycles";
import NextClassHomeStudent from "../_common/tableClass/nextClassHomeStudent";
import SchedulesClass from "../ScheduleClass/index";
import { Legend } from "./styles";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { useState, useMemo } from "react";
import moment from "moment";

const HomeStudentCalendar = ({ t, user, showing, toggleShowing }) => {
  let myDate =
    user?.plans[0]?.student?.contractPlanStudents[0]?.studentPlanB2BRenewalCycle
      ?.startCy ?? null;
  myDate = myDate.split("T");
  myDate = myDate[0];

  const [date, setDate] = useState(moment(myDate));
  const [selectedDate, setSelectedDate] = useState(moment());

  const cycle = useMemo(() => {
    const plan =
      user.plans[0].student.contractPlanStudents[0].studentPlanB2BRenewalCycle;
    const startDate = plan.startCy.split("T");
    const endDate = plan.nextCyc.split("T");

    if (date.isSame(startDate, "month")) {
      const date_end = moment(endDate[0]).subtract(1, "days");
      return {
        start: date.format("YYYY-MM-DD"),
        end: date_end.format("YYYY-MM-DD"),
      };
    } else {
      const day = date.date();
      const monthDate = moment(
        `${date.format("YYYY")}-${date.format("MM")}-${day}`
      );
      const endDate = monthDate.clone().add(1, "months").subtract(1, "days");
      return {
        start: monthDate.format("YYYY-MM-DD"),
        end: endDate.format("YYYY-MM-DD"),
      };
    }
  }, [date.format("YYYY-MM-DD")]);

  console.log("toggleShowing", toggleShowing);

  return (
    <div className="content">
      <div className="contentCycles overflow-y-scroll">
        <ScheduleCycle
          hasCycle={true}
          date={date}
          setDate={setDate}
          cycle={cycle}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="contentNextClass">
        <div className="nextHome">
          <div className="containerNextClass">
            <h2 className="titleNextClass">
              <div>{t("BTN_UPCOMING_CLASS")}</div>
            </h2>
            {!showing ? (
              <div className="buttonShed">
                <button onClick={() => toggleShowing()}>+ AGENDAR AULA</button>
              </div>
            ) : null}
          </div>

          <NextClassHomeStudent
            date={selectedDate.format("YYYY-MM-DD")}
            cycle={cycle}
          />

          <Legend>
            <div className="scheduledLegend">
              <div className="container"></div>
              <h5>Agendadas</h5>
            </div>
            <div className="InprogressLegend">
              <div className="container"></div>
              <h5>em andamento</h5>
            </div>
            <div className="noShowLegend">
              <div className="container"></div>
              <h5> no show</h5>
            </div>
            <div className="cancelLegend">
              <div className="container"></div>
              <h5>cancelado out of limit</h5>
            </div>
            <div className="performedLegend">
              <div className="container"></div>
              <h5>realizadas</h5>
            </div>
          </Legend>
        </div>
      </div>
      {showing ? (
        <div>
          <SchedulesClass></SchedulesClass>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ user, lingo }) => ({ user, lingo });
export default connect(mapStateToProps)(
  translate("translations")(HomeStudentCalendar)
);

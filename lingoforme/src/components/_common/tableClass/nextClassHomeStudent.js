import React, { useEffect, Fragment, useState } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import moment from "moment";
import Services from "../../_api/Services";
import PlaceholderText from "../../_common/placeholder/placeholderText";
import ListCalendarHomeStudentSchedule from "../../Calendar/ListCalendarHomeStudentSchedule";
import timezone from "moment-timezone";
import { MomentHelpers } from "../../_common/momentLocalDate/momentLocalDate";
import { Scroll } from "./styles_next_class_home";

const nextClassHomeStudent = ({
  t,
  single,
  date,
  cycle,
  user: { id, nextClasses },
}) => {
  const [classes, setClasses] = useState([]);
  const lang = localStorage.getItem("i18nextLng");

  const serv = new Services();

  const format = (classes) => {
    let saveCod = [];
    let saveSchedule = "";
    let startTime = "";

    let num;
    let hours;
    let rhours;
    let minutes;
    let rminutes;
    let array = [];
    if (classes?.length > 0) {
      //console.log('nextClasses: ', nextClasses);
      const classesFormated = classes?.map((el, index) => {
        const user = serv.getUserFromToken();
        const resp = timezone
          .tz(el.originalScheduledDateTimeUTC, "UTC")
          .clone()
          .tz(user?.timezone);
        const time = resp;
        const initialDate = MomentHelpers.formatHelper(time, lang);
        const initialDay = t(time.format("dddd"));
        const initialTime = time.format("hh:mm A");
        const finalTime = time.clone().add(30, "minutes").format("hh:mm A");
        const schedule = `${initialDate} • ${initialDay} • ${initialTime} - ${finalTime}`;
        if (el.sequentialSchedule == true) {
          let numeroAulas = el?.sequentialScheduleClassesCount;
          let cont = 0;
          if (saveCod.includes(el?.allocationScheduleId) == false) {
            saveCod.push(el?.allocationScheduleId);
            for (let a = 0; a < classes?.length; a++) {
              if (
                classes[a]?.allocationScheduleId == el?.allocationScheduleId
              ) {
                cont++;
                if (cont == numeroAulas) {
                  //gravar aula no array
                  const user2 = serv.getUserFromToken();
                  const resp2 = timezone
                    .tz(classes[a]?.originalScheduledDateTimeUTC, "UTC")
                    .clone()
                    .tz(user2.timezone);
                  const atualDate2 = serv.getLocalTimeFromUtcAdd();
                  const formatDateAtual = atualDate2.format(
                    "YYYY-MM-DDTHH:mm:ss.sss"
                  );
                  const startT = moment(
                    formatDateAtual,
                    "YYYY-MM-DDTHH:mm:ss.sss"
                  );
                  const endT = moment(resp2, "YYYY-MM-DDTHH:mm:ss.sss");
                  const hoursDiff = endT.diff(startT, "minutes");
                  if (hoursDiff + 30 > 0) {
                    const time2 = resp2;
                    const initialDate2 = MomentHelpers.formatHelper(
                      time2,
                      lang
                    );
                    const initialDay2 = t(time2.format("dddd"));
                    const finalTime2 = time2
                      .clone()
                      .add(30, "minutes")
                      .format("hh:mm A");

                    //time
                    num = numeroAulas * 30;
                    hours = num / 60;
                    rhours = Math.floor(hours);
                    minutes = (hours - rhours) * 60;
                    rminutes = Math.round(minutes);
                    if (rminutes == 0) {
                      rminutes = `• (${rhours}h)`;
                    } else if (rhours == 0) {
                      rminutes = `• (${rminutes}m)`;
                    } else {
                      rminutes = `• (${rhours}h:${rminutes}m)`;
                    }
                    const total = rminutes;
                    const schedule2 = `${initialDate} • ${initialDay} • ${startTime} - ${finalTime2} ${total}`;
                    el.timeTotal = schedule2;
                    //count++;
                    array.push(el);
                  }
                } else {
                  //gravar inicio da aula
                  if (cont == 1) {
                    startTime = initialTime.toString();
                  }
                }
              }
            }
          }
        } else {
          const atualDate2 = serv.getLocalTimeFromUtcAdd();
          const formatDateAtual = atualDate2.format("YYYY-MM-DDTHH:mm:ss.sss");
          const startT = moment(formatDateAtual, "YYYY-MM-DDTHH:mm:ss.sss");
          const endT = moment(resp, "YYYY-MM-DDTHH:mm:ss.sss");
          const hoursDiff = endT.diff(startT, "minutes");
          console.log("NextClass => hoursDiff :: ", hoursDiff);
          console.log("NextClass => startT :: ", startT);
          console.log("NextClass => endT :: ", endT);
          //initialDay
          console.log("NextClass => initialDate :: ", initialDate);
          console.log(
            "NextClass => atualDate2 :: ",
            MomentHelpers.formatHelper(atualDate2, lang)
          );
          if (hoursDiff + 30 > 0) {
            saveSchedule = schedule;
            el.timeTotal = schedule;
            //count++;
            array.push(el);
          }
        }
        console.log("array", array);
        return el;
      });

      return classesFormated
        .sort((a, b) =>
          a?.sequentialScheduleClassesCount < b?.sequentialScheduleClassesCount
            ? 1
            : -1
        )
        .sort((a, b) =>
          a?.originalScheduledDateTimeUTC > b?.originalScheduledDateTimeUTC
            ? 1
            : -1
        );
    } else {
      return [];
    }
  };

  const fetchClasses = async () => {
    const pageNumber = 1;
    const pageSize = 9999;
    const startAt = date + `T00:00:00.000`;
    const endAt = cycle.end + `T23:59:59.000`;
    //const type = selectedType ? selectedType : "";
    //const lingoLanguageId = selectedLingoLanguageId ? selectedLingoLanguageId: "";
    //const planId = selectedPlanId ? selectedPlanId : "";
    //const status = selectedStatus ? selectedStatus : "";
    //const studentId = id;
    // const teacher = selectedTeacher ? selectedTeacher : "";
    const orderByAsc = "originalScheduledDateTimeUTC";
    const params = {
      pageNumber,
      pageSize,
      startAt,
      endAt,
      //lingoLanguageId,
      //type,
      //planId,
      //status,
      //teacher,
      //studentId,
      orderByAsc,
    };
    const response = await serv.ApiGetParams("classSchedules", params);
    const user = serv.getUserFromToken();

    const formated = response?.result?.items.map((c) => {
      const dateUTC = timezone
        .tz(c.originalScheduledDateTimeUTC, "UTC")
        .clone()
        .tz(user?.timezone);

      const dateEnd = moment(c.scheduledEndDateTime).utc();
      const dateEndUTC = timezone.tz(dateEnd, "UTC").clone().tz(user?.timezone);

      const dateFormated = dateUTC.format("DD/MM/YYYY");
      const dayweek = dateUTC.format("dddd");
      const hourStart = dateUTC.format("HH:mm A");
      const hourEnd = dateEndUTC.format("HH:mm A");

      c.timeTotal = `${dateFormated} • ${dayweek}  • ${hourStart} - ${hourStart} • `;
      return c;
    });
    setClasses(formated || []);
  };

  useEffect(() => {
    console.log("mudou data", date);
    fetchClasses();
  }, [date]);

  // const schedules = nextClasses.length > 0
  //   ? single ? [nextClasses[0]] : nextClasses
  //   : []
  return single ? (
    <></>
  ) : (
    <Fragment>
      <strong className="dateNexyClass">
        {classes.length > 0
          ? moment(classes[0].originalScheduledDateTime).format("DD/MM")
          : null}
      </strong>
      <hr className="separator"></hr>

      <Scroll>
        <div>
          {classes?.length > 0 ? (
            classes?.map((schedule) => (
              <ListCalendarHomeStudentSchedule
                key={JSON.stringify(schedule)}
                schedule={schedule}
              />
            ))
          ) : (
            <PlaceholderText />
          )}
        </div>
      </Scroll>
    </Fragment>
  );
};

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(
  translate("translations")(nextClassHomeStudent)
);

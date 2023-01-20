import React, { Fragment } from "react";
import { translate } from "react-i18next";
import moment from "moment";

import Services from '../_api/Services';
const service = new Services();



const MonthCalendarSchedules = ({ t, daySchedules, onScheduleClick }) => {
  const { role } = JSON.parse(localStorage.getItem("@lingo"))
  const userFromToken = service.getUserFromToken();
  return (
    <Fragment>

    { 
      daySchedules
        .filter(daySchedule => {
          if(role === "teacher"){
                return daySchedule.status !== "pending"
          }
          return true
        })
        .map((item, index) => {

        const time =  moment.tz(item.scheduledDate + 'T' + item.scheduledStartTime + '.000', item.originalScheduledTimezoneName);
        const timeStart = time.clone().tz(userFromToken.timezone).format("hh:mm a");
        const timeEnd = time.clone().tz(userFromToken.timezone).add(30, "minutes").format('hh:mm a')
        const isCanceled = item.status === "canceled";
        const isDone = item.status === "done";

        if (index < 2) {
          return (
            <div 
              key={item.id} 
              className={`calendarSchedule ${ isCanceled ? "canceled" : "" } ${isDone ? "done" : ""}`}
              onClick={(e) => onScheduleClick(e, item.id)}
            >
              <p className="calendarScheduleTime">{`${timeStart} - ${timeEnd}`}</p>
              <p className="calendarScheduleLanguage">
                {t(item.lingoLanguage.language.name.toUpperCase())}
              </p>
            </div>
          );
        }
      })
      
      
      }
      {daySchedules.length > 2 && (
        <p className="calendarMoreSchedules">
          {`+ ${daySchedules.length - 2} ${daySchedules.length-2===1?t("CLASS"):t("CLASSES")}`}
        </p>
      )}
    </Fragment>
  );
};

export default translate("translations")(MonthCalendarSchedules);

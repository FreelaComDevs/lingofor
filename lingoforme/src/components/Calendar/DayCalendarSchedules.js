import React, { Fragment } from "react";
import { translate } from "react-i18next";
import moment from "moment";
import timezone from 'moment-timezone'
import Services from '../_api/Services';
const service = new Services();

const userFromToken = service.getUserFromToken();

const DayCalendarSchedules = ({ t, timeSchedules, onScheduleClick }) => {
  const targetId = timeSchedules.length > 0 ? timeSchedules[0].id : ""
  const { role } = JSON.parse(localStorage.getItem("@lingo"))
  return (
    <Fragment>
      {        
        timeSchedules
        .filter(timeSchedule => {
          if(role === "teacher"){
                return timeSchedule.status !== "pending"
          }
          return true
        })
        .map((item, index) => {
          const time =  moment.tz(item.scheduledDate + 'T' + item.scheduledStartTime + '.000', item.originalScheduledTimezoneName);
          const timeStart = time.clone().tz(userFromToken.timezone).format("hh:mm a");
          const timeEnd = time.clone().tz(userFromToken.timezone).add(30, "minutes").format('hh:mm a')
        return (
          <div 
            key={item.id} 
            className={`calendarSchedule ${item.status === "canceled" ? "canceled" : ""} ${item.status === "done" ? "done" : ""}`}
            onClick={(e) => onScheduleClick(e, targetId)}
          >
            <p className="calendarScheduleTime">{`${timeStart} - ${timeEnd}`}</p>
            <p className="calendarScheduleLanguage">
              {t(item.lingoLanguage.language.name.toUpperCase())}
            </p>
          </div>
        );
      })}
    </Fragment>
  );
};

export default translate("translations")(DayCalendarSchedules);

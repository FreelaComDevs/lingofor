import React, { Fragment } from "react";
import { translate } from "react-i18next";
import moment from "moment";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import MonthCalendarSchedules from "./MonthCalendarSchedules";
import MonthCalendarSchedulesManagement from "./MonthCalendarSchedulesManagement";

const MonthCalendar = ({ t, calendarObj }) => {
  const { schedules, selectedStart, atualDate, onDateClick, onSchedulesClick, onScheduleClick } = calendarObj
  const monthStart = selectedStart.clone().startOf("month");
  const monthEnd = selectedStart.clone().endOf("month");
  const startDate = monthStart.clone().startOf("week");
  const endDate = monthEnd.clone().endOf("week");
  const { role } = JSON.parse(localStorage.getItem("@lingo"))
  const rows = [];
  let days = [];
  let day = startDate;
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const daySchedules = schedules
        .filter(item => item.scheduledDate === day.format("YYYY-MM-DD"))
        .sort((a, b) => {
          if (a.status > b.status)
            return -1;
          if (a.status < b.status)
            return 1;
          return 0;
        });
      const isSameMonth = day.isSame(selectedStart, "month");
      const isSameDay = day.isSame(atualDate, "day");
      const targetDay = day.clone()
      days.push(
        <div
          key={day + i}
          className={`monthDay ${!isSameMonth ? "disabled" : isSameDay ? "selected" : ""}`}
          onClick={() => onDateClick(targetDay)}
        >

          
          <p className="calendarDay">{day.format("DD")}</p>
          { role === "student" || role === "teacher" 
            ? <MonthCalendarSchedules 
                daySchedules={daySchedules} 
                onScheduleClick={onScheduleClick} 
                targetDay={targetDay} 
              /> 
            : <MonthCalendarSchedulesManagement 
                daySchedules={daySchedules} 
                onSchedulesClick={onSchedulesClick} 
                targetDay={targetDay}
              /> 
          }
        </div>
      );
      day.add(1, "day");
    }
    rows.push(<div className="monthWeekBox" key={day.format("DD/MM/YYYY")}>{days}</div>);
    days = [];
  }
  return (
    <Fragment>
      <CalendarDaysOfWeek calendarObj={calendarObj}/>
      <div className="monthBox">{rows}</div>
    </Fragment>
  );
};

export default translate("translations")(MonthCalendar);

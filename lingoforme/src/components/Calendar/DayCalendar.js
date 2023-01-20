import React, { Component, Fragment, createRef } from "react";
import { translate } from "react-i18next";
import CalendarDaysOfWeek from "./CalendarDaysOfWeek";
import DayCalendarSchedules from "./DayCalendarSchedules";
import DayCalendarSchedulesManagement from "./DayCalendarSchedulesManagement";
import moment from 'moment'

class MonthCalendar extends Component {
  weekBoxRef = createRef()

  componentDidMount() {
    this.weekBoxRef.current.scrollTop = 594
  }
  
  render() {
    const { weekBoxRef, props: { calendarObj }} = this
    const timeSlots = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "00:00"]
    const {schedules, selectedStart, onSchedulesClick, onScheduleClick } = calendarObj
    const { role } = JSON.parse(localStorage.getItem("@lingo"))
    const rows = [];
    let counter = 0
    for (const time in timeSlots) {        
        const daySchedules = schedules.filter(item => item.scheduledDate === selectedStart.format("YYYY-MM-DD"));
        const timeSchedules = daySchedules
          .filter(item => item.scheduledStartTime.slice(0,5) === timeSlots[time])
          .sort((a, b) => {
            if (a.status > b.status)
              return -1;
            if (a.status < b.status)
              return 1;
            return 0;
          });

        rows.push(
          <div className="dayTimeBox" key={'dayTimeBox'+counter}>
            { timeSlots[time].slice(3,4) !== "3" && (
              <p className="dayCalendarTime">{moment(`2019-05-02 ${timeSlots[time]}`).format("h a")}</p>
            )}
            <div key={'dayT'+counter} className={`dayTime`} >
              { role === "student" || role === "teacher" 
                ? <DayCalendarSchedules 
                    timeSchedules={timeSchedules} 
                    onScheduleClick={onScheduleClick}
                  /> 
                : <DayCalendarSchedulesManagement 
                    timeSchedules={timeSchedules} 
                    onSchedulesClick={onSchedulesClick}
                    onScheduleClick={onScheduleClick}
                  /> 
              }
            </div>
          </div>
        );
        counter++
    }

    return (
      <Fragment>
        <CalendarDaysOfWeek calendarObj={calendarObj}/>
        <div key={'CalendarOfDay'} className="dayBox" ref={weekBoxRef}>{rows}</div>
      </Fragment>
    )
  }
}

export default translate("translations")(MonthCalendar);

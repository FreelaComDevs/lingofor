import React from "react";
import { translate } from "react-i18next";
import { connect } from 'react-redux';

const MonthCalendarHeader = ({
  t, 
  calendar,
  calendar: { activeScreen, selectedStart, selectedEnd, selectedDateTime },
  calendarHeaderObj: { prevDate, nextDate,  atualDate, viewHandler },
  calendarHeaderObj
}) => {
  selectedStart = calendarHeaderObj.selectedStart ? calendarHeaderObj.selectedStart : selectedStart
  selectedEnd   = calendarHeaderObj.selectedEnd ? calendarHeaderObj.selectedEnd : selectedEnd

  const screens = ["month", "week", "day", "list"];
  const { role } = JSON.parse(localStorage.getItem("@lingo"))
  const isManager = role === "companyManager" || role === "customerService" || role === "coordinator"
  const isListCalendar = activeScreen === "list";
  const startYear = selectedStart.format(` • YYYY`) 
  const startMonth = t(selectedStart.format("MMM").toUpperCase())
  const startWeekYear = selectedStart.clone().startOf("week").format(` • YYYY`)
  const startWeekMonth = t(selectedStart.clone().startOf("week").format("MMM").toUpperCase())
  const startWeekDay = selectedStart.clone().startOf("week").format("DD")
  const startDay = selectedStart.format("DD") 
  const endMonth = t(selectedEnd.format("MMM").toUpperCase())
  const endWeekYear = selectedStart.clone().endOf("week").format(` • YYYY`)
  const endWeekMonth = t(selectedStart.clone().endOf("week").format("MMM").toUpperCase())
  const endWeekDay = selectedStart.clone().endOf("week").format("DD")
  const endDay = selectedEnd.format("DD") 
  const endYear = selectedEnd.format(` • YYYY`) 
  const sameYear = startYear === endYear
  const sameWeekYear = startWeekYear === endWeekYear
  const sameMonth = startMonth === endMonth
  const sameWeekMonth = startWeekMonth === endWeekMonth
  const sameDay = startDay === endDay
  const sameDate= sameYear && sameMonth && sameDay
  
  const atualDateLabel = () => {
    switch (activeScreen) {
      case "month":
        return `${t(selectedStart.format("MMMM"))} ${selectedStart.format(`• YYYY`)}`
      case "week":
        return `${startWeekMonth} ${startWeekDay} ${sameWeekYear ? "" : startWeekYear} ${ 
          sameWeekMonth 
            ? ` - ${endWeekDay}` 
            : ` - ${endWeekMonth} ${endWeekDay}` 
          } ${endYear}`;
       
      case "day":
        return `${startMonth} ${startDay} ${startYear}`;
      case "list":
        return `${startMonth} ${startDay} ${sameYear ? "" : startYear} ${
          sameDate
            ? ""
            : sameMonth ? ` - ${endDay}` : ` - ${endMonth} ${endDay}`
        } ${endYear} ${selectedDateTime ? `- ${selectedDateTime}` : ''}`;
      default:
        break;
    }
  }
  return (
    <div className="calendarHeader">
      <div className={`dateHandlerBox ${ isListCalendar ? isManager ? "dnone" : "" : ""}`}>
        <div className="dateHandler">
          <button className="prevDate" onClick={() => prevDate()}><i className="fa fa-angle-left" /></button>
          <button className="nextDate" onClick={() => nextDate()}><i className="fa fa-angle-right" /></button>
        </div>
        <button className="atualDate" onClick={() => atualDate()}>{t("TODAY")}</button>
      </div>
      <p className="atualDateLabel">{atualDateLabel()}</p>
      <ul className="viewHandler">
        {screens.map(item => (
          <li key={item} className={`${activeScreen === item ? "active" : ""}`} onClick={() => viewHandler(item)}>
            {t(item.toUpperCase())}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ calendar }) => ({ calendar })
export default connect(mapStateToProps)(translate('translations')(MonthCalendarHeader))

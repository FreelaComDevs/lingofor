import React, { Fragment } from 'react'
import { translate } from 'react-i18next';
import moment from 'moment'

const MonthCalendarDaysOfWeek = ({ t, calendarObj: { atualDate, selectedStart, activeScreen }}) => {
  let startDate = selectedStart.clone().startOf('week');
  const days = [];
  if (activeScreen !== "day") {
    for (let i = 0; i < 7; i++) { 
    const sameDate = startDate.clone().add(i, "day").format("DD/MM/YYYY") === atualDate.format("DD/MM/YYYY");
    days.push(
        <div className="dayWeek" key={'kDay'+startDate.clone().add(i, "day").format('ddd')}>
          <p className="dayWeekName ">{t(startDate.clone().add(i, "day").format('ddd').toUpperCase())}</p>
          { activeScreen === "week" && 
            <p className={`dayWeekNumber ${sameDate ? "selected" : ""}`}>
              { startDate.clone().add(i, "day").format('DD')}
            </p> 
          }
        </div>
      )
    }
  } else {
    days.push(
      <div className="dayWeek" key={'kDay'+startDate.clone().format('ddd')}>
        <p className="dayWeekName">{t(startDate.clone().format('ddd').toUpperCase())}</p>
      </div>
    )
  }
  return <div key={'kDays'+startDate.clone().format('ddd')} className="daysWeek">{days}</div>
}

export default translate('translations')(MonthCalendarDaysOfWeek)

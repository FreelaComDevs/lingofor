import React, { Fragment } from "react";
import { translate } from "react-i18next";
import moment from "moment";

const MonthCalendarSchedulesManagement = ({ t, timeSchedules, onSchedulesClick, onScheduleClick }) => {
  const targetDay = timeSchedules.length > 0 ? moment(timeSchedules[0].scheduledStartDateTime) : ""
  const targetId = timeSchedules.length > 0 ? timeSchedules[0].id : ""
  const languages = timeSchedules.reduce((languageArray, { lingoLanguage: { language: { name }}}) =>
    Object.assign(languageArray, { [name]: (languageArray[name] || 0) + 1 }), {} 
  );

  let languageSchedules = []
  for (const language in languages) {
    const hasOneSchedule = languages[language] === 1 
    const targetLanguage = timeSchedules.find(schedule => {
      return schedule.lingoLanguage.language.name === language
    }).lingoLanguage.id
    languageSchedules.push(
      <div 
        key={[language]} 
        className="calendarSchedule"
        onClick={(e) => { 
          hasOneSchedule
            ? onScheduleClick(e, targetId)
            : onSchedulesClick(e, targetDay, targetLanguage, true)
        }}
      >
        <p className="calendarSchedulesQuantity">{`${languages[language]} ${ hasOneSchedule ? t("CLASS") : t("CLASSES")}`}</p>
        <p className="calendarSchedulesLanguage">{language}</p>
      </div>
    )
  }

  return languageSchedules;
};

export default translate("translations")(MonthCalendarSchedulesManagement);

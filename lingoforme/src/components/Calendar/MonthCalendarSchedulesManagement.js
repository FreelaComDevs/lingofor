import React, { Fragment } from "react";
import { translate } from "react-i18next";
import moment from "moment";

const MonthCalendarSchedulesManagement = ({ t, targetDay, daySchedules, onSchedulesClick }) => {
  const languages = daySchedules.reduce((languageArray, { lingoLanguage: { language: { name }}}) =>
    Object.assign(languageArray, { [name]: (languageArray[name] || 0) + 1 }), {} 
  );

  let languageSchedules = []
  if(Object.keys(languages).length > 0 && Object.keys(languages).length < 4) {
    for (const language in languages) {
      const targetLanguage = daySchedules.find(schedule => {
        return schedule.lingoLanguage.language.name === language
      }).lingoLanguage.id
      languageSchedules.push(
        <div key={language} className="calendarSchedule" onClick={(e) => onSchedulesClick(e, targetDay, targetLanguage)} >
          <p className="calendarSchedulesQuantity">{`${languages[language]} ${ languages[language] === 1 ? t("CLASS") : t("CLASSES")}`}</p>
          <p className="calendarSchedulesLanguage">{language}</p>
        </div>
      )
    }
  } else if (Object.keys(languages).length > 3) {
    languageSchedules.push(
      <div key={"allLanguages"} className="calendarSchedule" onClick={(e) => onSchedulesClick(e, targetDay, "")}>
        <p className="calendarSchedulesQuantity">{`${daySchedules.length} ${t("CLASSES")}`}</p>
        <p className="calendarSchedulesLanguage">{t("ALL_LANGUAGES")}</p>
      </div>
    )
  }

  return languageSchedules;
};

export default translate("translations")(MonthCalendarSchedulesManagement);

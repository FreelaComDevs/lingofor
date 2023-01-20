import React, { Fragment } from "react";
import { translate } from "react-i18next";
import ListCalendarSchedule from "./ListCalendarSchedule";
import Placeholder from '../.././components/_common/placeholder/placeholderByPage';
import Services from '../_api/Services';//../../_api/Services
import timezone from 'moment-timezone';
import {MomentHelpers} from '../_common/momentLocalDate/momentLocalDate';
import moment from 'moment';

const ListCalendar = ({ t, calendarObj }) => {
  console.log('ListCalendar >>> ', calendarObj);
  const {schedules, selectedStart, selectedEnd } = calendarObj;
  const lang = localStorage.getItem("i18nextLng");
  const serv = new Services()
  let saveCod = [];
  let saveSchedule = '';
  let startTime = '';
  let array = [];

  let num;
  let hours;
  let rhours;
  let minutes;
  let rminutes;
  console.log('schedules :: ', schedules);
  const listTemp = schedules.filter(item => {
    //const itemStart = moment(item.scheduledStartDateTime) 
    //const filterStart = selectedStart.clone().startOf("day")
    const itemEnd = moment(item.scheduledEndDateTime) 
    const filterEnd = selectedEnd.clone().startOf("day").add({days:1,minutes:1})
    return itemEnd < filterEnd
    //return itemStart > filterStart && itemEnd < filterEnd
  })
  console.log('listTemp :: ', listTemp);
  if(listTemp.length > 0){
    listTemp.map((el, index) => {
      const user = serv.getUserFromToken();
      const resp = timezone.tz(el.originalScheduledDateTimeUTC, 'UTC').clone().tz(user.timezone);
      const time = resp;
      const initialDate = MomentHelpers.formatHelper(time, lang);
      const initialDay = t(time.format("dddd"));
      const initialTime = time.format("hh:mm A");
      const finalTime = time.clone().add(30, "minutes").format("hh:mm A");
      const schedule = `${initialDate} • ${initialDay} • ${initialTime} - ${finalTime}`;

      if(el.sequentialSchedule === true){
        //agrupamento das aulas sequenciais
        let numeroAulas = el.sequentialScheduleClassesCount;
        let cont = 0;
        if(saveCod.includes(el.allocationScheduleId) === false){
          saveCod.push(el.allocationScheduleId);
          for(let a = 0; a < listTemp.length; a++){
            if(listTemp[a].allocationScheduleId === el.allocationScheduleId){
              cont++;
              if(cont === numeroAulas){
                //gravar aula no array                
                const user2 = serv.getUserFromToken();
                const resp2 = timezone.tz(listTemp[a].originalScheduledDateTimeUTC, 'UTC').clone().tz(user2.timezone);

                const atualDate2 = serv.getLocalTimeFromUtcAdd();
                const formatDateAtual = atualDate2.format("YYYY-MM-DDTHH:mm:ss.sss");
                const startT = moment(formatDateAtual, "YYYY-MM-DDTHH:mm:ss.sss");
                const endT = moment(resp2, "YYYY-MM-DDTHH:mm:ss.sss");
                const hoursDiff = endT.diff(startT, 'minutes');
                console.log('listCalendar => hoursDiff:: ', hoursDiff);
                //if((hoursDiff + 30) > 0){
                  const time2 = resp2;
                  const initialDate2 = MomentHelpers.formatHelper(time2, lang);
                  const initialDay2 = t(time2.format("dddd"));
                  const finalTime2 = time2.clone().add(30, "minutes").format("hh:mm A");
                  //time
                  num = (numeroAulas * 30);
                  hours = (num / 60);
                  rhours = Math.floor(hours);
                  minutes = (hours - rhours) * 60;
                  rminutes = Math.round(minutes);
                  if(rminutes === 0){
                    rminutes = `• (${rhours}h)`
                  }else if(rhours === 0){
                    rminutes = `• (${rminutes}m)`;
                  }else{
                    rminutes = `• (${rhours}h:${rminutes}m)`;
                  }
                  const total = rminutes;
                  const schedule2 = `${initialDate} • ${initialDay} • ${startTime} - ${finalTime2} ${total}`;
                  el.timeTotal = schedule2;
                  array.push(el);
                //}
              }else{
                //gravar inicio da aula
                if(cont === 1){
                  startTime = initialTime.toString();
                }
              }
            }
          }
        }
      }else{
        const atualDate2 = serv.getLocalTimeFromUtcAdd();
        const formatDateAtual = atualDate2.format("YYYY-MM-DDTHH:mm:ss.sss");
        const startT = moment(formatDateAtual, "YYYY-MM-DDTHH:mm:ss.sss");
        const endT = moment(resp, "YYYY-MM-DDTHH:mm:ss.sss");
        const hoursDiff = endT.diff(startT, 'minutes');
        console.log('listCalendar => Sem group => hoursDiff => ', hoursDiff);
        //if((hoursDiff + 30) > 0){
          saveSchedule = schedule;
          el.timeTotal = schedule;
          array.push(el);
        //}
      }
    })
  }
  array.sort((a,b) => a.sequentialScheduleClassesCount < b.sequentialScheduleClassesCount ? 1 : -1).sort((a,b) => a.originalScheduledDateTimeUTC > b.originalScheduledDateTimeUTC ? 1 : -1);
  const listSchedules = array;
  
  return (
    <Fragment>
      <div className="listBox">
        { listSchedules.length > 0 
          ? listSchedules.map( schedule => (
            <ListCalendarSchedule key={schedule.id} schedule={schedule} isCalendar={true} /> 
          ))
          : <Placeholder pageName='users' textMsg={t('NO_RESULTS')} />
        }
      </div>
    </Fragment>
  );
};

export default translate("translations")(ListCalendar);

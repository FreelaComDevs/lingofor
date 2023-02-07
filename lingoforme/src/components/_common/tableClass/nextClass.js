import React, { Component, Fragment } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import moment from 'moment';
import Services from '../../_api/Services';
import PlaceholderText from '../../_common/placeholder/placeholderText';
import ListCalendarSchedule from '../../Calendar/ListCalendarSchedule';
import timezone from 'moment-timezone';
import {MomentHelpers} from '../../_common/momentLocalDate/momentLocalDate';
import {Scroll, Legend} from './styles'

const NextClass = ({ t, single, user: { nextClasses } }) => {
  const lang = localStorage.getItem("i18nextLng");
  let saveCod = [];
  let saveSchedule = '';
  let startTime = '';
  let array = [];

  let num;
  let hours;
  let rhours;
  let minutes;
  let rminutes;
  let count = 0;

  const serv = new Services();
  
  if(nextClasses?.length > 0){
    console.log('nextClasses: ', nextClasses);
    nextClasses?.map((el, index) =>{
      if(count < 10){
        const user = serv.getUserFromToken();
        const resp = timezone.tz(el.originalScheduledDateTimeUTC, 'UTC').clone().tz(user?.timezone);
        const time = resp;
        const initialDate = MomentHelpers.formatHelper(time, lang);
        const initialDay = t(time.format("dddd"));
        const initialTime = time.format("hh:mm A");
        const finalTime = time.clone().add(30, "minutes").format("hh:mm A");
        const schedule = `${initialDate} • ${initialDay} • ${initialTime} - ${finalTime}`;
        if(el.sequentialSchedule == true){
          let numeroAulas = el?.sequentialScheduleClassesCount;
          let cont = 0;
          if(saveCod.includes(el?.allocationScheduleId) == false){          
            saveCod.push(el?.allocationScheduleId);
            for(let a = 0; a < nextClasses?.length; a++){
              if(nextClasses[a]?.allocationScheduleId == el?.allocationScheduleId){
                cont++;
                if(cont == numeroAulas){
                  //gravar aula no array
                  const user2 = serv.getUserFromToken();
                  const resp2 = timezone.tz(nextClasses[a]?.originalScheduledDateTimeUTC, 'UTC').clone().tz(user2.timezone);
                  const atualDate2 = serv.getLocalTimeFromUtcAdd();
                  const formatDateAtual = atualDate2.format("YYYY-MM-DDTHH:mm:ss.sss");
                  const startT = moment(formatDateAtual, "YYYY-MM-DDTHH:mm:ss.sss");
                  const endT = moment(resp2, "YYYY-MM-DDTHH:mm:ss.sss");
                  const hoursDiff = endT.diff(startT, 'minutes');
                  console.log('NextClass => hoursDiff :: ', hoursDiff);
                  if((hoursDiff + 30) > 0){
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
                    if(rminutes == 0){
                      rminutes = `• (${rhours}h)`
                    }else if(rhours == 0){
                      rminutes = `• (${rminutes}m)`;
                    }else{
                      rminutes = `• (${rhours}h:${rminutes}m)`;
                    }
                    const total = rminutes;
                    const schedule2 = `${initialDate} • ${initialDay} • ${startTime} - ${finalTime2} ${total}`;
                    el.timeTotal = schedule2;
                    count++;
                    array.push(el);
                  }
                }else{
                  //gravar inicio da aula
                  if(cont == 1){
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
          console.log('NextClass => hoursDiff :: ', hoursDiff);
          console.log('NextClass => startT :: ', startT);
          console.log('NextClass => endT :: ', endT);
          //initialDay
          console.log('NextClass => initialDate :: ', initialDate);
          console.log('NextClass => atualDate2 :: ', MomentHelpers.formatHelper(atualDate2, lang));
          if((hoursDiff + 30) > 0){
            saveSchedule = schedule;
            el.timeTotal = schedule;
            count++;
            array.push(el);
          }
        }
      }
    });
  }
  array.sort((a,b) => a?.sequentialScheduleClassesCount < b?.sequentialScheduleClassesCount ? 1 : -1).sort((a,b) => a?.originalScheduledDateTimeUTC > b?.originalScheduledDateTimeUTC ? 1 : -1);
  const schedules = array;
  const date = moment(nextClasses[0]?.scheduledDate).format('DD/MM')

  // const schedules = nextClasses.length > 0 
  //   ? single ? [nextClasses[0]] : nextClasses
  //   : []
  return (
    single ?
    <></>
    :
    <Fragment>
      
        <h2 className="titleNextClass">
          <div>
              {t("BTN_UPCOMING_CLASS")}
          </div>
        </h2>
        <br/>
          <strong className="dateNexyClass">
            {date}
          </strong>
          <hr className="separator"></hr>

      
      
      <Scroll>
        <div>
          { schedules?.length > 0 
            ? schedules?.map( schedule => <ListCalendarSchedule key={JSON.stringify(schedule)} schedule={schedule} /> )  
            : <PlaceholderText />
          }
        </div>
      </Scroll>
      <Legend>
          <div className="scheduledLegend">
            <div className="container"></div>
            <h5>Agendadas</h5>
          </div>
          <div className="InprogressLegend">
            <div className="container"></div>
            <h5>em andamento</h5>
          </div>
          <div className="noShowLegend">
            <div className="container"></div>
            <h5> no show</h5>
          </div>
          <div className="cancelLegend">
            <div className="container"></div>
            <h5>cancelado out of limit</h5>
          </div>
          <div className="performedLegend">
            <div className="container"></div>
            <h5>realizadas</h5>
          </div>
      </Legend>
    </Fragment>
  )
}

const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(translate('translations')(NextClass))

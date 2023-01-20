import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { translate } from "react-i18next";
import Services from "../../_api/Services";
import { FlagIcon } from "react-flag-kit";
import PlaceholderText from "../../_common/placeholder/placeholderText";
import {MomentHelpers} from '../../_common/momentLocalDate/momentLocalDate';
import timezone from 'moment-timezone';
import { RestaurantSharp } from "@material-ui/icons";

class WithoutTeacher extends Component {
  serv = new Services();
  state = this.initialState;

  get initialState() {
    return { classesWithoutTeacher: [] };
  }

  componentDidMount() {
    this.getClassWithoutTeacher(this.props.isDemoClass ? "hometop5demo" : "hometop5");
  }

  getClassWithoutTeacher = async type => {    
    //pegando as aulas de 4 hrs atras
    const atualDate = this.serv.getLocalTimeFromUtcSubtract().format("YYYY-MM-DDTHH:mm:ss.sss")
    console.log('===> getClassWithoutTeacher :: ', atualDate)
    const pageNumber = "?pageNumber=1"
    const pageSize = "&pageSize=30"
    const orderBy = "&orderByAsc=originalScheduledDateTimeUTC"
    const startAt = `&startAt=${atualDate}`
    const classType = `&type=${type}`
    const hasTeacher = "&hasTeacher=false"
    this.serv.get(`classSchedules${pageNumber}${pageSize}${startAt}${orderBy}${classType}${hasTeacher}`)
      .then(({ result: { items } }) => {       
        let saveCod = [];
        let startTime = '';
        let array = [];
        let num;
        let hours;
        let rhours;
        let minutes;
        let rminutes;
        let count = 0;
        const lang = localStorage.getItem("i18nextLng");
        console.log('WT ==> items => ', items);
        items.map((el, index) => {
          //console.log('without count >> ', count);
          if(count < 10){
            const user = this.serv.getUserFromToken();
            const resp = timezone.tz(el.originalScheduledDateTimeUTC, 'UTC').clone().tz(user.timezone);
            
            const time = resp;
            const initialDate = MomentHelpers.formatHelper(time, lang);
            //t(moment(scheduledDate).format("dddd").toUpperCase());
            const initialDay = time.format("dddd");
            const initialTime = time.format("hh:mm A");
            const finalTime = time.clone().add(30, "minutes").format("hh:mm A");
            const schedule = `${initialDate} • ${initialDay} • ${initialTime} - ${finalTime}`;
            if(el.sequentialSchedule == true){
              //agrupamento das aulas sequenciais
              let numeroAulas = el.sequentialScheduleClassesCount;
              let cont = 0;
              if(saveCod.includes(el.allocationScheduleId) == false){
                saveCod.push(el.allocationScheduleId);
                for(let a = 0; a < items.length; a++){
                  //console.log('without valor: ', a);
                  if(items[a].allocationScheduleId == el.allocationScheduleId){
                    cont++;
                    if(cont == numeroAulas){
                      //gravar aula no array                
                      const user2 = this.serv.getUserFromToken();
                      const resp2 = timezone.tz(items[a].originalScheduledDateTimeUTC, 'UTC').clone().tz(user2.timezone);
                      const atualDate2 = this.serv.getLocalTimeFromUtcAdd();
                      const formatDateAtual = atualDate2.format("YYYY-MM-DDTHH:mm:ss.sss");
                      const startT = moment(formatDateAtual, "YYYY-MM-DDTHH:mm:ss.sss");
                      const endT = moment(resp2, "YYYY-MM-DDTHH:mm:ss.sss");
                      const hoursDiff = endT.diff(startT, 'minutes');
                      console.log('WT ==> AGRUP => hoursDiff => ', hoursDiff);
                      if((hoursDiff + 30) > 0){
                        const time2 = resp2;
                        const initialDate2 = MomentHelpers.formatHelper(time2, this.props.i18n.language);
                        const initialDay2 = time2.format("dddd");
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
                        console.log('without SALVAR AGRUPAMENTO: ', index);
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
              const atualDate2 = this.serv.getLocalTimeFromUtcAdd();
              const formatDateAtual = atualDate2.format("YYYY-MM-DDTHH:mm:ss.sss");
              const startT = moment(formatDateAtual, "YYYY-MM-DDTHH:mm:ss.sss");
              const endT = moment(resp, "YYYY-MM-DDTHH:mm:ss.sss");
              const hoursDiff = endT.diff(startT, 'minutes');
              console.log('WT ==> SEM AGRUP => hoursDiff => ', hoursDiff)
              if((hoursDiff + 30) > 0){
                count++;
                el.timeTotal = schedule;
                console.log('without SALVAR: ', index);
                array.push(el);
              }
            }
          }
          
        })
        
        array.sort((a,b) => a.sequentialScheduleClassesCount < b.sequentialScheduleClassesCount ? 1 : -1).sort((a,b) => a.originalScheduledDateTimeUTC > b.originalScheduledDateTimeUTC ? 1 : -1);
        this.setState({ classesWithoutTeacher: array })
      });
  };

  render() {
    const { 
      state: { classesWithoutTeacher }, 
      props: { t } 
    } = this;

    return (
      <div className="classesWithoutTeacherBox">
        { !classesWithoutTeacher.length ? <PlaceholderText/> : (
          classesWithoutTeacher.map(classWithoutTeacher => {
            const {
              id,
              type,
              student = {},
              createdAt,
              scheduledDate,
              scheduledStartTime,
              scheduledEndTime,
              lingoLanguage,
              timeTotal
            } = classWithoutTeacher;
            const container = classWithoutTeacher.container || {};
            let studentLevel = null
            if (student && student.studentLevelGrades) {
              const levelFound = student.studentLevelGrades.find(({ lingoLanguageId }) => lingoLanguage.id === lingoLanguageId)
              studentLevel = levelFound ? levelFound.level.level : null
            }
            studentLevel = studentLevel || container.levelByLingo;
            let studentName = (student && student.user && student.user.name) || "";
            studentName = studentName || container.studentName;
            const date = t(moment(scheduledDate).format("dddd").toUpperCase());
            const startTime = moment(`${scheduledDate} ${scheduledStartTime}`).format("h:mm a");
            const endTime = moment(`${scheduledDate} ${scheduledEndTime}`).format("h:mm a");
            const _scheduledDate = MomentHelpers.formatHelper(scheduledDate, this.props.i18n.language);

            return (
                <div key={JSON.stringify(classWithoutTeacher)} className="new-box classWithoutTeacherBox">
                  <p className="classWithoutTeacherDate">
                    {/* {_scheduledDate} • {date} • {startTime} - {endTime} */}
                    {timeTotal}
                  </p>
                  <div className="classWithoutTeacherInfoBox">
                    <FlagIcon code={lingoLanguage.flag} size={18} />
                    <div className="classWithoutTeacherInfo">
                      <p>{lingoLanguage.language.name}</p>
                      <p>{t("CARD_CLASS_STUDENT")}: {studentName} • {t("CARD_PLAN_LEVEL")}: {studentLevel}</p>
                      <p>{t("DATE_CREATED")}: {moment(createdAt).format("DD/MM/YYYY")}</p>
                    </div>
                    <div className="classWithoutTeacherButtonBox">
                      <button onClick={() => this.props.history.push(`/class-details/${id}`)}>
                        View <i className="fa fa-angle-right"/>
                      </button>
                      {type === "first" && <p>{t("FIRST_CLASS")}</p>}
                      {type === "trial" && <p>{t("TRIAL_CLASS")}</p>}
                    </div>
                  </div>
                </div>
            );
          })
        )}
      </div>
    );
  }
}

export default withRouter(translate("translations")(WithoutTeacher));

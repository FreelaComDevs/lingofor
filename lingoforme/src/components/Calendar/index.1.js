import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import ButtonDrive from '../_common/button/ButtonDrive'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import Services from '../_api/Services'
import NextClass from '../_common/tableClass/nextClass'
import Loading from 'react-fullscreen-loading'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import Schedule from '../../images/icons/icon_schedule_header.svg'
import cancelImg from "../../images/schedule/img_class-scheduled_cancel.png";

import FullCalendar from './FullCalendar'

import { BigCalendar, ListWeek, Buttons } from './styles'
import { FilterUser } from '../ClassRating/styles'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FlagIcon } from 'react-flag-kit'

const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.service = new Services()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.user = this.service.getProfile()

        if (this.user.role === 'teacher' && this.props.match.params.id) {
            this.scheduleId = this.props.match.params.id
        }
        
        let startAt = moment().startOf('month')
        let endAt = moment().endOf('month')
        if (this.user.role !== 'student' && this.user.role !== 'teacher') {
            startAt = moment()
            endAt = moment()
        }
        let filter = {
            pageNumber: 1,
            pageSize: 5000,
            startAt,
            endAt,
            student: '',
            teacher: '',
            lingoLanguageId: 0,
            situation: '',
            planId: 0,
            type: '',
            noShow: false
        }

        const token = JSON.parse(localStorage.getItem('@lingo')).token;
        const payload = token.split('.')[1];
        const base64 = payload.replace('-', '+').replace('_', '/');
        const u = JSON.parse(window.atob(base64));        

        this.state = {
            events: [],
            lingos: [],
            plans: [],
            classList: [],
            eventsListView: [],
            dayEvents: [],
            monthEvents: [],
            filtered: false,
            filter,
            openalert: false,
            tagDays: ['WEEK_SUNDAY', 'WEEK_MONDAY', 'WEEK_TUESDAY', 'WEEK_WEDNESDAY', 'WEEK_THURSDAY', 'WEEK_FRIDAY', 'WEEK_SATURDAY'],
            expanded: false,
            loading: false,
            cancelClass: false,
            sequentialScheduleId: '',
            reasonForcancellation: '',
            recurrentScheduleId: '',
            teacherClassesToAccept: undefined,
            showPopup: false,
            positionLeft: 200,
            positionTop: 200,
            currentDate: moment(),
            timezone: 'local', //u.timezone,
            viewName: 'listDay'
        }

        this.handleCancelClass = this.handleCancelClass.bind(this)
        this.submitCancel = this.submitCancel.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
        this.applyFilters = this.applyFilters.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleFilterPanel = this.handleFilterPanel.bind(this)
        this.handleAcceptClass = this.handleAcceptClass.bind(this)
        this.eventClick = this.eventClick.bind(this)
        this.eventRender = this.eventRender.bind(this)
        this.eventAfterAllRender = this.eventAfterAllRender.bind(this)
    }

    componentDidMount() {
        let localData = JSON.parse(localStorage.getItem ('@lingo'));

        this.setState({
            loading:true,
            roleNow: localData.role,roleNow: localData.role
        }, () => this.callApi())
    }

    closeAlert(e) {
        this.setState({ openalert: false, showPopup: false })
    }

    callApi(fullLoad = true, filtered = false) {
        let cleanFilter = { ...this.state.filter }
        Object.keys(cleanFilter).forEach((key) => (
            cleanFilter[key] === undefined || cleanFilter[key] === '' || cleanFilter[key] === 0
        ) && delete cleanFilter[key]);
        let classEvents = []
        let requestFilters = `?pageSize=${cleanFilter.pageSize}&pageNumber=${cleanFilter.pageNumber}`
        if (this.user.role !== 'student' && this.user.role !== 'teacher') {
            requestFilters += (cleanFilter.startAt) ? `&startAt=${cleanFilter.startAt.format('YYYY-MM-DDT00:00:00.000')}` : ''
            requestFilters += (cleanFilter.endAt) ? `&endAt=${cleanFilter.endAt.format('YYYY-MM-DDT23:59:59.999')}` : ''
            requestFilters += (cleanFilter.student) ? `&student=${ encodeURIComponent(cleanFilter.student)}` : ''
            requestFilters += (cleanFilter.teacher) ? `&teacher=${ encodeURIComponent(cleanFilter.teacher)}` : ''
            requestFilters += (cleanFilter.lingoLanguageId) ? `&lingoLanguageId=${cleanFilter.lingoLanguageId}` : ''
            requestFilters += (cleanFilter.type) ? `&type=${cleanFilter.type}` : ''
            requestFilters += (cleanFilter.situation) ? `&status=${cleanFilter.situation}` : ''
            requestFilters += (cleanFilter.planId) ? `&planId=${cleanFilter.planId}` : ''
            requestFilters += (cleanFilter.noShow) ? '&status=noShow' : ''
        }

        requestFilters += '&orderBy=originalScheduledDateTimeUTC'

        this.service.get(`classSchedules` + requestFilters).then(res => {
              const classList = res.result.items

              const events = classList.map(item => {
                  return {
                      id: item.id,
                      title: item.lingoLanguage.language.name,
                      start: moment(item.scheduledStartDateTime),
                      end: moment(item.scheduledEndDateTime),
                      language: item.lingoLanguage.language.name,
                      url: '/class-details/' + item.id,
                      textColor: '#5A6C96',
                      status: item.status
                  }
              })

              if (filtered) {
                  this.setState({
                      eventsListView: classList,
                      loading: false
                  })
                  return
              }

              const days = new Set();
              events.map(item => days.add(item.start.format('YYYY-MM-DD')))
              const eventsByDay = {};
              days.forEach(item => eventsByDay[item] = []);
              events.map(item => {
                  const dt = item.start.format('YYYY-MM-DD');
                  eventsByDay[dt].push({
                      start: dt,
                      language: item.language,
                      status: item.status
                  });
              });

              const consolided = [];
              for (let key in eventsByDay) {
                  const item = eventsByDay[key];
                  const languages = new Set();
                  item.forEach(evt => {
                      languages.add(evt.language);
                  });
                  let language = 'All languages'
                  if (languages.size === 1) {
                      const values = languages.values()
                      const first = values.next()
                      language = first.value
                  }
                  consolided.push({
                      date: key,
                      totalClasses: item.length,
                      title: `${item.length} classes`,
                      language,
                      status: item.status
                  });
              }
              this.setState({ consolidedEvents: consolided });


              if (this.user.role === 'student' || this.user.role === 'teacher') {

                    for (var index in res.result.items) {
                        let item = res.result.items[index]
                        classEvents.push({
                            id: item.id,
                            title: item.lingoLanguage.language.name,
                            start: moment(item.scheduledStartDateTime),
                            end: moment(item.scheduledEndDateTime),
                            language: item.lingoLanguage.language.name,
                            url: '/class-details/' + item.id,
                            textColor: '#5A6C96',
                            status: item.status
                        })
                    }

                    if (this.user.role === 'teacher' && this.scheduleId) {
                        this.service.get(`classSchedules/teacher/${this.user.teacherId}?id=` + this.scheduleId)
                            .then(res => {
                                if (res.result.items.length === 1) {
                                    const item = res.result.items[0]
                                    classEvents.push({
                                        id: item.id,
                                        title: item.lingoLanguage.language.name,
                                        start: moment(item.scheduledStartDateTime),
                                        end: moment(item.scheduledEndDateTime),
                                        language: item.lingoLanguage.language.name,
                                        canCancelorAccept: true,
                                        backgroundColor: '#004FFF',
                                        textColor: '#ffffff',
                                        status: item.status
                                    })
                                    this.setState({
                                        currentDate: moment(item.scheduledStartDateTime),
                                        teacherClassesToAccept: item,
                                        classList,
                                        events: classEvents,
                                        loading: false,
                                        viewName: 'month'
                                    })
                                } else {
                                    this.setState({
                                        classList,
                                        events: classEvents,
                                        loading: false
                                    })
                                }
                            })
                            .catch(err => {
                                this.setState({
                                    classList: [],
                                    events: [],
                                    loading: false
                                })
                                console.log('Failed to get classes.', err)
                            })
                    } else {
                        this.setState({
                            classList,
                            events: classEvents,
                            eventsListView: classList,
                            loading: false
                        })
                    }

                } else {

                    Promise.all([
                        new Promise((resolve, reject) => {
                            this.service.get(`classSchedules/dailyClassSchedules` + requestFilters)
                                .then(res => {
                                    let events = []
                                    let pivotDate = moment(cleanFilter.startAt)
                                    while (pivotDate.isSameOrBefore(cleanFilter.endAt, 'day')) {
                                        if (pivotDate.isSameOrAfter(cleanFilter.startAt, 'day') && pivotDate.isSameOrBefore(cleanFilter.endAt, 'day')) {
                                            let hasClass = res.result.items.filter(scheduleClass => 
                                                pivotDate.isSame(moment(scheduleClass.scheduledDate), 'day')
                                            )
                                            if (hasClass.length > 0) {
                                                let item = hasClass[0]

                                                let language = 'All languages'
                                                try {
                                                    const languages = new Set();
                                                    item.forEach(evt => {
                                                        languages.add(evt.language);
                                                    });
                                                    if (languages.size === 1) {
                                                        const values = languages.values()
                                                        const first = values.next()
                                                        language = first.value
                                                    }
                                                } catch (e) {
                                                    console.log('The API call does not have language info.')
                                                }
                                                let date = moment(item.scheduledDate).set('hour', 12)
                                                events.push({
                                                    title: item.classCount + ' classes',
                                                    totalClass: item.classCount,
                                                    language,
                                                    start: date,
                                                    end: date.add(30, 'minutes')
                                                })
                                            } else {
                                                events.push({
                                                    title: 'No classes',
                                                    totalClass: 0,
                                                    start: moment(pivotDate).set('hour', 12),
                                                    end: moment(pivotDate).set('hour', 12).add(30, 'minutes')
                                                })
                                            }
                                        }
                                        pivotDate.add(1, 'days')
                                    }
                                    this.setState({ monthEvents: events }, () => resolve(true))
                                })
                                .catch(err => {
                                    reject(err)
                                })
                            }),
                            new Promise((resolve, reject) => {
                                this.service.get(`classSchedules/dailyTimeClassSchedules` + requestFilters)
                                    .then(res => {
                                        let events = []
                                        for (var index in res.result.items) {
                                            let item = res.result.items[index]
                                            events.push({
                                                title: item.classCount + ' classes',
                                                totalClass: item.classCount,
                                                start: moment(item.scheduledStartDateTime),
                                                end: moment(item.scheduledEndDateTime)
                                            })
                                        }
                                        this.setState({ dayEvents: events }, () => resolve(true))
                                    })
                                    .catch(err => {
                                        reject(err)
                                    })
                            })
                    ])
                    .then(() => {
                        this.setState({
                            events: (this.state.viewName === 'month' ? this.state.monthEvents : this.state.dayEvents),
                            eventsListView: classList,
                            classList,
                            loading: false
                        })
                    })
                    .catch(err => {
                        console.log('The promise chain raises an error:', err)
                        this.setState({
                            dayEvents: [],
                            monthEvents: [],
                            classList: [],
                            events: [],
                            loading: false
                        })
                    })
                }

            }).catch(err => {
                console.log('err getClasses ', err.result)
                this.setState({ classList: [], events: [], loading: false })
            })


        if (fullLoad) {
            this.service.get('lingolanguages/getall').then(res => {
                this.setState({
                    lingos: res.result.items
                })
            })
            .catch(err => console.log('err lingolanguages ', err))

            this.service.get('plans?skip=0&take=100&active=true').then(res => {
                this.setState({
                    plans: res.result.items
                })
            })
            .catch(err => console.log('err plans ', err))
        }
    }

    getTeacherInfo = item => {
        if (item.student || item.studentId) {
            return
        }

        const { t } = this.props
        const hasTeacher = item.teacher !== null && item.teacher !== undefined
        const Content = hasTeacher ?
            <div>{item.teacher.user.name}</div> :
            <div style={{ color: 'var(--color-red)' }}>{t('NOT_FOUND')}</div>

        return (
            <h4>{t('CARD_CLASS_TEACHER')} : {Content}</h4>
        )
    }


    applyFilters() {
        this.setState({
            filtered: true,
            loading: true
        }, () => this.callApi(false, true))
    }

    clearFilters() {
        let startAt = moment().startOf('month')
        let endAt = moment().endOf('month')
        if (this.user.role !== 'student' && this.user.role !== 'teacher') {
            startAt = moment()
            endAt = moment()
        }

        this.setState({
            filter: {
                pageNumber: 1,
                pageSize: 300,
                startAt: startAt,
                endAt: endAt,
                student: '',
                teacher: '',
                lingoLanguageId: 0,
                situation: undefined,
                planId: 0,
                type: '',
                noShow: false
            },
            loading: true,
            currentDate: moment()
        }, () => this.callApi(false))
    }

    handleChange (e) {
        const target = e.target
        const name = target.name
        let value = target.type === 'checkbox' ? target.checked : target.value
        value = value == '0' ? undefined : value

        if (name === 'startAt' || name === 'endAt') {
            value = moment(value)
        }

        if (name === 'noShow') {
            value = !this.state.filter.noShow
        }

        if (name === 'reasonForcancellation') {
            this.setState({ reasonForcancellation: value })
        } else {
            let filters = this.state.filter
            filters[name] = value
            this.setState({filter: filters})
        }
    }

    handleFilterPanel (e) {
        e.preventDefault()
        this.setState({
            expanded: !this.state.expanded,
        })
    }

    handleCancelClass(e) {
        for (var item in this.state.classList) {
            if (this.state.classList[item].recurrentSchedule === true && this.state.classList[item].id === parseInt(e.target.value)) {

                if (this.user.role === 'student' || this.user.role === 'teacher')
                    this.setState({
                        cancelClass: true,
                        recurrentScheduleId: this.state.classList[item].recurrentScheduleId,
                        openalert: true,
                        alertTitle: '<div align="center" className="container"><h3><strong>' + this.t('Cancel class') + '<strong></h3></div>'
                    })

                if (this.user.role !== 'student' && this.user.role !== 'teacher')
                    this.setState({
                        cancelClass: true,
                        recurrentScheduleId: this.state.classList[item].recurrentScheduleId,
                        openalert: true,
                        alertTitle: '<div align="center" className="container"><h3><strong>' + this.t('Cancel class') + '<strong></h3></div>'
                    })

            } else if (this.state.classList[item].id == parseInt(e.target.value)) {
                if (this.user.role === 'student' || this.user.role === 'teacher') {
                    this.setState({
                        cancelClass: true,
                        sequentialScheduleId: this.state.classList[item].sequentialScheduleId,
                        openalert: true,
                        alertTitle: '<div align="center" className="container"><h3><strong>' + this.t('Cancel class') + '<strong></h3></div>'
                    })
                }

                if (this.user.role !== 'student' && this.user.role !== 'teacher') {
                    this.setState({
                        cancelClass: true,
                        sequentialScheduleId: this.state.classList[item].sequentialScheduleId,
                        openalert: true,
                        alertTitle: '<div align="center" className="container"><h3><strong>' + this.t('Cancel class') + '<strong></h3></div>'
                    })
                }
            }
        }
    }

    submitCancel() {
        var postCancelObject;
        if (this.state.recurrentScheduleId !== '') {
            postCancelObject = {
                recurrentScheduleId: this.state.recurrentScheduleId,
                reason: this.state.reasonForcancellation,
                reschedule: true
            }
            let urlCancelClass = 'classSchedules/cancelClassSchedule';

            this.service.ApiPosts(urlCancelClass, postCancelObject).then(res => {
                this.setState({
                    cancelClass: false,
                    openalert: false,
                    recurrentScheduleId: '',
                    reason: ''
                }, () => this.callApi(false))
            }).catch(err => {
                this.setState({
                    cancelClass: false,
                    alertTitle: this.t('ERROR_MESSAGE'),
                    alertMsg: this.t('ERROR_DIALOG')
                })
            })
        } else if (this.state.sequentialScheduleId !== '') {
            postCancelObject = {
                sequentialScheduleId: this.state.sequentialScheduleId,
                reason: this.state.reasonForcancellation
            }
            let urlCancelClass = 'classSchedules/cancelClassSchedule';

            this.service.ApiPosts(urlCancelClass, postCancelObject).then(res => {
                this.setState({
                    cancelClass: false,
                    openalert: false,
                    sequentialScheduleId: this.state.recurrentScheduleId,
                    reason: this.state.reasonForcancellation
                }, () => this.callApi(false))
            }).catch(err => {
                this.setState({
                    cancelClass: false,
                    alertTitle: this.t('ERROR_MESSAGE'),
                    alertMsg: this.t('ERROR_DIALOG')
                })
            })
        }

        this.setState({ openalert: false })
    }

    handleAcceptClass(e) {
        let urlRequest = 'classSchedules/teacher/' + this.user.teacherId
        let postAcceptObject = ''

        if (this.state.teacherClassesToAccept) {
            if (this.state.teacherClassesToAccept.allocationSchedule === 'random') {
                urlRequest = urlRequest + '/acceptSequentialSchedule'
                postAcceptObject = {
                    "teacherId": parseInt(this.user.teacherId),
                    "sequentialScheduleId": this.state.teacherClassesToAccept.sequentialScheduleId
                }

            } else if (this.state.teacherClassesToAccept.allocationSchedule === 'fixed') {
                urlRequest = urlRequest + '/acceptAllocationSchedule'
                postAcceptObject = {
                    "teacherId": parseInt(this.user.teacherId),
                    "allocationScheduleId": this.state.teacherClassesToAccept.allocationScheduleId
                }
            }
            this.service.ApiPosts(urlRequest, postAcceptObject).then(res => {
                this.setState({ teacherClassesToAccept: undefined }, () => this.callApi(false))
            }).catch(err => {
                this.setState({
                    cancelClass: false,
                    openalert: true,
                    alertTitle: this.t('ERROR_MESSAGE'),
                    alertMsg: this.t('ERROR_DIALOG')

                })
            })
        }
    }

    eventClick(calEvent, jsEvent, view, resourceObj) {
        if (this.user.role === 'teacher' && calEvent.canCancelorAccept) {
            jsEvent.preventDefault()
            this.setState({
                showPopup: true,
                positionLeft: jsEvent.clientX,
                positionTop: jsEvent.clientY
            })
        } else {
            if (view.type !== 'listDay') {
                jsEvent.preventDefault()
                this.eventClicked = true
                const currentDate = calEvent.start
                let events = this.state.events
                if (events && events.length > 0) {
                    events = this.state.events.filter(item => {
                        const f = 'YYYY-MM-DD'
                        return item.start.format(f) === currentDate.format(f)
                    })
                }
                this.setState({
                    viewName: 'listDay',
                    currentDate,
                    events
                })
                window.scrollTo(0, 0);
            }
        }
    }

    eventRender(event, element, view) {
        element.find(".fc-title").remove()
        element.find(".fc-time").remove()
        let new_event = ''

        if (this.user.role === 'student' || this.user.role === 'teacher') {
            if (view.type === 'month') {
                new_event =
                    `<span style="font-size:10px;color:rgb(90, 108, 150)">
                        ${event.title}
                     </span><br/>
                     <span style="font-size:12px;color:rgb(90, 108, 150)">
                        ${event.language}
                     </span>`

            } else if (view.type === 'agendaWeek') {
                new_event =
                    '<div><span style="font-size:10px">' +
                    event.start.format("hh:mmA") + '-' +
                    event.end.format("hh:mmA") + '</span><br/>' +
                    '<span style="font-size:12px">' + (event.language || 'All languages') + '</span></div><div style="float:right;margin-top:-28px;">' +
                    '<button ' +
                    `style="
                        width: 12px;
                        height: 22px;
                        background: transparent;
                        border: 1px solid #787780;
                        text-transform: capitalize;
                        font-family: 'Quicksand',sans-serif;
                        color: #787780;
                        font-size: 11px;
                        border-radius: 26px;
                        opacity: 1; ` +
                    '"> > </button></div>'
            } else if (view.type === 'agendaDay') {
                new_event =
                    '<div><span style="font-size:10px">' +
                    event.start.format("hh:mmA") + ' - ' +
                    event.end.format("hh:mmA") + '</span><br/>' +
                    '<span style="font-size:12px">' + (event.language || 'All languages') + '</span></div><div style="float:right;margin-top:-28px;">' +
                    '<Link to={"/class-details/"' + event.id + '}>' +
                    '<button ' +
                    `style="
                        width: 86px;
                        height: 22px;
                        background: transparent;
                        border: 1px solid #787780;
                        text-transform: capitalize;
                        font-family: 'Quicksand',sans-serif;
                        color: #787780;
                        font-size: 11px;
                        border-radius: 26px;
                        opacity: 1; ` +
                    '">' + this.t('BTN_VIEW') + ' > </button></Link></div>'
            }

            if (event.status === 'canceled') {
                const color = 'red'
                const a = element.find('.fc-content').parent()
                a.css({ "border-left": `5px solid ${color}` })
            }
            element.find(".fc-content").append(new_event)
        } else {
            if (view.type !== 'listDay') {
                let color = '#004FFF' //blue
                if (event.totalClass === 0) {
                    color = '#B2B2B7' //gris
                }

                new_event =
                    `<span style="font-size:12px;color:${color}">
                        ${event.title}
                    </span>
                    <br/>
                    <span style="font-size:10px;color:${color}">
                        ${event.language || 'All languages'}
                    </span>`

                if (color == '#B2B2B7') {
                    element.find(".fc-content").parent().css({ "border-left": "5px solid #B2B2B7" })
                }
                element.find(".fc-content").append(new_event)
            }
        }
    }

    eventAfterAllRender(view) {
      const isListDay = view.name === 'listDay';
      const newState = { viewName: view.name };
      if (isListDay) {
          newState.currentDate = view.start;
      }
      this.setState(newState)
      const container = document.querySelector('.fc-view-container');
      const left = document.querySelector('.fc-left');
      const center = document.querySelector('.fc-center');
      const isNotStudentOrTeacher = ['student', 'teacher'].indexOf(this.user.role) < 0;
      const listDayResult = document.querySelector('#listDay');
 
      container.style.display = isListDay ? 'none' : 'block';
      listDayResult.style.display = isListDay ? 'block' : 'none';
      left.style.display = isListDay && isNotStudentOrTeacher ? 'none' : 'block';
      center.style.display = isListDay && isNotStudentOrTeacher ? 'none' : 'block';

      if (isListDay) {
          let currentDate = moment();
          if (this.eventClicked) {
              this.eventClicked = false
              currentDate = view.start.clone();
              const events = {...this.state.eventsListView}
              this.setState({ currentDate, events, viewName: 'listDay' });
          } else {
              let selectedDate = view.start.clone();
              if (! selectedDate.isSame(currentDate, 'day')) {
                  let days = moment.duration(currentDate.diff(selectedDate)).asDays();
                  days = Math.ceil(Math.abs(days));
                  if (selectedDate < currentDate) {
                      currentDate = selectedDate.clone().subtract(days, 'week')
                  } else {
                      currentDate = selectedDate.clone().add(days, 'week')
                  }
              }
              this.setState({ currentDate });
          }

          const lastSunday = currentDate.clone().isoWeekday(0);
          const nextSaturday = currentDate.clone().isoWeekday(6);
          const title = `${lastSunday.format('MMM DD')} – ${nextSaturday.format('MMM DD')} • ${lastSunday.format('YYYY')}`
          center.innerHTML = `<h2>${title}</h2>`;
      }
    }

    render() {
        const { t } = this
        const { classList, eventsListView, currentDate, roleNow} = this.state
        const isNotStudentOrTeacher = this.user.role !== 'student' && this.user.role !== 'teacher';
        const isNotStudent = this.user.role !== 'student';
        const listDayResult = eventsListView.filter(scheduleClass => {
            if (isNotStudentOrTeacher) {
              return true;
            }
            return currentDate.isSame(moment(scheduleClass.scheduledDate), 'week')
        });

        return (<div className="view">
            <SideMenu/>
            <section>
                <Header/>

                {this.state.loading && <Loading loading={true} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>}

                {this.state.cancelClass == true &&
                    <div>
                        <Dialog
                            open={this.state.openalert}
                            onClose={this.closeAlert}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            className="boxModal"
                        >
                            <DialogTitle id="pass-dialog-title" className="titleCancelClass">{t('CANCEL_CLASS')}</DialogTitle>
                            <DialogContent >
                                <div id="pass-dialog-description" className="boxModal">
                                    <img src={cancelImg} alt="cancelImg" />
                                    <form className="formulario" className="boxModal">
                                        <h3>{t('CANCEL_MESSAGE')}</h3>
                                        <textarea
                                            type='text'
                                            placeholder={t('CANCEL_MESSAGE')}
                                            name='reasonForcancellation'
                                            id='reasonForcancellation'
                                            value={this.state.reasonForcancellation}
                                            onChange={this.handleChange}
                                            required 
                                            className="input-lingo inputManage"
                                        />
                                    </form>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <div className="boxModal">
                                    <Button onClick={this.submitCancel} color="secondary" autoFocus>
                                        {this.t('BTN_CANCEL_CLASS')}
                                    </Button>

                                    <Button onClick={this.closeAlert} color="primary" autoFocus>
                                        {this.t('BTN_NOT_CANCEL_CLASS')}
                                    </Button>
                                </div>
                            </DialogActions>
                        </Dialog>      
                    </div>
                }

                <div className="toptitle">
                    <img src={Schedule} alt="Schedule"/>
                    <h1>{this.t('ITEM_SCHEDULE')}</h1>
                </div> 
                <div className="container">
                    { this.user.role !== 'student' && this.user.role !== 'teacher' &&
                        <FilterUser  style={{marginBottom:'30px'}}>
                            <div className='bigBox'>
                                <h2>
                                    <i className="fa fa-filter" aria-hidden="true"></i>Filters
                                </h2>
                                <form className='formulario'>
                                    <div className='lineInput'>
                                        <label>Period - start</label>
                                        <input
                                            type="date"
                                            name="startAt"
                                            value={this.state.filter.startAt.format('YYYY-MM-DD')}
                                            onChange={this.handleChange}
                                            min="2000-01-01"
                                            max="2050-12-31"
                                        />
                                    </div>
                                    <div className='lineInput'>
                                        <label>Period - end</label>
                                        <input
                                            type="date"
                                            name="endAt"
                                            value={this.state.filter.endAt.format('YYYY-MM-DD')}
                                            onChange={this.handleChange}
                                            min="2000-01-01"
                                            max="2050-12-31"
                                        />
                                    </div>
                                    <div className='lineInput'>
                                        <label>Lingo</label>
                                        <Select
                                            name="lingoLanguageId"
                                            value={this.state.filter.lingoLanguageId}
                                            onChange={this.handleChange}
                                            className='input-lingo'
                                            disableUnderline
                                        >
                                            <MenuItem key="-1" value="0">{t('ALL')}</MenuItem>
                                            {this.state.lingos.map((item,index) => {
                                                return <MenuItem key={index} value={item.id}><FlagIcon code={item.flag} />{item.description}</MenuItem>
                                            })}
                                        </Select>
                                    </div>
                                    <div className='lineInput'>
                                        <label>{t('TYPE')}</label>
                                        <select name='type' value={this.state.filter.type} onChange={this.handleChange}>
                                            <option value="">{t('ALL')}</option>
                                            <option value="demo">{t('DEMO_CLASS')}</option>
                                            <option value="firstclass">{t('FIRST_CLASS')}</option>
                                            <option value="regular">{t('REGULAR')}</option>
                                            <option value="trial">{t('TRIAL_CLASS')}</option>
                                        </select>
                                    </div>
                                    <div className='lineInput'>
                                        <label>{t('PLANS')}</label>
                                        <select name='planId' value={this.state.filter.planId} onChange={this.handleChange}>
                                            <option value="0">{t('ALL')}</option>
                                            {this.state.plans.map((item,index) => 
                                                <option key={index} value={item.id}>{item.nameEnglish}</option>
                                            )}
                                        </select>
                                    </div>
                                      
                                    <div className='lineInput'>
                                        <label>{t('SITUATION')}</label>
                                        <select name='situation' value={this.state.filter.situation} onChange={this.handleChange}>
                                            <option value="">{t('SELECT')}</option>
                                            <option value="confirmed">{t('CARD_CLASS_CONFIRMED')}</option>
                                            <option value="cancelled">{t('CANCELLED')}</option>
                                            <option value="pending">{t('WITHOUT_TEACHER')}</option>
                                        </select>
                                    </div>
                                </form>

                                {this.state.expanded && 
                                    <div>
                                        <hr style={{width: '100%', margin: '0'}}/>
                                        <br/>
                                        <form className='formulario'> 
                                            <div className='lineInput'>
                                                <label>Apenas aulas que o aluno faltou ?</label>
                                                <div className="buttons" style={{ display: 'block' }}>
                                                    <button type="button" name='noShow' style={{ height : '32px', margin: '0px' }} onClick={this.handleChange}>{this.state.filter.noShow ? this.t('YES') : this.t('NO')}</button>
                                                    {!this.state.filter.noShow && <span></span>}                                    
                                                </div>
                                            </div>
                                            <div className='lineInput'>
                                                <label>Teacher</label>
                                                <input placeholder='Teacher name' name='teacher' onChange={this.handleChange} value={this.state.filter.teacher} />
                                            </div>
                                            <div className='lineInput'>
                                                <label>Student</label>
                                                <input placeholder='Student name' name='student' onChange={this.handleChange} value={this.state.filter.student} />
                                            </div>
                                        </form>
                                    </div>
                                }
  
                                <div className='buttons'>        
                                    <button onClick={this.handleFilterPanel}>View More +</button>
                                    <button onClick={this.clearFilters}>{t('CLEAR_FILTERS')}</button>
                                    <button onClick={this.applyFilters}  disabled={this.state.loading} >{t('FILTERS')}</button>
                                </div>
                            </div>
                        </FilterUser>
                    }

                    {this.state.filtered &&
                        <div align='center'>
                            <h4 style={{
                                fontSize: '18px',
                                fontFamily: 'Quicksand',
                                fontWeight: '500',
                                color:'#797881',
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginRight: '50px'
                            }}>
                                Results for your search
                            </h4>
                        </div>
                    }

                    <BigCalendar>
                        <FullCalendar
                            id = "schedulecalendar"
                            view={this.state.viewName}
                            defaultView='listDay'
                            header = {{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay,listDay'
                            }}
                            views= {{
                                month:{
                                    nowIndicator: false,
                                },
                                agenda: {
                                    duration: { minutes: 30 },
                                    allDaySlot: false,
                                    nowIndicator: false,
                                    columnHeaderFormat : 'ddd D'
                                },
                                list: {
                                    titleFormat: 'ddd D - YYYY'
                                }
                            }}
                            locale={this.props.i18n.language}
                            // timezone={this.state.timezone}
                            defaultDate={this.state.currentDate}
                            titleFormat={'MMM D • YYYY'}
                            navLinks= {false}
                            editable= {false}
                            eventLimit= {false} 
                            eventClick={this.eventClick}
                            events={this.state.viewName !== 'month' ? this.state.events : this.state.consolidedEvents}
                            eventRender={this.eventRender}
                            eventAfterAllRender={this.eventAfterAllRender}
                        />
                    </BigCalendar>
                    <br/>
                    <ListWeek id="listDay" >
                        {listDayResult.map((item, index) => {
                            return (                                
                                <div className="nextClass" key={index}>
                                    <div className="boxClass">
                                        <div className="date">
                                            <h3 style={{fontSize: '20px'}}>
                                                {moment(item.scheduledDate).format('DD/MM/YYYY')}
                                                &nbsp; • &nbsp;
                                                {this.t(this.state.tagDays[new Date(item.scheduledDate).getUTCDay()])}  
                                                &nbsp; • &nbsp;
                                                {item.scheduledStartTime}
                                                &nbsp; - &nbsp;
                                                {item.scheduledEndTime}
                                            </h3>
                                        </div> 

                                        <div className="infos">
                                            {item.lingoLanguage && item.classScheduleDetails &&
                                                <div className="classContent">
                                                    <h4>
                                                        <FlagIcon code={item.lingoLanguage.flag}/>
                                                        {item.lingoLanguage.language.name}
                                                    </h4>
                                                    <div className="classAndTeacher">
                                                        <div>
                                                            {item.classScheduleDetails.map((classDetails,i) => {
                                                                return (
                                                                    <div key={i}>
                                                                        <h4>{this.t('CARD_CLASS_CONTENT')}: {classDetails.focus}</h4>
                                                                    </div>    
                                                                )
                                                            })}

                                                            { this.user.role !== 'student' && item.studentPlan && item.studentPlan.studentPlanLanguages.map((plan,i) => {                  
                                                                return (
                                                                    <div key={i}>
                                                                        <h4>{this.t('CARD_PLAN_FOCUS')}: {plan.focus}</h4>
                                                                    </div>
                                                                )
                                                            })}

                                                            { roleNow !='student' && roleNow != 'teacher'&&
                                                                <h4>
                                                                { t('CARD_CLASS_TEACHER')}: {item.teacher 
                                                                  ? <div>{item.teacher.user.name}</div> 
                                                                  : <div dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}} />  
                                                                }      
                                                                • <div dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;'}} />  
                                                                { this.t('CELLPHONE') + ': '}  {item.teacher 
                                                                  ? <div>{` ${item.teacher.user && item.teacher.user.userPhones && item.teacher.user.userPhones[0].phone}`} </div>    
                                                                  : <div dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}} />  
                                                                }                    
                                                                </h4>
                                                            } 
                                                        </div>
                                                    </div>
                                                    
                                                    <h4>
                                                        {this.t('CARD_PLAN_LEVEL')}: 
                                                          { item.student && item.student.studentLevelGrades &&
                                                            <div>
                                                            {item.student.studentLevelGrades.map(itemLevel => (  
                                                                <div key={JSON.stringify(itemLevel)}>    
                                                                { itemLevel.level.level }
                                                                </div>
                                                            ))}
                                                            </div> 
                                                          }
                                                          { item.container && item.container.levelByLingo && <div>{ item.container.levelByLingo }</div> }
                                                    </h4>
                                                    <div className="classAndTeacher">     
                                                        <div>
                                                            {this.user.role !== 'student' && 
                                                                <h4>
                                                                    {this.t('CARD_CLASS_STUDENT')}: &nbsp;{ item.student || item.container.studentName
                                                                      ? <div> { (item.student && item.student.user.name) || item.container.studentName } </div>    
                                                                      : <div dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}} />  
                                                                    }    
                                                                </h4>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                        
                                            {item.status == 'pending' && item.target !== "demo" &&
                                                <div className="status">
                                                    {isNotStudent && <ButtonDrive language={item.lingoLanguage.language.name} />}
                                                    {['companyManager', 'customerService', 'coordinator'].indexOf(this.user.role) >= 0
                                                      ? (<h4 style={{color: '#004FFF'}}>{t('WITHOUT_TEACHER')}</h4>)
                                                      : (<h4 style={{color: '#00D36A'}}>
                                                          {t('CARD_CLASS_CONFIRMED')}
                                                          <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                                                        </h4>)
                                                    }
                                                    <div>
                                                        <button
                                                            style={{
                                                                border: '0px solid',
                                                                width: '100px',
                                                                color:'red'
                                                            }}
                                                            value={item.id}
                                                            onClick={this.handleCancelClass}
                                                        >   
                                                            {this.t('BTN_CANCEL')}
                                                                <i className="fa fa-ban" aria-hidden="true" ></i>
                                                        </button>
                                                    </div>
                                                    <Link to={`/class-details/`+item.id}>
                                                        <button>
                                                            {this.t('BTN_VIEW')} 
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                        </button>
                                                    </Link>
                                                </div>
                                            }
                                            {item.status == 'pending' && item.target === "demo" && item.teacherId &&  
                                                <div className="status">
                                                    <ButtonDrive language={item.lingoLanguage.language.name} />
                                                    <h4 className="confirmed">
                                                        {this.t('CARD_CLASS_CONFIRMED')} 
                                                        <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                                                    </h4>
                                                    <div>
                                                        <button
                                                            style={{
                                                                border: '0px solid',
                                                                width: '100px',
                                                                color:'red'
                                                            }}
                                                            value={item.id}
                                                            onClick={this.handleCancelClass}
                                                        >   
                                                            {this.t('BTN_CANCEL')} <i className="fa fa-ban" aria-hidden="true" ></i>
                                                        </button>
                                                    </div>
                                                    <Link to={`/class-details/`+item.id}>
                                                        <button>
                                                            {this.t('BTN_VIEW')} 
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                        </button>
                                                    </Link>
                                                </div>
                                            }

                                            {item.status == 'accepted' &&  
                                                <div className="status">
                                                    {isNotStudent && <ButtonDrive language={item.lingoLanguage.language.name} />}
                                                    <h4 className="confirmed">
                                                        {this.t('CARD_CLASS_CONFIRMED')} 
                                                        <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                                                    </h4>
                                                    <div>
                                                        <button
                                                            style={{
                                                                border: '0px solid',
                                                                width: '100px',
                                                                color:'red'
                                                            }}
                                                            value={item.id}
                                                            onClick={this.handleCancelClass}
                                                        >   
                                                            {this.t('BTN_CANCEL')} <i className="fa fa-ban" aria-hidden="true" ></i>
                                                        </button>
                                                    </div>
                                                    <Link to={`/class-details/`+item.id}>
                                                        <button>
                                                            {this.t('BTN_VIEW')} 
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                        </button>
                                                    </Link>
                                                </div>
                                            }

                                            {item.status == 'canceled' &&
                                                <div className="status">                                
                                                    {isNotStudent && <ButtonDrive language={item.lingoLanguage.language.name} />}
                                                    <h4 className="cancel">{this.t('CARD_CLASS_CANCELLED')}</h4>
                                                    <Link to={`/class-details/`+item.id}>
                                                        <button>
                                                            {this.t('BTN_VIEW')} 
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                        </button>
                                                    </Link>
                                                </div>
                                            }
                                            {(item.status === 'done' || item.status === 'noShow') &&
                                                <div className="status">                                
                                                    {isNotStudent && <ButtonDrive language={item.lingoLanguage.language.name} />}
                                                    <Link to={`/class-details/`+item.id}>
                                                        <button>
                                                            {this.t('BTN_VIEW')} 
                                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                                        </button>
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </div> 
                                </div>
                        )})}

                        {listDayResult.length === 0 &&
                          <div align='center'>
                              <h4
                                  style={{
                                      fontSize: '18px',
                                      fontFamily: 'Quicksand',
                                      fontWeight: '500',
                                      color:'#797881',
                                      marginTop: '10px',
                                      marginBottom: '10px',
                                      marginRight: '50px'
                                  }}
                              >
                                  {t('BTN_NO_CLASSES_FOUND')}
                              </h4>
                          </div>
                        }
                    </ListWeek> 
                    {this.user.role === 'student' && 
                        <Buttons>
                            <Link to="/schedule">
                            <button className="scheduleClass"><i className="fa fa-plus" aria-hidden="true"></i>{this.t('BTN_SCHEDULE_CLASS')}</button>
                            </Link>
                        </Buttons>
                    }

                    <br/>
    
                    {(this.user.role === 'student' || this.user.role === 'teacher') && 
                        <div>
                            <h2>
                                <strong>{this.t('BTN_NEXT_CLASS')}</strong>
                            </h2>
                            <NextClass single={false} /> 
                        </div>
                    }

                    {(this.state.showPopup && this.user.role === 'teacher') && 
                        <Popover
                            anchorReference={'anchorPosition'}
                            anchorPosition={{top: this.state.positionTop, left: this.state.positionLeft}}
                            id="ConfirmClassPopper"
                            open={this.state.showPopup}
                            onClose={this.closeAlert}
                        >
                            <Buttons>
                                <div>
                                    <button
                                        className="btnConfirm"
                                        onClick={this.handleAcceptClass}
                                    >
                                        {this.t('BTN_CONFIRM')} 
                                        <i className="fa fa-check" aria-hidden="true"></i>
                                    </button>
                                    <button
                                        className="btnClean"
                                        onClick={this.closeAlert}
                                    >
                                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                                        {this.t('BTN_BACK')}
                                    </button>
                                </div>
                            </Buttons>    
                        </Popover>
                    }
                </div>
            </section>
        </div>);
    }
}

Calendar.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}

export default withStyles(styles)(translate('translations')(Calendar));

import { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import scheduleIcon from '../../images/icons/icon_schedule_header.svg'
import { HeaderSchedule } from './scheduleHeader'
import { BodySchedule } from './bodySchedule'
import { FlagIcon } from 'react-flag-kit'
import { FaCalendarAlt } from "react-icons/fa";
import './style.css'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import { Legend } from '../_common/tableClass/styles'

const days = [
  { date: '2022-01-01', isCurrentMonth: true },
  { date: '2022-01-02', isCurrentMonth: true },
  { date: '2022-01-03', isCurrentMonth: true },
  { date: '2022-01-04', isCurrentMonth: true },
  { date: '2022-01-05', isCurrentMonth: true },
  { date: '2022-01-06', isCurrentMonth: true },
  { date: '2022-01-07', isCurrentMonth: true },
  { date: '2022-01-08', isCurrentMonth: true },
  { date: '2022-01-09', isCurrentMonth: true },
  { date: '2022-01-10', isCurrentMonth: true },
  { date: '2022-01-11', isCurrentMonth: true },
  { date: '2022-01-12', isCurrentMonth: true, isToday: true },
  { date: '2022-01-13', isCurrentMonth: true },
  { date: '2022-01-14', isCurrentMonth: true },
  { date: '2022-01-15', isCurrentMonth: true },
  { date: '2022-01-16', isCurrentMonth: true },
  { date: '2022-01-17', isCurrentMonth: true },
  { date: '2022-01-18', isCurrentMonth: true },
  { date: '2022-01-19', isCurrentMonth: true },
  { date: '2022-01-20', isCurrentMonth: true },
  { date: '2022-01-21', isCurrentMonth: true },
  { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
  { date: '2022-01-23', isCurrentMonth: true },
  { date: '2022-01-24', isCurrentMonth: true },
  { date: '2022-01-25', isCurrentMonth: true },
  { date: '2022-01-26', isCurrentMonth: true },
  { date: '2022-01-27', isCurrentMonth: true },
  { date: '2022-01-28', isCurrentMonth: true },
  { date: '2022-01-29', isCurrentMonth: true },
  { date: '2022-01-30', isCurrentMonth: true },
  { date: '2022-01-31', isCurrentMonth: true }
]

const classHours = [
  {
    id: 1,
    type: 'accepted',
    flag: 'BR',
    favorite: true,
    startDate: '2023-01-06 08:00',
    endDate: '2023-01-06 09:00'
  },
  {
    id: 2,
    type: 'accepted',
    flag: 'ES',
    favorite: true,
    startDate: '2023-01-06 10:30',
    endDate: '2023-01-06 11:00'
  },
  {
    id: 3,
    type: 'in-progress',
    flag: 'US',
    favorite: true,
    startDate: '2023-01-06 14:00',
    endDate: '2023-01-06 15:00'
  },
  {
    id: 4,
    type: 'available',
    flag: 'ES',
    favorite: true,
    startDate: '2023-01-06 08:00',
    endDate: '2023-01-06 09:00'
  },
  {
    id: 5,
    type: 'available',
    flag: 'ES',
    favorite: true,
    startDate: '2023-01-06 08:00',
    endDate: '2023-01-06 08:30'
  },
  {
    id: 6,
    type: 'available',
    flag: 'US',
    favorite: true,
    startDate: '2023-01-06 08:00',
    endDate: '2023-01-06 09:00'
  },
]

const classHours2 = [
  {
    id: 1,
    type: 'accepted',
    flag: 'US',
    favorite: false,
    startDate: '2023-01-06 09:00',
    endDate: '2023-01-06 09:30'
  },
  {
    id: 2,
    type: 'in-progress',
    flag: 'ES',
    favorite: true,
    startDate: '2023-01-06 10:00',
    endDate: '2023-01-06 11:30'
  },
  {
    id: 3,
    type: 'available',
    flag: 'BR',
    favorite: false,
    startDate: '2023-01-06 15:00',
    endDate: '2023-01-06 16:45'
  },
]

const RenderDay = ({ date, currentDate, onSelect }) => {
  const day = useMemo(() => {
    const objDay = {
      isCurrentMonth: false,
      isSelected: false,
      isToday: false
    }
    objDay.isCurrentMonth = date.isSame(currentDate, 'month')
    objDay.isToday = date.isSame(moment(), 'day')
    objDay.isSelected = date.isSame(currentDate, 'day')

    return objDay
  }, [currentDate, date])

  const handleDaySelect = () => {
    onSelect(date)
  }

  const week = new Date(date.format('YYYY-MM-DD')).getDay()
  return (
    <button
      type="button"
      className={classNames(
        'group py-1 text-card focus:bg-white focus:shadow-xl duration-300 focus:z-10 rounded-lg h-32',
        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
        (!day.isToday && !day.isSelected) && 'bg-gray-200',
        (day.isToday && !day.isSelected) && 'bg-gray-500 text-white',
        (day.isToday && day.isSelected) && 'bg-white',
        day.isSelected && 'text-card-focus bg-white font-semibold shadow-xl',
        !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
        !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-card',
      )}
      onClick={handleDaySelect}
    >
      <div className='flex flex-row justify-between pl-5 duration-200 rounded-full group-focus:font-semibold group-focus:text-black'>
        <div className='flex flex-col justify-start'>
          <span className='self-start'>{date.format('ddd')}</span>
          <time
            dateTime={date.format('YYYY-MM-DD hh:mm:ss')}
            className={classNames(
              'flex items-start text-lg'
            )}
          >
            {date.format('D')}
          </time>
          <div className='flex flex-row gap-1 mt-4'>
            <FlagIcon size={20} code={'BR'} />
            <FlagIcon size={20} code={'US'} />
          </div>
        </div>
        <div className='flex flex-row items-center mr-5'>
          <span className='flex items-center justify-center mr-3 text-white rounded-md bg-progress w-9 h-9'>1</span>
          <span className='flex items-center justify-center mr-3 text-white rounded-md bg-card-accepted w-9 h-9'>2</span>
          <span className='flex items-center justify-center text-white rounded-md bg-available w-9 h-9'>3</span>
        </div>
      </div>
    </button>
  )
}

const generateDays = (selectedDay, handleDaySelect) => {
  const lastDay = selectedDay.daysInMonth()
  const month = selectedDay.month() + 1
  const year = selectedDay.year()
  const days = []

  for (let i = 1; i <= lastDay; i++) {
    const date = moment(`${year}-${month}-${i}`)
    days.push(
      <RenderDay key={i} date={date} currentDate={selectedDay} onSelect={handleDaySelect} />
    )
  }
  return days
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Schedule = ({ calendar, ...rest }) => {
  const [calendarDate, setCalendarDate] = useState(calendar.atualDate.clone())
  const [selectedDate, setSelectedDate] = useState(calendar.atualDate.clone())

  const handleDaySelect = useCallback((clickedDay) => {
    setSelectedDate(clickedDay.clone())
  }, [])

  const daysInMonth = useMemo(() => {
    return generateDays(calendarDate, handleDaySelect)
  }, [calendarDate, handleDaySelect])

  const nextMonth = () => {
    setCalendarDate(calendarDate.clone().add(1, 'months'))
  }

  const prevMonth = () => {
    setCalendarDate(calendarDate.clone().subtract(1, 'months'))
  }

  const nextAtualDate = () => {
    const newDate = selectedDate.clone().add(1, 'days')
    setSelectedDate(newDate)
    setCalendarDate(newDate)
  }

  const prevAtualDate = () => {
    const newDate = selectedDate.clone().subtract(1, 'days')
    setSelectedDate(newDate)
    setCalendarDate(newDate)
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <header className={`flex items-center justify-between flex-none px-6 py-4 border-b border-gray-200`}>
          <h1 className='flex flex-row gap-3 text-primary'>
            <img src={scheduleIcon} className='h-10 w-11' />
            <span className='text-4xl font-bold'>
              {'Schedule'}
            </span>
          </h1>
          <span className="inline-flex rounded-md shadow-sm isolate">
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onClick={prevAtualDate}
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onClick={nextAtualDate}
            >
              <span>Next</span>
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </span>
        </header>
        <div className="flex flex-row-reverse flex-auto bg-white isolate heightCalc">
          <div className="flex flex-row flex-auto w-full overflow-scroll">
            <div className='flex flex-col min-w-[38rem]'>
              <HeaderSchedule date={selectedDate} />
              <BodySchedule startDay={8} endDay={20} events={classHours} />
            </div>
            <div className='flex flex-col min-w-[38rem]'>
              <HeaderSchedule date={selectedDate.clone().add(1, 'days')} />
              <BodySchedule startDay={8} endDay={20} events={classHours2} />
            </div>
          </div>
          <div className="z-50 flex-none hidden w-1/4 max-w-md py-10 overflow-y-scroll border-l border-gray-100 shadow-xl md:block">
            <div className="flex items-center justify-between w-4/5 mx-auto text-center text-gray-900">
              <div className='flex items-start justify-center'>
                <button
                  type="button"
                  className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  onClick={prevMonth}
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <div className="flex-auto font-semibold w-36">{calendarDate.format('MMMM YYYY')}</div>
                <button
                  type="button"
                  className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  onClick={nextMonth}
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <FaCalendarAlt className='text-[#9CA3AF] text-base cursor-pointer hover:text-[#777c85]' />
            </div>
            <div className="grid w-4/5 grid-cols-1 gap-3 mx-auto mt-2 text-sm bg-white rounded-lg isolate">
              {daysInMonth}
            </div>
          </div>
        </div>
        <Legend style={{ marginTop: '24px' }} className='px-10'>
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
      </div>
    </>
  )
}

const mapStateToProps = ({ calendar, user }) => ({ calendar, user })
const mapDispatchToProps = dispatch => ({
  setCalendarScreen: data => dispatch(setCalendarScreen(data)),
  applyCalendarFilters: data => dispatch(applyCalendarFilters(data)),
  clearCalendarFilters: data => dispatch(clearCalendarFilters(data)),
  setCalendarSchedules: data => dispatch(setCalendarSchedules(data)),
  getNextClasses: data => dispatch(getNextClasses(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Schedule)))

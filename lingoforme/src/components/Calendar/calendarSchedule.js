import { useEffect, useRef, useMemo } from 'react'
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
import { setCalendarInitialParams, getScheduledClasses } from '../../actions/calendarActions';
import moment from 'moment'

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
    type: 'available',
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

function weekOfMonth (input ) {
  const firstDayOfMonth = input.clone().startOf('month');
  const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');

  const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');

  return Math.ceil((input.date() + offset) / 7);
}

const RenderDay = ({ date, currentDate }) => { 

  console.log(date)

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

  const week = new Date(date.format('YYYY-MM-DD')).getDay()
  return (
    <button
      type="button"
      className={classNames(
        'group py-1 text-card bg-gray-200 hover:bg-white hover:shadow-xl duration-300 focus:z-10 rounded-lg h-32',
        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
        (day.isSelected || day.isToday) && 'font-semibold',
        day.isSelected && 'text-card-focus bg-white',
        !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
        !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-card',
        day.isToday && !day.isSelected && 'text-indigo-600'
      )}
    >
      <div className='flex flex-row justify-between pl-5 duration-200 rounded-full group-hover:font-semibold group-hover:text-black'>
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
          <span className='flex items-center justify-center mr-3 text-white bg-red-600 rounded-md w-9 h-9'>1</span>
          <span className='flex items-center justify-center mr-3 text-white bg-blue-600 rounded-md w-9 h-9'>2</span>
          <span className='flex items-center justify-center text-white bg-purple-600 rounded-md w-9 h-9'>3</span>
        </div>
      </div>
    </button>
  )
}

const generateDays = ( selectedDay ) => {
  const lastDay = selectedDay.daysInMonth()
  const month = selectedDay.month() + 1
  const year = selectedDay.year()
  const days = []
  for (let i = 1; i <= lastDay; i++){
    const date = moment(`${year}-${month}-${i}`)
    days.push(
      <RenderDay key={i} date={date} currentDate={selectedDay} />
    )    
  } 
  return days
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Schedule = ({ calendar }) => {
  console.log('month', calendar.atualDate.date())
  const daysInMonth = useMemo(()=>{
    return generateDays(calendar.atualDate)
  },[calendar.atualDate])
  return (
    <div className="flex flex-col h-full">
      <header className={`flex items-center justify-between flex-none px-6 py-4 border-b border-gray-200`}>
        <h1 className='flex flex-row gap-3 text-primary'>
          <img src={scheduleIcon} className='h-10 w-11' />
          <span className='text-4xl font-bold'>
            {'Schedule'}
          </span>
        </h1>
      </header>
      <div className="flex flex-row-reverse flex-auto bg-white isolate heightCalc">
        <div className="flex flex-row flex-auto w-5/12 overflow-y-scroll">
          <div className='flex flex-col'>
            <HeaderSchedule date={'Sep 6'} />
            <BodySchedule startDay={8} endDay={20} events={classHours} />
          </div>
          <div className='flex flex-col'>
            <HeaderSchedule date={'Sep 7'} />
            <BodySchedule startDay={8} endDay={20} events={classHours2} />
          </div>
        </div>
        <div className="z-50 flex-none hidden w-5/12 max-w-md py-10 overflow-y-scroll border-l border-gray-100 shadow-xl md:block">
          <div className="flex items-center justify-between w-4/5 mx-auto text-center text-gray-900">
            <div className='flex items-start justify-center'>
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="flex-auto font-semibold">{calendar.atualDate.format('MMMM YYYY')}</div>
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
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
    </div>
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

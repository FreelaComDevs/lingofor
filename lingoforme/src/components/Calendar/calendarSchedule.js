import { useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import scheduleIcon from '../../images/icons/icon_schedule_header.svg'
import { HeaderSchedule } from './scheduleHeader'
import { BodySchedule } from './bodySchedule'
import { FlagIcon } from 'react-flag-kit'
import { FaCalendarAlt } from "react-icons/fa";
import './style.css'

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
    start: 8,
    end: 8.5,
    type: 'in-progress',
    flag: 'BR',
    favorite: true
  },
  {
    id: 2,
    start: 10.5,
    end: 12,
    type: 'accepted',
    flag: 'ES',
    favorite: false
  },
  {
    id: 3,
    start: 14,
    end: 18,
    type: 'available',
    flag: 'US',
    favorite: true
  },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Schedule({ t, title }) {
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
            <BodySchedule startDay={8} endDay={20} events={classHours} />
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
              <div className="flex-auto font-semibold">January 2022</div>
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
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'group py-1 text-gray-700 bg-gray-200 hover:bg-white hover:shadow-xl duration-300 focus:z-10 rounded-lg h-32',
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                  day.isToday && !day.isSelected && 'text-indigo-600',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === days.length - 7 && 'rounded-bl-lg',
                  dayIdx === days.length - 1 && 'rounded-br-lg'
                )}
              >
                <div className='flex flex-row justify-between pl-5 duration-200 rounded-full group-hover:font-semibold group-hover:text-black'>
                  <div className='flex flex-col justify-start'>
                    <span>Wednesday</span>
                    <time
                      dateTime={day.date}
                      className={classNames(
                        'flex items-start text-lg'
                      )}
                    >
                      {day.date.split('-').pop().replace(/^0/, '')}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

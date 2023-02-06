import { useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import scheduleIcon from '../../images/icons/icon_schedule_header.svg';
import { HeaderSchedule } from './scheduleHeader'
import { BodySchedule } from './bodySchedule'

const days = [
  { date: '2021-12-27' },
  { date: '2021-12-28' },
  { date: '2021-12-29' },
  { date: '2021-12-30' },
  { date: '2021-12-31' },
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
  { date: '2022-01-31', isCurrentMonth: true },
  { date: '2022-02-01' },
  { date: '2022-02-02' },
  { date: '2022-02-03' },
  { date: '2022-02-04' },
  { date: '2022-02-05' },
  { date: '2022-02-06' },
]

const classHours = [
  {
    start: 8,
    end: 8.5,
    flag: 'Pt-br',
    type: 'in-progress'
  },
  {
    start: 10.5,
    end: 12,
    flag: 'Us-en',
    type: 'accepted'
  },
  {
    start: 14,
    end: 18,
    flag: 'Es-es',
    type: 'available'
  },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ t, title }) {  
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
      <div className="flex flex-row-reverse flex-auto overflow-hidden bg-white isolate">
        <div  className="flex flex-col flex-auto overflow-auto">
          <div            
            className="sticky top-0 z-10 grid flex-none grid-cols-7 text-xs text-gray-500 bg-white shadow ring-1 ring-black ring-opacity-5 md:hidden"
          >
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>W</span>
              {/* Default: "text-gray-900", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" */}
              <span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
                19
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>T</span>
              <span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-indigo-600 rounded-full">
                20
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>F</span>
              <span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
                21
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>S</span>
              <span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-white bg-gray-900 rounded-full">
                22
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>S</span>
              <span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
                23
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>M</span>
              <span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
                24
              </span>
            </button>
            <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
              <span>T</span>
              <span className="flex items-center justify-center w-8 h-8 mt-3 text-base font-semibold text-gray-900 rounded-full">
                25
              </span>
            </button>
          </div>          
          <HeaderSchedule date={'Sep 6'}/>
          <BodySchedule startDay={8} endDay={20} events={classHours}/>
        </div>
        <div className="flex-none hidden w-1/2 max-w-md px-8 py-10 border-l border-gray-100 md:block">
          <div className="flex items-center text-center text-gray-900">
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
          <div className="grid grid-cols-7 mt-6 text-xs leading-6 text-center text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-px mt-2 text-sm bg-gray-200 rounded-lg shadow isolate ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
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
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900'
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

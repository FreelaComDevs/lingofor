import { Fragment } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import moment from 'moment'

const days = [
  { date: '2021-12-27' },
  { date: '2021-12-28' },
  { date: '2021-12-29' },
  { date: '2021-12-30', startCycle: true },
  { date: '2021-12-31'},
  { date: '2022-01-01', isCurrentMonth: true },
  { date: '2022-01-02', isCurrentMonth: true },
  { date: '2022-01-03', isCurrentMonth: true },
  { date: '2022-01-04', isCurrentMonth: true },
  { date: '2022-01-05', isCurrentMonth: true },
  { date: '2022-01-06', isCurrentMonth: true },
  { date: '2022-01-07', isCurrentMonth: true, hasClass:true },
  { date: '2022-01-08', isCurrentMonth: true },
  { date: '2022-01-09', isCurrentMonth: true },
  { date: '2022-01-10', isCurrentMonth: true },
  { date: '2022-01-11', isCurrentMonth: true, endCycle: true },
  { date: '2022-01-12', isCurrentMonth: true},
  { date: '2022-01-13', isCurrentMonth: true },
  { date: '2022-01-14', isCurrentMonth: true },
  { date: '2022-01-15', isCurrentMonth: true },
  { date: '2022-01-16', isCurrentMonth: true },
  { date: '2022-01-17', isCurrentMonth: true },
  { date: '2022-01-18', isCurrentMonth: true },
  { date: '2022-01-19', isCurrentMonth: true },
  { date: '2022-01-20', isCurrentMonth: true },
  { date: '2022-01-21', isCurrentMonth: true},
  { date: '2022-01-22', isCurrentMonth: true },
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

const cycles = ['2021-12-30','2022-01-11']
const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    start: '1:00 PM',
    startDatetime: '2022-01-21T13:00',
    end: '2:30 PM',
    endDatetime: '2022-01-21T14:30',
  },
  // More meetings...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="px-4 py-5">
      <h5 className="text-[#004FFF] text-lg font-bold mb-4">Meus ciclos</h5>
      <div className="flex items-center mb-4 justify-between">
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto justify-center flex">
            <span className="border-[#5778FB] text-[#5778FB] border-[1px] rounded-md px-3 py-1 text-xs">CICLO ATUAL</span>
        </div>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <h4 className="font-bold text-[#333C49] text-lg">January 2022</h4>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div className="text-[#333C49] text-sm font-bold">M</div>
        <div className="text-[#333C49] text-sm font-bold">T</div>
        <div className="text-[#333C49] text-sm font-bold">W</div>
        <div className="text-[#333C49] text-sm font-bold">T</div>
        <div className="text-[#333C49] text-sm font-bold">F</div>
        <div className="text-[#333C49] text-sm font-bold">S</div>
        <div className="text-[#333C49] text-sm font-bold">S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => {
            const momentDate = moment(day.date)
            const startCycle = momentDate.isSame(cycles[0])
            const endCycle = momentDate.isSame(cycles[1])
            const hasCycle = momentDate.isBetween(cycles[0],cycles[1])
           return (
            <div key={day.date} className={classNames(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
                    <div className="relative">
                    <div className={classNames(
                      startCycle || endCycle || hasCycle ? 'bg-[#B8B8B9]' : '',
                      startCycle ? 'w-[50%] right-0	' : '',
                      endCycle ? 'w-[50%] left-0' : '',
                      'absolute w-full h-full z-20'
                    )}></div>
                        <button
                        type="button"
                        className={classNames(
                            day.startCycle || day.endCycle ? 'border-[#555D67] bg-[#555D67] border-2 text-[#F1F1F1]' : '',
                            day.hasClass ? 'border-[1px] border-[#555D67]' : '',
                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                            'text-[#333C49] text-sm relative z-20'
                        )}
                        >
                        <time dateTime={day.date}>{day.date.split('-').pop().replace(/^0/, '')}</time>
                        </button>
                    </div>
            </div>
            )
        })}
      </div>
    </div>
  )
}

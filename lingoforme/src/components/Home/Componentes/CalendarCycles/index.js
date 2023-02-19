import {  useState, useMemo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import moment from 'moment'


const cycles = ['2023-02-02','2023-03-25']

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RenderDay = ({date,dayIdx}) => {
  const startCycle = date.isSame(cycles[0])
  const endCycle = date.isSame(cycles[1])
  const hasCycle = date.isBetween(cycles[0],cycles[1])
  const hasClass = false

  return (
    <div key={date} className={classNames(dayIdx > 6 && '', 'py-2')}>
        <div className="relative">
            <div className={classNames(
              startCycle || endCycle || hasCycle ? 'bg-[#B8B8B9] opacity-30' : '',
              startCycle ? 'w-[50%] right-0	' : '',
              endCycle ? 'w-[50%] left-0' : '',
              'absolute w-full h-full z-20'
            )}>
            </div>
            <button
            type="button"
            className={classNames(
                startCycle || endCycle ? 'border-[#555D67] bg-[#555D67] border-2 text-[#F1F1F1]' : '',
                hasClass ? 'border-[1px] border-[#555D67]' : '',
                'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                'text-[#333C49] text-sm relative z-20'
            )}
            >
            <time dateTime={date.format()}>{date.format('DD')}</time>
            </button>
        </div>
    </div>
  )
}

const generateDays = (selectedDay) => {
  const lastDay = selectedDay.daysInMonth()
  const month = selectedDay.month() + 1
  const year = selectedDay.year()
  const days = []

  for (let i = 1; i <= lastDay; i++) {
    const date = moment(`${year}-${month}-${i}`)
    if (i === 1) {
      for (let j = 1; j <= date.day(); j++){
        days.push(<div key={'empty-calendar-'+j}></div>)
      }
    }
    days.push(
      <RenderDay key={i} date={date} dayIdx={i} currentDate={selectedDay}  />
    )
  }
  return days
}

const CalendarHeader = ({prevMonth,nextMonth}) => {
  return (
    <>
      <h5 className="text-[#004FFF] text-lg font-bold mb-4">Meus ciclos</h5>
      <div className="flex items-center mb-4 justify-between">
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={prevMonth}
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
          onClick={nextMonth}
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}

const Calendar = ({hasCycle,date,nextMonth,prevMonth}) => {
  const days = useMemo(()=>{
    return generateDays(date)
  },[date])

  return (
    <div className="px-4 py-5">
      {hasCycle && <CalendarHeader nextMonth={nextMonth} prevMonth={prevMonth} />}
      <h4 className="font-bold text-[#333C49] text-lg">{date.format('MMMM YYYY')}</h4>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div className="text-[#333C49] text-sm font-bold">S</div>
        <div className="text-[#333C49] text-sm font-bold">M</div>
        <div className="text-[#333C49] text-sm font-bold">T</div>
        <div className="text-[#333C49] text-sm font-bold">W</div>
        <div className="text-[#333C49] text-sm font-bold">T</div>
        <div className="text-[#333C49] text-sm font-bold">F</div>
        <div className="text-[#333C49] text-sm font-bold">S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days}
      </div>
    </div>
  )
}

const CalendarCycleRender = () => {
  const [date, setDate] = useState(()=>moment())

  const nextMonth = () => {
    setDate(date.clone().add(1, 'months'))
  }

  const prevMonth = () => {
    setDate(date.clone().subtract(1, 'months'))
  }

  return (
    <>
      <Calendar date={date} nextMonth={nextMonth} prevMonth={prevMonth} hasCycle={true} />
      <Calendar date={date.clone().add(1,'months')} />
    </>
  )


}

export default CalendarCycleRender
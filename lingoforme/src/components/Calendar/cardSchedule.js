import { clsx } from 'clsx';
import { MdEmojiPeople, MdStar } from "react-icons/md"
import { FlagIcon } from 'react-flag-kit'
import moment from 'moment'

const CARD_TYPE = {
    'in-progress': 'bg-progress w-36',
    'available': 'bg-available w-28',
    'accepted': 'bg-card-accepted w-36',
    'done': 'bg-card-class-done w-36'
}

export const CardSchedule = ({ children, item, horas }) => {
    const startTime = moment(item.startDate).format('HH:mm')
    const startHour = moment.duration(startTime).asHours()
    
    const endTime = moment(item.endDate).format('HH:mm')
    const endHour = moment.duration(endTime).asHours()     
   
    return (
        <li
            className={clsx(CARD_TYPE[item.type], 'relative rounded-lg hover:bg-blue-100 mx-2 duration-300 overflow-hidden')}
            style={{ gridRow: `${(startHour - horas[0]) * 12 + 2} / span ${Math.round((endHour - startHour) * 12)}` }}>
            {children}
        </li>
    )
}

export const ScheduleItem = ({ item }) => {
    const startTime = moment(item.startDate).format('hh:mm A')
    const endTime = moment(item.endDate).format('hh:mm A')

    
    return (
        <a
            href="#"
            className={`absolute flex flex-col text-xs leading-5 group inset-1 h-full px-2 py-1`}
        >
            <div className='flex justify-between'>
                <div className='flex flex-row gap-2'>
                    <MdEmojiPeople className='text-lg rotate-45' />
                    <p className={`col-span-2 font-semibold text-black`}>Aula</p>
                    <FlagIcon size={20} code={item.flag} />
                </div>
                {item.favorite && <MdStar className={`text-lg`} />}
            </div>
            <div className='flex justify-center mt-1'>
                <p className={`text-black group-hover:text-black`}>
                    <time dateTime={item.startDate}>{startTime}</time>
                </p>
                <p className={`text-black group-hover:black before:content-['-'] before:mx-1`}>
                    <time dateTime={item.endDate}>{endTime}</time>
                </p>
            </div>
        </a>
    )
}

export const AvailableScheduleItem = ({ item }) => {
    const startTime = moment(item.startDate).format('hh:mm A')
    const endDate = moment(item.endDate)
    const difHours = moment.duration(endDate.diff(item.startDate))
    let formatDif = difHours.hours() 
    if (difHours.minutes() > 0) formatDif += ':' + difHours.minutes()
    formatDif += 'H'

    

    return (
        <a
            href="#"
            className={`absolute flex flex-col justify-between text-xs leading-5 group inset-1 h-full p-2`}
        >
            <div className='flex flex-row gap-2'>
                <FlagIcon size={20} code={item.flag} />
                <p className={`text-black group-hover:text-black`}>
                    <time dateTime={item.startDate}>{startTime}</time>
                </p>
            </div>
            <div className='flex justify-between mx-1'>
                <p>{formatDif}</p>
                {item.favorite && <MdStar className={`text-lg`} />}
            </div>
        </a>
    )
}

export const ScheduleCard = ({ item, horas }) => {
    let ScheduleChildren = ScheduleItem
    if (item.type == 'available') {
        ScheduleChildren = AvailableScheduleItem
    }
    return (
        <CardSchedule horas={horas} item={item}>
            <ScheduleChildren item={item}/>
        </CardSchedule>
    )
}
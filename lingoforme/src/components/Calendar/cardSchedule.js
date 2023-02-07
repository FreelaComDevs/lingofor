import { clsx } from 'clsx';
import { MdEmojiPeople, MdStar } from "react-icons/md"
import { FlagIcon } from 'react-flag-kit'

const CARD_TYPE = {
    'in-progress': 'bg-progress',
    'available': 'bg-available',
    'accepted': 'bg-sucess'
}

export const CardSchedule = ({ children, item, horas }) => {

    return (
        <li
            className={clsx(CARD_TYPE[item.type], 'relative rounded-lg p-2 hover:bg-blue-100 mx-2 duration-300')}
            style={{ gridRow: `${(item.start - horas[0]) * 12 + 2} / span ${(item.end - item.start) * 12}` }}>
            {children}
        </li>
    )
}

export const ScheduleItem = ({ item }) => {
    const formatHourStart = item.start >= 12 ? (item.start.toString().replace('.5', ':30') + " PM") : (item.start.toString().replace('.5', ':30') + " AM")
    const formatHourEnd = item.end >= 12 ? (item.end.toString().replace('.5', ':30') + " PM") : (item.end.toString().replace('.5', ':30') + " AM")
    return (
        <a
            href="#"
            className={`flex flex-col text-xs leading-5 group inset-1 h-full`}
        >
            <div className='flex justify-between'>
                <div className='flex flex-row gap-2'>
                    <MdEmojiPeople className='text-lg rotate-45' />
                    <p className={`col-span-2 font-semibold text-black`}>Aula</p>
                    <FlagIcon size={20} code={item.flag} />
                </div>
                {item.favorite && <MdStar className={`text-lg`} />}
            </div>
            <div className='flex justify-center'>
                <p className={`text-black group-hover:text-black`}>
                    <time dateTime="2022-01-22T06:00">{formatHourStart}</time>
                </p>
                <p className={`text-black group-hover:black before:content-['-'] before:mx-1`}>
                    <time dateTime="2022-01-22T06:00">{formatHourEnd}</time>
                </p>
            </div>
        </a>
    )
}

export const AvailableScheduleItem = ({ item }) => {
    const formatHourStart = item.start >= 12 ? (item.start.toString().replace('.5', ':30') + " PM") : (item.start.toString().replace('.5', ':30') + " AM")

    return (
        <a
            href="#"
            className={`flex flex-col justify-between text-xs leading-5 group inset-1 h-full`}
        >
            <div className='flex flex-row gap-2'>
                <FlagIcon size={20} code={item.flag} />
                <p className={`text-black group-hover:text-black`}>
                    <time dateTime="2022-01-22T06:00">{formatHourStart}</time>
                </p>
            </div>
            <div className='flex justify-between mx-1'>
                <p>{item.end - item.start}</p>
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
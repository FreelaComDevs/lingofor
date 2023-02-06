import { clsx } from 'clsx';

export const CardSchedule = ({ item, href, horas }) => {   
    const CARD_TYPE = {
        'in-progress': 'bg-progress rounded-lg p-2',
        'available': 'bg-available rounded-lg p-2',
        'accepted': 'bg-sucess rounded-lg p-2'
    } 
    return (
        <li         
        className='relative flex mt-px overflow-y-hidden'
        style={{ gridRow: `${(item.start - horas[0]) * 12 + 2} / span ${(item.end - item.start) * 12}` 
        }}
        >
            <a
                href="#"
                className={clsx(CARD_TYPE[item.type],`absolute flex flex-col  text-xs leading-5 group inset-1 hover:bg-blue-100`)} 
            >
                <div className="grid grid-cols-2 grid-rows-2">
                    <p className={`col-span-2 font-semibold text-black`}>Aula</p>
                    <p className={`text-black group-hover:text-black`}>
                        <time dateTime="2022-01-22T06:00">{item.start}</time>
                    </p>
                    <p className={`text-black group-hover:black`}>
                        <time dateTime="2022-01-22T06:00">{item.end}</time>
                    </p>
                </div>
            </a>
        </li>
    )
}
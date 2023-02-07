import React from 'react'
import { CardSchedule, ScheduleCard } from './cardSchedule'

const Hours = ({ start, end }) => {
    const hours = []
    for (let i = start; i <= end; i++) {
        hours.push(
            <React.Fragment key={i}>
                <div>
                    <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {i}
                    </div>
                </div>
                <div />
            </React.Fragment>
        )
    }
    return hours
}

export const BodySchedule = ({ startDay, endDay, events }) => {

    const horas = [
        startDay, endDay
    ]    

    return (
        <div className="flex flex-auto">
            <div className="flex-none bg-white w-14 ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* Horizontal lines */}
                <div
                    className="grid col-start-1 col-end-2 row-start-1 divide-y divide-gray-100"
                    style={{ gridTemplateRows: `repeat(${(horas[1] - horas[0]) * 2 + 2}, minmax(3.5rem, 1fr))` }}
                >
                    <div className="row-end-1 h-7"></div>
                    <Hours start={horas[0]} end={horas[1]} />
                </div>

                {/* Events */}
                <ol
                    className="grid grid-cols-1 col-start-1 col-end-2 row-start-1"
                    style={{ gridTemplateRows: `1.75rem repeat(${(horas[1] - horas[0]) * 12 + 12}, minmax(0, 1fr)) auto` }}
                >
                    {
                        events.map((item, key) => {                                                                            
                            return (                                
                                <ScheduleCard key={item.id} item={item} horas={horas}/>                                
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    )
}
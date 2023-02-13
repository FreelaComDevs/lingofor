

export const HeaderSchedule = ({ date }) => {
    return (
        <div className='flex flex-col gap-5 p-4 ml-10'>
            <div>
                <span className='text-base font-semibold text-primary'>{date.format('MMM D')}</span>                
            </div>
            <div>
                <button className='px-4 py-1 text-base duration-300 bg-white border rounded-md border-btn-class-confirmed text-btn-class-confirmed hover:bg-btn-class-confirmed hover:text-white hover:border-transparent'>
                    Você tem 2 aulas agendadas
                </button>                
            </div>
        </div>
    )
}


export const HeaderSchedule = ({ date }) => {
    return (
        <div className='flex flex-col gap-5 p-4 ml-10'>
            <div className='flex justify-between gap-3'>
                <span className='text-base font-semibold text-primary'>{date}</span>
                <button className='px-4 py-1 text-base text-white rounded-full bg-sucess'>Ativar agendamento automatico</button>
            </div>
            <div className='flex flex-col justify-between gap-3'>
                <button className='px-4 py-1 text-base duration-300 bg-white border rounded-md border-btn-class-confirmed text-btn-class-confirmed hover:bg-btn-class-confirmed hover:text-white hover:border-transparent'>
                    Você tem 2 aulas agendadas
                </button>
                <button className='px-4 py-1 text-base duration-300 bg-white border rounded-md border-warning text-warning hover:bg-warning hover:text-white hover:border-transparent'>
                    1 formulário para preencher
                </button>
            </div>
        </div>
    )
}
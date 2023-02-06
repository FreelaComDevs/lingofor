

export const HeaderSchedule = ({ date }) => {
    return (
        <div className='flex flex-col gap-5 p-4 ml-14'>
            <div className='flex justify-between'>
                <span className='text-xl font-semibold text-primary'>{date}</span>
                <button className='px-6 py-2 text-white rounded-full bg-sucess'>Ativar agendamento automatico</button>
            </div>
            <div className='flex justify-between'>
                <button className='px-6 py-2 bg-white border rounded-md border-available text-available'>Você tem 2 aulas agendadas</button>
                <button className='px-6 py-2 bg-white border rounded-md border-warning text-warning'>1 formulário para preencher</button>
            </div>
        </div>
    )
}
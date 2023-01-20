import React from 'react'
import { translate } from 'react-i18next'
import InputText from './Inputs/InputText';
import InputSelect from './Inputs/InputSelect';
import InputDate from './Inputs/InputDate';
import InputLingoLanguages from './Inputs/InputLingoLanguages';
import InputLevels from './Inputs/InputLevels';
import InputStatus from './Inputs/InputStatus';
import InputProfiles from './Inputs/InputProfiles';
import InputTicketProfiles from './Inputs/InputTicketProfiles';
import InputTicketTypes from './Inputs/InputTicketTypes';
import InputTicketSubTypes from './Inputs/InputTicketSubTypes';
import InputTicketStatus from './Inputs/InputTicketStatus';

const Filter = ({ t, filters, inputChange, clear, submit, loading }) =>  (
    <div className='bigBox bigBoxFilter'>
        <h2><i className="fa fa-filter" aria-hidden="true"></i>{t("FILTERS")}</h2>
        <form>
            { filters.map((data, index) => {
                switch (data.type) {
                    case "text":
                        return <InputText key={ index } {...data} onChange={inputChange} /> 
                    case "select":
                        return <InputSelect key={ index } {...data} onChange={inputChange} /> 
                    case "date":
                        return <InputDate key={ index } {...data} onChange={inputChange} /> 
                    case "lingoLanguages":
                        return <InputLingoLanguages key={ index } {...data} onChange={inputChange} /> 
                    case "levels":
                        return <InputLevels key={ index } {...data} onChange={inputChange} /> 
                    case "status":
                        return <InputStatus key={ index } {...data} onChange={inputChange} /> 
                    case "ticketStatus":
                        return <InputTicketStatus key={ index } {...data} onChange={inputChange} /> 
                    case "profiles":
						return <InputProfiles key={data.name} { ...data } onChange={inputChange}/>
                    case "ticketProfiles":
						return <InputTicketProfiles key={data.name} { ...data } onChange={inputChange}/>
                    case "ticketTypes":
						return <InputTicketTypes key={data.name} { ...data } onChange={inputChange}/>
                    case "ticketSubTypes":
						return <InputTicketSubTypes key={data.name} { ...data } onChange={inputChange}/>
                    default:
                        break;
                }
            })}
        </form>
        <div className='buttons'>
            <button className="clear" onClick={ () => clear() }>{t("CLEAR_FILTERS")}</button>
            <button onClick={(e) => submit(e)} disabled={ loading } >{t("FILTER")}</button>
        </div>
    </div>
)

export default translate('translations')(Filter)
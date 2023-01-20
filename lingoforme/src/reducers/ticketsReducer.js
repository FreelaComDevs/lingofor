import { 
    GET_TICKETS, 
    GET_TICKET, 
    ADD_TICKET, 
    DELETE_TICKET, 
    UPDATE_TICKET, 
    UNSET_TICKET, 
    UNSET_TICKET_SUBTYPES, 
    GET_TICKET_MESSAGES,
    SEND_TICKET_MESSAGE,
    GET_TICKET_TYPES, 
    LOADING_TICKET,
    UNSET_TICKET_MESSAGES,
    GET_TICKET_SUBTYPES } from '../helpers/constants'

const initialState = {
    tickets: [],
    ticketTypes: [],
    ticketSubTypes: [],
    ticketMessages: [],
    ticket: "",
    totalPages:0,
    loading: false,
}

const tickets = (state = initialState, action) => {
    const { tickets, ticketTypes, ticketSubTypes, ticket, totalPages, totalFound, ticketMessages, ticketMessage, ticketId, type } = action;
    switch (type) {
        case GET_TICKETS:
            return { ...state, tickets, totalPages, totalFound, loading: false }
        case LOADING_TICKET:
            return { ...state, loading: true }
        case GET_TICKET_TYPES:
            return { ...state, ticketTypes, loading: false }
        case GET_TICKET_SUBTYPES:
            return { ...state, ticketSubTypes, loading: false }
        case GET_TICKET:
            return { ...state, ticket, loading: false }
        case GET_TICKET_MESSAGES:
            return { ...state, ticketMessages, loading: false }
        case ADD_TICKET:
            return { ...state, tickets: [ ...state.tickets, ticket ], ticket, loading: false }
        case SEND_TICKET_MESSAGE:
            return { ...state, ticketMessages: [ ...state.ticketMessages, ticketMessage ], loading: false }
        case UNSET_TICKET:
            return { ...state, ticket: "", tickets:[] } 
        case UNSET_TICKET_SUBTYPES:
            return { ...state, ticketSubTypes: [] }  
        case UNSET_TICKET_MESSAGES:
            return { ...state, ticketMessages: [] }  
        case DELETE_TICKET:
            return { ...state, tickets: state.tickets.filter( item => item.id !== ticketId), ticket: "", loading: false }  
        case UPDATE_TICKET:
            return { ...state, tickets: state.tickets.map( item => item.id !== ticket.id ? item : ticket ), loading: false }
        default:
            return state;
    }
}

export default tickets
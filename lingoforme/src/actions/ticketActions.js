import { 
    GET_TICKETS, 
    GET_TICKET, 
    ADD_TICKET, 
    DELETE_TICKET, 
    UPDATE_TICKET, 
    GET_TICKET_TYPES, 
    GET_TICKET_SUBTYPES,
    GET_TICKET_MESSAGES, 
    UNSET_TICKET_SUBTYPES, 
    SEND_TICKET_MESSAGE,
    UNSET_TICKET, 
    UNSET_TICKET_MESSAGES,
    LOADING_TICKET } from '../helpers/constants'
import Services from '../components/_api/Services'
const service = new Services()

// Loading tickets
export const loadingTicket = () => ({
    type: LOADING_TICKET,
});

// All tickets
export const ticketsFetched = (tickets, totalPages, totalFound) => {
    console.log('ticketsFetched', tickets, totalPages, totalFound)
    return { 
        type: GET_TICKETS,
        tickets,
        totalPages,
        totalFound
    }
};

export const getTickets = (objFilter) => dispatch => {
    objFilter.orderByDesc = "createdAt"
    service.ApiGetParams('tickets', objFilter)
        .then(res => {
            console.log('RESULT teste ', res)
            dispatch(ticketsFetched(res.result.items, res.result.totalPages, res.result.totalFound))
        })       
        .catch(err => { console.log ('Error', err); dispatch(ticketsFetched([],0,0)) })
        
}

// Ticket Types
export const ticketTypesFetched = ticketTypes => ({
    type: GET_TICKET_TYPES,
    ticketTypes
});

export const getTicketTypes = () => dispatch => {
    service.ApiGet('ticketTypes')
        .then(res => dispatch(ticketTypesFetched(res.result.items)))
        .catch (err => console.log ('Error', err))
}

// Unset Ticket SubTypes
export const unsetTicketSubTypes = () => ({
    type: UNSET_TICKET_SUBTYPES,
});

// Unset Ticket Messages
export const unsetTicketMessages = () => ({
    type: UNSET_TICKET_MESSAGES,
});

// Ticket SubTypes
export const ticketSubTypesFetched = ticketSubTypes => ({
    type: GET_TICKET_SUBTYPES,
    ticketSubTypes
});

export const getTicketSubTypes = (typeId) => dispatch => {
    service.ApiGet(`ticketTypes/${typeId}/ticketSubTypes`)
        .then(res => dispatch(ticketSubTypesFetched(res.result.items)))
        .catch(err => { console.log ('Error', err); dispatch(ticketSubTypesFetched([])) })
}

// Single ticket
export const ticketFetched = ticket => {
    return ({
        type: GET_TICKET,
        ticket
})};

export const getTicket = (ticketId) => dispatch => {
    service.ApiGet(`tickets/${ticketId}`)
        .then(res => { dispatch(ticketFetched(res.result.items[0])); dispatch(getTicketMessages(ticketId))})
        .catch (err => console.log ('Error', err))
}

export const updateTicket = (data) => dispatch => {
    console.log(data)
    service.ApiPut(`tickets/${data.id}`, data.value)
        .then(res => { dispatch(getTickets())})
        .catch (err => console.log ('Error', err))
}
  
// Delete ticket
export const ticketRemoved = ticketId => ({
    type: DELETE_TICKET,
    ticketId
});
  
export const removeTicket = (ticketId) => dispatch => {
    service.ApiDelete(`tickets/ticket/${ticketId}`)
        .then(res => dispatch(ticketRemoved(ticketId)))
        .catch (err => console.log ('Error', err))
}

// Unset ticket
export const unsetTicket = () => ({
    type: UNSET_TICKET,
});

// Add ticket
export const ticketAdded = ticket => ({
    type: ADD_TICKET,
    ticket
});
  
export const addTicket = (objTicketAdd) => dispatch => {
    dispatch(loadingTicket())
    let newObjTicketAdd = {}
    newObjTicketAdd.ticketTypeId = Number(objTicketAdd.type)
    newObjTicketAdd.ticketSubTypeId = Number(objTicketAdd.subType)
    newObjTicketAdd.description = objTicketAdd.description
    newObjTicketAdd.lingoLanguageId = Number(objTicketAdd.lingoLanguage)
    newObjTicketAdd.title = objTicketAdd.title
    newObjTicketAdd.active = true
    service.ApiPosts(`tickets`, JSON.parse(JSON.stringify(newObjTicketAdd)))
        .then(res => dispatch(ticketAdded(res.data.result.items[0])))
        .catch (err => console.log ('Error', err))
}

// Ticket Messages
export const ticketMessagesFetched = ticketMessages => ({
    type: GET_TICKET_MESSAGES,
    ticketMessages
});

export const getTicketMessages = (ticketId) => dispatch => {
    service.get(`tickets/${ticketId}/ticketMessages`)
        .then(res => dispatch(ticketMessagesFetched(res.result.items)))
        .catch(err => { console.log ('Error', err); dispatch(ticketMessagesFetched([])) })
}

// Send Ticket Message
export const ticketMessageSended = ticketMessage => ({
    type: SEND_TICKET_MESSAGE,
    ticketMessage
});
  
export const sendTicketMessage = (messageObj) => dispatch => {
    const { ticketId, message } = messageObj
    service.ApiPosts(`tickets/${ticketId}/ticketMessages`, { message } )
        .then(res => dispatch(ticketMessageSended(res.data.result.items[0])))
        .catch (err => console.log ('Error', err))
}

// Close Ticket
export const closeTicket = (ticketId) => dispatch => {
    dispatch(loadingTicket())
    service.ApiPosts(`tickets/${ticketId}/close`)
        .then(res => dispatch(ticketFetched(res.data.result.items[0])))
        .catch (err => console.log ('Error', err))
}

// Proceed Ticket
export const proceedTicket = (ticketId) => dispatch => {
    dispatch(loadingTicket())
    service.ApiPosts(`tickets/${ticketId}/proceed`)
        .then(res => dispatch(ticketFetched(res.data.result.items[0])))
        .catch (err => console.log ('Error', err))
}

// Cancel Ticket
export const cancelTicket = (cancelObj) => dispatch => {
    const { ticketId, message } = cancelObj
    service.ApiPosts(`tickets/${ticketId}/cancel`, {message})
        .then(res => { dispatch(ticketFetched(res.data.result.items[0])); dispatch(getTicketMessages(res.data.result.items[0].id)) } )
        .catch (err => console.log ('Error', err))
}

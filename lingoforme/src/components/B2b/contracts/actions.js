export const setCompanies = items => dispatch => {
    dispatch({
        type: 'SET_COMPANIES',
        data: items
    })
}

export const setEconomicGroups = items => dispatch => {
    dispatch({
        type: 'SET_ECONOMIC_GROUPS',
        data: items
    })
}

export const setContract = item => dispatch => {
    dispatch({
        type: 'SET_CONTRACT',
        data: item
    })
}

export const setContracts = items => dispatch => {
    dispatch({
        type: 'SET_CONTRACTS',
        data: items
    })
}

export const setPlanList = items => dispatch => {
    dispatch({
        type: 'SET_PLAN_LIST',
        data: items
    })
}

export const setContactsFound = items => dispatch => {
    dispatch({
        type: 'SET_CONTACTS_FOUND',
        data: items
    })
}

export const addContactToContract = item => dispatch => {
    dispatch({
        type: 'ADD_CONTACT_TO_CONTRACT',
        data: item
    })
}

export const removeContactFromContract = item => dispatch => {
    dispatch({
        type: 'REMOVE_CONTACT_FROM_CONTRACT',
        data: item
    })
}

export const addContactForm = () => dispatch => {
    dispatch({
        type: 'ADD_CONTACT_FORM'
    })
}

export const removeContactForm = index => dispatch => {
    dispatch({
        type: 'REMOVE_CONTACT_FORM',
        data: index
    })
}

export const handleContactFormChange = data => dispatch => {
    dispatch({
        type: 'HANDLE_CONTACT_FORM_CHANGE',
        data
    })
}

export const handleChangeInList = data => dispatch => {
    dispatch({
        type: 'HANDLE_CHANGE_IN_LIST',
        data
    })
}

export const addFieldInList = data => dispatch => {
    dispatch({
        type: 'ADD_FIELD_IN_LIST',
        data
    })
}

export const removeFieldInList = data => dispatch => {
    dispatch({
        type: 'REMOVE_FIELD_IN_LIST',
        data
    })
}

export const clearContractForm = () => dispatch => {
    dispatch({
        type: 'RESET_CONTRACT_FORM'
    })
}
const initialState = {
    economicGroups: [],
    contracts: [],
    planList: [],
    contactsFound: [],
    contract: {
        code: '',
        description: '',
        companyId: 0,
        startDate: '',
        endDate: '',
        active: true,
        contractPlans: [],
        contractContacts: []
    },
    contractContactsNew: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_ECONOMIC_GROUPS': {
            return {
                ...state,
                economicGroups: action.data
            }
        }

        case 'SET_CONTRACT': {
            return {
                ...state,
                contract: action.data
            }
        }

        case 'SET_CONTRACTS': {
            return {
                ...state,
                contracts: action.data
            }
        }

        case 'SET_PLAN_LIST': {
            return {
                ...state,
                planList: action.data
            };
        }

        case 'SET_CONTACTS_FOUND': {
            return {
                ...state,
                contactsFound: action.data
            };
        }

        case 'ADD_CONTACT_TO_CONTRACT': {
            const contract = {
                ...state.contract
            }
            contract.contractContacts.push(action.data)
            return {
                ...state,
                contract,
                contactsFound: []
            };
        }

        case 'REMOVE_CONTACT_FROM_CONTRACT': {
            const contract = {
                ...state.contract
            }
            contract.contractContacts = contract.contractContacts.filter(contact => {
                return contact.id !== action.data.id;
            })
            return {
                ...state,
                contract
            };
        }

        case 'ADD_CONTACT_FORM': {
            const dt = new Date().toISOString().split('T')[0]
            const [year, month, day] = dt.split('-')
            const contact = {
                address: '',
                birthDate: `${year}-${month}-${day}`,
                countryId: 212,
                email: '',
                gender: 'male',
                name: '',
                role: 'b2b',
                timezone: '',
                userPhones: [{
                    phone: '',
                    userPhoneTypeId: 3
                }],
                userEmails: [],
            }
            const { contractContactsNew } = state;
            const newList = [...contractContactsNew]
            newList.push(contact)
            return {
                ...state,
                contractContactsNew: newList
            }
        }

        case 'REMOVE_CONTACT_FORM': {
            const newList = [...state.contractContactsNew]
            newList.splice(action.data, 1);
            return {
                ...state,
                contractContactsNew: newList
            }
        }

        case 'HANDLE_CONTACT_FORM_CHANGE': {
            const { name, value, index } = action.data;
            const newList = [...state.contractContactsNew];
            const item = newList[index];
            item[name] = value;
            return {
                ...state,
                contractContactsNew: newList
            };
        }

        case 'HANDLE_CHANGE_IN_LIST': {
            const { name, value, index, subindex, field } = action.data;
            const newList = [...state.contractContactsNew];
            const item = newList[index];
            item[field][subindex][name] = value;
            return {
                ...state,
                contractContactsNew: newList
            }
        }

        case 'RESET_CONTRACT_FORM': {
            return {
                ...state,
                contract: initialState.contract,
                contractContactsNew: initialState.contractContactsNew
            }
        }

        case 'ADD_FIELD_IN_LIST': {
            const { value, index, field } = action.data;
            const newList = [...state.contractContactsNew];
            const item = newList[index];
            item[field].push(value);
            return {
                ...state,
                contractContactsNew: newList
            }
        }

        case 'REMOVE_FIELD_IN_LIST': {
            const { subindex, index, field } = action.data;
            const newList = [...state.contractContactsNew];
            const item = newList[index];
            item[field].splice(subindex, 1);
            return {
                ...state,
                contractContactsNew: newList
            }
        }

        default:
           return state;

    }
}
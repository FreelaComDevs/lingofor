import { 
    GET_LINGO_ALL_COUNTRIES, 
    GET_LINGO_LEVELS, 
    GET_LINGO_ALL_LANGUAGES, 
    GET_LINGO_LANGUAGES,
    GET_LINGO_PLANS, 
    GET_LINGO_CLASS_TIMES,
    GET_LINGO_TOOLS,
    GET_LINGO_ECONOMIC_GROUPS, 
    GET_LINGO_ECONOMIC_GROUPS_COMPANYS,
    GET_LINGO_RATING_CRITERIAS,
} from '../helpers/constants'

const initialState = {
    countries: [],
    languages: [],
    lingoLanguages: [],
    lingoClassTimes: [],
    lingoLevels: [],
    lingoPlans: [],
    economicGroups: [],
    economicGroupCompanys: [],
    ratingCriterias: [],
    lingoClassTool: [{id: 1, name:"Skype"}, {id: 2, name:"Zoom"}, {id: 3, name:"Webex"}, {id: 4, name:"Google Meet"}, {id: 5, name:"Tokbox"}, {id: 6, name:"Skype for Business"}, {id: 7, name:"Blue Jeans"}, {id: 9, name:"Microsoft Teams"}, {id: 8, name:"Other"}]
} 

const lingo = (state = initialState, action) => {
    const { 
        countries, 
        languages, 
        lingoLevels, 
        lingoPlans, 
        economicGroups, 
        economicGroupCompanys, 
        lingoLanguages, 
        lingoClassTool, 
        lingoClassTimes,
        ratingCriterias 
    } = action;
    switch (action.type) {
        case GET_LINGO_ALL_COUNTRIES:
            return { ...state, countries };
        case GET_LINGO_CLASS_TIMES:
            return { ...state, lingoClassTimes };
        case GET_LINGO_ECONOMIC_GROUPS:
            return { ...state, economicGroups };
        case GET_LINGO_ECONOMIC_GROUPS_COMPANYS:
            return { ...state, economicGroupCompanys }
        case GET_LINGO_LANGUAGES:
            return { ...state, lingoLanguages };
        case GET_LINGO_TOOLS:
            return { ...state, lingoClassTool };
        case GET_LINGO_ALL_LANGUAGES:
            return { ...state, languages };
        case GET_LINGO_LANGUAGES:
            return { ...state, lingoLanguages };
        case GET_LINGO_LEVELS:
            return { ...state, lingoLevels };
        case GET_LINGO_PLANS:
            return { ...state, lingoPlans };
        case GET_LINGO_RATING_CRITERIAS:
            return { ...state, ratingCriterias };
        default:
            return state;
    }
}

export default lingo

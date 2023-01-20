import Services from '../components/_api/Services'
import { 
    GET_LINGO_ALL_COUNTRIES, 
    GET_LINGO_LANGUAGES,
    GET_LINGO_CLASS_TIMES,
    GET_LINGO_LEVELS, 
    GET_LINGO_PLANS,
    GET_LINGO_TOOLS, 
    GET_LINGO_ALL_LANGUAGES ,
    GET_LINGO_ECONOMIC_GROUPS, 
    GET_LINGO_ECONOMIC_GROUPS_COMPANYS,
    GET_LINGO_RATING_CRITERIAS
} from '../helpers/constants'

const service = new Services()

// Get All Countries
export const fetchLingoAllCountries = countries => ({
    type: GET_LINGO_ALL_COUNTRIES,
    countries
  });
  
export const getLingoAllCountries = () => dispatch => {
    service.get('countries/getall')
        .then(res => dispatch(fetchLingoAllCountries(res.result.items)))
        .catch (err => console.log ('Error', err))
}

// Get Class Times
export const fetchLingoClassTimes = lingoClassTimes => ({
    type: GET_LINGO_CLASS_TIMES,
    lingoClassTimes
  });
  
export const getLingoClassTimes = () => dispatch => {
    service.get('classSchedules/classTimes')
        .then(res => dispatch(fetchLingoClassTimes(res.result.items)))
        .catch (err => console.log ('Error', err))
}

// Get All Languages
export const fetchLingoAllLanguages = languages => ({
    type: GET_LINGO_ALL_LANGUAGES,
    languages
  });
  
export const getLingoAllLanguages = () => dispatch => {
    service.get('languages?skip=0&take=200')
        .then(res => dispatch(fetchLingoAllLanguages(res.result.items)))
        .catch (err => console.log ('Error', err))
}

// Get Lingo Languages
export const fetchLingoLanguages = lingoLanguages => ({
    type: GET_LINGO_LANGUAGES,
    lingoLanguages
  });
  
export const getLingoLanguages = () => dispatch => {
    service.get('lingolanguages/getall')
        .then(res => dispatch(fetchLingoLanguages(res.result.items)))
        .catch (err => console.log ('Error', err))
}

// Get Lingo Levels
export const fetchLingoLevels = lingoLevels => ({
    type: GET_LINGO_LEVELS,
    lingoLevels
  });
  
export const getLingoLevels = () => dispatch => {
    service.get('levels')
        .then(res => dispatch(fetchLingoLevels(res.result.items)))
        .catch (err => console.log ('Error', err))
}

// Get Lingo Class Tools
export const fetchLingoTools = lingoClassTool => ({
    type: GET_LINGO_TOOLS,
    lingoClassTool
});
  
export const getLingoTools = () => dispatch => {
    service.get('tools')
        .then(res => dispatch(fetchLingoTools(res.result.items)))
        .catch (err => console.log ('Error', err))
}

// Get Lingo Plans
export const fetchLingoPlans = lingoPlans => ({
    type: GET_LINGO_PLANS,
    lingoPlans
  });
  
export const getLingoPlans = () => dispatch => {
    const filterPlans = {
        "criteria": {
            "lingoLanguageId": null,
            "planName": null,
            "active": true,
            "bestSeller": null,
            "skip": null,
            "take": null
        }
    }
    service.ApiPosts('plans/search', filterPlans)
        .then(res => dispatch(fetchLingoPlans(res.data.result.items)))
        .catch (err => console.log ('Error', err))
}

// Get Economic Groups
export const fetchLingoEconomicGroups = economicGroups => ({
    type: GET_LINGO_ECONOMIC_GROUPS,
    economicGroups
  });
  
export const getLingoEconomicGroups = () => dispatch => {
    const filterEconomicGroups = {	
        "name": null,
        "code": null,
        "description": null,
        "active": null,
        "skip": null,
        "take": null	
    }
    service.ApiPosts('economicgroups/search', filterEconomicGroups)
        .then(res => dispatch(fetchLingoEconomicGroups(res.data.result.items.sort((a, b) => (a.name > b.name) ? 1 : -1))))
        .catch (err => console.log ('Error', err))
}

// Get Economic Group Companys
export const fetchLingoEconomicGroupCompanys = economicGroupCompanys => ({
    type: GET_LINGO_ECONOMIC_GROUPS_COMPANYS,
    economicGroupCompanys
  });
  
export const getLingoEconomicGroupCompanys = (economicGroupId) => dispatch => {
    const filterEconomicGroupCompanys = {	
        "pageNumber": 1,
        "pageSize": 100,
        "economicGroupId": Number(economicGroupId),
    }
    service.ApiPosts('companies/search', filterEconomicGroupCompanys)
        .then(res => dispatch(fetchLingoEconomicGroupCompanys(res.data.result.items)))
        .catch (err => console.log ('Error', err))
}

export const getLingoRatingCriterias = () => dispatch => {
    service.get('ratingcriterias?skip=0&take=100&active=true')
        .then(res => dispatch({type: GET_LINGO_RATING_CRITERIAS, ratingCriterias: res.result.items }))
        .catch (err => console.log ('Error', err))
}
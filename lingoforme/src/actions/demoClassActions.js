import {
    GET_DEMOCLASSES,
    GET_DEMOCLASS,
    GET_DEMOCLASS_MESSAGES,
    UNSET_DEMOCLASS,
    LOADING_DEMOCLASS,
    SET_DEMOCLASS_ERROR,
    UNSET_DEMOCLASS_ERROR,
    SET_DEMOCLASS_SUCCESS,
    UNSET_DEMOCLASS_SUCCESS,
    UNSET_DEMOCLASS_LOADING
} from '../helpers/constants'
import moment from 'moment'
import Services from '../components/_api/Services'
const service = new Services()

// All DemoClasses
export const getDemoClasses = (filters) => dispatch => {
    dispatch(loadingDemoClass())
    let objFilter = {}
    // monta o objeto do filter
    for (let key in filters) {
      if(filters[key] && filters[key].value !== undefined){
        objFilter[key] = filters[key].value
      }else if(filters[key] && filters[key].value === undefined){
        objFilter[key] = filters[key];
      }
    }
    objFilter['startAt'] =  objFilter['startAt'] ? moment(objFilter['startAt']).format('YYYY-MM-DD 00:00') : undefined
    objFilter['endAt'] =  objFilter['endAt'] ? moment(objFilter['endAt']).format('YYYY-MM-DD 23:59') : undefined
        console.log("objFilter", objFilter);
  console.log("filters", filters);

  service.ApiGetParams('demoClasses', objFilter)
        .then(res => {
                return  dispatch({ type: GET_DEMOCLASSES, demoClasses: { demoClasses: res.result.items, totalPages: res.result.totalPages, totalFound:res.result.totalFound} })
            }
        )
        .catch(err => {
            dispatch(unsetDemoClassLoading())
        })
};

// Single DemoClass
export const getDemoClass = (demoClassId) => dispatch => {
    dispatch(loadingDemoClass())
    service.get(`demoClasses/${demoClassId}`)
        .then(res => {
            dispatch({ type: GET_DEMOCLASS, demoClass: res.result.items[0]})
            dispatch(getDemoClassMessages(demoClassId))
        })
        .catch(err => {
            dispatch(unsetDemoClassLoading())
        })};

// Add DemoClass
export const addDemoClass = (submitObj) => dispatch => {
    dispatch(loadingDemoClass())
    service.ApiPosts(`DemoClasses`, JSON.parse(JSON.stringify(submitObj)))
        .then(() => {  dispatch(setDemoClassSuccess()) })
        .catch(err => {
            if(err && err.data && err.data.error){
                dispatch(setDemoClassError(err.data.error.message))
            }
            dispatch(unsetDemoClassLoading())
        })};

// Update DemoClass
export const updateDemoClass = (submitObj) => dispatch => {
    dispatch(loadingDemoClass())
    service.ApiPut(`demoClasses/${submitObj.id}`, JSON.parse(JSON.stringify(submitObj)))
        .then(res => {  dispatch(setDemoClassSuccess()) })
        .catch(err => {
            if(err && err.data && err.data.error){
                dispatch(setDemoClassError(err.data.error.message))
            }
            dispatch(unsetDemoClassLoading())
        })};

// Get DemoClass Messages
export const getDemoClassMessages = (demoClassId) => dispatch => {
    service.get(`demoClasses/${demoClassId}/demoClassHistories`)
        .then(res => dispatch({ type: GET_DEMOCLASS_MESSAGES, demoClassMessages: res.result.items }))
        .catch(err => {
            dispatch(unsetDemoClassLoading())
        })
};

// Send DemoClass Message
export const sendDemoClassMessage = (messageObj) => dispatch => {
    const { demoClassId, message } = messageObj
    service.ApiPosts(`demoClasses/${demoClassId}/demoClassHistories`, { message } )
        .then(() => dispatch(getDemoClassMessages(demoClassId)))
        .catch(err => {
            dispatch(unsetDemoClassLoading())
        })};

// DemoClass Loading
export const loadingDemoClass = () => ({
    type: LOADING_DEMOCLASS
});

// Set DemoClass Success
export const setDemoClassSuccess = () => ({
    type: SET_DEMOCLASS_SUCCESS,
});

// Set DemoClass Error
export const setDemoClassError = error => ({
    type: SET_DEMOCLASS_ERROR,
    error
});

// Unset DemoClass
export const unsetDemoClass = () => ({
    type: UNSET_DEMOCLASS,
});

// Unset DemoClass Success
export const unsetDemoClassSuccess = () => ({
    type: UNSET_DEMOCLASS_SUCCESS,
});

// Unset DemoClass Error
export const unsetDemoClassError = () => ({
    type: UNSET_DEMOCLASS_ERROR,
});

// Unset DemoClass Loading
export const unsetDemoClassLoading = () => ({
    type: UNSET_DEMOCLASS_LOADING,
});

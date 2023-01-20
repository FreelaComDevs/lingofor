import { 
  GET_USER_INFO,
  GET_USER_PLANS,
  GET_AVERAGE_RATING,
  GET_NEXT_CLASSES,
  GET_LIST_SEQUENTIAL_CLASSES,
  GET_REQUESTED_CLASSES,
  GET_CLASSES_FOR_RATING,
  SET_CLASSES_FOR_RATING,
  UNSET_CLASSES_FOR_RATING,
} from '../helpers/constants';
import { cap } from '../helpers/helpers'
import moment from 'moment'
import Services from '../components/_api/Services';
const service = new Services();

// Get User Info
export const getUserInfo = () => dispatch => {
  const user = service.getUserFromToken()
  if (!user) { return }
  const { id, name, picture, role } = user
  const userInfo = { id, name, picture, role }
  dispatch({ type: GET_USER_INFO, userInfo })
};

// Get User Plans 
export const getUserPlans = () => dispatch => {
  const user = service.getUserFromToken()
  if (!user || user.role !== "student") { return }
  service.get(`studentplans/get/activeplans?userId=${user.id}`)
    .then(res => dispatch({type: GET_USER_PLANS, plans: res.result.items}))
    .catch(err => { console.log('Erro getting user plans.', err)})
}

// Get User Average Rating
export const getAverageRating = () => (dispatch) => {
  const user = service.getUserFromToken()
  if (!user || user.role !== "teacher") { return }
  service.get(`teachermanagement/getByUser/${user.id}`)
    .then(res => dispatch({type: GET_AVERAGE_RATING, averageRating: res.result.items[0].teachers[0].averageRating }))
    .catch(err => { console.log('Erro getting the average rating.', err)})
}

// Get Next Classes
export const getNextClasses = () => dispatch => {
  
  //const atualDate = service.getLocalTimeFromUtc().subtract(30, "minutes").format("YYYY-MM-DDTHH:mm:ss.sss")//atual
  const atualDate = service.getLocalTimeFromUtcSubtract().format("YYYY-MM-DDTHH:mm:ss.sss")
  //const finalTime = atualDate

  const params = {
    type: "hometop5upcoming",
    pageNumber: 1,
    pageSize: 20,
    startAt: atualDate,
    orderByAsc: "originalScheduledDateTimeUTC",
  }
  service.ApiGetParams(`classSchedules`, params)
    .then(res => dispatch({ type: GET_NEXT_CLASSES, nextClasses: res.result.items}))
    .catch(err => console.log('ERROR ON GET NEXT CLASSES: ', err))    
};



// All Schedule Id
export const listSequentialClassSucess = (listSequentialClass) => ({
  type: GET_LIST_SEQUENTIAL_CLASSES,
  listSequentialClass,
});

// Get Schedule Id
export const getListSequentialClass = async (sequentialScheduleId) => async dispatch => {
  const atualDate = moment().format("YYYY-MM-DDTHH:mm:ss.sss")
  const params = {
    // type: "hometop5upcoming",
    // pageNumber: 1,
    // pageSize: 5,
    // startAt: atualDate,
    orderByAsc: "originalScheduledDateTimeUTC",
    sequentialScheduleId: sequentialScheduleId
  }

 await service.ApiGetParams(`classSchedules`, params)
    .then(res => {
      dispatch(listSequentialClassSucess(res.result.items))
    })
    .catch(err => { console.log ('Error', err); dispatch(listSequentialClassSucess([])) }) 
};


const resArray = [];

// Get Requested Classes (Only for teacher)
export const getRequestedClasses = (pageNumber) => dispatch => {
  const user = JSON.parse(localStorage.getItem("@lingo"))
  if (!user) { return }
  const teacherId = Number(user.teacherId)
  if (!teacherId) { return }
  const params = {
    startAt: service.getLocalTimeFromUtc().format("YYYY-MM-DDTHH:mm:ss.sss"),
    pageNumber: pageNumber || 1, 
    pageSize:10
  }
  service.ApiGetParams(`classSchedules/teacher/${teacherId}`, params)
    .then((res) => {
      console.log('==> RES :: ', res);
      //res.result.totalFound
      resArray.push(res.result.items);
      const totalF = res.result.totalFound;
      let totalP = res.result.totalPages;
      const groupArray = [];
        for(let a = 0; a < resArray.length; a++){
          resArray[a].map((el) =>{
            groupArray.push(el);
          })
        }
        const uniqueArray = [...new Map(groupArray.map((x) => [x.id, x])).values()];
        if(uniqueArray.length === totalF){
          totalP = pageNumber
        }
        return dispatch({ type: GET_REQUESTED_CLASSES, requestedClasses: uniqueArray, totalPages: totalP, totalFound: totalF})
    })
    .catch(err => console.log('ERROR ON GET REQUESTED CLASSES: ', err))
};



// Set Classes for Rating Modal
export const setClassesForRating = ({classesForRating, target}) => dispatch => { 
  if (classesForRating[0][`${target}Rating`]) {
  service.get(`ratings/get${cap(target)}Rating/${classesForRating[0][`${target}Rating`].id}`)
    .then( res => { 
      classesForRating[0].criteriasGrades = res.result.items[0][`${target}CriteriaRatings`].map( item => {
        return ({
          id: item.ratingCriteriaId,
          value: item.grade
        })
      })
      dispatch({ type: SET_CLASSES_FOR_RATING, classesForRating })
    })
    .catch( res => console.log(res))
  } else dispatch({ type: SET_CLASSES_FOR_RATING, classesForRating })
}

// Get Classes for Rating Modal
export const getClassesForRating = () => dispatch => {
  const user = service.getUserFromToken()
  if (!user || (user.role !== "teacher" && user.role !== "student")) { return }
  const { role } = user
  const target = () => {
    if (role === "student") return "teacherRating"
    if (role === "teacher") return "studentRating"
  }
  
  
  const params = {
    pageNumber: 1,
    pageSize: 20,
    // endAt: moment().clone().tz(user.timezone).format("YYYY-MM-DDTHH:mm:ss"),
    status: "done",
    orderByAsc: "originalScheduledDateTimeUTC"
  }

  service.ApiGetParams("ClassScheduleRating", params)
    .then( async res => { 
      if(!res.result.items.length) { return }

      const userJason = await JSON.parse(localStorage.getItem('@lingo'));
      const { role } = userJason
      const targetString = role === "student" ? "teacherRating" : role === "teacher" ? "studentRating" : ""

      let ratingTarget = res.result.items.filter( item =>{
        return item.status !== "canceled"
          && item.status !== "canceledLingo"        
          && item.status !== "pending"
          && item.status !== "noShow" 
          && !item[targetString]
          && item.teacher !== null
      })
      
      if(!ratingTarget) { return }
      ratingTarget = ratingTarget[0]
      let classesForRating = ratingTarget 
        ? res.result.items.filter( item => item.sequentialScheduleId === ratingTarget.sequentialScheduleId)
        : []

      if(classesForRating.length > 0){
        !!classesForRating[0][target()] 
        ? service.get(`ratings/get${cap(target())}/${classesForRating[0][target()].id}`)
          .then( res => {console.log("ress get ratings", res); dispatch({ type: GET_CLASSES_FOR_RATING, classesForRating })})
          .catch( res => console.log(res))
        : dispatch({ type: GET_CLASSES_FOR_RATING, classesForRating })
      }      
    })
    .catch( res => console.log(res))
}

// Send Ratings
export const sendRatings = ({ ratingClassObj, target, action, updateScreen, blockTeacher }) => async dispatch => {
  const url = `ratings/${action}${cap(target)}Rating`
  const callApi = () => {
    if (action === "create") {
      return service.ApiPosts(url, ratingClassObj)
    } else {
      return service.ApiPut(url, ratingClassObj)
    }
  }
  callApi()
    .then(async res => { 
      if(res.data && res.data.success && blockTeacher)
      {
        await service.ApiPosts(`studentManagement/createStudentTeacherRestriction`, blockTeacher)
      }
      updateScreen && updateScreen();
      dispatch(unsetClassesForRating()) 
      dispatch(getClassesForRating()) 
    })
    .catch(err => { console.log(err.response) })
}

// Unset Classes for Rating
export const unsetClassesForRating = () => dispatch => { 
  dispatch({ type: UNSET_CLASSES_FOR_RATING })
  getClassesForRating()
}

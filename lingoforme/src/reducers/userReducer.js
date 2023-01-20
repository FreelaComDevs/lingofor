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
} from '../helpers/constants'

const initialState = { 
  nextClasses: [], 
  listSequentialClass: [], 
  requestedClasses: [], 
  classesForRating: [],
  plans: [],
  id: "", 
  name: "",  
  picture: "", 
  role: "", 
  averageRating: 0,
  pageNumber:1,
  totalPage:0,
  totalPages:0,
  totalFound:0
}

const user = (state = initialState, action) => {
  const { nextClasses, listSequentialClass, requestedClasses, userInfo, plans, averageRating, classesForRating, type, pageNumber, totalPage,totalPages, totalFound } = action;
  switch (type) {
    case GET_USER_INFO:
      return { ...state, ...userInfo }
    case GET_USER_PLANS:
      return { ...state, plans }
    case GET_AVERAGE_RATING:
      return { ...state, averageRating }
    case GET_NEXT_CLASSES:
      return { ...state, nextClasses }
    case GET_LIST_SEQUENTIAL_CLASSES:
      return { ...state, listSequentialClass }
    case GET_REQUESTED_CLASSES:
      return { ...state, requestedClasses, totalPages, totalFound }
    case GET_CLASSES_FOR_RATING:
      return { ...state, classesForRating }
    case SET_CLASSES_FOR_RATING:
      return { ...state, classesForRating }
    case UNSET_CLASSES_FOR_RATING:
      return { ...state, classesForRating: [] }
    default:
      return state;
  }
}

export default user
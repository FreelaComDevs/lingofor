import { GET_TEACHERS, GET_TEACHER, ADD_TEACHER, DELETE_TEACHER, GET_TEACHER_AVAILABILITIES, UPDATE_TEACHER, UNSET_TEACHER } from '../helpers/constants'

const initialState = {
    loading: false,
    teachers: [],
    teacher: "",
}

const teachers = (state = initialState, action) => {
    const { teachers, teacher, teacherId, type } = action;
    switch (type) {
        case GET_TEACHERS:
            return { ...state, teachers , loading: false }
        case GET_TEACHER:
            return { ...state, teacher }
        case UNSET_TEACHER:
            return { ...state, teacher: "" }
        case ADD_TEACHER:
            return { ...state, teachers: [ teacher, ...state.teachers ], teacher, loading: false }
        case DELETE_TEACHER:
            return { ...state, teachers: state.teachers.filter( item => item.id !== teacherId), teacher: "", loading: false }  
        case UPDATE_TEACHER:
            return { ...state, teachers: state.teachers.map( item => item.id !== teacher.id ? item : teacher ), teacher, loading: false }
        default:
            return state;
    }
}

export default teachers
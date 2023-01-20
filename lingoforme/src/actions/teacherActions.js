import Services from '../components/_api/Services'
import { 
    GET_TEACHERS, 
    GET_TEACHER, 
    ADD_TEACHER, 
    DELETE_TEACHER, 
    GET_TEACHER_AVAILABILITIES, 
    UPDATE_TEACHER,
    UNSET_TEACHER,
} from '../helpers/constants'

const service = new Services()

// All Teachers
export const techersFetched = teachers => ({
    type: GET_TEACHERS,
    teachers
  });

export const getTeachers = (objFilter) => dispatch => {
    let newFilter = {};
    newFilter.name = objFilter.name === "" ? null : objFilter.name;
    newFilter.countryId = objFilter.country === "" ? null : Number(objFilter.country);
    newFilter.ratingFrom = objFilter.ratingFrom === "" ? null : Number(objFilter.ratingFrom);
    newFilter.ratingTo = objFilter.ratingTo === "" ? null : Number(objFilter.ratingTo);
    newFilter.active = objFilter.status === "" ? null : objFilter.status === "true" ? true : false;
    newFilter.nativeLanguageId = objFilter.nativeLanguage === "" ? null : Number(objFilter.nativeLanguage);
    newFilter.otherLanguageId = objFilter.otherLanguage === "" ? null : Number(objFilter.otherLanguage);
    newFilter.levelId = objFilter.level === "" ? null : Number(objFilter.level);
    newFilter.firstClass = objFilter.firstClass === "" ? null : objFilter.firstClass === "true" ? true : false;
    newFilter.demoClass = objFilter.demoClass === "" ? null : objFilter.demoClass === "true" ? true : false;
    newFilter.skip = null;
    newFilter.take = null;

    service.ApiPosts('teachermanagement/searchTeacher', newFilter)
      .then(res => dispatch(techersFetched(res.data.result.items)))
      .catch (err => console.log ('Error', err))
}

// Single Teacher
export const teacherFetched = teacher => ({
    type: GET_TEACHER,
    teacher
  });
  
export const getTeacher = (id) => dispatch => {
    console.log(id)
    service.get(`teachermanagement/getbyuser/${id}`)
        .then(res => dispatch(teacherFetched(res.result.items[0])))
        .catch (err => console.log ('Error', err))
}



// Unset Teacher
export const unsetTeacher = () => ({
    type: UNSET_TEACHER,
});

// Delete Teacher
export const teacherRemoved = teacherId => ({
    type: DELETE_TEACHER,
    teacherId
});
  
export const removeTeacher = (teacherId) => dispatch => {
    service.ApiDelete(`teachermanagement/${teacherId}`)
        .then(res => dispatch(teacherRemoved(teacherId)))
        .catch (err => console.log ('Error', err))
}

// Add Teacher
export const teacherAdded = teacher => ({
    type: ADD_TEACHER,
    teacher
  });
  
export const addTeacher = () => {
    const obj = {
        name: "",
        nativeLanguage: "",
        otherLanguage: "",
        country: "",
        level: "",
        firstClass: "",
        demoClass: "",
        ratingFrom: "",
        ratingTo: "",
        status: "",
    }
    return getTeachers(obj)
}

// Update Teacher
export const teacherUpdated = teacher => ({
    type: UPDATE_TEACHER,
    teacher
  });
  
export const updateTeacher = teacher => {
    return teacherUpdated(teacher)
}
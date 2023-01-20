import { 
    GET_DEMOCLASSES,
    GET_DEMOCLASS,
    ADD_DEMOCLASS,
    GET_DEMOCLASS_MESSAGES,
    UPDATE_DEMOCLASS,
    UNSET_DEMOCLASS,
    LOADING_DEMOCLASS,
    SET_DEMOCLASS_ERROR,
    UNSET_DEMOCLASS_ERROR,
    SET_DEMOCLASS_SUCCESS,
    UNSET_DEMOCLASS_SUCCESS ,
    UNSET_DEMOCLASS_LOADING
} from '../helpers/constants'

const initialState = {
    demoClasses: [],
    demoClassMessages: [],
    demoClass: "",
    loading: false,
    success: false,
    error: ""
}

const demoClasses = (state = initialState, action) => {
    const { demoClasses, demoClass, type, demoClassMessages, error } = action;
    switch (type) {
        case LOADING_DEMOCLASS:
            return { ...state, loading: true }
        case UNSET_DEMOCLASS_LOADING:
            return { ...state, loading: false }
        case GET_DEMOCLASSES:
            return { ...state, demoClasses, loading: false }
        case SET_DEMOCLASS_ERROR:
            return { ...state, error }
        case UNSET_DEMOCLASS_ERROR:
            return { ...state, error: "" }
        case SET_DEMOCLASS_SUCCESS:
            return { ...state, success: true, }
        case UNSET_DEMOCLASS_SUCCESS:
            return { ...state, success: false }
        case GET_DEMOCLASS:
            return { ...state, demoClass, loading: false }
        case GET_DEMOCLASS_MESSAGES:
            return { ...state, demoClassMessages }
        case ADD_DEMOCLASS:
            return { ...state, demoClasses: [ demoClass, ...state.demoClasses ], demoClass, loading: false }
        case UNSET_DEMOCLASS:
            return { ...state, demoClass: "" }  
        case UPDATE_DEMOCLASS:
            return { ...state, demoClasses: state.demoClasses.map( item => item.id !== demoClass.id ? item : demoClass ), demoClass, loading: false }
        default:
            return state;
    }
}

export default demoClasses
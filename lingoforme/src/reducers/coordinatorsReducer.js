import { GET_COORDINATORS, GET_COORDINATOR } from '../helpers/constants'

const initialState = {
    loading: false,
    coordinators: [],
    coordinator: "",
}

const coordinators = (state = initialState, action) => {
    const { coordinators, coordinator, type } = action;
    switch (type) {
      case GET_COORDINATORS:
        return { ...state, coordinators , loading: false }
      case GET_COORDINATOR:
          return { ...state, coordinator , loading: false }
        default:
            return state;
    }
}

export default coordinators

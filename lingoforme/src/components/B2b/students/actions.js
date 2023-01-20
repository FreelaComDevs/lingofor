export const setStudents = items => dispatch => {
    dispatch({
        type: 'SET_STUDENTS',
        data: items
    })
}

export const setStudent = (item, contractId) => dispatch => {
  dispatch({
      type: 'SET_STUDENT',
      data: { item, contractId }
  })
}

export const changeItem = item => dispatch => {
  dispatch({
      type: 'CHANGE_ITEM',
      data: item
  })
}

  export const clearStudent = (item, contractId) => dispatch => {
    dispatch({
        type: 'CLEAR_STUDENT',
        data: { item, contractId }
    })
  }


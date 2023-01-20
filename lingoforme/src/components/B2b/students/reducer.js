const initialState = {
  students: [],
  student: {
    id: '',
    name: '',
    email: '',
    userEmails: [],
    userPhones: [{
      phone: '',
      userPhoneTypeId: 3
    }],
    address: '',
    countryId: '',
    gender: 'male',
    birthDate: '',
    timezone: '',
    active: true,
    studentPlanId: '',
    studentPlanLanguages: [],
    studentLanguages: [{
      languageId: '',
      isNative: true
    }],
    studentB2b: {
      allowBuyExtraClasses: false,
      allowChangeCourseFocus: false,
      allowChangeCourseStruct: false,
      allowChangeClassFocus: false,
      allowChangeLingoPlan: false,
      targetClassesPerMonth: '',
      observation: ''
    },
    contractId: '',  // usado apenas para listar os planos
    contractPlanId: '',
    contractPlanStudent: {
      contractPlanId: ''
    },
    contractStudentId: '',
    classTool: '',
    classToolId: ''
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_STUDENTS': {
      return {
        ...state,
        students: action.data
      }
    }

    case 'SET_STUDENT': {
      let student = {...initialState.student};
      if (action.data.item) {
        student = {...action.data.item};
      }
      student.contractId = action.data.contractId;
      return {
        ...state,
        student
      }
    }

    case 'CLEAR_STUDENT':{
      let student = {...initialState.student};
      if (action.data.item) {
        student = {...action.data.item};
      }
      student.contractId = action.data.contractId;
      return {
        ...state,
        student : {
          ...student,
          userPhones: [{
            phone: '',
            userPhoneTypeId: 3
          }],
          studentPlanLanguages: [],
          studentLanguages: [{
            languageId: '',
            isNative: true
          }],
          studentB2b: {
            allowBuyExtraClasses: false,
            allowChangeCourseFocus: false,
            allowChangeCourseStruct: false,
            allowChangeClassFocus: false,
            allowChangeLingoPlan: false,
            targetClassesPerMonth: '',
            observation: ''
          },
          contractPlanStudent: {
            contractPlanId: ''
          },
        }
      }
    }

    case 'CHANGE_ITEM': {
      const student = {
        ...state.student,
        ...action.data
      };
      return {
        ...state,
        student
      };
    }

    default:
       return state;

  }
}

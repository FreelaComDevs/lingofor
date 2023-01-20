export default class StudentService {
 
  getStudentFrom(item) {
    const student = item.students[0];
    console.log('StudentService => getStudentFrom full student', student)
    const studentPlans = this._getFirstItemFrom(student.studentPlans);    
    const studentB2b = this._getFirstItemFrom(student.studentB2bs);
    const contractStudent = this._getFirstItemFrom(student.contractStudents);
    const userEmails = item.userEmails.map(l => {
      return { id: l.id, email: l.email.toLowerCase(), notify: l.notify };
    });
    const userPhones = item.userPhones.map(p => {
      return { id: p.id, userPhoneTypeId: p.userPhoneTypeId, phone: p.phone };
    });
    const studentLanguages = student.studentLanguages.map(l => {
      return { languageId: l.languageId, isNative: l.isNative };
    });
    const contractPlanStudent = this._getFirstItemFrom(student.contractPlanStudents);

    let studentPlanLanguages = []
    if(studentPlans.studentPlanLanguages && studentPlans.studentPlanLanguages.length > 0){
      studentPlanLanguages = studentPlans.studentPlanLanguages.map(l => {
        let studentLanguageLevelId,studentLanguageLevel = undefined
        if(student.studentLevelGrades){
          const levelBylanguage = student.studentLevelGrades.filter(lg => lg.lingoLanguageId === l.lingoLanguageId)
          if(levelBylanguage.length > 0){
            studentLanguageLevelId = levelBylanguage[0].id
            studentLanguageLevel = levelBylanguage[0].levelId
          }            
        }

        return {
          id: l.id,
          lingoLanguageId: l.lingoLanguageId,
          focus: l.focus,
          struct: l.struct,
          studentLanguageLevelId: studentLanguageLevelId,
          studentLanguageLevel : studentLanguageLevel
        }
      });
    }else{
      studentPlanLanguages = [{
        lingoLanguageId: '',
        focus: 'traditional',
        struct: 'balanced',        
        studentLanguageLevel : ''
      }]
    }    
    //const level = this._getFirstItemFrom(student.studentLevelGrades);
    //const studentPlanLanguages = this._getFirstItemFrom(studentPlans.studentPlanLanguages);

    return {
      id: item.id,
      name: item.name,
      email: item.email.toLowerCase(),
      picture: item.picture,
      userEmails,
      userPhones,
      address: item.address,
      countryId: item.countryId,
      gender: item.gender,
      birthDate: item.birthDate,
      timezone: item.timezone,
      active: item.active,
      studentId: student.id,
      studentPlanId: studentPlans.id,
      classTool: student.classTool ? student.classTool : '',
      classToolId: student.classToolId ? student.classToolId : '',
      studentPlanLanguages,
      studentLanguages,
      studentB2b: {
        id: studentB2b.id,
        allowBuyExtraClasses: studentB2b.allowBuyExtraClasses,
        allowChangeCourseFocus: studentB2b.allowChangeCourseFocus,
        allowChangeCourseStruct: studentB2b.allowChangeCourseStruct,
        allowChangeClassFocus: studentB2b.allowChangeClassFocus,
        allowChangeLingoPlan: studentB2b.allowChangeLingoPlan,
        targetClassesPerMonth: studentB2b.targetClassesPerMonth,
        observation: studentB2b.observation
      },
      contractPlanId: contractPlanStudent.contractPlanId, // POST
      contractPlanStudent: {
        id: contractPlanStudent.id,
        contractPlanId: contractPlanStudent.contractPlanId
      },
      contractStudentId: contractStudent.id
     
    };
  }

  deepChange({ original, field, value }) {
    const keys = field.split('.')
    let obj = {...original};
    const length = keys.length;

    switch (length) {
      case 1: {
        obj[keys[0]] = value;
        break;
      }

      case 2: {
        obj[keys[0]][keys[1]] = value;
        break;
      }

      case 3: {
        obj[keys[0]][keys[1]][keys[2]] = value;
        break;
      }

      default: {
        return {};
      }
    }
    return obj
  }

  prepare(item) {
    const student = {...item};
    delete student.contractId;
    delete student.file;
    delete student.picture;
    student.contractPlanId = parseInt(student.contractPlanId);
    if (student.id > 0) {
      student.contractPlanStudent.contractPlanId = student.contractPlanId;
      delete student.levelId;
      delete student.contractPlanId;
    } else {
      delete student.id;
      delete student.studentPlanId;
      delete student.contractPlanStudent;
      delete student.contractStudentId;
     
    }
    delete student.studentPlanLanguage;

    student.countryId = parseInt(student.countryId);
    student.userPhones = student.userPhones.map(i => {
      return {
        phone: i.phone,
        userPhoneTypeId: parseInt(i.userPhoneTypeId)
      };
    });

    student.studentLanguages = student.studentLanguages.map(i => {
      return {
        isNative: i.isNative,
        languageId: parseInt(i.languageId)
      };
    });

    if (student.studentB2b.targetClassesPerMonth) {
      student.studentB2b.targetClassesPerMonth = parseInt(student.studentB2b.targetClassesPerMonth);
    }
    //path:"studentPlanLanguages.0.studentLevelGradeId"

    // const { studentLevelGrade } = student;
    // if (studentLevelGrade && studentLevelGrade.levelId) {
    //   student.studentLevelGrade.levelId = parseInt(studentLevelGrade.levelId);
    // }

    //student.studentPlanLanguage.lingoLanguageId = parseInt(student.studentPlanLanguage.lingoLanguageId);

    return student;
  }

  getEmptyFilter() {
    return {
      pageNumber: 1,
      pageSize: 1000,
      name: '',
      email: '',
      active: ''
    }
  }

  _getFirstItemFrom(arr) {
    if (arr && arr.length > 0) {
      return arr[0];
    }
    return {};
  }
}

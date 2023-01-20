import { expect } from 'chai';
import StudentService from './service';


describe('StudentService', () => {

  describe('#getStudentFrom', () => {
    it('Deve obter um student para usar na atualizacao', () => {
      const itemFromSearchAPI = {
        "id": 436,
        "name": "Jefferson Mascarenhas",
        "email": "jefferson.mascarenhas@enterprise.com",
        "paypalEmail": null,
        "address": "Rua Dalvo Trombeta, 171",
        "countryId": 212,
        "timezone": "America/Sao Paulo",
        "picture": null,
        "gender": "male",
        "role": "student",
        "birthDate": "1970-04-01",
        "active": false,
        "firstAccess": true,
        "defaultPasswordChanged": false,
        "updatedAt": "2019-01-17T12:26:21.560Z",
        "createdAt": "2019-01-16T20:08:07.093Z",
        "deletedAt": null,
        "country": {
          "id": 212,
          "name": "United States",
          "updatedAt": "2018-12-06T00:00:00.000Z",
          "createdAt": "2018-12-06T00:00:00.000Z",
          "deletedAt": null
        },
        "userEmails": [{
          "id": 458,
          "userId": 436,
          "email": "matheus.duscov@blendmobi.com",
          "notify": true,
          "updatedAt": "2019-01-17T00:17:23.759Z",
          "createdAt": "2019-01-17T00:17:23.759Z",
          "deletedAt": null
        }],
        "userPhones": [{
          "id": 991,
          "userId": 436,
          "userPhoneTypeId": 3,
          "phone": "1111111111111",
          "updatedAt": "2019-01-17T00:17:23.777Z",
          "createdAt": "2019-01-17T00:17:23.777Z",
          "deletedAt": null
        }],
        "students": [{
          "id": 135,
          "userId": 436,
          "scheduleOnlyWithFavorite": false,
          "averageRating": 0,
          "active": true,
          "updatedAt": "2019-01-16T20:08:07.676Z",
          "createdAt": "2019-01-16T20:08:07.676Z",
          "deletedAt": null,
          "studentB2bs": [{
            "id": 3,
            "studentId": 135,
            "allowBuyExtraClasses": false,
            "allowChangeCourseFocus": false,
            "allowChangeCourseStruct": false,
            "allowChangeClassFocus": false,
            "allowChangeLingoPlan": false,
            "targetClassesPerMonth": 8,
            "observation": "",
            "updatedAt": "2019-01-17T00:17:23.851Z",
            "createdAt": "2019-01-16T20:08:07.735Z",
            "deletedAt": null
          }],
          "studentLanguages": [{
            "id": 88,
            "studentId": 135,
            "languageId": 212,
            "isNative": true,
            "updatedAt": "2019-01-17T00:17:23.812Z",
            "createdAt": "2019-01-17T00:17:23.812Z",
            "deletedAt": null,
            "language": {
              "id": 212,
              "name": "Portuguese",
              "updatedAt": "2018-11-29T17:37:17.028Z",
              "createdAt": "2018-11-29T17:37:17.028Z",
              "deletedAt": null
            }
          }],
          "studentPlans": [{
            "id": 231,
            "studentId": 135,
            "planId": 19,
            "availableClasses": 0,
            "updatedAt": "2019-01-17T00:17:23.820Z",
            "createdAt": "2019-01-16T20:08:07.706Z",
            "deletedAt": null,
            "studentPlanLanguages": [{
              "id": 287,
              "studentPlanId": 231,
              "lingoLanguageId": 10,
              "focus": "traditional",
              "struct": "balanced",
              "randomFixedTeachers": "random",
              "studentLanguageLevel": "none",
              "updatedAt": "2019-01-17T00:17:23.828Z",
              "createdAt": "2019-01-16T20:08:07.715Z",
              "deletedAt": null
            }],
            "plan": {
              "id": 19,
              "nameEnglish": "Limited 8 One-Lingo",
              "nameSpanish": "Limited 8 One-Lingo",
              "namePortuguese": "Limited 8 One-Lingo",
              "descriptionEnglish": "8 hours per month (16 classes - 30 min each)",
              "descriptionSpanish": "8 horas por mes  (16 clases de 30 min cada)",
              "descriptionPortuguese": "8 horas por mês  (16 aulas de 30 min cada)",
              "totalClasses": 16,
              "unlimited": false,
              "active": true,
              "updatedAt": "2018-12-21T14:55:27.255Z",
              "createdAt": "2018-12-08T00:54:09.518Z",
              "deletedAt": null
            }
          }],
          "contractStudents": [{
            "id": 3,
            "contractId": 9,
            "studentId": 135,
            "updatedAt": "2019-01-16T20:08:07.744Z",
            "createdAt": "2019-01-16T20:08:07.744Z",
            "deletedAt": null,
            "contract": {
              "id": 9,
              "code": "xpto update",
              "description": "xpto update",
              "companyId": 12,
              "startDate": "2019-01-01",
              "endDate": "2050-12-31",
              "active": true,
              "updatedAt": "2019-01-22T11:35:46.366Z",
              "createdAt": "2019-01-09T20:24:25.733Z",
              "deletedAt": null
            }
          }],
          "studentLevelGrades": [{
            "id": 67,
            "studentId": 135,
            "lingoLanguageId": 10,
            "levelId": 1,
            "oralGrade": 0,
            "writingGrade": 0,
            "dictationGrade": 0,
            "averageGrade": 0,
            "updatedAt": "2019-01-23T15:33:59.652Z",
            "createdAt": "2019-01-16T20:08:07.724Z",
            "deletedAt": null
          }],
          "contractPlanStudents": [{
            "id": 1,
            "contractPlanId": 9,
            "studentId": 135,
            "updatedAt": "2019-01-23T15:33:59.668Z",
            "createdAt": "2019-01-16T20:08:07.751Z",
            "deletedAt": null
          }]
        }]
      };
      const service = new StudentService();
      const result = service.getStudentFrom(itemFromSearchAPI);
  
      const expected = {
        "id": 436,
        "name": "Jefferson Mascarenhas",
        "email": "jefferson.mascarenhas@enterprise.com",
        "picture": null,
        "userEmails": [{
          "id": 458,
          "email": "matheus.duscov@blendmobi.com",
          "notify": true
        }],
        "userPhones": [{
          "id": 991,
          "userPhoneTypeId": 3,
          "phone": "1111111111111"
        }],
        "address": "Rua Dalvo Trombeta, 171",
        "countryId": 212,
        "gender": "male",
        "birthDate": "1970-04-01",
        "timezone": "America/Sao Paulo",
        "active": false,
        "studentId": 135,
        "studentPlanId": 231,
        "studentPlanLanguage": {
          "id": 287,
          "lingoLanguageId": 10,
          "focus": "traditional",
          "struct": "balanced"
        },
        "levelId": 1,
        "studentLevelGrade": {
          "id": 67,
          "levelId": 1
        },
        "studentLanguages": [{
          "languageId": 212,
          "isNative": true
        }],
        "studentB2b": {
          "id": 3,
          "allowBuyExtraClasses": false,
          "allowChangeCourseFocus": false,
          "allowChangeCourseStruct": false,
          "allowChangeClassFocus": false,
          "allowChangeLingoPlan": false,
          "targetClassesPerMonth": 8,
          "observation": ""
        },
        "contractPlanId": 9,
        "contractPlanStudent": {
          "id": 1,
          "contractPlanId": 9
        },
        "contractStudentId": 3
      };
  
      expect(result.id).to.equal(expected.id);
      expect(result.name).to.equal(expected.name);
      expect(result.email).to.equal(expected.email);
      expect(result.picture).to.equal(expected.picture);
      expect(result.userEmails).to.deep.equal(expected.userEmails);
      expect(result.userPhones).to.deep.equal(expected.userPhones);
      expect(result.address).to.equal(expected.address);
      expect(result.countryId).to.equal(expected.countryId);
      expect(result.gender).to.equal(expected.gender);
      expect(result.birthDate).to.equal(expected.birthDate);
      expect(result.timezone).to.equal(expected.timezone);
      expect(result.active).to.equal(expected.active);
      expect(result.studentPlanId).to.equal(expected.studentPlanId);
      expect(result.studentPlanLanguage).to.deep.equal(expected.studentPlanLanguage);
      expect(result.levelId).to.equal(expected.levelId);
      expect(result.studentLanguages).to.deep.equal(expected.studentLanguages);
      expect(result.studentB2b).to.deep.equal(expected.studentB2b);
      expect(result.contractPlanStudent).to.deep.equal(expected.contractPlanStudent);
      expect(result.contractPlanId).to.equal(expected.contractPlanId);
      expect(result.contractStudentId).to.equal(expected.contractStudentId);
      expect(result.studentLevelGrade).to.deep.equal(expected.studentLevelGrade);
      expect(result).to.deep.equal(expected);
    });
  });
  
  describe('#deepChange', () => {
    it('deve alterar o objeto em profundidade de acordo com a string passada', () => {
      const service = new StudentService();
      const original = {
        studentB2b: {
          allowBuyExtraClasses: false
        }
      };

      const result = service.deepChange({
        original,
        field: 'studentB2b.allowBuyExtraClasses',
        value: true
      });

      expect(result.studentB2b.allowBuyExtraClasses).to.be.true;
    });
  });

});


import { expect } from 'chai';
import util from './util'

describe('Dashboard Util', () => {
  it('#getNewStudents', () => {
    const original = [
      {
        "id": 19,
        "nameEnglish": "Limited 8 One-Lingo",
        "nameSpanish": "Limited 8 One-Lingo",
        "namePortuguese": "Limited 8 One-Lingo",
        "planLanguages": [
          {
            "id": 325,
            "planId": 19,
            "lingoLanguageId": 10,
            "lingoLanguage": {
              "id": 10,
              "flag": "BR",
              "description": "Português"
            },
            "studentPlans": 3
          },
          {
            "id": 326,
            "planId": 19,
            "lingoLanguageId": 13,
            "lingoLanguage": {
              "id": 13,
              "flag": "US",
              "description": "English"
            },
            "studentPlans": 1
          },
          {
            "id": 327,
            "planId": 19,
            "lingoLanguageId": 15,
            "lingoLanguage": {
              "id": 15,
              "flag": "ES",
              "description": "Spanish"
            },
            "studentPlans": 0
          }
        ],
        "studentPlans": 4
      },
      {
        "id": 57,
        "nameEnglish": "Unlimited Multi-Lingo",
        "nameSpanish": "Unlimited Multi-Lingo",
        "namePortuguese": "Unlimited Multi-Lingo",
        "planLanguages": [
          {
            "id": 329,
            "planId": 57,
            "lingoLanguageId": null,
            "lingoLanguage": null,
            "studentPlans": 0
          }
        ],
        "studentPlans": 0
      },
      {
        "id": 80,
        "nameEnglish": "Unlimited One-Lingo",
        "nameSpanish": "Unlimited One-Lingo",
        "namePortuguese": "Unlimited One-Lingo",
        "planLanguages": [
          {
            "id": 354,
            "planId": 80,
            "lingoLanguageId": 10,
            "lingoLanguage": {
              "id": 10,
              "flag": "BR",
              "description": "Português"
            },
            "studentPlans": 5
          },
          {
            "id": 355,
            "planId": 80,
            "lingoLanguageId": 15,
            "lingoLanguage": {
              "id": 15,
              "flag": "ES",
              "description": "Spanish"
            },
            "studentPlans": 0
          }
        ],
        "studentPlans": 5
      },
      {
        "id": 1,
        "nameEnglish": "Limited 4 One-Lingo",
        "nameSpanish": "Limited 4 One-Lingo",
        "namePortuguese": "Limited 4 One-Lingo",
        "planLanguages": [
          {
            "id": 359,
            "planId": 1,
            "lingoLanguageId": 10,
            "lingoLanguage": {
              "id": 10,
              "flag": "BR",
              "description": "Português"
            },
            "studentPlans": 6
          },
          {
            "id": 360,
            "planId": 1,
            "lingoLanguageId": 13,
            "lingoLanguage": {
              "id": 13,
              "flag": "US",
              "description": "English"
            },
            "studentPlans": 6
          },
          {
            "id": 361,
            "planId": 1,
            "lingoLanguageId": 15,
            "lingoLanguage": {
              "id": 15,
              "flag": "ES",
              "description": "Spanish"
            },
            "studentPlans": 4
          }
        ],
        "studentPlans": 16
      },
      {
        "id": 102,
        "nameEnglish": "Limited 20 One-Lingo",
        "nameSpanish": "Limited 20 One-Lingo",
        "namePortuguese": "Limited 20 One-Lingo",
        "planLanguages": [
          {
            "id": 370,
            "planId": 102,
            "lingoLanguageId": 41,
            "lingoLanguage": {
              "id": 41,
              "flag": "BY",
              "description": "Afrika"
            },
            "studentPlans": 1
          },
          {
            "id": 371,
            "planId": 102,
            "lingoLanguageId": 47,
            "lingoLanguage": {
              "id": 47,
              "flag": "KR",
              "description": "Korean"
            },
            "studentPlans": 0
          },
          {
            "id": 372,
            "planId": 102,
            "lingoLanguageId": 15,
            "lingoLanguage": {
              "id": 15,
              "flag": "ES",
              "description": "Spanish"
            },
            "studentPlans": 0
          }
        ],
        "studentPlans": 1
      },
      {
        "id": 77,
        "nameEnglish": "Nome teste",
        "nameSpanish": "teste Name",
        "namePortuguese": "Nome tete",
        "planLanguages": [],
        "studentPlans": 0
      }
    ];
    const expected = [
      ['', 'BR', 'US', 'ES', 'Total'],
      ['Limited 8 One-Lingo', 3, 1, 0, 4],
      ['Unlimited Multi-Lingo', 0, 0, 0, 0],
      ['Unlimited One-Lingo', 5, 0, 0, 5],
      ['Limited 4 One-Lingo', 6, 6, 4, 16],
      ['Limited 20 One-Lingo', 1, 0, 0, 1],
      ['Nome teste', 0, 0, 0, 0]
    ];
    const result = util.getNewStudents(original);
    console.log(result)
    expect(result).to.deep.equal(expected);
  })
})

import { expect } from 'chai';
import CompanyService from './service';


describe('CompanyService', () => {

    it('Deve criar uma lista de empresas para um determinado economic group', () => {
        const data = [{
            "id": 1,
            "socialName": "company1",
            "economicGroupId": 23,
            "companyResponsibleContacts": [],
            "economicGroup": {
                "id": 23,
                "name": "ITAU Chile"
            }
        }, {
            "id": 2,
            "socialName": "company2",
            "economicGroupId": 23,
            "companyResponsibleContacts": [],
            "economicGroup": {
                "id": 23,
                "name": "ITAU Chile"
            }
        }, {
            "id": 3,
            "socialName": "company3",
            "economicGroupId": 20,
            "companyResponsibleContacts": [],
            "economicGroup": {
                "id": 20,
                "name": "Claro"
            }
        }, {
            "id": 4,
            "socialName": "company4",
            "economicGroupId": 23,
            "companyResponsibleContacts": [],
            "economicGroup": {
                "id": 23,
                "name": "ITAU Chile"
            }
        }];

        const expected = [{
            id: 23,
            name: 'ITAU Chile',
            companies: [{
                id: 1,
                name: 'company1',
                economicGroupId: 23
            }, {
                id: 2,
                name: 'company2',
                economicGroupId: 23
            }, {
                id: 4,
                name: 'company4',
                economicGroupId: 23
            }]
        }, {
            id: 20,
            name: 'Claro',
            companies: [{
                id: 3,
                name: 'company3',
                economicGroupId: 20
            }]
        }];
        const service = new CompanyService();
        const result = service.extractEconomicGroupsFromCompanies(data);
        expect(result.length).to.equal(expected.length);
        expect(result).to.deep.equal(expected);
    });
});
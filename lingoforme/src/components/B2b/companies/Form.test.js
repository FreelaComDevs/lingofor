import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { CompanyForm } from './Form';
import CompanyService from './service';
import sinon from 'sinon';


const fake = {
    economicGroups: [
        { id: 1, name: 'Claro' },
        { id: 2, name: 'Vivo' }
    ],

    countries: [
        { id: 1, name: 'Brazil' },
        { id: 2, name: 'Belize' }
    ]
}

describe('CompanyForm', () => {
    const initialState = Object.assign({}, new CompanyService().getEmptyCompany(), {
        economicGroups: fake.economicGroups,
        countries: fake.countries
    });

    const trigger = (name, value, index = 0) => {
        return {
            target: {
                name,
                value,
                dataset: {
                    index
                },
                preventDefault: () => {}
            }
        }
    }

    const service = {
        getEmptyCompany: () => {
            return initialState;
        },
        getEmptyContact: () => {
            return new CompanyService().getEmptyContact()
        },
        fetchEconomicGroups: (callback) => {
            callback(fake.economicGroups);
        },
        fetchCountries: (callback) => {
            callback(fake.countries);
        },
        save: sinon.spy()
    }

    const mocks = { service, setParentState: sinon.spy() };

    const deps = {
        util: mocks.util,
        service: mocks.service,
        setParentState: mocks.setParentState
    };

    it('Deve preencher o state inicial', () => {
        const component = mount(
            <CompanyForm
                {...deps}
                t={(s) => s} />
        );
        expect(initialState).to.deep.equal(component.state());
    });

    it('Deve limpar os filtros quando clicar no botao back', () => {
        const component = mount(
            <CompanyForm
                {...deps}
                t={(s) => s} />
        );
        component
            .find('input[name="socialName"]')
            .prop('onChange')(trigger('socialName', 'BlendIT'));
        
        const changedState = Object.assign({}, initialState, {
            socialName: 'BlendIT'
        });
        expect(changedState).to.deep.equal(component.state());

        component.find('button.btn-back').simulate('click');
        expect(initialState).to.deep.equal(component.state());
    });

    it('Deve enviar os dados para a API via POST', () => {
        const component = mount(
            <CompanyForm
                {...deps}
                t={(s) => s} />
        );

        const data = {
            socialName: 'BlendIT',
            fantasyName: 'Blendmobi',
            documentNumber: '346546546',
            countryId: fake.countries[0].id,
            economicGroupId: fake.economicGroups[0].id,
            address: 'Rua Jaceru, 384',
            registerDate: '2019-01-10',
            active: true,
            companyResponsibleContacts: [{
                name: 'Bob',
                email: 'bob@gmail.com',
                commercialPhone: '123456',
                mobilePhone: '678902'
            }]
        };
        const contact = data.companyResponsibleContacts[0]

        component
            .find('select[name="economicGroupId"]')
            .prop('onChange')(trigger('economicGroupId', data.economicGroupId));

        component
            .find('input[name="socialName"]')
            .prop('onChange')(trigger('socialName', data.socialName));
        
        component
            .find('input[name="fantasyName"]')
            .prop('onChange')(trigger('fantasyName', data.fantasyName));

        component
            .find('input[name="documentNumber"]')
            .prop('onChange')(trigger('documentNumber', data.documentNumber));
        component
            .find('input[name="address"]')
            .prop('onChange')(trigger('address', data.address));
        
        component
            .find('select[name="countryId"]')
            .prop('onChange')(trigger('countryId', data.countryId));
        
        component
            .find('input[name="registerDate"]')
            .prop('onChange')(trigger('registerDate', data.registerDate));
        
        component.find('button.btn-add-field').simulate('click');

        component
            .find('input.name_0')
            .prop('onChange')(trigger('name', contact.name));
        
        component
            .find('input.email_0')
            .prop('onChange')(trigger('email', contact.email));
        
        component
            .find('input.commercialPhone_0')
            .prop('onChange')(trigger('commercialPhone', contact.commercialPhone));

        component
            .find('input.mobilePhone_0')
            .prop('onChange')(trigger('mobilePhone', contact.mobilePhone));
        
        const changedState = Object.assign({}, initialState, data);
        expect(changedState).to.deep.equal(component.state());

    });

});

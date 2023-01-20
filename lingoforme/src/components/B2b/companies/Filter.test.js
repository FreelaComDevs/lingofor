import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { CompaniesFilter } from './Filter';
import CompanyService from './service';
import sinon from 'sinon';


const fake = {
    economicGroups: [
        { id: 1, name: 'Claro' },
        { id: 2, name: 'Vivo' }
    ],

    filterDates: [
        { value: '2018-11-01', description: 'November/2018' },
        { value: '2018-12-01', description: 'December/2018' }
    ]
}

describe('CompaniesFilter', () => {
    const initialState = Object.assign({}, new CompanyService().getEmptyFilter(), {
        filterDates: fake.filterDates,
        economicGroups: fake.economicGroups
    });

    const trigger = (name, value) => {
        return {
            target: {
                name,
                value,
                preventDefault: () => {}
            }
        }
    }

    const util = {
        getListOfFilterDates: () => {
            return fake.filterDates;
        }
    }

    const service = {
        getEmptyFilter: () => {
            return initialState;
        },
        fetchEconomicGroups: (callback) => {
            callback(fake.economicGroups);
        },
        fetchCompanies: sinon.spy()
    }

    const mocks = { util, service, setParentState: sinon.spy() };

    const deps = {
        util: mocks.util,
        service: mocks.service,
        setParentState: mocks.setParentState
    };

    it('Deve preencher o state inicial', () => {
        const component = mount(
            <CompaniesFilter
                {...deps}
                t={(s) => s} />
        );
        expect(initialState).to.deep.equal(component.state());
    });

    it('Deve alterar no state o id do grupo economico quando for selecionado', () => {
        const selected = fake.economicGroups[1].id;
        const component = mount(
            <CompaniesFilter
                {...deps}
                t={(s) => s} />
        );
        component
            .find('select[name="economicGroupId"]')
            .prop('onChange')(trigger('economicGroupId', selected))
        
        expect(component.state().economicGroupId).to.equal(selected);
    });

    it('Deve exibir possiveis datas do periodo inicial', () => {
        const expected = '<select name="registerDateFrom"><option value="">Select</option><option value="2018-11-01">November/2018</option><option value="2018-12-01">December/2018</option></select>';
        const component = mount(
            <CompaniesFilter
                {...deps}
                t={(s) => s} />
        );
        const dropdown = component.find('select[name="registerDateFrom"]');
        expect(expected).to.equal(dropdown.html());
    });

    it('Deve exibir possiveis datas do periodo final', () => {
        const expected = '<select name="registerDateTo"><option value="">Select</option><option value="2018-11-01">November/2018</option><option value="2018-12-01">December/2018</option></select>';
        const component = mount(
            <CompaniesFilter
                {...deps}
                t={(s) => s} />
        );
        const dropdown = component.find('select[name="registerDateTo"]');
        expect(expected).to.equal(dropdown.html());
    });

    it('Deve limpar os filtros quando clicar no botao', () => {
        const component = mount(
            <CompaniesFilter
                {...deps}
                t={(s) => s} />
        );
        component
            .find('input[name="responsibleName"]')
            .prop('onChange')(trigger('responsibleName', 'BlendIT'));
        
        component
            .find('select[name="economicGroupId"]')
            .prop('onChange')(trigger('economicGroupId', 1));

        component
            .find('select[name="registerDateFrom"]')
            .prop('onChange')(trigger('registerDateFrom', '2018-12-01'));

        component
            .find('select[name="registerDateTo"]')
            .prop('onChange')(trigger('registerDateTo', '2019-01-01'));
        
        component
            .find('select[name="active"]')
            .prop('onChange')(trigger('active', 'false'));
        
        const changedState = Object.assign({}, initialState, {
            responsibleName: 'BlendIT',
            economicGroupId: 1,
            registerDateFrom: '2018-12-01',
            registerDateTo: '2019-01-01',
            active: 'false'
        });
        expect(changedState).to.deep.equal(component.state());

        component.find('button.btn-clear-filter').simulate('click');
        expect(initialState).to.deep.equal(component.state());

        expect(mocks.service.fetchCompanies.calledOnce).to.be.true;
    });

});

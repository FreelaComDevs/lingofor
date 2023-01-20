import { expect } from 'chai';
import sinon from 'sinon';
import util from './util';


describe('Util', () => {
    let clock;

    beforeEach(() => {
        const now = new Date(Date.UTC(2019,1,5,15,0,0,0))
        clock = sinon.useFakeTimers(now.getTime());
    });

    afterEach(() => {
        clock.restore();
    });

    it('Deve exibir os ultimos 6 meses até hoje no periodo inicial', () => {
        const expected = [{
            value: '2019-01-01',
            description: 'January/2019'
        }, {
            value: '2019-02-01',
            description: 'February/2019'
        }];
        const result = util.getListOfFilterDates();
        expect(expected.length).to.equal(result.length);
        expect(expected).to.deep.equal(result);
    });
});
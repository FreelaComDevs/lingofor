import { expect } from 'chai';
import util from './util'

describe('Ordenacao de array', () => {
  it('Deve ordernar por vencimento do contrato mais recente', () => {
    const original = [{
      id: 29,
      socialName: "BlendMobi",
      contracts: [
        {
          code: "CONTRATO1",
          endDate: "2020-02-19"
        },
        {
          code: "CONTRATO2",
          endDate: "2020-03-20"
        },
        {
          code: "CONTRATO3",
          endDate: "2020-01-20"
        }
      ]
    }];

    const moreRecent = original[0].contracts[1];
    const arr = util.sortArrayByEndDateDesc(original[0].contracts);
    expect(arr[0].code).to.equal(moreRecent.code);
  })
})

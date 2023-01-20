import Services from '../../_api/Services';


export default class ApiClient {

  constructor(http) {
    this.$http = http || new Services();
  }

  async fetchStudents(filter) {
    const req = this._fixStrToNull(filter);
    const res = await this.$http.ApiPosts('contractstudents/search', req);
    try {
      return res.data.result.items;
    } catch (err) {
      console.error('Failed to fetch students.', err);
      return [];
    }
  }

  async saveStudent(req) {
    if (req && req.id > 0) {
      
      return await this.$http.ApiPut('contractstudents', req);
    }

    return await this.$http.ApiPosts('contractstudents', req);
  }

  async fetchCountries() {
    const res = await this.$http.get('countries/getall');
    try {
      return res.result.items;
    } catch (err) {
      console.error('Failed to fetch countries.', err);
      return [];
    }
  }

  async fetchLanguages() {
    const res = await this.$http.get('languages?skip=0&take=1000');
    try {
      return res.result.items;
    } catch (err) {
      console.error('Failed to fetch languages.', err);
      return [];
    }
  }

  async fetchPlans() {
    const res = await this.$http.get('plans?skip=0&take=100');
    try {
      return res.result.items;
    } catch (err) {
      console.error('Failed to fetch plans.', err);
      return [];
    }
  }

  async fetchContractsById(id) {
    const res = await this.$http.get(`contracts/get/${id}`);
    try {
      const i = res.result.items[0];
      return i.contractPlans.map(contractPlan => {
        return {
          contractPlanId: contractPlan.id,
          ...contractPlan.plan
        };
      });
    } catch (err) {
      console.error('Failed to fetch contracts.', err);
      return [];
    }
  }

  async fetchLingoLanguages() {
    const res = await this.$http.get('lingolanguages/getall');
    try {
      return res.result.items;
    } catch (err) {
      console.error('Failed to fetch lingo languages.', err);
      return [];
    }
  }

  async uploadPicture(userId, data) {
    const uri = `admin/users/${userId}/picture`
    return await this.$http.Upload(uri, data);
  }

  async bulkInsert(contractId, data) {
    const uri = `contractstudents/uploadExcel/${contractId}`
    const headers = {
      'Content-Type': 'multipart/form-data'
    };
    return await this.$http.Upload(uri, data, headers);
  }

  _fixStrToNull(filter) {
    const obj = filter ? filter : this.getEmptyFilter();
    const req = {};
    Object.keys(obj).forEach(key => {
      req[key] = obj[key] === '' ? null : obj[key];
      req[key] = obj[key] === 'true' ? true : req[key];
      req[key] = obj[key] === 'false' ? false : req[key];
    });
    return req;
  }

  async generateStudentReport(filter) {
    const headers = {
      method: 'GET',
      'responseType': 'blob'
    };

    return this.$http.axiosRequest('contractstudents/report', filter, headers);
  }

  async fetchStudentLevelGrade(studentId){
    const res = await this.$http.noAuthGet(`studentManagement/listStudentLevelGrade?skip=0&take=99999&id=${studentId}`);
    try {
      return res.result.items;
    } catch (err) {
      console.error('Failed to fetch student level.', err);
      return [];
    }
  }

}

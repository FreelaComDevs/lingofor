import Services from '../../_api/Services';


export default class CompanyService { 

    constructor(http) {
        this.$http = http || new Services();
        this.emptyFilter = {
            pageNumber: 1,
            pageSize: 100,
            socialName: '',
            fantasyName: '',
            documentNumber: '',
            economicGroupId: '',
            registerDateFrom: '',
            registerDateTo: '',
            active: '',
            responsibleName: '',
            responsibleEmail: ''
        };
        this.emptyContractFilter = {
            pageNumber: 1,
            pageSize: 100,
            code: '',
            companyId: '',
            economicGroupId: '',
            startDate: '',
            endDate: '',
            active: ''
        };
        this.emptyCompany = {
            id: 0,
            socialName: '',
            fantasyName: '',
            documentNumber: '',
            countryId: 0,
            economicGroupId: 0,
            address: '',
            registerDate: '',
            active: true,
            companyResponsibleContacts: []
        };
    }

    isCompanyManager () {
        let userProfile = this.$http.getProfile();
        return userProfile.role === 'companyManager';
    }
    
    fetchCountries (callback) {
        this.$http.get('countries/getall').then(res => {
            const items = res.result.items || [];
            callback(items);
        })
        .catch(err => {
            console.error('Failed to fetch countries.', err);
            callback([]);
        });
    }
    
    fetchEconomicGroups (callback) {
        const req = {	
            name: null,
            code: null,
            description: null,
            active: null,
            skip: null,
            take: null	
        };
        this.$http.ApiPosts('economicgroups/search', req).then(res => {
            const  { items } = res.data.result || [];
            callback(items);
        })
        .catch(err => {
            console.error('Failed to fetch economic groups.', err);
            callback([]);
        });
    }
    
    fetchCompanies (filter, callback) {
        const defaultReq = this.getEmptyFilter();
        const req = this._getRequestReplacingEmptyStringsToNull(defaultReq, filter);
        this.$http.ApiPosts('companies/search', req).then(res => {
            const { items } = res.data.result;
            callback(items);
        })
        .catch(err => {
            console.error('Failed to fetch companies.', err);
            callback([]);
        })
    }

    fetchAllPlans (callback) {
        this.$http.ApiGet('plans?skip=0&take=100').then(res => {
            const { items } = res.result;
            callback(items);
        })
        .catch(err => {
            console.error('Failed to fetch all plans.', err);
            callback([]);
        })
    }

    searchContacts (username, callback) {
        this.$http.ApiGet(`contacts/getByName?username=${username}`).then(res => {
            const { items } = res.result;
            callback(items);
        })
        .catch(err => {
            console.error('Failed to fetch all plans.', err);
            callback([]);
        })
    }

    fetchContracts (filter, callback) {
        const defaultReq = this.getEmptyContractFilter();
        const req = this._getRequestReplacingEmptyStringsToNull(defaultReq, filter);
        this.$http.ApiPosts('contracts/search', req).then(res => {
            const { items } = res.data.result;
            callback(items);
        })
        .catch(err => {
            console.error('Failed to fetch contracts.', err);
            callback([]);
        })
    }

    removeCompanyById (id, callback) {
        this.$http.ApiDelete(`companies/company/${id}`).then(res => {
            callback();
        })
        .catch(err => {
            console.error('Failed to delete companyId ' + id, err);
            callback(err);
        })
    }

    removeContractById (id) {
        return this.$http.ApiDelete(`contracts/contract/${id}`)
    }

    saveContract (contract) {
        const req = {
            id: contract.id,
            code: contract.code,
            description: contract.description,
            companyId: parseInt(contract.companyId),
            startDate: contract.startDate,
            endDate: contract.endDate,
            active: contract.active === 'true' || contract.active,
            contractPlans: contract.contractPlans.map(item => {
                const plan = {
                    planId: parseInt(item.planId),
                    quantity: parseInt(item.quantity)
                }
                if (item.id) {
                    plan.id = parseInt(item.id);
                }
                return plan
            }),
        };

        if (contract.contractContactsNew.length > 0) {
            const contacts = contract.contractContactsNew.map(item => {
                const phones = item.userPhones.map(i => {
                    return {
                        phone: i.phone,
                        userPhoneTypeId: parseInt(i.userPhoneTypeId, 10)
                    }
                });
                const obj = {...item};
                obj.userPhones = phones;
                delete obj.picture;
                delete obj.file;
                return obj;
            })
            req.contacts = contacts;
        }

        if (contract.contractContacts.length > 0) {
            const ids = contract.contractContacts
            .map(item => +item.contactId || +item.id)
            //.filter( id => id > 0 && !isNaN(id))
            req.contactIds = ids
        }
        
        let api = 'ApiPosts';
        if (req.id && req.id > 0) {
            api = 'ApiPut';
        } else {
            delete req.id
        }
        return this.$http[api]('contracts', req)
    }

    async uploadPicture (id, data) {
        const uri = `admin/users/${id}/picture`
        return this.$http.Upload(uri, data);
    }

    saveCompany (data, callback) {
        let api = 'ApiPosts';
        const req = this.getEmptyCompany();
        if (data.id && data.id > 0) {
            api = 'ApiPut';
            req.id = data.id
        } else {
            delete req.id;
        }

        req.active = data.active;
        req.countryId = parseInt(data.countryId);
        req.economicGroupId = parseInt(data.economicGroupId);
        req.socialName = data.socialName;
        req.fantasyName = data.fantasyName
        req.documentNumber = data.documentNumber
        req.address = data.address
        req.registerDate = data.registerDate
        
        const contacts = data.companyResponsibleContacts || [];
        const contactsWithoutId = contacts.map(item => {
            return {
                name: item.name,
                email: item.email.toLowerCase(),
                commercialPhone: item.commercialPhone,
                mobilePhone: item.mobilePhone
            };
        })
        req.companyResponsibleContacts = contactsWithoutId

        this.$http[api]('companies', req).then(res => {
            callback(res);
        })
        .catch(err => {
            console.error('Failed creating or updating company. ', err);
            callback(err);
        })
    }
    
    getEmptyFilter () {
        return Object.assign({}, this.emptyFilter);
    }

    getEmptyContractFilter () {
        return Object.assign({}, this.emptyContractFilter);
    }

    getEmptyCompany () {
        return Object.assign({}, this.emptyCompany);
    }

    getEmptyContact () {
        return {
            name: '',
            email: '',
            commercialPhone: '',
            mobilePhone: ''
        };
    }

    extractEconomicGroupsFromCompanies (items) {
        let economicGroups = {};
        let uniqueCompanies = {}
        items.forEach(item => {
            const economicGroupId = parseInt(item.economicGroupId);
            const economicGroupName = item.economicGroup.name;
            
            uniqueCompanies[item.id] = {
                name: item.socialName,
                economicGroupId
            }
            
            economicGroups[economicGroupId] = {
                economicGroupName,
                companies: []
            }
        });
        const companiesList = Object.keys(uniqueCompanies).map(key => {
            return {
                id: parseInt(key),
                name: uniqueCompanies[key].name,
                economicGroupId: parseInt(uniqueCompanies[key].economicGroupId)
            }
        })

        const result = Object.keys(economicGroups).map(key => {
            const item = economicGroups[key];
            const companies = companiesList.filter(company => {
                return parseInt(company.economicGroupId) === parseInt(key)
            })
            return {
                id: parseInt(key),
                name: item.economicGroupName,
                companies
            }
        })
        return result.reverse();
    }
    

    _getRequestReplacingEmptyStringsToNull (req, obj) {
        if (obj) {
            Object.keys(req).forEach(key => {
                req[key] = obj[key] === '' ? null : obj[key];
                req[key] = obj[key] === 'true' ? true : req[key];
                req[key] = obj[key] === 'false' ? false : req[key];
            })
        }
        return req;
    }
}

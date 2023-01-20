import Services from '../../_api/Services';


export default class ContractService { 

    constructor(http) {
        this.$http = http || new Services();
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
            const ids = [];
            contract.contractContacts.forEach(item => {
                const id = parseInt(item.contactId, 10);
                if (id > 0) {
                    ids.push(id)
                }
            })
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
                email: item.email,
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
    
    getEmptyContractFilter () {
        return Object.assign({}, this.emptyContractFilter);
    }

    getEmptyFilter () {
        return this.getEmptyContractFilter();
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

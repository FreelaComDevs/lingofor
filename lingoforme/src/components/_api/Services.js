import Auth from './AuthService'
import Axios from 'axios'
import moment from 'moment'
import timezone from 'moment-timezone'
import PATH_SERVER from './PATH_SERVER'

export default class Services {
  constructor () {
    this.domain = PATH_SERVER.DOMAIN
    this.AUTH = new Auth()
    this.userProfile = JSON.parse(localStorage.getItem('@lingo'))
    this.adminRoles = ['companyManager', 'costumeService']

    if(this.userProfile){
      this.loggedHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.session.token}`
      }
    }


  }

  get session() {
    if(this.userProfile){
      return this.userProfile
    }
    this.userProfile = JSON.parse(localStorage.getItem('@lingo'))
    return this.userProfile
  }

  get isAdmin() {
    return this.adminRoles.includes(this.userProfile.role)
  }

  getProfile () {
    return this.session
  }

  getLoggedHeader() {
    const session = JSON.parse(localStorage.getItem('@lingo'))
    if(session){
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      }
    }
  }

  userTimezoneConvert(time, timeTimezone) {
    const user = this.getUserFromToken()
    return timezone.tz(time, timeTimezone).clone().tz(user.timezone)
  }

  getLocalTimeFromUtc() {
    const user = this.getUserFromToken()
    return timezone.tz(moment.utc(), 'UTC').clone().tz(user.timezone)
  }

  getLocalTimeFromUtcSubtract() {
    const user = this.getUserFromToken()
    return timezone.tz(moment.utc().subtract(2, 'hours'), 'UTC').clone().tz(user.timezone)
  }

  getLocalTimeFromUtcAdd() {
    const user = this.getUserFromToken()
    return timezone.tz(moment.utc().add(0, 'hours'), 'UTC').clone().tz(user.timezone)
  }

  b64DecodeUnicode(str) {                                                                                                                                            
    return decodeURIComponent(Array.prototype.map.call(atob(str), c => {                                                                                                   
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)                                                                                                         
    }).join(''))                                                                                                                                                           
  }
    
  getUserFromToken_old = () => {
    const user = JSON.parse(localStorage.getItem('@lingo'));
    if (user) { 
      const payload = user.token.split('.')[1];
      const base64 = payload.replace('-', '+').replace('_', '/');
      return JSON.parse(this.b64DecodeUnicode(base64));
    } return
  }
  
  getUserFromToken(){
      let currentData = this.getUserFromToken_old();

      if (currentData) { 
        currentData['timezone'] = currentData.timezone === 'America/Sao_Paulo' ? 'America/Bahia' : currentData.timezone
      }
      return currentData
      
  }
    
  async get (uri, config = {}) {
    config.headers = this.getLoggedHeader()
    try {
      const res = await Axios.get(`${PATH_SERVER.DOMAIN}/${uri}`, config)
      return Promise.resolve(res.data)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async ApiGetParams (uri, params) {
    try {
      const res = await Axios
      .get(`${PATH_SERVER.DOMAIN}/${uri}`, { headers: this.getLoggedHeader() , params })
      .catch(async function (error) {
        if (error.response) {
          if(error.response.status === 401){
            var AUTH = new Auth()
            return await AUTH.logout()           
          }
          Promise.reject(error)
        }
      });

      return Promise.resolve(res.data)
    } catch (e) { return Promise.reject(e) }
  }

  noAuthGet (uri) {
    return Axios.get(`${PATH_SERVER.DOMAIN}/${uri}`)
      .then(res => Promise.resolve(res.data))
      .catch(e => Promise.reject(e))
  }

  noAuthPost (uri, data) {
    return Axios.post(`${PATH_SERVER.DOMAIN}/${uri}`, data)
      .then(res => Promise.resolve(res))
      .catch(e => { 
        console.log('AXIOS ERROR POST ', e.response.data)
        // if (e.message === 'Request failed with status code 401') {
        //   return this.AUTH.logout()
        // }

        return Promise.reject(e.response.data)
      })
  }

  checkToken (token) {
    return Axios.get(`${this.domain}/recover/check/${token}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(e => {
        if (e.message === 'Request failed with status code 401') {
          return this.AUTH.logout()
        }

        Promise.reject(e)
      })
  }

  ApiPosts (uri, data) {
    return Axios.post(`${this.domain}/${uri}`, data, { headers: this.getLoggedHeader(), timeout:60000 * 3 })
      .then(res => {
        return Promise.resolve(res)
        
      })

      .catch(e => {
        if (e.message === 'Error, err') {
          return this.AUTH.logout()
        }

        if(e.response.code === 401) {
          this.AUTH.logout()
        }

        return Promise.reject(e.response)
      })
  }

  changePassWord (uri, data, header) {
    return Axios.post(`${this.domain}/${uri}`, data, { headers: header })
      .then(res => {
        return Promise.resolve(res)
        
      })

      .catch(e => {
        console.log('AXIOS ERROR ', e.response)
        if (e.message === 'Error, err') {
          return this.AUTH.logout()
        }

        if(e.response.code === 401) {
          this.AUTH.logout()
        }

        return Promise.reject(e.response)
      })
  }

  Upload (uri, data, extraHeaders = {}) {
    const h = this.loggedHeader;
    const headers = {...h, ...extraHeaders};
    // headers['Content-Type'] = 'multipart/form-data';
    return Axios.post(`${this.domain}/${uri}`, data, { headers })
      .then(res => {
        return Promise.resolve(res)
      })

      .catch(e => {
        if (e.message === 'Error, err') {
          return this.AUTH.logout()
        }

        if(e.response.code === 401) {
          this.AUTH.logout()
        }

        return Promise.reject(e.response)
      })
  }

  ApiDelete (uri, data) {
    //return Axios.post(`${this.domain}/${uri}`, data, {
      let params = { headers: this.getLoggedHeader(),  responseType: 'json'  }
      if(data)
        params.data = data
      
      return Axios.delete(`${this.domain}/${uri}`,params)
      .then(res => { return Promise.resolve(res) })
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
          return Promise.reject(error.response.data.error.message) 
        } 
        return Promise.reject(error) 
      });
  }

  ApiPut (uri, data) {
    return Axios.put(`${this.domain}/${uri}`, data, { headers: this.getLoggedHeader() })
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data)      
      }

      return Promise.resolve(res)      
    })
    .catch(e => {
      if (e.message === 'Error, err') {
        return this.AUTH.logout()
      }

      if(e.response.code === 401) {
        this.AUTH.logout()
      }

      return Promise.reject(e.response)
    })
  }

  ApiGet (uri) {
    return Axios.get(`${this.domain}/${uri}`, { headers: this.getLoggedHeader() })
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data)      
      }

      return Promise.resolve(res)      
    })
    .catch(e => {
      return Promise.reject(e)
    })
  }

  axiosRequest(uri, data, extraHeaders = {}) {
    //window.open(`${this.domain}/${uri}?` + queryString);
    const session = JSON.parse(localStorage.getItem('@lingo'));
    return Axios({
      url: `${this.domain}/${uri}`,
      'Authorization': `Bearer ${session.token}`,
      ...extraHeaders,
      params: data
    }, { headers: this.getLoggedHeader() })
      .catch(e => {
        return Promise.reject(e)
      })


  }

  async refreshtokenToAddNewImage() {
    let userProfileData = JSON.parse(localStorage.getItem('@lingo'))
    
    let newToken = await this.get('token/refresh', {params:{token:userProfileData.token}})

    userProfileData.token = newToken

    localStorage.setItem('@lingo', JSON.stringify(userProfileData));
  }

}

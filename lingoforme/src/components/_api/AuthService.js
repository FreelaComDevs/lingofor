import axios from 'axios'
import PATH_SERVER from './PATH_SERVER';

export default class AuthService {

  constructor () {
    this.domain = PATH_SERVER.DOMAIN
    this.callApi = this.callApi.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

// FACEBOOK LOGIN RESPONSE DATA
// {
//   status: 'connected',
//   authResponse: {
//       accessToken: '...',
//       expiresIn:'...',
//       signedRequest:'...',
//       UserID:'...'
//   }
// }

  login = async (data) => {
    try {
      const res = await this.callApi('login', { method: 'POST', data })
      return res.data
    }
    catch (error) {
      if(error.response.status === 401){
        const customError = new Error("Not Authorized")
        customError.customMessage = "NOT_AUTHORIZED"
        throw customError
      }
      throw error
    }
  }

  forgetPass (objData) {
    return this.callApi('forgotPassword', {
      method: 'POST',
      data: JSON.stringify(objData)
    })
      .then(res => {
        if (res.status === 200) {
          // this.setUser(res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(e => Promise.reject(e))
  }

  loggedIn () {
    let data = JSON.parse(localStorage.getItem('@lingo'))

    if (data !== null) {
      if(data.firstAccess) {
        return 'firstAccess'
      } else if(data.token) {
        return true
      }
    }

    return false
  }

  setUser (data) {
    // @lingo
    localStorage.setItem('@lingo', JSON.stringify(data))
    // sessionStorage.setItem('LingoForMeToken', data.token)
    // sessionStorage.setItem('LingoForMeUsername', data.name)
    // sessionStorage.setItem('LingoForMeUserId', data.id)
    // sessionStorage.setItem('LingoForMeUserRole', data.role)

    return true
  }

  updateUser(data) {
    let curUser = JSON.parse(localStorage.getItem('@lingo'))
    curUser.firstAccess = data.firstAccess
    localStorage.setItem('@lingo', JSON.stringify(curUser))
  }

  getToken () {
    return sessionStorage.getItem('@lingo').token
  }

  logout () {
    // Clear User token and profile data from localStorage
    localStorage.removeItem('@lingo')
    localStorage.removeItem('i18nextLng')
    sessionStorage.removeItem('actualLanguage')
    // sessionStorage.removeItem('LingoForMeToken')
    // sessionStorage.removeItem('LingoForMeUsername')
    // sessionStorage.removeItem('LingoForMeUserId')
    // sessionStorage.removeItem('LingoForMeUserRole')
    window.location.replace('/')
  }

  getProfile () {
    try {
      return sessionStorage.getItem('@lingo').role
    } catch (e) {
      this.logout()
    }
  }

  async callApi (uri, options) {
    let Authorization = options.token ? `Bearer ${options.token}` : ''
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization
    }

    delete options.token

    return axios({
        url: `${this.domain}/${uri}`,
        headers,
        ...options
      })
  }
}

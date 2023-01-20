import Services from '../components/_api/Services'
import { 
  GET_COORDINATORS,
  GET_COORDINATOR
} from '../helpers/constants'

const service = new Services()

//Get All Coordinators
export const getCoordinators = () => dispatch => {
    let newFilter = {
        "take": null,
        "skip": null,
        "name": null,
        "countryId": 26,
        "status": null,
        "nativeLanguageId": null,
        "otherLanguageId": null,
        "responsibleLanguageId": null
    }
    service.ApiPosts('coordinators/search', newFilter)
        .then(res => dispatch({type: GET_COORDINATORS, coordinators: res.data.result.items }))
        .catch (err => console.log ('Error', err))
}

//Get Coordinator
export const getCoordinator = (id) => dispatch => {
  service.get(`coordinators/${id}`)
      .then(res => { console.log(res); dispatch({type: GET_COORDINATOR, coordinator: res.result.items[0] })})
      .catch (err => console.log ('Error', err))
}

import { GET_COUPONS, GET_COUPON, ADD_COUPON, DELETE_COUPON, UPDATE_COUPON, UNSET_COUPON, SET_COUPON_ERROR,UNSET_COUPON_ERROR } from '../helpers/constants'

const initialState = {
    coupons: [],
    coupon: "",
    loading: false,
    error:'',
    showDialog:false
}

const coupons = (state = initialState, action) => {
    const { coupons, coupon, couponId, type, error } = action;
    switch (type) {
        case GET_COUPONS:
            return { ...state, coupons, loading: false }
        case GET_COUPON:
            return { ...state, coupon: state.coupons.filter( item => item.id === couponId)[0] }
        case ADD_COUPON:
            return { ...state, coupons: [ coupon, ...state.coupons ], loading: false }
        case UNSET_COUPON:
            return { ...state, coupon: "" }  
        case DELETE_COUPON:
            return { ...state, coupons: state.coupons.filter( item => item.id !== couponId), coupon: "", loading: false }  
        case UPDATE_COUPON:
            return { ...state, coupons: state.coupons.map( item => item.id !== coupon.id ? item : coupon ), loading: false }
        case SET_COUPON_ERROR:
            return { ...state, error: error, loading: false }
        case UNSET_COUPON_ERROR:
            return { ...state, error: null, loading: false }
        default:
            return state;
    }
}

export default coupons
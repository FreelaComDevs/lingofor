import { 
    GET_COUPONS, 
    GET_COUPON, 
    ADD_COUPON, 
    DELETE_COUPON, 
    UPDATE_COUPON, 
    UNSET_COUPON,
    SET_COUPON_ERROR,
    UNSET_COUPON_ERROR
 } from '../helpers/constants'
import Services from '../components/_api/Services'
const service = new Services()

// All Coupons
export const couponsFetched = coupons => ({
    type: GET_COUPONS,
    coupons
});

export const getCoupons = (objFilter) => dispatch => {
    let newFilter = Object.assign({}, objFilter);
    (objFilter.pageNumber === "") ? (newFilter.pageNumber = 1) : (newFilter.pageNumber = Number(objFilter.pageNumber));
    (objFilter.pageSize === "") ? (newFilter.pageSize = 1000) : (newFilter.pageSize = Number(objFilter.pageSize));
    (objFilter.key === "") && (newFilter.key = null);
    (objFilter.dueDateTo === "") && (newFilter.dueDateTo = null);
    (objFilter.dueDateFrom === "") && (newFilter.dueDateFrom = null);
    (objFilter.economicGroupId === "") ? (newFilter.economicGroupId = null) : (newFilter.economicGroupId = Number(objFilter.economicGroupId));
    (objFilter.companyId === "") ? (newFilter.companyId = null) : (newFilter.companyId = Number(objFilter.companyId));
    (objFilter.active === "") ? (newFilter.active = null) : (newFilter.active = Boolean(Number(objFilter.active)));
    (objFilter.plans === "") ? (newFilter.plans = null) : newFilter.plans = [ Number(objFilter.plans) ];
    service.ApiPosts('coupons/search', newFilter)
        .then(res => dispatch(couponsFetched(res.data.result.items)))
        .catch (err => console.log ('Error', err))
}

// Single Coupon
export const getCoupon = couponId => {
    return ({
    type: GET_COUPON,
    couponId
})};
  
// Delete Coupon
export const couponRemoved = couponId => ({
    type: DELETE_COUPON,
    couponId
});
  
export const removeCoupon = (couponId) => dispatch => {
    service.ApiDelete(`coupons/coupon/${couponId}`)
        .then(res => dispatch(couponRemoved(couponId)))
        .catch ((err) => {            
            dispatch(setCouponError(err)); return err
        })
}

// Unset Coupon
export const unsetCoupon = () => ({
    type: UNSET_COUPON,
});

// Add Coupon
export const couponAdded = coupon => ({
    type: ADD_COUPON,
    coupon
});
  
export const addCoupon = (objCouponAdd) => dispatch => {
    let newObjCouponAdd = Object.assign({}, objCouponAdd);
    objCouponAdd.companyId === "" ? newObjCouponAdd.companyId = null : newObjCouponAdd.companyId = Number(objCouponAdd.companyId);
    objCouponAdd.plans[0] === 0 ? newObjCouponAdd.plans = null : newObjCouponAdd.plans =  objCouponAdd.plans.map( plan => Number(plan) ) ;
    objCouponAdd.economicGroupId === "" ? newObjCouponAdd.economicGroupId = null : newObjCouponAdd.economicGroupId = Number(objCouponAdd.economicGroupId);
    objCouponAdd.percentage === "" ? newObjCouponAdd.percentage = null : newObjCouponAdd.percentage = Number(objCouponAdd.percentage);
    service.ApiPosts(`coupons`, JSON.parse(JSON.stringify(newObjCouponAdd)))
        .then(res => dispatch(couponAdded(res.data.result.items[0])))
        .catch (err => console.log ('Error', err))
}

// Update Coupon
export const couponUpdated = coupon => ({
    type: UPDATE_COUPON,
    coupon
});
  
export const updateCoupon = (objCouponUpdate) => dispatch => {
    let newObjCouponUpdate = Object.assign({}, objCouponUpdate);
    objCouponUpdate.percentage === "" ? newObjCouponUpdate.percentage = null : newObjCouponUpdate.percentage = Number(objCouponUpdate.percentage);
    service.ApiPut(`coupons`, JSON.parse(JSON.stringify(newObjCouponUpdate)))
        .then(res => dispatch(couponUpdated(res.result.items[0])))
        .catch (err => console.log ('Error', err))
}

export const setCouponError = (error) => ({
    type: SET_COUPON_ERROR,
    error
});

export const unsetCouponError = () => ({
    type: UNSET_COUPON_ERROR
});

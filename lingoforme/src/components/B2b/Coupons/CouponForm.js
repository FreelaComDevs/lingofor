import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { getLingoPlans, getLingoEconomicGroups, getLingoEconomicGroupCompanys } from '../../../actions/lingoActions'
import { addCoupon, getCoupons, getCoupon, updateCoupon, removeCoupon, unsetCoupon, unsetCouponError  } from '../../../actions/couponsActions'
import Loading from 'react-fullscreen-loading'
import Form from '../../../elements/Form';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import './styles.scss'

class CouponForm extends Component {
	state = this.initialState    
	
	get initialState() {
		const { coupon } = this.props.coupons

		const populatecompany = (id) => {
			this.props.getLingoEconomicGroupCompanys(id)
			return id
		}

		return {
			validations: {},
			inputs: {
				code: coupon ? coupon.key : "",
				discount: coupon ? coupon.percentage : "",
				expiration: coupon ? coupon.dueDate : "",
				economicGroup: coupon ? populatecompany(coupon.company.economicGroup.id) : "",
				company: coupon ? coupon.company.id : "",
				plans: coupon ? coupon.couponPlans.map( item => item.planId) : [0],
				status: coupon ? coupon.active : false,
			},
		}
	}
	
	populatecompany = (id) => {
		this.props.getLingoEconomicGroupCompanys(id)
		return id
	}

	inputChange = (e, name) => {
		const { value, type } = e.target
		const inputs  = Object.assign({}, this.state.inputs)
		inputs[name] = value
		if (type === "checkbox") { inputs[name] = !this.state.inputs[name]; return this.setState ({ inputs })}
		if (name === "economicGroup") { this.props.getLingoEconomicGroupCompanys(value) }
		if(name === "plans") { inputs[name] = inputs[name].map(p => parseInt(p)) }
		this.setState({ inputs })
	} 

    submitHandle = () => {
		const { coupon } = this.props.coupons
		const { inputs: { code, discount, expiration, economicGroup, company, plans, status } } = this.state
		const submitObj = {
			key: code,
			percentage: discount,
			dueDate: expiration,
			economicGroupId: economicGroup,
			companyId: company,
			active: status,
			plans: plans
		}
		coupon && ( submitObj.id = this.props.coupons.coupon.id )

		// Validações
		if (submitObj.key === "") { return (this.setState({ validations: { code: true }}))}
		if (submitObj.percentage === "") { return (this.setState({ validations: { discount: true }}))}
		if (submitObj.dueDate === "") { return (this.setState({ validations: { expiration: true }}))}
		if (submitObj.economicGroupId === "") {return ( this.setState({ validations: { economicGroup: true }}))}
		if (submitObj.companyId === "") { return (this.setState({ validations: { company: true }}))}

		if(coupon) { this.props.unsetCoupon(); return this.props.updateCoupon(submitObj) } 
		this.props.closeForm(); return this.props.addCoupon(submitObj)
	} 

	deleteHandle = (e) => {
		e.preventDefault()
		if(this.props.coupons.coupon ){
			this.props.removeCoupon(this.props.coupons.coupon.id)		
		}
	}
	
	resetInputs = async () => {
		this.setState({ filters: this.initialState.filters })   
	}

  	render () {
		const { state, props, inputChange, submitHandle, deleteHandle } = this
		const { validations, inputs } = state;
		const { code, discount, expiration, economicGroup, company, plans, status } = inputs
		const { closeForm, label, coupons: { loading, coupon, error }, unsetCoupon, unsetCouponError } = props

		const atualDate = moment().format("YYYY-MM-DD");
		const formInputs = [
			{ name: "code", value: code, label: "Coupon Code", placeholder: "Code", type: "text", required: true, error: validations.code },
			{ name: "discount", value: discount, label: "Discount %", type: "number", step: 1, min: 1, max: 100, required: true, error: validations.discount },
			{ name: "expiration", value: expiration, label: "Expiration", minDate: atualDate, type: "date", required: true, error: validations.expiration },
			{ name: "economicGroup", value: economicGroup, type: "economicGroupSelect", required: true, error: validations.economicGroup },
			{ name: "company", value: company, type: "economicGroupCompanySelect", required: true, error: validations.company },
			{ name: "plans", value: plans, type: "plansArray", required: true, error: validations.plans },
			{ name: "status", value: status, label: "Status", type: "switch" },
		]
		const showDialog = error ? true : false
		return (
			<Fragment>
				<Loading loading={loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>
				<Form 
					label={label} 
					inputs={formInputs} 
					inputChange={inputChange} 
					deleteHandle={deleteHandle} 
					edit={!!coupon}/>
				<button className='save' onClick={ (e) => { submitHandle(e) }}>Save</button>
				<button className='exit' onClick={ (e) => { unsetCoupon() ;closeForm(e) }}><i class="fa fa-angle-left" aria-hidden="true"></i>{` Back`}</button>
				{showDialog && 
					<Dialog open={showDialog} onClose={() => unsetCouponError()} className="alert-dialog-slide">
						<DialogTitle className="alert-dialog-slide-title boxModal">
							{'Error'}
						</DialogTitle>
						<DialogContent className="alert-dialog-slide-content boxModal">
							{error}
						</DialogContent><br/>
						
						<DialogActions className="alert-dialog-slide-actions buttons boxModal">
							<button onClick={() =>  unsetCouponError()}>
							{'OK'}
							</button>
						</DialogActions>
					</Dialog> 
				}
			</Fragment>
		)
	}
}

const mapStateToProps = ({ coupons }) => ({ coupons });
const mapDispatchToProps = dispatch => ({
    addCoupon: data => dispatch(addCoupon(data)),
    getCoupon: data => dispatch(getCoupon(data)),
    getCoupons: data => dispatch(getCoupons(data)),
	updateCoupon: data => dispatch(updateCoupon(data)),
	removeCoupon: data => dispatch(removeCoupon(data)),
	unsetCoupon: data => dispatch(unsetCoupon(data)),
	getLingoPlans: data => dispatch(getLingoPlans(data)),
	getLingoEconomicGroups: data => dispatch(getLingoEconomicGroups(data)),
	getLingoEconomicGroupCompanys: data => dispatch(getLingoEconomicGroupCompanys(data)),
	unsetCouponError: data => dispatch(unsetCouponError(data)),
});

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(CouponForm))))
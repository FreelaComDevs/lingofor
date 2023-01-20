import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLingoPlans, getLingoEconomicGroups, getLingoEconomicGroupCompanys } from '../../../actions/lingoActions'
import { getCoupons, getCoupon, unsetCoupon } from '../../../actions/couponsActions'
import Loading from 'react-fullscreen-loading'
import Filter from '../../../elements/Filter';
import TableList from '../../../elements/TableList'
import CouponForm from './CouponForm';
import './styles.scss'

class Coupons extends Component {
	state = this.initialState    
	
	get initialState() {
		return {
			newCoupon: false,
			filters: {
				pageNumber: "",
				pageSize: "",
				key: "",
				dueDateFrom: "",
				dueDateTo: "",
				economicGroupId: "",
				companyId: "",
				active: "",
				plans: "",
			},
		}
	}

	componentDidMount () {
		this.props.getLingoPlans()
		this.props.getLingoEconomicGroups()
		this.props.getCoupons(this.initialState.filters)
	}

	componentWillUnmount() {
		this.props.unsetCoupon()
	}

	inputChange = (e, name) => {
        const { value } = e.target
        const { filters }  = this.state
        filters[name] = value
		this.setState({ filters })
		name === "economicGroupId" && this.props.getLingoEconomicGroupCompanys(value)
	} 

    applyFilters = () => {
        this.props.getCoupons(this.state.filters)
	} 
	
	resetFilter = async () => {
		this.props.getCoupons(this.initialState.filters)
		this.setState({ filters: this.initialState.filters })   
	}

  	render () {
		const { state, props, inputChange, applyFilters, resetFilter } = this
		const { newCoupon, filters: { key, dueDateFrom, dueDateTo, plans, companyId, economicGroupId, active }} = state;
		const { lingo: { loading }, coupons: { coupons, coupon }, getCoupon } = props

		// Filter
		const statusOptions = [ "Inactive", "Active" ].map( (option, index) => { return { id: index, name: option }})
		const filters = [
			{ name: "key", value: key, label: "Coupon Code", placeholder: "Code", type: "text" },
			{ name: "dueDateFrom", value: dueDateFrom, label: "Period - Start", type: "date" },
			{ name: "dueDateTo", value: dueDateTo, label: "Period - End", type: "date" },
			{ name: "plans", value: plans, type: "plansArray" },
			{ name: "economicGroupId", value: economicGroupId, type: "economicGroupSelect" },
			{ name: "companyId", value: companyId, type: "economicGroupCompanySelect" },
			{ name: "active", value: active, label: "Status", placeholder: "Select", options: statusOptions, type: "select" },
		]
		
		// List
		const listedCoupons = coupons.map( item => { 
			console.log(item)
			return { 
				id: item.id, 
				code: item.key, 
				discount: item.percentage + "%", 
				expiration: item.dueDate, 
				plans: item.couponPlans.map(item => item.plan.nameEnglish).join(", "), 
				legalName: item.company.socialName, 
				economicGroup: item.company.economicGroup.name,
				status: item.active ? "Active" : "Inactive"
			}
		})
		const listItems = [
			{ label: "Coupon Code", name: "code" },
			{ label: "Discount", name: "discount" },
			{ label: "Expiration", name: "expiration" },
			{ label: "Plans", name: "plans" },
			{ label: "Legal Name", name: "legalName" },
			{ label: "Economic Group", name: "economicGroup" },
			{ label: "Status", name: "status" },
			{ label: "", name: "button" }
		]

		return (
			<Fragment>
				<Loading loading={loading} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
				{ coupon || newCoupon
					? <CouponForm name="coupon" label="Coupon" closeForm={ () => this.setState({ newCoupon: false }) }/>
					: <Fragment>
						<div className='button buttonRight'>
							<button onClick={ () => this.setState({ newCoupon: true }) }>
								<i className='fa fa-plus' aria-hidden='true' /> Add new Coupon
							</button>
						</div>
						<Filter 
							filters={ filters } 
							inputChange={ inputChange } 
							submit={ applyFilters } 
							clear={ resetFilter } /> 
						<TableList 
							listItems={ listItems } 
							listedItems={ listedCoupons } 
							action={ getCoupon } />
					</Fragment> 
				}
			</Fragment>
		)
	}
}

const mapStateToProps = ({ coupons, lingo }) => ({ coupons, lingo });
const mapDispatchToProps = dispatch => ({
    getLingoPlans: data => dispatch(getLingoPlans(data)),
	getLingoEconomicGroups: data => dispatch(getLingoEconomicGroups(data)),
	getLingoEconomicGroupCompanys: data => dispatch(getLingoEconomicGroupCompanys(data)),
    getCoupons: data => dispatch(getCoupons(data)),
    getCoupon: data => dispatch(getCoupon(data)),
    unsetCoupon: data => dispatch(unsetCoupon(data))
});

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Coupons))))
import React, { Component, Fragment, createRef } from 'react'
import { translate } from 'react-i18next'
import { FlagIcon } from 'react-flag-kit'
import Services from '../_api/Services'
import Loading from 'react-fullscreen-loading'
import { withRouter } from 'react-router-dom'
import paypalButton from '../../images/sign-up/bt_paypal_transparente.png'

class BuyExtraClass extends Component {
    state = {
        step: "orderStep",
        quantity: 1,
        paypalLink: "",
        loading: false
    }

    stepWrapper = createRef()

    componentDidMount() {
        this.props.extraClassConfirm && this.setState({ step: "confirmationStep" })
        this.state.step == "reviewStep" && (this.stepWrapper.current.scrollLeft = 110)
        this.state.step == "confirmationStep" && (this.stepWrapper.current.scrollLeft = 200)
    }

    service = new Services()

    proceed = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        this.service.ApiPosts("studentplanpartpayments/create", { studentPlanId: Number(this.props.extraClassInfos.studentPlanId), quantity: Number(this.state.quantity) })
            .then(res => { this.setState({ loading: false, step: "reviewStep", paypalLink: res.data.result.items[0].providerApprovalUrl }); console.log(res)})
            .catch(res => { this.setState({ loading: false }); console.log(res)})
    }

    render() {
        const { state, stepWrapper, props, proceed } = this
        const { step, quantity, paypalLink, loading } = state
        const { t, exit, paypalStatus, extraClassInfos: { planName, planLingos, extraClassPrice }} = props

        return (
            <div className="new-view">
                <Loading loading={loading} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
                <header className="buyExtraClassHeader">
                    <div ref={stepWrapper} className={`step-wrapper`}>
                        <div className={`orderStep ${ step === "orderStep" ? "active" : "" }`}>
                            <i className="icon-review"></i>
                            <p>{t("ORDER_DETAILS")}</p>
                        </div>
                        <hr/>
                        <div className={`reviewStep ${ step === "reviewStep" ? "active" : "" }`}>
                            <i className="icon-order"></i>
                            <p>{t("REVIEW_&_PAY")}</p>
                        </div>
                        <hr/>
                        <div className={`confirmationStep ${ step === "confirmationStep" ? "active" : "" }`}>
                            <i className="icon-confirm"></i>
                            <p>{t("CONFIRMATION")}</p>
                        </div>
                    </div>
                </header>
                <div className="new-box extra-class-box">
                    { (step === "orderStep" || step === "reviewStep") &&
                        <Fragment>
                            <h2>{ step === "reviewStep" ? t("REVIEW_YOUR") : "" }{t("EXTRA_CLASS")}</h2>
                            <div className="extraClassInfo">
                                <div className="lingoName">
                                    <i className="icon-globe" />
                                    <p className="lingoPlan">{planName}</p>
                                </div>
                                <div className="lingoClassInfo">
                                    <div className="lingoLanguages">
                                        <h4 className="lingo">Lingo</h4>
                                        { planLingos && planLingos.map( ({flag, name}) => (
                                            <Fragment>
                                                <FlagIcon code={flag}/><p>{t(name.toUpperCase())}</p>
                                            </Fragment>
                                        ))}
                                    </div>
                                    <div className="extraClassQuantities">
                                        <h4>{t("HOW_MANY_CLASSES")}?</h4>
                                        <input type="number" step="1" min="1" value={quantity} onChange={ ({target: {value}}) => this.setState({ quantity: value }) }/>
                                    </div>
                                </div>
                            </div>
                            <div className="extraClassPrice">
                                <p className="unitaryLabel">{t("UNITARY_VALUE")}</p>
                                <p className="unitaryValue">{t('MONEY_FORMAT')} {extraClassPrice && extraClassPrice.toFixed(2)}</p>
                                <p className="totalLabel">{t("TOTAL")}</p>
                                <p className="totalValue">{t('MONEY_FORMAT')} {(Math.floor((extraClassPrice * quantity) * 100) / 100).toFixed(2)}</p>
                                <p className="unitaryLabel">*{t('MONEY_FORMAT')} Dollars</p>
                            </div>
                        </Fragment>
                    }
                    { (step === "confirmationStep") &&
                        <div className="confirmationStep">
                            { paypalStatus === "confirm" ? <h3>{t("CONGRATULATIONS")}!</h3> : <h3 className="confirmationError">{t("SOMETHING_WENT_WRONG")} :(</h3> }
                            { paypalStatus === "confirm" ? <i className="icon-confirm"/> : <i className="icon-delete"/> }  
                            { paypalStatus === "confirm" ? <p>{t("YOUR_EXTRA_CLASSES_IS_ALL_SET")}!</p> : <p>{t("YOUR_EXTRA_CLASS_IS_NO_SET")}!</p> }  
                        </div>
                    }

                </div>
                <div className="buttons extraClass-buttons">
                    { (step === "orderStep" || step === "reviewStep") && <button type="button" className="button-cancel" onClick={ (e) => exit(e) }>{t("BACK")}</button> }
                    { step === "orderStep" && <button type="button" className="button-proceed" onClick={ (e) => proceed(e) }>{t("PROCEED_TO_PAYMENT")}</button> }
                    { step === "reviewStep" && <a href={paypalLink} ><img src={paypalButton} alt="paypal button"/></a> }
                    { (step === "confirmationStep" && paypalStatus === "confirm") && <div><button type="button" onClick={() => this.props.history.push('/schedule')} className="button-schedule">{t("I_WANT_TO_SCHEDULE_MY_CLASSES")}!</button></div> }
                    { (step === "confirmationStep" && paypalStatus === "cancel") && <div><button type="button" className="button-cancel button-back" onClick={ (e) => exit(e) }>{t("BACK")}</button> </div> }
                </div>
            </div>
        )
    }
} 

export default withRouter(translate('translations')(BuyExtraClass))

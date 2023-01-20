import React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Services from '../_api/Services'

export default class PaypalButton extends React.Component {
    constructor (props) {
      super(props)

      this.env = process.env.REACT_APP_PAYPAL_ENV
      this.client = {
          sandbox: process.env.REACT_APP_PAYPAL_SANDBOX_ID,
          production: process.env.REACT_APP_PAYPAL_LIVE_ID
      }

      this.state = {
        currency: 'BRL',
        total: 19.9
      }
    }

    componentDidMount () {
      console.log(this.client)
    }

    onSuccess (payment) {
        console.log("The payment was succeeded!", payment);
    }

    onCancel (data) {
        console.log('The payment was cancelled!', data);
    }

    onError (err) {
        console.log("Error!", err);
    }

    render () {
        return (
            <PaypalExpressBtn
              env={this.env}
              client={this.client}
              intent={'subscription'}
              currency={this.state.currency}
              total={this.state.total}
              commit={true}
            />
        );
    }
}

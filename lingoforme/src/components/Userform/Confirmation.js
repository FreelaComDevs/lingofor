import React, { Component } from 'react'
import ReactPixel from 'react-facebook-pixel';
import { PIXEL_FB, GTM_ID } from '../_api/environment'
import confirm from '../../images/sign-up/subscription_confirm.png'
import pending from '../../images/sign-up/subscription_pending.png'
import errorimg from '../../images/sign-up/subscription_error.png'
import GTMContainer from './../_common/googleTagManager'

// import cancel from '../../images/sign-up/'

class Confirmation extends Component {
  constructor(props) {
    super(props)
    localStorage.removeItem('@paypal')
    localStorage.removeItem('@studentData')

    this.i18n = this.props.i18n
    this.t = this.props.t

    let title = ''
    let color = ''
    let imageSrc = null
    let msgLine1 = ''
    let msgLine2 = ''

    // this.mockVar = 'notify'
    switch('confirm_trial') {
      // switch(this.mockVar) {
      case 'confirm':
        // this.title = this.t('PAYPAL_CONFIRM')
        title = 'Congratulations!'
        color = '#00D36A'
        imageSrc = confirm
        msgLine1 = 'Your order is being processed by PayPal.'
        msgLine2 = 'Now, check your email to validate your access to our system.'      
        break

      case 'confirm_trial':
        // this.title = this.t('PAYPAL_CONFIRM')
        title = 'Congratulations!'
        color = '#00D36A'
        imageSrc = confirm
        msgLine1 = 'Your account has been created.'
        msgLine2 = 'Now, sign up and fill out your information profile.'
        break

      case 'cancel': 
        title = 'cancel'
        color = '#FF5666'
        imageSrc = errorimg 
        msgLine1 = 'Your order is being processed by PayPal.'
        msgLine2 = 'Now, check your email to validate your access to our system.'
        break

      case 'notify':
        title = 'notify'
        color = '#FDC35E'
        imageSrc = pending
        msgLine1 = 'Your order is being processed by PayPal.'
        msgLine2 = 'Now, check your email to validate your access to our system.'
        break

      case 'oldToken':
        title = 'Ops! The request link has expired!'
        color = '#FF5666'
        imageSrc = errorimg
        msgLine1 = 'Your order is being processed by PayPal.'
        msgLine2 = 'Now, check your email to validate your access to our system.'
        break

      case 'error':
        title = 'Something went wrong :('
        color = '#FF5666'
        imageSrc = errorimg
        msgLine1 = 'Your order is being processed by PayPal.'
        msgLine2 = 'Now, check your email to validate your access to our system.'
        break
    }

    this.state = {
      titleStatus: title,
      setColor: color,
      image: imageSrc,
      msgLine1: msgLine1,
      msgLine2: msgLine2
    }
    // console.logv(this.props.match.path.split('/')[2])
  }

  componentDidMount () {
    ReactPixel.init(PIXEL_FB);
    ReactPixel.pageView();
  }

  render() { 
    const event = { platform: 'react-stack', conversion: this.state.title}

    return (
      <div className="confirmation">
                <GTMContainer reload={{}} gtmId={GTM_ID} scriptId='react-google-tag-manager-gtm' dataLayerName={"checkPaypal_"+this.props.paypalStatus} additionalEvents={event} previewVariables='' />
        <div>
          <h2 style={{color: this.state.setColor}}>{this.state.titleStatus}</h2>
          <img src={this.state.image} width="100" height="100" alt=""/>
          <p>{this.state.msgLine1}<br/>{this.state.msgLine2}</p>          
        </div>
      </div>
      
    )
  }
}
 
export default Confirmation
import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class PaypalButton extends React.Component {
    state = {
        showButton: false
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;
        isScriptLoaded && isScriptLoadSucceed && this.setState({ showButton: true });
    }

    componentWillReceiveProps(nextProps) {
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;
        const isLoadedButWasntLoadedBefore = !this.state.showButton && !this.props.isScriptLoaded && isScriptLoaded;
        isLoadedButWasntLoadedBefore && isScriptLoadSucceed && this.setState({ showButton: true });
    }

    render() {
        const { paypalId, onAuthorize } = this.props;

    const {
      showButton,
    } = this.state;

    let PayPalBtn = window.paypal.Button.driver('react', { React, ReactDOM });

    return (
      <div>
        { showButton 
            && <PayPalBtn 
                env='sandbox'
                commit={true}
                payment={ () => { return paypalId }} 
                onAuthorize={ onAuthorize }
             />
        }
      </div>
    );
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);
import React from 'react'
import SocialLogin from 'react-social-login'

class Button extends React.Component{

  render(){
      const {props} = this
      const {children, triggerLogin} = this.props
      return(
        <div style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} onClick={triggerLogin} {...props}>
          { children }
        </div>
      )
  }
}

export default SocialLogin(Button)

import React from 'react';
import PropTypes from 'prop-types';

import { Modals } from './styles';

class Modal extends React.Component {
  handleCloseBg(e){
    if(e.target.className === 'modal-background')
    {
      this.props.close();
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="modal-background" onClick={this.handleCloseBg.bind(this)}>
        <div className="modal-content" {...this.props.options} >
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
            <h3 className="modal-title">{this.props.title}</h3>
            {/* <button className="mobi-icon-button-modal" onClick={this.props.close}>
              <img alt="close" src={close} />
            </button> */}
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;

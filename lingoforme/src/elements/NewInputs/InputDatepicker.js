import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputDatepicker extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <input type="text" id={`date${this.props.name}`} name={this.props.name} autoComplete="off"
        placeholder={this.props.placeholder} className={this.props.className} 
        value={this.props.value} onClick={this.props.onClick} disabled={this.props.disabled}
        onChange={this.props.onChange} />
    )
  }


}

InputDatepicker.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

export default InputDatepicker

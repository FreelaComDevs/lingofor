import React, { Component } from 'react';
import './Switch.scss';

export default class Switch extends Component {

  constructor(props) {
    super(props);
  }

  handleCheck = event => {
    const { name, value } = event.target;
    const e = {
      target: {
        name,
        value
      }
    };
    e.target.value = event.target.checked;
    this.props.onChange(e);
  }

  render() {
    const { name, value, checked, notChecked } = this.props;
    const checkedText = checked || 'Yes';
    const notCheckedText = notChecked || 'No';
    return (
      <div className="switchBox">
        <div className="switch__container">
          <input
            id={name}
            name={name}
            className="switch switch--shadow"
            type="checkbox"
            checked={value ? true : false}
            onChange={this.handleCheck}
          />
          <label htmlFor={name}>
            <span>{value ? checkedText : notCheckedText}</span>
          </label>
        </div>
        
      </div>
    )
  }
}

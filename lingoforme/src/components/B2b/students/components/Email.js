import React, { Component } from 'react';


export default class Emails extends Component {

  fieldName = 'userEmails';

  handleChange = e => {
    const { name, value } = e.target;
    this.props.actions.changeItem({ [name]: value.toLowerCase() });
  }

  addFieldInList = () => {
    const { item, actions } = this.props
    const list = [...item[this.fieldName]];
    list.push({
      email: '',
      notify: true
    });
    actions.changeItem({ [this.fieldName]: list });
  }

  removeFieldInList = e => {
    const { item, actions } = this.props
    const list = [...item[this.fieldName]];
    list.splice(e.target.dataset.index, 1);
    actions.changeItem({ [this.fieldName]: list });
  }

  handleChangeInList = e => {
    const { name, value, dataset } = e.target;
    const { index } = dataset;
    const list = [...this.props.item[this.fieldName]];
    list[index][name] = value.toLowerCase();
    this.props.actions.changeItem({ [this.fieldName]: list });
  }

  render() {
    const { t, item } = this.props;
    return (
      <div>
        <div>
          <label>Login email</label>
          <span>{t('REQUIRED')}</span>
        </div>
        <div className="addEmail">
          <input
            placeholder='Your email'
            name='email'
            type="email"
            className='inputMobile'
            value={item.email}
            onChange={this.handleChange}
          />
          <button
            type="button"
            className='addInput'
            onClick={this.addFieldInList}
          >
            Add Email +
          </button>
        </div>
        {item.userEmails.map((i, idx) => {
          return <div key={'e'+idx}>
            <div>
              <label>{t('ALTERNATIVE_EMAIL')}</label>
              <span>{t('REQUIRED')}</span>
            </div>
            <input
              data-index={idx}
              placeholder='Your email'
              name='email'
              type="email"
              className='inputMobile'
              value={i.email}
              onChange={this.handleChangeInList}
            />
            <button
              data-index={idx}
              className='delete'
              onClick={this.removeFieldInList}
            >
              Delete
            </button>
          </div>
        })}
      </div>
    )
  }
}

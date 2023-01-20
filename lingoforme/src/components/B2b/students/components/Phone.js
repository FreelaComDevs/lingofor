import React, { Component } from 'react';


export default class Phone extends Component {

  fieldName = 'userPhones';

  handleChange = e => {
    const { name, value } = e.target;
    this.props.actions.changeItem({ [name]: value });
  }

  addFieldInList = () => {
    const { item, actions } = this.props
    const list = [...item[this.fieldName]];
    list.push({
      phone: '',
      userPhoneTypeId: 3
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
    list[index][name] = value;
    this.props.actions.changeItem({ [this.fieldName]: list });
  }

  render() {
    const { t, item } = this.props;
    return (
      <div>
        {item[this.fieldName].map((i, index) => {
          return (<div key={'l'+index} className='inputs'>
            <div className='lineInputs'>
              <div>
                <label>{t('TELEPHONE')}</label>
                <span>{t('REQUIRED')}</span>
              </div>

              <div>
                <input
                  placeholder='Phone number'
                  name='phone'
                  data-index={index}
                  type='text'
                  value={i.phone}
                  onChange={this.handleChangeInList}
                />
              </div>
            </div>

            <div className='lineInputs'>
              <div>
                <label>{t('TYPE')}</label>
                <span>{t('REQUIRED')}</span>
              </div>
                <select
                  value={i.userPhoneTypeId}
                  onChange={this.handleChangeInList}
                  className='input-lingo mediumSelect'
                  name='userPhoneTypeId'
                  data-index={index}
                >
                  <option value="1">Commercial</option>
                  <option value="2">Residential</option>
                  <option value="3">Mobile</option>
                  <option value="4">Whatsapp</option>
                </select>
              </div>
              <div className='lineInputs'>
                {index === 0 && (
                  <button
                    type="button"
                    data-index={index}
                    style={{width:'150px'}}
                    className='addInput'
                    onClick={this.addFieldInList}
                  >
                    Add {t('TELEPHONE')} +
                  </button>
                )}
                {index > 0 && (
                  <button
                    type="button"
                    data-index={index}
                    className='delete'
                    onClick={this.removeFieldInList}
                  >
                    {t('BTN_DELETE')}
                  </button>
                )}
              </div>
            </div>)
        })}
      </div>
    )
  }
}

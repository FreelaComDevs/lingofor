import React, { Component } from 'react';


export default class Country extends Component {

  fieldName = 'countryId';

  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
  }

  async componentDidMount() {
    const countries = await this.props.apiClient.fetchCountries();
    this.setState({ countries });
  }

  render() {
    const { t, handleChange } = this.props;
    const { item } = this.props;
    return (
      <div className='lineInputs'>
        <div>
          <label>{t('COUNTRY')}</label>
          <span>{t('REQUIRED')}</span>
        </div>
        <select
          value={item.countryId}
          onChange={handleChange}
          className='input-lingo mediumSelect'
          name={this.fieldName}
        >
          <option>Select</option>
          {this.state.countries.map(i => {
            return <option key={i.id} value={i.id}>{i.name}</option>
          })}
        </select>
      </div>
    )
  }
}

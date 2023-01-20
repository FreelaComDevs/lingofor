import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';


const emptyFilter = {
    take: '',
    skip: '',
    name: '',
    countryId: 0,
    active: '',
    nativeLanguageId: '',
    otherLanguageId: '',
    responsibleLanguageId: ''
}

class CoordinatorsFilter extends Component {

    constructor (props) {
        super(props)
        this.i18n = this.props.i18n
        this.t = this.props.t

        this.state = emptyFilter
      
        this.applyFilters = this.applyFilters.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    applyFilters (e) {
        e.preventDefault();
        const state = this.state;
        const filter = Object.assign({}, emptyFilter,
            state.name && { name: state.name },
            state.responsibleLanguageId && { responsibleLanguageId: parseInt(state.responsibleLanguageId) },
            state.countryId && { countryId: parseInt(state.countryId) },
            state.active !== '' && { active: state.active || state.active === 'true' }
        )

        this.setState(filter, () => { this.props.fetchCoordinators(filter) })
    }

    clearFilters () {
        const filter = Object.assign({}, emptyFilter);
        this.setState(filter, () => {
            this.props.fetchCoordinators(filter)
        })
    }

    handleChange (e) {
        e.preventDefault();
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    render () {
        const { countries, lingoLanguages } = this.props;
        return (
            <div className='bigBox'>
                <h2><i className="fa fa-filter" aria-hidden="true"></i>Filters</h2>
                <form onSubmit={this.applyFilters}>
                    <div className='formulario'>
                        <div className='lineInput'>
                            <label htmlFor='name'>{this.t('NAME')}</label>
                            <input placeholder='User name' name='name' onChange={this.handleChange} value={this.state.name} />
                        </div>

                        <div className='lineInput'>
                            <label htmlFor='responsibleLanguageId'>{this.t('LINGO_THAT_COORDINATES')}</label>
                            <select name='responsibleLanguageId' value={this.state.responsibleLanguageId} onChange={this.handleChange}>
                            <option>Select</option>
                            {lingoLanguages.map(item => {
                                return <option key={item.id*5} value={item.id}>{item.description}</option>
                            })}
                            </select>
                        </div>

                        <div className='lineInput'>
                            <label htmlFor='countryId'>{this.t('COUNTRY')}</label>
                            <select name='countryId' value={this.state.countryId} onChange={this.handleChange}>
                            <option value="0">Select</option>
                            {countries.map(item => {
                                return <option key={item.id*6} value={item.id}>{item.name}</option>
                            })}
                            </select>
                        </div>

                        <div className='lineInput'>
                            <label htmlFor='active'>Status</label>
                            <select name='active' value={this.state.active} onChange={this.handleChange}>
                            <option>Select</option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button type="button" style={{width: '130px'}} onClick={this.clearFilters}>{this.t('CLEAR_FILTERS')}</button>
                        <div>
                            <button type="submit">{this.t('FILTER')}</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

CoordinatorsFilter.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object,
    countries: PropTypes.array,
    lingos: PropTypes.array,
    fetchCoordinators: PropTypes.func
}
  
export default translate('translations')(CoordinatorsFilter)
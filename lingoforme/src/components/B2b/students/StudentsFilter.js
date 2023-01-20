import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from './actions';


export class StudentsFilter extends Component {

    constructor (props) {
        super(props)
        const { service } = props;
        this.state = Object.assign({}, service.getEmptyFilter(), {
            students: []
        });
    }

    applyFilters = async e => {
        e.preventDefault();
        const { apiClient, actions, contract } = this.props;
        const state = {...this.state};
        delete state.students;
        const filter = {
          ...state,
          contractId: contract.id
        };
        const students = await apiClient.fetchStudents(filter);
        actions.setStudents(students);
    }

    clearFilters = async () => {
        const { apiClient, actions, contract } = this.props;
        const emptyFilter = this.props.service.getEmptyFilter();
        this.setState({
          ...this.state,
          filter: emptyFilter
        });
        const filter = {
          ...emptyFilter,
          contractId: contract.id
        };
        const students = await apiClient.fetchStudents(filter);
        actions.setStudents(students);
    }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    render () {
        const { t } = this.props;
        return (
            <div className='bigBox'>
                <h2><i className="fa fa-filter" aria-hidden="true"></i>Filters</h2>
                <form method="post" onSubmit={this.applyFilters} style={{margin:0}}>
                    <div className='formulario'>
                        <div className='lineInput'>
                            <label>{t('NAME')}</label>
                            <input placeholder='Student name' name='name' onChange={this.handleChange} value={this.state.name} />
                        </div>

                        <div className='lineInput'>
                            <label>{t('EMAIL')}</label>
                            <input placeholder='Email' name='email' onChange={this.handleChange} value={this.state.email} />
                        </div>

                        <div className='lineInput'>
                            <label>Status</label>
                            <select name='active' value={this.state.active} onChange={this.handleChange}>
                                <option value="">Select</option>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="filtersBottom">
                        <div className="items tiny"></div>
                        <div className="items large text-center">
                            <div className="show-extras">

                            </div>
                        </div>
                        <div className='items tiny buttons text-right'>
                            <button type="button" className="btn-clear-filter" onClick={this.clearFilters}>{t('CLEAR_FILTERS')}</button>
                            <button type="submit" className="btn-filter">{t('FILTER')}</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

StudentsFilter.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object,
    deps: PropTypes.object
}

const mapStateToProps = state => {
  return {
    contract: state.contracts.contract
  };
};

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(StudentsFilter))

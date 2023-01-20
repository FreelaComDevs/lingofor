import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from '../contracts/actions';


export class ContractsFilter extends Component {

    constructor (props) {
        super(props)
        const { service, util } = props;
        const filterDates = util.getListOfFilterDates();
        this.state = Object.assign({}, service.getEmptyContractFilter(), {
            filterDates,
            students: []
        });
    }

    applyFilters = async e => {
        e.preventDefault();
        const filter = {...this.state,
            economicGroupId: null,
            countryId: null
        };
        const { setParentState } = this.props;
        setParentState({ loading: true });
        const { service, actions } = this.props;
        service.fetchContracts(filter, items => {
            actions.setContracts(items);
            setParentState({ loading: false });
        });
    }

    clearFilters = async e => {
        e.preventDefault();
        const { service, actions, setParentState } = this.props;
        const filter = service.getEmptyContractFilter();
        const newState = {...this.state, ...filter};
        this.setState(newState);
        setParentState({ loading: true });
        service.fetchContracts(filter, items => {
            actions.setContracts(items);
            setParentState({ loading: false });
        });
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
                            <label>{t('CONTRACT_NUMBER')}</label>
                            <input placeholder='Contract number' name='code' onChange={this.handleChange} value={this.state.code} />
                        </div>


                        <div className='lineInput'>
                            <label>{t('PERIOD_START')}</label>
                            <select name='startDate' value={this.state.startDate} onChange={this.handleChange}>
                            <option value=''>Select</option>
                                {this.state.filterDates.map(item => {
                                    return <option value={item.value} key={JSON.stringify(item.value)}>{item.description}</option>
                                })}
                            </select>
                        </div>
                        <div className='lineInput'>
                            <label>{t('PERIOD_END')}</label>
                            <select name='endDate' value={this.state.endDate} onChange={this.handleChange}>
                                <option value=''>Select</option>
                                {this.state.filterDates.map(item => {
                                    return <option value={item.value} key={JSON.stringify(item)}>{item.description}</option>
                                })}
                            </select>
                        </div>

                        <div className='lineInput'>
                            <label>Status</label>
                            <select name='active' value={this.state.active} onChange={this.handleChange}>
                                <option>Select</option>
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

const mapStateToProps = state => {
  return {
    contract: state.contracts.contract
  };
};

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ContractsFilter))

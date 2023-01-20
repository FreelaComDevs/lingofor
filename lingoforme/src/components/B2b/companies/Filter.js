import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';


const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: 3,
      marginLeft: -20,
    }
});


export class CompaniesFilter extends Component {

    constructor (props) {
        super(props)

        const { util, service } = props;
        const filterDates = util.getListOfFilterDates();
        this.state = Object.assign({}, service.getEmptyFilter(), {
            filterDates,
            economicGroups: [],
            statusOptions: []
        });
    }

    componentDidMount() {
        const { service } = this.props;
        const self = this;

        service.fetchEconomicGroups((items) => {
            self.setState({ economicGroups: items })
        });
    }

    applyFilters = e => {
        e.preventDefault();
        const { service, setParentState } = this.props;
        const filter = Object.assign({}, this.state, {
            economicGroupId: parseInt(this.state.economicGroupId)
        });
        setParentState({ loading: true });
        service.fetchCompanies(filter, (companies) => {
            setParentState({ companies, loading: false });
        })
    }

    clearFilters = () => {
        const filter = this.props.service.getEmptyFilter();
        const newState = Object.assign({}, this.state, filter);
        this.setState(newState);
        // this.applyFilters({
        //     preventDefault: () => {}
        // });
        const { service, setParentState } = this.props;
        setParentState({ loading: true });
        service.fetchCompanies(filter, (companies) => {
            setParentState({ companies, loading: false });
        })
    }

    handleChange = e => {
        this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        })
    }

    

    render () {        
        const { t } = this.props;
        const statusOptions = [ 
        {
          label: "Select",
          value: ''
        }, 
        {
          label: "Active",
          value: true
        },
        {
          label: "Inactive",
          value: false
        } 
      ]

        return (
            <div className='bigBox'>
                <h2><i className="fa fa-filter" aria-hidden="true"></i>Filters</h2>
                <form onSubmit={this.applyFilters}>
                    <div className='formulario'>
                        <div className='lineInput'>
                            <label>{t('COMPANY')}</label>
                            <input placeholder='Company name' name='responsibleName' onChange={this.handleChange} value={this.state.responsibleName} />
                        </div>

                        <div className='lineInput'>
                            <label>{t('ECONOMIC_GROUP')}</label>
                            <select name='economicGroupId' value={this.state.economicGroupId} onChange={this.handleChange}>
                            <option value="0">Select</option>
                            
                            {this.state.economicGroups.sort((a, b) => (a.name > b.name) ? 1 : -1).map(item => {
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })}
                            </select>
                        </div>

                        <div className='lineInput'>
                            <label>{t('PERIOD_START')}</label>
                            <select name='registerDateFrom' value={this.state.registerDateFrom} onChange={this.handleChange}>
                            <option value=''>Select</option>
                                {this.state.filterDates.map(item => {
                                    return <option value={item.value} key={JSON.stringify(item.value)}>{item.description}</option>
                                })}
                            </select>
                        </div>
                        <div className='lineInput'>
                            <label>{t('PERIOD_END')}</label>
                            <select name='registerDateTo' value={this.state.registerDateTo} onChange={this.handleChange}>
                                <option value=''>Select</option>
                                {this.state.filterDates.map(item => {
                                    return <option value={item.value} key={JSON.stringify(item)}>{item.description}</option>
                                })}
                            </select>
                        </div>

                        <div className='lineInput'>
                            <label>Status</label>
                            <select name='active' value={this.state.active} onChange={this.handleChange}>
                              {statusOptions.map( option => { return <option value={option.value} key={option.label}>{option.label}</option>})}
                                {/* <option value={false}>Select</option>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option> */}
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

CompaniesFilter.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object,
    deps: PropTypes.object
}

export default withStyles(styles)(translate('translations')(CompaniesFilter))


import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Header from '../_common/header/Header';
import SideMenu from '../_common/SideMenu/SideMenu';
import axios from 'axios';
import Placeholder from '../_common/placeholder/placeholderByPage';
import PATH_SERVER from '../_api/PATH_SERVER';
import {FlagIcon} from 'react-flag-kit';

import {FilterUser, TableUser} from './styles';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
// import { MenuItem } from '@material-ui/core';

import Engrenagem from '../../images/icons/icon_planspricing_header.svg'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    // margin: theme.spacing.unit,
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
    marginTop: 0,
    marginLeft: -15,
  },
});

class PlansAndPrices extends Component {
  constructor (props) {
    super (props);
    this.t = this.props.t;

    //this.serv = new Services()

    this.callApi = this.callApi.bind (this)
    this.clearFilters = this.clearFilters.bind (this)
    this.applyFilters = this.applyFilters.bind (this)
    this.handleChange = this.handleChange.bind (this)
    this.handleKeyPress = this.handleKeyPress.bind (this)
    this.renderFlags = this.renderFlags.bind (this)
    this.unlimitedImg = this.unlimitedImg.bind(this)

    this.state = { 
      limit: '10',
      listPlanAndPrices: [],
      ligos: [],
      lingoLanguageId: '',            
      planName: '',
      skip: null,
      take: null,
      bestSeller: null,
      active: null,
      loading: false,
      success: false,
      list: [],
      loadingList: false
    } 

    this.loggedHeader = {
      'Content-Type': 'application/json',
    }
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.handleChange(e)
    }
  }

  unlimitedImg () {
    return (
      <img style={{width: '24px'}} src={require(`../../images/flag_multilingo.png`)} alt='multilingo' />
    )
  }

  clearFilters () {
    this.setState (
      {
        lingoLanguageId: null,
        planName: null,
        bestSeller: null,
        active: null,
      },
      () => this.applyFilters ()
    )
  }

  applyFilters () {
    if (!this.state.loading) {
      this.setState (
        {
          success: false,
          loading: true,
        }
      )
    }

    let strFilter = {
      criteria: {
        lingoLanguageId: this.state.lingoLanguageId,
        planName: this.state.planName,
        bestSeller: this.state.bestSeller,
        active: this.state.active
      },
    }

    axios
      .post (`${PATH_SERVER.DOMAIN}/plans/search`, JSON.stringify (strFilter), {
        headers: this.loggedHeader,
      })
      .then (res => {
        //console.log(res);

        this.setState ({
          listPlanAndPrices: res.data.result.items,
          loading: false,
        });
      })
      .catch (err => console.log ('ERROR kkk ', err))
  }

  handleChange (e) {
    e.preventDefault()
    
    this.setState ({
      [e.target.name]: (e.target.value === 'Select') ? null : e.target.value
    })
  }

  componentWillMount () {
    this.callApi ();
  }

  callApi () {
    let objSearch = {
      criteria: {
        skip: 0,
        take: 1000,
        languageId: '',
        active: null,
        planName: '',
        bestSeller: null,
      },
    }

    axios.post (`${PATH_SERVER.DOMAIN}/plans/search`, JSON.stringify (objSearch), {
      headers: this.loggedHeader,
    })
      .then (response => {
        this.setState ({
          listPlanAndPrices: response.data.result.items,
        })
      })
      .catch (err => {
        let arrPages = []
        for (let i = 0; i < 83; i++) {
          arrPages.push ('página')
        }
        //console.log(arrPages)

        this.setState ({
          totalPlans: 83,
          totalPages: arrPages,
          listPlanAndPrices: [

          ]
        })
      })
    
    this.setState({loadingList: true})
    axios.get (`${PATH_SERVER.DOMAIN}/lingolanguages/getall`)
      .then (response => {
        this.setState ({
          ligos: response.data.result.items,
          loadingList: false
        })
      })
      .catch (err => console.log('nada acontece'))

    console.log (objSearch)
  }

  renderFlags (listItem) {
    if(listItem.multiLingo) {
      return <div >{this.unlimitedImg()}</div>
    } else {
      return (<div >{
        listItem.flag.split(',').map(flagStr => {
          return <FlagIcon style={{marginRight: '5px'}}key={flagStr.trim()} code={flagStr.trim()}/>
        })
      }</div>)
    }
  }

  render () {
    const {loading, success, loadingList} = this.state;
    const {classes} = this.props;
    const buttonClassname = classNames ({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className="view">
        <SideMenu />

        <section>
          <Header/>
          <div className="toptitle">      
              <img src={Engrenagem} alt="Engrenagem" />    
              <h1>Plans and Prices</h1>                   
          </div>

          <FilterUser>
            <div className="button">
              <Link to="/plans-and-prices/new">
                <button>
                  <i className="fa fa-plus" aria-hidden="true" />Add new Plan
                </button>
              </Link>
            </div>
            <div className="container">
              <div className="bigBox">
                <h2><i className="fa fa-filter" aria-hidden="true" />Filters</h2>
                <form className="formulario">
                  <div className="lineInput">
                    <label htmlFor="name">Plan Name</label>
                    <input
                      onKeyPress={this.handleKeyPress}
                      placeholder="Plan Name"
                      name="planName"
                      onChange={this.handleChange}
                      value={this.state.planName}
                    />
                  </div>

                  <div className="lineInput">
                    <label htmlFor="gender">Lingo</label>
                    <select
                      name="lingoLanguageId"
                      value={this.state.lingoLanguageId}
                      onChange={this.handleChange}
                    >
                      <option>Select</option>
                      {this.state.ligos.map (item => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.language.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="lineInput">
                    <label htmlFor="gender">Best Seller</label>
                    <select
                      name="bestSeller"
                      value={this.state.bestSeller}
                      onChange={this.handleChange}
                    >
                      <option>Select</option>
                      <option value>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>

                  <div className="lineInput">
                    <label htmlFor="gender">Status</label>
                    <select
                      name="active"
                      value={this.state.active}
                      onChange={this.handleChange}
                    >
                      <option>Select</option>
                      <option value>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </div>

                </form>

                <div className="buttons">
                  <button onClick={this.clearFilters}>Clear filters</button>
                  <div className={classes.wrapper}>
                    <button
                      onClick={this.applyFilters}
                      className={buttonClassname}
                      disabled={loading}
                    >
                      Filter
                    </button>
                    {loading &&
                      <CircularProgress
                        size={14}
                        className={classes.buttonProgress}
                      />}
                  </div>
                </div>

              </div>
            </div>
          </FilterUser>

          
          {
              loadingList &&
              <h2 className="text-center"></h2> 
          }

          {

            !loadingList && 
              <div> 

                {this.state.listPlanAndPrices.length > 0 &&
                  <TableUser>
                    <div className="container">
                      <div className="bigBox">
                        <table>
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <th>Lingos</th>
                              <th>Number of classes</th>
                              <th>Status</th>
                            </tr>

                            {this.state.listPlanAndPrices.map (list => {
                              return (
                                <tr key={list.id}>
                                  <td>{list.nameEnglish}</td>
                                  <td>{this.renderFlags(list)}</td>
                                  <td>{(list.totalClasses === 0) ? 'Unlimited' : list.totalClasses}</td>
                                  <td>
                                    <span
                                      style={{color: list.active ? '#0ED572' : '#FF5666'}}
                                    >
                                      {list.active ? 'Ativo' : 'Inativo'}
                                    </span>
                                  </td>
                                  <td>
                                    <Link to={`/plans-and-prices/${list.id}`}>
                                      <button>
                                        View
                                        {' '}
                                        <i
                                          className="fa fa-angle-right"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TableUser>}

                {this.state.listPlanAndPrices.length === 0 &&
                  <Placeholder pageName="users" textMsg="No results" />}
             </div>
                    
          }
          </section>
          
      </div>
    );
  }
}

PlansAndPrices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (PlansAndPrices);

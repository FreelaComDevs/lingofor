import React, { Component } from 'react'

import Services from '../_api/Services'
// import PATH_SERVER from '../_api/PATH_SERVER'
import {Link} from 'react-router-dom'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'

import { TableUser, FilterUser } from './styles'
import Placeholder from '../_common/placeholder/placeholderByPage';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

import Engrenagem from '../../images/icons/icon_users_header.svg'

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
    marginTop: 3,
    marginLeft: -20,
  },
});

class Users extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userList: [],
      name: '',
      login: '',
      profileId: 0,
      profiles: [
        {id: 'customerService', name: 'Customer Service'},
        {id: 'companyManager', name: 'Company Manager'},
        {id: 'b2b', name: 'B2B'}
      ],
      countryId: 0,
      countries: [],
      active: 0,
      loading: false,
      success: false,
      loadingList: false
    }

    console.log('state constructor ', this.state)
    this.serv = new Services()

    this.applyFilters = this.applyFilters.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.callApi = this.callApi.bind(this)
  }

  componentWillMount () {
    this.callApi()
    clearTimeout(this.timer)
  }

  callApi (skipCount = 0) {
    this.serv.get('countries/getall')
      .then(res => {
        this.setState({
          countries: res.result.items
        })
      })
      .catch(err => console.log('err countryGetAll ', err))
    this.setState({ loadingList: true})
    this.serv.noAuthGet(`admin/users?skip=${skipCount}&take=255`)
      .then(res => {
        console.log('RESULT ', res)

        this.setState({
          userList: res.result.items,
          loadingList: false
        })
      })
      .catch(err => console.log('ERRO GET USERS ', err))
  }

  applyFilters () {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        // () => {
        //   this.timer = setTimeout(() => {
        //     this.setState({
        //       loading: false,
        //       success: true,
        //     });
        //   }, 8000);
        // },
      )
    }

    let strFilter = '?skip=0&take=255'
    strFilter += (this.state.name !== '') ? `&name=${this.state.name}` : ''
    strFilter += (this.state.login !== '') ? `&login=${this.state.login}` : ''
    strFilter += (this.state.profileId !== 0) ? `&profileId=${this.state.profileId}` : ''
    strFilter += (this.state.countryId !== 0) ? `&countryId=${this.state.countryId}` : ''
    strFilter += (this.state.active !== 0) ? `&active=${this.state.active}` : ''
      

    console.log('strFilter ', strFilter)
     
    this.serv.get('admin/users' + strFilter)
      .then(res => {
        console.log(res)
        this.setState({
          userList: res.result.items,
          loading: false,
          loadingList: false
        })
      })
      .catch(err => console.log('ERROR GET USERS LIST ', err))
  }

  clearFilters () {
    this.setState({
      name: '',
      login: '',
      profileId: 0,
      countryId: 0,
      active: 0
    }, () => this.applyFilters())
  }

  

  handleChange (e) {
    this.setState({
      [e.target.name]: (e.target.value === 'Select') ? 0 : e.target.value
    })
  }

  render () {

    const { loading, success, loadingList } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className='view'>
        <SideMenu />
        <section>
          <Header/>
          <div className="toptitle">      
              <img src={Engrenagem} alt="Engrenagem" />    
              <h1>Users</h1>                   
          </div>
          <FilterUser>
            <div className='container'>
              <div className='button'>
                <Link to={{ pathname: '/users/new' }}>
                  <button>
                    <i className='fa fa-plus' aria-hidden='true' /> Add new User
                  </button>
                </Link>
              </div>

              <div className='bigBox'>
              <h2><i class="fa fa-filter" aria-hidden="true"></i>Filters</h2>
                <form className='formulario'>
                  <div className='lineInput'>
                    <label htmlFor='name'>Name</label>
                    <input placeholder='User name' name='name' onChange={this.handleChange} value={this.state.name} />
                  </div>
                  <div className='lineInput'>
                    <label htmlFor='login'>Login</label>
                    <input placeholder='Login' name='login' onChange={this.handleChange} value={this.state.login} />
                  </div>
                  <div className='lineInput'>
                    <label htmlFor='profileId'>Profile</label>
                    <select name='profileId' value={this.state.profileId} onChange={this.handleChange}>
                      <option>Select</option>
                      {this.state.profiles.map(item => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                      })}
                    </select>
                  </div>
                  <div className='lineInput'>
                    <label htmlFor='countryId'>Country</label>
                    <select name='countryId' value={this.state.countryId} onChange={this.handleChange}>
                      <option>Select</option>
                      {this.state.countries.map(item => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                      })}
                    </select>
                  </div>
                  <div className='lineInput'>
                    <label htmlFor='status'>Status</label>
                    <select name='active' value={this.state.active} onChange={this.handleChange}>
                      <option>Select</option>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </div>
                </form>

                <div className='buttons'>
                  <button onClick={this.clearFilters}>Clear filters</button>
                  <div className={classes.wrapper}>
                    <button onClick={this.applyFilters} className={buttonClassname} disabled={loading} >Filter</button>
                    {loading && <CircularProgress size={14} className={classes.buttonProgress} />}
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

                {this.state.userList.length > 0 &&
                  <TableUser>
                    <div className='container'>
                      <div className='bigBox'>
                        <table>
                          <tr>
                            <th>Name</th>
                            <th>Login</th>
                            <th>Profile</th>
                            <th>Country</th>
                            <th>Status</th>
                          </tr>

                          {this.state.userList.map(item => {
                            return (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                {/* <td>{(item.role === 'companyManager') ? 'Company Manager' : 'Customer Service'}</td> */}
                                <td>{(item.role === "companyManager") ? "Company Manager" : (item.role === "customerService") ? "Customer Service" : "B2B" }</td>
                                <td>{item.country.name}</td>
                                <td><span className={(!item.active) ? 'inativo' : ''}>{(item.active) ? 'Active' : 'Inactive'}</span></td>
                                {/* <td><button onClick={() => this.handleClickItem(item)}>View ></button></td> */}
                                <td>
                                  <Link to={{
                                    pathname: '/users/' + item.id,
                                    state: { info: item }
                                  }} >
                                  <button>View <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                  </Link>
                                </td>
                              </tr>
                            )
                          })}
                        </table>
                      </div>
                    </div>
                  </TableUser>
                }
                {this.state.userList.length === 0 &&
                  <Placeholder pageName='users' textMsg='No results' />
                }
              </div>
                    
          }

        </section>
      </div>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);

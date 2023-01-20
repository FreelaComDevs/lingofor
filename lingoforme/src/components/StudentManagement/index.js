import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Services from '../_api/Services'
import {Link} from 'react-router-dom'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Loading from 'react-fullscreen-loading'
import queryString from 'query-string'

import { TableUser, FilterUser } from './styles'
import Placeholder from '../_common/placeholder/placeholderByPage'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FlagIcon } from 'react-flag-kit'

import { translate } from 'react-i18next'

import UsersIcon from '../../images/icons/icon_students_header.svg'


import Pagination from '../_common/pagination';

class Students extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userList: [],
      countries: [],  
      lingos: [],    
      levels: [],
      economicgroups: [],
      companies: [],
      totalPages: 0,
      totalFound: 0,
      filter: {
        pageNumber: 1,
        pageSize: 20,        
        name:'',
        planId:0,
        login:'',
        focus:0,
        struct:0,
        lingoLanguageId:0,
        countryId:0,
        levelId:0,
        coupon:0, //bool
        subscriptionDate:undefined, //string
        active:0,
        demoClass:0,
        paymentProblems:0,
        cancelDate:undefined, //string
        b2bOnly:0, //bool
        economicGroupId:0,
        companyId:0
      },
      loading: true,
      expanded:false
    }

    this.i18n = this.props.i18n
    this.t = this.props.t
    this.serv = new Services()

    this.applyFilters = this.applyFilters.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFilterPanel = this.handleFilterPanel.bind(this)    
    this.callApi = this.callApi.bind(this)

  }
  
  componentWillMount () {
    this.callApi(true)
    //this.getPageNumberCurrent()
  }

  componentDidMount () {
    
		this.getPageNumberCurrent()
	}

  getPageNumberCurrent = () => {

		const params = queryString.parse(this.props.location.search);
		const { filter }  = this.state

		if(params && params["page"]){
			filter["pageNumber"] = Number(params["page"])
			this.setState({filter});
		}
	}

	pagination = (page, type) => {

		const { filter }  = this.state
		filter["pageNumber"] = Number(page)

		this.setState({filter});

		this.applyFilters();
	}

 

  callApi (skipCount = 0) {

    this.serv.get('countries/getall')
    .then(res => {
      this.setState({
        countries: res.result.items
      })
    })
    .catch(err => console.log('err countryGetAll ', err))
    
    this.serv.get('lingolanguages/getall')
    .then(res => {
      this.setState({
        lingos: res.result.items
      })
    })
    .catch(err => console.log('err lingolanguages ', err))

    this.serv.get('levels')
    .then(res => {
      this.setState({
        levels: res.result.items
      })
    })
    .catch(err => console.log('err levels ', err))

    this.serv.get('economicgroups?skip=0&take=9999')
    .then(res => {
      this.setState({
        economicgroups: res.result.items
      })
    })
    .catch(err => console.log('err economicgroups ', err))

    const filterCompanies = {
      "pageNumber": 1,
      "pageSize": 9999,
      "socialName": null,
      "fantasyName": null,
      "documentNumber": null,
      "economicGroupId": null,
      "registerDate": "1910-01-01",
      "active": true,
      "responsibleName": null,
      "responsibleEmail": null
    }
    this.serv.ApiPosts(`companies/search`,filterCompanies)
    .then(res => {
      console.log('RESULT COMPANIES', res.data)
      this.setState({
        companies: res.data.result.items
      })
    })
    .catch(err => console.log('ERRO GET COMPANIES ', err))    

    this.applyFilters ()
  }

  applyFilters () {
    this.setState({loading: true })
    //this.setState({ loading: true })
    let cleanFilter = { ...this.state.filter }
    Object.keys(cleanFilter).forEach((key) => (cleanFilter[key] === undefined || cleanFilter[key] === '' || cleanFilter[key] === 0) && delete cleanFilter[key])

    //force b2b if company or econmicGroupId 
    cleanFilter.b2bOnly = cleanFilter.companyId || cleanFilter.economicGroupId  ? true : cleanFilter.b2bOnly 

    this.serv.ApiPosts(`studentManagement/searchStudents`,cleanFilter)
    .then(res => {
      this.setState({
        userList: res.data.result.items,  
        totalPages: res.data.result.totalPages,      
        totalFound: res.data.result.totalFound,      
        loading: false
      })
    })
    .catch(err => {
      this.setState({loading: true })
    })
  }

  clearFilters () {
    this.setState({
      filter: {
        pageNumber: 1,
        pageSize: 10,        
        name:'',
        planId:0,
        login:'',
        focus:0,
        struct:0,
        lingoLanguageId:0,
        countryId:0,
        levelId:0,
        coupon:0, //bool
        subscriptionDate:undefined, //string
        active:0,
        demoClass:0,
        paymentProblems:0,
        cancelDate:undefined, //string
        b2bOnly:0, //bool
        economicGroupId:0,
        companyId:0
      },
      loading: true
    }, () => this.applyFilters())
  }

  handleFilterPanel(e){
    e.preventDefault()
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  handleChange (e) {
    const target = e.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    
    //Boleanos
    if(value !== undefined && name === 'active' || name==='coupon' || name === 'demoClass' || name === 'paymentProblems' || name === 'b2bOnly')
      value = value === 'true' ? true : false 
    else if(value !== undefined && e.target.tagName === 'SELECT' && (name !== 'focus' && name !== 'struct'))
      value = parseInt(value) 

    let filters = this.state.filter
    filters[name] = value
    this.setState({ filter : filters })
  }

  render () {
    const { t, state } = this
    const { totalPages, totalFound, filter: { id, creatorUserId, role, ticketTypeId, ticketSubTypeId, createdAt, status, pageNumber,pageSize }} = state;
    return (
      <div className='view'>
        <SideMenu />
        <section>
          <Header/>
          <div className="toptitle">      
              <img src={UsersIcon} alt="UsersIcon" />    
              <h1>{this.t('ITEM_STUDENTS')}</h1>                   
          </div>
          {
            this.state.loading &&
            <Loading loading={true} background="rgba(0,0,0,0.6)"  loaderColor="#3498db"/>
          } 
          <FilterUser>
            <div className='container'>
              <div className='bigBox'>

                  <h2><i className="fa fa-filter" aria-hidden="true"></i>Filters</h2>
                  <form className='formulario'>
                    <div className='lineInput'>
                      <label htmlFor='name'>Name</label>
                      <input placeholder='User name' name='name' onChange={this.handleChange} value={this.state.filter.name || ''} />
                    </div>
                    <div className='lineInput'>
                      <label htmlFor='login'>Email</label>
                      <input placeholder='Login' name='login' onChange={this.handleChange} value={this.state.filter.login || ''} />
                    </div>
                    <div className='lineInput'>
                      <label htmlFor='status'>Status</label>
                      <select name='active' value={this.state.filter.active} onChange={this.handleChange}>
                          <option value="0">{t('SELECT')}</option>
                          <option value={true}>{t('ACTIVE')}</option>
                          <option value={false}>{t('INACTIVE')}</option>
                      </select>
                    </div>
                  </form>

                { this.state.expanded && 
                  <div>
                  <hr style={{width: '100%',margin: '0'}}/><br/>
                  <form className='formulario'>
                      
                      <div className='lineInput'>

                        <label htmlFor='countryId'>Country</label>
                        <select name='countryId' value={this.state.filter.countryId} onChange={this.handleChange}>
                            <option value="0">{t('SELECT')}</option>
                            {this.state.countries.map((item) => {
                                return (<option key={item.id} value={item.id}>{item.name}</option>)
                            })}
                        </select>

                        <label htmlFor='demoClass'>Demo class</label>
                        <select name='demoClass' value={this.state.filter.demoClass} onChange={this.handleChange}>
                          <option value="0">{t('SELECT')}</option>
                          <option value={true}>{t('BTN_YES')}</option>
                          <option value={false}>{t('BTN_NO')}</option>
                        </select>

                        <label htmlFor='b2bOnly'>B2B</label>
                        <select name='b2bOnly' value={this.state.filter.b2bOnly === undefined ? '0':this.state.filter.b2bOnly } onChange={this.handleChange}>
                          <option value="0">{t('SELECT')}</option>
                          <option value={true}>{t('BTN_YES')}</option>
                          <option value={false}>{t('BTN_NO')}</option>
                        </select>
                      </div>


                      <div className='lineInput'>

                        <label htmlFor='lingoLanguageId'>Lingo</label>
                        <Select
                            name="lingoLanguageId"
                            value={this.state.filter.lingoLanguageId}
                            onChange={this.handleChange}
                            className='input-lingo'
                            >
                            <MenuItem key={'mi'+-1} value={0}>{t('SELECT')}</MenuItem>
                            {this.state.lingos.map((item,index) => {
                                return <MenuItem key={index} value={item.id}><FlagIcon code={item.flag} />{item.description}</MenuItem>
                            })}
                        </Select>

                        <label htmlFor='coupon'>Coupon</label>
                        <select name='coupon' value={this.state.filter.coupon} onChange={this.handleChange}>
                          <option value="0">{t('SELECT')}</option>
                          <option value={true}>{t('BTN_YES')}</option>
                          <option value={false}>{t('BTN_NO')}</option>
                        </select>

                        <label htmlFor='economicGroupId'>Economic Group</label>
                        <select name='economicGroupId' value={this.state.filter.economicGroupId} onChange={this.handleChange}>
                            <option value="0">{t('SELECT')}</option>
                            {this.state.economicgroups.map((item) => {
                                return (<option key={item.id} value={item.id}>{item.name}</option>)
                            })}
                        </select>

                      </div>
                      <div className='lineInput'>

                        <label htmlFor='focus'>Focus</label>
                        <select name='focus' value={this.state.filter.focus} onChange={this.handleChange}>
                            <option value="0">{t('SELECT')}</option>
                            <option value={'business'}>{t('PLAN_BUSINESS')}</option>
                            <option value={'traditional'}>{t('PLAN_TRADITIONAL')}</option>                            
                        </select>

                        <label htmlFor='subscriptionDate'>Subscription date</label>
                        <input type="date" id='subscriptionDate' name="subscriptionDate" value={this.state.filter.subscriptionDate} onChange={this.handleChange} min="2000-01-01" max="2050-12-31" />

                        <label htmlFor='companyId'>Company</label>
                        <select name='companyId' value={this.state.filter.companyId} onChange={this.handleChange}>
                            <option value="0">{t('SELECT')}</option>
                            {this.state.companies.map((item) => {
                                return (<option key={item.id} value={item.id}>{item.socialName}</option>)
                            })}
                        </select>
                      
                      </div>
                      <div className='lineInput'>

                        <label htmlFor='struct'>Structure</label>
                        <select name='struct' value={this.state.filter.struct} onChange={this.handleChange}>
                            <option value="0">{t('SELECT')}</option>
                            <option value={'conversational'}>{t('PLAN_CONVERSATIONAL')}</option>
                            <option value={'grammatical'}>{t('PLAN_GRAMMAR')}</option>                            
                            <option value={'balanced'}>{t('PLAN_BALANCED')}</option>
                        </select>

                        <label htmlFor='cancelDate'>Cancel date</label>
                        <input type="date" id='cancelDate' name="cancelDate" value={this.state.filter.cancelDate} onChange={this.handleChange} min="2000-01-01" max="2050-12-31" />

                      </div>
                      <div className='lineInput'>

                        <label htmlFor='levelId'>Levels</label>
                        <select name='levelId' value={this.state.filter.levelId} onChange={this.handleChange}>
                            <option value="0">{t('SELECT')}</option>
                            {this.state.levels.map((item) => {
                                return (<option key={item.id} value={item.id}>{item.level}</option>)
                            })}
                        </select>
                        

                        <label htmlFor='paymentProblems'>Payment Issues</label>
                        <select name='paymentProblems' value={this.state.filter.paymentProblems} onChange={this.handleChange}>
                          <option value="0">{t('SELECT')}</option>
                          <option value={true}>{t('BTN_YES')}</option>
                          <option value={false}>{t('BTN_NO')}</option>
                        </select>
                      </div>
                  </form>
                  </div>
                }

                <div className="boxButton">
                  <div className='buttonShow'>      
                    <button onClick={this.handleFilterPanel}>Show more +</button>
                  </div>

                  <div className='buttons'>                
                    <button onClick={this.clearFilters}>Clear filters</button>
                    <button onClick={this.applyFilters}  disabled={this.state.loading} >Filter</button>
                  </div>
                </div>
              </div>
             
            </div>
          </FilterUser>
          {

            !this.state.loading && 
              <div>

                {this.state.userList.length > 0 &&
                  <TableUser>
                    <div className='container'>
                      <div className='bigBox'>
                        <table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Login</th>
                              <th>Country</th>
                              <th>Subscription Date</th>
                              <th>Lingos</th>
                              <th>Status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.userList.map(item => {
                            return (
                              <tr key={item.userId}>
                                <td>{item.userName}</td>
                                <td>{item.userLogin}</td>                                
                                <td>{item.countryName}</td>
                                <td>{item.subscriptionDate}</td>
                                <td>
                                {item.flags.split(',').map((flag, i) => {
                                   return (<FlagIcon key={i} code={flag.trim()} />)                                 
                                })}
                                </td>
                                <td><span className={(!item.active) ? 'inativo' : ''}>{(item.active) ? 'Active' : 'Inactive'}</span></td>
                                {/* <td><button onClick={() => this.handleClickItem(item)}>View ></button></td> */}
                                <td>
                                  <Link to={{ pathname: '/manage-student/' + item.userId }} >
                                  <button>View <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                  </Link>
                                </td>
                              </tr>
                            )                            
                          })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <Pagination pageCurrent={pageNumber} totalPages={totalPages} totalFound={totalFound} pageSize={pageSize}  onClick={(page, type) => this.pagination(page, type)}/>
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

Students.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}

export default translate('translations') (Students);

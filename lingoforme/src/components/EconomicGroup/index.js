import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import axios from 'axios'
import Placeholder from '../_common/placeholder/placeholderByPage'
import PATH_SERVER from '../_api/PATH_SERVER'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'
import { Table, FilterUser} from './styles'

import Settings from '../../images/icons/icon_settings_header.svg'

// import { Table, FilterUser} from './styles';

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
  

class EconomicGroup extends Component {

    constructor (props) {
        super(props)

        this.applyFilters = this.applyFilters.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {         
            listEconomicGroup: [],
            name: null,
            code: null,
            description: null,
            active: null,
            skip: null,
            take: null,
            loadingList: false,
            loading: false,
            success: false
        }

        this.loggedHeader = {
            'Content-Type': 'application/json'
        }        
    }

    

    handleChange (e) {
        this.setState({
            [e.target.name]: (e.target.value === 'Select') ? null : e.target.value
        })
    }

    componentDidMount () {        
        this.setState({ loadingList: true})

        axios.get(`${PATH_SERVER.DOMAIN}/economicgroups?skip=0&take=100`)
        .then(response => {
            this.setState({ 
                listEconomicGroup: response.data.result.items,
                loading: false,
                loadingList: false
            });
        });

       // this.setState({loadingList: false})

    }

    clearFilters () {
        this.setState({
            name: '',
            code: '',
            description: '',
            active: null
        }, () => this.applyFilters())
    }

    applyFilters () {
        if (!this.state.loading) {
            this.setState(
              {
                success: false,
                loading: true,
              },
            );
            
        }

        let strFilter = {  
            name: this.state.name,          
            code: this.state.code,
            description: this.state.description,
            active: this.state.active,
            skip: this.state.skip,
            take: this.state.skip   
        }

        if (this.state.active === 'true') {
            strFilter.active = true
        } 

        if (this.state.active === 'null') {
            strFilter.active = false
        } 

        console.log(strFilter)

        //this.setState({ loading: true})
    
        axios.post(`${PATH_SERVER.DOMAIN}/economicgroups/search`, JSON.stringify(strFilter), { headers: this.loggedHeader })
        .then(res => {
            console.log('FILTRO', res)
            this.setState({
                listEconomicGroup: res.data.result.items,
                loading: false
            })
        })
        .catch(err => console.log('ERROR', err))
    }

    render() {

        const { loading, success, loadingList } = this.state;
        const { classes } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
        });

        return (

            
            <div className="view">
                <SideMenu/>                  

                <section>
                    <Header/>   
                    <div className="toptitle">      
                        <img src={Settings} alt="Settings" />    
                        <h1>Economic Group</h1>                   
                    </div>
                      
                    <FilterUser>
                        <div className='container'>
                        <div className='button'>
                                <Link to="/economic-group/new">
                                    <button><i class="fa fa-plus" aria-hidden="true"></i> Add new Group</button>
                                </Link>
                        </div>

                        <div className='bigBox'>
                        <h2><i class="fa fa-filter" aria-hidden="true"></i>Filters</h2>
                            <form className='formulario'>

                                <div className="rowInputs">
                                    <div className='lineInput'>
                                        <label htmlFor='name'>Group Name</label>
                                        <input placeholder='Name' name='name' value={this.state.name} onChange={this.handleChange} />
                                    </div>
                                    <div className='lineInput'>
                                        <label htmlFor='login'>Code</label>
                                        <input placeholder='Code' name='code' value={this.state.code} onChange={this.handleChange} />
                                    </div>

                                    <div className='lineInput'>
                                        <label htmlFor='status'>Status</label>
                                        <select name='active' value={this.state.active} onChange={this.handleChange}>
                                            <option>Select</option>
                                            <option value>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>                                        
                                    </div>
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
                            {
                                this.state.listEconomicGroup.length > 0 &&

                            
                                <Table>
                                
                                    <div className="container">
                                        
                                        <div className="bigBox">
                                            <table>
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                </tr>
                                                
                                                { 
                                                    this.state.listEconomicGroup.map(list => (
                                                    
                                                            <tr>                                                                 
                                                                <td>{list.code}</td>
                                                                <td>{list.name}</td>
                                                                <td>{list.description}</td>
                                                                <td><span style={{color: list.active ? '#0ED572' : '#FF5666'}}>{list.active ? 'Active' : 'Inactive' }</span></td>
                                                                <td>
                                                                    <Link to={`/economic-group/${list.id}`}>
                                                                        <button>View <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                                                    </Link>
                                                                </td>                                                                        
                                                            </tr>
                                                            

                                                    ))
                                                }
                                                    
                                                
                                            </table>
                                        </div>
                                    </div>

                                </Table>
                            }
                                    

                            {
                                this.state.listEconomicGroup.length === 0 &&
                                <Placeholder pageName='users' textMsg='No results' />
                            }
                        </div>
                    }
                            
                    
                </section>
           </div>
          
        );

    }
}

EconomicGroup.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(EconomicGroup);

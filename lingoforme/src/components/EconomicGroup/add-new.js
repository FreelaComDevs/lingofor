import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import Loading from 'react-fullscreen-loading'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Services from '../_api/Services'
import PATH_SERVER from '../_api/PATH_SERVER'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

import { Prices } from './styles'
import Settings from '../../images/icons/icon_settings_header.svg'

function Transition (props) {
    return <Slide direction='up' {...props} />
}


class EconomicGroup extends Component {

    constructor (props) {
        super(props)
        this.t = this.props.t
        this.services = new Services()
        this.handleChange = this.handleChange.bind(this)
        this.handlePost = this.handlePost.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.pageTitle = ''
        this.state = {
            loading: false,
            country_id: '',
            countries: [],
            countryId: '',
            name: '',
            code: '',
            description: '',      
            active: false,
            validate: true,
            redirect: false
        }

        this.loggedHeader = {
            'Content-Type': 'application/json'
        }
    }

    componentDidMount () {

        //console.log(this.state.countries.length)
    
        let countryId = this.props.match.params.id
        console.log('countryId = ', countryId)
    
        // monta campos preenchidos anteriormente
        if (countryId !== undefined) {
            // TODO implementar no res do get
            this.pageTitle = 'Name Countrie'
            axios.get(`${PATH_SERVER.DOMAIN}/economicgroups`)
            .then(res => {
              this.setState({
                countries: res.data.result.items
              })
            })
            .catch(err => console.log(err))
      
            axios.get(`${PATH_SERVER.DOMAIN}/economicgroups/${countryId}`)
            .then(res => {
              //console.log('##### response Paissssss ', res.data.result.items);
      
              res.data.result.items.map(item =>{
                this.pageTitle = item.name
                this.setState({
                  countryId: Number(countryId),
                  code: item.code,
                  active: item.active,
                  name: item.name,
                  description: item.description
                })
              })
      
              
            })
            .catch(err => {
              console.log(err)
            })
      
          // vai para add new
          } else {
            this.pageTitle = 'Add New Country'
            axios.get(`${PATH_SERVER.DOMAIN}/economicgroups`)
            .then(res => {
              this.setState({
                countries: res.data.result.items
              })
            })
            .catch(err => console.log(err))
          }
    }

    handleChange (e) {
        //console.log('STATE ', this.state)
        this.setState({[e.target.name]: e.target.value}) 
        //console.log('---------- STATE ', this.state)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    //Envia objeto para o Back-end
    handlePost () {
    if (this.state.validate) {

      let sendObj = {
        name: this.state.name,
        code: this.state.code,
        description: this.state.description,      
        active: this.state.active
      }
      
      let id = this.props.match.params.id

      if (id === undefined) {
      this.setState({loading: true})
      axios.post(`${PATH_SERVER.DOMAIN}/economicgroups`, JSON.stringify(sendObj), { headers: this.loggedHeader })
      .then(res => {
        console.log('iakaiiajaijnainainainaoabouaboua', res);
        this.setState({
          dataSend: true,
          redirect: true
        })
      })
      
      } else{
        console.log(JSON.stringify(Object.assign({id}, sendObj)))
        this.setState({loading: true}) 
        axios.put(`${PATH_SERVER.DOMAIN}/economicgroups`, JSON.stringify(Object.assign({id: Number(id)}, sendObj))
            , { headers: this.loggedHeader })
            .then(response => {
            console.log('##### ATUALIZAR ',response);
                this.setState({
                    country_id: id,
                    redirect: true
                })
            })
            .catch(err => {
            console.log(err)
            })

        }
        }
    }

    handleDelete (e) {
        e.preventDefault()
        // validate modal

        console.log('CALL DELETE #####################')
        this.setState({loading: true, open: false, openerror: false})
        axios.delete(`${PATH_SERVER.DOMAIN}/economicgroups/${this.state.countryId}`)
        .then(res => {
        // redirect list
         console.log('sajbvojsbvwojasbpjvkasbvkabv', res)
            this.setState({
                open: false,
                openerror: false,
                redirect: true
            })
        })
        .catch(err => {
        console.log(err)
            let errMsg = (err.response.data.error !== undefined) ? err.response.data.error : err.response.data.error
            this.setState({
                open: false,
                openerror: true,
                dialogMsg: errMsg,
                loading: false
            })
        })
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/economic-group'/>;
        }

        return (
            <div className="view">
                {
                    this.state.loading &&
                    <Loading loading={true} background="rgba(0,0,0,0.6)"
                    loaderColor="#3498db"/>
                } 
                <SideMenu/>                  

                <section>
                    <Header/>   
                    <div className="toptitle">      
                        <img src={Settings} alt="Settings"/>    
                        <h1>Economic Group</h1>                   
                    </div>  

                    <Prices>
                        <div className="container">
                            <div className="bigBox">
                                <h2>
                                    Add New Group
                                </h2>

                                <div className="planInfo">
                              

                                    <form className="formulario">

                                        <div className="lineInputs">
                                            <div>
                                                <div>
                                                    <label htmlFor="name">Code</label>
                                                    <span>Required</span>  
                                                </div>                                          
                                                <input placeholder="Enter group code" value={this.state.code} onChange={this.handleChange} name="code" className="inputMobile inputCode"/>
                                            </div>
                                            <div>
                                                <div>
                                                    <label htmlFor="gender">Name</label>
                                                    <span>Required</span>     
                                                </div>                                       
                                                <input placeholder="Enter group name" value={this.state.name} onChange={this.handleChange} name="name" className="inputMobile inputName"/> 
                                            </div>
                                        </div>


                                        <div>
                                            <label htmlFor="name">English</label>
                                            <span>Required</span>
                                        </div>
                                        <input placeholder="Description of the group" value={this.state.description} onChange={this.handleChange} name="description" />
                                       
                                        {/* <div>
                                            <label htmlFor="gender">Português</label>
                                            <span>Required</span>
                                        </div>
                                        <input placeholder="Description of the group" name="name" className="inputMobile"/>  */}

                                        {/* <div>
                                            <label htmlFor="gender">Español</label>
                                            <span>Required</span>
                                        </div>
                                        <input placeholder="Description of the group" name="name" className="inputMobile"/>  */}

                                        <label htmlFor="gender">Active?</label>                                            
                                        <div className="switchBox">
                                            <div className="switch__container addInput">
                                                <input id="switch-shadow2" className="switch switch--shadow2" type="checkbox" checked={this.state.active} onChange={this.handleInputChange} name='active'/>
                                                <label htmlFor="switch-shadow2"><span>{this.state.active ? 'Yes' : 'No' }</span></label>
                                            </div>
                                        </div>

                                       {
                                           this.props.match.params.id &&
                                            <Button onClick={() => this.setState({open: true})} className="deleteType">Delete Group</Button>
                                        }

                                        
                                    </form>

                                </div>
                            </div>
                            <div className="buttons">
                                <Link to="/economic-group">
                                    <button><i className="fa fa-angle-left" aria-hidden="true"></i>Back</button>
                                </Link>
                                <button onClick={this.handlePost}>Save</button>
                            </div>
                        </div>

                        <Dialog
                            open={this.state.openerror}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => this.setState({openerror: true})}
                            aria-labelledby='alert-dialog-slide-title'
                            aria-describedby='alert-dialog-slide-description'
                            className="boxModal"
                        >
                        <DialogTitle id='alert-dialog-slide-title' className="boxModal">
                          {'Error'}
                        </DialogTitle>
                        <DialogContent className="boxModal">
                          <DialogContentText id='alert-dialog-slide-description'>
                          {this.state.dialogMsg}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions className="boxModal">
                          
                          <Button onClick={() => this.setState({openerror: false})} color='primary'>
                          {'OK'}
                          </Button>
                        </DialogActions>
                      </Dialog>

                        <Dialog
                            open={this.state.open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => this.setState({open: false})}
                            aria-labelledby='alert-dialog-slide-title'
                            aria-describedby='alert-dialog-slide-description'
                            className="boxModal"
                        >
                        <DialogTitle id='alert-dialog-slide-title' className="boxModal">
                          {'Please confirm'}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id='alert-dialog-slide-description' className="boxModal">
                            {'Do you really want to remove the ' + this.state.name + '?'}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions className="boxModal">
                          <Button onClick={this.handleDelete} color='primary'>
                            {'Yes, delete'}
                          </Button>
                          <Button onClick={() => this.setState({open: false})} color='primary'>
                            {'Cancel'}
                          </Button>
                        </DialogActions>
                      </Dialog>


                      


                    </Prices>
                   
                </section>
           </div>
        );

    }
}

export default EconomicGroup;
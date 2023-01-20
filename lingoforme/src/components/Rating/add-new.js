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

// import ReactFlagsSelect from 'react-flags-select';

//OR import sass module
import 'react-flags-select/scss/react-flags-select.scss';

// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'
// import { FlagIcon } from "react-flag-kit"

import Engrenagem from '../../images/icons/icon_settings_header.svg'

import { Prices } from './styles';

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class Languages extends Component {

  constructor (props) {
    super(props)
    this.services = new Services()
    this.t = this.props.t
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this);
    
    this.state = {
      loading: false,
      open: false,               
      validate: true,
      redirect: false ,
      pageTitle: 'Add new Rating',
      nameEnglish: '',
      namePortuguese: '',
      nameSpanish: '',
      descriptionEnglish: '',
      descriptionPortuguese: '',
      descriptionSpanish: '',
      target: 'student',
      active: false
    }
    this.loggedHeader = {
      'Content-Type': 'application/json'
    }
  }
      
    componentDidMount () {

    let ratingId = this.props.match.params.id

        // monta campos preenchidos anteriormente

        if (ratingId !== undefined) {

          // TODO implementar no res do get

          //this.state.pageTitle = 'Rating'
    
          axios.get(`${PATH_SERVER.DOMAIN}/ratingCriterias/get/${ratingId}`)
          .then(res => {

            res.data.result.items.map(item =>{
              this.setState({
                  ratingId: ratingId,
                  nameEnglish: item.nameEnglish,
                  namePortuguese: item.namePortuguese,
                  nameSpanish: item.nameSpanish,
                  descriptionEnglish: item.descriptionEnglish,
                  descriptionPortuguese: item.descriptionPortuguese,
                  descriptionSpanish: item.descriptionSpanish,
                  active: item.active,
                  pageTitle: item.nameEnglish
              })
            })
            
          })
          .catch(err => {
            console.log(err)
          })
    
        // vai para add new
        } else {
          this.state.pageTitle = 'Student - Add New Criterion'
          axios.get(`${PATH_SERVER.DOMAIN}/ratingCriterias?skip=0&take=10`)
          .then(res => {
            this.setState({
                //nameEnglish: res.data.result.items,
            })
          })
          .catch(err => console.log(err))
        }
      }
    
      handleChange (e) {
          console.log('STATE ', this.state)
          this.setState({[e.target.name]: e.target.value}) 
          console.log('---------- STATE ', this.state)
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
            nameEnglish: this.state.nameEnglish,
            namePortuguese: this.state.namePortuguese,
            nameSpanish: this.state.nameSpanish,
            descriptionEnglish: this.state.descriptionEnglish,
            descriptionPortuguese: this.state.descriptionPortuguese,
            descriptionSpanish: this.state.descriptionSpanish,
            active:this.state.active,
            target: this.state.target
          }

          console.log(sendObj);
          let id = this.props.match.params.id

          if (id === undefined) {
            this.setState({loading: true})
            axios.post(`${PATH_SERVER.DOMAIN}/ratingCriterias`, JSON.stringify(sendObj), { headers: this.loggedHeader })
            .then(res => {
              console.log(res);
                this.setState({
                  dataSend: true,
                  redirect: true
                })
            })
          
          } else{
            console.log(JSON.stringify(Object.assign({id}, sendObj)))
            this.setState({loading: true}) 
            axios.put(`${PATH_SERVER.DOMAIN}/ratingCriterias`, JSON.stringify(Object.assign({id: Number(id)}, sendObj))
            , { headers: this.loggedHeader })
            .then(response => {
              console.log('##### ATUALIZAR ',response);
              this.setState({
                languageId: id,
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
        this.setState({loading: true, open: false})
        axios.delete(`${PATH_SERVER.DOMAIN}/ratingcriterias/${this.state.ratingId}`)
        
        .then(res => {
          // redirect list
          this.setState({
            open: false,
            redirect: true
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            open: true,
            redirect: false,
            loading: false
          })
        })
      }    


  render() {

    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/rating'/>
    }

        return (

            <div className="view">   
             {
                this.state.loading &&
                    <Loading loading={true} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>
            }             
                <SideMenu />

                <section>                  

                    <Header/>   
                    <div className="toptitle">      
                        <img src={Engrenagem} alt="Engrenagem" />    
                        <h1>Rating</h1>                   
                    </div>
                    <Prices>
                        <div className="container">
                            <div className="bigBox">
                                <h2>
                                    {this.state.pageTitle}
                                </h2>

                                <div className="planInfo">
                                   
                                    <form className="formulario">

                                        <h3>Name</h3>
                                        <div>
                                            <label for="gender">English</label>
                                            <span>Required</span>
                                        </div>
                                        <input value={this.state.nameEnglish} onChange={this.handleChange} name="nameEnglish" placeholder="Enter criterion name"/> 

                                        <div>
                                            <label for="gender">Português</label>
                                            <span>Required</span>
                                        </div>
                                        <input value={this.state.namePortuguese} onChange={this.handleChange} name="namePortuguese" placeholder="Enter criterion name"/> 

                                        <div>
                                            <label for="gender">Español</label>
                                            <span>Required</span>
                                        </div>
                                        <input value={this.state.nameSpanish} onChange={this.handleChange} name="nameSpanish" placeholder="Enter criterion name"/> 


                                        <h3>Description</h3>
                                        <div>
                                            <label for="gender">English</label>
                                            <span>Required</span>
                                        </div>
                                        <input value={this.state.descriptionEnglish} onChange={this.handleChange} name="descriptionEnglish" placeholder="Description of the criterion"/> 

                                        <div>
                                            <label for="gender">Português</label>
                                            <span>Required</span>
                                        </div>
                                        <input value={this.state.descriptionPortuguese} onChange={this.handleChange} name="descriptionPortuguese" placeholder="Description of the criterion"/> 

                                        <div>
                                            <label for="gender">Español</label>
                                            <span>Required</span>
                                        </div>
                                        <input value={this.state.descriptionSpanish} onChange={this.handleChange} name="descriptionSpanish" placeholder="Description of the criterion"/> 


                                        <label for="gender">Active?</label>                                            
                                        <div className="switchBox">
                                            <div className="switch__container addInput">
                                                <input id="switch-shadow2" className="switch switch--shadow" type="checkbox" checked={this.state.active} onChange={this.handleInputChange} name='active'/>
                                                <label htmlFor="switch-shadow2"><span>{this.state.active ? 'Yes' : 'No' }</span></label>
                                            </div>
                                        </div>
                                        
                                        {this.props.match.params.id &&
                                            <Button onClick={() => this.setState({open: true})} className="deleteType">Delete Language</Button>
                                          }
                                    </form>
                                </div>
                            </div>
                            <div className="buttons">
                                <Link to="/Rating/">
                                  <button><i class="fa fa-angle-left" aria-hidden="true"></i>Back</button>
                                </Link>
                                <button onClick={this.handlePost}>Save</button>
                            </div>
                        </div>
                    </Prices>

                    <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => this.setState({open: false})}
                        aria-labelledby='alert-dialog-slide-title'
                        aria-describedby='alert-dialog-slide-description'
                      >
                        <DialogTitle id='alert-dialog-slide-title'>
                          {'Please confirm'}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id='alert-dialog-slide-description'>
                            {'Do you really want to remove the Rating ' +  this.state.nameEnglish +  ' ? '}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleDelete} color='primary'>
                            {'Yes, delete'}
                          </Button>
                          <Button onClick={() => this.setState({open: false})} color='primary'>
                            {'Cancel'}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    
                </section>
            </div>
        );
    }
}

export default Languages;
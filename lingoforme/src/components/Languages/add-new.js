import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { translate } from 'react-i18next'

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
import DialogModal from '../_common/DialogModal';

// import ReactFlagsSelect from 'react-flags-select';

//OR import sass module
import 'react-flags-select/scss/react-flags-select.scss';
import countries from './countries.json';

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { FlagIcon } from "react-flag-kit"

import Engrenagem from '../../images/icons/icon_settings_header.svg'

import { Language } from './styles';

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
    this.pageTitle = ''
    this.state = {
      loading: false,
      open: false,               
      validate: true,
      redirect: false ,
      countries: [],
      languagesSel: [],
      languagesName: [],
      flags: countries,
      languageId: '',
      lingoLanguageId: '',
      flag: '',
      name: '',
      description: '',
      active: false,
      errorDialog: {
        opened: false,
        title: '',
        message: '',
        onClose: () => console.log('You should implement the onClose function.')
    }
    }
    this.loggedHeader = {
      'Content-Type': 'application/json'
    }
  }
      
    componentWillMount () {

        console.log(this.state.countries.length)

        // Lista Flags
        // axios.get('http://ec2-34-234-94-113.compute-1.amazonaws.com/lingolanguages/getall')
        // .then(response => {
        //     console.log('csuiciasbcpiab', response);

        //     this.setState({ 
        //       flags: response.data.result.items
        //     });
        // })
        // .catch(err => {
        //     console.log('Error', err)
        // })

        // Lista linguas
        axios.get(`${PATH_SERVER.DOMAIN}/languages?skip=0&take=300`)
        .then(response => {
          this.setState({ 
            languagesName: response.data.result.items
          });
        })
        .catch(err => {
          console.log('err languages ', err)
        })

    let lingoLanguageId = this.props.match.params.id

        // monta campos preenchidos anteriormente
        if (lingoLanguageId !== undefined) {
          // TODO implementar no res do get
          this.pageTitle = 'Name language'
          // axios.get('http://ec2-34-234-94-113.compute-1.amazonaws.com/lingolanguages/getall')
          // .then(res => {
          //   this.setState({
          //     languagesSel: res.data.result.items
          //   })
          // })
          // .catch(err => console.log(err))
    
          axios.get(`${PATH_SERVER.DOMAIN}/lingolanguages/get/${lingoLanguageId}`)
          .then(res => {
            console.log('##### response Paissssss ', res.data.result.items);
    
            res.data.result.items.map(item =>{
              this.pageTitle = item.name
              return this.setState({
                  languageId: item.languageId,
                  lingoLanguageId: lingoLanguageId,
                  flag: item.flag,                  
                  description: item.description,
                  active: item.active   
              })
            })
    
            
          })
          .catch(err => {
            console.log(err)
          })
    
        // vai para add new
        } else {
          this.pageTitle = 'Add New Language'
          axios.get(`${PATH_SERVER.DOMAIN}/lingolanguages/getall`)
          .then(res => {
            this.setState({
              languagesSel: res.data.result.items
            })
          })
          .catch(err => console.log(err))
        }
      }
    
      handleChange (e) {
          this.setState({[e.target.name]: e.target.value}) 
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
            languageId: Number(this.state.languageId),
            flag: this.state.flag,
            description: this.state.description,
            active: this.state.active
          }

          console.log(sendObj);
          let id = this.props.match.params.id

          if (id === undefined) {
            this.setState({loading: true})
            axios.post(`${PATH_SERVER.DOMAIN}/lingolanguages`, JSON.stringify(sendObj), { headers: this.loggedHeader })
            .then(res => {
              console.log(res);
                this.setState({
                  dataSend: true,
                  redirect: true
                })
            }).catch(err => {
              this.handleError();
            })
          
          } else{
            console.log(JSON.stringify(Object.assign({id}, sendObj)))
            this.setState({loading: true}) 
            axios.put(`${PATH_SERVER.DOMAIN}/lingolanguages`, JSON.stringify(Object.assign({id: Number(id)}, sendObj))
            , { headers: this.loggedHeader })
            .then(response => {
              console.log('##### ATUALIZAR ',response);
              this.setState({
                languageId: id,
                redirect: true
              })
            })
            .catch(err => {
              this.handleError();
            })

          }
        }
      }         
    
      handleDelete (e) {
        e.preventDefault()
        // validate modal
    
        console.log('CALL DELETE #####################')
        this.setState({loading: true, open: false})
        axios.delete(`${PATH_SERVER.DOMAIN}/lingolanguages/${this.state.lingoLanguageId}`)
        
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
      
      handleError(){
        this.setState({
          errorDialog: {
            opened: true,
            title: this.t('INVALID_FORM_TITLE'),
            message: this.t('ERROR_DIALOG'),
            buttonLabel: 'Ok',
            onClose: () => {
              this.setState({
                loading: false,
                errorDialog: {
                  opened: false
                }
              });
            }
        }
      });
    }


  render() {

    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/languages'/>
    }

        return (

            <div className="view">   
             {
                this.state.loading &&
                <Loading loading={true} background="rgba(0,0,0,0.6)"
                loaderColor="#3498db"/>
              }             
                <SideMenu />

                <section>                  

                    <Header/>   
                    <div className="toptitle">      
                        <img src={Engrenagem} alt="Engrenagem" />    
                        <h1>Languages</h1>                   
                    </div>
                    <Language>
                        <div className="container">
                            <div className="bigBox">
                                <h2>
                                    { this.pageTitle }
                                </h2>

                                <div className="planInfo">
                                   
                                    <form className="formulario">

                                        <div className="country">

                                            <div className="countryTop">
                                                <div>
                                                  <label htmlFor="country">Flag</label>
                                                  <span>Required</span>
                                                </div>
                                                            
                                                <Select disableUnderline value={this.state.flag} onChange={this.handleChange} name='flag' className='input-lingo' disabled={this.state.countries.length === 1} style={{display: 'flex', alignItems: 'center'}}>
                                                    {
                                                        this.state.flags.map(item => {
                                                        return (
                                                         <MenuItem key={item.code} value={item.code}>
                                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <FlagIcon code={item.code} /> 
                                                            &nbsp;{item.name}
                                                          </div>
                                                         </MenuItem>
                                                        )
                                                    })}
                                                                                              
                                                </Select>
                                            </div>

                                            <div className="countryTop">
                                                <div>
                                                    <label htmlFor="name">Name</label>
                                                    <span>Required</span>
                                                </div>
                                                <select value={this.state.languageId} onChange={this.handleChange} name='languageId' className='input-lingo'>
                                                    <option >Select</option>
                                                    {
                                                        this.state.languagesName.map(nameItem => {
                                                          return <option key={nameItem.id} value={nameItem.id}>{nameItem.name}</option>
                                                        })
                                                    }
                                                                                              
                                                </select>
                                            </div>
                                        </div>
                                       {/* <h3>Description</h3> */}
                                        <div>
                                            <label htmlFor="gender">Description</label>
                                            <span>Required</span>
                                        </div>
                                        <input value={this.state.description} onChange={this.handleChange} name="description" placeholder="Description of the Language" className="inputMobile"/> 

                                        <label htmlFor="gender">Active?</label>                                            
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
                            <div className="">

                            </div>
                            <div className="buttons">
                                <Link to="/languages/">
                                  <button><i className="fa fa-angle-left" aria-hidden="true"></i>Back</button>
                                </Link>
                                <button onClick={this.handlePost}>Save</button>
                            </div>
                        </div>
                    </Language>

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
                            {'Do you really want to remove the language ?' + this.state.name}
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
                      <DialogModal
                        opened={this.state.errorDialog.opened}
                        title={this.state.errorDialog.title}
                        onClose={this.state.errorDialog.onClose}
                        buttonLabel="Ok">
                          <p className="message">{this.state.errorDialog.message}</p>
                      </DialogModal>
                </section>
            </div>
        );
    }
}

export default translate('translations')(Languages);

import React, { Component, Fragment } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTicketSubTypes, unsetTicketSubTypes, addTicket } from '../../actions/ticketActions'
import { getLingoLanguages } from '../../actions/lingoActions'
import MenuItem from '@material-ui/core/MenuItem'
import { FlagIcon } from "react-flag-kit"
import Select from '@material-ui/core/Select'
import ImgCustomerService from '../../images/img_cs-openticket.png'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Loading from 'react-fullscreen-loading';
import { Box } from './styles'
import InputTicketTypes from '../../elements/Inputs/InputTicketTypes';
import InputTicketSubTypes from '../../elements/Inputs/InputTicketSubTypes';
import Congratulations from './Congratulations';
import validator from 'validator'
import './styles.scss'

class NewTicket extends Component {

    state = {  
            inputs: {
                type: "",
                subType: "",
                lingoLanguage: "",
                title: "",
                description: "",
                active: false,
            },
            error: false,
            loading: true,
            openalert : false,
            validations:{}
        }

        closeAlert = this.closeAlert.bind(this)

    componentDidMount () {    
        this.props.getLingoLanguages()
        this.setState({
            loading: false
        })
    }

    componentWillUnmount() {
        this.props.unsetTicketSubTypes()
    }

    handleSubmit = () => {
        const { t } = this.props
        if(this.validateForm()){
            this.props.addTicket(this.state.inputs)
        }else{
            this.setState({openalert: true })
        }
    }

	inputChange = (e,) => {
        const { value , name} = e.target
        const { inputs }  = this.state
        inputs[name] = value
		this.setState({ inputs }, () => this.validateForm())
		name === "type" && this.props.getTicketSubTypes(value)
	} 

    validateForm () {
        const { inputs }  = this.state
        let validations = []
        validations = {
            'type':validator.isEmpty(inputs['type'].toString()),
            'subType':validator.isEmpty(inputs['subType'].toString()),
            'lingoLanguage':validator.isEmpty(inputs['lingoLanguage'].toString()),
            'title': validator.isEmpty(inputs['title']),
            'description': validator.isEmpty(inputs['description']),
        }
        // if(this.state.role === 'student')
        //     validations.language = this.state.languages.length === 0 || this.state.languages[0].languageId === 0

        const identifiers = Object.keys(validations)
        const hasError = identifiers.filter(function(input) {
            return validations[input]
        })

        this.setState({ validations: validations })     
        return hasError.length > 0 ? false : true 
    }

    closeAlert(){
        this.setState({  openalert: false })
    }

    render() {
        const { state, props, inputChange, handleSubmit, closeAlert } = this
        const { inputs: { type, subType, lingoLanguage, title, description } } = state
        const { lingo: { lingoLanguages }, tickets: { ticket }, t } = props
        return (
            <Box>
                { ticket 
                    ? <Congratulations />
                    : <Fragment> 
                        <div className="bigBox">
                            <h2>{t('OPEN_NEW_TICKET')}</h2>
                            <div className="boxCS">
                                <form >

                                    
                                    <InputTicketTypes name="type" type="ticketTypes" value={type} required="true" onChange={inputChange} error={this.state.validations['type']} />
                                    <InputTicketSubTypes name="subType" type="ticketSubTypes" value={subType} required="true" onChange={inputChange} error={this.state.validations['subType']}  />
                                     
                                    <div>
                                        <label htmlFor="flag">Lingo</label>
                                        <span className={`${this.state.validations['lingoLanguage'] ? "invalid" : ""}`}>{ t('REQUIRED_FIELD')}</span>
                                    </div>
                                        <Select disableUnderline value={lingoLanguage} onChange={(e) => inputChange(e, "lingoLanguage")} name='lingoLanguage' className='input-lingo Select' displayEmpty>
                                            <MenuItem value={""} >{t('SELECT')}</MenuItem>
                                            { lingoLanguages.map(item => {                                            
                                                return (

                                                    item.active === true && (
                                                        
                                                        <MenuItem key={item.id} value={item.id} >
                                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                                <FlagIcon code={item.flag} style={{marginRight: '5px'}}/>

                                                                {' '} <p>{item.language.name}</p>
                                                            </div>
                                                        </MenuItem>
                                                    )
                                                
                                                );
                                            })}                                          
                                        </Select>
                                    <div>
                                        <label htmlFor="title">{t('TITLE')}</label>
                                        <span className={`${this.state.validations['title'] ? "invalid" : ""}`}>{ t('REQUIRED_FIELD')}</span>
                                    </div>
                                    <input value={title} onChange={(e) => inputChange(e, "title")} name="title" maxLength="128"/> 

                                    <div>
                                        <label htmlFor="description">{t('DESCRIPTION')}</label>
                                        <span className={`${this.state.validations['description'] ? "invalid" : ""}`}>{ t('REQUIRED_FIELD')}</span>
                                    </div>
                                    <textarea value={description} onChange={(e) => inputChange(e, "description")} name="description"  maxLength="2000"/> 
                                </form>

                                <div className="imgOpenTicket">
                                    <img src={ImgCustomerService} alt="Customer Service" />
                                </div>
                            </div>
                        </div>                            
                        <div className="buttons">
                            <button type="button" onClick={ () => this.props.history.push("/customer-service")}>{t('CANCEL')}</button>
                            <button type="button" onClick={(e) => { handleSubmit(e) }}>{t('BTN_SAVE')}</button>
                        </div>
                    </Fragment>
                }
                <Loading loading={this.state.loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>
				<Dialog
                    open={this.state.openalert}
                    onClose={() => closeAlert()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{t('INVALID_FORM_TITLE')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialog-error-message">
							{ t("INVALID_FORM_DESCRIPTION") }
						</DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeAlert()} color="primary" autoFocus>
                    {t('CLOSE')}
                    </Button>
                </DialogActions>
                </Dialog>
            </Box> 
        );

    }
}

const mapStateToProps = ({ tickets, lingo }) => ({ tickets, lingo });
const mapDispatchToProps = dispatch => ({
    addTicket: data => dispatch(addTicket(data)),
    getTicketSubTypes: data => dispatch(getTicketSubTypes(data)),
    unsetTicketSubTypes: data => dispatch(unsetTicketSubTypes(data)),
    getLingoLanguages: data => dispatch(getLingoLanguages(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(NewTicket)))
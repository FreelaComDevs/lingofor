import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { translate } from 'react-i18next'
import Services from '../_api/Services'
import { withRouter } from "react-router";
import Rating from 'react-rating';
import { connect } from 'react-redux'
import { getTeacher } from '../../actions/teacherActions'

import iconFlag from '../../images/icons/flag_us@2x.png'

import { DivTickets } from '../StudentManagement/styles'
import Moment from 'react-moment'

  

class tabTickets extends Component {
  constructor (props) {
    super(props)
  
    this.state = {
        id : 0,
        studentId:0,
        loading: true,
        tickets: []
    }
  
    this.i18n = this.props.i18n
    this.t = this.props.t
    this.service = new Services()
  
    this.userId = this.props.userId
    console.log('tabTicket',this.userId)
    this.callApi = this.callApi.bind(this)
  }
  
  componentWillMount () {
    this.callApi(true)       
  }
  
  callApi () {
    console.log(`tickets?creatorUserId=${this.userId}&orderByDesc=creatorUserId`)
    this.service.get(`tickets?creatorUserId=${this.userId}&orderByDesc=creatorUserId`)
    .then(res => {
        console.log('tickets',res)
        if(!res.success || !res.result.items)
        {
            return
        }
  
        this.setState({ tickets: res.result.items, loading: false})
    })
    .catch(err => {
        console.log('ERRO GET tickets ', err.response)
        this.setState({ tickets: [], loading: false})
    })
  }

    render() {
        const { t } = this

        return (

          <DivTickets>  
          <div className="tab-content">
              <br/><br/>
              {  this.state.tickets.map((ticket) => (
                  <div className="boxRow">
                      <div className="item">
                          <div className="boxColumn">
                              <label>{t('TICKET_ID')}</label>
                              <span>{ticket.id}</span>
                          </div>
                      </div>
                  
                      <div className="item">
                          <div className="boxColumn">
                              <label>{t('STATUS')}</label>
                              <span className={(ticket.active) ? 'active' : 'deactive'}>{(ticket.active) ? 'Active' : 'Inactive'}</span>
                          </div>
                      </div>

                      <div className="item">
                          <div className="boxColumn">
                              <label>{t('TITLE')}</label>
                              <span>{ticket.title}</span>
                          </div>
                      </div>

                      <div className="item">
                          <div className="boxColumn">
                              <label>{t('TYPE')}</label>
                              <span>{ticket.ticketType ? ticket.ticketType.nameEnglish : ''}</span>
                          </div>
                      </div>

                      <div className="item">
                          <div className="boxColumn">
                              <label>{t('SUBTYPE')}</label>
                              <span>{ticket.ticketSubType ? ticket.ticketSubType.nameEnglish : ''}</span>
                          </div>
                      </div>

                      <div className="item">
                          <div className="boxColumn">
                              <label>{t('OPEN_DATE')}</label>
                              <span><Moment format="YYYY/MM/DD • hh:mm">{ticket.createdAt}</Moment></span>
                          </div>
                      </div>

                      <div className="item">
                          <div className="boxColumn">                                        
                              <label>Last Interaction</label>
                              <span><Moment format="YYYY/MM/DD • hh:mm">{ticket.updatedA}</Moment></span>
                          </div>
                      </div>

                      <div className="item">
                          <div className="boxColumn">
                              <div className="status">
                                  <Link to={`/customer-service/`+ticket.id}>
                                      <button>{this.t('BTN_VIEW')} <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                  </Link>  
                              </div>                  
                          </div>
                      </div>

                                   

                  </div>
              ))}

              { this.state.tickets.length === 0 &&
                  <div align='center'>
                      <h4 style={{fontSize: '24px', fontFamily: 'Quicksand', fontWeight: '500', color:'#797881',  margin: '20px'}}>No results</h4>
                  </div>
              }

          </div> 
          </DivTickets>  
        )
    }
}


tabTickets.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}

export default translate('translations')(tabTickets)

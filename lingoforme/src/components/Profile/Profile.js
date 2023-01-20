import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate, Trans } from 'react-i18next'
import SideMenu from '../_common/SideMenu/SideMenu'
import Header from '../_common/header/Header'
import Services from '../_api/Services'
import UserForm from '../_common/user/user-form'

import './Profile.css'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.i18n = this.props.i18n
    this.t = this.props.t
    this.service = new Services()
    this.phoneTypes = []
    this.changeLanguage = this.changeLanguage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.user = this.service.getProfile()
    this.state = {
      userData: {},
      form: {},
      language: 'ENGLISH',
      personalInfo: true,
      plansPage: false,
      notifications: false,
      plans: [],
      countries: [],
      focuses: [],
      lingos: [],
      structures: [],
      emails: [],
      phones: [],
      random_teachers: true
    };
  }

  changeLanguage(e) {
    this.props.languageTrigger(e.target.value)
  }

  componentDidMount() {
    this.phoneTypes = [
      {value: '', name: this.t('SELECT')},
      {value: 'home', name: this.t('HOME')},
      {value: 'work', name: this.t('WORK')},
      {value: 'cellphone', name: this.t('CELLPHONE')},
      {value: 'whatsapp', name: this.t('WHATSAPP')}
    ]

    this.service.get(`users/my-profile`)
      .then(userData => this.setState({userData}))
      .then(() => console.log(this.state.userData, 'DATATADATADATADATADATADATADATADA%TA'))
      .catch(e => {
        console.log(e)
        this.setState({failed: true})
      })
  }

  handleSubmit(data) {
    this.setState({form: data}, () => console.log(this.state.form))
  }

  render() {
    const { t } = this
    return (
      <div className='containerBox' style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Trans>
          <SideMenu lang={this.state.lang} languageTrigger={this.changeLanguage} />
          <div className='dashboard-content'>
            <Header title={t('USER_INFO')} />

            <div className='icons'>
              <span className={this.state.details ? 'icons-inner-active' : 'icons-inner'}>
                {this.t('PERSONAL_INFO')}
              </span>
              <span className='icons-inner'>
                {this.t('PLANS')}
              </span>
              <span className='icons-inner'>
                {this.t('SETTINGS_NOTIFY')}
              </span>
            </div>

              <UserForm
                t={this.t}
                name={this.state.name}
                emails={this.state.emails}
                phones={this.state.phones}
                handleSubmition={this.handleSubmit}
              />

          </div>
        </Trans>
        {/* { this.params.role } */}
      </div>
    )
  }
}

Profile.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}

export default translate('translations')(Profile)

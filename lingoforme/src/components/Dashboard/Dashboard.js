import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate, Trans } from 'react-i18next'

// import SVGInline from 'react-svg-inline'

import './Dashboard.css'

import AuthService from '../_api/AuthService'
import IconsLingo from '../_common/iconsLingo/iconsLingo'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'

import './Dashboard.css'
// import dashboardIcon from '../../images/icons/home.svg'

import ClassCard from './ClassCard';

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.auth = new AuthService()
    this.i18n = this.props.i18n
    this.t = this.props.t
    this.state = {
      lang: 'pt'
    }

    this.changeLanguage = this.changeLanguage.bind(this)
  }

  componentDidMount() {
    this.changeLanguage(this.state.lang)
  }

  changeLanguage (lng) {
    console.log(lng)
    this.i18n.changeLanguage(lng)
    this.setState({lang: lng})
  }

  renderIcon() {
    return (
      <IconsLingo name='customer_service' fill={'var(--color-blue)'}  width='20' height='20' />
    )
  }

  render () {
    const { t } = this
    return (
      <div className='containerBox' style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Trans>
          <SideMenu lang={this.state.lang} languageTrigger={this.changeLanguage} />
          <div className='dashboard-content'>
            <Header title={t('ITEM_HOME')} icon={this.renderIcon()} />
            <div className='content-color'>
              <div style={{width: '100%', height: '100%'}}>
                <div>
                  <ClassCard
                    title='20/07/2018 • Friday • 10:00 am - 10:30 am'
                    language='english'
                    classContent='Class content: Lingo Program'
                    isCancelled={false}
                    isInvite
                  />
                </div>
                <div>
                  <ClassCard
                    title='20/07/2018 • Monday • 10:00 am - 10:30 am'
                    language='english'
                    classContent='Class content: Lingo Program'
                    isCancelled
                  />
                </div>
              </div>
            </div>
          </div>
        </Trans>
      </div>
    )
  }
}

Dashboard.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object
}

export default translate('translations')(Dashboard)

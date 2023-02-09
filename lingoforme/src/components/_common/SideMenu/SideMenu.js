import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
// import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import { FlagIcon } from 'react-flag-kit'
import Select from '@material-ui/core/Select'
import MenuItemLingo from './MenuItemLingo'
import logo from '../../../images/logo_lingo.svg'
import MenuImg from '../../../images/menu/icon_mobile_menu.png'
import Menuback from '../../../images/menu/icon_mobile_menu_back.png'
import MenuItem from '@material-ui/core/MenuItem'
// import IconsLingo from '../iconsLingo/iconsLingo'
import { Link } from 'react-router-dom'
import Auth from '../../_api/AuthService'
import Moment from 'react-moment'
import timezone from 'moment-timezone'
import PlayStore from '../../../images/icons/googleplay.png'
import AppleStore from '../../../images/icons/appstore.png'
import Instagram from '../../../images/icons/instagram.png'
import Facebook from '../../../images/icons/facebook.png'
import Linkedin from '../../../images/icons/linkedin.png'
import Tiktok from '../../../images/icons/tiktok.png'
import Youtube from '../../../images/icons/youtube.png'

import Services from '../../_api/Services'

import { Nav, IconList } from './styles';
import ShareButton from './ShareButton';
import moment from 'moment';


const mql = window.matchMedia('(min-width: 1024px)')


const AUTH = new Auth()

class SideMenu extends Component {

  constructor(props) {
    super(props)
    this.auth = new Auth()

    const languages = {
      english: 'en',
      portuguese: 'pt',
      spanish: 'es'
    };
    const defaultLanguage = languages.english;
    let lang = defaultLanguage
    try {
      const token = JSON.parse(localStorage.getItem('@lingo')).token;
      const payload = token.split('.')[1];
      const base64 = payload.replace('-', '+').replace('_', '/');
      const user = JSON.parse(window.atob(base64));
      Moment.globalTimezone = user.timezone;
      lang = user.nativeLanguageName ? languages[user.nativeLanguageName.toLowerCase()] : defaultLanguage;
      const sessionLanguage = sessionStorage.getItem('actualLanguage');
      lang = sessionLanguage ? sessionLanguage : lang;
    } catch (err) {
      console.log('Cannot get the user native language.');
      lang = defaultLanguage
      Moment.globalLocale = defaultLanguage
    }
    props.i18n.changeLanguage(lang)

    this.state = {
      userId: 0,
      hasNotification: false,
      selected: window.location.pathname.split('/')[1], //definir a partir da url
      open: true,
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      sidebarWidth: (mql.matches) ? 220 : '100vw',
      loggedIn: AUTH.loggedIn(),
      lang,
      userRole: JSON.parse(localStorage.getItem('@lingo')).role
    }

    this.changeLanguage = this.changeLanguage.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.roleMenu = this.roleMenu.bind(this)
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    // this.roleNow = 'students'
    // console.log('roleNow ', this.roleNow)
    this.roleNow = JSON.parse(localStorage.getItem('@lingo'));
    this.service = new Services()
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentDidMount() {
    let user = this.service.getProfile()
    this.setState({ userId: parseInt(user.id) }, () => {
      this.hasNotification()
    })
  }

  mediaQueryChanged() {
    this.setState({
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      sidebarWidth: (mql.matches) ? 220 : '100vw'
    })
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open })
  }

  handleClickNav() {
    this.setState(state => ({ open: !state.open }))
  }

  changeLanguage(e) {
    // this.props.changeLanguage(lng)
    // this.props.languageTrigger(e.target.value)
    // this.i18n.changeLanguage(e.target.value)
    this.setState({ lang: e.target.value }, () => {
      this.props.i18n.changeLanguage(this.state.lang)
    });

    this.setLanguageSessionStorage(e.target.value);
  }

  handleClick(e) {
    // console.log('clicked ', e.target)
  }

  setLanguageSessionStorage(language) {
    sessionStorage.setItem('actualLanguage', language)
  }

  hasNotification() {
    const params = { id: this.state.userId, pageNumber: 1, pageSize: 1 }
    this.service.ApiGetParams('notificationmanager/getByNotificationSentToUserId', params)
      .then(res => {
        const notifications = res.result && res.result.items ? res.result.items : [];
        this.setState({ hasNotification: notifications[0].read === false })
      })
      .catch(err => {
        this.setState({ hasNotification: false })
      })
  }


  roleMenu() {
    const { t } = this.props
    switch (this.roleNow.role) {
      case 'student':
        return (
          <div>
            <li>
              <Link to="/Calendar">
                <MenuItemLingo name={t('SCHEDULE')} icon={'schedule'} isSelected={this.state.selected === 'Calendar' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/class-rating">
                <MenuItemLingo name={t('CLASS_RATING')} icon={'rating'} isSelected={this.state.selected === 'class-rating' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/customer-service">
                <MenuItemLingo name={t('CUSTOMER_SERVICE')} icon={'customer_service'} isSelected={this.state.selected === 'customer-service' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/notifications">
                <MenuItemLingo name={t('NOTIFICATIONS')} icon={'notifications'} isSelected={this.state.selected === 'notifications' ? true : false} clickAction={this.handleClick} hasNotification={this.state.hasNotification} />
              </Link>
            </li>
          </div>
        )
      // break

      case 'teacher':
        return (
          <div>
            <li>
              <Link to="/Calendar">
                <MenuItemLingo name={t('SCHEDULE')} icon={'schedule'} isSelected={this.state.selected === 'Calendar' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/class-rating">
                <MenuItemLingo name={t('CLASS_RATING')} icon={'rating'} isSelected={this.state.selected === 'class-rating' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/customer-service">
                <MenuItemLingo name={t('CUSTOMER_SERVICE')} icon={'customer_service'} isSelected={this.state.selected === 'customer-service' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/notifications">
                <MenuItemLingo name={t('NOTIFICATIONS')} icon={'notifications'} isSelected={this.state.selected === 'notifications' ? true : false} clickAction={this.handleClick} hasNotification={this.state.hasNotification} />
              </Link>
            </li>
          </div>
        )
      // break

      case 'customerService':
        return (
          <div>
            <li>
              <Link to="/Calendar">
                <MenuItemLingo name={t('SCHEDULE')} icon={'schedule'} isSelected={this.state.selected === 'Calendar' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/demo-class">
                <MenuItemLingo name={t('DEMO_CLASS')} icon={'demo_classes'} isSelected={this.state.selected === 'demo-class' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/teachers">
                <MenuItemLingo name={t('TEACHERS')} icon={'teachers'} isSelected={this.state.selected === 'teachers' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/manage-student">
                <MenuItemLingo name={t('STUDENTS')} icon={'students'} isSelected={this.state.selected === 'manage-student' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/class-rating">
                <MenuItemLingo name={t('CLASS_RATING')} icon={'rating'} isSelected={this.state.selected === 'class-rating' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/customer-service">
                <MenuItemLingo name={t('Customer Service')} icon={'customer_service'} isSelected={this.state.selected === 'customer-service' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/notifications">
                <MenuItemLingo name={t('NOTIFICATIONS')} icon={'notifications'} isSelected={this.state.selected === 'notifications' ? true : false} clickAction={this.handleClick} hasNotification={this.state.hasNotification} />
              </Link>
            </li>
          </div>
        )

      // break

      case 'companyManager':
        // const { classes } = this.props
        return (
          <div>
            <li>
              <Link to="/Calendar">
                <MenuItemLingo name={t('SCHEDULE')} icon={'schedule'} isSelected={this.state.selected === 'Calendar' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/demo-class">
                <MenuItemLingo name={t('DEMO_CLASS')} icon={'demo_classes'} isSelected={this.state.selected === 'demo-class' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/teachers">
                <MenuItemLingo name={t('TEACHERS')} icon={'teachers'} isSelected={this.state.selected === 'teachers' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/coordinators">
                <MenuItemLingo name={t('COORDINATOR')} icon={'coordinator'} isSelected={this.state.selected === 'coordinators' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/manage-student">
                <MenuItemLingo name={t('STUDENTS')} icon={'students'} isSelected={this.state.selected === 'manage-student' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/customer-service">
                <MenuItemLingo name={t('CUSTOMER_SERVICE')} icon={'customer_service'} isSelected={this.state.selected === 'customer-service' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/b2b">
                <MenuItemLingo name={t('B2B')} icon={'b2b'} isSelected={this.state.selected === 'b2b' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/plans-and-prices">
                <MenuItemLingo name={t('PLANS_&_PRICING')} icon={'plans'} isSelected={this.state.selected === 'plans-and-prices' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/notifications">
                <MenuItemLingo name={t('NOTIFICATIONS')} icon={'notifications'} isSelected={this.state.selected === 'notifications' ? true : false} clickAction={this.handleClick} hasNotification={this.state.hasNotification} />
              </Link>
            </li>
            <li>
              <Link to="/class-rating">
                <MenuItemLingo name={t('CLASS_RATING')} icon={'rating'} isSelected={this.state.selected === 'class-rating' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li className="dropMenu">
              <Link to="/">
                <MenuItemLingo name={t('SETTINGS')} icon={'settings'} isSelected={this.state.selected === 'settings' ? true : false} clickAction={this.handleClick} />
              </Link>

              <ul>
                <li>
                  <Link to="/users">
                    <MenuItemLingo name={t('USERS')} isSelected={this.state.selected === 'users' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
                <li>
                  <Link to="/languages">
                    <MenuItemLingo name={t('LANGUAGES')} isSelected={this.state.selected === 'languages' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
                <li>
                  <Link to="/countries">
                    <MenuItemLingo name={t('COUNTRIES')} isSelected={this.state.selected === 'countries' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
                <li>
                  <Link to="/parameterization">
                    <MenuItemLingo name={t('PARAMETERS')} isSelected={this.state.selected === 'parameterization' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
                <li>
                  <Link to="/tickets">
                    <MenuItemLingo name={t('TICKETS')} isSelected={this.state.selected === 'tickets' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
                <li>
                  <Link to="/rating">
                    <MenuItemLingo name={t('RATING')} isSelected={this.state.selected === 'rating' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
                <li>
                  <Link to="/economic-group">
                    <MenuItemLingo name={t('ECONOMIC_GROUP')} isSelected={this.state.selected === 'economic-group' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
                <li>
                  <Link to="/notifications-settings">
                    <MenuItemLingo name={t('NOTIFICATIONS')} isSelected={this.state.selected === 'notifications-settings' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
              </ul>
            </li>
          </div>
        )
      // break

      case 'coordinator':
        return (
          <div>
            <li>
              <Link to="/Calendar">
                <MenuItemLingo name={t('SCHEDULE')} icon={'schedule'} isSelected={this.state.selected === 'Calendar' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/demo-class">
                <MenuItemLingo name={t('DEMO_CLASS')} icon={'demo_classes'} isSelected={this.state.selected === 'demo-class' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/teachers">
                <MenuItemLingo name={t('TEACHERS')} icon={'teachers'} isSelected={this.state.selected === 'teachers' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/manage-student">
                <MenuItemLingo name={t('STUDENTS')} icon={'students'} isSelected={this.state.selected === 'manage-student' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/class-rating">
                <MenuItemLingo name={t('CLASS_RATING')} icon={'rating'} isSelected={this.state.selected === 'class-rating' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>
            <li>
              <Link to="/customer-service">
                <MenuItemLingo name={t('CUSTOMER_SERVICE')} icon={'customer_service'} isSelected={this.state.selected === 'customer-service' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/notifications">
                <MenuItemLingo name={t('NOTIFICATIONS')} icon={'notifications'} isSelected={this.state.selected === 'notifications' ? true : false} clickAction={this.handleClick} hasNotification={this.state.hasNotification} />
              </Link>
            </li>
          </div>
        )
      // break

      case 'b2b':
        return (
          <div>

            <li>
              <Link to="/contracts">
                <MenuItemLingo name={t('ITEM_CONTRACTS')} icon={'contracts'} isSelected={this.state.selected === 'contracts' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/manage-student">
                <MenuItemLingo name={t('STUDENTS')} icon={'students'} isSelected={this.state.selected === 'manage-student' ? true : false} clickAction={this.handleClick} />
              </Link>
            </li>

            <li>
              <Link to="/notifications">
                <MenuItemLingo name={t('NOTIFICATIONS')} icon={'notifications'} isSelected={this.state.selected === 'notifications' ? true : false} clickAction={this.handleClick} hasNotification={this.state.hasNotification} />
              </Link>
            </li>
          </div>
        )
      default:
        return (<div></div>)
    }
  }

  render() {

    // console.log(this.props, 'console')
    const { t } = this.props

    return (
      <Sidebar
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        // sidebarWidth={this.state.sidebarWidth}
        transitions={false}        
        styles={{ root: { height: '200%' }, overlay: { backgroundColor: 'rgba(255,255,255)' }, sidebar: { boxshadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px', backgroundColor: '#fff', overflow: 'hidden', width: this.state.sidebarWidth } }}
        sidebar={
          <Nav>
            <div className="logo logoMobile">
              <Link to="/">
                <img src={logo} width="155" height="26" alt="Logo Lingo" />
              </Link>

              {!this.state.sidebarDocked &&
                <img src={Menuback} onClick={() => this.onSetSidebarOpen(false)} style={{
                  float: 'right',
                  position: 'absolute',
                  left: '0px',
                  margin: '-12px 0 0 10px',
                }} />
              }
            </div>
            <hr />
            <ul>
              <div>
                <li className="myAccount">
                  <Link to="/manage-account">
                    <MenuItemLingo name={t('ITEM_ACCOUNT')} icon={'account'} isSelected={(this.state.selected === 'manage-account' || this.state.selected === 'first-access') ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <MenuItemLingo name={t('HOME')} icon={'home'} isSelected={this.state.selected === '' ? true : false} clickAction={this.handleClick} />
                  </Link>
                </li>

                {this.roleMenu()}

                <li className="logoutMenu">
                  <Link to="#">
                    <MenuItemLingo name={t('LOGOUT')} icon={'logout'} clickAction={() => { this.auth.logout() }} />
                  </Link>
                </li>
              </div>
            </ul>

            <IconList>
              <div className='box-link-app'>
                <h3 className='text'>Para ter uma experiência mobile, baixe nosso app nas lojas:</h3>
                <div className='icons-app'>
                  <a href='https://play.google.com/store/apps/details?id=me.lingofor.app&pli=1' target={"_blank"}>
                    <img src={PlayStore} style={{ padding: "0px" }} />
                  </a>
                  <a href='https://apps.apple.com/br/app/lingofor-me/id1464904000' target={"_blank"}>
                    <img src={AppleStore} style={{ padding: "0px" }} />
                  </a>
                </div>
              </div>
            </IconList>

            <div className="language">
              <h2>{this.props.t("LANGUAGE")}:</h2>
              <Select disableUnderline value={this.state.lang} onChange={this.changeLanguage} className={'select'} displayEmpty name='lang' // className={classes.selectEmpty}
              >
                <MenuItem value={'en'}><FlagIcon size={25} code='US' /></MenuItem>
                <MenuItem value={'pt'}><FlagIcon size={25} code='BR' /></MenuItem>
                <MenuItem value={'es'}><FlagIcon size={25} code='ES' /></MenuItem>
              </Select>
            </div>

            <IconList>
              <h3 className='title mt-52'>Siga-nos</h3>
              <div className='icons'>
              <a href='https://www.instagram.com/lingoforme/' target={"_blank"}>
                <img src={Instagram} className="icons-social"/>
                </a>
                <a href='https://www.facebook.com/lingoforme' target={"_blank"}>
                  <img src={Facebook} className="icons-social"/>
                </a>                
                <a href='#' target={"_blank"}>
                <img src={Tiktok} className="icons-social"/>
                </a>
                <a href='#' target={"_blank"}>
                <img src={Youtube} className="icons-social"/>
                </a>
                <a href='https://www.linkedin.com/company/lingoforme/' target={"_blank"}>
                <img src={Linkedin} className="icons-social"/>
                </a>                
              </div>
            </IconList>

            {
              this.state.userRole == 'student' &&

              <ShareButton />
            }

          </Nav>
        }
      >
        {!this.state.sidebarDocked &&
          <div
            style={{
              backgroundColor: 'white',
              width: '100vw',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'none',
              justifyContent: 'start'
            }}
          >
            <img src={MenuImg} onClick={() => this.onSetSidebarOpen(true)} style={{ paddingLeft: '20px', position: 'absolute' }} />
            <img src={logo} width="155" height="26" alt="Logo Lingo" style={{ margin: '0 auto', }} />
          </div>

        }
      </Sidebar>
    )
  }
}

SideMenu.propTypes = {
  name: PropTypes.array,
  location: PropTypes.object,
  i18n: PropTypes.object,
  t: PropTypes.func,
  languageTrigger: PropTypes.func,
  role: PropTypes.string,
  classes: PropTypes.object,
}

export default translate('translations')(SideMenu)

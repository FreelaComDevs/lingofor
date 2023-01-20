import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import {Link} from 'react-router-dom'

import Sidebar from 'react-sidebar'
import { FlagIcon } from "react-flag-kit";
import Select from "@material-ui/core/Select";
import logo from "../../../images/logo_lingo.svg";
import MenuItem from "@material-ui/core/MenuItem";

import MenuImg from '../../../images/menu/icon_mobile_menu.png'
import Menuback from '../../../images/menu/icon_mobile_menu_back.png'

import Auth from "../../_api/AuthService";

import { Nav } from "./styles";
import ShareButton from "./ShareButton";

const mql = window.matchMedia('(min-width: 1024px)')

class SideMenuSub extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();

    this.state = {
      selected: "ITEM_ACCOUNT", //definir a partir da url
      open: true,
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      sidebarWidth: (mql.matches) ? 220 : '100vw'
    };

    this.changeLanguage = this.changeLanguage.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  handleClickNav() {
    this.setState(state => ({ open: !state.open }));
  }

  changeLanguage(e) {
    this.props.languageTrigger(e.target.value);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);   
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

  handleClickNav () {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    const { t } = this.props
    return (

      <Sidebar
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        // sidebarWidth={this.state.sidebarWidth}
        transitions={false}
        onSetOpen={this.onSetSidebarOpen}
        styles={{root:{height: '200%'}, overlay: { backgroundColor: 'rgba(255,255,255)'}, sidebar: { boxshadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px', backgroundColor: '#fff', overflow: 'hidden',  width: this.state.sidebarWidth} }}
        sidebar={
      <Nav>
        <div className="logo logoMobile">
        <Link to="/login">
          <img src={logo} width="155" height="26" alt="Logo Lingo" />
          </Link>

          {!this.state.sidebarDocked &&
                <img src={Menuback} onClick={() => this.onSetSidebarOpen(false)} style={{
                  float: 'right',
                  position: 'absolute',
                  left: '0px',
                  margin: '-12px 0 0 10px',
                }}/>
              }


        </div>
        <hr />
        <div className="language">
          <h2>{t("LANGUAGE")}:</h2>
          <Select
            value={this.props.lang}
            onChange={this.changeLanguage}
            className={"select"}
            displayEmpty
            name="lang"
            disableUnderline
          >
            <MenuItem value={"en"}>
              <FlagIcon size={25} code="US" />
            </MenuItem>
            <MenuItem value={"pt"}>
              <FlagIcon size={25} code="BR" />
            </MenuItem>
            <MenuItem value={"es"}>
              <FlagIcon size={25} code="ES" />
            </MenuItem>
          </Select>
        </div>
        <hr />
        <ShareButton />
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
            <img src={MenuImg} onClick={() => this.onSetSidebarOpen(true)} style={{ paddingLeft: '20px', position: 'absolute'}}/>
            <img src={logo} width="155" height="26" alt="Logo Lingo" style={{margin: '0 auto',}}/>
          </div>
          
        }
      </Sidebar>
    )
  }
}

SideMenuSub.propTypes = {
  name: PropTypes.array,
  i18n: PropTypes.object,
  t: PropTypes.func,
  languageTrigger: PropTypes.func
};

export default translate("translations")(SideMenuSub);

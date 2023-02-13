import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { withRouter, Link } from 'react-router-dom'
import { getUserNotifications, setNotificationMessage, unsetNotificationMessage } from "../../actions/notificationActions";
import SideMenu from "../_common/SideMenu/SideMenu";
import Header from "../_common/header/Header";
import Loading from "react-fullscreen-loading";
import classIcon from "../../images/icons/icon_notifications_header.svg";
import noNotifications from "../../images/placeholder/notifications_empty.png";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import moment from 'moment/min/moment-with-locales'
import { cap } from '../../helpers/helpers'

import queryString from 'query-string'
import Pagination from '../_common/pagination';

const nl2br = require('react-nl2br');


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Notifications extends Component {
  state = this.initialState

  get initialState() {
    return {
      filters: {
        // id: "",
        // creatorUserId: "",
        // role: "",
        // ticketTypeId: "",
        // ticketSubTypeId: "",
        // createdAt: "",
        // status: "",
        pageNumber: 1,
        pageSize: 50,
      },
      userId: null
    }
  }
  componentWillMount() {
    this.getPageNumberCurrent()
  }

  componentDidMount() {
    const getUserInfo = () => {
      const token = JSON.parse(localStorage.getItem("@lingo")).token;
      const payload = token.split(".")[1];
      const base64 = payload.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    };
    const user = getUserInfo();
    this.setState({
      userId: user.id
    })
    const params = { id: user.id, pageNumber: 1, pageSize: 50 }
    this.props.getUserNotifications(params);
  }

  getPageNumberCurrent = () => {

    const params = queryString.parse(this.props.location.search);
    const { filters } = this.state

    if (params && params["page"]) {
      filters["pageNumber"] = Number(params["page"])
      this.setState({ filters });
    }
  }

  pagination = (page, type) => {
    const { filters } = this.state
    filters["pageNumber"] = Number(page)
    this.setState({ filters })
    this.applyFilters()
  }

  getUserInfo = () => {
    const token = JSON.parse(localStorage.getItem("@lingo")).token;
    const payload = token.split(".")[1];
    const base64 = payload.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };


  applyFilters = (e) => {
    let { filters, userId } = this.state
    filters.id = userId
    this.props.getUserNotifications(filters);
  }

  resetFilter = async () => {
    this.props.getUserNotifications(this.initialState.filters);
    this.setState({ filters: this.initialState.filters })
  }



  setMessage = (id, message) => {
    const user = this.getUserInfo();
    const userId = user.id
    this.props.setNotificationMessage({ id, message, userId })
  };

  unsetMessage = () => {
    this.props.unsetNotificationMessage()
  };

  // formatText = (text) => {
  //   let newText = text ? text.trim().replace(/[\r\n]+/g, '\n\n'): '';
  //     return newText;
  // }

  render() {
    const user = this.getUserInfo();
    const { props, setMessage, unsetMessage, state } = this;
    const { filters: { pageNumber } } = state;
    const { t, notifications: { userNotifications, loading, message, totalPages, totalFound } } = props;
    const itemKey = t("LANGUAGE_KEY_STRING");

    const notifications = userNotifications.items
      ? userNotifications.items.map(
        ({
          id,
          createdAt,
          read,
          notificationSent: { module, subject, message }
        }) => ({ id, createdAt, read, module, subject, message })
      )
      : [];

    console.log('totalPages', totalPages)
    return (
      <div className="view new-view notifications-view">
        <section>
          <SideMenu />
          <Header title={t("NOTIFICATIONS")} icon={classIcon} />
          <Loading
            loading={loading}
            background="rgba(0,0,0,0.6)"
            loaderColor="#3498db"
          />
          <div className="new-container" style={{marginLeft: '0'}}>
            {user.role === "student" && <Link to="/manage-account/notification"><p className="settingsLink">{t("NOTIFICATION_SETTINGS")}</p></Link>}
            {notifications.length > 0
              ? notifications.map(({ id, read, module, subject, createdAt, message }) => {
                const messageSubject = subject
                return (
                  <div className="new-box new-box-table-list new-box-notification">
                    <div className={`notificationInfo${!read ? " unReadNotification" : ""}`}>
                      <h4>{t('MODULE')}</h4>
                      <p>{messageSubject}</p>
                      <p className="fromNow">{cap(moment(createdAt).locale(t("LOCALE")).fromNow())}</p>
                    </div>
                    <button
                      className="view-button"
                      onClick={() => setMessage(id, { messageSubject, message })}
                    >
                      {t("VIEW")}{" "}
                      <i className="fa fa-angle-right" aria-hidden="true" />
                    </button>
                  </div>

                )
              })
              : <Fragment>
                <p className="placeholderText">{t("NO_NOTIFICATIONS")}</p>
                <img className="placeholderImage" src={noNotifications} />
              </Fragment>

            }
          </div>
          <Pagination pageAtual={pageNumber} pageSize={50} totalPages={totalPages} totalFound={totalFound} onClick={(page, type) => this.pagination(page, type)} />
          <Dialog
            id="dialog-notification"
            open={!!message}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.props.unsetMessage}
          >
            <DialogTitle id="dialog-notification-title">
              {message.messageSubject}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-notification-message">
                {/* {message.message} */}
                {nl2br(message.message)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={unsetMessage} >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ notifications }) => ({ notifications });
const mapDispatchToProps = dispatch => ({
  getUserNotifications: data => dispatch(getUserNotifications(data)),
  setNotificationMessage: data => dispatch(setNotificationMessage(data)),
  unsetNotificationMessage: data => dispatch(unsetNotificationMessage(data))
});

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(Notifications))))

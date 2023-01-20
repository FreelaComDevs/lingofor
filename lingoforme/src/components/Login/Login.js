import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { translate, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import logo from "../../images/logo_lingo.svg";
import google from "../../images/login/bt_login_google.svg";
import facebook from "../../images/login/bt_login_facebook.svg";
import iconApple from "../../images/login/apple2.png";
import ButtonMB from "../_common/button/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import SocialButton from "../_api/SocialButton";
import AuthService from "../_api/AuthService";
import { FlagIcon } from "react-flag-kit";
import validator from "validator";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Loading from "react-fullscreen-loading";
import { GOOGLE_APP_ID, FACEBOOK_APP_ID } from "../_api/environment";
import queryString from "query-string";
//apple
import AppleLogin from "react-apple-login";
import jwt_decode from "jwt-decode";

import "./Login.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.bgImgArr = [
      // 'https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      require("../../images/login/img_bg1.jpg"),
      require("../../images/login/banner_home-forme_2.jpg"),
      require("../../images/login/banner_home-forme_3.jpg"),
      // 'https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ];
    this.state = {
      strategy: "",
      email:
        localStorage.getItem("emailremember") !== null
          ? localStorage.getItem("emailremember")
          : "",
      password: "",
      lang: "en",
      open: false,
      errors: [],
      errorsForget: [],
      isForget: false,
      remember: localStorage.getItem("emailremember") ? true : false,
      bgImage: this.bgImgArr[Math.round(Math.random() * 2)],
      success: false,
      rerender: false,
      loading: false,
      dialogTitle: "",
      targetRedirect: "",
    };

    this.auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleFormRecover = this.handleFormRecover.bind(this);
    this.renderForgetPassword = this.renderForgetPassword.bind(this);
    this.handleSocialLogin = this.handleSocialLogin.bind(this);
    this.handleAppleLogin = this.handleAppleLogin.bind(this);
    this.toggleForget = this.toggleForget.bind(this);
    this.i18n = this.props.i18n;
    this.t = this.props.t;
    this.changeLanguage(this.state.lang);
  }

  componentDidMount() {
    const targeturl = queryString.parse(this.props.location.search).target;
    if (targeturl) this.setState({ targetRedirect: targeturl });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "lang") this.changeLanguage(e.target.value);
  }

  changeLanguage(lng) {
    this.i18n.changeLanguage(lng);
  }

  toggleForget() {
    this.setState((state) => ({ isForget: !state.isForget }));
  }

  renderForgetPassword(textToShow) {
    return (
      <div className="forget-pass">
        <div className="forget-header-holder">
          <div className="forget-header">
            <span>{this.t("FORGET_TITLE")}</span>
            <CloseIcon
              style={{ margin: "10px", fontSize: 32, cursor: "pointer" }}
              onClick={this.toggleForget}
            />
          </div>
          <div className="red-line" />
        </div>
        <div className="form-holder">
          <form>
            <label htmlFor="emailrecover" required={this.state.errorsForget[0]}>
              {this.t("EMAIL")}
              <span
                style={{
                  fontSize: "0.9em",
                  marginLeft: "5px",
                  color: "var(--color-red)",
                }}
              >
                {this.state.errorsForget[0] && this.t("EMAIL_ERROR")}
              </span>
            </label>
            <input
              className="input-lingo"
              name="emailrecover"
              type="email"
              placeholder={this.t("EMAIL_PLACEHOLDER")}
              value={this.state.emailrecover}
              onChange={this.handleChange}
              required={this.state.errorsForget[0]}
            />
          </form>
          <ButtonMB
            title={this.t("BTN_SEND")}
            clickAction={this.handleFormRecover}
          />
        </div>
      </div>
    );
  }

  handleForm(e) {
    e.preventDefault();

    this.setState(
      {
        loading: false,
        errors: [
          !validator.isEmpty(this.state.email)
            ? !validator.isEmail(this.state.email)
            : validator.isEmpty(this.state.email), // email validator
          validator.isEmpty(this.state.password),
        ],
      },
      () => {
        console.log("ERRORS ", this.state.errors);
        if (!this.state.errors[0] && !this.state.errors[1]) {
          this.auth
            .login({
              strategy: "lingo",
              email: this.state.email,
              password: this.state.password,
            })
            .then((res) => {
              if (this.state.remember)
                localStorage.setItem("emailremember", this.state.email);
              localStorage.setItem("@lingo", JSON.stringify(res));

              return this.setState({ success: true, loading: false });
            })
            .catch((e) => {
              this.setState({
                open: true,
                loading: false,
                dialogMsg: "Invalid login or password",
                dialogTitle: this.t("ERROR_MESSAGE"),
              });
              if (e.message.includes("status code 401")) {
                this.state.errors.push("EMAIL_OR_PASSWORD_LOGIN_ERROR");
              }
              console.log("LOGIN FAIL", e);
            });
        }
      }
    );
  }

  async handleSocialLogin(user) {
    const { t } = this.props;
    console.log("socialuser ", user);
    try {
      const res = await this.auth.login({
        strategy: user._provider,
        token: user._token.accessToken,
        email: user._profile.email,
        socialId: user._profile.id,
      });
      localStorage.setItem("@lingo", JSON.stringify(res));
      this.setState({ success: true });
    } catch (err) {
      this.setState({
        open: true,
        loading: false,
        dialogMsg: err.customMessage ? t(err.customMessage) : t("ERROR_DIALOG"),
        dialogTitle: t("ERROR_MESSAGE"),
      });
    }
  }

  handleSocialLoginFailure = (err) => {
    if (!err.error === "idpiframe_initialization_failed") {
      const { t } = this.props;
      this.setState(
        {
          loading: false,
          rerender: true,
          open: true,
          dialogMsg: t("ERROR_DIALOG"),
          dialogTitle: t("ERROR_MESSAGE"),
        },
        () => {
          this.setState({ rerender: false });
        }
      );
      console.error("Login fail ", err);
    }
  };

  async handleAppleLogin(userInfo) {
    const { t } = this.props;
    const { authorization, user } = userInfo;
    //console.log("appleLogin", userInfo);
    try {
      const { email, c_hash, sub } = jwt_decode(authorization.id_token);
      //console.log(
      //  "email",
      //  email,
      //  "sub",
      //  sub,
      //  jwt_decode(authorization.id_token)
      //);
      const res = await this.auth.login({
        strategy: "apple",
        token: c_hash,
        email: user ? user.email : email || null,
        socialId: sub || null,
      });
      localStorage.setItem("@lingo", JSON.stringify(res));
      this.setState({ success: true });
    } catch (err) {
      console.log("error", err);
      this.setState({
        open: true,
        loading: false,
        dialogMsg: err.customMessage ? t(err.customMessage) : t("ERROR_DIALOG"),
        dialogTitle: t("ERROR_MESSAGE"),
      });
    }
  }

  handleFormRecover() {
    this.setState(
      {
        // loading: true,
        errorsForget: [
          !validator.isEmpty(this.state.emailrecover)
            ? !validator.isEmail(this.state.emailrecover)
            : validator.isEmpty(this.state.emailrecover), // email validator
        ],
        loading: false,
      },
      () => {
        if (!this.state.errorsForget[0]) {
          this.auth
            .forgetPass({
              email: this.state.emailrecover,
            })
            .then((res) => {
              this.setState(
                {
                  open: true,
                  dialogMsg: "Please check your inbox",
                  dialogTitle: "All done!",
                  loading: false,
                },
                () => {
                  console.log("User recover password ", res);
                }
              );
            })
            .catch((err) => {
              this.setState({
                open: true,
                dialogMsg: "Error " + err.message,
                dialogTitle: this.t("ERROR_DIALOG"),
              });
              console.log("Erro Social login: ", err);
            });
        }
      }
    );
  }

  render() {
    if (this.state.success || this.state.authenticated) {
      if (this.state.targetRedirect && this.state.targetRedirect == "newplan") {
        return <Redirect to="/manage-account/plan?type=buynewplan" />;
      } else {
        return <Redirect to="/" />;
      }
    }

    const { t } = this;
    const { isForget } = this.state;
    const bgStyle = {
      backgroundImage: `url(${this.state.bgImage})`,
    };
    return !this.state.rerender ? (
      <div className="containerBox">
        <div className="content-left" style={bgStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img src={logo} className="logo-top" alt="logo" />
          </div>
        </div>

        {this.state.loading && (
          <Loading
            loading={true}
            background="rgba(0,0,0,0.6)"
            loaderColor="#3498db"
          />
        )}

        <div className="content-right">
          {isForget && this.renderForgetPassword()}
          {!isForget && (
            <div className="form-holder">
              <Trans>
                <div className="form-top">
                  <h1 style={{ fontWeight: "100" }}>
                    {t("WELCOME_TITLE")}{" "}
                    <span
                      style={{
                        color: "var(--color-blue)",
                        fontWeight: "bold",
                        marginLeft: "12px",
                      }}
                    >
                      Lingo
                    </span>
                  </h1>
                  <div className="red-line" />
                </div>
                <form>
                  <label htmlFor="email" required={this.state.errors[0]}>
                    {t("EMAIL")}
                    <span
                      style={{
                        fontSize: "0.9em",
                        marginLeft: "5px",
                        color: "var(--color-red)",
                      }}
                    >
                      {this.state.errors[0] && t("EMAIL_ERROR")}
                    </span>
                  </label>
                  <input
                    className="input-lingo"
                    name="email"
                    type="email"
                    placeholder={t("EMAIL_PLACEHOLDER")}
                    value={this.state.email}
                    onChange={this.handleChange}
                    required={this.state.errors[0]}
                  />
                  <label htmlFor="password">
                    {t("PASSWORD")}
                    <span
                      style={{
                        fontSize: "0.9em",
                        marginLeft: "5px",
                        color: "var(--color-red)",
                      }}
                    >
                      {this.state.errors[1] && t("PASS_ERROR")}
                    </span>
                  </label>
                  <input
                    className="input-lingo"
                    type="password"
                    name="password"
                    placeholder={t("PASS_PLACEHOLDER")}
                    value={this.state.pass}
                    onChange={this.handleChange}
                    required={this.state.errors[1]}
                  />
                  <div className="forgotPassword">
                    {/* <label>
                      <input name='remember' type='checkbox' className='checkbox' checked={this.state.remember} onChange={() => {this.setState({remember: !this.state.remember})}} />
                      {t('REMEMBER_ACCESS')}
                    </label> */}
                    <div className="switch__container addInput">
                      <input
                        id="switch-shadow10"
                        className="switch switch--shadow checkbox"
                        name="multiLingo"
                        type="checkbox"
                        // onChange={this.handleInputChange}
                        checked={this.state.remember}
                        onChange={() => {
                          this.setState({ remember: !this.state.remember });
                        }}
                      />
                      <label htmlFor="switch-shadow10">
                        <span>{t("REMEMBER_ACCESS")}</span>
                      </label>
                    </div>
                    <Button onClick={this.toggleForget}>
                      {t("FORGOT_PASS")}
                    </Button>
                  </div>

                  <ButtonMB
                    title={t("BTN_LOGIN")}
                    className="btn-login"
                    clickAction={this.handleForm}
                  />
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      flexdirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "16px",
                      fontWeight: "500",
                      fontFamily: "Quicksand",
                      color: "#707070",
                    }}
                  >
                    <span>{t("NOT_REGISTERED")}</span>

                    <a href={t("LINK_SUBSCRIPTION")} target="_blank">
                      <span
                        style={{
                          padding: "5px",
                          color: "red",
                          fontSize: "14px",
                          textDecorationLine: "underline",
                        }}
                      >
                        {t("CHECK_OUR_PLANS")}
                      </span>
                    </a>
                  </div>
                </form>

                <div className="form-footer">
                  <hr />
                  <div>
                    <span className="or-login-css">{t("OR_LOGIN_TXT")}</span>
                  </div>
                </div>
                <div className="holder-social">
                  {/* <SocialButton
                    provider="facebook"
                    appId={FACEBOOK_APP_ID}
                    onLoginSuccess={this.handleSocialLogin}
                    onLoginFailure={this.handleSocialLoginFailure}
                  >
                    <div className="form-btn-social face">
                      <img src={facebook} alt="facebook" />
                    </div>
                  </SocialButton> */}

                  <SocialButton
                    provider="google"
                    // key={this.state.rerenderVal}
                    appId={GOOGLE_APP_ID}
                    onLoginSuccess={this.handleSocialLogin}
                    onLoginFailure={this.handleSocialLoginFailure}
                  >
                    <div className="form-btn-social google">
                      <img src={google} alt="google" />
                    </div>
                  </SocialButton>
                  <AppleLogin
                    clientId="me.lingofor.loginappleid"
                    redirectURI="https://qas.lingofor.me/login"
                    //redirectURI="https://lingo.com:3000/login"
                    usePopup={true}
                    callback={this.handleAppleLogin} // Catch the response
                    scope="email name"
                    responseMode="query"
                    render={(
                      renderProps //Custom Apple Sign in Button
                    ) => (
                      <div
                        onClick={renderProps.onClick}
                        className="form-btn-social apple"
                      >
                        <img src={iconApple} alt="apple" />
                      </div>
                    )}
                  />
                </div>
                {false && (
                  <div className="holder-register">
                    {t("NEW_USER")}
                    <span>
                      <a
                        href="http://ec2-34-227-25-89.compute-1.amazonaws.com/for-me-pricing"
                        target="_blank"
                      >
                        {t("SIGN_UP")}
                      </a>
                    </span>
                  </div>
                )}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span className="language">{t("LANGUAGE")}: </span>
                  {/* <NativeSelect
                    value={this.state.lang}
                    name='lang'
                    onChange={this.handleChange}
                  >
                    <option value={'pt'}>Português</option>
                    <option value={'en'}>English</option>
                    <option value={'es'}>Español</option>
                  </NativeSelect> */}

                  <Select
                    disableUnderline
                    value={this.state.lang}
                    onChange={this.handleChange}
                    displayEmpty
                    name="lang"
                    // className={classes.selectEmpty}
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
              </Trans>
            </div>
          )}
        </div>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.setState({ open: false })}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="boxModal"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.dialogTitle}
          </DialogTitle>
          <DialogContent>
            <div className="boxModal">
              <DialogContentText id="alert-dialog-slide-description">
                <h3>{this.state.dialogMsg}</h3>
              </DialogContentText>
            </div>
          </DialogContent>

          <DialogActions>
            <div className="boxModal">
              <Button
                onClick={() => this.setState({ open: false })}
                color="primary"
                autoFocus
              >
                {t("BTN_CLOSE")}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    ) : null;
  }
}

Login.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object,
};

export default translate("translations")(Login);

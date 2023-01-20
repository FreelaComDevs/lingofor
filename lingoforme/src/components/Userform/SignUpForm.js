import React, { Component } from "react";
import ButtonMB from "../_common/button/Button";
import PropTypes from "prop-types";
import { translate, Trans } from "react-i18next";
import validator from "validator";
import IconFace from "../../images/sign-up/bt_login_facebook.svg";
import IconGoogle from "../../images/sign-up/bt_login_google.svg";
// import IconLinkedin from '../../images/sign-up/bt_login_linkedin.svg'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Form } from "./Styles";
import SocialButton from "../_api/SocialButton";

import { GOOGLE_APP_ID, FACEBOOK_APP_ID } from "../_api/environment";
//apple
import AppleLogin from "react-apple-login";
import jwt_decode from "jwt-decode";
import iconApple from "../../images/login/apple2.png";

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.i18n = this.props.i18n;
    this.state = {
      errors: [],
      focuses: [],
      lingos: [],
      structures: [],
      language: "ENGLISH",
      failed: false,
      planPrice: 0,
      open: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  handleShowTerms = (scroll) => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSocialLogin = async (user) => {
    console.log("user ==> ", user);
    this.props.registerSocialMedia({
      name: user._profile.name,
      strategy: user._provider,
      token: user._token.accessToken,
      email: user._profile.email,
      socialId: user._profile.id,
    });

    this.setState({ isPasswordDisabled: true });
  };

  handleAppleLogin = async (userInfo) => {
    //sign-up?planId=11&countryId=212&languageId=1
    const { t } = this.props;
    const { authorization, user } = userInfo;
    //console.log("appleLogin", userInfo);
    try {
      const { email, sub, c_hash } = jwt_decode(authorization.id_token);
      //console.log("email", email, "hash", c_hash);
      this.props.registerSocialMedia({
        name: user
          ? `${user.name.firstName} ${user.name.lastName}`
          : this.props.formValues.name || "",
        strategy: "appleID",
        token: c_hash,
        email: email,
        socialId: sub,
      });

      this.setState({ isPasswordDisabled: true });
    } catch (err) {
      console.log("error", err);
      this.props.openDialogSocialMediaLoginError();
    }
  };

  handleSocialLoginFailure = (err) => {
    if (!err.error === "idpiframe_initialization_failed") {
      this.props.openDialogSocialMediaLoginError();
      console.error("Login fail ", err);
    }
  };

  handleForm() {
    const isInvalidName = validator.isEmpty(this.state.name);
    const isInvalidEmail = !validator.isEmpty(this.state.email)
      ? !validator.isEmail(this.state.email)
      : validator.isEmpty(this.state.email);
    var patt =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&[\]{},.;<>:/~^´`\-_()"])[A-Za-z\d@$!%*#?&[\]{},.;<>:/~^´`\-_()"]{6,20}$/g;
    const isValidPassword = patt.test(this.state.password);
    const isPasswordMismatch = !(
      this.state.password === this.state.passwordConfirm
    );
    //|| !this.state.isMajor
    if (
      isInvalidName ||
      isInvalidEmail ||
      !isValidPassword ||
      isPasswordMismatch ||
      !this.state.accepted
    ) {
      this.setState(
        {
          errors: [
            isInvalidName,
            isInvalidEmail,
            !isValidPassword,
            isPasswordMismatch,
          ],
        },
        () => console.log("ERRORS ", this.state.errors)
      );
    }

    if (!this.state.accepted) {
      this.setState(
        {
          errors: [isInvalidName],
        },
        () => console.log("ERRORS ", this.state.errors)
      );
    }
  }

  render() {
    const {
      props: { t },
      state: { isPasswordDisabled },
    } = this;

    return (
      <Form>
        <Trans>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title"
            className="boxModal"
          >
            <DialogTitle id="scroll-dialog-title">
              <h2>{t("TERMS_OF_USE")}</h2>
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="textlegal">
                <p>
                  The purpose of the <strong>ONLINE LEARNING AGREEMENT</strong>{" "}
                  (“Agreement”) is to acknowledge acceptance of the identified
                  roles and responsibilities for students that request to enroll
                  in online language classes provided by LINGOFOR.ME. a trade
                  name of FIELD FOR TECHNOLOGIES LLC, a company organized in
                  Florida-US, located at 299 Alhambra Circle, suite 403, Coral
                  Gables, FL - US
                </p>
                <br />
                <p>
                  <strong>
                    <u>DEFINITIONS:</u>
                  </strong>
                  <br /> <strong>EARLY TERMINATION FEE:</strong> In case of
                  early termination, cancelation by STUDENT initiative for any
                  reason, a 10% Termination Fee of the remaining balance in 1
                  (one) single installment due at termination date.
                </p>
                <p>
                  <strong>EDUCATIONAL PROGRAM:</strong> Educational Services,
                  which brings a new concept of learning foreign languages where
                  the student pays a monthly fee and get limited or unlimited
                  one-on-one classes.
                </p>
                <p>
                  <strong>INSTRUCTOR:</strong> Individual that will teach
                  STUDENT and conduct the ONLINE CLASSES. LANGUAGE: STUDENT have
                  to select the ONLINE CLASS in ENGLISH or SPANISH and have
                  access only to the selected idiom. STUDENT choice of language
                  will be for 180 days minimum period.
                </p>
                <p>
                  <strong>LIMITED PLAN:</strong> Pre-paid 30 days plan, with a
                  pre-defined number of ONLINE CLASSES per 30 days cycle,
                  non-cumulative for next 30 days period. Can be upgraded
                  anytime to UNLIMITED PLAN at STUDENT sole discretion
                </p>
                <p>
                  <strong>LINGOFOR.ME:</strong> Trade name used by FIELD FOR
                  TECHNOLOGIES LLC to provide ONLINE CLASSES NO-SHOW: STUDENT
                  who makes an Online Class reservation and neither participate
                  nor cancels.
                </p>
                <p>
                  <strong>ONLINE CLASSES:</strong> 30 minutes one to one online
                  session. Online language courses (one to one classes) through
                  Skype, Google Meet, Tokbox, Webex, Zoon, Skype for Business,
                  Blue Jeans, Appearin.com or any other web conference platform.
                </p>
                <p>
                  <strong>ONLINE EDUCATIONAL CONTENT:</strong> Portuguese,
                  English and Spanish courses will be available. Educational
                  methodology, curricula, testing, materials, presentations,
                  documents and all other materials used on the Online Classes.
                  All Education contents are copyrighted by LINGOFOR.ME and
                  property of LINGOFOR.ME and may not be used by Student or
                  Instructor for any other purpose other than Online Classes.
                  Under non-circumstances the Online Educational Content shall
                  be used, copied, translated or adapted by INSTRUCTOR without
                  written prior consent from LINGOFOR.ME.
                </p>
                <p>
                  <strong>ONLINE SUPPORT:</strong> 7x24 hours remote support,
                  e-mail <a href="mailto:cs@lingofor.m">cs@lingofor.me</a> or
                  through student app (Customer Service tab).
                </p>
                <p>
                  <strong>PRIVACY POLICY:</strong> LINGOFOR.ME Privacy Policies
                  are available at{" "}
                  <a
                    href="https://www.lingofor.me/for-me-privacy-policy"
                    target="_blank"
                  >
                    https://www.lingofor.me/for-me-privacy-policy
                  </a>
                  . You acknowledge and agree with the terms and conditions of
                  our Privacy Policy to be able to complete Your registration
                  and use our services and the online platform.
                </p>
                <p>
                  <strong>STUDENT:</strong> Same as YOU, the person registered
                  at LINGOFOR.ME that will participate on the Online Classes and
                  will be taught by INSTRUCTOR
                </p>
                <p>
                  <strong>STUDENT GRADE BOOK:</strong> Report containing the
                  INSTRUCTOR assessment of STUDENT performance.
                </p>
                <p>
                  <strong>STUDENT SURVEY:</strong> Periodical survey that will
                  be filled by STUDENT, regarding the Online Educational
                  Content, Online Classes and INSTRUCTOR performance. The survey
                  shall be used to enhance the Online Educational Content and
                  INSTRUCTOR performance evaluation.
                </p>
                <p>
                  <strong>TERMS OF USE - TOS:</strong> LINGOFOR.ME Terms of Use
                  (TOS) is available at{" "}
                  <a
                    href="https://www.lingofor.me/for-me-privacy-policy"
                    target="_blank"
                  >
                    https://www.lingofor.me/for-me-privacy-policy
                  </a>
                  . You acknowledge and agree with the terms and conditions of
                  our TOS to be able to use our services and the online
                  platform.
                </p>
                <p>
                  <strong>UNLIMITED PLAN:</strong> Pre-paid 30 days plan, with
                  unlimited number of ONLINE CLASS per 30 days cycle. Can be
                  downgraded just once every 180 days to LIMITED PLAN
                </p>
                <p>
                  <strong>CUSTOMER SERVICE:</strong> Lingofor.me department
                  responsible for All Customer Service related topics.
                </p>
                <br />
                <p>
                  <strong>
                    <u>GENERAL TERMS AND CONDITIONS</u>
                  </strong>
                </p>
                <br />
                <p>
                  1. This Agreement defines all terms and conditions that
                  governs the relationship between YOU and LINGOFOR.ME.
                </p>
                <p>
                  2. LINGOFOR.ME will provide to YOU professional Online
                  Educational Services.
                </p>
                <p>
                  3. YOU must be registered (enrollment) to have access and
                  rights to participate on the Online Education Services.
                </p>
                <p>4. YOU have the option to select the LANGUAGE.</p>
                <p>
                  5. YOU shall have access to the Online Educational Content and
                  participate on “one to one” Online Classes.
                </p>
                <p>
                  6. YOU understand that LINGOFOR.ME desires to offer Online
                  Education Content on a predictable schedule.
                </p>
                <p>
                  7. YOU may schedule the ONLINE CLASS with a minimum of 3 hours
                  in advance.
                </p>
                <p>
                  8. In case of prior Online Class cancelation by YOU, with at
                  least 1 (one) hour in advance, LINGOFOR.ME shall notify
                  INSTRUCTOR and YOU will not be subject to any cancelation
                  penalty.
                </p>
                <p>
                  9. CUSTOMER SERVICE will check and respond YOUR messages every
                  24 hours, by email or LINGOFOR.ME App.
                </p>
                <p>
                  10. INSTRUCTOR will evaluate the YOUR academic performance and
                  generate the Student Grade Book.
                </p>
                <p>
                  11. The ONLINE CLASS, and respective plan, are not
                  transferable and cannot be assigned to any 3rd party.
                </p>
                <p>
                  12. YOU will be encouraged to provide feedback helping us to
                  improve our services.
                </p>
                <p>
                  13. By sending us any ideas, suggestions or documents
                  ("Feedback"), you agree that (i) your Feedback does not
                  contain the confidential or proprietary information of
                  third-parties, and (ii) you grant us an irrevocable,
                  non-exclusive, royalty-free, perpetual, worldwide license to
                  use, modify, prepare derivative works, publish, distribute and
                  sublicense the Feedback, and you irrevocably waive, and cause
                  to be waived, against LINGOFOR.ME and its users any claims and
                  assertions of any rights, whether intellectual property rights
                  or otherwise, contained in such Feedback.
                </p>
                <p>14. YOU will be requested to submit the Student Survey.</p>
                <p>
                  <strong>
                    <u>LIMITED & UNLIMITED Plans</u>
                  </strong>
                </p>
                <p>
                  15. YOU have the option to select the plan of YOUR choice
                  (LIMITED PLAN or UNLIMITED PLAN), for a minimum period of 180
                  days commitment, which is the duration of the Agreement.
                </p>
                <p>
                  16. All plans are named, and only YOU can participate on the
                  ONLINE CLASS and have access to the Online Educational
                  Content.
                </p>
                <p>
                  17. All plans are monthly pre-paid and as soon as the payment
                  is cleared, YOU have 30 days access to LINGOFOR.ME educational
                  platform to schedule ONLINE CLASS.
                </p>
                <p>18. YOU may switch plans as follow:</p>
                <p>
                  a) UPGRADE from LIMITED PLAN to UNLIMITED PLAN: at any time,
                  starting on the subsequent 30 days period.
                </p>
                <p>
                  b) Downgrade from UNLIMITED PLAN to LIMITED PLAN: at any time
                  once every 180 days
                </p>
                <p>
                  19. In case of STUDENT No-Show or class cancellation by
                  STUDENT with less than 1 hour prior to start the class,
                </p>
                <p>
                  a) LIMITED PLAN: LINGOFOR.ME shall deduct the ONLINE CLASS
                  from account balance;
                </p>
                <p>
                  b) UNLIMITED PLAN: no penalties apply, but the STUDENT will be
                  notified by e-mail.
                </p>
                <p>
                  <strong>
                    <u>TECHNOLOGY</u>
                  </strong>
                </p>
                <p>
                  20. YOU must be adherent to the following technology
                  requirements: (a) Internet Connection, (b) Headset with
                  microphone, (c) Webcam, and (d) Compatible Web Browsers –
                  Google Chrome or Microsoft Edge.
                </p>
                <p>
                  21. If YOU experience technical issues with your microphone,
                  webcam, or software, YOU must promptly resolve these issues
                  prior to YOUR next ONLINE CLASS.
                </p>
                <p>
                  22. YOU understand that failing to troubleshoot any technical
                  issues in a timely manner can lead to a lowering of YOUR class
                  participation if the issues prevent YOU from using the
                  microphone or webcam as instructed by my INSTRUCTOR
                </p>
                <p>
                  <strong>
                    <u>LINGOFOR.ME RESPONSIBILITIES</u>
                  </strong>
                </p>
                <p>
                  23. Developed, maintain and improve Online Educational
                  Content, course description, course materials including course
                  outlines, case studies, and instructional support materials
                  used in the instructional course and/or programs.
                </p>
                <p>24. Schedule the Online Classes.</p>
                <p>25. Provide a qualified INSTRUCTOR to teach YOU.</p>
                <p>26. Provide YOUR registration process for Online Classes.</p>
                <p>
                  27. STUDENT billing and maintain YOUR financial account
                  status.
                </p>
                <p>28. Maintain STUDENT GRADE BOOK.</p>
                <p>29. Provide ONLINE SUPPORT.</p>
                <p>
                  30. Collect YOUR feedback regarding the Online Classes,
                  Content and Instruction performance (Student Surveys)
                </p>
                <p>
                  31. LINGOFOR.ME shall use commercially reasonable efforts to
                  provide the Services in a professional manner and that will
                  not disrupt Your ability to use the Online Classes. You
                  acknowledge and agree that from time-to-time the LINGOFOR.ME
                  Services may be inaccessible or inoperable for reasons
                  including, without limitation: (i) equipment malfunctions;
                  (ii) periodic maintenance procedures or repairs that
                  LINGOFOR.ME may undertake from time to time; or (iii) causes
                  beyond the reasonable control of LINGOFOR.ME or that are
                  reasonably unforeseeable by LINGOFOR.ME, including, without
                  limitation, interruption or failure of telecommunication or
                  digital transmission links, hostile network attacks, network
                  congestion or other failures. You acknowledge and agree that
                  LINGOFOR.ME is not liable for these periodic interruptions in
                  availability of the LINGOFOR.ME Services and further
                  acknowledge that LINGOFOR.ME does not guarantee access to the
                  LINGOFOR.ME Services on a continuous and uninterrupted basis.
                </p>
                <br />
                <p>
                  <strong>
                    <u>PAYMENT</u>
                  </strong>
                </p>
                <p>32. Prices are in US$ and fixed for 180 days period.</p>
                <p>
                  33. LINGOFOR.ME accepts the major credit cards and PayPal as
                  payment method.
                </p>
                <p>
                  34. Prices may vary according to the plan contracted. Discount
                  Coupon may apply for partners.
                </p>
                <p>
                  35. Payment shall be made in US Dollars before starting each
                  30 days cycle.
                </p>
                <p>
                  36. Prices are FOB without any tax withholdings, financial
                  charges or any other required fee.
                </p>
                <br />
                <p>
                  <strong>
                    <u>NAME AND TRADEMARKS.</u>
                  </strong>
                </p>
                <p>
                  37. Trade name, trademark, or logo that represents
                  LINGOFOR.ME, its Online Educational Content are protected by
                  U.S. and international trademark laws and may not be used
                  without prior written approval of LINGOFOR.ME.
                </p>
                <p>
                  <strong>
                    <u>TERM AND TERMINATION</u>
                  </strong>
                </p>
                <p>38. This Agreement is valid for 180 days.</p>
                <p>
                  39. Either party may terminate, for any reason, the services
                  under this Agreement upon written notice of thirty (30) days.
                </p>
                <p>
                  40. In case of early termination by YOUR initiative, without
                  reason, YOU acknowledge and agree to pay EARLY TERMINATION
                  FEE.
                </p>
                <p>
                  <strong>
                    <u>INDEMNIFICATION</u>
                  </strong>
                </p>
                <p>
                  41. You agree to indemnify, hold harmless and defend
                  LINGOFOR.ME, its managers, members, officers, directors,
                  employees, agents, or affiliates (collectively the
                  "Indemnified Parties") at your expense, against any and all
                  third-party claims, actions, proceedings, and suits brought
                  against any of the Indemnified Parties, and against all
                  related liabilities, damages, settlements, penalties, fines,
                  costs or expenses (including, without limitation, reasonable
                  attorneys' fees) incurred by the Indemnified Parties arising
                  out of or relating to (i) your breach of any term or condition
                  of these Terms, (ii) your Posting of User Content, (iii) your
                  use of the Services or (iv) your unauthorized use of the
                  Services. In such a case, the Indemnified Party or Parties
                  will provide you with written notice of such claim, suit or
                  action. You shall cooperate as fully as reasonably required in
                  the defense of any claim. The Indemnified Party or Parties
                  will reserve the right, at its own expense, to assume the
                  exclusive defense and control of any matter subject to
                  indemnification by you.
                </p>
                <p>
                  <strong>
                    <u>MISCELLANEOUS</u>
                  </strong>
                </p>
                <p>42. This Agreement is personal and may not be assigned.</p>
                <p>
                  43. This Agreement shall be governed by, construed, and
                  enforced in accordance with the internal laws of the State of
                  Florida, excluding Florida’s conflicts of law provisions. All
                  disputes controversies or differences that may arise between
                  the PARTIES with respect to this Agreement and the PARTIES'
                  performance hereunder shall be settled amicably through mutual
                  consultation and negotiation. Should the PARTIES, however,
                  fail to resolve any controversies over the interpretation of,
                  or any dispute arising out of, this Agreement, or anything
                  incidental hereto, these shall then be settled by binding
                  arbitration, before a single arbitrator mutually acceptable to
                  both PARTIES, in the State of Florida, USA.
                </p>
                <p>
                  44. This Agreement may be amended or modified only in a
                  writing executed by both PARTIES hereto.
                </p>
                <br />
                <p>
                  <strong>
                    <u>ACCEPTANCE TERMS OF USE</u>
                  </strong>
                </p>
                <p>
                  45. BY CHECKING THE BOX STATING THAT YOU HAVE READ AND AGREE
                  TO THE TERMS AND CONDITIONS OF THIS AGREEMENT AS PART OF YOUR
                  REGISTRATION WITH LINGOFOR.ME, YOU AGREE AND CONSENT TO BE
                  BOUND BY THE TERMS AND CONDITIONS OF THIS AGREEMENT, INCLUDING
                  ANY CHANGES TO THIS AGREEMENT OR ADDITIONAL POLICIES
                  INCORPORATED BY REFERENCE WHICH LINGOFOR.ME MAY MAKE IN ITS
                  SOLE DISCRETION IN THE FUTURE, FOR AS LONG AS YOU USE THE
                  LINGOFOR.ME PRODUCTS AND SERVICES.
                </p>
                <p>
                  I ACKNOWLEDGE THAT I HAVE REVIEWED THIS AGREEMENT AND
                  UNDERSTAND THE TERMS OF THE AGREEMENT, MY RESPONSIBILITIES AND
                  THEIR CONSEQUENCES.
                </p>
              </DialogContentText>
            </DialogContent>
            <br />
            <br />
            <DialogActions className="boxModal">
              <Button onClick={this.handleClose} color="primary">
                {t("O_K")}
              </Button>
            </DialogActions>
          </Dialog>
          <div className="singIn">
            <h2>{this.props.showSignUp ? t("BTN_LOGIN") : t("USER_INFO")}</h2>
            {!this.props.showSignUp && (
              <form>
                <div>
                  <label htmlFor="name">{t("NAME")}</label>
                  <span>{t("REQUIRED_FIELD")}</span>
                </div>
                <input
                  type="text"
                  placeholder={t("NAME_PLACEHOLDER")}
                  name="name"
                  id="name"
                  value={this.props.formValues.name}
                  onChange={this.props.updateForm}
                  required
                />
                <div>
                  <label htmlFor="email">{t("LOGIN_EMAIL")}</label>
                  <span>{t("REQUIRED_FIELD")}</span>
                </div>
                <input
                  type="text"
                  placeholder={t("ADD_EMAIL")}
                  name="email"
                  id="email"
                  value={this.props.formValues.email}
                  onChange={this.props.updateForm}
                  required
                />

                <div className="inputs telefone">
                  <div className="lineInputs">
                    <div>
                      <label htmlFor={"userPhones"}>{t("CELLPHONE")}</label>
                      <span>{t("REQUIRED_FIELD")}</span>
                    </div>
                    <input
                      id={"userPhones"}
                      className="inputMobile"
                      required
                      placeholder={t("CELLPHONE")}
                      name="userPhones"
                      value={this.props.formValues.userPhones}
                      onChange={this.props.updateForm}
                    />
                  </div>

                  {/* <div className='lineInputs'>
                    <div>
                      <label htmlFor={'userPhoneTypeId' }>{t('TYPE')}</label>
                    </div>
                    <select 
                        name='userPhoneTypeId'
                        id={'phoneType' }
                        className="inputMobile"
                        value={this.props.formValues.userPhoneTypeId}
                        onChange={this.props.updateForm}
                        defaultValue="15">
                        <option value="15">{t('SELECT')}</option>
                        <option value="1">{t('COMMERCIAL')}</option>
                        <option value="2">{t('RESIDENCIAL')}</option>
                        <option value="3">{t('CELLPHONE')}</option>
                        <option value="4">{t('WHATSAPP')}</option>
                    </select>
                  </div> */}
                </div>

                <div>
                  <label htmlFor="countryId">{t("COUNTRY")}</label>
                  <span>{t("REQUIRED_FIELD")}</span>
                </div>
                <select
                  name="countryId"
                  id="countryId"
                  required
                  onChange={this.props.updateForm}
                  value={this.props.formValues.countryId}
                >
                  {this.props.countries.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <div>
                  <label htmlFor="password">{t("PASSWORD")}</label>
                  <span>{t("REQUIRED_FIELD")}</span>
                </div>
                <input
                  type="password"
                  placeholder={t("PASS_PLACEHOLDER")}
                  name="password"
                  id="password"
                  value={this.props.formValues.password}
                  onChange={this.props.updateForm}
                  disabled={isPasswordDisabled}
                  required
                />
                <div>
                  <label htmlFor="confirmPassword">{t("CHECK_PASS")}</label>
                  <span>{t("REQUIRED_FIELD")}</span>
                </div>
                <input
                  type="password"
                  placeholder={t("CHECK_PASS_PLACEHOLDER")}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  value={this.props.formValues.passwordConfirm}
                  onChange={this.props.updateForm}
                  disabled={isPasswordDisabled}
                  required
                />
              </form>
            )}

            {this.props.showSignUp && (
              <div>
                <form style={{ display: "flex", flexDirection: "column" }}>
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
                    minLength={6}
                    maxLength={20}
                  />
                </form>
                <ButtonMB
                  title={t("BTN_LOGIN")}
                  clickAction={this.handleForm}
                />
              </div>
            )}
            <div className="form-footer">
              <hr />
              <div>
                <span className="or-login-css">{t("OR_LOGIN")}</span>
              </div>
            </div>
            <span className="form-footer_social-login">
              {/* <SocialButton
                    provider='facebook'
                    appId={FACEBOOK_APP_ID}
                    onLoginSuccess={this.handleSocialLogin}
                    onLoginFailure={this.handleSocialLoginFailure}
                  >
                    <div className='form-btn-social face'>
                      <img src={IconFace} alt='facebook' />
                    </div>
              </SocialButton> */}
              
              <SocialButton
                provider="google"
                appId={GOOGLE_APP_ID}
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
                <div className="form-btn-social google">
                  <img src={IconGoogle} alt="google" />
                </div>
              </SocialButton>
              <AppleLogin
                clientId="me.lingofor.loginappleid"
                redirectURI="https://qas.lingofor.me/login"
                //redirectURI="https://lingo.com:3000/login"
                usePopup={true}
                callback={this.handleAppleLogin} // Catch the response
                scope="name email"
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
            </span>

            <div className="switchBox">
              <div className="switch__container addInput">
                <input
                  name="acceptedTerms"
                  id="switch-shadow"
                  className="switch switch--shadow"
                  type="checkbox"
                  value={this.state.accepted}
                  onChange={() => {
                    this.setState(
                      {
                        accepted: !this.state.accepted,
                      },
                      () => {
                        this.props.formValues.acceptedTerms =
                          this.state.accepted;
                      }
                    );
                    // this.props.updateForm({target: {name: 'acceptedTerms', value: this.state.accepted}})
                  }}
                />
                <label htmlFor="switch-shadow">
                  <span style={{ marginLeft: "50px" }}>
                    {t("I_AGREE")}{" "}
                    <a href="#" onClick={this.handleShowTerms("paper")}>
                      {t("TERMS_OF")}
                    </a>
                  </span>
                </label>
              </div>
            </div>

            {/* <div className='switchBox'>
              <div className='switch__container addInput'>
                <input
                  name='isMajor'
                  id='switch-shadow2'
                  className='switch switch--shadow'
                  type='checkbox'
                  value={this.state.isMajor}
                  onChange={() => {
                    this.setState({
                      isMajor: !this.state.isMajor
                    }, () => {
                      this.props.formValues.isMajor = this.state.isMajor
                    })
                  }} />
                <label htmlFor='switch-shadow2'><span style={{marginLeft: '50px'}}>{t('IS_MAJOR')}</span></label>
              </div>
            </div> */}
            {!this.props.showSignUp && (
              <div className="account">
                <p>
                  {t("HAVE_ACCOUNT")}{" "}
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={this.props.toggleSignForm}
                  >
                    {t("SING_IN")}
                  </a>
                </p>
              </div>
            )}
          </div>
        </Trans>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  t: PropTypes.func,
  i18n: PropTypes.object,
  toggleSignForm: PropTypes.func.isRequired,
  showSignUp: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  formValues: PropTypes.object.isRequired,
  openDialogSocialMediaLoginError: PropTypes.func.isRequired,
};

export default translate("translations")(SignUpForm);

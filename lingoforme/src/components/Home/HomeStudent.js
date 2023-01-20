import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import NextClass from "../_common/tableClass/nextClass";
import ButtonSchedule from "../Home/Componentes/Buttons/index";
import avatar from "../../images/profile/img_placeholder.svg";
import PlaceholderPlans from '../../images/placeholder/placeholder-noplan.png'
import TablePlans from '../Home/Componentes/TabelaPlans/index';
import ModalRating from '../ClassRating/modal_rating'
import moment from "moment";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Buttons } from '../Home/Componentes/Buttons/styles'
class HomeStudent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      openAlert: null
    }    

    this.closeAlert = this.closeAlert.bind(this)
  }
  
  closeAlert(e){
    this.setState({  openAlert: false })
  }

  render() {
    const { 
      t, user: { picture, name, classesForRating, plans }, lingo: { ratingCriterias }
    } = this.props
    let { openAlert } = this.state
    let canceledPlans = []
    canceledPlans = plans.filter( plan => plan.studentPlanPayments && plan.studentPlanPayments.length > 0 && plan.studentPlanPayments[0].status === 'cancelled')

    if(canceledPlans && canceledPlans.length == 1){
      if(canceledPlans[0].plan.trial){
        if(openAlert == null)
          openAlert = true           
      }
    } 

    if(plans && plans.length){
      console.log('valid plan', plans, canceledPlans, plans.length, plans[0].plan.trial, moment(plans[0].expireIn).utc().isBefore(moment().utc()),openAlert)
    }
    

    return (
    <div className="student">
      { !!classesForRating.length && !!ratingCriterias.length && <ModalRating target="teacher"/> }

      { openAlert != null && 
        <Dialog
          open={openAlert}
          onClose={this.closeAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"><span className="titleModal">{t('TITLE_PLAN_EXPIRED')}</span> </DialogTitle>
              <DialogContent>
                  <DialogContentText id="pass-dialog-description">
                      <b>{t("DESCRIPTION_PLAN_EXPIRED")}</b>
                  </DialogContentText>
              </DialogContent>
          <DialogActions style={{"justifyContent": "center"}}>
            <Buttons>
              <Link to="/manage-account/plan?type=buynewplan">
                  <button style={{backgroundColor:"red"}}>{t('BTN_BUY_PLAN')}</button>
              </Link>
            </Buttons>
          </DialogActions>
        </Dialog>   
      }

      <div className="boxInfo">
        <div className="infoUsers">
          <div className="photo">
          <img
            src={picture ? picture : avatar}
            alt='Avatar'
            width='112'
            height='112'
            className='avatarRound'
            style={{borderRadius:'50%', objectFit: 'cover'}}
          /> 
          </div>
          <div>
            <div className="salutation">
              <h1>{t("BTN_HELLO")},</h1>
            </div>
            <div className="name">
              <h2>{name}</h2>
            </div>
          </div>
        </div>
      </div>
      { plans.length > canceledPlans.length ?
          <div>
            <TablePlans/>
            <ButtonSchedule />
            <div className="nextHome">
              <NextClass single={true} />
              <NextClass />
            </div>
            <div className="buttons">
              <Link to={`/Calendar/`}>
                <button>
                  {t("BTN_VIEW_ALL")}
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </button>
              </Link>
            </div>
          </div>
        :
           plans.length == 1 && plans[0].plan.trial && moment(plans[0].expireIn).utc().isBefore(moment().utc()) ?
            <div className="container">
              <div className="placeholder">
                <h4 className="trial_title">{t("TITLE_PLAN_EXPIRED")}</h4><br/><br/>
                <img src={PlaceholderPlans} alt="No Plans"/>
                <p className="trial_description">{t("DESCRIPTION_PLAN_EXPIRED")}</p>
                <Buttons>
                    <Link to="/manage-account/plan?type=buynewplan">
                        <button style={{backgroundColor:"red"}}>{t('BTN_BUY_PLAN')}</button>
                    </Link>
                </Buttons>
              </div>
            </div>
            :
            <div className="container">
              <div className="placeholder">
                <h4>{t("DONT_HAVE_ACTIVE_PLAN")}</h4>
                <img src={PlaceholderPlans} alt="No Plans"/>
              </div>
            </div>     
        }
    </div>
    )
  }
}

const mapStateToProps = ({ user, lingo }) => ({ user, lingo })
export default connect(mapStateToProps)(translate('translations')(HomeStudent))

import React, { Component } from "react";
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCoordinator } from '../../actions/coordinatorsActions'
import { Link } from "react-router-dom";
import NextClass from "../_common/tableClass/nextClass";
import avatar from "../../images/profile/img_placeholder.svg";
import CardsAnalytics from "../Home/Componentes/CardsAnalytics/index";
import WithoutTeacher from "../_common/tableClass/withoutTeacher";

class HomeCoordinator extends Component {

  componentDidMount() {
    const { coordinatorId } = JSON.parse(localStorage.getItem('@lingo'))
    this.props.getCoordinator(coordinatorId)
  }
  render() {
    const { 
      t, 
      coordinators: { coordinator: { coordinatorLanguageResponsibles } }, 
      user: { name, picture } 
    } = this.props
    return (
      <div>
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
              <div className="tag">{t("CARD_CLASS_COORDINATOR")}</div>
              <div className="coordinatedLanguages">
                <h3>{t("COORDINATED_LANGUAGES")}:</h3>
                { coordinatorLanguageResponsibles && coordinatorLanguageResponsibles.map( ({lingoLanguage: {description}}) => (
                  <span>{t(description.toUpperCase())}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <CardsAnalytics />
        <div className="container">
          <div className="boxWithoutTeacher">
            <div className="withoutTeacher">
              <div className="">
                <h2>
                  <strong>{t("BTN_CLASS_WITHOUT_TECHER")}</strong>
                </h2>
                <WithoutTeacher isDemoClass={false} />
                <div className="buttons">
                  <Link to={`/Calendar/`}>
                    <button>
                      {t("BTN_VIEW")}{" "}
                      <i className="fa fa-angle-right" aria-hidden="true" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="withoutTeacher">
              <div className="">
                <h2>
                  <strong>{t("BTN_DEMO_CLASS_WITHOUT_TECHER")}</strong>
                </h2>
                <WithoutTeacher isDemoClass={true} />
              </div>
            </div>
          </div>
        </div>

        <div className="nextHome">
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
    )
  }
}

const mapStateToProps = ({ coordinators, user }) => ({ coordinators, user });
const mapDispatchToProps = dispatch => ({
	getCoordinator: data => dispatch(getCoordinator(data)),
});

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(HomeCoordinator))))

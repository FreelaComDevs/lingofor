import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import NextClass from "../_common/tableClass/nextClass";
import avatar from "../../images/profile/img_placeholder.svg";
import WithoutTeacher from '../_common/tableClass/withoutTeacher';
import CardsAnalytics from '../Home/Componentes/CardsAnalytics/index';

const HomeCompanyManager = ({ t, user: { name, picture }}) => (
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
          <div className="tag">Company Manager</div>
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
            <WithoutTeacher/>
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
            <div className="buttons">
            </div>
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
          {t("BTN_VIEW_ALL")} <i className="fa fa-angle-right" aria-hidden="true" />
        </button>
      </Link>
    </div>
  </div>
);

const mapStateToProps = ({ user, lingo }) => ({ user, lingo })
export default connect(mapStateToProps)(translate('translations')(HomeCompanyManager))

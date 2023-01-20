import React from "react";
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import NextClass from '../_common/tableClass/nextClass';
import RequestClass from '../_common/tableClass/requestClass';
import ButtonSchedule from '../Home/Componentes/Buttons/index';
import avatar from '../../images/profile/img_placeholder.svg';
import ModalRating from '../ClassRating/modal_rating';

const HomeTeacher = ({ t, user: { name, picture, averageRating, classesForRating }, lingo: { ratingCriterias }}) => (
  <div className="teacher">
    { !!classesForRating.length && !!ratingCriterias.length && <ModalRating target="student"/> }
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
          <div className="tag">{t("CARD_CLASS_TEACHER")}</div>
          <div className="rating startList">
            <p>{t("AVARAGE_RATING")}:</p>{" "}
            <span className="grades">{averageRating}</span>{" "}
            <Rating
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              start={0}
              initialRating={averageRating}
              readonly={true}
            />
          </div>
        </div>
      </div>
    </div>
    <RequestClass />
    <ButtonSchedule />
    <div className="nextHome">
      <NextClass single={true} />
      <NextClass/>
    </div>
    <div className="buttons">
      <Link to={`/Calendar/`}>
        <button>
          {t("BTN_VIEW_ALL")}{" "}
          <i className="fa fa-angle-right" aria-hidden="true" />
        </button>
      </Link>
    </div>
  </div>
)

const mapStateToProps = ({ user, lingo }) => ({ user, lingo })
export default connect(mapStateToProps)(translate('translations')(HomeTeacher))

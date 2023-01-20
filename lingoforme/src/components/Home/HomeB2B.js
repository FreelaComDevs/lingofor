import React from "react";
import { translate } from "react-i18next";
import avatar from "../../images/profile/img_placeholder.svg";
import ContractsTable from '../B2b/user/ContractsTable';
import { connect } from 'react-redux';

const HomeB2B = ({ t, user: { name, picture }, ...props }) => (
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
            <h1>Hello,</h1>
          </div>
          <div className="name"> {console.log('tese props',props)}
            <h2>{name}</h2>
          </div>
          <div className="tag">B2B • {props.fantasyName}</div>
        </div>
      </div>
    </div>
    <ContractsTable {...props} />
  </div>
);

const mapStateToProps = ({ user, lingo, props }) => ({ user, lingo, props })
export default connect(mapStateToProps)(translate('translations')(HomeB2B))

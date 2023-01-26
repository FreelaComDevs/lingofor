import React from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Head } from './styles';
import { AvatarArea } from '../avatar/avatar';
import { NotificationArea } from "../notification/notification";
import { EvaluationPending } from '../EvaluationPending';

const Header = ({ title, icon, children, user }) => {
  console.log(user)
  return (
    <Head>
      <header>
        <div className="header-holder"> 
        
          <EvaluationPending 
            href={"/class-rating"}
            name={"Avaliações Pendentes"}
            number={"2"}
          />

          <div className='container' style={{alignItems:"end"}}>
            <AvatarArea             
              name={user.name}
              language={"Português"}
              country={"Brasil"}
              date={"02/09/2020"}
              href={"/manage-account"}
              src={user.picture ?? "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png"}
            /> 
          </div>
        </div>
        {title === '' &&
          { children }
        }
      </header>
    </Head>
  )
}


const mapStateToProps = ({ user }) => ({ user })
export default connect(mapStateToProps)(translate('translations')(Header))

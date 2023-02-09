import React from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Head } from './styles';
import { AvatarArea } from '../avatar/avatar';
import { NotificationArea } from "../notification/notification";
import { InfoCard } from '../infoArea/infoCard';
import { RatingArea } from '../infoArea/ratingArea';
import { EvaluationPending } from '../EvaluationPending';

const Header = ({ title, icon, children, user }) => {
  return (
    <Head>
      <header>
        <div className="header-holder">
          <div className='container conteinar-between'>
            <div className='info-area'>
              <InfoCard>
                <RatingArea
                  data={[{
                    flag: "US",
                    rating: 3.7
                  },
                  {
                    flag: "BR",
                    rating: 4.3
                  },
                  {
                    flag: "ES",
                    rating: 3.3
                  }
                  ]}
                />
              </InfoCard>
            </div>
            <div className='user-area'>
              <NotificationArea />
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

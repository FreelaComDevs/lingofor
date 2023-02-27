import React from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Head } from './styles';
import { AvatarArea } from '../avatar/avatar';
import { NotificationArea } from "../notification/notification";
import { InfoCard } from '../infoArea/infoCard';
import { RatingArea } from '../infoArea/ratingArea';
import { Evaluation } from '../EvaluationPending/evaluation';
import moment from 'moment'

const Header = ({ title, icon, children, user, ...rest }) => {
  console.log('user', user)
  const formatSinceDate = moment(user.createdAt).format('MMMM/YYYY')
  return (
    <Head>
      <header>
        <div className="header-holder">
          <div className='container conteinar-between'>
            
            {user.role === "student" || user.role === ""?
              <Evaluation />
             : 
              null
             }

             {user.role === "teacher" ?
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
              : <div className='info-area'></div>}
            
            <div className='user-area'>
              <NotificationArea />
              <AvatarArea
                name={user.name}
                language={user.nativeLanguageName}
                country={user.countryName}
                date={formatSinceDate}
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

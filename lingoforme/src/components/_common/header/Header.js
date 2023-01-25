import React from 'react'

import { Head } from './styles';
import { AvatarArea } from '../avatar/avatar';
import { NotificationArea } from "../notification/notification";
import { InfoCard } from '../infoArea/infoCard';
import { RatingArea } from '../infoArea/ratingArea';


const Header = ({ title, icon, children }) => {

  return (
    <Head>
      <header>
        <div className="header-holder">
          <div className='container conteinar-between'>
            <div className='info-area'>
              <InfoCard>
                <RatingArea 
                data={[{
                  flag:"US",
                  rating: 3.7
                },
                {
                  flag:"BR",
                  rating:4.3
                },
                {
                  flag:"ES",
                  rating:3.3
                }
              ]}
                />
              </InfoCard>
            </div>
            <div className='user-area'>
              <NotificationArea />
              <AvatarArea
                name={"Vini"}
                language={"Português"}
                country={"Brasil"}
                date={"abril/2020"}
                href={"/manage-account"}
                src={"https://img.freepik.com/vetores-gratis/astronauta-bonito-dabbing-ilustracao-do-icone-dos-desenhos-animados-icone-de-ciencia-espacial-isolado-estilo-flat-cartoon_138676-3101.jpg?w=2000"}
              />
            </div>
          </div>
        </div>
        {title === '' &&
          { children }
        }

        {/* { title !== '' &&
            <h1>
              {icon}
              <span>{title}</span>
            </h1>
          } */}
      </header>
    </Head>

  )
}

export default Header

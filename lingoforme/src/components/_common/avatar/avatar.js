import { Avatar } from "./styles";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

const AvatarProfile = ({ t, src, name, language, country, date, href}) => {
    return (
        <Avatar>
            <Link to={href}>
                <img src={src} />
            </Link>
            <div className='personal-data'>
                <h3>{name}</h3>
                <p>{t('NATIVE_LANGUAGE')}: {language}</p>
                <p>{t('COUNTRY')}: {country}</p>
                <p>{t('AVATAR_SINCE')}: {date}</p>
            </div>
        </Avatar>
    )
}
export const AvatarArea = (translate('translations')(AvatarProfile))
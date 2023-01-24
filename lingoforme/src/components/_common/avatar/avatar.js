import { Avatar } from "./styles"
import { Link } from 'react-router-dom'

export const AvatarArea = ({ src, name, language, country, date, href}) => {
    return (
        <Avatar>
            <Link to={href}>
                <img src={src} />
            </Link>
            <div className='personal-data'>
                <h3>{name}</h3>
                <p>Lingua Nativa: {language}</p>
                <p>País: {country}</p>
                <p>Desde: {date}</p>
            </div>
        </Avatar>
    )
}
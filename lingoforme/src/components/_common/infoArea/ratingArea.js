import { Rating } from './styles';
import { FaStar } from 'react-icons/fa';
import { FlagIcon } from 'react-flag-kit';
import { translate } from 'react-i18next';
import { useState, useEffect } from 'react';

const RatingCard = ({ t, data = [] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {        
        let interval = null;
        if (data.length > 1) {
            interval = setTimeout(() => {
                    if (index >= data.length - 1) {
                        setIndex(0)
                    } else {
                        setIndex(index + 1)
                    }
                }, 5000);
        }
        return () => clearTimeout(interval);
    }, [index])


    return (
        <Rating>
            <div className='rating'>
                <div>{t('RATING')}</div>
                <div><FlagIcon size={25} code={data[index]?.flag} className='flag' /></div>
            </div>
            <div className='rating'>
                <div className='rating-number'>{data[index]?.rating}</div>
                <FaStar className='star' />
            </div>
        </Rating>
    )
}

export const RatingArea = (translate('translations')(RatingCard))
import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import seta from '../../../images/icons/green-arrow-icon.png';

const MOCK_image = "https://s3.amazonaws.com/blendapps/Adidas/storeLogos/"

const ListItemStock = ({image, qtd, id, onClickHandler, userRole}) => {
  let wrapperClass = 'form-group space-between';
  let isStore = (userRole !== 'backoffice');

  return (

    <div key={id} className={wrapperClass} onClick={() => onClickHandler(id)} >
      <div className="holder-item holder-item-custom">
        <div className="stock-holder-logo">
          {/* <img src={MOCK_image+image+'.png'} alt='store' className="store-image"/> */}
          <ProgressiveImage src={MOCK_image + image + '.png'} placeholder='https://via.placeholder.com/240x90'>
            {(src) => <img src={src} alt='product' className="item-image-stock-detail"/>}
          </ProgressiveImage>
        </div>
        <span className="info-holder-stock">
          { (qtd)
            ? <p className="title-available">Disponível</p>
            : <p className="title-unavailable">Indisponível</p>
          }
        </span>
        <div className={'item-right-stock ' + (qtd && isStore ? 'bg-green' : '')}>
          <h5 className={(qtd && isStore ? 'title-white' : (qtd ? 'title-available': 'title-unavailable'))}>{qtd}</h5>

        <span className="info-holder-stock">
          { (qtd && isStore)
            ? (<img alt="Indicar" src={seta} className="arrow"/>)
            : ''
          }
        </span>

        </div>
      </div>
    </div>
  );
};

export default ListItemStock;
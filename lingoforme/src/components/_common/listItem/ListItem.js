import React from 'react';
import {Link} from 'react-router-dom';

import seta from '../../../images/seta_dir_detalhes.svg';
import tagProd from '../../../images/icons/icon_tag_produto.svg';
import ProgressiveImage from 'react-progressive-image';

import AQUA from '../../../images/colors/aqua.png';
import BEIGE from '../../../images/colors/beige.png';
import BLACK from '../../../images/colors/black.png';
import BLUE from '../../../images/colors/blue.png';
import BROWN from '../../../images/colors/brown.png';
import GOLD from '../../../images/colors/gold.png';
import GREEN from '../../../images/colors/green.png';
import GREY from '../../../images/colors/grey.png';
import MULTICOLOR from '../../../images/colors/multicolor.png';
import ORANGE from '../../../images/colors/orange.png';
import PINK from '../../../images/colors/pink.png';
import PURPLE from '../../../images/colors/purple.png';
import RED from '../../../images/colors/red.png';
import SILVER from '../../../images/colors/silver.png';
import WHITE from '../../../images/colors/white.png';
import YELLOW from '../../../images/colors/yellow.png';
import NO_IMAGE from '../../../images/no_image.png';

const ListItem = ({image, title, productId, colors, onClick, productInfo}) => {
  let wrapperClass = 'form-group';

  const MOCK_image = "https://s3.amazonaws.com/blendapps/Adidas/aktz_images/";

  const colorsFiles = {
        AQUA,
        BEIGE,
        BLACK,
        BLUE,
        BROWN,
        GOLD,
        GREEN,
        GREY,
        MULTICOLOR,
        ORANGE,
        PINK,
        PURPLE,
        RED,
        SILVER,
        WHITE,
        YELLOW
      };

  return (
    <div className={wrapperClass}>

      <Link to={{
        pathname: '/produto/'+productId,
        state:{ info: productInfo }
      }}>
      <div className="holder-item">
        <ProgressiveImage src={MOCK_image + productId + '.jpg'} placeholder={NO_IMAGE}>
          {(src) => <img src={src} alt='product' className="item-image"/>}
        </ProgressiveImage>
        <span className="info-holder">
          <p className="item-title">{title}</p>
          <div className="item-info">
            <span className='info-left'>
              <img alt="tag-id" src={tagProd} className='info-icons'/>
              {productId}
            </span>
            <span className='info-right'>
              Cor:
              <span className='info-colors'>
                {colors.map((colorSelec, i) =>
                  <img key={'f' + i} alt={colorsFiles[colorSelec]} src={colorsFiles[colorSelec]} className='info-icons'/>
                )}

              </span>

            </span>
          </div>
        </span>
        <div className="item-right">
          <img alt="item-icon-dir" src={seta} className='search-logo'/>
        </div>
      </div>
      </Link>

    </div>
  );
};

export default ListItem;

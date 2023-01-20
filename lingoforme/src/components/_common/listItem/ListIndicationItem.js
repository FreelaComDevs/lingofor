import React from 'react';
import voucher from '../../../images/icons/voucher-icon.png';
import tagProd from '../../../images/icons/icon_tag_produto.svg';
import ProgressiveImage from 'react-progressive-image';
import sizeIcon from '../../../images/icons/size-icon.png';
import ColorUtils from '../../_utils/ColorUtils';


const ListItem = ({indication, store, id, title, goodInfo, productId, colors, size, productInfo, click, rightType, isMine}) => {
  let wrapperClass = 'form-group';

  const PATH_IMAGE = 'https://s3.amazonaws.com/blendapps/Adidas';

  return (
    <div className={wrapperClass} key={indication}>
      <div className={!rightType && isMine ? 'holder-item-indications' : 'holder-item-indications-no-click'}
        style={{opacity: (rightType) ? 0.5 : 1}}
        onClick={() => (!rightType && isMine) ? click(id) : false
      }>
        <div className='holder-img-info'>
          <ProgressiveImage src={`${PATH_IMAGE}/aktz_images/${productId}.jpg`}
            placeholder="../../../images/no_image.png">
            {(src) => <img src={src} alt="product" className="item-image"/> }
          </ProgressiveImage>
          <span className="info-holder">
            <p className="item-title"><b>{title}</b></p>
            <div className="item-name">
            {goodInfo}
            </div>
            <div className="item-info">
              <span className="info-left">
                <img alt="tag-id" src={tagProd} className="info-icons"/>
                {productId}
              </span>
              <span className="info-right">
                Cor:
                <span className="info-colors">
                  {colors.map(colorSelec => <img key={colorSelec}
                    alt="tag-id"
                    src={ColorUtils.returnColor(colorSelec)} className="info-icons"
                  />)}
                </span>
              </span>
              <span className='info-sizes'>
                  <img alt="size" src={sizeIcon} className="info-icons" />
                  <h6>
                    {(window.innerWidth > 600) ? 'Tamanho: ' + size : size}
                  </h6>
              </span>
            </div>
          </span>
        </div>
        <div className={isMine ? 'last-on-line' : 'hide'} id={indication}>
          <img alt="positivar venda" src={voucher} className="voucher-icon" id={indication} /><br/>
          {rightType ?
            <span id={indication} style={{fontWeight: '500'}}>VENDA POSITIVADA</span> :
            <span id={indication} style={{fontWeight: '500'}}>POSITIVAR VENDA</span>
          }
        </div>
        <div className={isMine ? 'hide' : 'last-on-line'}>
          <img alt="indicação" src={`${PATH_IMAGE}/storeLogos/${store}.png`} className="indication-logo" id={indication} /><br/>
          {rightType ? <span id={indication} style={{fontWeight: '500'}} className="lifit-text">INDICAÇÂO POSITIVADA</span> :
            <span id={indication} style={{fontWeight: '500'}} className="lifit-text">INDICAÇÂO</span>}
        </div>
      </div>
    </div>
  );
};

export default ListItem;

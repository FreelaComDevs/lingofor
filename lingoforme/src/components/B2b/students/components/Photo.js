import React, { Component } from 'react';
import avatar from '../../../../images/profile/img_placeholder.svg'
import cameraIcon from '../../../../images/profile/ico_camera.svg';


export default class Photo extends Component {

  handleUpload = e => {
    const file = e.target.files[0];
    const { onChange } = this.props;
    if (file) {
      const fileSize = file.size / 1024 / 1024
      if (fileSize <= 2) {
        let reader = new FileReader();
        reader.onload = evt => {
          onChange({
            target: {
              name: 'picture',
              value: evt.target.result
            }
          });
        }
        reader.readAsDataURL(file)
        onChange({
          target: {
            name: 'file',
            value: file
          }
        });
      }
    }
  }

  render() {
    const { t, item } = this.props;
    return (
      <div className='changePhoto'>
        <h2>{t('PHOTO')}</h2>
        <div style={{margin:'0'}}>
          <div className='photo'>
            <img
              src={item.picture ? item.picture : avatar}
              alt='Avatar'
              width='112'
              height='112'
              className='avatarRound'
              />
              <div className='fileUpload btn btn-primary'>
                <span>
                  <img src={ cameraIcon } alt='Camera' width='16' height='14' />
                    {t('CHANGE')}
                  </span>
                  <input
                    id='uploadBtn'
                    type='file'
                    className='upload'
                    onChange={this.handleUpload}
                    accept="image/x-png,image/jpeg"
                  />
                </div>
            </div>
        </div>
      </div>
    )
  }
}

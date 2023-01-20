import React from 'react'
import Button from '../button/Button'
import IconsLingo from '../iconsLingo/iconsLingo'
import NativeSelect from '@material-ui/core/NativeSelect'


const MultInput = ({
  forHtml,
  button,
  label,
  name,
  id,
  type,
  required,
  extraText,
  extraText2,
  className,
  width,
  placeHolder,
  value,
  change,
  changeSecondary,
  buttonTitle,
  buttonAction,
  buttonWidth,
  buttonClass,
  list,
  valueSecondary,
  remove
}) => {
  return (
    <div key={name}>
      <label htmlFor={forHtml}>
        {label}
        {required && <span className='caps'>
          &nbsp;&nbsp;{extraText}
        </span>}
        <span style={{fontSize: '1em'}}>
        </span>
      </label>
      <br/>
      <input
        id={id}
        className={className ? className : 'input-lingo'}
        style={{width}}
        name={name}
        required={required}
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={change} />
      {list && <NativeSelect
          id={id}
          inputProps={{name: 'phone_type', required: true}}
          className={'input-lingo-select'}
          value={valueSecondary}
          onChange={changeSecondary}
          >
        {list.map((o, i) => (<option key={i} value={o.value}>{o.name}</option>))}
      </NativeSelect>}
      {!button && list &&<button className='remove-button' id={id} onClick={remove}>
        {extraText2}&nbsp;&nbsp;
        <IconsLingo id={id} name={'ico-delete'} width='12' height='12' fill='#F00' />
      </button>}
      {button && <Button
        clickAction={buttonAction}
        title={buttonTitle}
        style={{width: buttonWidth}}
        className='auto-size-button-light'
        capitalize={true}
        rightIcon={<IconsLingo name='ico-arrow' fill={'#787780'} width={'8'} height={'10'} />} />}
      {!button && !list && <span className='side-inputs'>
        &nbsp;
        <input
          type='checkbox'
          checked={!!valueSecondary}
          id={id}
          onChange={changeSecondary}
        />
          {extraText}
          &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className='remove-button'
          id={id}
          onClick={remove}
        >
          {extraText2}&nbsp;&nbsp;
          <IconsLingo name={'ico-delete'} width='12' height='12' fill='#F00' />
        </button>
      </span>}
    </div>)
}

export default MultInput

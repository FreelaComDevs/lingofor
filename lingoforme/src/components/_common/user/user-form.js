import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimezonePicker from 'react-timezone';
import NativeSelect from '@material-ui/core/NativeSelect'
import { Cropper } from 'react-image-cropper'
import Dropzone from 'react-dropzone'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import IconsLingo from '../iconsLingo/iconsLingo'
import Button from '../button/Button'
import MultiInput from '../multi-input/multi-input'
import Services from '../../_api/Services'
import Modal from '../modal/index'
import './user-form.css'

class UserForm  extends Component {
  constructor(props) {
    super(props)
    this.service = new Services()
    this.t = props.t
    this.plans = []
    this.countries = []
    this.changePicture = this.changePicture.bind(this)
    this.addEmail = this.addEmail.bind(this)
    this.deleteEmail = this.deleteEmail.bind(this)
    this.addPhone = this.addPhone.bind(this)
    this.deletePhone = this.deletePhone.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changeEmails = this.changeEmails.bind(this)
    this.changeEmailNotification = this.changeEmailNotification.bind(this)
    this.changePhones = this.changePhones.bind(this)
    this.changePhoneType = this.changePhoneType.bind(this)
    this.setDate = this.setDate.bind(this)
    this.setTimezone = this.setTimezone.bind(this)
    this.toggleRandomTeacher = this.toggleRandomTeacher.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderCrop = this.renderCrop.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.state = {
      name: '',
      email: '',
      gender: '',
      birth_date: '',
      country: '',
      timezone: '',
      address: '',
      phone: '',
      phone_type: '',
      emails: [],
      phones: [],
      random_teachers: true,
      picture: {},
      modal: false
    }
  }

  componentDidMount() {
    let plans = [{id: '', name: 'SELECT'}]
    let countries = [{id: '', name: 'SELECT'}]
    // let parameters = {}

    this.targetElement = document.querySelector('#mainContent')

    this.phoneTypes = [
      {value: '', name: this.t('SELECT')},
      {value: 'home', name: this.t('HOME')},
      {value: 'work', name: this.t('WORK')},
      {value: 'cellphone', name: this.t('CELLPHONE')},
      {value: 'whatsapp', name: this.t('WHATSAPP')}
    ]

    this.service.noAuthGet('plans')
      .then(data => {
        this.plans = data
        plans = plans.concat(data)

        return this.service.noAuthGet('countries')
      })
      .then(data => {
        this.countries = data
        countries = countries.concat(data)
        return this.service.noAuthGet('parameters')
      })
      .then(parameters => this.setState({
        parameters,
        plans,
        selectedPlan: plans.filter(plan => plan.best_seller)[0],
        focuses: parameters.filter(focus => focus.type === 'focus'),
        lingos: parameters.filter(lingo => lingo.type === 'lingo'),
        structures: parameters.filter(structure => structure.type === 'structure')
      }))
      .then(() => console.log(this.state.userData, 'DATATADATADATADATADATADATADATADA%TA'))
      .catch(e => {
        console.log(e)
        this.setState({failed: true})
      })
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  changeEmails(e) {
    this.setState({emails: this.state.emails.map((em, i) => {
      if (i === +e.target.id) {
        em.value = e.target.value
      }

      return em
    })})
  }

  changeEmailNotification(e) {
    this.setState({emails: this.state.emails.map((em, i) => {
      if (i === +e.target.id) {
        em.notify = !this.state.emails[i].notify
      }

      return em
    })})
  }

  changePhones(e) {
    this.setState({phones: this.state.phones.map((p, i) => {
      if (i === +e.target.id) {
        p.value = e.target.value
      }

      return p
    })})
  }

  changePhoneType(e) {
    this.setState({phones: this.state.phones.map((p, i) => {
      if (i === +e.target.id) {
        p.type = e.target.value
      }

      return p
    })})
  }

  changePicture(e) {
    e.preventDefault()
    console.log(e)
  }

  addEmail(e) {
    e.preventDefault()
    if (!this.state.emails.length || this.state.emails[this.state.emails.length - 1].value) {
      this.setState({emails: this.state.emails.concat([{value: '', notify: false}])})
    }
  }

  deleteEmail(e) {
    e.preventDefault()
    if (e.target.id === '') {
      return console.error('No id on item deletion.')
    }

    this.state.emails.splice(+e.target.id, 1)
    this.setState({emails: this.state.emails})
  }

  addPhone(e) {
    e.preventDefault()
    if (!this.state.phones.length || this.state.phones[this.state.phones.length - 1].value) {
      this.setState({phones: this.state.phones.concat([{value: '', type: ''}])})
    }
  }

  deletePhone(e) {
    e.preventDefault()
    if (e.target.id === '') {
      return console.error('No id on item deletion.')
    }

    this.state.phones.splice(+e.target.id, 1)
    this.setState({phones: this.state.phones})
  }

  setDate(birth_date) {
    this.setState({birth_date})
  }

  setTimezone(timezone) {
    this.setState({timezone})
  }

  toggleRandomTeacher(e) {
    e.preventDefault()
    this.setState({random_teachers: !this.state.random_teachers})
  }

  onDrop(file) {
    window.scrollTo(0, 0);
    (this.state.modalIndication)
    ? enableBodyScroll(this.targetElement)
    : disableBodyScroll(this.targetElement)

    console.log(file)
    this.setState({
      modal: true,
      picture: file[0]
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmition({
      name: this.state.name,
      email: this.state.email,
      gender: this.state.gender,
      birth_date: this.state.birth_date,
      country: this.state.country,
      timezone: this.state.timezone,
      address: this.state.address,
      phone: this.state.phone,
      phone_type: this.state.phone_type,
      emails: this.state.emails,
      phones: this.state.phones,
      random_teachers: this.state.random_teachers,
      picture: this.state.picture
    })
  }

  renderCrop() {
    return (
      <div className='crop-container'>
      <div>{this.t('SELECT_DESIRED_SQUARE')}</div>
        <Cropper

          className='cropping-pic'
          src={this.state.picture.preview}
          ref={ ref => { this.cropper = ref }}
        />
      </div>
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Modal
            close={this.toggleIndications}
            position={'80%'}
            show={this.state.modal}
            title={this.t('RESIZE_PICTURE')}
            children={this.renderCrop()}
        />
        <div className='form-content'>
          <div className='profile-pic'>
            {this.state.picture.preview && <img alt='you' className='profile-pic' src={this.state.picture.preview} />}
            {!this.state.userPicture && !this.state.picture.preview && <IconsLingo name={'picture-placeholder'} width='110' height='110' fill='#c7c8c8' />}
            <br/>
            <Dropzone
              onDrop={this.onDrop}
              className='none'
              accept={['.png', '.jpg']}
            >
              <Button
                title={this.t('CHANGE')}
                className='button-light-small'
                capitalize={true}
                icon={<IconsLingo name='ico-camera' fill={'#787780'} width={'16.5'} height={'14'} />}
              />
            </Dropzone>
          </div>

          <div className='form-center'>

            <div>
              <label htmlFor='name'>{this.t('NAME')} <span className='caps'>{this.t('REQUIRED_FIELD')}</span>
                <span style={{fontSize: '1em'}}>
                </span>
              </label><br/>
              <input className='input-lingo'
                style={{width: '62%'}}
                name='name'
                required
                type='text'
                placeholder={this.t('NAME_PLACEHOLDER')}
                value={this.state.name}
                onChange={this.handleChange} />
            </div>

            <MultiInput
              name='email'
              type='email'
              required={true}
              extraText={this.t('REQUIRED_FIELD')}
              forHtml='email'
              label={this.t('LOGIN_EMAIL')}
              width={'62%'}
              button={true}
              buttonTitle={this.t('ADD_EMAIL')}
              buttonAction={this.addEmail}
              placeHolder={this.t('EMAIL_PLACEHOLDER')}
              buttonWidth={130}
              change={this.handleChange}
            />

            <div>
              {this.state.emails.map((email, i) => (<div key={i}>
                <MultiInput
                  name={`emails[${i}]`}
                  id={i}
                  type='email'
                  required={false}
                  forHtml='email'
                  extraText={this.t('NOTIFICATION')}
                  extraText2={this.t('DELETE')}
                  label={this.t('EXTRA_EMAIL')}
                  placeHolder={this.t('EXTRA_EMAIL_PLACEHOLDER')}
                  width={'62%'}
                  button={false}
                  change={this.changeEmails}
                  changeSecondary={this.changeEmailNotification}
                  remove={this.deleteEmail}
                  value={email.value}
                  valueSecondary={email.notify}
                />
              </div>))}
            </div>

            <div>
              <div className='small-inputs'>
                <label htmlFor='gender'>{this.t('GENDER')} <span className='caps'>{this.t('REQUIRED_FIELD')}</span>
                  <span style={{fontSize: '1em'}}>
                  </span>
                </label><br/>
                <NativeSelect
                  inputProps={{name: 'gender', required: true}}
                  style={{width: '84%'}}
                  className='input-lingo'
                  value={this.state.gender}
                  onChange={this.handleChange}
                >
                  <option value=''>{this.t('SELECT')}</option>
                  <option value='female'>{this.t('FEMALE')}</option>
                  <option value='male'>{this.t('MALE')}</option>
                  <option value='undeclared'>{this.t('UNDECLARED')}</option>
                </NativeSelect>
              </div>
              <div className='small-inputs'>
                <label htmlFor='birthdate'>{this.t('BIRTH_DATE')} <span className='caps'>{this.t('REQUIRED_FIELD')}</span>
                  <span style={{fontSize: '1em'}}>
                  </span>
                </label><br/>
                <DatePicker
                  dateFormat={this.t('DATE_FORMAT')}
                  className='input-lingo'
                  selected={this.state.birth_date}
                  onChange={this.setDate}
                />
              </div>
            </div>

            <div>
              <div className='small-inputs'>
                <div>
                  <label htmlFor='country'>{this.t('COUNTRY')} <span className='caps'>{this.t('REQUIRED_FIELD')}</span>
                    <span style={{fontSize: '1em'}}>
                    </span>
                  </label><br/>
                  <NativeSelect
                    inputProps={{name: 'country_id', required: true}}
                    style={{width: '82%'}}
                    className='input-lingo'
                    value={this.state.country_id}
                    onChange={this.handleChange}
                  >
                    {this.countries.map(country => (<option key={country.id} value={country.id}>{this.t(country.name)}</option>))}
                  </NativeSelect>
                </div>
              </div>
              <div className='small-inputs'>
                <label htmlFor='timezone'>{this.t('TIMEZONE')} <span className='caps'>{this.t('REQUIRED_FIELD')}</span>
                  <span style={{fontSize: '1em'}}>
                  </span>
                </label><br/>
              <TimezonePicker
                value={this.state.timezone}
                className='input-lingo'
                inputProps={{
                  placeholder: this.t('SELECT'),
                  name: 'timezone',
                }}
                onChange={this.setTimezone}
              />
              </div>
            </div>

            <div className='fill-gap'>
              <br/><br/><br/>
              <br/><br/><br/>
            </div>

            <div>
              <label htmlFor='address'>{this.t('ADDRESS')} <span className='caps'>{this.t('REQUIRED_FIELD')}</span>
                <span style={{fontSize: '1em'}}>
                </span>
              </label><br/>
              <input className='input-lingo'
                style={{width: '62%'}}
                name='address'
                required
                type='text'
                placeholder={this.t('ADDRESS_PLACEHOLDER')}
                value={this.state.address}
                onChange={this.handleChange} />
            </div>

            <MultiInput
              name='phone'
              type='phone'
              className='input-lingo small-inputs-2 phone'
              required={true}
              extraText={this.t('REQUIRED_FIELD')}
              forHtml='phone'
              label={this.t('TELEPHONE')}
              width={'26%'}
              button={true}
              buttonTitle={this.t('ADD_PHONE')}
              buttonAction={this.addPhone}
              placeHolder={this.t('PHONE_PLACEHOLDER')}
              list={this.phoneTypes}
              change={this.handleChange}
            />
            <div>
              {this.state.phones.map((phone, i) => (<div key={i}>
                <MultiInput
                  name={`phones[${i}]`}
                  id={i}
                  type='phone'
                  className='input-lingo small-inputs-2 phone'
                  required={false}
                  forHtml='phone'
                  extraText2={this.t('DELETE')}
                  label={this.t('TELEPHONE')}
                  placeHolder={this.t('PHONE_PLACEHOLDER')}
                  width={'26%'}
                  button={false}
                  list={this.phoneTypes}
                  change={this.changePhones}
                  changeSecondary={this.changePhoneType}
                  remove={this.deletePhone}
                  value={phone.value}
                  listValue={phone.type}
                />
              </div>))}
            </div>
            {this.t('CHOOSE_TEACHERS_FOR_MULTIPLE_CLASSES')}<br/>
          <Button
            capitalize={true}
            clickAction={this.toggleRandomTeacher}
            title={this.t('RANDOM')}
            className={this.state.random_teachers ? 'button-87' : 'button-light-87'}
            disabled={this.state.random_teachers}
            />
          &nbsp;
          <Button
            capitalize={true}
            clickAction={this.toggleRandomTeacher}
            title={this.t('FIXED')}
            className={this.state.random_teachers ? 'button-light-87' : 'button-87'}
            disabled={!this.state.random_teachers}
          />
          </div>
        </div>
        <div className='btn-pay'>
          <Button
            capitalize={true}
            className='button-auto-size'
            title={this.t('SAVE')}
          />
        </div>
      </form>
    )
  }
}

export default UserForm

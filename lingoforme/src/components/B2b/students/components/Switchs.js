import React, { Component } from 'react';
import Switch from './Switch';

export default class Switchs extends Component {

  render() {
    const { onChange, item } = this.props;

    return (
      <div>
        <div>
          <div className='inline-block md'>
            Allow buy extra classes
          </div>
          <div className='inline-block'>
            <Switch
              name='studentB2b.allowBuyExtraClasses'
              value={item.studentB2b.allowBuyExtraClasses}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <div className='inline-block md'>
            Allow change course focus
          </div>
          <div className='inline-block'>
            <Switch
              name='studentB2b.allowChangeCourseFocus'
              value={item.studentB2b.allowChangeCourseFocus}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <div className='inline-block md'>
            Allow change course structure
          </div>
          <div className='inline-block'>
            <Switch
              name='studentB2b.allowChangeCourseStruct'
              value={item.studentB2b.allowChangeCourseStruct}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <div className='inline-block md'>
            Allow change class focus
          </div>
          <div className='inline-block'>
            <Switch
              name='studentB2b.allowChangeClassFocus'
              value={item.studentB2b.allowChangeClassFocus}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <div className='inline-block md'>
            Allow change course lingo
          </div>
          <div className='inline-block'>
            <Switch
              name='studentB2b.allowChangeLingoPlan'
              value={item.studentB2b.allowChangeLingoPlan}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

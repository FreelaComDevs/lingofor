import React, { Component } from 'react';


export default class Plan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      contractPlanId : undefined //contractPlanStudent id contractPlanId
    };
  }

  componentDidMount(){
    const student = this.props.item;
    if(student.contractPlanId){
      this.setState({contractPlanId: student.contractPlanId})
    }
}

  handlerPlan = (e) =>{
    const {value} = e.target
    this.setState({contractPlanId: value})
    this.props.onChange(e)
  }

  render() {
    const { t } = this.props
    const student = this.props.item
    const plans = this.props.plans
    return (
      <div>
        <div>
          <label>{t('PLANS')}</label>
          <span>{t('REQUIRED')}</span>
        </div>
        <select
          value={this.state.contractPlanId}
          onChange={(e) => this.handlerPlan(e)}
          className='input-lingo mediumSelect'
          name="contractPlanId"
        >
          <option>Select</option>
          {plans.map(i => {
            return <option key={i.contractPlanId*9} value={i.contractPlanId}>{i.nameEnglish}</option>
          })}
        </select>
      </div>
    )
  }
}

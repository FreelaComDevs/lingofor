import React, { Component } from 'react';

import ListLanguage from './ListLanguage';

export default class Plan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      languages: []
    };
  }

  async componentDidMount() {
    const languages = await this.props.apiClient.fetchLingoLanguages();
    this.setState({ languages });
  }
 

  render() {
    const { t, changeLanguages, selectedPlan } = this.props;
    const student = this.props.item;
    return (
    
    <div className='inputs lineInputs' style={{flexDirection: "column"}}>
    {
      <ListLanguage {...this.props} selectedPlan={selectedPlan} onChangeLanguages={(o, i) => changeLanguages(o, i) } languages={this.state.languages} student={student} t={t}/>
    }         
    </div>
    )
  }
}

import React, { Component, cloneElement } from 'react'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'
import shortid from 'shortid'

class Form extends Component {


  render() {
    const { t, children, inputChange, childInputChange, addField, removeField, submit } = this.props

    return (
      <div className='new-container'>
				<form onSubmit={(e) => submit(e)}>  
					<div className='new-box new-box-form'>
						<div>{ children.map( (child, index) => { 
							if( child.type === "h2" || child.type === "h3") { return child }
							else { return cloneElement(child, { key: (child.name?child.name:'ctrl')+index, inputChange, childInputChange, addField, removeField }) }
						})}</div>
					</div>
					<div className='buttons'>
						<button className="new-button exit" onClick={ (e) => { e.preventDefault(); this.props.history.push("./") }}>{t("CANCEL")}</button>
						<button className="new-button" type="submit">{t("SAVE")}</button>
					</div>
				</form>
      </div>
    )
  }
}

export default withRouter(translate('translations')(Form))
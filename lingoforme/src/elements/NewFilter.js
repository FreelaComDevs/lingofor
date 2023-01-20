import React, { Component, cloneElement } from 'react'
import { withRouter } from 'react-router-dom'
import { translate } from 'react-i18next'

class Filter extends Component {
  state = {
    filtered: false,
    showExtra: false,
  }

  onSubmit = (e) => {
    this.setState({filtered: true})
    this.props.submit(e)
  }

  onClear = (e) => {
    this.setState({filtered: false})
    this.props.clear(e)
  }

  showExtraHandler = (e) => {
    this.setState({showExtra: !this.state.showExtra})
  }

  render() {
    const { state, props, onSubmit, onClear, showExtraHandler } = this
    const { filtered, showExtra } = state
    const { t, history, component, children, inputChange } = props

    return (
      <div className='filter-container'>
        { component && (
          <button className="new-button" onClick={ () => history.push("/demo-class/new") }>
            <i className='fa fa-plus' aria-hidden='true' /> {`${t("ADD_NEW")} ${t(component.toUpperCase())}`}
          </button>
        )}
        <div className='new-box new-box-filter'>
          <h2><i className="fa fa-filter" aria-hidden="true"></i>{t("FILTERS")}</h2>
          <form>  
            <div>{ children.map( (child, index) => child && (!child.props.extra || showExtra) && cloneElement(child, { key: child + index, inputChange: inputChange})) }</div>
            <div className='buttons'>
              <button type="button" className="new-button clear" onClick={ (e) => showExtraHandler(e) }>
                {`${ showExtra ? `${t("VIEW_LESS")} +` : `${t("VIEW_MORE")} +`}`}
              </button>
              <button type="button" className="new-button clear" onClick={ (e) => onClear(e) }>{t("CLEAR_FILTERS")}</button>
              <button type="button" className="new-button" onClick={(e) => onSubmit(e)}>{t("FILTER")}</button>
            </div>
          </form>
        </div>
          { filtered &&  <p>{t("RESULTS_FOR_YOUR_SEARCH")}</p> }
      </div>
    )
  }
}

export default withRouter(translate('translations')(Filter))

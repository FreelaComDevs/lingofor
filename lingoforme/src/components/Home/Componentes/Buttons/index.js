import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Buttons } from './styles'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Schedule from '../../../../images/icons/icon_bt_schedule.svg'

class ButtonSchedule extends Component {

    constructor (props) {
        super(props)

        this.i18n = this.props.i18n
        this.t = this.props.t

    }

    render() {

        return (
            <div>
                <Buttons>
                    <hr/>
                    <Link to="/calendar">
                        <button><img src={Schedule} alt="View Schedule"/>{this.t('BTN_VIEW_SCHEDULE')} </button>
                    </Link>
                    <Link to="/schedule">
                        <button className="scheduleClass"><i className="fa fa-plus" aria-hidden="true"></i>{this.t('BTN_SCHEDULE_CLASS')}</button>
                    </Link>
                </Buttons>
            </div>
        );
    }
}

ButtonSchedule.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}

export default translate('translations') (ButtonSchedule)
           

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import timezone from 'moment-timezone'
import moment from 'moment'
import { translate, Trans } from 'react-i18next'

export const ajusteTimeZoneSaoPailo = (date, timezone, format, addMinuts) => {
    // Arrumando o timezone horario de verão são paulo, subtraindo 1 hora.
    let dataNew = moment(date).tz(timezone)
    moment.tz(timezone) 
    let dataTimeZone = moment(dataNew)
    
    if(timezone && timezone === 'America/Sao_Paulo'){        
        timezone = 'America/Bahia'
    }

    if(addMinuts){
        dataTimeZone.add(addMinuts, 'minutes') 
    }

    return dataTimeZone.format(format)
}

export const MomentHelpers = {
    formatHelper: function (dateToFormat, locale) {
        if (locale === 'en') {
            return moment(dateToFormat).format('MM/DD/YYYY');
        } else {
            return moment(dateToFormat).format('DD/MM/YYYY');
        }
    },
}

class MomentLocalDate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            momentFormat: 'DD/MM/YYYY',
            datetoShow: '00/00/0000',
        }
    }

    componentDidMount() {
        this.setFormat(this.props.locale);
    }

    setFormat(locale) {
        if (locale === 'en') {
            this.setState({ momentFormat: 'MM/DD/YYYY' })
        } else {
            this.setState({ momentFormat: 'DD/MM/YYYY' })
        }
        this.setState({ datetoShow: this.props.date })
    }

    componentWillUpdate(prevProps) {
        if (this.props.locale !== prevProps.locale) {
            this.setFormat(prevProps.locale);
        }
    } 

    render() {
        return (
            <Moment format={this.state.momentFormat}>{this.state.datetoShow}</Moment>
        );
    }
}


export default MomentLocalDate;



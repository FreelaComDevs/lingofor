import React from 'react';
import $ from 'jquery';
import fullCalendar from "fullcalendar";
import './FullCalendar.css'
import moment from 'moment';
import 'fullcalendar/dist/locale-all'


class FullcalendarObjectMapper{
    getSettings(properties){
        let newSettings = {};
        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                newSettings[key] = properties[key];
            }
        }
        return newSettings;
    }
}   

export default class FullCalendar extends React.Component{
	constructor(){
		super();
		this.jq = $.noConflict();
		this.fullcalendarObjectMapper = new FullcalendarObjectMapper();
		this.root = null;
		this.instance = null;
		this.date = new Date();
	}

	componentDidMount () {
		const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
		this.instance = this.jq(`#${this.root}`).fullCalendar(objectMapperSettings);
	}

    componentWillReceiveProps (nextProps) {
        if (nextProps.view !== this.props.view) {
            this.jq(`#${this.root}`).fullCalendar('destroy');
            const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(nextProps);
            objectMapperSettings.defaultView = nextProps.view;
            this.instance = this.jq(`#${this.root}`).fullCalendar(objectMapperSettings);
        }
  	}

	render () {
		this.root = this.props.id || 'ID' + this.date.getTime(); 
		return(
			<div id={this.root}></div>
		)
	}
}

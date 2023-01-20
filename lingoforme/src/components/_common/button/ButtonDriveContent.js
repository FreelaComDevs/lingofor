import React, { Component } from 'react'
import { translate } from 'react-i18next'
import icon from '../../../images/icons/icon_drive.png';
import './ButtonDrive.css';


export default class ButtonDriveContent extends Component  {

    render() {
        const lang = this.props.language || 'English';
        const link = this.props.link;
        const idioma = this.props.idioma ? this.props.idioma : 'Drive';
        return (
            <a href={link} title={`${lang}: ${link}`} className="drive" target="_blank">
                <span>{idioma}</span>
                <img src={icon} alt="Drive"/>
            </a>
        );
    }

}

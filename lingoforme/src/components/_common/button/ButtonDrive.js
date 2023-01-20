import React, { Component } from 'react'
import { translate } from 'react-i18next'
import icon from '../../../images/icons/icon_drive.png';
import './ButtonDrive.css';


export default class ButtonDrive extends Component  {

    render() {
        const lang = this.props.language || 'English';
        const links = {
            // english: 'https://drive.google.com/open?id=1QOcxk6gI7HuNDzT9N2nVbKNkRxiEh7N8LiNR2W4-fPM',
            // portuguese: 'https://drive.google.com/open?id=1nDklJBjpXDV3xy3-EDD8bv-bzqYrSKsp8CW_kBTLLPE',
            // spanish: 'https://drive.google.com/open?id=1d0lwT-oTzf3sSBDs5yqs_Keo8AU71k4Z1GzJyyA9KuY'
            english: 'https://datastudio.google.com/s/vrP25LtZMjg',
            portuguese: 'https://datastudio.google.com/s/qoxTl8ExzXc',
            spanish: 'https://datastudio.google.com/s/mgaiIhUcdW8'
        };
        const link = links[lang.toLowerCase()] || links.english;
        return (
            <a href={link} title={`${lang}: ${link}`} className="drive" target="_blank">
                <span>Drive</span>
                <img src={icon} alt="Drive"/>
            </a>
        );
    }

}

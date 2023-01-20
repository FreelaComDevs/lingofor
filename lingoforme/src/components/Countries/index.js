import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Services from '../_api/Services'
import PATH_SERVER from '../_api/PATH_SERVER'
import axios from 'axios'

import Engrenagem from '../../images/icons/icon_settings_header.svg'


import { Table } from './styles';


class Countries extends Component {

    constructor (props) {
        super(props)
        this.services = new Services()
        this.t = this.props.t        

        this.state = {         

            paymentMethodId: [],
            paymentMethod: [],
           
        }    
    }

    // handleChange(e) {
    //     console.log('STATE ', this.state)
    //     this.setState({[e.target.name]: e.target.value}) 
    //     console.log('---------- STATE ', this.state)
    // }

    componentDidMount () {        

        axios.get(`${PATH_SERVER.DOMAIN}/pricecountries/list?skip=0&take=1000`)
        .then(response => {
            console.log('##### response AddNEWww ', response)

            this.setState({ 
                paymentMethodId: response.data.result.items
            });
        });

    }

    render() {
        const { t } = this.props

        return (

            <div className="view">                
                <SideMenu />

                <section>
                    <Header/>   
                    <div className="toptitle">      
                        <img src={Engrenagem} alt="Engrenagem" />    
                        <h1>Countries</h1>                   
                    </div> 

                    <Table>
                    <div className="buttons">
                        <Link to="/countries/new">
                            <button><i class="fa fa-plus" aria-hidden="true"></i> Add New Country</button>
                        </Link>
                    </div>

                    
                        <div className="container">
                            <div className="bigBox">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Country</th>
                                        <th>Language</th> 
                                        <th>Standard payment</th>
                                        <th>Standard currency</th>
                                        <th>Standard country</th>
                                        <th>{t("EXTRA_CLASS")} %</th>
                                        <th>Status</th>
                                    </tr>
                                    
                                    { 
                                        this.state.paymentMethodId.map(country => (
                                            <tr key={country.id}>
                                                { console.log(country) }
                                                <td>{country.country.name}</td>
                                                <td>{country.lingoLanguage.language.name}</td>
                                                <td>{country.paymentMethod}</td>
                                                <td>{country.standardCurrency}</td>
                                                <td>{country.defaultCountry ? 'Sim' : 'Não' }</td>
                                                <td>{country.extraClassPercentage && country.extraClassPercentage}</td>
                                                <td><span style={{color: country.active ? '#0ED572' : '#FF5666'}}>{country.active ? 'Active' : 'Inactive' }</span></td>
                                                <td>
                                                <Link to={`/countries/${country.id}`}>
                                                    <button>View <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                                </Link>    
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </Table> 
                </section>
            </div>
        );
    }
}

export default translate('translations')(Countries)
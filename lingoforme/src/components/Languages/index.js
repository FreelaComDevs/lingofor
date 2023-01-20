import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Services from '../_api/Services'
import PATH_SERVER from '../_api/PATH_SERVER'
import axios from 'axios'

// import ReactFlagsSelect from 'react-flags-select';
import Engrenagem from '../../images/icons/icon_settings_header.svg'

import { FlagIcon } from "react-flag-kit";

// import IconTitle from '../../images/icons/settings.svg';

import { Table } from './styles';


class Languages extends Component {

    constructor (props) {
        super(props)
        this.services = new Services()
        this.t = this.props.t        

        this.state = {         
            listLanguages: [],
        }    
    }

    componentWillMount () {        

        axios.get(`${PATH_SERVER.DOMAIN}/lingolanguages/getall`)
        .then(response => {
            //console.log('##### response AddNEW LANGUAGEEEEEEEEEEEE ', response);

            this.setState({ 
                listLanguages: response.data.result.items
            });
        });

    }

    render() {
        return (

            <div className="view">                
                <SideMenu />

                <section>
                    <Header/>   
                    <div className="toptitle">      
                        <img src={Engrenagem} alt="Engrenagem" />    
                        <h1>Languages</h1>                   
                    </div>
                        
                
                    <Table>
                        <div className="container">
                            <div className="buttons">
                                <Link to="/languages/new/">
                                    <button><i class="fa fa-plus" aria-hidden="true"></i> Add New Language</button>
                                </Link>
                            </div>
                            <div className="bigBox">
                                <table>
                                    <tr>
                                        <th>Flag</th>
                                        <th>Language</th> 
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>

                                    { 
                                        this.state.listLanguages.map(list => (
                                        <tr key={list.id}>
                                            <td> <FlagIcon code={list.flag} /></td>
                                            <td>{list.language.name}</td>
                                            <td>{list.description}</td>
                                            <td><span style={{color: list.active ? '#0ED572' : '#FF5666'}}>{list.active ? 'Active' : 'Inactive' }</span></td>
                                            <td>
                                                <Link exact to={`/languages/${list.id}`}>
                                                    <button>View <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                                </Link>
                                            </td>
                                        </tr>
                                      ))
                                    }

                                </table>
                            </div>
                            
                        </div>
                    </Table>
                </section>
            </div>
        );
    }
}

export default Languages;
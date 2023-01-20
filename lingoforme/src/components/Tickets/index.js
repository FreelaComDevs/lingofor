import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Services from '../_api/Services'
// import PATH_SERVER from '../_api/PATH_SERVER'
// import axios from 'axios'

import Engrenagem from '../../images/icons/icon_settings_header.svg'

// import { FlagIcon } from "react-flag-kit";

import { Table } from './styles';


class Tickets extends Component {

    constructor (props) {
        super(props)
        this.services = new Services()
        this.t = this.props.t        

        this.state = {         
            litsTicket: [],
        }    
    }

    componentWillMount () {        

        this.services.get(`ticketTypes`)
        .then(response => {

            this.setState({ 
                litsTicket: response.result.items
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
                        <h1>Tickets</h1>                   
                    </div>
                        
                
                    <Table>
                        <div className="container">
                            <div className="buttons">
                                <Link to="/tickets/new/">
                                    <button><i class="fa fa-plus" aria-hidden="true"></i> Add New Type</button>
                                </Link>
                            </div>
                            <div className="bigBox">
                                <table>
                                    <tr>
                                        <th>Type</th>
                                        <th>Subtypes</th> 
                                        <th>Status</th>
                                    </tr>

                                    { this.state.litsTicket.map(list => {                  
                                            return ( 
                                                <tr key={list.id}>
                                                    <td>{list.nameEnglish}</td>
                                                    <td>
                                                        {
                                                            list.ticketSubTypes.map((item, index) => {                  
                                                                return (  
                                                                    
                                                                    (index === 0 ? '' : ', ' ) + item.nameEnglish
                                                                   
                                                                    )
                                                                }
                                                            )
                                                        } 
                                                    </td> 
                                                    <td><span style={{color: list.active ? '#0ED572' : '#FF5666'}}>{list.active ? 'Active' : 'Inactive' }</span></td>
                                                    <td>
                                                        <Link exact to={`/tickets/${list.id}`}>
                                                            <button>View <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                             )
                                        })
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

export default Tickets;
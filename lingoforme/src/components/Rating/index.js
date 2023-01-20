import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PATH_SERVER from '../_api/PATH_SERVER'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import axios from 'axios'


import Settings from '../../images/icons/icon_settings_header.svg'

import { Table } from './styles';


class Rating extends Component {

    constructor (props) {
        super(props)
        this.state = {     
            listRating: [],
        }    
    }

    componentDidMount () {        

        axios.get(`${PATH_SERVER.DOMAIN}/ratingCriterias?skip=0&take=1000`)
        .then(response => {
            this.setState({ 
                listRating: response.data.result.items
            });
        });

    }

    render() {
        

        return (
            <div className="view">
                <SideMenu/>                  

                <section>
                    <Header/>   
                    <div className="toptitle">      
                        <img src={Settings} alt="Settings" />    
                        <h1>Rating</h1>                   
                    </div> 

                    <Table>
                        <div className="container">
                            
                            <div className="topTable">
                                <h3>Student</h3>
                                <Link to="/Rating/new">
                                    <button><i class="fa fa-plus" aria-hidden="true"></i> Add new Criterion</button>
                                </Link>
                            </div>
                            <div className="bigBox">
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>

                                    { 
                                        this.state.listRating.filter( item => item.target === "student").map(list => (
                                            <tr key={list.id}>
                                                <td>{list.nameEnglish}</td>
                                                <td>{list.descriptionEnglish}</td>
                                                <td><span style={{color: list.active ? '#0ED572' : '#FF5666'}}>{list.active ? 'Ativo' : 'Inativo' }</span></td>
                                                <td>
                                                    <Link to={`/rating/${list.id}`}>
                                                        <button>View <i class="fa fa-angle-right" aria-hidden="true"></i></button>
                                                    </Link>
                                                </td>
                                            </tr>                                   
                                        ))
                                    }
                                    
                                </table>
                            </div>
                        </div>

                        <div className="container">
                        
                            <div className="topTable">
                                <h3>Teacher</h3>
                                
                                <Link to="/rating-teacher/new">
                                    <button><i class="fa fa-plus" aria-hidden="true"></i> Add new Criterion</button>
                                </Link>

                            </div>

                            <div className="bigBox">
                                <table>
                                    <tr>         
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>

                                    { 
                                        this.state.listRating.filter( item => item.target === "teacher").map(list => (
                                            <tr key={list.id}>
                                                <td>{list.nameEnglish}</td>
                                                <td>{list.descriptionEnglish}</td>
                                                <td><span style={{color: list.active ? '#0ED572' : '#FF5666'}}>{list.active ? 'Ativo' : 'Inativo' }</span></td>
                                                <td>
                                                    <Link to={`/rating-teacher/${list.id}`}>
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

export default Rating;
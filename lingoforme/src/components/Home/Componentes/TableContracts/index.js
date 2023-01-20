import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Moment from 'react-moment';

// import { FlagIcon } from "react-flag-kit"

import Axios from 'axios'

import { Contracts } from './styles'

import Contract from '../../../../images/icons/icon_contract.svg'


class TableContracts extends Component {

    constructor (props) {
        super(props)

        this.state = {         
            contracts: [],
        }    
    }

    componentDidMount () {    

        Axios.get('https://www.mocky.io/v2/5c11b1b03300005700998bb3')
        .then(response => {
            console.log('Contracts ', response);

            this.setState({ 
                contracts: response.data.result.items
            });
        });        

    }

    render() {

        return (
            
            <Contracts>
                <div className="container">
                    <div className="title">
                        <h2><img src={Contract} alt="Contract"/>Contracts</h2>
                    </div>

                    <div className="box">
                        <div className="boxOverView">
                            <div className="bigBox">
                                <div className="boxItem">
                                    <div className="item">
                                        <div className="itensBox">
                                            <h3>Overview</h3>
                                        </div>                             
                                    </div>                            
                                    
                                </div>                       
                            </div>

                            { 
                                this.state.contracts.map(contract => (
                                    <div key={JSON.stringify(contract)} className="bigBox">                                    
                                        <div className="boxItem">
                                            <div className="item">
                                                <div className="itensBox">
                                                    <h3>Contract number</h3>
                                                    <span className="red">#{contract.ContractNumber}</span>
                                                </div>
                                                <div className="itensBox">
                                                    <h3>{contract.Description}</h3>
                                                    <span className="red">Lorem ipsum dolor sit amet lorem ipsum</span>
                                                </div>
                                                <div className="itensBox">
                                                    <h3>Students</h3>
                                                    <span className="red">{contract.Students}</span>
                                                </div>
                                                <div className="itensBox">
                                                    <h3>Expires on</h3>
                                                    <span className="red"><Moment format="YYYY/MM/DD">{contract.ExpiresOn}</Moment></span>
                                                </div>
                                                <div className="itensBox">
                                                        <button>View <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                    </div>
                                            </div>                                    
                                        </div> 
                                    </div>

                                    ))
                                    }

                                    <div className="buttons">
                                        <button>View all <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                    </div>
                                    
                                </div>


                                <div className="boxs">                          
                                    <div>
                                        <div className="boxSmall">
                                            <h3>Students</h3>
                                            <span>194</span>
                                        </div>
                                        <div className="boxSmall">
                                            <h3>Contracts</h3>
                                            <span>7</span>
                                        </div>
                                    </div>                             
                                </div>

                    </div>

                </div>
            </Contracts>
           
        );
    }
}

export default TableContracts;
           

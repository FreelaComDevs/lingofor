import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import Enter from '../../../images/btn_send.png';
import Up from '../../../images/icons/icon_cs_up.png';
import Down from '../../../images/icons/icon_cs_down.png';
import IconAvatar from '../../../images/profile/img_placeholder.svg';

import { Ticket } from '../styles'

class Tickets extends Component {

    constructor (props) {
        super(props)

        this.state = {         
            isVisible: true,       
            isVisibleExtra: false,
        }

        this.loggedHeader = {
            'Content-Type': 'application/json'
        }        
    }


    componentDidMount () {        

    }

    render() {
        const t = this.props;
        
        return (
            <Ticket>  
                <div className="container">                     
                    <div className="topTicket">
                        <div className="numberTicket">
                            <h3>Ticket #312412</h3>
                            <span>Open date: 10 July 2018 - 4:45pm</span>
                        </div>

                        <select>                                   
                            <option value="inrogress">• In progress</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="closed">{t("CLOSED")}</option>
                        </select>
                    </div>
            
                    <div className="bigBox">
                        <form>
                            <div className="infoTicket">
                                <label for="name">Name:</label>
                                {/* <input value={this.state.name} onChange={this.handleChange} name="name" value="Alisha Patel"/>  */}
                                <p>Alisha Patel</p>
                                <div className="tag">Student</div>                                        
                            </div> 

                            <div className="infoTicket">
                                <div>
                                    <label for="type">Type</label>
                                </div>
                                <select value={this.state.type} onChange={this.handleChange} name='type' className='input-lingo'>
                                    <option >Payment</option>
                                    {/* {
                                        this.state.languagesSel.map(countrie => (
                                            <option key={countrie.id} value={countrie.id}>{countrie.name}</option>
                                        ))
                                    }  */}
                                                                                
                                </select> 

                                    <div>
                                    <label for="subtype">Subtype:</label>
                                </div>
                                <select value={this.state.subtype} onChange={this.handleChange} name='subtype' className='input-lingo'>
                                    <option >Paypal</option>
                                    {/* {
                                        this.state.languagesSel.map(countrie => (
                                            <option key={countrie.id} value={countrie.id}>{countrie.name}</option>
                                        ))
                                    }  */}
                                                                                
                                </select>

                                <div>
                                    <label for="lingo">Lingo</label>
                                </div>
                                            
                                <Select value={this.state.lingo} onChange={this.handleChange} name='lingo' className='input-lingo Select' disableUnderline>
                                    {/* <option >Select</option>                                                  */}

                                    {/* {
                                        this.state.flags.map(item => {
                                            
                                        return <MenuItem key={item} value={item}><FlagIcon code={item} /> </MenuItem>
                                    })} */}
                                                                                
                                </Select>                             
                            </div> 

                            <hr/>

                            <div className="infoTicket">
                                <label for="title">Title:</label>
                                {/* <input value={this.state.name} onChange={this.handleChange} name="name" value="Alisha Patel"/>  */}
                                <p>Problem paying my plan on Paypal</p>                                     
                            </div>  

                            <div className="infoTicket">
                                <div>
                                    <label for="description">Description:</label>
                                    {/* <input value={this.state.name} onChange={this.handleChange} name="name" value="Alisha Patel"/>  */}
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit consequat nisl at maximus. Quisque egestas purus in erat accumsan mollis. Integer libero velit, tristique eu faucibus vitae, blandit sit amet elit. Pellentesque id sodales odio. Etiam lacinia at lacus vitae iaculis. Donec eu malesuada justo, eget rutrum metus. Aliquam eget feugiat lectus.</p>                                     
                                </div>
                            </div>      
                        </form>                                   
                    </div>

                    <div className="buttons">
                        <button>Close ticket</button>
                    </div>
                </div>

                <div className="container">
                    {/* Cancel Ticket */}
                    <div className="topTicket">
                        <div className="numberTicketCancel">
                            <h3>Cancel information</h3>
                            <span>Cancel date: 10 July 2018 - 4:45pm</span>
                        </div>
                    </div>
                    <div className="bigBox">
                        <form>
                            <div className="infoTicket">
                                <div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit consequat nisl at maximus. Quisque egestas purus in erat accumsan mollis. Integer libero velit, tristique eu faucibus vitae, blandit sit amet elit. Pellentesque id sodales odio. Etiam lacinia at lacus vitae iaculis. Donec eu malesuada justo, eget rutrum metus. Aliquam eget feugiat lectus.</p>                                     
                                </div>
                            </div>      
                        </form>                                   
                    </div>
                    <div className="buttons">
                        <button className="cancel">Cancel ticket</button>
                    </div>
                </div>

                <div className="container">
                    <div className="notes">
                    <h2>History</h2>
                    
                    <div className="extras">
                        <button onClick={() => this.setState(
                            { isVisibleExtra: !this.state.isVisibleExtra}
                            
                            )}> 
                            
                            Show more messages (7) {this.state.isVisibleExtra ? <img src={Up} /> : <img src={Down} /> }
                        </button>
                    </div>

                    <hr/>

                    { this.state.isVisibleExtra ? (

                        <div className="boxItem">
                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 1
                                            </div>
                                            <div className="itemInfo">
                                                <span>Student</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>

                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 3
                                            </div>
                                            <div className="itemInfo">
                                                <span>Customer Manager</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>

                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 4
                                            </div>
                                            <div className="itemInfo">
                                                <span>Student</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>

                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 5
                                            </div>
                                            <div className="itemInfo">
                                                <span>Customer Manager</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>

                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 6
                                            </div>
                                            <div className="itemInfo">
                                                <span>Student</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>

                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 7
                                            </div>
                                            <div className="itemInfo">
                                                <span>Customer Manager</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>                                  


                        ) : null 

                    }   
                    <div className="boxItem">
                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 8
                                            </div>
                                            <div className="itemInfo">
                                                <span>Customer Manager</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:26 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        
                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 9
                                            </div>
                                            <div className="itemInfo">
                                                <span>Student</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        
                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 10
                                            </div>
                                            <div className="itemInfo">
                                                <span>Customer Manager</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        
                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 11
                                            </div>
                                            <div className="itemInfo">
                                                <span>Student</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        
                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 12
                                            </div>
                                            <div className="itemInfo">
                                                <span>Customer Manager</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                    
                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 13
                                            </div>
                                            <div className="itemInfo">
                                                <span>Student</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                    
                            <div className="infos">
                                <div className="avatar">
                                    <img src={IconAvatar} alt=""/>
                                </div>
                                <div className="boxWhite">
                                    <div className="textBox">
                                        <div className="infoPerfil">
                                            <div className="itemInfo">
                                                TESTE 14
                                            </div>
                                            <div className="itemInfo">
                                                <span>Customer Manager</span>
                                            </div>
                                            <div className="itemInfo">
                                                18 July 2018 - 09:21 am
                                            </div>                                                    
                                        </div>
                                        <div className="message">
                                            <p>Lorem ipsum turpis aliquam suscipit dui faucibus blandit hac, condimentum malesuada interdum curae ipsum cubilia, ad laoreet hendrerit leo risus bibendum. mattis faucibus volutpat quam semper ultricies vitae ullamcorper pellentesque, venenatis vitae quis dictum eleifend commodo, amet augue faucibus lacus nam mattis.</p>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>      
                        {/* :
                        <div></div> */}

                        <div className="notes">
                            <div className="ticketCancelled">
                                <h4>
                                    Your ticket has been cancelled!
                                </h4>
                                <span>18 July 2018 - 09:21 am</span>
                            </div> 
                        </div>                        
                        
                        <hr/>    
                    
                        <div className="boxType send">
                            <div className="avatar">
                                <img src={IconAvatar} alt=""/>
                            </div>
                            <form>
                                <div className="typeMessage">
                                    <textarea className="input-lingo" placeholder="Type a message..."></textarea>                                            
                                </div>
                                <div className="enter">
                                    <img src={Enter} alt=""/>
                                </div>
                            </form>
                        </div>
                </div>
                </div>
            </Ticket>
 
        );

    }
}

Tickets.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default Tickets;

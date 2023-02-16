import React, { Component } from 'react';
import Responsive from 'react-responsive-decorator';
import IconTitle from '../../../images/icons/schedule.svg';

import { Filter } from './styles';
 
class Filters extends Component {
    constructor() {
        super();
        this.state = {  
            isVisible: true,       
            isMobile: false,
            isVisibleExtra: false
        };
    }
   

    componentDidMount() {
        this.props.media({ minWidth: 320 }, () => {
          this.setState({
            isVisible: true,
            isMobile: false,
            isVisibleExtra: false
          });
        });
     
        this.props.media({ maxWidth: 1024 }, () => {
          this.setState({
            isVisible: false,
            isMobile: true,
            isVisibleExtra: true
          });
        });
      }
 
  render() {

    const { isMobile } = this.state;
    return (

        <Filter>

            <div className="filterTop">
                <h2><img src={IconTitle} alt=""/> Filters</h2>

               
                {
                    isMobile ? 
                    <button onClick={() => this.setState({isVisible: !this.state.isVisible})}>Add Filter</button>: 
                    <button>v\sv</button>
                    
                }
               
                </div>

                { this.state.isVisible ? 
                     
                    <div className="filter">               

                        <div className="firstItems">
                            <div className="items">
                                <label>Schedules</label>
                                <button className="active">All</button>
                            </div>

                            <div className="items">
                                <label>All</label>
                                <button>Only mine</button>
                            </div>
                        </div>

                        <div className="items">
                            <label>Day</label>
                            <select>
                                <option>Select</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                            </select>
                        </div>

                        <div className="items">
                            <label>Time</label>
                            <select>
                                <option>Select</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                            </select>
                        </div>

                        <div className="items">
                            <label>Language</label>
                            <select>
                                <option>All</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                            </select>
                        </div>

                        <div className="items">
                            <label>Teacher</label>
                            <select>
                                <option>All</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                            </select>
                        </div>

                        <div className="items">
                            <label>Student</label>
                            <select>
                                <option>All</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                            </select>
                        </div>

                        <hr/>
                        { this.state.isVisibleExtra ? (
                        <div class="boxExtras">
                           
                                <div className="items">
                                    <label>Type</label>
                                    <select>
                                        <option>All</option>
                                        <option value="domingo">Domingo</option>
                                        <option value="domingo">Domingo</option>
                                        <option value="domingo">Domingo</option>
                                        <option value="domingo">Domingo</option>
                                        <option value="domingo">Domingo</option>
                                        <option value="domingo">Domingo</option>
                                        <option value="domingo">Domingo</option>
                                    </select>
                                </div>

                                <div className="items">
                            <label>Course</label>
                            <select>
                                <option>All</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                            </select>
                        </div>

                                <div className="items">
                            <label>Status</label>
                            <select>
                                <option>All</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                                <option value="domingo">Domingo</option>
                            </select>
                        </div>

                        </div>
                         ) : null }
                        
                        <div className="filtersBottom">
                            <div className="items">
                                <div className="extras">
                                    <a href="#" onClick={() => this.setState({isVisibleExtra: !this.state.isVisibleExtra})}>Hide extras</a>
                                </div>
                                <div className="buttons">
                                    <button type="reset">Clear filters</button>
                                    <button className="active">Filter</button>
                                </div>
                            </div>
                        </div>
                         
                    </div>:
                    <div></div>
                }
        </Filter>
    );
  }
}

export default Responsive (Filters);


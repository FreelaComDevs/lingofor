import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from "react-router";
import Rating from 'react-rating';
import { connect } from 'react-redux'
import { getTeacher } from '../../actions/teacherActions'

import iconFlag from '../../images/icons/flag_us@2x.png'

import { ExcepTabs } from './Styles'

class tabExcep extends Component {
    render() {
     
        return (

            <ExcepTabs>
                
                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items top">
                            <div className="title"><span>Name</span></div>   
                            <div className="title"><span>Country</span></div> 
                            <div className="title"><span>Level</span></div> 
                            <div className="title"><span>Comment</span></div>  
                        </div>
                    </div>
                </div>

                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items">
                            <div className="title">Alisha Patel</div>   
                            <div className="title">Madagascar</div> 
                            <div className="title">B1</div> 
                            <div className="title">I didn’t like his teaching style very much</div>  
                        </div>
                    </div>
                </div>

                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items">
                            <div className="title">Alisha Patel</div>   
                            <div className="title">Madagascar</div> 
                            <div className="title">B1</div> 
                            <div className="title">I didn’t like his teaching style very much</div>  
                        </div>
                    </div>
                </div>

                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items">
                            <div className="title">Alisha Patel</div>   
                            <div className="title">Madagascar</div> 
                            <div className="title">B1</div> 
                            <div className="title">I didn’t like his teaching style very much</div>  
                        </div>
                    </div>
                </div>

                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items">
                            <div className="title">Alisha Patel</div>   
                            <div className="title">Madagascar</div> 
                            <div className="title">B1</div> 
                            <div className="title">I didn’t like his teaching style very much</div>  
                        </div>
                    </div>
                </div>
            
                
            </ExcepTabs>
        )
    }
}


export default tabExcep
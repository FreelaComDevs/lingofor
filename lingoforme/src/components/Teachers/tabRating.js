import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { withRouter } from "react-router";
import Rating from 'react-rating';
import { connect } from 'react-redux'
import { getTeacher } from '../../actions/teacherActions'

import iconFlag from '../../images/icons/flag_us@2x.png'

import { RatingTabs } from './Styles'

class tabRating extends Component {
    render() {
     
        return (

            <RatingTabs>
                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items">
                            <div className="title">20/07/2018 • Friday • 10:00 am - 10:30 am</div>   
                            <div className="infoStudent">
                                <img src={iconFlag} alt="" />
                                English   
                                Student: Alisha Patel • Brazil 
                            </div> 
                        </div>
                        <div className="items">
                            <div className="title">Internet</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Methodology</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Professor</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Comment</div> 
                            <div>
                                <p>Class was excellent! I feel like I’m ready to travel do the US right now!</p>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items">
                            <div className="title">20/07/2018 • Friday • 10:00 am - 10:30 am</div>   
                            <div className="infoStudent">
                                <img src={iconFlag} alt="" />
                                English   
                                Student: Alisha Patel • Brazil 
                            </div> 
                        </div>
                        <div className="items">
                            <div className="title">Internet</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Methodology</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Professor</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Comment</div> 
                            <div>
                                <p>Class was excellent! I feel like I’m ready to travel do the US right now!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items">
                            <div className="title">20/07/2018 • Friday • 10:00 am - 10:30 am</div>   
                            <div className="infoStudent">
                                <img src={iconFlag} alt="" />
                                English   
                                Student: Alisha Patel • Brazil 
                            </div> 
                        </div>
                        <div className="items">
                            <div className="title">Internet</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Methodology</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Professor</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Comment</div> 
                            <div>
                                <p>Class was excellent! I feel like I’m ready to travel do the US right now!</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bigBox">
                    <div className="boxInfo">
                        <div className="items">
                            <div className="title">20/07/2018 • Friday • 10:00 am - 10:30 am</div>   
                            <div className="infoStudent">
                                <img src={iconFlag} alt="" />
                                English   
                                Student: Alisha Patel • Brazil 
                            </div> 
                        </div>
                        <div className="items">
                            <div className="title">Internet</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Methodology</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Professor</div> 
                            <div className="stars startList">
                                <span className="number">4.5</span> 
                                <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" fractions={2} />
                            </div>
                        </div>
                        <div className="items">
                            <div className="title">Comment</div> 
                            <div>
                                <p>Class was excellent! I feel like I’m ready to travel do the US right now!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </RatingTabs>
        )
    }
}


export default tabRating
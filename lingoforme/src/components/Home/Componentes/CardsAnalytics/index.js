import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import moment from 'moment';
import Services from '../../../_api/Services'
import util from './util'

import FlagIcon from 'react-flag-kit/lib/FlagIcon'
import Loading from 'react-fullscreen-loading'
import Rating from 'react-rating'
import { Cards } from './styles'
import Analytics from '../../../../images/icons/icon_analytics.svg'
import Flag from '../../../../images/icons/flag_us@2x.png'


class CardsAnalytics extends Component {

    constructor (props) {
        super(props)
        this.service = new Services();

        const months = util.getMonths();
        const years = util.getYearsByYearInterval(5);
        const today = new Date();
        this.state = {         
            loading: false,
            classes: {},
            newStudents: [],
            demoClass: {},
            demoClassPercentualConverted: 0,
            cancellations: 0,
            teachers: {
                averageRating: [{rating: 5}],
                highest: [],
                lowest: [],
                ratingCriterias: []
            },
            students: {},
            shouldShowTeachersFilter: false,
            teacherFilterCriteria: {
                id: 1,
                nameEnglish: 'Teacher'
            },
            shouldShowClassesFilter: false,
            classesFilterCriteria: {
                year: today.getUTCFullYear(),
                month: moment(today).format('MMMM')//today.getUTCMonth()
               // month: today.getUTCMonth()
            },
            months,
            years
        }    

        this.fetchStatistics = this.fetchStatistics.bind(this);
        
    }

    componentDidMount() {
       

        this.fetchStatistics();
    }

    fetchStatistics (filter = 'ratingCriteriaId=1', box = '') {
        this.setState({ loading: true });
        //this.service.ApiGet(`dashboards?${filter}`).then(res => {
         this.service.ApiGet(`dashboards?${filter}`).then(res => {
            const resp = res.result.items[0];
            const newStudents = util.getNewStudents(resp.newStudents);
            const newState = {
                loading: false,
                newStudents,
                classes: resp.classes,
                demoClass: resp.demoClass,
                demoClassPercentualConverted: resp.demoClass.classes > 0 ? Math.round(resp.demoClass.converted / resp.demoClass.classes * 100): 0,
                students: resp.students,
                cancellations: resp.cancellations,
                teachers: resp.teachers
            };

            if (box === 'classes') {
                this.setState({ classes: newState.classes, loading: false });
                return;
            }

            if (box === 'teachers') {
                this.setState({ teachers: newState.teachers, loading: false });
                return;
            }

            this.setState(newState);

        }).catch(err => {
            console.log('Failed to get dashboard stats.', err);
            this.setState({ loading: false });
        });
    }

    showTeachersFilter = () => {
        this.setState({ shouldShowTeachersFilter: true });
    }

    setTeacherFilterCriteria = e => {
        const criteria = JSON.parse(e.target.name);
        this.setState({ teacherFilterCriteria: criteria });
    }

    applyTeacherFilter = () => {
        const id = this.state.teacherFilterCriteria.id;
        if (id > 0) {
            this.fetchStatistics(`ratingCriteriaId=${id}`, 'teachers');
            this.setState({ shouldShowTeachersFilter: false });
        }
    }

    clearTeacherFilterCriteria = () => {
        //const {teacherFilterCriteria} = this.state
        this.setState({
            teacherFilterCriteria: {
                id: 1,
                nameEnglish: 'Teacher'
            },
            shouldShowTeachersFilter: false
           
        });
        this.fetchStatistics(`ratingCriteriaId=1`);
        //this.fetchStatistics(`ratingCriteriaId=${teacherFilterCriteria.id}`);
    }

    showClassesFilter = () => {
        this.setState({ shouldShowClassesFilter: true });
    }

    handleChangeClassesFilterCriteria = e => {
        const classesFilterCriteria = {
            ...this.state.classesFilterCriteria,
            [e.target.name]: e.target.value
        };
        this.setState({ classesFilterCriteria });
    }

    applyClassesFilter = () => {
        const criteria = this.state.classesFilterCriteria;
        const month = parseInt(criteria.month) + 1;
        const filter = `year=${criteria.year}&month=${month}`;
        this.fetchStatistics(filter, 'classes')
        this.setState({ shouldShowClassesFilter: false });
    }

    clearClassesFilterCriteria = () => {
        const today = new Date();
        this.setState({
            classesFilterCriteria: {
                year: today.getUTCFullYear(),
                month: today.getUTCMonth()
            },
            shouldShowClassesFilter: false
        });
        this.fetchStatistics();
    }
    render() {
        const { classes, newStudents, demoClass, demoClassPercentualConverted, cancellations, students, teachers } = this.state;
        const currentMonth = moment().format('MMMM');
        return (<div>
            <Cards>
                <div className="container">
                    <div className="title">
                        <h2><img src={Analytics} alt="Analytics"/>Analytics</h2>
                    </div>

                    {this.state.loading && <Loading loading={true} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>}

                    <div className="box">
                        {this.state.shouldShowTeachersFilter && <div className="boxAnalytics">
                            <h3 className="text-center">Filter</h3>
                            <div className="container space-around">
                                <div className="criterias">
                                    <ul>
                                        {teachers.ratingCriterias.map(item => {
                                            return item.active &&
                                                <li key={item.id}>
                                                    <button
                                                        onClick={this.setTeacherFilterCriteria}
                                                        name={JSON.stringify(item)}
                                                        className={item.id == this.state.teacherFilterCriteria.id ? 'auto active' : 'auto'}
                                                        type="button"
                                                    >
                                                        {item.nameEnglish}
                                                    </button>
                                                </li>
                                        })}
                                    </ul>
                                </div>
                                <div className="filter buttons">
                                    <button onClick={this.clearTeacherFilterCriteria} type="button">Cancel</button>
                                    <button onClick={this.applyTeacherFilter} type="button" className="primary">Filter</button>
                                </div>
                            </div>
                        </div>}

                        {! this.state.shouldShowTeachersFilter && <div className="boxAnalytics">
                            <div className="items">
                                <div className="rating">
                                    <h3>Teachers</h3>
                                    <p>Overall average rating</p>
                                    <div className="stars startList">
                                        <span className="grades">{teachers.averageRating[0].rating}</span>
                                        <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" readonly initialRating={Number(teachers.averageRating[0].rating)} />
                                    </div>
                                </div>
                                <div className="filter">
                                    <button onClick={this.showTeachersFilter}><i className="fa fa-filter" aria-hidden="true"></i>Filter</button>
                                    <span>{this.state.teacherFilterCriteria.nameEnglish}</span>
                                </div>
                            </div>

                            <div className="items">
                                <div className="listBest">
                                    <div>
                                        <h4>Best rated teachers</h4>
                                    </div>
                                    {teachers.highest.map((high, index) => {
                                        return (
                                            <div key={JSON.stringify(high)} className="startList">
                                                    <Rating emptySymbol="fa fa-star fa-2x" fullSymbol="fa fa-star fa-2x" readonly fractions={2} stop={1} />
                                                    <span className="grades">{high.rating}</span>  
                                                    <h4>{high.teacher}</h4>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="listBest">
                                    <div>
                                        <h4>Lowest rated teachers</h4>
                                    </div>
                                    {teachers.lowest.map((item, index) => {
                                        return (
                                            <div key={JSON.stringify(item)} className="startList">
                                                    <Rating emptySymbol="fa fa-star-o fa-2x" fullSymbol="fa fa-star fa-2x" readonly fractions={2} stop={1} />
                                                    <span className="grades">{item.rating}</span>
                                                    <h4>{item.teacher}</h4>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>}

                        {this.state.shouldShowClassesFilter && <div className="boxAnalytics">
                            <h3 className="text-center">Filter</h3>
                            <div className="container space-around">
                                <div className="criterias">
                                    <select
                                        name="month"
                                        className="filter"
                                        onChange={this.handleChangeClassesFilterCriteria}
                                        style={{width: '150px', marginRight: '10px'}}
                                        value={this.state.classesFilterCriteria.month}
                                    >
                                        <option value="">Month</option>
                                        {this.state.months.map(item => {
                                            return <option key={item} value={item}>{moment().set({month: item}).format('MMMM')}</option>
                                        })}
                                    </select>

                                    <select
                                        name="year"
                                        className="filter"
                                        onChange={this.handleChangeClassesFilterCriteria}
                                        value={this.state.classesFilterCriteria.year}
                                    >
                                        <option value="">Year</option>
                                        {this.state.years.map(item => {
                                            return <option key={item} value={item}>{item}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="filter buttons">
                                    <button onClick={this.clearClassesFilterCriteria} type="button">Cancel</button>
                                    <button onClick={this.applyClassesFilter} type="button" className="primary">Filter</button>
                                </div>
                            </div>
                        </div>}

                        {! this.state.shouldShowClassesFilter && <div className="boxAnalytics">
                            <div>
                                <div className="items">
                                    <div className="rating">
                                        <h3>Classes</h3>
                                        <p>{moment().set({ month: this.state.classesFilterCriteria.month}).format('MMMM')}</p>
                                    </div>
                                    <div className="filter">
                                        <button onClick={this.showClassesFilter} type="button">
                                            <i className="fa fa-filter" aria-hidden="true"></i>Filter
                                        </button>
                                    </div>
                                </div>

                                <div className="items">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Regular</td> 
                                                <td>{classes.regular}</td>
                                            </tr>
                                            <tr>
                                                <td>Demo</td>
                                                <td>{classes.demo}</td>                                              
                                            </tr>
                                            <tr>
                                                <td>Cancelled</td> 
                                                <td>{classes.canceled}</td>
                                            </tr>
                                            <tr>
                                                <td>No show</td>
                                                <td>{classes.noShow}</td>                                              
                                            </tr>
                                            <tr>
                                                <td>Cancelled by Lingo</td>
                                                <td>{classes.canceledByLingo}</td>                                              
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>}

                        <div className="boxAnalytics">
                            <div className="items">
                                <div className="rating">
                                    <h3>New students</h3>
                                    <p>{currentMonth}</p>
                                </div>
                                
                            </div>

                            <div className="items">
                                <table>
                                    <tbody>
                                        {newStudents.map((item, idx) => {
                                          return <tr key={JSON.stringify(item)}>
                                            <td>{item[0]}</td> 
                                            <td>{idx === 0 ? (<FlagIcon code={item[1]} number={'22px'}/>) : item[1]}</td>
                                            <td>{idx === 0 ? (<FlagIcon code={item[2]} number={'22px'}/>) : item[2]}</td>
                                            <td>{idx === 0 ? (<FlagIcon code={item[3]} number={'22px'}/>) : item[3]}</td>
                                            <td className={idx === 0 ? 'total' : ''}>{item[4]}</td> 
                                          </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="boxCards">
                        <div className="cards">
                            <div className="items">
                                <h4>Students</h4>
                                <small>Total</small>
                            </div>
                            
                            <div className="items">
                                <span>{students.studentsActive}</span>
                                <small>Active</small>
                            </div>
                            <div className="items">
                                <span>{students.studentsInactive}</span>
                                <small>Inactive</small>
                            </div>                                
                        </div>
                        <div className="cards">
                            <div className="items">
                                <h4>Cancellations</h4>
                                <small>{currentMonth}</small>
                            </div>
                            
                            <div className="items">
                                <span>{cancellations}</span>
                            </div>                              
                        </div>
                        <div className="cards">
                            <div className="items">
                                <h4>Demo Class</h4>
                                <small>Total</small>
                            </div>
                            
                            <div className="items">
                                <span>{demoClass.classes}</span>
                                <small>classes</small>
                            </div>
                            <div className="items">
                                <span>{demoClass.converted}</span>
                                <small>converted</small>
                            </div>
                            <div className="items">
                                <span><strong>{demoClassPercentualConverted}%</strong></span>
                                <small>rate</small>
                            </div>                                
                        </div>
                    </div>
                </div>
            </Cards>
        </div>);
    }
}

export default CardsAnalytics;
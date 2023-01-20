import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import Loading from 'react-fullscreen-loading';
import { FilterUser, TableUser } from '../PlansAndPrices/styles';
import Placeholder from '../_common/placeholder/placeholderByPage';
import classNames from 'classnames';
import AuthService from '../_api/AuthService';
import Services from '../_api/Services';
import { translate } from 'react-i18next';
import Engrenagem from '../../images/icons/icon_coordinator_header.svg';
import CoordinatorsList from './items';
import CoordinatorsFilter from './filter';


class Coordinators extends Component {
    constructor (props) {
        super(props)
    
        this.auth = new AuthService()
        this.i18n = this.props.i18n
        this.t = this.props.t
        this.service = new Services()

        let userProfile = this.service.getProfile()
        this.state = {
            userId: userProfile.id,
            role: userProfile.role,
            items: [],
            responsibleLanguages: [],
            countries: [],
            name: '',
            login: '',
            countryId: 0,
            lingoLanguages: [],
            active: null,
            loading: false,
            success: false
        }

        this.fetchCoordinators = this.fetchCoordinators.bind(this)
    }

    componentWillMount () {
        let userProfile = this.service.getProfile()
        
        if(userProfile.role === 'companyManager') {
            this.fetchCountries();
            this.fetchLingoLanguages();
            this.fetchCoordinators({
                take: null,
                skip: null,
                name: null,
                countryId: null,
                status: null,
                nativeLanguageId: null,
                otherLanguageId: null,
                responsibleLanguageId: null
            });
        }
    }

    fetchCoordinators (filter) {
        this.setState({ loading: true})
        this.service.ApiPosts('coordinators/search', filter)
        .then(res => {
            this.setState({
                items: res.data.result.items,
                loading: false
            })
        })
        .catch(err => {
            console.error('ERRO POST COORDINATORS ', err);
            this.setState({
                loading: false
            })
        })
    }

    fetchCountries () {
        this.service.get('countries/getall')
        .then(res => {
            const countries = res.result.items;
            this.setState({
                countries,
                countryId: countries[0] 
            })
        })
        .catch(err => {
            console.error('Failed getting countries for filter coordinators ', err);
        })
    }

    fetchLingoLanguages () {
        this.service.get('lingolanguages/getall')
        .then(res => {
            this.setState({
                lingoLanguages: res.result.items
            })
        })
        .catch(err => {
            console.error('Failed getting lingo languages for coordinators ', err);
        })
    }

    render() {
        const {classes} = this.props;
        
        return (           
            <div className='view'>
                <SideMenu />

                <section>
                    <Header/>
                    <div className="toptitle">      
                        <img src={Engrenagem} alt="Engrenagem" />    
                        <h1>{this.t('COORDINATOR')}</h1>                            
                    </div>
                    
                    <FilterUser>
                        <div className='button'>
                            <Link to={{ pathname: '/coordinator/new' }}>
                                <button style={{width: '215px'}}>
                                    <i className='fa fa-plus' aria-hidden='true' /> {this.t('ADD_NEW')} {this.t('COORDINATOR')}
                                </button>
                            </Link>
                        </div>
                        <div className='container'>
                            <CoordinatorsFilter
                                countries={this.state.countries}
                                lingoLanguages={this.state.lingoLanguages}
                                fetchCoordinators={this.fetchCoordinators}
                            />
                        </div>
                    </FilterUser>

                    { this.state.loading && <Loading loading={this.state.loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/> }

                    {
                        ! this.state.loading && this.state.items.length > 0 && (<CoordinatorsList items={this.state.items} />)
                    }
                    {
                        ! this.state.loading && this.state.items.length === 0 &&
                        <div style={{paddingTop: '50px'}}><Placeholder pageName='users' textMsg='Nothing here yet' /></div>
                    }
                </section>
            </div>
        );
    }
}

Coordinators.propTypes = {
    t: PropTypes.func,
    i18n: PropTypes.object
}
  
 export default translate('translations')(Coordinators)

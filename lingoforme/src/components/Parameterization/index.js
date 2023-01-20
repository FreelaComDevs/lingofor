import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { translate } from "react-i18next";
import Loading from 'react-fullscreen-loading'
import Header from '../_common/header/Header'
import SideMenu from '../_common/SideMenu/SideMenu'
import { Prices } from './styles';
import Services from '../_api/Services'
import { stringify } from 'postcss';
import Engrenagem from '../../images/icons/icon_settings_header.svg'

const  service = new Services()
class Parameterization extends Component {

    constructor (props) {
        super(props)

        this.t = this.props.t    
        this.state = { 
            parameters: [],
            loading: 0
        }
    }

    componentDidMount(){
        this.getParameters()
    }

    getParameters = () => {
        this.setState({loading: this.state.loading+1})
        service.get('parameters')
            .then(res => {
                let parameters = res.result.items
                parameters.sort( (itemA, itemB) => itemA.id - itemB.id).map( item => { return { ...item, hasChange: false }})
                this.setState({parameters, loading:  this.state.loading-1})
            })
            .catch( res=>{ this.setState({loading:  this.state.loading-1}); console.log(res)})
    }

    inputChange = (e, index) => {
        const { value, name } = e.target
        const { parameters } = this.state
        parameters[index].hasChange = true
        parameters[index][name] = value
        this.setState({parameters})
    }

    sendParameterChange = async (e) => {
        e.preventDefault()
        const parametersToChange = this.state.parameters.filter(item => item.hasChange)
        parametersToChange.map( item => {
            this.setState({loading: this.state.loading+1})
            const { id, parameterValue } = item
            console.log(`parameters/${id}`, { parameterValue: parameterValue })
            service.ApiPut(`parameters/${id}`, { parameterValue })
                .then(res => {
                    let parameters = res.result.items
                    parameters.sort(item => item.id).map( item => { return { ...item, hasChange: false }})
                    this.getParameters()
                    this.setState({ loading:  this.state.loading-1})
                })
                .catch( res=>{ this.setState({loading:  this.state.loading-1}); console.log(res)})
        })
    }

    render() {
        const { inputChange, sendParameterChange, state: { parameters, loading } } = this
        return (
            <div className="view">
                <Loading loading={loading > 0} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>
                <SideMenu/>                  
                <section>
                    <Header/>   

                    <div className="toptitle">
                        <img src={Engrenagem} alt="Parameters"/>      
                        <h1>Parameters</h1>                   
                    </div>


                    <Prices>
                        <div className="container">
                            <div className="bigBox">
                                <div className="parameters">
                                        { parameters.length > 0 && parameters.map( (item, index) => (
                                            <div key={`parameter${index}`}className="items">
                                             <div className="inputs">
                                                    <label htmlFor={`key${index}`}>{this.props.t("KEY")}</label>
                                                    <input value={item.parameterName} disabled name="parameterName" id={`key${index}`}/>
                                                </div>
                                                <div className="inputs">
                                                    <label htmlFor={`description${index}`}>{this.props.t("DESCRIPTION")}</label>
                                                    <input value={item.parameterDescription} disabled name="parameterDescription" id={`description${index}`}/>
                                                </div>
                                                <div className="inputs">
                                                    <label htmlFor={`value${index}`}>{this.props.t("VALUE")}</label>
                                                    <input value={item.parameterValue} name="parameterValue" id={`value${index}`} onChange={ (e) => inputChange(e, index) }/>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="buttons">
                                <button  onClick={(e) => this.props.history.goBack()} ><i class="fa fa-angle-left" aria-hidden="true"></i> Back</button>
                                <button onClick={ (e) => sendParameterChange(e) }>Save</button>
                            </div>
                        </div>
                    </Prices>
                </section>
           </div>
        );
    }
}

export default withRouter(translate("translations")(Parameterization))

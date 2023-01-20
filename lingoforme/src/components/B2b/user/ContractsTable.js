import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { translate } from 'react-i18next';
import { Contracts } from './styles'
import Contract from '../../../images/icons/icon_contract.svg'
import ContractService from './service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsCreators from '../contracts/actions';
import util from './util';


class ContractsTable extends Component {

    constructor (props) {
        super(props)
        this.service = new ContractService();
        this.state = {
            contracts: [],
        }    
    }

    componentDidMount () {    
        this.service.fetchContracts(this.service.getEmptyContractFilter(), items => {
            let totalStudents = 0
            let contracts = []
            items.map(company => {
                if(company.contracts){
                    company.contracts.map(contract => {
                        totalStudents += contract.contractStudents ? contract.contractStudents.length: 0
                        contracts.push(contract)
                    })
                }
            })
            this.setState({
              totalStudents,
              contracts: util.sortArrayByEndDateDesc(contracts)
            });

            //Set Company Name on header page
            if(items && items.length > 0){
                this.props.setParentState({ 'fantasyName': items[0].fantasyName});
            }
        });
    }

    handleViewContract = item => {
        this.props.actions.setContract(item);
        this.props.history.push(`/contract/${item.id}`)
    }

    render() {
        const { t } = this.props;
        return (
            <Contracts>
                <div className="container">
                    <div className="title">
                        <h2><img src={Contract} alt="Contract"/>{t('ITEM_CONTRACTS')}</h2>
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

                            {this.state.contracts.map(contract => (
                              <div key={JSON.stringify(contract)} className="bigBox">                                    
                                  <div className="boxItem">
                                      <div className="item">
                                          <div className="itensBox">
                                              <h3>Contract number</h3>
                                              <span className="red">#{contract.code}</span>
                                          </div>
                                          <div className="itensBox">
                                              <h3>Description</h3>
                                              <span className="red">{contract.description}</span>
                                          </div>
                                          <div className="itensBox">
                                              <h3>Students</h3>
                                              <span className="red">{contract.contractStudents.length}</span>
                                          </div>
                                          <div className="itensBox">
                                              <h3>Expires on</h3>
                                              <span className="red">{contract.endDate}</span>
                                          </div>
                                          <div className="itensBox">
                                              <button type="button" onClick={() => { this.handleViewContract(contract) }}>View <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                          </div>
                                      </div>                                    
                                  </div> 
                              </div>
                            ))}

                            <div className="buttons">
                                <Link to="/contracts">
                                  <button>View all <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                </Link>
                            </div>
                                    
                        </div>
                                
                        <div className="boxs">                          
                          <div>
                              <div className="boxSmall">
                                  <h3>Students</h3>
                                  <span>{this.state.totalStudents}</span>
                              </div>
                              <div className="boxSmall">
                                  <h3>Contracts</h3>
                                  <span>{this.state.contracts.length}</span>
                              </div>
                          </div>                             
                        </div>

                    </div>
                </div>
            </Contracts>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions : bindActionCreators(actionsCreators, dispatch)
});

export default withRouter(connect(null, mapDispatchToProps)(translate('translations')(ContractsTable)))

import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ContractTab extends Component {

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render () {
        let className = 'tab-list-item';
        const { activeTab, label, disabled } = this.props;
        if (activeTab === label) {
            className += ' tab-list-active';
        }
        if (disabled) {
            className += ' disabled';
        }

        return (
            <li className={className} onClick={this.onClick}>
                {label}
            </li>
        );
    }
}

export class ContractTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeTab: this.props.children[0].props.label,
        };
    }
    
    onClickTabItem = tab => {
        this.setState({ activeTab: tab });
    }

    render () {
      const { id } = this.props.contract;
        return (
            <div className="contratcs">
                <div className="tabs">
                    <ol className="tab-list">
                        <div className="tabsContent">
                            {this.props.children.map(child => {
                                const { label } = child.props;
                                const tabDisabled = false;
                                if (label === 'Students' && !id) {
                                    return (
                                        <ContractTab disabled={true} activeTab={this.state.activeTab} key={label} label={label} onClick={this.onClickTabItem} />
                                    )
                                }
                                return (
                                    <ContractTab activeTab={this.state.activeTab} key={label} label={label} onClick={this.onClickTabItem} />
                                );
                            })}
                        </div>
                    </ol>
                    <div className="tab-content">
                        {this.props.children.map(child => {
                            if (child.props.label !== this.state.activeTab) {
                                return undefined;
                            }
                            return child.props.children;
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    contract: state.contracts.contract
  };
};

export default connect(mapStateToProps)(ContractTabs)

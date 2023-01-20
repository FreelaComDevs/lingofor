import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';


class ContractTitle extends Component {

    render () {
        const { code, economicGroup } = this.props.contract;
        return (
            <div style={{height:'55px'}}>
                {code && economicGroup && (
                    <h3>{this.props.t('CONTRACT')} #{code} • {economicGroup.name}</h3>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      contract: state.contracts.contract
    };
};

export default connect(mapStateToProps)(translate('translations')(ContractTitle))
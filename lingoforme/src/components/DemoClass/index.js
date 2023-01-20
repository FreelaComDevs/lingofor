import React, { Component } from 'react'
import { translate } from 'react-i18next';
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import { getDemoClasses, getDemoClass, unsetDemoClass, unsetDemoClassError } from '../../actions/demoClassActions'
import Loading from 'react-fullscreen-loading'
import SideMenu from '../_common/SideMenu/SideMenu'
import Header from '../_common/header/NewHeader'
import classIcon from '../../images/icons/icon_democlasses_header.svg'
import DemoClasses from './DemoClasses';
import DemoClass from './DemoClass';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DemoClassIndex extends Component {

	componentDidMount () {
		//this.props.getDemoClasses()
		this.props.match.params.id && this.props.getDemoClass(this.props.match.params.id)

	}

	componentWillUnmount() {
		this.props.unsetDemoClass()
		this.props.unsetDemoClassError()
	}

  render () {
		const { t, demoClasses: { demoClass, loading, error } } = this.props

		return (
			<div className='view new-view'>
        <SideMenu />
				<Header title={t("DEMO_CLASS")} icon={classIcon} />
          <Switch>
            <Route path="/demo-class" exact component={DemoClasses} />
						<Route path="/demo-class/new" exact component={DemoClass} />
						{ demoClass && <Route path="/demo-class/:id" exact component={DemoClass} /> }
          </Switch>
        <Loading loading={loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>
				<Dialog
					id="dialog-error"
					open={!!error}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.props.unsetDemoClassError}
					className="boxModal"
				>
					<DialogTitle id="dialog-error-title">
						{t('INVALID_FORM_TITLE')}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="dialog-error-message">
							{ error }
						</DialogContentText>
					</DialogContent>
					<DialogActions className="boxModal">
						<Button onClick={this.props.unsetDemoClassError} color="primary">
							OK
						</Button>
					</DialogActions>
				</Dialog>
      </div>
		)
	}
}

const mapStateToProps = ({ demoClasses }) => ({ demoClasses });
const mapDispatchToProps = dispatch => ({
  getDemoClasses: data => dispatch(getDemoClasses(data)),
  getDemoClass: data => dispatch(getDemoClass(data)),
  unsetDemoClass: data => dispatch(unsetDemoClass(data)),
  unsetDemoClassError: data => dispatch(unsetDemoClassError(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DemoClassIndex)))
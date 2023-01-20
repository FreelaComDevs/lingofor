import React, { Component } from 'react'
import { connect,  } from 'react-redux'
import { translate } from 'react-i18next';
import { getLingoNotifications, updateLingoNotification } from '../../actions/notificationActions'
import SideMenu from '../_common/SideMenu/SideMenu'
import Header from '../_common/header/NewHeader'
import Loading from 'react-fullscreen-loading'
import classIcon from '../../images/icons/icon_settings_header.svg'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Table from '../../elements/NewTableList';
import TableDataText from '../../elements/TableDataText';
import TableDataSwitch from '../../elements/TableDataSwitch';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NotificationsSettings extends Component {

	componentDidMount () {
		this.props.getLingoNotifications()
	}

	notificationsChange = ({name}, id) => {
    const notification = this.props.notifications.lingoNotifications.find( 
      notification => { return notification.id === Number(id) }
    )
    const { 
      sendToStudent, 
      sendToTeacher, 
      sendToCoordinator, 
      sendToCustomerService, 
      sendToCompanyManager, sendToB2B } = notification
    const submitObj = {
      id: Number(id),
      sendToStudent,
      sendToTeacher,
      sendToCoordinator,
      sendToCustomerService,
      sendToCompanyManager,
      sendToB2B
    }
    submitObj[name] = !submitObj[name]
    this.props.updateLingoNotification(submitObj)
	} 

  render () {
		const { props, notificationsChange } = this
		const { t, notifications: { lingoNotifications, loading, error }, unsetNotificationError } = props
    const itemKey = t("LANGUAGE_KEY_STRING")
    
    const listedNotifications = lingoNotifications.map( item => { 
      const module = item[`${itemKey}Module`]
      const notification = item[`${itemKey}NotificationName`]
      const { 
        id,
        sendToStudent, 
        sendToTeacher, 
        sendToCoordinator, 
        sendToCustomerService, 
        sendToCompanyManager, 
        sendToB2B 
      } = item
      return {
        id,
        module, 
        notification, 
        sendToStudent, 
        sendToTeacher, 
        sendToCoordinator, 
        sendToCustomerService, 
        sendToCompanyManager, 
        sendToB2B 
      }
    })

		return (
			<div className='view new-view notifications-view'>
        <SideMenu />
			  <Header title={t("NOTIFICATIONS")} icon={classIcon} />
        <Loading loading={loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db"/>
        <Table listedItems={listedNotifications}>
          <TableDataText label="module" name="module"/>
          <TableDataText label="notification" name="notification"/>
          <TableDataSwitch label="student" name="sendToStudent" inputChange={notificationsChange}/>
          <TableDataSwitch label="teacher" name="sendToTeacher" inputChange={notificationsChange}/>
          <TableDataSwitch label="CO" name="sendToCoordinator" inputChange={notificationsChange}/>
          <TableDataSwitch label="CS" name="sendToCustomerService" inputChange={notificationsChange}/>
          <TableDataSwitch label="CM" name="sendToCompanyManager" inputChange={notificationsChange}/>
          <TableDataSwitch label="B2B" name="sendToB2B" inputChange={notificationsChange}/>
        </Table>
				<Dialog
					id="dialog-error"
					open={!!error}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.props.unsetNotificationError}
				>
					<DialogTitle id="dialog-error-title">
            {t('INVALID_FORM_TITLE')}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="dialog-error-message">
							{ error }
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={unsetNotificationError} color="primary">
							OK
						</Button>
					</DialogActions>
				</Dialog>
      </div>
		)
	}
}

const mapStateToProps = ({ notifications }) => ({ notifications });
const mapDispatchToProps = dispatch => ({
  getLingoNotifications: data => dispatch(getLingoNotifications(data)),
  updateLingoNotification: data => dispatch(updateLingoNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(NotificationsSettings))

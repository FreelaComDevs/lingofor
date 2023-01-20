import React, { Component } from 'react'
import { translate } from "react-i18next"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const SwarmDialog = ({t, openSwarm, btnScheduleSubmit, alternativeTimes }) => (
  <Dialog open={openSwarm} onClose={alertAction} className="alert-dialog-slide">
    <DialogTitle className="alert-dialog-slide-title ">
    </DialogTitle>
    <DialogContent className="alert-dialog-slide-content">
    </DialogContent>
    <DialogActions className="alert-dialog-slide-actions">
      <button className="new-button" onClick={() => btnScheduleSubmit()} autoFocus>
        {t('ACCEPT_SEQUENCE')}
      </button>
    </DialogActions>
  </Dialog>  
)

export default translate("translations")(SwarmDialog);

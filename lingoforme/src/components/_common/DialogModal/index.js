import React, { Component } from 'react'
import { translate } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import './style.css';


class DialogModal extends Component {

    render() {
        const {
          t,
          onClose,
          opened,
          title,
          children,
          buttonLabel
        } = this.props;
        return (
            <Dialog
                open={opened || false}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="boxModal"
            >
                <DialogTitle className="title">{title || ''}</DialogTitle>
                <DialogContent className="boxModal">
                    {children}
                </DialogContent>
                <DialogActions>
                    <div className="single button boxModal">
                        <Button onClick={onClose || console.log} color="primary" autoFocus>
                            {buttonLabel || t('BTN_OK')}
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        )
    }
}

export default translate('translations')(DialogModal);

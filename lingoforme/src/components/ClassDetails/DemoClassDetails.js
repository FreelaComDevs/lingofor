import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { unsetDemoClassError, getDemoClass, unsetDemoClass, unsetDemoClassSuccess } from "../../actions/demoClassActions";
import Loading from "react-fullscreen-loading";
import SideMenu from "../_common/SideMenu/SideMenu";
import Header from "../_common/header/NewHeader";
import scheduleIcon from "../../images/icons/icon_schedule_header.svg";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DemoClassDetailsContent from "./DemoClassDetailsContent";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DemoClassDetails extends Component {

  componentDidMount() {
    this.props.getDemoClass(this.props.userClass.container.demoClassId);
  }

  componentWillUnmount() {
    this.props.unsetDemoClassSuccess()
    this.props.unsetDemoClassError()
    this.props.unsetDemoClass()
  }

  render() {
    const { t, userClass, demoClasses: { demoClass, loading, error } } = this.props;

    return (
      <div className="view new-view">
        <SideMenu />
        <Header title={t("SCHEDULE")} icon={scheduleIcon} />
        <Loading loading={loading} background="rgba(0,0,0,0.6)" loaderColor="#3498db" />
        {demoClass && ( <DemoClassDetailsContent userClass={userClass} demoClass={demoClass} /> )}
        <Dialog id="dialog-error" open={!!error} TransitionComponent={Transition} keepMounted onClose={this.props.unsetDemoClassError} >
          <DialogTitle id="dialog-error-title">{t('INVALID_FORM_TITLE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-error-message">
              {error}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.unsetDemoClassError} color="primary"> OK </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ demoClasses }) => ({ demoClasses });
const mapDispatchToProps = dispatch => ({
  getDemoClass: data => dispatch(getDemoClass(data)),
  unsetDemoClassError: data => dispatch(unsetDemoClassError(data)),
  unsetDemoClassSuccess: data => dispatch(unsetDemoClassSuccess(data)),
  unsetDemoClass: data => dispatch(unsetDemoClass(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate("translations")(DemoClassDetails)));

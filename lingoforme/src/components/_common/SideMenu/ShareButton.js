import IconLinkedIn from "../../../images/menu/btn_menu_linkedin.png";
import IconFacebook from "../../../images/menu/btn_menu_facebook.png";
import IconTwitter from "../../../images/menu/btn_menu_twitter.png";
import { SITE_URL } from "../../_api/environment";
import { translate } from "react-i18next";
import React, { Component } from "react";
import SocialButton from '../../_api/SocialButton'

class ShareButton extends Component {

  componentDidMount = () => {
    // Workaround para carregar SDK
    return <SocialButton />
  }

  facebookShare = () => {
    const { t } = this.props;
    window.FB && window.FB.ui &&
    window.FB.ui(
      {
        method: "share",
        quote: t("SOCIAL_MEDIA.SHARE"),
        href: SITE_URL
      } /* callback here */
    );
  };

  render() {
    const title = this.props.t("SOCIAL_MEDIA.SHARE");
    const { t } = this.props;
    return (
      <div className="share">
        <h2>{t("SHARE")}</h2>
        <span className="share-lingo">
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${SITE_URL}&title=${title}&summary=${title}&source=Lingo%20For%20Me`}
            target="_blank"
          >
            <img src={IconLinkedIn} alt="" />
          </a>
          <img
            style={{ cursor: "pointer" }}
            src={IconFacebook}
            alt=""
            onClick={this.facebookShare}
          />
          <a
            href={`http://twitter.com/share?text=${title}&url=${SITE_URL}`}
            target="_blank"
          >
            <img src={IconTwitter} alt="" />
          </a>
        </span>
      </div>
    );
  }
}

export default translate("translations")(ShareButton);

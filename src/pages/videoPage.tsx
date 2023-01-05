import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import Video from "../components/video";
import "./Home.css";
import { refreshOutline, informationCircleOutline } from "ionicons/icons";
const styles = {
  img1: {
    height: "30px",
    width: "30px",
    bottom: "11px",
    display: "inline-block",
    position: "absolute",
    right: "265px",
  },
  img2: {
    height: "30px",
    width: "30px",
    display: "inline-block",
    position: "Absolute",
    right: " 105px",
    bottom: "11px",
  },
  title: {
    position: "absolute",
    right: "130px",
    bottom: " 10px",
    display: "inline-block",
  },
  button: {
    right: "30px",
    position: " absolute",
    bottom: "4px",
  },
  toolbar:{
    display: " flex",
    justifyContent: "center",
  },
  text:{ left: "38px", position: "absolute", top: "12px" }
};

const VideoPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar
            color="light"
            className="ion-text-center"
            style={styles.toolbar}
          >
            <IonImg src="./images/om.png" style={styles.img1} />
            <IonTitle style={styles.title}>
              <b>Livekatha</b>
            </IonTitle>
            <IonImg src="./images/om.png" style={styles.img2} />
            <IonButton
              fill="clear"
              color="dark"
              onClick={refreshPage}
              style={styles.button}
            >
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <Video/>
          <IonModal isOpen={isOpen}>
            <IonHeader>
              <IonToolbar color="medium">
                <IonTitle>Disclaimer and Privacy Policy</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonText>
                <p>
                  <b>Livekatha App</b>
                </p>
                <p>
                  Livekatha , a part of the video, a video chapter, and a
                  song/track of a album video
                </p>

                <p>
                  <b>Term of Services</b>
                </p>
                <p>
                  The App is a YouTube iframe Client, uses YouTube iframe
                  Services, and it plays YouTube Videos only. By using the App,
                  you are agreeing to be bound by the YouTube Terms of Service (
                  <a
                    data-fr-linked="true"
                    href="https://www.youtube.com/t/terms"
                  >
                    https://www.youtube.com/t/terms
                  </a>
                  ), and Google Privacy Policy at{" "}
                  <a
                    data-fr-linked="true"
                    href="http://www.google.com/policies/privacy"
                  >
                    http://www.google.com/policies/privacy
                  </a>
                  ,
                </p>

                <p>
                  YouTube and the YouTube logo, trademark, and trade dress are
                  registered trademarks owned by Google Inc.
                </p>
                <p>
                  <b>Privacy Policy</b>
                </p>
                <p>We don&apos;t collect any kind of personal information.</p>
                <p>
                  <br />
                </p>
                <p>
                  <b>Disclaimer for JbpInfo</b>
                </p>

                <p>
                  If you require any more information or have any questions
                  about our site's disclaimer, please feel free to contact us by
                  email at mailto:jbpinfosolution@gmail.com. Our Disclaimer was
                  generated with the help of the Free Disclaimer Generator.
                  Disclaimers for JbpInfoSolution All the information on this
                  website - JbpInfoSolution.com - is published in good faith and
                  for general information purpose only. JbpInfoSolution does not
                  make any warranties about the completeness, reliability and
                  accuracy of this information. Any action you take upon the
                  information you find on this website (JbpInfoSolution), is
                  strictly at your own risk. JbpInfoSolution will not be liable
                  for any losses and/or damages in connection with the use of
                  our website. From our website, you can visit other websites by
                  following hyperlinks to such external sites. While we strive
                  to provide only quality links to useful and ethical websites,
                  we have no control over the content and nature of these sites.
                  These links to other websites do not imply a recommendation
                  for all the content found on these sites. Site owners and
                  content may change without notice and may occur before we have
                  the opportunity to remove a link which may have gone 'bad'.
                  Please be also aware that when you leave our website, other
                  sites may have different privacy policies and terms which are
                  beyond our control. Please be sure to check the Privacy
                  Policies of these sites as well as their "Terms of Service"
                  before engaging in any business or uploading any information.
                  Consent By using our website, you hereby consent to our
                  disclaimer and agree to its terms. Update Should we update,
                  amend or make any changes to this document, those changes will
                  be prominently posted here.
                </p>
              </IonText>
            </IonContent>
          </IonModal>
        </IonContent>
        <IonFooter style={{ height: "40px" }}>
          <IonToolbar color="light">
            <IonButton
              color="dark"
              fill="clear"
              onClick={() => setIsOpen(true)}
            >
              <IonIcon
                icon={informationCircleOutline}
                style={{ marginBottom: "10px" }}
              ></IonIcon>
            </IonButton>
            <IonText
              style={styles.text}
            >
              Disclaimer and Privacy Policy
            </IonText>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default VideoPage;

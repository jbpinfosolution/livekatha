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
import {
  AdMob,
  AdMobBannerSize,
  BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
} from "@capacitor-community/admob";

import "./Home.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { informationCircleOutline } from "ionicons/icons";
import { useIonRouter } from "@ionic/react";
import { App } from "@capacitor/app";

const styles = {
  logo:{
    width: "60%",
    justifyContent: "center",
    display: "flex",
    marginLeft: "76px",
  }
};

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ionRouter = useIonRouter();

  document.addEventListener("ionBackButton", (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });


  const showBanner = async () => {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {});

    AdMob.addListener(
      BannerAdPluginEvents.SizeChanged,
      (size: AdMobBannerSize) => {}
    );

    //ca-app-pub-7720753730393552/1815817037 real ad id
    // demo ad unit id ca-app-pub-3940256099942544/6300978111

    const options: BannerAdOptions = {
      adId: "ca-app-pub-7720753730393552/1815817037",
      adSize: BannerAdSize.MEDIUM_RECTANGLE,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      // isTesting: true, 
    };
    await AdMob.showBanner(options);
  };

  showBanner();

  const hide = async () => {
    await AdMob.hideBanner();
  };

  const popUp = () => {
    setIsOpen(true);
    hide();
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar >
           <IonImg
              src="./images/om livekatha.jpg"
              style={styles.logo}
            ></IonImg>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <h1 style={{ marginTop: "100px", textAlign: "center" }}>
            <b>WELCOME</b>
          </h1>
          <h4 style={{ textAlign: "center" }}>
            Watch all live katha just one click!!
          </h4>
          <Link to={"/home/video"}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <IonButton
                color="primary"
                style={{ margin: 0 }}
              >
                watch now
              </IonButton>
            </div>
          </Link>
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
              // onClick={() => setIsOpen(true)}
              onClick={popUp}
            >
              <IonIcon
                icon={informationCircleOutline}
                style={{ marginBottom: "10px" }}
              ></IonIcon>
            </IonButton>
            <IonText
              style={{ left: "38px", position: "absolute", top: "12px" }}
            >
              Disclaimer and Privacy Policy
            </IonText>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default HomePage;

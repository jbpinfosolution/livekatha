import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonModal,
  IonPage,
  IonRow,
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
import { useState } from "react";
import Home from "../components/home";
import "./Home.css";
import { refreshOutline } from "ionicons/icons";
const styles = {
  img1: {
    height: "30px",
    width: "30px",
    marginLeft: "55px",
  },
  img2: {
    height: "30px",
    width: "30px",
  },
};

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  function refreshPage() {
    window.location.reload();
  }

  const showBanner = async () => {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {});

    AdMob.addListener(
      BannerAdPluginEvents.SizeChanged,
      (size: AdMobBannerSize) => {}
    );

    const options: BannerAdOptions = {
      adId: "	ca-app-pub-3940256099942544/6300978111", // demo ad unit id ca-app-pub-3940256099942544/6300978111
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
    };
    await AdMob.showBanner(options);
  };

  showBanner();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className="ion-text-center">
          <IonGrid>
            <IonRow>
             
              <IonCol >
                <IonImg src="./images/om.png" style={styles.img1} />
              </IonCol>
              <IonCol>
                <IonTitle style={{ marginTop: "10px" }}>
                  <b>Livekatha</b>
                </IonTitle>
              </IonCol>
              <IonCol
              //  style={{ marginRight: "70px" }}
               >
                <IonImg src="./images/om.png" style={styles.img2} />
              </IonCol>
              <IonCol>
                <IonButton
                  fill="clear"
                  color="dark"
                  // size="small"
                  onClick={refreshPage}
                >
                  <IonIcon icon={refreshOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Home />
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Disclaimer</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonText>
              <p>
                Disclaimer for JbpInfo If you require any more information or
                have any questions about our site's disclaimer, please feel free
                to contact us by email at mailto:jbpinfosolution@gmail.com. Our
                Disclaimer was generated with the help of the Free Disclaimer
                Generator. Disclaimers for JbpInfoSolution All the information
                on this website - JbpInfoSolution.com - is published in good
                faith and for general information purpose only. JbpInfoSolution
                does not make any warranties about the completeness, reliability
                and accuracy of this information. Any action you take upon the
                information you find on this website (JbpInfoSolution), is
                strictly at your own risk. JbpInfoSolution will not be liable
                for any losses and/or damages in connection with the use of our
                website. From our website, you can visit other websites by
                following hyperlinks to such external sites. While we strive to
                provide only quality links to useful and ethical websites, we
                have no control over the content and nature of these sites.
                These links to other websites do not imply a recommendation for
                all the content found on these sites. Site owners and content
                may change without notice and may occur before we have the
                opportunity to remove a link which may have gone 'bad'. Please
                be also aware that when you leave our website, other sites may
                have different privacy policies and terms which are beyond our
                control. Please be sure to check the Privacy Policies of these
                sites as well as their "Terms of Service" before engaging in any
                business or uploading any information. Consent By using our
                website, you hereby consent to our disclaimer and agree to its
                terms. Update Should we update, amend or make any changes to
                this document, those changes will be prominently posted here.
              </p>
            </IonText>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter style={{ height: "40px" }}>
        <IonToolbar color="light" className="ion-text-center">
          <IonButton
            size="small"
            color="dark"
            fill="clear"
            onClick={() => setIsOpen(true)}
          >
            Disclaimer
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default HomePage;

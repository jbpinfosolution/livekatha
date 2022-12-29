import { IonItem, IonList, IonLoading, IonText } from "@ionic/react";
import "./ExploreContainer.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";
import { useIonRouter } from "@ionic/react";
import { App } from "@capacitor/app";

const Home: React.FC = () => {
  const [videoData, setVideoData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const ionRouter = useIonRouter();

  

  

  document.addEventListener("ionBackButton", (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  useEffect(() => {
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== "granted") {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === "denied") {
          } else {
            register();
          }
        });
      } else {
        register();
      }
    });
  }, []);

  const register = () => {
    console.log("Initializing HomePage");
    PushNotifications.register();

    PushNotifications.addListener("registration", (token: Token) => {});

    PushNotifications.addListener("registrationError", (error: any) => {
      alert("Error on registration: " + JSON.stringify(error));
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotificationSchema) => {}
    );
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: ActionPerformed) => {}
    );
  };

  useEffect(() => {
    setShowLoading(true);
    
    Axios.get("https://lazy-tan-penguin-hose.cyclic.app/videos")
      .then((res: any) => {
        console.log(res.data);
        setVideoData(res.data);
        setShowLoading(false);
        
      })
      .catch((e) => {});
  }, []);

  return (
    <>
      <div>
        <IonList>
          <IonLoading isOpen={showLoading} message={"Please wait..."} />
          {videoData
            .slice(0)
            .reverse()
            .map((video: any, index) => {
              const { url, title, description, tags, _id } = video;
              return (
                <>
                  <div key={index}>
                    <IonItem key={_id}>
                      <ReactPlayer controls url={url} />
                    </IonItem>

                    <IonItem key={index}>
                      <IonText>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <h6>
                          <b>{tags}</b>
                        </h6>
                      </IonText>
                    </IonItem>
                  </div>
                </>
              );
            })}
        </IonList>
      </div>
    </>
  );
};

export default Home;

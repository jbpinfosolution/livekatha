import { IonItem, IonList, IonLoading, IonText } from "@ionic/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";
import { AdMob } from "@capacitor-community/admob";


const Video: React.FC = () => {
  const [videoData, setVideoData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
 
  const removeBanner = async () => {
    await AdMob.removeBanner();
  };

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
    // console.log("Initializing VideoPage");
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
        setVideoData(res.data);
        setShowLoading(false);
      })
      .catch((e) => {});
  }, []);

  removeBanner();

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

export default Video;

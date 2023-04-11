import { IonButton, IonItem, IonList, IonLoading, IonText } from "@ionic/react";
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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageButton, setPageButton] = useState(false);

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
    Axios.get(`{window.name}newItems?page=${currentPage}`)
      .then((res: any) => {
        setVideoData(res.data.items);
        setTotalPages(res.data.totalPages);
        setShowLoading(false);
        setPageButton(true);
      })
      .catch((e) => {});
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  removeBanner();

  return (
    <>
      <div>
        <IonList>
          <IonLoading isOpen={showLoading} message={"Please wait..."} />
          {videoData.map((video: any, index) => {
            const { url, title, description, _id } = video;
            return (
              <>
                <div key={index}>
                  <IonItem key={_id}>
                    <ReactPlayer controls url={url} />
                  </IonItem>

                  <IonItem key={index}>
                    <IonText>
                      <h4>{title}</h4>
                      <small>{description}</small>
                      <hr/>
                    </IonText>
                  </IonItem>
                </div>
              </>
            );
          })}
        </IonList>
        {pageButton && (
          <div className="pageContainer2">
            <IonButton
              size="small"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </IonButton>
            <h2 className="h">
              Page {currentPage} of {totalPages}
            </h2>
            <IonButton
              size="small"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </IonButton>
          </div>
        )}
      </div>
    </>
  );
};

export default Video;

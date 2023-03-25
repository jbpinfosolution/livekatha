import { IonList, IonLoading, IonText } from "@ionic/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import {
  PushNotificationSchema,
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";
import {
  AdMob,
  BannerAdOptions,
  InterstitialAdPluginEvents,
} from "@capacitor-community/admob";
import "./video.css";

interface Video {
  _id: number;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
}

const VideoList: React.FC = () => {
  const [videoData, setVideoData] = useState<Video[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

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
    Axios.get("https://lazy-tan-penguin-hose.cyclic.app/video")
      .then((res: any) => {
        setVideoData(res.data);
        setShowLoading(false);
      })
      .catch((e) => {});
  }, []);

  const handleVideoClick = (videoId: number) => {
    setSelectedVideo(videoData.find((video) => video._id === videoId) || null);
  };

  useEffect(() => {
    removeBanner();
    interstitial();
  }, []);

  const interstitial = async () => {
    AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: any) => {});
    //ca-app-pub-7720753730393552/2959619496 real ad id
    // demo ad unit id ca-app-pub-3940256099942544/8691691433
    const options: BannerAdOptions = {
      adId: "ca-app-pub-7720753730393552/2959619496",
      // isTesting: true,
    };
    const ad = await AdMob.prepareInterstitial(options);
    if (ad) {
      showInterstitial();
    }
  };
  const showInterstitial = async () => {
    await AdMob.showInterstitial();
  };

  return (
    <>
      <div className="container">
        {selectedVideo && (
          <div className="video-player">
            <ReactPlayer
              controls={true}
              url={selectedVideo.url}
              playing={true}
              width="100%"
              height="80%"
            />
            <p>
              <b>{selectedVideo.title}</b>
            </p>
          </div>
        )}
        <IonLoading isOpen={showLoading} message={"Please wait..."} />
        <IonList className="video-list">
          {videoData.map((video: any, index) => {
            const { title, description, tags, thumbnailUrl, _id } = video;
            return (
              <>
                <div
                  className="video-list-item"
                  key={index}
                  onClick={() => handleVideoClick(_id)}
                >
                  <img src={thumbnailUrl} alt={title} />
                  <IonText className="ion-text">
                    <h6>
                      <b>{title}</b>
                    </h6>
                    <p>{description}</p>
                    <p>{tags}</p>
                  </IonText>
                </div>
              </>
            );
          })}
        </IonList>
      </div>
    </>
  );
};

export default VideoList;

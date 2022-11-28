import { IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import "./ExploreContainer.css";
import Axios from "axios";
import {  useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { LocalNotifications } from "@capacitor/local-notifications";

// interface ContainerProps {}
const Home: React.FC = () => {
  const [videoData, setVideoData] = useState([]);
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  // const handleViewChange = useCallback(
  //   (entries: IntersectionObserverEntry[]) => {
  //     for (let entry of entries) {
  //       if (entry.intersectionRatio > 0.5) {
  //         if (videoRef.current) {
  //           videoRef.current.play();
  //         }
  //       } else {
  //         if (videoRef.current) {
  //           videoRef.current.pause();
  //         }
  //       }
  //     }
  //   },
  //   []
  // );
  // useEffect(() => {
  //   const observer = new IntersectionObserver(handleViewChange, {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.5,
  //   });
  //   setObserver(observer);
  //   if (videoRef.current) {
  //     observer.observe(videoRef.current);
  //   }
  //   return () => {
  //     if (observer) {
  //       observer.disconnect();
  //     }
  //   };
  // }, [handleViewChange]);

  LocalNotifications.schedule({
    notifications: [
      {
        title: "Live Katha",
        body: "katha will start at 1:30",
        id: 1,
        schedule: { at: new Date(new Date().getTime() + 3600) },
        sound: "./sound/sound.mp3",
      },
    ],
  });

  useEffect(() => {
    Axios.get("http://localhost:3000/videos").then((res: any) => {
      console.log(res.data);
      setVideoData(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <IonList>
          {videoData.map((video: any, index) => {
            const { url, title, description, tags, id } = video;
            return (
              <>
                <div>
                  <IonItem key={index}>
                    {/* <video
              ref={videoRef}
              src="./videoplayback.mp4"
              controls
              muted
            ></video> */}
                    <ReactPlayer
                      controls
                      url={url}
                      // playing
                    ></ReactPlayer>
                  </IonItem>
                  <IonItem key={id}>
                    <IonLabel>
                      <h2>{title}</h2>
                      <IonText>
                        <p>{description}</p>
                        <h6>
                          <b>{tags}</b>
                        </h6>
                      </IonText>
                    </IonLabel>
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

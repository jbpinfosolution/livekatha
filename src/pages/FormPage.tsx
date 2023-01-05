import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import Axios from "axios";
import "./Home.css";

const FormPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const url = "https://lazy-tan-penguin-hose.cyclic.app/post";
  const [data, setData] = useState({
    url: "",
    title: "",
    description: "",
    tags: "",
  });

  const inputEvent = (e: any) => {
    const { value, id } = e.target;
    setData({ ...data, [id]: value });
  };

  const submit = (e: any) => {
    e.preventDefault();
    Axios.post(url, {
      url: data.url,
      title: data.title,
      description: data.description,
      tags: data.tags,
    }).then((res) => {
      setShowAlert(true)
    }); 
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="medium" className="ion-text-center">
          <IonTitle>Upload</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Message"
        message="Video uploaded successfully."
        buttons={['OK']}
      />
        <form onSubmit={submit}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Url</IonLabel>
              <IonInput
                id="url"
                value={data.url}
                onIonChange={inputEvent}
                placeholder="Enter Your Url"
                type="url"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Title</IonLabel>
              <IonInput
                id="title"
                value={data.title}
                onIonChange={inputEvent}
                placeholder="Enter Your Title"
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonTextarea
                id="description"
                value={data.description}
                onIonChange={inputEvent}
                placeholder="Enter Your Description"
              ></IonTextarea>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Tags</IonLabel>
              <IonInput
                id="tags"
                value={data.tags}
                onIonChange={inputEvent}
                placeholder="Enter Your Tags"
                type="text"
              ></IonInput>
            </IonItem>
            <IonButton type="submit"  >Upload</IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default FormPage;

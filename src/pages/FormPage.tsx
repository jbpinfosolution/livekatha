import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import Axios from "axios"
import "./Home.css";

const FormPage: React.FC = () => {
  const url = "http://localhost:3000/post"
  const [data, setData] = useState({
    url: "",
    title: "",
    description: "",
    tags: "",
  });

  const inputEvent = (e: any) => {
    const { value, id } = e.target;
    setData({ ...data, [id]: value });
    // console.log(e.target.value);
    // console.log(e.target.id);
  };

  const submit = (e: any) => {
    console.log(data);
    e.preventDefault();
    Axios.post(url, {
      url:data.url,
      title:data.title,
      description:data.description,
      tags:data.tags
    }).then(res=>{
      console.log(res.data)
    })
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="medium" className="ion-text-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Upload</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
                placeholder="Enter Your Url"
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonInput
                id="description"
                value={data.description}
                onIonChange={inputEvent}
                placeholder="Enter Your Url"
                type="text"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Tags</IonLabel>
              <IonInput
                id="tags"
                value={data.tags}
                onIonChange={inputEvent}
                placeholder="Enter Your Url"
                type="text"
              ></IonInput>
            </IonItem>
            <IonButton type="submit">submit</IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default FormPage;

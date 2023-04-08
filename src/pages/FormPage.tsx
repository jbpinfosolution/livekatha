import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./Home.css";

const FormPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteAlret, setDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({
    url: "",
    title: "",
    description: "",
    tags: "",
    thumbnailUrl: "",
  });
  
  //const url = "https://lazy-tan-penguin-hose.cyclic.app/post";
  // eslint-disable-next-line no-template-curly-in-string
  const url = `${window.name}newPost`;
  //const url = "${url}/newPost";

  const inputEvent = (e: any) => {
    const { value, id } = e.target;
    setData({ ...data, [id]: value });
  };

  useEffect(() => {
    setLoading(true);
    Axios.get(`${window.name}newItems?page=${currentPage}`)
      .then((res) => {
        setVideo(res.data.items);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  const handleDelete = async (id: any) => {
    try {
      setDeleteLoading(true);
      const res = await Axios.delete(
        `${window.name}newDelete/${id}`
      );
      // console.log(res);
      // console.log(res.data);
      if (res) {
        setDeleteLoading(false);
        setDeleteAlert(true);
      } else {
        setDeleteLoading(false);
        setDeleteError(true);
      }
      setVideo(video.filter((item: { _id: any }) => item._id !== id));
    } catch (error) {
      setDeleteError(true);
      setDeleteLoading(false);
      console.log(error);
    }
  };

  const submit = (e: any) => {
    setShowLoading(true);
    e.preventDefault();
    const myArray = data.url.split("v=");
    const thumbimg = myArray[1] ? myArray[1] : "";
    Axios.post(url, {
      url: data.url,
      title: data.title,
      description: data.title,
      tags: "#dn",
      thumbnailUrl: `https://i.ytimg.com/vi/${thumbimg}/hqdefault.jpg`,
    })
      .then((res) => {
        setShowLoading(false);
        setShowAlert(true);
        console.log(res);
      })
      .catch((err) => {
        setShowLoading(false);
        setError(true);
      });
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="medium" className="ion-text-center">
          <IonTitle>Upload</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={showLoading} message={"Uploading..."} />
        <IonLoading isOpen={deleteLoading} message={"Deleting..."} />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Message"
          message="Video uploaded successfully."
          buttons={["OK"]}
        />
        <IonAlert
          isOpen={error}
          onDidDismiss={() => setShowAlert(false)}
          header="Message"
          message="Video not uploaded. Please try again."
          buttons={["OK"]}
        />
        <IonAlert
          isOpen={deleteAlret}
          onDidDismiss={() => setShowAlert(false)}
          header="Message"
          message="Video deleted!!!."
          buttons={["OK"]}
        />
        <IonAlert
          isOpen={deleteError}
          onDidDismiss={() => setShowAlert(false)}
          header="Message"
          message="Video not deleted. Please try again."
          buttons={["OK"]}
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
            {/* <IonItem>
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
            </IonItem> */}
            <IonButton type="submit">Upload</IonButton>
          </IonList>
        </form>
        <div>
          <h1 style={{ textAlign: "center" }}>
            <b>Videos</b>
          </h1>
          {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
          {video.map((item: any) => (
            <div key={item._id}>
              {/* <IonItem> */}
              <IonGrid>
                <IonRow>
                  <IonCol>{item.title}</IonCol>
                  <IonCol size="3">
                    <IonButton
                      color="danger"
                      size="small"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
              {/* </IonItem> */}
            </div>
          ))}
        </div>
        <div className="pageContainer">
          <IonButton
            size="small"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </IonButton>
          <h2 className="h1">
            {currentPage} of {totalPages}
          </h2>
          <IonButton
            size="small"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FormPage;

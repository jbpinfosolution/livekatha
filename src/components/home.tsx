import {
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ExploreContainer.css";





interface ContainerProps {}

const Home: React.FC<ContainerProps> = () => {
  return (
    <>
      <div>
        <IonToolbar color="light">
          <IonTitle>Category</IonTitle>
         
        </IonToolbar>
        
          {/* {Data.map((item) => {
            return (
              <IonItem key={item.id}>
                <IonLabel>{item.category}</IonLabel>
              </IonItem>
            );
          })} */}
         
      </div>
    </>
  );
};

export default Home;

import { IonButton, IonButtons, IonContent, IonHeader, IonNavLink, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Home from '../components/home';
import FormPage from './FormPage';
import './Home.css';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="medium" className='ion-text-center'>
          <IonTitle>Video App</IonTitle>
          <IonNavLink routerDirection="forward" component={()=> <FormPage/>}>
            <IonButtons slot="end">
          <IonButton slot='end' size="small" color={"dark"} fill="clear" >Upload</IonButton>
          </IonButtons>
          </IonNavLink>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Video App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Home/>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "./pages/HomePage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
// import OneSignal from 'onesignal-cordova-plugin';
/* Theme variables */
import "./theme/variables.css";
import FormPage from "./pages/FormPage";
import { useEffect } from "react";
import { AdMob } from '@capacitor-community/admob';

setupIonicReact();

const App: React.FC = () =>{ 
  useEffect(() => {
    AdMob.initialize({
      requestTrackingAuthorization: true,
    });
  }, []);
  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/form" component={() => <FormPage/>} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
}

export default App;

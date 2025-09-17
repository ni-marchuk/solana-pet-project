import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { card, list } from 'ionicons/icons';
import { PrivyProvider } from '@app/providers/PrivyContext.tsx';
import { SolanaProvider } from '@app/providers/SolanaContext.tsx';
import { PageLayout } from '@app/layouts/layouts.tsx';
import { Home } from '@pages/home.tsx';
import { AccountPage } from '@pages/account.tsx';
import './styles/all.css';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <PrivyProvider>
        <SolanaProvider>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/home">
                  <PageLayout>
                    <Home />
                  </PageLayout>
                </Route>
                <Route path="/account">
                  <PageLayout>
                    <AccountPage />
                  </PageLayout>
                </Route>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </IonRouterOutlet>
              {/** tab bar */}
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon aria-hidden="true" icon={list} />
                  <IonLabel>Tokens</IonLabel>
                </IonTabButton>
                <IonTabButton tab="account" href="/account">
                  <IonIcon aria-hidden="true" icon={card} />
                  <IonLabel>Account</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </SolanaProvider>
      </PrivyProvider>
    </IonApp>
  );
}

export default App;

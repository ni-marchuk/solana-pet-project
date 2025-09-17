import { type FC, type PropsWithChildren } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { Header } from '@widgets/Header';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        {children}
      </IonContent>
    </IonPage>
  );
};

import { IonHeader, IonText, IonToolbar } from '@ionic/react';
import XIcon from '@shared/icons/x.svg?react';
import TelegramIcon from '@shared/icons/telegram.svg?react';

export const Header = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-4">
            <div className="flex flex-col">
              <IonText color="danger"><p className="font-bold">LAUNCH</p></IonText>
              <IonText><p className="font-bold">PAD</p></IonText>
            </div>
            <div className="flex p-4 gap-4">
              <XIcon />
              <TelegramIcon />
            </div>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>

  );
};
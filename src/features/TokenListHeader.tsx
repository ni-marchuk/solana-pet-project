import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';

export const TokenListHeader = () => {
  return (
    <IonGrid>
      <IonRow className="flex flex-col items-center rounded-t-sm bg-gray-300 lg:flex-row lg:items-center ">
        {/* TOKEN */}
        <IonCol sizeXs="12" sizeLg={'3'}>
          <div className="flex px-2 py-0 lg:justify-start">
            <IonText className="text-xs text-white font-bold">
              TOKEN
            </IonText>
          </div>
        </IonCol>
        {/* CA */}
        <IonCol sizeXs="12" sizeLg={'2'}>
          <div className="flex px-4 py-2 lg:justify-end">
            <IonText className="text-xs text-white font-bold">
              CA
            </IonText>
          </div>
        </IonCol>
        {/* VOLUME */}
        <IonCol sizeXs="12" sizeLg="1">
          <div className="flex px-4 py-2 lg:justify-end">
            <IonText className="text-xs text-white font-bold">
              VOLUME
            </IonText>
          </div>
        </IonCol>
        {/* MARKET CAP */}
        <IonCol sizeXs="12" sizeLg={'2'}>
          <div className="flex px-4 py-2 lg:justify-end">
            <IonText className="text-xs text-white font-bold">
              MARKET CAP
            </IonText>
          </div>
        </IonCol>
        {/* PROGRESS placeholder */}
        <IonCol sizeXs="12" sizeLg={'1.5'}>
          <div className="flex px-4 py-2 lg:justify-end">
            <IonText className="text-xs text-white font-bold">
              PROGRESS
            </IonText>
          </div>
        </IonCol>
        {/* HOLDERS */}
        <IonCol sizeXs="12" sizeLg="1">
          <div className="flex px-4 py-2 lg:justify-end">
            <IonText className="text-xs text-white font-bold">
              HOLDERS
            </IonText>
          </div>
        </IonCol>
        {/* TRADE  */}
        <IonCol sizeXs="12" sizeLg="1.5">
          <div className="flex lg:justify-center">
            <IonText className="text-xs text-white font-bold">
              TRADE
            </IonText>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
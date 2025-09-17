import { type FC, memo } from 'react';
import {
  IonItem,
  IonButton,
  IonAvatar,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonIcon,
} from '@ionic/react';
import { analyticsOutline, copyOutline } from 'ionicons/icons';
import { useTimeAgo } from '@shared/hooks/useTimeAgo.ts';

type TokenListRowProps = {
  data: {
    photo: string;
    mint_time: number;
    symbol: string;
    name: string;
    description: string;
    token: string;
    creator: string;
    volumeUsd: number;
    buys: number;
    sells: number;
    marketCapUsd: number;
    price: number;
    holders: number;
    progress: number;
    topHoldersPercentage: number;
  };
  onTrade: () => void;
};

const short = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}M` : `${(v / 1_000).toFixed(0)}K`;

const TokenListRow: FC<TokenListRowProps> = memo(({ data, onTrade }) => {
  const {
    photo,
    mint_time,
    symbol,
    name,
    description,
    token,
    creator,
    volumeUsd,
    buys,
    sells,
    marketCapUsd,
    price,
    holders,
    progress,
    topHoldersPercentage,
  } = data;

  const { timeAgo } = useTimeAgo(mint_time);

  return (
    <IonItem className="ion-no-padding">
      <IonGrid>
        <IonRow className="flex flex-col items-center hover:bg-gray-100 cursor-pointer lg:flex-row lg:items-center">
          <IonCol sizeXs={'12'} sizeLg={'3'}>
            <div className="flex flex-row items-center px-2 py-2">
              <div className="flex flex-col items-center mr-2">
                <IonAvatar
                  slot="start"
                  className="w-12 h-12 rounded-full bg-gray-200"
                >
                  {photo !== '/images/empty.gif' &&
                    <img src={photo} alt={name} className="w-full h-full object-cover" />}
                </IonAvatar>
                <IonText color="secondary" className="text-xs whitespace-nowrap">
                  <sub>{timeAgo}</sub>
                </IonText>
              </div>
              <div className="ion-display-flex ion-flex-column">
                <IonText>
                  {symbol} / {name}
                </IonText>
                <IonText color="secondary" className="text-xs">
                  <sub>{description}</sub>
                </IonText>
              </div>
            </div>
          </IonCol>

          {/* CA */}
          <IonCol sizeXs={'12'} sizeLg={'2'}>
            <div className="flex flex-col px-2 py-2 lg:items-end">
              <div className="lg:hidden text-[12px] mb-1 text-gray-400">CA</div>
              <div className="flex items-center">
                <IonText color="primary">
                  {token.slice(0, 4)}…{token.slice(-4)}
                </IonText>
                <IonIcon
                  icon={copyOutline}
                  className="ion-margin-start ion-activatable"
                  style={{ cursor: 'pointer', fontSize: '1rem' }}
                  color="primary"
                  onClick={() => navigator.clipboard.writeText(token)}
                />
              </div>
              <IonText color="secondary">
                by {creator.slice(0, 4)}…{creator.slice(-4)}
              </IonText>
            </div>
          </IonCol>

          {/* VOLUME */}
          <IonCol sizeXs={'12'} sizeLg={'1'}>
            <div className="flex flex-col px-2 py-2 lg:items-end">
              <div className="lg:hidden text-[12px] mb-1 text-gray-400">VOLUME</div>
              <IonText>${short(volumeUsd)}</IonText>
              <div className="flex flex-row">
                <IonText color="success">
                  <sub>{buys}</sub>
                </IonText>
                <IonText className="whitespace-pre"><sub>{' '}/{' '}</sub></IonText>
                <IonText color="danger">
                  <sub>{sells}</sub>
                </IonText>
              </div>
            </div>
          </IonCol>

          {/* MARKET CAP */}
          <IonCol sizeXs={'12'} sizeLg={'2'}>
            <div className="flex flex-col px-2 py-2 lg:items-end">
              <div className="lg:hidden text-[12px] mb-1 text-gray-400">MARKET CAP</div>
              <IonText>${short(marketCapUsd)}</IonText>
              <IonText style={{ fontSize: '0.75rem' }}>${price?.toFixed(4) ?? 0}</IonText>
            </div>
          </IonCol>

          {/* PROGRESS */}
          <IonCol sizeXs={'12'} sizeLg={'1.5'}>
            <div className="flex flex-col px-2 py-2 lg:justify-end">
              <div className="lg:hidden text-[12px] mb-1 text-gray-400">PROGRESS</div>
              <IonProgressBar value={progress} color="medium"></IonProgressBar>
            </div>
          </IonCol>

          {/* HOLDERS */}
          <IonCol sizeXs={'12'} sizeLg={'1'}>
            <div className="flex flex-col px-2 py-2 lg:items-end">
              <div className="lg:hidden text-[12px] mb-1 text-gray-400">HOLDERS</div>
              <IonText color="secondary">
                <sub>{holders}</sub>
              </IonText>
              <div className="flex items-end">
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full text-tiny border border-gray-400 text-gray-400">
                    D
                  </span>
                <span className="ml-1 text-tiny text-gray-400">{topHoldersPercentage ?? 0}%</span>
              </div>
            </div>
          </IonCol>
          {/* TRADE button */}
          <IonCol sizeXs={'12'} sizeLg={'1.5'}>
            <div className="flex flex-col items-end px-2 py-2 lg:justify-center lg:items-center">
              <IonButton size="small" color="btn" onClick={onTrade}>
                Trade
                <IonIcon
                  icon={analyticsOutline}
                  style={{ cursor: 'pointer', fontSize: '1rem' }}
                  className="ml-1 text-white"
                />
              </IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
});

export default TokenListRow;

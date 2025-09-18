import type { FC } from 'react';
import { IonText } from '@ionic/react';
import { useTimeAgo } from '@shared/hooks/useTimeAgo.ts';

type TokenTimerProps = {
  time: number
};
export const TokenTimer: FC<TokenTimerProps> = ({ time }) => {
  const { timeAgo } = useTimeAgo(time);

  return (
    <IonText color="secondary" className="text-xs whitespace-nowrap">
      <sub>{timeAgo}</sub>
    </IonText>
  );
};
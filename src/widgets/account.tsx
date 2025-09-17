import { type FC } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from '@ionic/react';
import { usePrivyAuth } from '@app/providers/PrivyContext';
// import { useSolana } from '@app/providers/SolanaContext.tsx';
import { usePrivySolana } from '@entities/solana/hooks/usePrivySolana.ts';

export const Account: FC = () => {
  // const {
  //   // sdk,
  //   // walletState,
  //   // isLoading,
  //   // error,
  //   // connectWallet,
  //   // disconnectWallet,
  //   // switchNetwork,
  // } = useSolana();

  const { login, logout, user } = usePrivyAuth();
  usePrivySolana();


  return (
    <div className="flex flex-col container mx-auto">
      <IonText>
        <h1>Account</h1>
      </IonText>
      <IonCard className="flex flex-col items-center justify-center p-6">
        {!user ? (
          <div className="flex flex-col">
            <IonText color="secondary" className='mb-4'>
              <h3>Please log in using your email address.</h3>
            </IonText>
            <IonButton onClick={login} className="self-center">
              Login
            </IonButton>
          </div>
        ) : (
          <>
            <IonCardHeader>
              <IonCardTitle>User Info</IonCardTitle>
            </IonCardHeader>
            {user &&
              <IonCardContent className="text-center space-y-2">
                <p>Email: {user?.email?.address}</p>
                <p>Wallet: {user?.wallet?.address}</p>
              </IonCardContent>
            }
            <IonButton onClick={logout} className="mt-4 self-center">
              Logout
            </IonButton>
          </>
        )}
      </IonCard>
    </div>
  );
};

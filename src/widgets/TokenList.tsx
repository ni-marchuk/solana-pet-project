import { type FC, useMemo } from 'react';
import { IonList } from '@ionic/react';
import { useTokenList } from '@entities/token/hooks/useTokenList.ts';
import TokenListRow from '@features/TokenListRow.tsx';
import { TokenListHeader } from '@features/TokenListHeader.tsx';


export const TokenList: FC = () => {
  const { listData } = useTokenList();

  /** Обновляем список айди для перерисовки списка, после добавления токена что заминтился */
  const ids: Array<string> = useMemo(() => {
    return Object.keys(listData ?? {});
  }, [listData]);

  if (!ids) return null;

  return (
    <div className="container mx-auto pt-6 px-4">
      <div className="hidden lg:inline">
        <TokenListHeader />
      </div>
      <IonList lines="inset">
        {ids.map(
          (id) =>
            listData?.[id] && (
              <TokenListRow
                key={id}
                data={listData[id]}
                onTrade={() => {
                  console.log('on trade');
                }}
              />
            ),
        )}
      </IonList>
    </div>
  );
};

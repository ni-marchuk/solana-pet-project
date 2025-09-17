import useWebSocket from 'react-use-websocket';
import { getMintTokenMetadata, getTokenList, type GetTokenListResponse } from '@entities/token/services.ts';
import type { Token, TokenUpdate } from '@entities/token/types.ts';
import { useFetch } from '@shared/hooks/useFetch.ts';
import { useRef } from 'react';

const URL = import.meta.env.VITE_WEBSOCKET_URL;
const TOKEN = import.meta.env.VITE_WEBSOCKET_KEY;

type WebsocketEventData = {
  push: {
    channel: 'meteora-tokenUpdates' | 'meteora-mintTokens';
    pub: { data: Token | TokenUpdate };
  };
  connect: {
    client: string;
    version: string;
    ping: number;
    pong: boolean;
  };
};

type useTokenListResult = {
  listData: GetTokenListResponse | null;
  loading: boolean;
  error: string;
};

export const useTokenList = (): useTokenListResult => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const batchedUpdates = useRef<Record<string, Partial<Token>>>({});

  /** Получаем список токенов */
  const { data, setData, error, loading } = useFetch<GetTokenListResponse>(getTokenList);

  const { sendMessage, readyState } = useWebSocket(URL, {
    onOpen: () => {
      sendMessage(JSON.stringify({ id: 1, connect: { name: 'js', token: TOKEN } }));
      /** Обновляем токен в списке */
      intervalRef.current = setInterval(() => {
        setData((prev) => {
          const result = { ...prev };
          Object.entries(batchedUpdates.current).map(([key, value]) => {
            if (result && result[key]) result[key] = { ...result[key], ...value };
          });
          return result;
        });
        batchedUpdates.current = {};
      }, 100);
    },
    onClose: () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    shouldReconnect: () => true,
    onMessage: (message) => {
      if (readyState) {
        try {
          const messageData: WebsocketEventData = JSON.parse(message.data);

          /** Обновляем наше соединение своеобразный Heartbeat */
          if (Object.keys(messageData).length === 0) {
            sendMessage(JSON.stringify({}));
            return;
          }

          /** Подписываемся на обновление и создание получив подтверждение об успешном соединении */
          if (messageData.connect) {
            sendMessage(
              JSON.stringify({
                id: 2,
                subscribe: { channel: 'meteora-mintTokens' },
              }),
            );
            sendMessage(
              JSON.stringify({
                id: 3,
                subscribe: { channel: 'meteora-tokenUpdates' },
              }),
            );
          }

          /** Обрабатываем когда пришли данные из подписок */
          if (data && messageData.push) {
            const { channel } = messageData.push;
            const responseData = messageData.push.pub.data;
            const { token } = responseData;

            if (channel === 'meteora-mintTokens') {
              /** Дозапрашиваем для нового токена фото и описание, потому что по дефолту эти данные не долетают */
              getMintTokenMetadata((responseData as Token).metadataUri).then((res) => {
                const updateInfoFromMeta: Partial<Token> = {};
                if (res.data) {
                  if (res.data.image) updateInfoFromMeta.photo = res.data.image;
                  if (res.data.description) updateInfoFromMeta.description = res.data.description;
                }
                /** Обновляем список новым токеном */
                setData((prev) => {
                  return {
                    [token]: {
                      ...(responseData as Token),
                      ...updateInfoFromMeta,
                    },
                    ...(prev ?? {}),
                  };
                });
              });
            }
            /** Батчим обновление данных иначе большая нагрузка на дом дерево */
            if (channel === 'meteora-tokenUpdates') {
              if (data && data[token]) {
                batchedUpdates.current[token] = responseData;
              }
            }
          }
        } catch (err) {
          console.error('Invalid JSON:', message.data);
        }
      }
    },
    share: true,
  });

  return {
    listData: data,
    loading,
    error,
  };
};

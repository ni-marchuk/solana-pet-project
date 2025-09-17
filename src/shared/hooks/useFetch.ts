import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import type { DefaultResponse } from '@shared/types/api.ts';

export const useFetch = <T>(
  asyncFn: () => Promise<DefaultResponse<T>>,
): {
  data: T | null;
  setData: Dispatch<SetStateAction<T | null>>;
  loading: boolean;
  error: string;
} => {
  const isMounted = useRef(true);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setLoading(true);
    asyncFn()
      .then((response) => {
        if (response.data && isMounted) setData(response.data);
      })
      .catch((e) => {
        if (e instanceof Error) setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      isMounted.current = false;
    };
  }, [asyncFn]);

  return {
    data,
    setData,
    loading,
    error,
  };
};

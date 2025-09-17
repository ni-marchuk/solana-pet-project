import { useState, useEffect, useMemo } from 'react';

export const useTimeAgo = (timestamp: number) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000); // один таймер на всё приложение
    return () => clearInterval(id);
  }, []);

  const timeAgo = useMemo(() => {
    const diff = Math.floor((now - timestamp) / 1000);
    if (diff < 60) {
      return `${diff}s ago`;
    }
    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes}m ago`;
    }
    const hours = Math.floor(diff / 3600);

    return `${hours}h ago`;
  }, [now, timestamp]);

  return {
    timeAgo,
  };
};

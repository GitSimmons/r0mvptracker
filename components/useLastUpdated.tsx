import { useState, useEffect } from 'react';
import { db } from '../firebase';
export const useLastUpdated: () => {
  error: string;
  loading: boolean;
  lastUpdated: number;
} = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<number>();

  useEffect(() => {
    const unsubscribe = db
      .collection('misc')
      .doc('lastUpdated')
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
          setLastUpdated(snapshot.data().lastUpdated.seconds);
        },
        (err) => {
          setError(err.message);
        },
      );

    return (): void => unsubscribe();
  }, []);

  return {
    error,
    loading,
    lastUpdated,
  };
};

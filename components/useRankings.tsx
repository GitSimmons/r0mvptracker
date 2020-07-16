import { useState, useEffect } from 'react';
import { db } from '../firebase';
export const useRankings: () => {
  error: string;
  loading: boolean;
  rankings: string[];
} = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState<string[]>();

  useEffect(() => {
    const unsubscribe = db
      .collection('misc')
      .doc('rankings')
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
          setRankings(snapshot.data().rankings);
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
    rankings,
  };
};

import { useState, useEffect } from "react";
import { db } from "../firebase";
export const useLastUpdated: () => { error: boolean, loading: boolean, lastUpdated: number } = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState();

  useEffect(() => {
    const unsubscribe = db
      .collection("misc")
      .doc("lastUpdated")
      .onSnapshot(
        snapshot => {
          setLoading(false);
          setLastUpdated(snapshot.data().lastUpdated.seconds);
        },
        err => {
          setError(err);
        }
      );

    return (): void => unsubscribe();
  }, []);

  return {
    error,
    loading,
    lastUpdated
  };
};

import { useState, useEffect } from "react";
import { db } from "../firebase";
import { MVPProps } from "./types/interfaces";
export const useMVPs = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [mvps, setMvps] = useState<MVPProps[]>([]);

  useEffect(() => {
    const unsubscribe = db.collection("mvp").onSnapshot(
      snapshot => {
        const mvps = [];
        snapshot.forEach(doc => {
          const mvp = doc.data();
          mvp.level = parseInt(mvp.level);
          mvp.respawnRate = parseInt(mvp.respawnRate);
          mvp.variableRespawn = mvp.variableRespawn ? parseInt(mvp.variableRespawn) : 10; // 10 is the default respawn time
          mvp.lastKilled = new Date(mvp.lastKilled + "+0000"); // The scraped page is in UTC,and we stored it as a string without Timezone info.
          mvps.push(mvp);
        });
        setLoading(false);
        setMvps(mvps);
      },
      err => {
        setError(err);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    error,
    loading,
    mvps
  };
};

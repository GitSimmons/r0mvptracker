import React, { useState, useEffect, useRef } from "react";

// Taken from Dan Abramov's blog: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// We're mostly going to be using this as a 1s 'tick' for progress bar updates
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

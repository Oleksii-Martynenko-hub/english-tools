import { useEffect } from 'react';

const useInterval = (callback: () => void, delay: number) => {
  let savedCallback = callback;

  useEffect(() => {
    savedCallback = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
    return () => {};
  }, [callback, delay]);
};

export default useInterval;

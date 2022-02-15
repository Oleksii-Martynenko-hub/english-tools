import { useCallback, useEffect, useRef, useState } from "react";

export function useTimeout(callback: () => any, delay: number) {
  const firstRenderRef = useRef(true);
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return [reset, clear];
}

export function useInterval(
  callback: () => any,
  interval: number,
  iters?: number
) {
  const firstRenderRef = useRef(true);
  const itersRef = useRef(iters);
  const callbackRef = useRef(callback);
  const intervalRef = useRef<NodeJS.Timeout>();
  const [itersCount, setItersCount] = useState(iters || 1);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    itersRef.current = iters;
  }, [iters]);

  useEffect(() => {
    if (itersCount === -2) {
      callbackRef.current();
      clear();
    }
  }, [itersCount]);

  const set = useCallback(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    intervalRef.current = setInterval(() => {
      if (itersRef.current) setItersCount((prev) => prev - 1);
    }, interval);
  }, [interval]);

  const clear = useCallback(() => {
    itersRef.current && setItersCount(itersRef.current);
    intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [interval, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear, itersCount };
}

type useTimeoutObj = {
  timeout: NodeJS.Timeout;
  callback: () => void;
  delay: number;
  timeoutId: string;
};

export function useTimeoutArray(init: useTimeoutObj[]) {
  const useTimeoutArrayRef = useRef<useTimeoutObj[]>(init);

  const add = useCallback(
    (callback: () => void, delay: number, timeoutId: string) => {
      if (
        !useTimeoutArrayRef.current.find(
          ({ timeoutId: id }) => id === timeoutId
        )
      ) {
        const timeout = setTimeout(() => {
          callback();
          clear(timeoutId);
        }, delay);

        useTimeoutArrayRef.current = [
          ...useTimeoutArrayRef.current,
          {
            timeout,
            callback,
            delay,
            timeoutId,
          },
        ];
        return false;
      }
      return true;
    },
    []
  );

  const clear = useCallback((timeoutId: string) => {
    useTimeoutArrayRef.current = useTimeoutArrayRef.current
      .map((item) => {
        if (item.timeoutId === timeoutId) clearTimeout(item.timeout);
        return item;
      })
      .filter((item) => item.timeoutId !== timeoutId);
  }, []);

  const clearAll = useCallback(() => {
    useTimeoutArrayRef.current = useTimeoutArrayRef.current.map((item) => {
      clearTimeout(item.timeout);
      return item;
    });
  }, []);

  return { clearAll, add, clear };
}

type useIntervalObj = {
  timeout: NodeJS.Timeout;
  interval: NodeJS.Timeout;
  callbackT: (...args: any[]) => void;
  callbackI: (...args: any[]) => void;
  iters: number;
  repeat: number;
  delay: number;
  intervalId: string;
};

export function useIntervalArray(init: useIntervalObj[]) {
  const useIntervalArrayRef = useRef<useIntervalObj[]>(init);

  const add = useCallback(
    ({
      callbackT,
      callbackI,
      repeat,
      delay,
      intervalId,
    }: Omit<useIntervalObj, "timeout" | "interval" | "iters">) => {
      if (
        !useIntervalArrayRef.current.find(
          ({ intervalId: id }) => id === intervalId
        )
      ) {
        const interval = setInterval(() => {
          useIntervalArrayRef.current = useIntervalArrayRef.current.map(
            (item) => {
              if (item.intervalId === intervalId) {
                return { ...item, iters: item.iters + 1 };
              }
              return item;
            }
          );
          callbackI(
            useIntervalArrayRef.current.find(
              (item) => item.intervalId === intervalId
            )
          );
        }, repeat);
        const timeout = setTimeout(() => {
          callbackT();
          clear(intervalId);
        }, delay);

        useIntervalArrayRef.current = [
          ...useIntervalArrayRef.current,
          {
            timeout,
            interval,
            callbackT,
            callbackI,
            iters: 0,
            repeat,
            delay,
            intervalId,
          },
        ];
        return false;
      }
      return true;
    },
    []
  );

  const clear = useCallback((intervalId: string) => {
    useIntervalArrayRef.current = useIntervalArrayRef.current
      .map((item) => {
        if (item.intervalId === intervalId) {
          clearTimeout(item.timeout);
          clearInterval(item.interval);
        }
        return item;
      })
      .filter((item) => item.intervalId !== intervalId);
  }, []);

  const clearAll = useCallback(() => {
    useIntervalArrayRef.current = useIntervalArrayRef.current.map((item) => {
      clearTimeout(item.timeout);
      return item;
    });
  }, []);

  return { clearAll, add, clear };
}

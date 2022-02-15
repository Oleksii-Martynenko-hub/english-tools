import { useEffect, useRef } from "react";

export enum ECustomEvent {
  UPDATE_DATA = "update_data",
}

export function useEventListener(
  eventType: keyof WindowEventMap | ECustomEvent,
  callback: (
    ev:
      | Event
      | DeviceMotionEvent
      | DeviceOrientationEvent
      | GamepadEvent
      | UIEvent
      | AnimationEvent
      | StorageEvent
  ) => any,
  element = window,
  options?: boolean | AddEventListenerOptions | undefined
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    element.addEventListener(
      eventType.toString(),
      (e) => callbackRef.current(e),
      options
    );

    return () =>
      element.removeEventListener(eventType.toString(), (e) =>
        callbackRef.current(e)
      );
  }, [eventType, element]);
}

export const dispatch = (event: ECustomEvent) => {
  window.dispatchEvent(new Event(event.toString()));
};

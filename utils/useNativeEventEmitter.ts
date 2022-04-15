import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { NativeEventEmitter, NativeModules } from "react-native";

function useNativeEventEmitter<T>(
  nativeEventEmitterName: string,
  listenerName: string
) {
  const [event, setEvent] = useState<T | null>(null);
  const [nativeEmitter] = useState<NativeEventEmitter>(
    new NativeEventEmitter(NativeModules[nativeEventEmitterName])
  );

  useEffect(() => {
    const subCache: BehaviorSubject<any> = new BehaviorSubject(null);
    const sub = nativeEmitter.addListener(listenerName, (event) =>
      subCache.next(event)
    );
    const obs = subCache.asObservable().subscribe((e) => setEvent(e));
    return () => {
      sub.remove();
      obs.unsubscribe();
      subCache.unsubscribe();
    };
  }, []);

  return event;
}

export default useNativeEventEmitter;

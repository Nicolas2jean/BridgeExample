import { useEffect, useRef, useState } from "react";
import {
  CustomsConfigType,
  InferArgs,
  MainThreadQueueType,
  CustomsCallType,
} from "./customs-type";

/**
 * useful to copy types
 * https://javascript.plainenglish.io/deep-clone-an-object-and-preserve-its-type-with-typescript-d488c35e5574
 */

export function deepCopy<T>(source: T): T {
  return Array.isArray(source)
    ? source.map((item) => deepCopy(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : source && typeof source === "object"
    ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
        Object.defineProperty(
          o,
          prop,
          Object.getOwnPropertyDescriptor(source, prop)!
        );
        o[prop] = deepCopy((source as { [key: string]: any })[prop]);
        return o;
      }, Object.create(Object.getPrototypeOf(source)))
    : source;
}

const useCustomsCall = <T extends Record<string, CustomsConfigType>>(
  callArray: T
) => {
  const [isWrappingDone, setIsWrappingDone] = useState<boolean>(false);
  const [call, setCall] = useState<Partial<CustomsCallType<T>>>({});
  const [callToQueue, setCallToQueue] = useState<MainThreadQueueType<T>[]>([]);
  const tmpRef = useRef<MainThreadQueueType<T>[]>([]);

  const sendWrapToQueue = <WFunc extends (...args: any[]) => any>(
    func: WFunc,
    code: string
  ): ((...args: InferArgs<WFunc>) => void) => {
    return (...args: InferArgs<WFunc>) => {
      // if user ask multiple call at a time
      // setCallToQueue doesn't update properly it isn't fast enough
      // whereas tmp isn't a state so is faster
      // setCallToQueue is only called once at the last call so no risk of updating state too much
      // this allows setCallToQueue to execute correctly

      // funny code here
      tmpRef.current = [
        ...tmpRef.current,
        {
          code,
          call: () => {
            func(...args);
          },
        },
      ];
      setCallToQueue(tmpRef.current);
    };
  };

  useEffect(() => {
    tmpRef.current = [];
  }, [callToQueue]);

  const wrap = <S extends keyof T, L extends T[S]["call"]>(
    section: S,
    name: L
  ): ((...args: InferArgs<L>) => void) => {
    // space to put conditions before wrapper starts, might be useful for process needing key of function
    // component did mount type of flow

    // console.log('before wrapping is called', section);
    const js_code = callArray[section].code;

    if (!name || !js_code) {
      return () =>
        console.log(
          "section has no call available, might be a callback",
          section
        );
    }

    // what happened before is executed on mount
    // what we did is we create a function wrapping the native call to be able to store the real native call in a queue
    return sendWrapToQueue(name, js_code);
  };

  // we are going to wrap the calls meant for js => native communication
  const createWrappedCall = () => {
    const wCallObject: Partial<CustomsCallType<T>> = {}; // not good did this for commit

    // eslint-disable-next-line guard-for-in
    for (const callItem in callArray) {
      // a callItem corresponds to a call and its settings
      if (Object.prototype.hasOwnProperty.call(callArray, callItem)) {
        if (callArray[callItem]["call"] !== undefined) {
          wCallObject[callItem] = wrap(callItem, callArray[callItem]["call"]);
        }
      }
    }

    setCall(deepCopy(wCallObject));
    setIsWrappingDone(true);
  };

  useEffect(createWrappedCall, []);

  return {
    call,
    callToQueue,
    isWrappingDone,
  };
};

export default useCustomsCall;

import { useState, useEffect } from "react";
import useCustomsStorage from "./useCustomsStorage";
import useCustomsCall from "./useCustomsCall";
import useNativeEventEmitter from "../../useNativeEventEmitter";
import {
  CustomsConfigType,
  MainThreadQueueType,
  CustomsObjectType,
} from "./customs-type";
import { log, s_log } from "../console.log.functions";

type NativeEvent = {
  data: any;
  code: string;
  status: string;
};

const useCustoms = <
  T extends Record<string, CustomsConfigType> = {
    checkCallbackQueue: { call: (code: string) => void; code: "" };
  }
>(
  config: T,
  communicationMap: Record<string, string[]>,
  nativeEmitterName: string,
  nativeEventName: string
): CustomsObjectType<T> => {
  const nativeEvent = useNativeEventEmitter<NativeEvent>(
    nativeEmitterName,
    nativeEventName
  );
  const [mainThreadQueue, setMainThreadQueue] = useState<
    MainThreadQueueType<T>[]
  >([]);
  const [isMainThreadUsed, setIsMainThreadUsed] = useState<boolean>(false);
  const [isInitDone, setIsInitDone] = useState(false);

  // create customs storage
  const { updateData, getObservable, isStorageDone } =
    useCustomsStorage<T>(config);

  // create customs call
  const { call, callToQueue, isWrappingDone } = useCustomsCall(config);

  useEffect(() => {
    if (callToQueue) {
      setMainThreadQueue([...mainThreadQueue, ...callToQueue]);
    }
  }, [callToQueue]);

  useEffect(() => {
    if (isStorageDone && isWrappingDone) {
      setIsInitDone(true);
    }
  }, [isStorageDone, isWrappingDone]);

  function getStorageKey(code: string): string {
    // code must always be: [state]_[storage]_[what it does]
    return code.split("_")[1].toLowerCase();
  }

  /**
   * function to check if receive data from a demanded call
   */

  useEffect(() => {
    log(
      "< Native Event",
      s_log.font.bold_20,
      s_log.font.monospace,
      s_log.t_color.pale_spring_bud
    );
    if (!nativeEvent) {
      log("Native event is null", s_log.t_color.red, s_log.font.italic_10);
      log("Event process terminated", s_log.t_color.red, s_log.font.bold_10);
      log(
        "/ >",
        s_log.font.bold_20,
        s_log.font.monospace,
        s_log.t_color.pale_spring_bud
      );
      return;
    }
    const native_code = nativeEvent.code;
    const JS_code = mainThreadQueue?.[0]?.code;
    const awaitingNativeCodes = communicationMap[mainThreadQueue?.[0]?.code];
    log(
      `Native code: ${native_code}`,
      s_log.font.bold_14,
      s_log.font.monospace
    );
    log(`JS code: ${JS_code}`, s_log.font.bold_14, s_log.font.monospace);

    console.log(`object [${native_code}]`, nativeEvent);

    if (nativeEvent.code) {
      if (mainThreadQueue.length > 0) {
        const lastAskedCode = mainThreadQueue[0]?.code;
        if (lastAskedCode === undefined) {
          return;
        }

        console.log("here");
        console.log(nativeEvent.code);
        console.log(communicationMap[lastAskedCode]);
        console.log(lastAskedCode);

        const awaitingNativeCodes = communicationMap[lastAskedCode];
        // [true] => response is linked to what js asked
        // [false] => it is a native callback user didn't ask for it
        if (awaitingNativeCodes.includes(nativeEvent.code)) {
          // remove first element of the list
          mainThreadQueue.shift();
          setMainThreadQueue(mainThreadQueue);
        }
      }

      // store native data
      if (nativeEvent.data) {
        const storageKey = getStorageKey(nativeEvent.code);
        console.log("native event code", nativeEvent.code);

        console.log("storage key", storageKey);
        updateData(storageKey, nativeEvent.data);
      }
      if (nativeEvent.code === "SUCCESS_CONTINUE_ASK") {
        setIsMainThreadUsed(false);
      } else {
        config.checkCallbackQueue.call(nativeEvent.code.toString());
      }
    }
    log(
      "/ >",
      s_log.font.bold_20,
      s_log.font.monospace,
      s_log.t_color.pale_spring_bud
    );
  }, [nativeEvent]);

  useEffect(() => {
    log(
      "< JS Event",
      s_log.font.bold_20,
      s_log.font.monospace,
      s_log.t_color.gin
    );
    console.log("MAIN THREAD QUEUE", mainThreadQueue);
    const JS_code = mainThreadQueue?.[0]?.code;
    log(
      `JS code: ${JS_code}`,
      s_log.font.bold_14,
      s_log.font.monospace,
      s_log.t_color.grey,
      s_log.font.lineThrought
    );
    log(
      `Is Main Thread Used: ${isMainThreadUsed ? "true" : "false"}`,
      s_log.font.bold_14,
      s_log.font.monospace
    );
    if (isMainThreadUsed) {
      return;
    }

    if (mainThreadQueue.length > 0) {
      mainThreadQueue[0].call();
      setIsMainThreadUsed(true);
    }
  }, [mainThreadQueue, isMainThreadUsed]);

  return {
    ...call,
    getObservable,
    isInitDone,
  };
};

export default useCustoms;

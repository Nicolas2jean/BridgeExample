import { NativeModules } from "react-native";
import { ConfigType } from "./Counter/config-type";
import { jsNativeCodeMap } from "./Counter/code";
import { config } from "./Counter/config";

// we need to have a ping function to know if native has awaiting unrequested events for react native.
const checkCallbackQueue = (code: string) => {
  NativeModules.ExampleModule.checkCallbackQueue?.(code);
};

// configuration from config.ts
export const ExampleCustomsConfig: ConfigType & {
  checkCallbackQueue: { call: (code: string) => void; code: string };
} = {
  ...config,
  checkCallbackQueue: {
    call: checkCallbackQueue,
    code: "ASK_CALLBACK",
  },
};

// communication map from code.ts
export const ExampleJsNativeCodeMap: Record<string, string[]> = {
  ...jsNativeCodeMap,
};

// native emitter name to know which native module we want to listen to.
export const ExampleNativeEmitterName = "ReactNativeEventEmitter";

// native event emitter to know which event we want to listen to.
export const ExampleNativeEventName = "ExampleEvents";

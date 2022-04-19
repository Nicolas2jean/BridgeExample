import React from "react";
import RNBridgeCustoms from "./utils/RNBridgeCustoms/RNBridgeCustoms";
import CounterScreen from "./ExampleModule/Counter.screen";
import {
  ExampleCustomsConfig,
  ExampleJsNativeCodeMap,
  ExampleNativeEmitterName,
  ExampleNativeEventName,
} from "./ExampleModule/Customs";

export default function App() {
  return (
    <RNBridgeCustoms
      config={ExampleCustomsConfig}
      communicationMap={ExampleJsNativeCodeMap}
      nativeEventName={ExampleNativeEventName}
      nativeEmitterName={ExampleNativeEmitterName}
    >
      <CounterScreen />
    </RNBridgeCustoms>
  );
}

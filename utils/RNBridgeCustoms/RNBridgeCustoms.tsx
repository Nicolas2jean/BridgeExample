import React from "react";
import { CustomsConfigType } from "./hooks/customs-type";
import useCustoms from "./hooks/useCustoms";

type RNBridgeCustomsProps<T> = {
  config: T;
  communicationMap: Record<string, string[]>;
  nativeEmitterName: string;
  nativeEventName: string;
};
const RNBridgeCustoms = <T extends Record<string, CustomsConfigType>>(
  props: React.PropsWithChildren<RNBridgeCustomsProps<T>>
) => {
  const bridgeEvent = useCustoms<T>(
    props.config,
    props.communicationMap,
    props.nativeEmitterName,
    props.nativeEventName
  );

  if (!bridgeEvent.isInitDone) {
    return <></>;
  }

  // https://reactgo.com/react-pass-props-children/
  if (!props.children) {
    return <></>;
  }
  const childrenWithBridgeEvent = React.Children.map(
    props.children,
    (child) =>
      React.cloneElement(
        child as React.ReactElement<
          any,
          string | React.JSXElementConstructor<any>
        >,
        { bridge: bridgeEvent }
      ) // bridgeEvent
  );
  return <>{childrenWithBridgeEvent}</>;
};

export default RNBridgeCustoms;

/**
 * used to tag the native method
 * {@link https://www.notion.so/React-Native-Setting-up-customs-folder-3b805f9da33548199ebc5c2d705879b6}
 */
export const jsCode = {
  ASK_COUNTER_INCREASE: "ASK_COUNTER_INCREASE",
  ASK_COUNTER_DECREASE: "ASK_COUNTER_DECREASE",
  ASK_COUNTER_GET_COUNTER: "ASK_COUNTER_GET_COUNTER",
};

/**
 * used to link NativeCode with JsCode
 * {@link https://www.notion.so/React-Native-Setting-up-customs-folder-3b805f9da33548199ebc5c2d705879b6}
 */
export const jsNativeCodeMap: Record<keyof typeof jsCode, string[]> = {
  ASK_COUNTER_INCREASE: ["SUCCESS_COUNTER_INCREASE", "ERROR_COUNTER_INCREASE"],
  ASK_COUNTER_DECREASE: ["SUCCESS_COUNTER_DECREASE", "ERROR_COUNTER_DECREASE"],
  ASK_COUNTER_GET_COUNTER: ["SUCCESS_COUNTER_GET_COUNT"],
};

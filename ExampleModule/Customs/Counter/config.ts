import { counter_decrease, counter_getCounter, counter_increase } from "./call";
import { ConfigType } from "./config-type";

export const config: ConfigType = {
  counter_increase: {
    call: counter_increase,
    code: "ASK_COUNTER_INCREASE",
    data: {},
  },
  counter_decrease: {
    call: counter_decrease,
    code: "ASK_COUNTER_DECREASE",
    data: {},
  },
  counter_getCounter: {
    call: counter_getCounter,
    code: "ASK_COUNTER_GET_COUNTER",
    data: {},
  },
};

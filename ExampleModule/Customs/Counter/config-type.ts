import { jsCode } from "./code";

type CounterIncreaseType = {
  call: (index: number, timeout: number) => void;
  code: keyof typeof jsCode;
  data: {
    index?: number;
    error?: string;
    index_counter_value?: number;
  };
};

type CounterDecreaseType = {
  call: (index: number) => void;
  code: keyof typeof jsCode;
  data: {
    index?: number;
    error?: string;
    index_counter_value?: number;
  };
};

type CounterGetCounterType = {
  call: (index: number) => void;
  code: keyof typeof jsCode;
  data: {
    counter?: number[];
  };
};

export type ConfigType = {
  /**
   * JsDoc for decrease native call method !
   */
  counter_decrease: CounterDecreaseType;
  /**
   * JsDoc for increase native call method !
   */
  counter_increase: CounterIncreaseType;
  /**
   * JsDoc for getCounter native call method !
   */
  counter_getCounter: CounterGetCounterType;
};

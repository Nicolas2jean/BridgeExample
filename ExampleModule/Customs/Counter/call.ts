import { NativeModules } from "react-native";

export function counter_decrease(index: number) {
  NativeModules.ExampleModule.decrease(index);
}

export function counter_increase(index: number, timeout: number) {
  NativeModules.ExampleModule.increase(index, timeout);
}

export function counter_getCounter() {
  NativeModules.ExampleModule.getCounter();
}

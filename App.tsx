import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity,
} from "react-native";
import useNativeEventEmitter from "./utils/useNativeEventEmitter";

export const ExampleModule = NativeModules.ExampleModule;

export const exampleNativeEmitterName = "ReactNativeEventEmitter";

export const exampleNativeEventName = "ExampleEvents";

type NativeEvent = {
  data: any;
  code: string;
  status: string;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function App() {
  const nativeEvent = useNativeEventEmitter<NativeEvent>(
    exampleNativeEmitterName,
    exampleNativeEventName
  );

  console.log(
    "NATIVE EVENT : index_counter_value -> ",
    nativeEvent?.data.index_counter_value
  );
  return (
    <View style={styles.container}>
      <Text>{nativeEvent?.data.index_counter_value}</Text>

      <TouchableOpacity
        onPress={() => {
          ExampleModule?.increase?.(0, getRandomInt(3)); // +1
          ExampleModule?.decrease?.(0); // 0
          ExampleModule?.increase?.(0, getRandomInt(3)); // +1
          ExampleModule?.decrease?.(0); // 0
          ExampleModule?.increase?.(0, getRandomInt(3)); // +1
          ExampleModule?.decrease?.(0); // 0
          ExampleModule?.increase?.(0, getRandomInt(3)); // +1
          ExampleModule?.decrease?.(0); // 0
          ExampleModule?.increase?.(0, getRandomInt(3)); // +1
          ExampleModule?.decrease?.(0); // 0
        }}
      >
        <Text style={styles.textStyle}>
          INCREASE / DECREASE x 5 each (should be equal to 0)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          ExampleModule?.increase?.(0, getRandomInt(3)); // +1
          ExampleModule?.increase?.(0, getRandomInt(3)); // +2
          ExampleModule?.increase?.(0, getRandomInt(3)); // +3
          ExampleModule?.increase?.(0, getRandomInt(3)); // +4
          ExampleModule?.increase?.(0, getRandomInt(3)); // +5
          ExampleModule?.increase?.(0, getRandomInt(3)); // +6
          ExampleModule?.increase?.(0, getRandomInt(3)); // +7
          ExampleModule?.increase?.(0, getRandomInt(3)); // +8
          ExampleModule?.increase?.(0, getRandomInt(3)); // +9
          ExampleModule?.increase?.(0, getRandomInt(3)); // +10
        }}
      >
        <Text style={styles.textStyle}>
          INCREASE x 10 (should be equal to n+10)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          ExampleModule?.decrease?.(0); // -1
          ExampleModule?.decrease?.(0); // -2
          ExampleModule?.decrease?.(0); // -3
          ExampleModule?.decrease?.(0); // -4
          ExampleModule?.decrease?.(0); // -5
          ExampleModule?.decrease?.(0); // -6
          ExampleModule?.decrease?.(0); // -7
          ExampleModule?.decrease?.(0); // -8
          ExampleModule?.decrease?.(0); // -9
          ExampleModule?.decrease?.(0); // -10
        }}
      >
        <Text style={styles.textStyle}>
          DECREASE x 10 (should be equal to n-10)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => ExampleModule?.increase?.(0, getRandomInt(3))}
      >
        <Text>INCREASE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => ExampleModule?.decrease?.(0)}>
        <Text>DECREASE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    padding: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

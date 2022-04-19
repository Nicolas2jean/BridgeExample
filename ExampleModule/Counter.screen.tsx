import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CustomsObjectType } from "../utils/RNBridgeCustoms/hooks/customs-type";
import useObservable from "../utils/useObservable";
import { ConfigType } from "./Customs/Counter/config-type";

type CounterScreenProps = {
  bridge: CustomsObjectType<ConfigType>;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const CounterScreen: React.FC<CounterScreenProps> = (props) => {
  const counter_data = useObservable(props.bridge.getObservable("counter"));
  console.log("UPDATE !", counter_data?.index_counter_value);
  return (
    <View style={styles.container}>
      <Text>{counter_data?.index_counter_value}</Text>

      <TouchableOpacity
        onPress={() => {
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +1
          props.bridge?.counter_decrease?.(0); // 0
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +1
          props.bridge?.counter_decrease?.(0); // 0
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +1
          props.bridge?.counter_decrease?.(0); // 0
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +1
          props.bridge?.counter_decrease?.(0); // 0
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +1
          props.bridge?.counter_decrease?.(0); // 0
        }}
      >
        <Text style={styles.textStyle}>
          INCREASE / DECREASE x 5 each (should be equal to 0)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +1
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +2
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +3
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +4
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +5
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +6
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +7
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +8
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +9
          props.bridge?.counter_increase?.(0, getRandomInt(3)); // +10
        }}
      >
        <Text style={styles.textStyle}>
          INCREASE x 10 (should be equal to n+10)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.bridge?.counter_decrease?.(0); // -1
          props.bridge?.counter_decrease?.(0); // -2
          props.bridge?.counter_decrease?.(0); // -3
          props.bridge?.counter_decrease?.(0); // -4
          props.bridge?.counter_decrease?.(0); // -5
          props.bridge?.counter_decrease?.(0); // -6
          props.bridge?.counter_decrease?.(0); // -7
          props.bridge?.counter_decrease?.(0); // -8
          props.bridge?.counter_decrease?.(0); // -9
          props.bridge?.counter_decrease?.(0); // -10
        }}
      >
        <Text style={styles.textStyle}>
          DECREASE x 10 (should be equal to n-10)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.bridge?.counter_increase?.(0, getRandomInt(3))}
      >
        <Text>INCREASE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.bridge?.counter_decrease?.(0)}>
        <Text>DECREASE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CounterScreen;

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

import * as React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

type CellProps = {
  value: string;
  onPress: () => void;
};

export default function Cell({ value, onPress }: CellProps) {
  return (
    <TouchableOpacity
      testID="cellContainer"
      style={styles.container}
      onPress={() => {
        onPress();
      }}
    >
      <Text testID="cellText" style={styles.text}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 20,
    width: 10,
    borderWidth: 1,
    borderColor: "black"
  },
  text: {
    textAlign: "center"
  }
});

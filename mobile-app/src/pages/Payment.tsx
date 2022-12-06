import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Payment = () => {
  return (
    <View style={styles.container}>
      <Text>Payment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Payment;

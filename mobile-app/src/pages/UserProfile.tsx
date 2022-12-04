import { StyleSheet, Text, View, Image } from "react-native";
import IconPointer from "../assets/ic_CurrentLocation.svg";

const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>UserProfile</Text>
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

export default UserProfileScreen;

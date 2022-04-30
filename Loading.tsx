import { ActivityIndicator, StyleSheet, Text } from "react-native";

interface Props {}

export default function Loading(_props: Props) {
  return <ActivityIndicator size="large" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

interface Props {}

export default function AppLoadingView(_props: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={true} color={Colors.black} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

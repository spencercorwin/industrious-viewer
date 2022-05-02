import { StyleSheet, Text, View } from "react-native";

interface Props {
  readonly message: string;
}

export default function ErrorView(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Error: {props.message}</Text>
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

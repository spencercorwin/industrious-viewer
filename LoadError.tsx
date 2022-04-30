import { StyleSheet, Text } from "react-native";

interface Props {
  readonly message: string;
}

export default function LoadError(props: Props) {
  return <Text>Error: {props.message}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

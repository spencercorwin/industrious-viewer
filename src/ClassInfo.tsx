import { ResultData } from "./utils";
import { StyleSheet, Text } from "react-native";

interface Props {
  readonly data: ResultData;
}

export default function ClassInfo({ data }: Props) {
  const open = data?.open ?? 0;
  const available = data?.available ?? 0;
  const taken = available - open;
  const takenText = `${taken} of ${available} taken`;
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const title = `${data.date.toLocaleDateString("en-US", options)} -${" "} ${
    data.isFull ? "Full" : takenText
  }`;

  return <Text style={styles.container}>{title}</Text>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});

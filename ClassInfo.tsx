import { StyleSheet, Text } from "react-native";
import { ResultData } from "./utils";

interface Props {
  readonly data: ResultData;
}

export default function ClassInfo({ data }: Props) {
  const open = data?.open ?? 0;
  const available = data?.available ?? 0;
  const taken = available - open;
  const takenText = `${taken} of ${available} taken`;
  const openText = `${open} of ${available} open`;
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <>
      <Text style={styles.dateStyle}>
        {data.date.toLocaleDateString("en-US", options)} -{" "}
        {data.isFull ? "Full" : takenText}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  dateStyle: {
    margin: 10,
  },
});

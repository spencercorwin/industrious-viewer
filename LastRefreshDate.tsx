import { Text, StyleSheet } from "react-native";

interface Props {
  readonly date?: Date;
}

export default function LastRefreshDate({ date }: Props) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return (
    <Text style={styles.text}>
      Last Refreshed: {date?.toLocaleDateString("en-US", options) ?? "never"}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
  },
});

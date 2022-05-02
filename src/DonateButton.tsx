import { useCallback } from "react";
import { Button, Linking, StyleSheet } from "react-native";

export default function DonateButton() {
  const handlePress = useCallback(async () => {
    await Linking.openURL("https://www.buymeacoffee.com/vfHaFpYNA");
  }, []);

  return <Button title="Buy Me a Coffee" onPress={handlePress} />;
}

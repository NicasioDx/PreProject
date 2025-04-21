import { View, Text, StyleSheet } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>ไม่พบหน้านี้</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
  },
});

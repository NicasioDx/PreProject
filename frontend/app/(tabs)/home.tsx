import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏥 ระบบจองคิวโรงพยาบาลสัตว์</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="🐾 จองคิว"
          onPress={() => router.push("/appointment")}
        />
      </View>


      <View style={styles.buttonContainer}>
        <Button
          title="🐶 เพิ่มประวัติสัตว์เลี้ยง"
          onPress={() => router.push("/create")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 16,
  },
});

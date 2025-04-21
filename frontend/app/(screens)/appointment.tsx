import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

// ข้อมูลเทียมสำหรับจองคิว
const mockAppointments = [
  { date: "2025-05-01", time: "10:00 AM", available: true },
  { date: "2025-05-02", time: "02:00 PM", available: true },
  { date: "2025-05-03", time: "09:00 AM", available: false },
];

export default function AppointmentScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const router = useRouter(); // ใช้ router

  const handleAppointment = () => {
    const appointment = mockAppointments.find(
      (appointment) => appointment.date === selectedDate && appointment.time === selectedTime
    );

    if (appointment && appointment.available) {
      Alert.alert("Appointment Success", `Your appointment is set for ${selectedDate} at ${selectedTime}.`);
      router.push("/screens/profile"); // ไปยังหน้าโปรไฟล์หลังจากจองคิวสำเร็จ
    } else {
      Alert.alert("Appointment Failed", "Selected time is unavailable.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Book an Appointment</Text>
        <TextInput
          style={styles.input}
          placeholder="Select Date (YYYY-MM-DD)"
          value={selectedDate}
          onChangeText={setSelectedDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Select Time (e.g. 10:00 AM)"
          value={selectedTime}
          onChangeText={setSelectedTime}
        />
        <TouchableOpacity style={styles.button} onPress={handleAppointment}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 400,
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

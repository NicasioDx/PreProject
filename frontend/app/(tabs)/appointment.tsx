// frontend/app/(tabs)/appointment.tsx

import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import React from 'react';

export default function AppointmentScreen() {
  const handleBooking = () => {
    Alert.alert('จองคิวสำเร็จ!', 'คุณได้ทำการจองคิวเรียบร้อยแล้ว');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 จองคิวโรงพยาบาลสัตว์</Text>
      <Text style={styles.subtitle}>กรุณาเลือกวันที่และเวลาก่อนจอง</Text>

      {/* ปุ่มจองคิว */}
      <Button title="จองคิวตอนนี้" onPress={handleBooking} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
});

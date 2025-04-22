import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AppointmentScreen() {
  const [selectedService, setSelectedService] = useState<string>('ตรวจโรค');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setSelectedDateTime(date);
    hideDatePicker();
  };

  const handleBooking = async () => {
    if (!selectedDateTime) {
      Alert.alert("กรุณาเลือกวันและเวลา");
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:5000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: selectedService,
          dateTime: selectedDateTime.toISOString(),
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        Alert.alert('✅ จองคิวสำเร็จ!', 
          `คุณจองคิวสำหรับ "${selectedService}" ในวันที่ ${new Date(data.appointment.dateTime).toLocaleString()}`);
      } else if (response.status === 409) {
        Alert.alert('❌ ไม่สามารถจองได้', 'ช่วงเวลานี้มีผู้จองแล้ว กรุณาเลือกเวลาใหม่');
      } else {
        Alert.alert('เกิดข้อผิดพลาด', data.message || 'ไม่สามารถทำรายการได้');
      }
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 จองคิวโรงพยาบาลสัตว์</Text>
      <Text style={styles.label}>เลือกบริการ:</Text>
      <Picker
        selectedValue={selectedService}
        onValueChange={(itemValue) => setSelectedService(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="ตรวจโรค" value="ตรวจโรค" />
        <Picker.Item label="ฉีดวัคซีน" value="ฉีดวัคซีน" />
      </Picker>

      <Text style={styles.label}>เลือกวันและเวลา:</Text>
      <Button title="เลือกวันและเวลา" onPress={showDatePicker} />
      <Text style={styles.selectedTime}>
        {selectedDateTime ? selectedDateTime.toLocaleString() : "ยังไม่ได้เลือก"}
      </Text>

      <Button title="จองคิวตอนนี้" onPress={handleBooking} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />
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
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedTime: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
});

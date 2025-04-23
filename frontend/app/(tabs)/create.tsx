import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { useState } from 'react';

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function AddPet() {
  const [pet, setPet] = useState({
    name: "",
    species: "",
    age: "",
    description: "",
  });

  const handleChange = (key: string, value: string) => {
    setPet({ ...pet, [key]: value });
  };

  const handleSubmit = async () => {
    console.log(pet);
    if (!pet.name || !pet.species || !pet.age || !pet.description) {
      Alert.alert("Error", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
  
    const ageNumber = parseInt(pet.age, 10);
    if (isNaN(ageNumber)) {
      Alert.alert("Error", "กรุณากรอกอายุเป็นตัวเลข");
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/pets`, {
        name: pet.name,
        species: pet.species,
        age: ageNumber,
        description: pet.description,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      Alert.alert("Success", "เพิ่มประวัติสัตว์เลี้ยงเรียบร้อยแล้ว");
      setPet({ name: "", species: "", age: "", description: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
        Alert.alert("Error", error.response?.data?.message || "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
      } else {
        console.error("Unknown Error:", error);
        Alert.alert("Error", "เกิดข้อผิดพลาดบางประการ");
      }
    }
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>เพิ่มประวัติสัตว์เลี้ยง</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อสัตว์เลี้ยง"
        value={pet.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="สายพันธุ์"
        value={pet.species}
        onChangeText={(text) => handleChange("species", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="อายุ"
        value={pet.age}
        onChangeText={(text) => handleChange("age", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="คำอธิบาย"
        value={pet.description}
        onChangeText={(text) => handleChange("description", text)}
      />
      <Button title="บันทึกข้อมูล" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ecfff3",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#333",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function AddPet() {
    const [pet, setPet] = useState({
        name: "",
        species: "",
        age: "",
        description: "",
        image: null as string | null,
    });

    const handleChange = (key: string, value: string) => {
        setPet({ ...pet, [key]: value });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            setPet({ ...pet, image: `data:image/jpeg;base64,${result.assets[0].base64}` });
        }
    };

    const handleSubmit = async () => {
        if (!pet.name || !pet.species || !pet.age || !pet.description || !pet.image) {
            Alert.alert("Error", "กรุณากรอกข้อมูลให้ครบทุกช่องและเลือกรูปภาพ");
            return;
        }

        try {
            await axios.post(`${API_URL}/pets`, pet);
            Alert.alert("Success", "เพิ่มประวัติสัตว์เลี้ยงเรียบร้อยแล้ว");
            setPet({ name: "", species: "", age: "", description: "", image: null });
        } catch (error) {
            console.error("API Error:", error);
            Alert.alert("Error", "ไม่สามารถเพิ่มข้อมูลได้");
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
            <Button title="เลือกรูปภาพ" onPress={pickImage} />
            {pet.image && (
                <Image
                    source={{ uri: pet.image }}
                    style={styles.imagePreview}
                />
            )}
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
    imagePreview: {
        width: "100%",
        height: 200,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
});

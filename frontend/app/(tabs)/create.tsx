import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function Create() {
    const [book, setBook] = useState({
        title: "",
        author: "",
        description: "",
        price: ""
    });

    const handleChange = (Key: string, value: string) => {
        setBook({ ...book, [Key]: value });
    };

    const handleSubmit = async () => {
        if (!book.title || !book.author || !book.description || !book.price) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/books`, {
                title: book.title,
                author: book.author,
                description: book.description,
                price: parseFloat(book.price)
            });

            Alert.alert("Success", "Book created successfully.");
            setBook({ title: "", author: "", description: "", price: "" });
        } catch (error) {
            console.error("API Error:", error);
            Alert.alert("Error", "Failed to create book.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Book</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={book.title}
                onChangeText={(text) => handleChange("title", text)}
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Author"
                value={book.author}
                onChangeText={(text) => handleChange("author", text)}
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={book.description}
                onChangeText={(text) => handleChange("description", text)}
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={book.price}
                onChangeText={(text) => handleChange("price", text)}
            />
            <Button title="Create Book" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#c9ffb",
        justifyContent : 'center',
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
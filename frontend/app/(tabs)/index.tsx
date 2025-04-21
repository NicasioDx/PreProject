import { useRouter } from "expo-router";
import React, { useState, useCallback } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function Index() {
    const router = useRouter();
    const [books, setBooks] = useState<any[]>([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);

    // ดึงข้อมูลหนังสือใหม่ทุกครั้งที่เข้าเพจ
    useFocusEffect(
        useCallback(() => {
            axios
                .get(`${API_URL}/books`)
                .then((response) => setBooks(response.data))
                .catch((error) => console.error("Error fetching books:", error));
        }, [])
    );
    
    // ฟังก์ชันสำหรับลบหนังสือ
    const handleDelete = (id: string) => {
        axios
            .delete(`${API_URL}/books/${id}`)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
            })
            .catch((error) => console.error("Error deleting book:", error));
    };

    // เปิด Modal สำหรับแก้ไข
    const handleEdit = (book: any) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    // ปิด Modal
    const closeModal = () => {
        setModalVisible(false);
        setSelectedBook(null);
    };

    // บันทึกการแก้ไขหนังสือ
    const handleUpdate = () => {
        if (selectedBook) {
            const UpdatedBook = {
                title: selectedBook.title,
                author: selectedBook.author,
                description: selectedBook.description,
                price: selectedBook.price,
            };

            axios.put(`${API_URL}/books/${selectedBook.id}`, UpdatedBook)
                .then(() => {
                    closeModal();
                    setBooks((prevBooks) =>
                        prevBooks.map(book =>
                            book.id === selectedBook.id ? { ...UpdatedBook, id: selectedBook.id } : book
                        )
                    );
                })
                .catch((error) => console.error("Error updating book:", error));
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.bookContainer}>
                        <Text>ชื่อเรื่อง : {item.title}</Text>
                        <Text>ผู้แต่ง : {item.author}</Text>
                        <Text>คำอธิบาย : {item.description}</Text>
                        <Text>ราคา : {item.price}</Text>
                        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                            <Text style={styles.buttonText}>แก้ไข</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                            <Text style={styles.deleteText}>ลบ</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Button title="Go to Profile" onPress={() => router.push('/(screens)/profile')} />
            <Modal visible={isModalVisible} onRequestClose={closeModal} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text>Edit Book</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={selectedBook?.title}
                            onChangeText={(text) => setSelectedBook((prev: any) => ({ ...prev, title: text }))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Author"
                            value={selectedBook?.author}
                            onChangeText={(text) => setSelectedBook((prev: any) => ({ ...prev, author: text }))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={selectedBook?.description}
                            onChangeText={(text) => setSelectedBook((prev: any) => ({ ...prev, description: text }))}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={selectedBook?.price?.toString()}
                            onChangeText={(text) => setSelectedBook((prev: any) => ({ ...prev, price: parseFloat(text) }))}
                        />
                        <Button title="Save Changes" onPress={handleUpdate} />
                        <Button title="Cancel" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    bookContainer: {
        marginBottom: 20,
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        width: "90%",
    },
    buttonText: {
        color: "#fff",
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteText: {
        color: "#fff",
        fontWeight: "bold",
    },
    editButton: {
        backgroundColor: "#0de136",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    input: {
        width: "100%",
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
});
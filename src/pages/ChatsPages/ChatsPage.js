import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';

import data from "./data_demo.json";

import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux"
import { getMe } from '../../redux/thunks/profileThunk';

const ChatsPage = ({ navigation }) => {

    const [loading, setLoading] = useState(true); // 👈 Thêm loading
    const chatData = data;
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const device_id = await Application.getAndroidId();
                console.log("🆔 Device ID:", device_id);

                const customHeaders = {
                    "x-device-id": device_id
                };

                const token = await AsyncStorage.getItem("token");
                console.log("🔐 Token:", token);

                const res = await dispatch(getMe({ customHeaders, token })).unwrap();
                console.log("✅ res:", res);

                if (res.data?.isSetup === false) {
                    console.log("📦 Điều hướng đến UpdateProfile");
                    navigation.navigate("Update profile");
                } else {
                    setLoading(false); // ✅ Xong thì bỏ loading
                }

            } catch (err) {
                console.log("❌ Lỗi lấy thông tin user:", err);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 10 }}>Loading your profile...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.container}>
                    {chatData.map((item) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.chatItem}
                                onPress={() => navigation.navigate("ChatDetail", { chat: item })}
                            >
                                <Image source={{ uri: item.imageAvatar }} style={styles.avatar} />
                                <View style={styles.chatInfo}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.lastMessage}>
                                        {item.messages.length > 0
                                            ? (item.messages[item.messages.length - 1].text.length > 25
                                                ? item.messages[item.messages.length - 1].text.substring(0, 25) + "..."
                                                : item.messages[item.messages.length - 1].text)
                                            : ""}
                                    </Text>
                                </View>
                                <Text style={styles.time}>{item.timeNearest}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

export default ChatsPage;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 5,
        paddingBottom: 30
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginTop: 5,
        marginBottom: 5,
        paddingBottom: 10,
        paddingTop: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    chatInfo: {
        flex: 1
    },
    name: {
        fontSize: 16,
        fontWeight: "bold"
    },
    lastMessage: {
        fontSize: 14,
        color: "#666"
    },
    time: {
        fontSize: 12,
        color: "#999"
    }
});

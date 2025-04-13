import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from '../../redux/thunks/profileThunk'


import * as Application from 'expo-application';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MePage = () => {
    const dispatch = useDispatch()
    const { userProfile, status, error } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchProfile = async () => {
            const device_id = Application.getAndroidId();

            const customHeaders = {
                "x-device-id": device_id
            };

            try {
                const token = await AsyncStorage.getItem("token");
                // console.log("🔐 Token:", token);

                await dispatch(getMe({ customHeaders, token })).unwrap();
            } catch (err) {
                console.log("❌ Lỗi lấy thông tin user:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Đang tải thông tin người dùng...</Text>
            </View>
        )
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Trang cá nhân</Text>
            {userProfile ? (
                <View style={styles.profileContainer}>
                    <Image 
                        source={{ uri: userProfile.data.avatar }} 
                        style={styles.avatar}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{userProfile.data.name}</Text>
                        <Text style={styles.username}>@{userProfile.data.username}</Text>
                        <Text style={styles.bio}>{userProfile.data.bio}</Text>
                        <Text style={styles.info}>📧 Email: {userProfile.data.email}</Text>
                        <Text style={styles.info}>📱 SĐT: {userProfile.data.phone}</Text>
                        <Text style={styles.info}>🎂 Ngày sinh: {formatDate(userProfile.data.birthday)}</Text>
                    </View>
                </View>
            ) : (
                <Text>Không tìm thấy thông tin người dùng.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileContainer: {
        alignItems: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    username: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default MePage

import { View, Text, ActivityIndicator } from 'react-native'
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

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Trang cá nhân</Text>
            {userProfile ? (
                <View style={{ marginTop: 20 }}>
                    <Text>👤 Tên: {userProfile.data.name || 'Chưa có tên'}</Text>
                    {/* Hiển thị thêm thông tin khác nếu có */}
                </View>
            ) : (
                <Text>Không tìm thấy thông tin người dùng.</Text>
            )}
        </View>
    )
}

export default MePage

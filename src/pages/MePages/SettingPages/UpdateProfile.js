import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color_main } from '../../../styleMixins/@minxin';
import { putMe } from '../../../redux/thunks/profileThunk';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Application from 'expo-application';

import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';


const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null); // Thêm state mới


    const dispatch = useDispatch();
    const navigation = useNavigation();


    // Hàm chuyển URI thành Blob
    const uriToBlob = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            return blob;
        } catch (err) {
            console.log('❌ Lỗi chuyển URI sang Blob:', err);
            return null;
        }
    };

    const pickAvatar = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Cần cấp quyền truy cập thư viện ảnh!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: false,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setAvatar(uri);
            
            // Tạo blob từ URI
            const blob = await uriToBlob(uri);
            if (blob) {
                // Tạo FormData object
                const formData = new FormData();
                formData.append('avatar', {
                    uri: uri,
                    type: 'image/jpeg',
                    name: 'avatar.jpg',
                });
                setAvatarFile(formData);
            }
        }
    };

    const handleSubmitUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const device_id = await Application.getAndroidId();

            const customHeaders = {
                "x-device-id": device_id,
                'Content-Type': 'multipart/form-data',
            };

            // Tạo payload với FormData
            const formData = new FormData();
            formData.append('name', name);
            formData.append('bio', bio);
            formData.append('phone', phone);
            if (birthday) {
                formData.append('birthday', new Date(birthday).toISOString().split('T')[0]);
            }
            
            if (avatarFile) {
                formData.append('avatar', avatarFile.get('avatar'));
            }

            // Log chi tiết body
            console.log('📱 Phone:', phone);
            console.log('📝 Form Data Details:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            
            // Log tổng quan
            console.log('📦 Complete Body:', {
                name,
                bio,
                phone,
                birthday: birthday ? new Date(birthday).toISOString().split('T')[0] : null,
                avatar: avatarFile ? 'Has Avatar File' : 'No Avatar'
            });
            console.log('🔑 Token:', token);
            console.log('📋 Headers:', customHeaders);
            
            // Kiểm tra chi tiết của file avatar nếu có
            if (avatarFile) {
                const avatarDetails = avatarFile.get('avatar');
                console.log('🖼️ Avatar File Details:', {
                    uri: avatarDetails.uri,
                    type: avatarDetails.type,
                    name: avatarDetails.name
                });
            }

            const res = await dispatch(putMe({
                data: formData,
                token,
                customHeaders
            })).unwrap();

            console.log("✅ Đã cập nhật:", res);
            if (res.status === "success") {
                navigation.navigate("Chats");
            }
        } catch (err) {
            console.log("❌ Lỗi cập nhật thông tin người dùng:", err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.label}>Avatar</Text>
            <TouchableOpacity style={styles.avatarPicker} onPress={pickAvatar}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatarPreview} />
                ) : (
                    <Text style={{ color: '#888' }}>Choose an image</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Tên</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Nhập tên của bạn"
                style={styles.input}
            />

            <Text style={styles.label}>Giới thiệu</Text>
            <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Giới thiệu bản thân"
                style={styles.input}
            />

            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                style={styles.input}
            />

            <Text style={styles.label}>Ngày sinh</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text style={{ color: birthday ? '#000' : '#888' }}>
                    {birthday ? new Date(birthday).toLocaleDateString() : 'Chọn ngày sinh'}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={birthday ? new Date(birthday) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setBirthday(selectedDate.toISOString());
                    }}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmitUpdate}>
                <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default UpdateProfile;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    button: {
        backgroundColor: color_main,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    avatarPicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        height: 150,
    },
    avatarPreview: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
});

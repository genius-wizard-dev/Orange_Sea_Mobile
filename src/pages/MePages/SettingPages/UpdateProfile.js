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


    const dispatch = useDispatch();
    const navigation = useNavigation();


    const pickAvatar = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: false,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri); // ✅ Lưu URI ảnh
        }
    };


    const handleSubmitUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const device_id = await Application.getAndroidId(); // dùng getAndroidIdAsync nếu bạn cài expo-application >= 5.x

            const customHeaders = {
                "x-device-id": device_id
            };
          

                const payload = {
                    name,
                    bio,
                    phone,
                    birthday: birthday ? new Date(birthday).toISOString().split('T')[0] : null, // -> YYYY-MM-DD
                    avatar: "https://res.cloudinary.com/dubwmognz/image/upload/v1744444587/profile-avatars/profile_67f748a29aa2a56a8cbdcde4.jpg"
                  };
                  

            console.log("up dapte")
            console.log(payload)
            console.log(token)
            console.log(customHeaders)


            const res = await dispatch(putMe({
                data: payload,
                token,
                customHeaders
            })).unwrap();

            console.log("✅ Đã cập nhật:", res);

            if (res.status==="success") {
                navigation.navigate("Chats");
                
            }
        } catch (err) {
            console.log("❌ Lỗi cập nhật thông tin người dùng:", err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cập nhật hồ sơ</Text>

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

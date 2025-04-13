import { View, Text, Alert, TouchableOpacity, StyleSheet  } from 'react-native'
import React from 'react'

import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { stylesMixin } from '../../../styleMixins/@minxin';

const SettingPageIndex = () => {


    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogout = async () => {
        Alert.alert("Xác nhận", "Bạn có chắc muốn đăng xuất?", [
            {
                text: "Huỷ",
                style: "cancel"
            },
            {
                text: "Đăng xuất",
                onPress: async () => {
                    await AsyncStorage.removeItem("token"); // Xoá token nếu có
                    dispatch(logout()); // Reset Redux state
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "splashScreen" }],
                    }); // Quay lại splash để check auth lại từ đầu
                }
            }
        ]);
    };

    const handleChangePassword = () => {
        navigation.navigate('Change password');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Settings</Text>
            <View style={styles.content}>
                <TouchableOpacity 
                    style={[stylesMixin.buttonComponent, styles.btnChangePassword]} 
                    onPress={handleChangePassword}
                >
                    <Text style={styles.textBtn}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[stylesMixin.buttonComponent, styles.btnSetLogout]} 
                    onPress={handleLogout}
                >
                    <Text style={styles.textBtnLog}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SettingPageIndex;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSetLogout: {
        backgroundColor: '#ff4757',
        width: '80%',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    textBtnLog: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    },
    btnChangePassword: {
        backgroundColor: '#2196F3',
        width: '80%',
        borderRadius: 10,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    textBtn: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    }
})
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


    return (
        <View>
            <Text>SettingPageIndex</Text>
             <TouchableOpacity style={[stylesMixin.buttonComponent, styles.btnSetLogout]} onPress={handleLogout}>
                <Text style={styles.textBtnLog}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingPageIndex;

const styles = StyleSheet.create({
    btnSetLogout:{
        backgroundColor:"#a0a0a0"
    },
    textBtnLog: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500"
    }
})
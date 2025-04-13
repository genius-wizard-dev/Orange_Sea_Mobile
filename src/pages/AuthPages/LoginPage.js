import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket'
import { stylesMixin } from '../../styleMixins/@minxin';
import OceanBackground from '../../components/OceanBackground';

import Spinner from 'react-native-loading-spinner-overlay';

import { useDispatch, useSelector } from 'react-redux'

import * as Application from 'expo-application';


import { Alert } from 'react-native';
import { loginUser } from '../../redux/thunks/authThunk';

const LoginPage = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const passwordInputRef = useRef(null);

    const dispatch = useDispatch();

    const generateRandomToken = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 16; i++) {  // 16 ký tự dài để token khó trùng
            const randomIndex = Math.floor(Math.random() * chars.length);
            token += chars[randomIndex];
        }
        return token;
    };


    const handleLogin = async () => {


        // console.log(Application.getAndroidId())
        const device_id = Application.getAndroidId()


        if (!username || !password) {
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const body = {
            username,
            password
        };

        const customHeaders = {
            "x-device-id": device_id,
            "x-fcm-token": generateRandomToken()
        };

        try {
            setLoading(true);
            const res = await dispatch(loginUser({ body, customHeaders })).unwrap();
            // console.log(res);

            // Alert.alert(res?.message || "Đăng nhập thành công!");

            if (res.status) {
                navigation.navigate("Chats", body, res);
            }

        } catch (err) {
            if (err?.status !== 401) {
                Alert.alert(err?.message || "Có lỗi xảy ra.");
            }
            console.log("Lỗi đăng nhập:", err); 
        } finally {
            setLoading(false);
        }


    }




    return (
        <View style={styles.container}>
            <OceanBackground />
            <Spinner
                visible={loading}
                textContent={'Đang tải...'}
                textStyle={{ color: '#fff' }}
            />
            <View style={{ flexDirection: "column", height: "100%" }}>
                <Text style={styles.textAlert}>Sign in and start using awesome stuff!</Text>
                <View style={{ flexGrow: 1 }}>
                    <View>
                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current?.focus()}
                        />

                        <TextInput
                            ref={passwordInputRef}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.fgPassword} onPress={()=>navigation.navigate("Forgot password")}>
                            <Text style={styles.fgPassword}>Forgot password</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={styles.lineBtn}>
                    <TouchableOpacity style={[stylesMixin.buttonComponent, styles.btnSetLog]} onPress={handleLogin}>
                        <View>
                            <Text style={[styles.textBtn]}>LOGIN</Text>
                            {/* <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#fff" }} size={20} /> */}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    textAlert: {
        textAlign: "center",
        fontWeight: "400",
        paddingTop: 10,
        marginBottom: 10,
        fontSize: 15
    },

    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        fontSize: 16,
        backgroundColor: "#ffffff"
    },

    fgPassword: {
        marginTop: 10,
        color: "#0f8ff7",
        fontWeight: "500",
        fontSize: 15
    },
    lineBtn: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    btnSetLog: {
        width: "100%",
    },
    textBtn: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500"
    }



})
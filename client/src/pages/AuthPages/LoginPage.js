import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket'
import { stylesMixin } from '../../styleMixins/@minxin';
import OceanBackground from '../../components/OceanBackground';

import Spinner from 'react-native-loading-spinner-overlay';


// import DeviceInfo from 'react-native-device-info';
// import * as Device from 'expo-device';
import * as Application from 'expo-application';

// import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
// import { Platform } from 'react-native';


import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert } from 'react-native';


export async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return null;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('📱 Expo Push Token (FCM token):', token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
        });
    }

    return token;
}

const LoginPage = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const passwordInputRef = useRef(null);


    const handleLogin = () => {


        // console.log(Application.getAndroidId())
        const device_id = Application.getAndroidId()


        if (!username || !password) {
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const data = {
            username: username,
            password: password,
            "x-device-id": device_id
        };
        console.log(data)

        // try {
        //     setLoading(true)
        //     const res = await dispatch(verifyOTP(data)).unwrap();
        //     console.log(res)
        //     Alert.alert(res?.message || "Có lỗi xảy ra.");

        //     if (res.status) {
        //         navigation.navigate("Verify OTP", email);
        //         setLoading(false);

        //     }


        // } catch (err) {
        //     Alert.alert(res?.message || "Có lỗi xảy ra.");
        // }

    }
    const useFCMToken = () => {
        useEffect(() => {
            const getToken = async () => {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (enabled) {
                    const token = await messaging().getToken();
                    console.log('✅ FCM Token:', token);
                    Alert.alert("FCM Token", token);
                } else {
                    console.log("❌ Permission not granted");
                }
            };

            getToken();
        }, []);
    };
    useFCMToken()


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
                        <TouchableOpacity style={styles.fgPassword}>
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
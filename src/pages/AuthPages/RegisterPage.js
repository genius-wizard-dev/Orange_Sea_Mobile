import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import OceanBackground from '../../components/OceanBackground'
import { Checkbox } from 'react-native-paper';
import { stylesMixin } from '../../styleMixins/@minxin';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/thunks/authThunk';

import Spinner from 'react-native-loading-spinner-overlay';



const RegisterPage = ({ navigation }) => {


    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // const { user } = useSelector(state => state.user);


    const [checked, setChecked] = React.useState(false);

    const passwordInputRef = useRef(null);



    const handleRegister = async () => {
        if (!username || !password || !email || !confirmPassword) {
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Thông báo", "Mật khẩu không khớp.");
            return;
        }

        if (!checked) {
            Alert.alert("Thông báo", "Bạn phải đồng ý với điều khoản.");
            return;
        }

        const data = {
            username,
            password,
            email,
        };

        try {
            setLoading(true)
            const res = await dispatch(registerUser(data)).unwrap();
            // console.log("dk");
            // console.log(res);



            Alert.alert(res?.message || "Có lỗi xảy ra.");

            if (res.status) {
                navigation.navigate("Verify OTP", email);
                // setLoading(false)
            }


        } catch (err) {
            console.log("❌ Lỗi khi đăng ký:", err);
            Alert.alert(err?.message || "Có lỗi xảy ra khi đăng ký.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <View style={styles.container}>
            <OceanBackground />
            <Spinner
                visible={loading}
                textContent={'Đang tải...'}
                textStyle={{ color: '#fff' }}
            />
            <View style={{ flexDirection: "column", height: "100%" }}>
                <Text style={styles.textAlert}>One step away from something great!</Text>
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
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
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
                        <TextInput
                            ref={passwordInputRef}
                            placeholder="Confirm password"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.textInput}
                        />

                    </View>
                    <View>
                        <View style={styles.fgPassword}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => setChecked(!checked)}
                            />

                            <Text style={styles.text_dk} onPress={() => setChecked(!checked)}>By signing up, you agree to our Terms</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.lineBtn}>
                    <TouchableOpacity style={[stylesMixin.buttonComponent, styles.btnSetLog]} onPress={handleRegister}>
                        <View>
                            <Text style={[styles.textBtn]}>CONTINUTE</Text>
                            {/* <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#fff" }} size={20} /> */}
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )
}

export default RegisterPage


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
        flexDirection: "row"
    },
    text_dk: {
        color: "#0f8ff7",
        fontWeight: "500",
        fontSize: 15,
        marginTop: 8
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
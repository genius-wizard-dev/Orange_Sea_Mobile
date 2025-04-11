import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket'
import { stylesMixin } from '../../styleMixins/@minxin';
import OceanBackground from '../../components/OceanBackground';


const LoginPage = ({ navigation }) => {

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const passwordInputRef = useRef(null);

    return (
        <View style={styles.container}>
            <OceanBackground />
            <View style={{ flexDirection: "column", height: "100%" }}>
                <Text style={styles.textAlert}>Nhập số điện thoại và mật khẩu để sử dụng</Text>
                <View style={{ flexGrow: 1 }}>
                    <View>
                        <TextInput
                            placeholder="Số điện thoại"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current?.focus()}
                        />

                        <TextInput
                            ref={passwordInputRef}
                            placeholder="Mật khẩu"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.fgPassword}>
                            <Text style={styles.fgPassword}>Quên mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={styles.lineBtn}>
                    <TouchableOpacity style={[stylesMixin.buttonComponent, styles.btnSetLog]} onPress={() => navigation.navigate("Chats")}>
                        <View>
                            {/* <Text style={[styles.textBtn]}>Đăng nhập</Text> */}
                            <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#fff" }} size={20} />
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
        borderRadius: 10,
        marginTop: 20,
        fontSize: 17,
        backgroundColor: "#eeeeee"
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
        // width: 50,
        padding: 15,
        borderRadius: "100%"
    },
    textBtn: {
        color: "#fff",
        fontSize: 20,
    }




})
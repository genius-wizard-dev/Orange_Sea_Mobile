import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import OceanBackground from '../../components/OceanBackground';
import { TextInput } from 'react-native-paper';
import { stylesMixin } from '../../styleMixins/@minxin';
import { verifyOTP } from '../../redux/thunks/authThunk';

import Spinner from 'react-native-loading-spinner-overlay';

const GetOTPPage = ({ navigation, route }) => {

    const email = route.params;

    const dispatch = useDispatch();

    const [otp, setOTP] = useState('');
     const [loading, setLoading] = useState(false);

    // const { user } = useSelector(state => state.user);



    const handleRegister = async () => {
        if (!otp) {
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin.");
            return;
        }


        const data = {
            email: email,
            otp
        };

        try {
            setLoading(true)
            const res = await dispatch(verifyOTP(data)).unwrap();
            console.log(res)
            Alert.alert(res?.message || "Có lỗi xảy ra.");

            if(res.status){
                navigation.navigate("Verify OTP",email);
                setLoading(false);

            }


        } catch (err) {
            Alert.alert(res?.message || "Có lỗi xảy ra.");
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
                <Text style={styles.textAlert}>Send email : {email}</Text>
                <View style={{ flexGrow: 1 }}>
                    <View>
                        <TextInput
                            placeholder="Enter OTP"
                            keyboardType="phone-pad"
                            value={otp}
                            onChangeText={setOTP}
                            style={styles.textInput}
                            returnKeyType="next"
                        />


                    </View>

                </View>

                <View style={styles.lineBtn}>
                    <TouchableOpacity style={[stylesMixin.buttonComponent, styles.btnSetLog]} onPress={handleRegister}>
                        <View>
                            <Text style={[styles.textBtn]}>CREATE ACCOUNT</Text>
                            {/* <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#fff" }} size={20} /> */}
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )
}

export default GetOTPPage


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
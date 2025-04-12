import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { jwtDecode } from "jwt-decode";
// import { useDispatch } from "react-redux";


const logo_img = require("../../../assets/logo_icon_text.png")


const SplashScreenComponent = ({ navigation }) => {


    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = await AsyncStorage.getItem("token");
    //         if (!token) return;

    //         try {
    //             const decoded = jwtDecode(token);
    //             if (decoded.exp * 1000 > Date.now()) {
    //                 const user = decoded.user || {};
    //                 dispatch(loginSuccess({ token, user }));
    //             }
    //         } catch (e) {
    //             console.log("Token không hợp lệ:", e);
    //         }
    //     };

    //     checkToken();
    // }, []);



    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('ContainerAuthPage');
        }, 900);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} style="dark" />
            {/* <Text style={styles.text}>INTRO</Text> */}
            <Image source={logo_img} style={styles.img_logo} />
        </View>
    )
}

export default SplashScreenComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ff6666',
        backgroundColor: '#fff',
        padding: 30
    },
    img_logo: {
        width: "75%",
        objectFit: "contain",
        borderRadius: 20
    },
    text: {
        color: "#fff",
        fontSize: 35,
        fontWeight: "700",
    },
});
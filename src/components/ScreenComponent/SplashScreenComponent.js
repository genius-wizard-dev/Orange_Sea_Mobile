import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo_img = require("../../../assets/logo_icon_text.png")

const SplashScreenComponent = ({ navigation }) => {

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            return token;
        } catch (error) {
            return null;
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await getToken();

                setTimeout(() => {
                    if (token) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Chats' }],
                        });
                    } else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'ContainerAuthPage' }],
                        });
                    }
                }, 800);
            } catch (error) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ContainerAuthPage' }],
                });
            }
        };

        checkAuth();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} style="dark" />
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
        backgroundColor: '#fff',
        padding: 30
    },
    img_logo: {
        width: "75%",
        objectFit: "contain",
        borderRadius: 20
    },
});

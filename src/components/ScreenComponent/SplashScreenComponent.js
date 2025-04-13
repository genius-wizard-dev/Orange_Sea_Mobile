import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from "jwt-decode"

const logo_img = require("../../../assets/logo_icon_text.png")

const SplashScreenComponent = ({ navigation }) => {

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("token")
            return token
        } catch (error) {
            return null
        }
    }

    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token)
            const currentTime = Date.now() / 1000 // tính bằng giây
            return decoded.exp && decoded.exp > currentTime
        } catch (e) {
            return false
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await getToken()
                const valid = isTokenValid(token)

                setTimeout(() => {
                    if (token && valid) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Chats' }],
                        })
                    } else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'ContainerAuthPage' }],
                        })
                    }
                }, 800)
            } catch (error) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ContainerAuthPage' }],
                })
            }
        }

        checkAuth()
    }, [])

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
})

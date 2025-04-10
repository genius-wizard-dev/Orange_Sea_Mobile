import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'

const logo_img = require("../../../assets/logo_icon_text.png")


const SplashScreenComponent = ({ navigation }) => {
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
                <Image source={logo_img} style={styles.img_logo}/>
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
        borderRadius:20
    },
    text: {
        color: "#fff",
        fontSize: 35,
        fontWeight: "700",
    },
});
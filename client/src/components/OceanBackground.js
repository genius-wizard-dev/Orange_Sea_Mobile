import React, { useRef, useEffect } from 'react';
import { View, Dimensions, Animated, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const OceanBackground = () => {
    const translateX1 = useRef(new Animated.Value(0)).current;
    const translateX2 = useRef(new Animated.Value(0)).current;
    const translateX3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animateWave(translateX1, 8000); // 30s
        animateWave(translateX2, 8200); // 32s
        animateWave(translateX3, 8800); // 38s
    }, []);

    const animateWave = (animatedValue, duration) => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: -width,
                    duration,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    return (
        <View style={styles.container}>
            {/* Mặt trời */}
            <View style={styles.sun} />

            {/* 3 lớp sóng */}
            <View style={styles.ocean}>
                <Animated.View style={{ ...styles.wave, transform: [{ translateX: translateX1 }] }}>
                    <Svg viewBox="0 0 1440 320" preserveAspectRatio="none" width={width * 2} height="100%">
                        <Path
                            fill="rgba(0, 119, 190, 0.15)"
                            d="M0,160L48,154.7C96,149,192,139,288,138.7C384,139,480,149,576,144C672,139,768,117,864,117.3C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,320L0,320Z"
                        />
                    </Svg>
                </Animated.View>

                <Animated.View style={{ ...styles.wave, transform: [{ translateX: translateX2 }] }}>
                    <Svg viewBox="0 0 1440 320" preserveAspectRatio="none" width={width * 2} height="100%">
                        <Path
                            fill="rgba(0, 119, 190, 0.05)"
                            d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,154.7C672,149,768,139,864,144C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L0,320Z"
                        />
                    </Svg>
                </Animated.View>

                <Animated.View style={{ ...styles.wave, transform: [{ translateX: translateX3 }] }}>
                    <Svg viewBox="0 0 1440 320" preserveAspectRatio="none" width={width * 2} height="100%">
                        <Path
                            fill="rgba(0, 119, 190, 0.09)"
                            d="M0,160L48,149.3C96,139,192,117,288,122.7C384,128,480,160,576,176C672,192,768,192,864,186.7C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L0,320Z"
                        />
                    </Svg>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -50,
    },
    sun: {
        position: 'absolute',
        top: 110,
        left: width / 2 - 250,
        width: 500,
        height: 500,
        borderRadius: 450,
        backgroundColor: '#ffe7d6',
        zIndex: -20,
    },
    ocean: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '40%',
        overflow: 'hidden',
        zIndex: -10,
    },
    wave: {
        position: 'absolute',
        width: '200%',
        height: '100%',
    },
});

export default OceanBackground;

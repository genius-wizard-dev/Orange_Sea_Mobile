import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { color_main } from '../../styleMixins/@minxin';
import authServiceInstance from '../../config/axios.config';
import ENDPOINT from '../../constants/endpoint';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = async () => {
        try {
            if (!email.trim()) {
                Alert.alert("Warning", "Please enter your email.");
                return;
            }

            if (!validateEmail(email)) {
                Alert.alert("Warning", "Please enter a valid email address.");
                return;
            }

            setLoading(true);
            
            const response = await authServiceInstance.post(ENDPOINT.FORGOT_PASSWORD, { 
                email: email 
            });

            console.log('API Response:', response);
            Alert.alert("Success", "Password reset instructions sent to your email.", [
                { text: "OK", onPress: () => navigation.navigate('Login') }
            ]);
            
        } catch (error) {
            console.log('Error details:', {
                message: error.message,
                customMessage: error.customMessage,
                response: error.response?.data
            });

            Alert.alert(
                "Error", 
                error.customMessage || error.response?.data?.message || "Failed to send reset email. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />

            <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetPassword}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.resetButtonText}>Reset Password</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16
    },
    resetButton: {
        backgroundColor: color_main,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});

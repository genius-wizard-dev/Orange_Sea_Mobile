import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { color_main } from '../../styleMixins/@minxin';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleGetCode = () => {
        if (!email) {
            Alert.alert("Warning", "Please enter your email.");
            return;
        }

        // TODO: Call API to send reset code here

        setCodeSent(true);
        Alert.alert("Success", "Verification code sent to your email.");
    };

    const handleResetPassword = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Warning", "Please fill in all password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        // TODO: Call API to reset password here

        Alert.alert("Success", "Your password has been reset.");
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Forgot Password</Text> */}

            <View style={styles.row}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.codeButton} onPress={handleGetCode}>
                    <Text style={styles.codeButtonText}>Get Code</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={[styles.input, !codeSent && styles.disabledInput]}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                editable={codeSent}
            />

            <TextInput
                style={[styles.input, !codeSent && styles.disabledInput]}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={codeSent}
            />

            <TouchableOpacity
                style={[styles.resetButton, !codeSent && styles.disabledButton]}
                onPress={handleResetPassword}
                disabled={!codeSent}
            >
                <Text style={styles.resetButtonText}>Reset Password</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
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
    disabledInput: {
        backgroundColor: '#eee',
    },
    codeButton: {
        marginLeft: 10,
        marginTop:-15,
        backgroundColor:color_main,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    codeButtonText: {
        color: '#fff',
        fontWeight: '600',
        backgroundColor:color_main
    },
    resetButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    disabledButton: {
        backgroundColor: '#aaa'
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});

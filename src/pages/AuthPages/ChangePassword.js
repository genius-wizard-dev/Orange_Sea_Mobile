import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TextInput } from 'react-native-paper'
import axios from 'axios'
import ENDPOINT from '../../constants/endpoint'
import authServiceInstance from '../../config/axios.config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from 'expo-application';

const ChangePassword = ({ navigation }) => {
  const { userProfile } = useSelector(state => state.profile)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async () => {
    try {
      console.log('Starting password change process...')
      setLoading(true)
      setError('')

      if (!formData.currentPassword || !formData.newPassword) {
        setError('Please fill all fields')
        return
      }

      const device_id = Application.getAndroidId();
      const token = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          "x-device-id": device_id,
          "Authorization": `Bearer ${token}`
        }
      };

      const endpoint = ENDPOINT.CHANGE_PASSWORD(userProfile.data.accountID)
      console.log('Endpoint:', endpoint)
      console.log('Request config:', config)

      const response = await authServiceInstance.put(endpoint, formData, config)
      console.log('Success Response:', response.data)

      if (response.data) {
        navigation.goBack()
      }
    } catch (err) {
      console.error('Password change failed:', {
        error: err,
        status: err.response?.status,
        data: err.response?.data,
        networkError: err.message === 'Network Error'
      })

      if (err.response?.status === 401) {
        setError('Session expired. Please login again.')
      } else if (err.message === 'Network Error') {
        setError('Cannot connect to server. Please check your internet connection.')
      } else {
        setError(err.response?.data?.message || 'Failed to change password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Current Password"
        secureTextEntry
        value={formData.currentPassword}
        onChangeText={(text) => setFormData({...formData, currentPassword: text})}
      />
      <TextInput
        style={styles.input}
        label="New Password"
        secureTextEntry
        value={formData.newPassword}
        onChangeText={(text) => setFormData({...formData, newPassword: text})}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleChangePassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Updating...' : 'Change Password'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  input: {
    marginBottom: 15
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    marginTop: 10
  }
})
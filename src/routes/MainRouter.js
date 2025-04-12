import React from 'react'

const Stack = createStackNavigator();

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
//pages

import SplashScreenComponent from '../components/ScreenComponent/SplashScreenComponent.js';
import MainView from '../components/MainView';
import ChatsPage from '../pages/ChatsPages/ChatsPage';
import ContactsPage from '../pages/ContactsPages/ContactsPage';
import TimeLinePage from '../pages/TimeLinePages/TimeLinePage';
import MePage from '../pages/MePages/MePage';
import SearchPage from '../pages/SearchPages/SearchPageIndex';
import LoginPage from '../pages/AuthPages/LoginPage';
import ContainerAuthPages from '../pages/AuthPages/ContainerAuthPages';
import RegisterPage from '../pages/AuthPages/RegisterPage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons/faCircleChevronLeft'
import SettingPageIndex from '../pages/MePages/SettingPages/SettingPageIndex';
import SearchPageIndex from '../pages/SearchPages/SearchPageIndex';
import ChatDetailScreenIndex from '../pages/ChatsPages/ChatDetailScreen/ChatDetailScreenIndex';
import { color_main } from '../styleMixins/@minxin';
import GetOTPPage from '../pages/AuthPages/GetOTPPage.js';

const MainRouter = () => {
  return (
    <NavigationContainer>

    {/* <StatusBar style='auto'/> */}

    <Stack.Navigator
      initialRouteName="splashScreen"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 18 }}
          >
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              size={26}
              style={{ color: "#ffffff" }}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: color_main,
          height: 48
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
        },
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="splashScreen"
        component={SplashScreenComponent}
        options={{ headerShown: false }} />

      <Stack.Screen name="Chats"
        component={MainView}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Contacts"
        component={ContactsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TimeLine"
        component={TimeLinePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Me"
        component={MePage}
        options={{ headerShown: false }}
      />


      <Stack.Screen name="ContainerAuthPage"
        component={ContainerAuthPages}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Login"
        component={LoginPage}
      />
      <Stack.Screen name="Register"
        component={RegisterPage}
      />

      <Stack.Screen name="Verify OTP"
        component={GetOTPPage}
      />


      <Stack.Screen name="SearchPage"
        component={SearchPageIndex}
        options={{ headerShown: false, animation: "none" }}
      />


      <Stack.Screen name="Setting"
        component={SettingPageIndex}
      />

      <Stack.Screen name="ChatDetail"
        component={ChatDetailScreenIndex}
        options={{
          headerShown: false,
          //  animation:"none" 
        }}
      />





    </Stack.Navigator>


    {/* 
  <View style={styles.container}>
    <Text>Phong</Text>
    
  </View> */}
  </NavigationContainer>
  )
}

export default MainRouter;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
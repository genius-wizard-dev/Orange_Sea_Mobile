import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HeaderSearchComponent from './HeaderSearchComponent/HeaderSearchComponent'
import MenuComponent from './MenuComponent/MenuComponent'

const MainView = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderSearchComponent navigation={navigation}/>
            <MenuComponent navigation={navigation}/>
        </View>
    )
}

export default MainView


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "100%",
        position: "relative",
    },
    text: {
        color: "red"
    }

});
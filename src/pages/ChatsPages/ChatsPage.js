import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import data from "./data_demo.json"

const ChatsPage = ({ navigation }) => {

    // const ARRAY_LIST_MESSAGE_DEMO = 
    const chatData = data;

    return (
        <View style={styles.container}>
            {/* <View >
                <TouchableOpacity style={styles.tab_tag}>
                    <Text style={styles.text_tag}>Ưu tiên</Text>
                </TouchableOpacity>
            </View> */}
            <View>
                <View style={styles.container}>
                    {
                        chatData.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.chatItem}
                                    onPress={() => navigation.navigate("ChatDetail", { chat: item ,navigation})}
                                >
                                    <Image source={{ uri: item.imageAvatar }} style={styles.avatar} />
                                    <View style={styles.chatInfo}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.lastMessage}>
                                            {item.messages.length > 0
                                                ? (item.messages[item.messages.length - 1].text.length > 25
                                                    ? item.messages[item.messages.length - 1].text.substring(0, 25) + "..."
                                                    : item.messages[item.messages.length - 1].text)
                                                : ""}
                                        </Text>
                                    </View>
                                    <Text style={styles.time}>{item.timeNearest}</Text>
                                </TouchableOpacity>
                            )
                        })}

                </View>
            </View>
        </View>
    )
}

export default ChatsPage


const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding:5,
        paddingBottom:30
    },
    
    tab_tag:{
        paddingTop:10,
        paddingBottom:10,
        borderBottomColor:"#ffcccc",
        borderBottomWidth:2
    },
    text_tag:{
        fontWeight:"400",
        fontSize:18
    },

    text: {
        color: '#ffffff',
        textAlign: "center"
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginTop:5,
        marginBottom:5,
        paddingBottom:10,
        paddingTop:10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    chatInfo: {
        flex: 1
    },
    name: {
        fontSize: 16,
        fontWeight: "bold"
    },
    lastMessage: {
        fontSize: 14,
        color: "#666"
    },
    time: {
        fontSize: 12,
        color: "#999"
    }
});
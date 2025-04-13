import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { color_main, stylesMixin } from '../../../styleMixins/@minxin';


const ChatDetailScreenIndex = ({ route, navigation }) => {
    const { chat } = route.params;

    const handleGoBackChatIndex = () => {
        navigation.goBack()
    }

    // console.log(chat.imageAvatar)

    return (
        <View style={styles.container}>
            <View style={styles.lineFlex}>
                <View style={styles.line_crl}>
                    <TouchableOpacity onPress={handleGoBackChatIndex}>
                        <FontAwesomeIcon icon={faArrowLeft} size={22} style={styles.color_icon} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.text_name_titile}>{chat.name}</Text>
                    </View>
                </View>
                <View style={styles.line_crl}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faPhone} size={22} style={[styles.color_icon, styles.btnCall]} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faList} size={22} style={styles.color_icon} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                chat.messages.map((item) => {
                    return (
                        <View style={[styles.messageContainer, item.sender === "me" ? styles.myMessage : styles.theirMessage]}
                            key={item.time}>
                            {item.sender === "me" ? undefined :<Image source={{ uri: chat.imageAvatar }} style={styles.img_avt_rev} />}
                            <View>

                                <Text style={styles.messageText}>{item.text}</Text>
                                <Text style={styles.messageTime}>{item.time}</Text>
                            </View>
                        </View>
                    )
                })
            }

        </View>
    )
}

export default ChatDetailScreenIndex;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    messageContainer: { maxWidth: "70%", padding: 15, borderRadius: 10, marginVertical: 5 },
    myMessage: { alignSelf: "flex-end", backgroundColor: "#dcf8c6" },
    theirMessage: { alignSelf: "flex-start", backgroundColor: "#f1f1f1" },
    messageText: { fontSize: 16 },
    messageTime: { fontSize: 12, textAlign: "right", color: "#666", marginTop: 5 },
    img_avt_rev: { width: 30, height: 30, borderRadius:50 },


    lineFlex: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: color_main,
        padding: 10
    },
    line_crl: {
        flexDirection: "row"
    },
    text_name_titile: {
        fontSize: 17,
        color: "#fff",
        fontWeight: "700",
        marginLeft: 15
    },
    color_icon: {
        color: "#fff"
    },
    btnCall: {
        marginRight: 15
    }
});
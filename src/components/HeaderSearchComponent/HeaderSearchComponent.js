import { View, Text, StyleSheet, Touchable, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import MeHeaderComponent from './MeHeaderComponent';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { color_main, stylesMixin } from '../../styleMixins/@minxin';

const HeaderSearchComponent = ({ navigation }) => {


    const route = useRoute();
    const screenName = route.params?.screenName || 'Chats';

    const renderConponentSelectHeader = () => {
        if (screenName === "Me") {
            return <MeHeaderComponent navigation={navigation} />
        }
    }

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SearchPage")}>
                <View style={styles.lineSeNavi} >
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={18} style={{ marginTop: 5, color: "#fff" }} />
                    <View>
                        <Text style={styles.textSeNavi}>Tìm kiếm</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                {renderConponentSelectHeader()}
            </View>
        </View>
    )
}

export default HeaderSearchComponent


const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: 50,
        backgroundColor: color_main,
        justifyContent: "space-between",
        padding: 10,
        paddingRight: 15,
        paddingLeft: 15,
        flexDirection: "row",
        borderBottomColor: "#eaeaea",
        borderWidth: 1
    },
    lineSeNavi: {
        height: "100%",
        flexDirection: "row",
        justifyContent: "center"
    },
    textSeNavi: {
        marginLeft: 15,
        fontSize: 16,
        marginTop: 5,
        color: "#fff"
    }
})
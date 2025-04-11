import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import ChatsPage from '../../pages/ChatsPages/ChatsPage';
import ContactsPage from '../../pages/ContactsPages/ContactsPage';
import TimeLinePage from '../../pages/TimeLinePages/TimeLinePage';
import MePage from '../../pages/MePages/MePage';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook'
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { color_main } from '../../styleMixins/@minxin';

const MenuComponent = ({ navigation }) => {
    const ARRAY_LIST_MENU = [
        { key: "Chats", label: "Tin nhắn", icon: faComment },
        { key: "Contacts", label: "Liên hệ", icon: faAddressBook },
        { key: "TimeLine", label: "Kết nối", icon: faGlobe },
        { key: "Me", label: "Cá nhân", icon: faUser },
    ];

    const [currentScreen, setCurrentScreen] = useState('Chats');

    const handleTabPress = (tabKey) => {
        setCurrentScreen(tabKey);
        // Cập nhật params của route khi nhấn menu
        navigation.setParams({ screenName: tabKey });
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'Chats':
                return <ChatsPage navigation={navigation} />;
            case 'Contacts':
                return <ContactsPage />;
            case 'TimeLine':
                return <TimeLinePage />;
            case 'Me':
                return <MePage />;
            default:
                return <ChatsPage />;
        }
    };

    return (
        <>
            <ScrollView style={styles.mainView}>
                {renderScreen()}
            </ScrollView>

            <View style={styles.boxMenu}>
                <View style={styles.bottomTab}>
                    {ARRAY_LIST_MENU.map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={() => handleTabPress(tab.key)}
                            style={[
                                styles.tabItem,
                                currentScreen === tab.key && styles.activeTabItem
                            ]}
                        >

                            <FontAwesomeIcon
                                icon={tab.icon}
                                style={currentScreen === tab.key ? styles.activeTabIcon : styles.styleIcon}
                                size={currentScreen === tab.key ? 18 : 24}
                            />
                            {currentScreen === tab.key && (
                                <Text style={[styles.tabText, styles.activeTabText]}>
                                    {tab.label}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </>
    );
};

export default MenuComponent;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // marginTop: 49,
        backgroundColor: "#ededed",
    },
    boxMenu: {
        width: "100%",
        position: "absolute",
        bottom: 0,
    },
    bottomTab: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#d1d1d1',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        position: "relative",
        zIndex: 2
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    activeTabItem: {
        borderRadius: 8,
        fontSize: 0
    },
    tabText: {
        fontSize: 12,
        color: '#565655',
    },
    activeTabText: {
        color: color_main,
        fontWeight: '700',
    },
    styleIcon:{
        color: "#b7b2b2"
    },
    activeTabIcon:{
        color: color_main,
        marginBottom:4
    }
});
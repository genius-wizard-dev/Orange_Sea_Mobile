import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'

const MeHeaderComponent = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={()=> navigation.navigate("Cài đặt")}>
                <FontAwesomeIcon icon={faGear} size={25} style={{color:"#fff"}}/>
            </TouchableOpacity>
        </View>
    )
}

export default MeHeaderComponent
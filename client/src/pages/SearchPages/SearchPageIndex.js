import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SearchPageIndex = () => {
    const navi = useNavigation()
    return (
        <View>
            <Text>SearchPageIndex</Text>
            <TouchableOpacity onPress={()=>navi.goBack()}>
                <Text>Quay lai</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SearchPageIndex
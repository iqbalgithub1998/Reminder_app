import React from 'react'
import { StyleSheet, View,TouchableWithoutFeedback } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons';
const ListItemDeleteAction = ({deletePress}) => {
    return (
        <TouchableWithoutFeedback onPress={deletePress}>
            <View style={styles.container}>
            <MaterialIcons style={styles.icon} name="delete-outline" size={40} color="#ff4444" />
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#F7F7F7",
        width:60,
        justifyContent: "center",
    },
})

export default ListItemDeleteAction


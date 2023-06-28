import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../misc/Colors';

const Note = ({item, onPress}) => {
    const {title, description} = item;

  return (

    <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.description} numberOfLines={4}>{description}</Text>
        </View>
    </TouchableOpacity>
   
  )
}

export default Note

const width = Dimensions.get('window').width -40;
const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.PRIMARY,
        width: width/2 -10,
        padding: 8,
        borderRadius: 10,
        marginTop: 10,
    },
    title:{
        fontWeight: "bold",
        fontSize: 16,
    },
    description:{

    },
})
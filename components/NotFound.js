import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.notFoundText}>No Notes Found...</Text>
    </View>
  )
}

export default NotFound

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    notFoundText:{
        color: "grey",
        opacity: 0.6,
    }

})
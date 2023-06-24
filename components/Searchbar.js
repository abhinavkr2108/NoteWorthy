import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Colors from '../misc/Colors'

const Searchbar = () => {
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar}
        placeholder="Search Notes...">

      </TextInput>
    </View>
  )
}

export default Searchbar

const styles = StyleSheet.create({
    container:{
        zIndex: 1,
    },
    searchBar:{
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        height: 40,
        padding: 10,
        borderRadius: 40,
        fontSize: 15,
        marginTop: 10,
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'

const SampleScreen = (props) => {
  return (
    <View style= {styles.container}>
      <Text>SampleScreen</Text>
      <Text>{props.name}</Text>
    </View>
  )
}



export default SampleScreen

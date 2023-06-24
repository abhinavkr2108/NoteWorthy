import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import Colors from '../misc/Colors'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Intro({onFinish}) {
    const [userName, setUserName] = useState("");
    const handleChangeText = (text) => {
        setUserName(text);
    }
    const handleSubmitText = async () => {
        const user = {name: userName}
        await AsyncStorage.setItem('user', JSON.stringify(user))
        if(onFinish) onFinish();
    }
  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>Enter your Name </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => handleChangeText(text)}
        placeholder="Enter Your Name"
      />
      <View>
        {
            userName.length>1 ? (
                <TouchableOpacity 
                    style={styles.btnNext}
                    onPress={handleSubmitText}>
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            ): null
        }
        
      </View>


    </View>
  )
}

const textWidth = Dimensions.get("window").width -50;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputTitle:{
        alignSelf: "flex-start",
        marginBottom: 15,
        marginStart: 25,
        opacity: 0.6,
    },
    textInput:{
        borderWidth: 2,
        borderColor: Colors.PRIMARY,
        width: textWidth,
        height: 45,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    btnNext:{
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 50,
    }
})
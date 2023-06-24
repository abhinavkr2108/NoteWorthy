import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import Colors from '../misc/Colors';
import { AntDesign } from '@expo/vector-icons';
import Searchbar from '../components/Searchbar';
import InputModal from '../components/InputModal';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';

const NoteScreen = ({user}) => {
    const [greeting, setGreeting] = useState("Morning");
    const [modalVisible, setModalVisible] = useState(false)

    const greetUser = () => {
        const hours = new Date().getHours()
        if(hours===0 || hours<12) return setGreeting("Morning");
        if(hours===12 || hours<17) return setGreeting("Afternoon");
        setGreeting("Evening");
    }
    useEffect(()=>{
        greetUser()
    },[])

    const handleOnSubmit = (title, desc) => {
        console.log(title,desc);
    }


  return (
    <>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.LIGHT}/>
        <View style={styles.container}>
            <Text style={styles.greeting}>{`Good ${greeting}, ${user.name}`}</Text>
            <Searchbar/>
            <View style={[StyleSheet.absoluteFillObject, styles.addNoteContainer]}>
                <Text style={styles.addNoteText}>Add Notes</Text>
                <TouchableOpacity 
                    style={styles.btnAddNote}
                    onPress={() => setModalVisible(true)}
                    >
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
           
        </View>
        <InputModal 
            visible={modalVisible} 
            onClose={() => setModalVisible(false)}
            onSubmit={handleOnSubmit}/>
    </>
   
  )
}

export default NoteScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 30,
        marginHorizontal: 20,
        zIndex: 1,
    },
    greeting:{
        fontSize: 23,
        fontWeight: "bold",
    },
    addNoteContainer:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    addNoteText:{
        fontSize: 20,
        fontWeight: "bold",
        opacity: 0.4,
    },
    btnAddNote:{
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 50,
        position: "absolute",
        right: 15,
        bottom: 50,
    }
})
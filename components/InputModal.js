import { Modal, StyleSheet, StatusBar, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import Colors from '../misc/Colors'
import { Button, Snackbar } from 'react-native-paper';
import Toast from 'react-native-toast-message'
import { AntDesign } from '@expo/vector-icons';

const InputModal = ({visible, onClose, onSubmit, isEdit, note}) => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleTextChange = (text, valueFor) => {
        if(valueFor==="title") setTitle(text)
        if(valueFor==="description") setDesc(text)
    }
    const handleSubmit = () =>{
        
        if (isEdit) {
            onSubmit(title, desc, Date.now())
        }else{
            onSubmit(title, desc);
            setTitle("");
            setDesc("");
        }
       
        onClose();
    }
    useEffect(()=>{
        if(isEdit===true){
            setTitle(note.title)
            setDesc(note.description)
        }
    },[isEdit])
  return (
    <>
    <View>
        <Modal visible={visible} animationType='fade'>
            <View style={styles.btnCloseContainer}>
            <TouchableOpacity 
                    style={styles.btnClose}
                    onPress={onClose}>
                    <AntDesign name="close" size={15} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TextInput
                    value={title}
                    placeholder="Title"
                    onChangeText={(text)=> handleTextChange(text, "title")}
                    style={styles.noteTitle}
                />
                <TextInput
                    value={desc}
                    multiline
                    onChangeText={(text)=> handleTextChange(text, "description")}
                    placeholder="Description"
                    style={styles.noteDescription}
                />
            </View> 

            <View style={styles.btnSubmitNoteContainer}>
                <TouchableOpacity style={styles.btnSubmitNote} onPress={handleSubmit}>
                    <Text style={styles.btnSubmitNoteText}>Add Note</Text>
                </TouchableOpacity>
            </View>           
        </Modal>
    </View>
    </>
    
  )
}

export default InputModal

const styles = StyleSheet.create({
    btnCloseContainer:{
        display: "flex",
        flexDirection: "row",
        alignItems:"flex-end",
        justifyContent:"flex-end",
        marginRight: 20,
        marginTop: 15,
    },
    btnClose:{
        backgroundColor: "red",
        padding: 10,
        borderRadius: 50,
    },

    container:{
        marginHorizontal: 20,
    },
    noteTitle:{
        borderBottomWidth: 1,
        borderBottomColor: Colors.PRIMARY,
        height: 40,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 20,
        fontWeight: "bold",

    },  
    noteDescription:{
        borderBottomWidth: 1,
        borderBottomColor: Colors.PRIMARY,
        height: 100,  
    },
    btnSubmitNoteContainer:{
        marginHorizontal: 20,
        marginVertical: 50,
    },
    btnSubmitNote:{
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 5,
    },
    btnSubmitNoteText:{
        color: "white",
        textAlign:"center",
        fontSize: 15,
        fontWeight: "bold",
    }
})
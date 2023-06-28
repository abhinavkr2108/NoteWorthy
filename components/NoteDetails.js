import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';
import Colors from '../misc/Colors';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/NoteProvider';
import InputModal from './InputModal';

const NoteDetails = (props) => {
  console.log(props.route)
  const [note, setNote] = useState(props.route.params.note)
  const {notes, setNotes} = useNotes()

  const [showModal, setShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const formatDate = (milliSec) =>{
     const date = new Date(milliSec);
     const day = date.getDate();
     const month = date.getMonth();
     const year = date.getFullYear();
     const hours = date.getHours();
     const min = date.getMinutes();
     return `${day}/${month+1}/${year} - ${hours}:${min}`
  }
  const displayDeleteAlert = ()=>{
    Alert.alert('Delete Note!', 'Do you want to delete note permanently', [
      {
        text: "Delete",
        onPress:deleteNote
      },
      {
        text: "Cancel",
        onPress:() => console.log('Cancel Delete Note')
      }
    ],{
      cancelable: true
    })
  }


  const deleteNote= async() => {
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if(result!==null) notes= JSON.parse(result)

    const newNotes = notes.filter(n=> n.id!== note.id)
    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack()
  }

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if(result!==null) notes = JSON.parse(result)
    const updatedNotes = notes.filter(n=>{
      if(n.id===note.id){
        n.title = title
        n.description = desc
        n.isUpdated = true
        n.time = time
        setNote(n)
      }
      return n
    })
    setNotes(updatedNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    
  }
  const handleOnClose = () => setShowModal(false)
  const openEditModal = () => {
    setIsEdit(true)
    setShowModal(true)
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.time}>{note.isUpdated? `Updated at ${formatDate(note.time)}`: `Created at ${formatDate(note.time)}`}</Text>
        <Text style={styles.notetitle}>{note.title}</Text>
        <Text style={styles.noteDesc}>{note.description}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
          <TouchableOpacity 
            style={{...styles.btnEdit,  backgroundColor: "blue"}}
            onPress= {openEditModal}>
          <AntDesign name="edit" size={24} color="white" />
          
        </TouchableOpacity>
        <TouchableOpacity 
            style={{...styles.btnEdit,  backgroundColor: "red"}}
            onPress={displayDeleteAlert}>
          <AntDesign name="delete" size={24} color="white" />
          
        </TouchableOpacity>
      </View>
      <InputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal}/>
      
     
    </View>
  )
}

export default NoteDetails

const styles = StyleSheet.create({
  time:{
    textAlign: "right",
    fontWeight: "bold",
    color: "grey",
    opacity: 0.5,
  },
  container:{
    margin: 15,
    flex: 1,
  },
 
  notetitle:{
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  noteDesc:{
    marginTop: 10,
  },
  btnContainer:{
    position: "absolute",
    right: 15,
    bottom: 50,
  }, 
  btnEdit:{
    padding: 8,
    borderRadius: 50,
    marginBottom: 5,
  }
})
import { StyleSheet, Text, View } from 'react-native'
import React,{createContext, useState, useEffect, useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteContext = createContext()
const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const getNotes = async() =>{
        const result = await AsyncStorage.getItem('notes');
        console.log(result)
        if(result!==null) setNotes(JSON.parse(result));
    }
    useEffect(()=>{
        getNotes();
        // AsyncStorage.clear();
    },[])
  return (


    <NoteContext.Provider value={{notes, getNotes, setNotes}}>
        {children}
    </NoteContext.Provider>
  )
}

export const useNotes = ()=> useContext(NoteContext)

export default NoteProvider
